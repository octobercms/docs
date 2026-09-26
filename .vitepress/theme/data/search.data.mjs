/**
 * Build-time fulltext search records. Rendered with the site's own markdown
 * pipeline and converted to plaintext via html-to-text. This module is only
 * loaded when search is used, so it is code-split out of the main bundle.
 */
import { createMarkdownRenderer } from 'vitepress';
import { htmlToText } from 'html-to-text';

import { srcDir } from '../../lib/config-loader.mjs';
import { markdownOptions } from '../../lib/markdown.mjs';
import { getPageDocSetContext } from '../../lib/docset-context.js';
import { buildPageRecords, extractTitle } from '../../lib/source-pages.mjs';
import octoberCms from '../../sets/october-cms.mjs';
import userGuide from '../../sets/user-guide.mjs';

const docSets = [octoberCms, userGuide];

function getCharsets(text) {
    const cyrillicRegex = /[Ѐ-ӿ]/iu;
    const cjkRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]|[一-鿌㐀-䶵﨎﨏﨑﨓﨔﨟﨡﨣﨤﨧-﨩]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/iu;

    const result = {};
    if (cyrillicRegex.test(text)) {
        result.cyrillic = true;
    }

    if (cjkRegex.test(text)) {
        result.cjk = true;
    }

    return result;
}

function decodeEntities(str) {
    return str
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
}

/**
 * Extract h2-h4 headers with slugs from rendered HTML so slugs are guaranteed
 * to match the anchors on the page.
 */
function extractHeaders(html) {
    const headers = [];
    const headingRE = /<h([234]) id="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/g;

    let match;
    while ((match = headingRE.exec(html)) !== null) {
        const level = parseInt(match[1], 10);
        const slug = match[2];

        // Strip the permalink anchor and any tags, decode entities
        const title = decodeEntities(
            match[3]
                .replace(/<a [^>]*class="header-anchor"[^>]*>[\s\S]*?<\/a>/, '')
                .replace(/<[^>]*>/g, '')
        ).trim();

        headers.push({ level, title, slug });
    }

    return headers;
}

export default {
    watch: ['../../../**/*.md'],

    async load() {
        const md = await createMarkdownRenderer(srcDir, markdownOptions, '/');

        return buildPageRecords().map(record => {
            const { frontmatter, content, relativePath, pagePath } = record;

            const { docSet, version, lang, primarySet, primaryVersion } =
                getPageDocSetContext(pagePath, docSets);

            let html = '';
            try {
                html = content !== '' ? md.render(content) : '';
            }
            catch (e) {
                console.error('Error rendering search content for ' + relativePath, e);
            }

            const plaintext = htmlToText(html, {
                wordwrap: null,
                hideLinkHrefIfSameAsText: true,
                ignoreImage: true,
                uppercaseHeadings: false
            });

            const headers = extractHeaders(html).map(h => {
                let charIndex = plaintext.indexOf('# ' + h.title);
                if (charIndex === -1) {
                    charIndex = null;
                }
                return { ...h, charIndex };
            });

            return {
                key: pagePath,
                path: pagePath,
                title: extractTitle(frontmatter, content),
                headers: headers,
                headersStr: headers.length
                    ? headers.map(h => h.title).join(' ')
                    : null,
                keywords: frontmatter.keywords ? frontmatter.keywords : '',
                content: plaintext,
                charsets: getCharsets(plaintext),
                lang: lang,
                docSetHandle: docSet ? docSet.handle || false : false,
                docSetTitle: docSet ? docSet.setTitle || false : false,
                isPrimary: !!(primarySet && primaryVersion),
                version: version
            };
        });
    }
};
