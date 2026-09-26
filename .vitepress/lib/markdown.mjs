/**
 * The complete markdown pipeline, shared between the VitePress config and the
 * search data loader so both render content identically.
 */
import container from 'markdown-it-container';
import deflist from 'markdown-it-deflist';
import imsize from 'markdown-it-imsize';

import slugify from './slugify.js';
import highlight from './highlight.js';
import markup from './markup.js';
import externalLinks from './external-links.js';

export function configureMarkdown(md) {
    // Prism highlighting with custom fence output:
    // <div class="language-x extra-class"><pre v-pre class="language-x"><code>
    md.options.highlight = highlight;

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const lang = token.info.trim();
        const highlighted = highlight(token.content, lang);
        return `<div class="language-${lang} extra-class">${highlighted}</div>\n`;
    };

    // Custom token transforms (tables/split/pre+post heading/dewidow/inline code)
    md.use(markup)
        .use(deflist)
        .use(imsize);

    // External link treatment (target/rel/is-ext class + outbound icon)
    md.use(externalLinks);

    // Custom containers
    md.use(container, 'tip', containerOptions('tip'));
    md.use(container, 'cmstemplate', containerOptions('cmstemplate'));
    md.use(container, 'warning', containerOptions('warning'));
    md.use(container, 'danger', containerOptions('danger'));
    md.use(container, 'also', containerOptions('also'));
    md.use(container, 'aside', containerOptions('aside'));

    md.use(container, 'details', {
        render(tokens, idx) {
            const token = tokens[idx];
            const info = token.info.trim().slice('details'.length).trim();
            if (token.nesting === 1) {
                return `<details class="custom-block details">${
                    info ? `<summary>${info}</summary>` : ''
                }\n`;
            }
            return '</details>\n';
        }
    });

    md.use(container, 'dir', {
        render(tokens, idx) {
            return tokens[idx].nesting === 1
                ? '<pre class="dir-container"><code>'
                : '</code></pre>';
        }
    });

    // ::: v-pre blocks
    md.use(container, 'v-pre', {
        render(tokens, idx) {
            return tokens[idx].nesting === 1 ? '<div v-pre>' : '</div>';
        }
    });
}

/**
 * Container output with an empty default title:
 * <div class="custom-block {type}">...</div>
 */
function containerOptions(type) {
    return {
        render(tokens, idx) {
            const token = tokens[idx];
            const info = token.info.trim().slice(type.length).trim();
            if (token.nesting === 1) {
                const title = info
                    ? `<p class="custom-block-title">${info}</p>`
                    : '';
                return `<div class="custom-block ${type}">${title}\n`;
            }
            return '</div>\n';
        }
    };
}

/**
 * Options passed to VitePress `markdown` config key.
 */
export const markdownOptions = {
    // Anchor rendering: <a href="#slug" class="header-anchor">#</a>
    anchor: {
        level: [2, 3, 4],
        slugify,
        tabIndex: false,
        permalink: anchorPermalink
    },

    // Disable markdown-it-attrs to avoid `{...}` being interpreted
    attrs: {
        disable: true
    },

    // Header extraction (populates pageData.headers, used by the
    // widebar/sidebar TOCs)
    headers: {
        level: [2, 3, 4]
    },

    toc: {
        level: [2, 3, 4]
    },

    config: configureMarkdown
};

/**
 * markdown-it-anchor v9 style permalink renderer
 * (permalinkBefore: true, permalinkSymbol: '#').
 */
function anchorPermalink(slug, opts, state, idx) {
    const linkTokens = [
        Object.assign(new state.Token('link_open', 'a', 1), {
            attrs: [
                ['href', `#${slug}`],
                ['class', 'header-anchor']
            ]
        }),
        Object.assign(new state.Token('html_inline', '', 0), { content: '#' }),
        new state.Token('link_close', 'a', -1),
        Object.assign(new state.Token('text', '', 0), { content: ' ' })
    ];

    state.tokens[idx + 1].children.unshift(...linkTokens);
}
