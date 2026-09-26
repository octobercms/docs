<template>
    <NotFound v-if="$page.isNotFound" />
    <div
        v-else
        class="theme-container"
        :class="pageClasses"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
    >
        <div id="nprogress-container"></div>

        <div id="layout-sidebar">
            <Sidebar
                :set="$activeSet"
                :version="$activeVersion"
                :items="sidebarItems"
                :extra-items="extraSidebarItems"
                @toggle-sidebar="toggleSidebar"
                @select-version="handleVersionUpdate"
                @select-language="handleLanguageUpdate"
            />
        </div>

        <div id="layout-header-mobile">
            <SidebarButton @toggle-sidebar="toggleSidebar" :isClosed="isSidebarOpen" />
            <h2>{{ $page.title }}</h2>
        </div>

        <div id="layout-header-wrapper">
            <div id="layout-header">
                <!-- keep the img/span on one line: the compiler condenses newline whitespace between them -->
                <RouterLink :to="`/`" ref="siteName" class="site-name">
                    <img src="/images/october-color-logo.svg" :alt="$siteTitle" width="170" height="28" /> <span>{{ $activeSet.setTitle || "Docs" }}</span>
                </RouterLink>
                <div class="header-search">
                    <SearchBox v-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
                </div>
                <DocSetVersion @select-version="handleVersionUpdate" />
                <DocSetLocale :set="$activeSet" @select-language="handleLanguageUpdate" />
            </div>
            <div id="layout-nav">
                <HeaderNav
                    :items="extraSidebarItems"
                />
            </div>
        </div>

        <div id="layout-wrapper">
            <div id="layout-content">
                <Page :sidebar-items="sidebarItems">
                    <template #top>
                        <slot name="page-top" />
                    </template>
                    <template #bottom>
                        <slot name="page-bottom" />
                    </template>
                </Page>
            </div>
        </div>

        <div id="layout-widebar">
            <Widebar :heading-items="headingItems" />
        </div>
    </div>
</template>
<style lang="less">
#nprogress-container {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    width: 100%;
    height: 2px;
    z-index: 1050;
}
</style>

<script>
import "@phosphor-icons/web/duotone";
import "./styles/index.less";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/treeview/prism-treeview.css";

import Page from './components/Page.vue';
import Sidebar from './components/Sidebar.vue';
import HeaderNav from './components/HeaderNav.vue';
import Widebar from './components/Widebar.vue';
import SidebarButton from './components/SidebarButton.vue';
import SearchBox from "./components/SearchBox.vue";
import DocSetVersion from "./components/DocSetVersion.vue";
import DocSetLocale from "./components/DocSetLocale.vue";
import NotFound from "./NotFound.vue";

import {
    resolveSidebarItems,
    resolveExtraSidebarItems,
    resolveHeaders,
    getPageWithRelativePath,
    fixDoubleSlashes,
    getSameContentForVersion
} from './util';

import scrollLock from "./util/scroll-lock";
import clientRoot from "./client-root";
import { updateCodeCopies } from "./code-copy";

export default {
    name: 'Layout',

    components: {
        Page,
        Sidebar,
        HeaderNav,
        Widebar,
        SidebarButton,
        DocSetVersion,
        DocSetLocale,
        SearchBox,
        NotFound
    },

    mixins: [clientRoot],

    data () {
        return {
            isSidebarOpen: false
        }
    },

    computed: {
        shouldShowNavbar () {
            const { themeConfig } = this.$site
            const { frontmatter } = this.$page
            if (
                frontmatter.navbar === false
                || themeConfig.navbar === false) {
                return false
            }
            return (
                this.$title
                || themeConfig.logo
                || themeConfig.repo
                || themeConfig.nav
            )
        },

        shouldShowSidebar () {
            const { frontmatter } = this.$page
            return (
                (!frontmatter.home || frontmatter.sidebar)
                && frontmatter.sidebar !== false
                && this.sidebarItems.length
            )
        },

        shouldShowWidebar () {
            const { frontmatter } = this.$page
            return frontmatter.widebar !== false;
        },

        sidebarItems () {
            return resolveSidebarItems(
                this.$page,
                this.$page.regularPath,
                this.$site,
                this.$localePath,
                this.$activeSet,
                this.$activeVersion,
                this.$localeConfig
            )
        },

        extraSidebarItems () {
            return resolveExtraSidebarItems(
                this.$page,
                this.$page.regularPath,
                this.$site,
                this.$localePath,
                this.$activeSet,
                this.$activeVersion,
                this.$localeConfig
            )
        },

        headingItems() {
            return resolveHeaders(this.$page);
        },

        pageClasses () {
            const userPageClass = this.$page.frontmatter.pageClass
            return [
                {
                    'no-navbar': !this.shouldShowNavbar,
                    'sidebar-open': this.isSidebarOpen,
                    'no-sidebar': !this.shouldShowSidebar,
                    'no-widebar': !this.shouldShowWidebar
                },
                userPageClass
            ]
        }
    },

    updated () {
        updateCodeCopies();
    },

    mounted () {
        updateCodeCopies();

        this.$onAfterRouteChanged(() => {
            this.isSidebarOpen = false;
            updateCodeCopies();
        });

        // Scroll to the URL hash target on load
        const hash = document.location.hash;
        if (hash.length > 1) {
            const id = decodeURIComponent(hash.substring(1));
            const element = document.getElementById(id);

            if (element) {
                setTimeout(() => {
                    if (element) {
                        element.scrollIntoView({
                            behavior: this.getPrefersReducedMotion() ? "auto" : "smooth"
                        });
                    }
                }, 750);
            }
        }
    },

    methods: {
        toggleSidebar (to) {
            this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
            this.$emit('toggle-sidebar', this.isSidebarOpen);

            if (this.isSidebarOpen) {
                scrollLock.enable();
            }
            else {
                scrollLock.disable();
            }
        },

        handleVersionUpdate(version) {
            this.$router.push(
                getSameContentForVersion(
                    version,
                    this.$activeSet,
                    this.$activeVersion,
                    this.$page,
                    this.$site.pages,
                    false
                )
            );
        },

        handleLanguageUpdate(language) {
            const { locales } = this.$activeSet;

            let targetPath = this.$page.relativePath;
            let setBase = this.$activeSet.baseDir;

            if (this.$activeVersion) {
                setBase += this.$activeVersion;
            }

            let currentLocaleSegment;
            let targetLocaleSegment;

            for (const [path, settings] of Object.entries(locales)) {
                if (settings.lang === this.$lang) {
                    currentLocaleSegment = path;
                }

                if (settings.lang === language) {
                    targetLocaleSegment = path;
                }
            }

            const currentSetBase = setBase + currentLocaleSegment;
            const targetSetBase = setBase + targetLocaleSegment;

            targetPath = targetPath.replace(currentSetBase, targetSetBase);

            const targetPage = getPageWithRelativePath(this.$site.pages, targetPath);

            if (targetPage) {
                targetPath = "/" + targetPage.path;
            }
            else {
                targetPath = "/" + targetSetBase;
            }

            this.$router.push(fixDoubleSlashes(targetPath));
        },

        // Side swipe
        onTouchStart (e) {
            this.touchStart = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            }
        },

        onTouchEnd (e) {
            const dx = e.changedTouches[0].clientX - this.touchStart.x
            const dy = e.changedTouches[0].clientY - this.touchStart.y
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                if (dx > 0 && this.touchStart.x <= 80) {
                    if (!this.isSidebarOpen) {
                        this.toggleSidebar(true)
                    }
                }
                else {
                    if (this.isSidebarOpen) {
                        this.toggleSidebar(false)
                    }
                }
            }
        },

        getPrefersReducedMotion() {
            if (!window.matchMedia) {
                return false;
            }

            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        },
    }
}
</script>
