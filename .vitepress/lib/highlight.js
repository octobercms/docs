/**
 * Prism-based syntax highlighter. Node-side only (used by the markdown
 * renderer).
 */
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const prism = require('prismjs');

// Use Treeview plugin
require('prismjs/plugins/treeview/prism-treeview.js');

const loadLanguages = require('prismjs/components/index');

// Required to make embedded highlighting work
loadLanguages(['markup', 'css', 'javascript']);

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function wrap(code, lang) {
    if (lang === 'text') {
        code = escapeHtml(code);
    }
    return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`;
}

function getLangCodeFromExtension(extension) {
    const extensionMap = {
        vue: 'markup',
        html: 'markup',
        md: 'markdown',
        rb: 'ruby',
        ts: 'typescript',
        py: 'python',
        sh: 'bash',
        yml: 'yaml',
        styl: 'stylus',
        kt: 'kotlin',
        rs: 'rust'
    };

    return extensionMap[extension] || extension;
}

export default (str, lang) => {
    if (!lang) {
        return wrap(str, 'text');
    }

    lang = lang.toLowerCase();
    const rawLang = lang;

    lang = getLangCodeFromExtension(lang);

    if (!prism.languages[lang]) {
        try {
            loadLanguages([lang]);
        } catch (e) {
            console.warn(`[vitepress] Syntax highlight for language "${lang}" is not supported.`);
        }
    }

    if (prism.languages[lang]) {
        const code = prism.highlight(str, prism.languages[lang], lang);
        return wrap(code, rawLang);
    }

    return wrap(str, 'text');
};
