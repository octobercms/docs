<template>
    <div class="code-copy">
        <svg
            @click="copyToClipboard"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            :class="iconClass"
            :style="alignStyle"
        >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
                :fill="options.color"
                d="M12,4 C13.5976581,4 14.9400852,5.07360231 15.3206146,6.52653794 L16.2857143,6.52631579 C17.2324881,6.52631579 18,7.29382765 18,8.2406015 L18,18.2857143 C18,19.2324881 17.2324881,20 16.2857143,20 L7.71428571,20 C6.76751186,20 6,19.2324881 6,18.2857143 L6,8.2406015 C6,7.29382765 6.76751186,6.52631579 7.71428571,6.52631579 L8.67938537,6.52653794 C9.05991483,5.07360231 10.4023419,4 12,4 Z M15.5,10 L8.5,10 C8.22385763,10 8,10.2238576 8,10.5 C8,10.7454599 8.17687516,10.9496084 8.41012437,10.9919443 L8.5,11 L15.5,11 C15.7761424,11 16,10.7761424 16,10.5 C16,10.2238576 15.7761424,10 15.5,10 Z M12,5.68421053 C11.1715729,5.68421053 10.5,6.34400142 10.5,7.15789474 C10.5,7.97178805 11.1715729,8.63157895 12,8.63157895 C12.8284271,8.63157895 13.5,7.97178805 13.5,7.15789474 C13.5,6.34400142 12.8284271,5.68421053 12,5.68421053 Z"
            />
        </svg>
        <span :class="success ? 'success' : ''" :style="alignStyle">
            {{ options.successText }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        parent: Object,
        code: String,
        options: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            success: false,
            originalBackground: null,
            originalTransition: null
        }
    },
    computed: {
        alignStyle() {
            let style = {}
            style[this.options.align] = '7.5px'
            return style
        },
        iconClass() {
            return this.options.staticIcon ? '' : 'hover'
        }
    },
    mounted() {
        this.originalTransition = this.parent.style.transition
        this.originalBackground = this.parent.style.background
    },
    beforeUnmount() {
        this.parent.style.transition = this.originalTransition
        this.parent.style.background = this.originalBackground
    },
    methods: {
        // From: https://stackoverflow.com/a/5624139
        hexToRgb(hex) {
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result
                ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                  }
                : null
        },
        copyToClipboard(ev) {
            let codeToCopy = this.code;

            // Custom code for October HTM templates
            const octoberTemplate = ev.target.closest('.custom-block.cmstemplate');
            if (octoberTemplate) {
                const htmToCopy = [];
                octoberTemplate.querySelectorAll('div[class*="language-"] pre > code').forEach(function(el) {
                    htmToCopy.push(el.innerText);
                });
                codeToCopy = htmToCopy.join('==\n');
            }

            if (navigator.clipboard) {
                navigator.clipboard.writeText(codeToCopy).then(
                    () => {
                        this.setSuccessTransitions()
                    },
                    () => {}
                )
            } else {
                let copyelement = document.createElement('textarea')
                document.body.appendChild(copyelement)
                copyelement.value = codeToCopy
                copyelement.select()
                document.execCommand('Copy')
                copyelement.remove()

                this.setSuccessTransitions()
            }
        },
        setSuccessTransitions() {
            clearTimeout(this.successTimeout)

            if (this.options.backgroundTransition) {
                this.parent.style.transition = 'background 350ms'

                let color = this.hexToRgb(this.options.backgroundColor)
                this.parent.style.background = `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`
            }

            this.success = true
            this.successTimeout = setTimeout(() => {
                if (this.options.backgroundTransition) {
                    this.parent.style.background = this.originalBackground
                    this.parent.style.transition = this.originalTransition
                }
                this.success = false
            }, 500)
        }
    }
}
</script>

<style scoped>
svg {
    position: absolute;
    right: 7.5px;
    opacity: 0.75;
    cursor: pointer;
}

svg.hover {
    opacity: 0;
}

svg:hover {
    opacity: 1 !important;
}

span {
    position: absolute;
    font-size: 0.85rem;
    line-height: 0.425rem;
    right: 50px;
    opacity: 0;
    transition: opacity 500ms;
}

.success {
    opacity: 1 !important;
}
</style>
