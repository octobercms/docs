<template>
    <div class="theme-container">

        <div id="nprogress-container"></div>

        <div id="layout-sidebar">
        </div>

        <div id="layout-header-mobile">
            <SidebarButton  />
            <h2>Page Not Found</h2>
        </div>

        <div id="layout-header-wrapper">
            <div id="layout-header">
                <RouterLink :to="`/`" ref="siteName" class="site-name">
                    <img src="/images/october-color-logo.svg" :alt="$siteTitle" width="211" height="35" /> <span>Docs</span>
                </RouterLink>
                <div class="header-search">
                    <SearchBox v-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
                </div>
            </div>
            <div id="layout-nav">
                <div>
                    <div class="header-home-link">
                        <a href="https://octobercms.com/">
                            <img src="/images/october-leaf.svg" width="16" height="16" alt="October CMS" />
                            {{ $trans.header_home_link }} →
                        </a>
                    </div>
                    <div class="header-tabs">
                        <div>
                            <RouterLink to="/">
                                <span class="sidebar-extra-title">Home</span>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="layout-wrapper">
            <div id="layout-content">

                <main class="page">
                    <div class="theme-default-content article">
                        <div v-if="redirectPage">
                            <h1>October CMS Documentation</h1>
                            <p class="subtitle">Redirecting you to the nearest article...</p>
                        </div>
                        <div v-else>
                            <h1>Page Not Found</h1>
                            <p class="subtitle">We can't find the documentation article you're looking for.</p>
                            <hr />
                            <h4>Try one of the following</h4>
                            <div class="custom-block also">
                                <ul>
                                    <li><RouterLink to="/">Return Home</RouterLink></li>
                                    <li><a href="https://octobercms.com/contact" target="_blank">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>

                <Redirect v-if="redirectPage" :to="redirectPage.path" />

            </div>
        </div>

        <div id="layout-widebar"></div>

    </div>
</template>

<script>
import "./styles/index.less";

import { resolvePageBasic } from './util'
import SidebarButton from './components/SidebarButton.vue';
import SearchBox from "./components/SearchBox.vue";
import Redirect from "./global-components/Redirect.vue";

export default {
    components: {
        SidebarButton,
        SearchBox,
        Redirect
    },
    mounted() {
        this.checkReferrer();
    },
    data() {
        return {
            redirectPage: null,
        };
    },
    methods: {
        findAnyPage() {
            var path = location.pathname;
            const { themeConfig } = this.$site;

            for (let index = 0; index < themeConfig.docSets.length; index++) {
                const set = themeConfig.docSets[index];

                if (set.versions) {
                    for (let version of set.versions) {
                        const key = version[0];
                        const setVersionBase = (set.baseDir ? "/" + set.baseDir : "") + "/" + key;
                        var foundPage = resolvePageBasic(this.$site.pages, setVersionBase + path);
                        if (foundPage) {
                            return foundPage;
                        }
                    }
                }
                else {
                    const setVersionBase = set.baseDir ? "/" + set.baseDir : "";
                    var foundPage = resolvePageBasic(this.$site.pages, setVersionBase + path);
                    if (foundPage) {
                        return foundPage;
                    }
                }
            }

            return false;
        },
        checkReferrer() {
            const redirectPage = this.findAnyPage();
            if (redirectPage) {
                this.redirectPage = redirectPage;
            }
        },
    },
}
</script>
