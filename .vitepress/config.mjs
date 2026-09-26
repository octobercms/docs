import { fileURLToPath } from 'url';
import { defineConfig } from 'vitepress';

import octoberCms from './sets/october-cms.mjs';
import userGuide from './sets/user-guide.mjs';
import { markdownOptions } from './lib/markdown.mjs';
import { getPageDocSetContext, relativePathToPath } from './lib/docset-context.js';

const description = 'October CMS Documentation';

const docSets = [octoberCms, userGuide];

export default defineConfig({
    title: 'October CMS Documentation',
    description: description,

    srcDir: '.',
    srcExclude: ['node_modules/**', 'dist/**', 'cache/**', 'LICENSE.md'],
    outDir: './dist',
    cacheDir: './cache',

    vite: {
        // Keep the theme assets in ./public, set explicitly so it survives any
        // future srcDir change.
        publicDir: fileURLToPath(new URL('../public', import.meta.url)),

        resolve: {
            // Pin Vue/VitePress so bare imports in the compiled pages always
            // resolve to the versions this project installed.
            alias: [
                { find: /^vue$/, replacement: fileURLToPath(new URL('../node_modules/vue/dist/vue.runtime.esm-bundler.js', import.meta.url)) },
                { find: /^vue\/server-renderer$/, replacement: fileURLToPath(new URL('../node_modules/vue/server-renderer/index.mjs', import.meta.url)) },
                { find: /^vitepress$/, replacement: fileURLToPath(new URL('../node_modules/vitepress/dist/client/index.js', import.meta.url)) }
            ]
        }
    },

    // README.md -> directory index
    rewrites(id) {
        return id.replace(/(^|\/)README\.md$/i, '$1index.md');
    },

    // .html URLs
    cleanUrls: false,

    // The theme handles its own version warning banners; do not fail the build
    // on links pointing at pages that only exist in other versions
    ignoreDeadLinks: true,

    head: [
        // ['meta', { name: 'theme-color', content: '#dc692e' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'icon', href: '/images/october.png', type: 'image/png' }],
        ['meta', { property: 'og:image', content: 'https://d2f5cg397c40hu.cloudfront.net/website-static-files/images/docs-open-graph.png' }],
        ['meta', { property: 'og:image:width', content: '1200' }],
        ['meta', { property: 'og:image:height', content: '630' }]
    ],

    themeConfig: {
        title: 'October CMS Documentation',
        docSets: docSets,
        repo: 'octobercms/docs',
        editLinks: true,
        docsDir: '',
        editLinkText: 'Edit This Page',
        lastUpdated: false
    },

    markdown: markdownOptions,

    transformPageData(pageData) {
        const pagePath = relativePathToPath(pageData.relativePath);
        const { docSet, version } = getPageDocSetContext(pagePath, docSets);

        // Build the <title> tag
        if (pageData.frontmatter.title) {
            pageData.titleTemplate = false;
            pageData.title = pageData.frontmatter.title;
        }
        else {
            // Home pages are titled "Home" unless overridden
            const inferredTitle = pageData.frontmatter.home
                ? 'Home'
                : pageData.title;

            const pageTitle = inferredTitle
                ? inferredTitle.replace(/[_`]/g, '')
                : '';

            let siteTitle = 'October CMS Documentation';
            if (docSet) {
                const localeTitle = docSet.locales
                    ? (docSet.locales['/'] || {}).title
                    : null;
                siteTitle = (localeTitle || docSet.title || siteTitle);
            }
            siteTitle = siteTitle.replace('%v', version || '');

            pageData.titleTemplate = false;
            pageData.title =
                pageTitle && pageTitle !== siteTitle
                    ? `${pageTitle} - ${siteTitle}`
                    : siteTitle;
        }

        if (pageData.frontmatter.subtitle && !pageData.frontmatter.description) {
            pageData.description = pageData.frontmatter.subtitle;
        }
    }
});
