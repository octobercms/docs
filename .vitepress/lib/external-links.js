/**
 * External links get `target="_blank" rel="noopener noreferrer" class="is-ext"`
 * plus the inline OutboundLink icon.
 */
const outboundIcon =
    '<span><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg> <span class="sr-only">(opens new window)</span></span>';

const outboundRE = /^[a-z]+:/i;

export default md => {
    const defaultLinkOpen =
        md.renderer.rules.link_open ||
        ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const href = token.attrGet('href') || '';

        if (outboundRE.test(href) && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            token.attrSet('target', '_blank');
            token.attrSet('rel', 'noopener noreferrer');

            const existingClass = token.attrGet('class');
            token.attrSet('class', existingClass ? existingClass + ' is-ext' : 'is-ext');

            // Flag so link_close appends the outbound icon
            let depth = 0;
            for (let i = idx + 1; i < tokens.length; i++) {
                if (tokens[i].type === 'link_open') {
                    depth++;
                }
                else if (tokens[i].type === 'link_close') {
                    if (depth === 0) {
                        tokens[i].meta = Object.assign({}, tokens[i].meta, { isExternal: true });
                        break;
                    }
                    depth--;
                }
            }
        }

        return defaultLinkOpen(tokens, idx, options, env, self);
    };

    const defaultLinkClose =
        md.renderer.rules.link_close ||
        ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

    md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
        const rendered = defaultLinkClose(tokens, idx, options, env, self);

        if (tokens[idx].meta && tokens[idx].meta.isExternal) {
            return outboundIcon + rendered;
        }

        return rendered;
    };
};
