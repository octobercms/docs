/**
 * Custom markdown-it transforms. Wraps tables, splits content on `---` rules,
 * adds pre/post heading component hooks and de-widows text.
 */
import container from 'markdown-it-container';

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderInlineCode(tokens, idx, options, env, renderer) {
    var token = tokens[idx];

    return (
        '<code v-pre' +
        renderer.renderAttrs(token) +
        '>' +
        escapeHtml(tokens[idx].content) +
        '</code>'
    );
}

/**
 * Wrap tables in div.table for stylistic improvement.
 * @param {*} tokens
 */
function tables(Token, tokens) {
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i];
        if (
            t.type === 'table_open' &&
            (i === 0 || tokens[i - 1].content !== `<div class="table">\n`)
        ) {
            for (let j = i + 1; j < tokens.length; j++) {
                let t2 = tokens[j];
                if (t2.type === 'table_close') {
                    let replaceTokens = [
                        openBlock(Token, 'table', t.level),
                        ...tokens.slice(i, j + 1),
                        closeBlock(Token, t.level)
                    ];
                    // Replace the full original token range; splicing a shorter
                    // range would leave a duplicate table_close (stray </table>)
                    // behind, which the template compiler rejects.
                    tokens.splice(i, j - i + 1, ...replaceTokens);

                    // Skip ahead
                    i += replaceTokens.length - 1;
                    break;
                }
            }
        }
    }
}

function split(Token, tokens) {
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i];
        if (t.type === 'hr') {
            let leftContentStart = 0,
                rightContentEnd = tokens.length - 1;

            // See if there's a previous h2/h3
            for (let j = i - 1; j >= 0; j--) {
                if (isHeading(tokens[j], 'heading_close')) {
                    leftContentStart = j + 1;
                    break;
                }
            }

            // See if there's another h2/h3 afterwards
            for (let j = i + 1; j < rightContentEnd; j++) {
                if (isHeading(tokens[j], 'heading_open')) {
                    rightContentEnd = j - 1;
                    break;
                }
            }

            let leftTokens = tokens.slice(leftContentStart, i);
            let rightTokens = tokens.slice(i + 1, rightContentEnd + 1);

            let replaceTokens = [
                openBlock(Token, 'split'),
                openBlock(Token, 'left'),
                ...leftTokens,
                closeBlock(Token),
                openBlock(Token, 'right'),
                ...rightTokens,
                closeBlock(Token),
                closeBlock(Token)
            ];

            tokens.splice(
                leftContentStart,
                rightContentEnd - leftContentStart + 1,
                ...replaceTokens
            );

            // Skip ahead
            i = leftContentStart + replaceTokens.length;
        }
    }
}

function isHeading(t, type) {
    return (
        t.type === type && (t.tag === 'h1' || t.tag === 'h2' || t.tag === 'h3')
    );
}

function block(Token, tag, level) {
    var t = new Token('html_block', '', 0);
    t.content = `${tag}\n`;
    t.block = true;
    t.level = level || 0;
    return t;
}

function openBlock(Token, klass, level) {
    return block(Token, `<div class="${klass}">`, level);
}

function closeBlock(Token, level) {
    return block(Token, '</div>', level);
}

/**
 * Surround first `<h1>` with special PreHeading and PostHeading components.
 *
 * We use these for things like smaller intro headings, displaying post metadata,
 * and the conditionally-displayed automatic table of contents.
 */
function customHeadingSlots(Token, tokens) {
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i];

        if (t.tag === 'h1') {
            if (t.type === 'heading_open') {
                let preHeading = [block(Token, `<pre-heading></pre-heading>`, t.level)];

                tokens.splice(i > 0 ? i - 1 : 0, 0, ...preHeading);
                i += 1;
            }

            if (t.type === 'heading_close') {
                let postHeading = [block(Token, `<post-heading></post-heading>`, t.level)];

                tokens.splice(i + 1, 0, ...postHeading);

                // Stop after first h1 close; we only need to do this once
                break;
            }
        }
    }
}

/**
 * Adds a non-breaking space between the last two words of text to avoid
 * typographic widows/orphans.
 */
function dewidowText(tokens, idx, options, env, renderer) {
    // Inner text content — escape it like the default markdown-it text rule so
    // the template compiler never sees stray < characters.
    let content = escapeHtml(tokens[idx].content);
    // Characters that indicate the end of a sentence
    const endSentenceChars = ['.', ':', '!', '…', '?'];
    // Last character of content
    const lastChar = content.slice(-1);
    // Only consider strings likely to occupy more than one line
    const minContentLength = 60;
    // Avoid joining really long words
    const maxWordLength = 50;

    // Make sure we’ve got text at the end of a sentence
    if (endSentenceChars.includes(lastChar) && content.length > minContentLength) {
        const words = content.split(' ');
        const len = words.length;
        if (len > 1 && words[len - 2].length + words[len - 1].length < maxWordLength) {
            words[len - 2] += '&nbsp;' + words[len - 1];
            var lastWord = words.pop().replace(/.*((?:<\/\w+>)*)$/, '$1');
            content = words.join(' ') + lastWord;
        }
    }

    return content;
}

export default md => {
    // Markdown-it Token class, taken from a parsed instance so we do not need
    // a direct dependency on markdown-it internals
    const Token = md.parse('x', {})[0].constructor;

    // Custom <code> renders
    md.renderer.rules.code_inline = renderInlineCode;
    md.renderer.rules.text = dewidowText;

    // Override parse()
    const parse = md.parse;
    md.parse = (...args) => {
        const tokens = parse.call(md, ...args);
        tables(Token, tokens);
        split(Token, tokens);
        customHeadingSlots(Token, tokens);
        return tokens;
    };

    md.use(container, 'code', {
        render(tokens, idx) {
            return '';
        }
    });
};
