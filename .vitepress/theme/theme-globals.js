/**
 * Global component API for the theme.
 *
 * Installs the globals every theme component reads ($page, $site, $route,
 * $router, $activeSet, $activeVersion, $trans, ...) on top of the VitePress
 * runtime, including the globally-available `$site.pages` list served from a
 * build-time data loader.
 */
import { ref } from 'vue';
import { data as pages } from './data/pages.data.mjs';
import { getDocSetLocaleSettings } from './util';
import { relativePathToPath } from '../lib/docset-context.js';

// Reactive location hash, exposed to components via $route.hash
export const hashRef = ref(
    typeof window !== 'undefined' ? window.location.hash : ''
);

const afterRouteChangedCallbacks = [];
const beforeRouteChangeCallbacks = [];

export function onAfterRouteChanged(cb) {
    afterRouteChangedCallbacks.push(cb);
}

export function onBeforeRouteChange(cb) {
    beforeRouteChangeCallbacks.push(cb);
}

function syncHash() {
    if (typeof window !== 'undefined') {
        hashRef.value = window.location.hash;
    }
}

export function updateHash(hash) {
    hashRef.value = hash;
}

function flattenHeaders(headers, out = []) {
    (headers || []).forEach(h => {
        out.push({ level: h.level, title: h.title, slug: h.slug || anchorFromLink(h.link) });
        if (h.children && h.children.length) {
            flattenHeaders(h.children, out);
        }
    });
    return out;
}

function anchorFromLink(link) {
    return link && link.indexOf('#') !== -1 ? link.split('#')[1] : '';
}

export function installGlobals(app, router, siteData) {
    if (typeof window !== 'undefined') {
        window.addEventListener('hashchange', syncHash);
        window.addEventListener('popstate', syncHash);

        // VitePress handles in-page anchor clicks with pushState (which does
        // not emit hashchange), so sync just after any click
        document.addEventListener('click', () => {
            setTimeout(syncHash, 0);
        });

        const existing = router.onAfterRouteChanged;
        router.onAfterRouteChanged = to => {
            if (existing) existing(to);
            syncHash();
            afterRouteChangedCallbacks.forEach(cb => cb(to));
        };

        const existingBefore = router.onBeforeRouteChange;
        router.onBeforeRouteChange = to => {
            if (existingBefore && existingBefore(to) === false) {
                return false;
            }
            beforeRouteChangeCallbacks.forEach(cb => cb(to));
        };
    }

    const routerShim = {
        go: to => router.go(to),
        push: to => router.go(to),
        replace: to => router.go(to)
    };

    app.mixin({
        data() {
            return {
                version: null
            };
        },
        computed: {
            $route() {
                return {
                    path: router.route.path,
                    hash: hashRef.value,
                    fullPath: router.route.path + hashRef.value
                };
            },
            $router() {
                return routerShim;
            },
            $page() {
                const pageData = router.route.data;
                const path = relativePathToPath(pageData.relativePath);

                let entry = null;
                for (let i = 0; i < pages.length; i++) {
                    if (pages[i].path === path) {
                        entry = pages[i];
                        break;
                    }
                }

                return {
                    ...(entry || {}),
                    title: entry ? entry.title : pageData.title,
                    frontmatter: pageData.frontmatter,
                    headers: flattenHeaders(pageData.headers),
                    path: path,
                    regularPath: path,
                    relativePath: entry ? entry.relativePath : pageData.relativePath,
                    isNotFound: pageData.isNotFound === true
                };
            },
            $site() {
                return {
                    ...siteData.value,
                    pages: pages
                };
            },
            $frontmatter() {
                return router.route.data.frontmatter;
            },
            $themeConfig() {
                return siteData.value.themeConfig || {};
            },
            $lang() {
                return this.$localeConfig.lang || 'en-US';
            },
            $localePath() {
                return '/';
            },
            $title() {
                const page = this.$page;

                if (page.frontmatter.title) {
                    return page.frontmatter.title;
                }

                const pageTitle = page.title ? page.title.replace(/[_`]/g, "") : "";

                const siteTitle = (
                    this.$localeConfig.title ||
                    this.$siteTitle ||
                    "October CMS"
                ).replace("%v", this.$activeVersion);

                if (pageTitle && siteTitle && pageTitle !== siteTitle) {
                    return `${pageTitle} - ${siteTitle}`;
                }

                return siteTitle;
            },
            $siteTitle() {
                return this.$themeConfig.title || this.$site.title || "";
            },
            $activeSet() {
                const { themeConfig } = this.$site;

                for (let index = 0; index < themeConfig.docSets.length; index++) {
                    const set = themeConfig.docSets[index];

                    if (set.versions) {
                        for (let version of set.versions) {
                            const key = version[0];
                            const setVersionBase = (set.baseDir ? "/" + set.baseDir : "") + "/" + key;
                            const searchPattern = new RegExp("^" + setVersionBase, "i");

                            if (searchPattern.test(this.$page.path)) {
                                this.version = key;
                                return set;
                            }
                        }
                    }
                    else {
                        const setVersionBase = set.baseDir ? "/" + set.baseDir : "";
                        const searchPattern = new RegExp("^" + setVersionBase, "i");

                        if (searchPattern.test(this.$page.path)) {
                            return set;
                        }
                    }
                }

                return false;
            },
            $activeVersion() {
                if (this.$activeSet && !this.$activeSet.versions) {
                    return;
                }

                if (this.version) {
                    return this.version;
                }

                if (
                    this.$activeSet &&
                    !this.version &&
                    this.$activeSet.defaultVersion
                ) {
                    return this.$activeSet.defaultVersion;
                }
            },
            $allLocales() {
                // Build a fresh object rather than mutating $site.locales:
                // VitePress serves site data behind a readonly proxy in dev, so
                // in-place Object.assign would throw.
                const { locales = {} } = this.$site;
                const docSets = this.$themeConfig.docSets || [];

                let docSetLocales = {};

                docSets.forEach(docSet => {
                    docSetLocales = {
                        ...docSetLocales,
                        ...getDocSetLocaleSettings(docSet)
                    };
                });

                return { ...locales, ...docSetLocales };
            },
            $localeConfig() {
                let targetLang;
                let defaultLang;

                for (const path in this.$allLocales) {
                    if (path === "/") {
                        defaultLang = this.$allLocales[path];
                    }
                    else if (this.$page.path.indexOf(path) === 0) {
                        targetLang = this.$allLocales[path];
                    }
                }

                return targetLang || defaultLang || {};
            },
            $trans() {
                if (this.$localeConfig.config) {
                    return this.$localeConfig.config.messages || {};
                }

                return {};
            }
        }
    });
}
