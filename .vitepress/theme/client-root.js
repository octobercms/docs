/**
 * nprogress route progress bar and scroll-driven active header hash updates.
 * Mixed into the root Layout.
 */
import nprogress from "nprogress";
import { debounce } from "lodash-es";
import scrollLock from "./util/scroll-lock";
import { onAfterRouteChanged, onBeforeRouteChange, updateHash } from "./theme-globals";

export default {
    mounted() {
        /**
         * progress bar
         */
        nprogress.configure({ showSpinner: false, parent: "#nprogress-container" });

        onBeforeRouteChange(() => {
            nprogress.start();
        });

        onAfterRouteChanged(() => {
            nprogress.done();
            scrollLock.disableNoScroll();
            this.isSidebarOpen = false;
        });

        /**
         * active header links
         */
        window.addEventListener('scroll', this.onScroll)
    },

    created() {
        this.onScroll = debounce(() => {
            this.setActiveHash()
        }, 300);
    },

    methods: {
        $onAfterRouteChanged(cb) {
            onAfterRouteChanged(cb);
        },

        setActiveHash () {
            const anchors = [].slice.call(document.querySelectorAll('.header-anchor'));

            // Taken from LESS @headerHeight
            const anchorOffset = 115;

            const scrollTop = Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop
            ) + anchorOffset;

            const scrollHeight = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            );

            const bottomY = window.innerHeight - scrollTop;

            for (let i = 0; i < anchors.length; i++) {
                const anchor = anchors[i]
                const nextAnchor = anchors[i + 1]

                const isActive = i === 0 && scrollTop === 0 || (
                    scrollTop >= anchor.parentElement.offsetTop + 10 && (
                            !nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - 10
                        )
                    );

                const routeHash = decodeURIComponent(this.$route.hash)

                if (isActive && routeHash !== decodeURIComponent(anchor.hash)) {
                    const activeAnchor = anchor

                    if (bottomY === scrollHeight) {
                        for (let j = i + 1; j < anchors.length; j++) {
                            if (routeHash === decodeURIComponent(anchors[j].hash)) {
                                return
                            }
                        }
                    }

                    // Update the address bar without triggering a navigation
                    // or the router's scroll behavior
                    const hash = decodeURIComponent(activeAnchor.hash);
                    history.replaceState(history.state, '', hash);
                    updateHash(hash);

                    return
                }
            }
        }
    },

    beforeUnmount () {
        window.removeEventListener('scroll', this.onScroll)
    }
};
