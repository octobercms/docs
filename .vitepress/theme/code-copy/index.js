/**
 * Mounts a CodeCopy button inside every rendered code block.
 */
import { createVNode, render } from 'vue';
import CodeCopy from './CodeCopy.vue';

const options = {
    selector: 'div[class*="language-"] pre',
    align: 'bottom',
    color: '#ffffff',
    backgroundColor: '#0075b8',
    backgroundTransition: true,
    successText: 'Copied!',
    staticIcon: false
};

export function updateCodeCopies() {
    if (typeof document === 'undefined') {
        return;
    }

    setTimeout(() => {
        document.querySelectorAll(options.selector).forEach(el => {
            if (el.classList.contains('code-copy-added')) return;

            const container = document.createElement('div');
            const vnode = createVNode(CodeCopy, {
                options: { ...options },
                code: el.innerText,
                parent: el
            });

            render(vnode, container);

            el.classList.add('code-copy-added');

            // Adds a fallback for code blocks that don't define a language
            el.classList.add('language-text');

            el.appendChild(vnode.el);
        });
    }, 100);
}
