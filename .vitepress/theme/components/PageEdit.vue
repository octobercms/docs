<template>
    <footer class="page-edit">
        <div
            v-if="editLink"
            class="edit-link"
        >
            <a
                :href="editLink"
                target="_blank"
                rel="noopener noreferrer"
                class="is-ext">
                {{ editLinkText }}
            </a>
        </div>

        <div
            v-if="$page.relativePath"
            class="copy-markdown"
        >
            <a
                href="javascript:;"
                role="button"
                @click.prevent.stop="copyAsMarkdown">
                {{ copyText }}
            </a>
        </div>

        <div
            v-if="lastUpdated"
            class="last-updated"
        >
            <span class="prefix">{{ lastUpdatedText }}:</span>
            <span class="time">{{ lastUpdated }}</span>
        </div>
    </footer>
</template>

<script>
import { isNil } from 'lodash-es'
import { endingSlashRE, outboundRE } from '../util'

export default {
    name: 'PageEdit',

    data() {
        return {
            copyText: 'Copy as Markdown',
            copying: false
        }
    },

    computed: {
        lastUpdated () {
            return this.$page.lastUpdated
        },

        lastUpdatedText () {
            if (typeof this.$trans.last_updated === 'string') {
                return this.$trans.last_updated;
            }
            if (typeof this.$site.themeConfig.lastUpdated === 'string') {
                return this.$site.themeConfig.lastUpdated
            }
            return 'Last Updated'
        },

        editLink () {
            const showEditLink = isNil(this.$page.frontmatter.editLink)
                ? this.$site.themeConfig.editLinks
                : this.$page.frontmatter.editLink

            const {
                repo,
                docsDir = '',
                docsBranch = 'develop',
                docsRepo = repo
            } = this.$site.themeConfig

            if (showEditLink && docsRepo && this.$page.relativePath) {
                return this.createEditLink(
                    repo,
                    docsRepo,
                    docsDir,
                    docsBranch,
                    this.$page.relativePath
                )
            }
            return null
        },

        editLinkText () {
            return (
                this.$trans.edit_this_page ||
                this.$site.themeConfig.editLinkText ||
                `Edit this page`
            )
        }
    },

    methods: {
        createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
            const base = outboundRE.test(docsRepo)
                ? docsRepo
                : `https://github.com/${docsRepo}`
            return (
                base.replace(endingSlashRE, '')
                + '/edit'
                + `/${docsBranch}/`
                + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
                + path
            )
        },

        async copyAsMarkdown() {
            if (this.copying) return;

            const { docsBranch = 'develop' } = this.$site.themeConfig;
            const rawUrl = `https://raw.githubusercontent.com/octobercms/docs/${docsBranch}/${this.$page.relativePath}`;

            try {
                this.copying = true;
                const response = await fetch(rawUrl);
                if (!response.ok) throw new Error('Failed to fetch');

                const markdown = await response.text();

                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(markdown);
                } else {
                    const textarea = document.createElement('textarea');
                    document.body.appendChild(textarea);
                    textarea.value = markdown;
                    textarea.select();
                    document.execCommand('Copy');
                    textarea.remove();
                }

                this.copyText = 'Copied!';
                setTimeout(() => {
                    this.copyText = 'Copy as Markdown';
                    this.copying = false;
                }, 1500);
            } catch (e) {
                this.copyText = 'Error';
                setTimeout(() => {
                    this.copyText = 'Copy as Markdown';
                    this.copying = false;
                }, 1500);
            }
        }
    }
}
</script>

<style lang="less">
@import "../styles/boot.less";

.page-edit {
    padding-top: 50px;
    padding-bottom: 1rem;
    overflow: auto;

    .edit-link,
    .copy-markdown {
        display: inline-block;
        font-size: 14px;
        a {
            color: #7F8C8D;
            margin-right: 0.25rem;
            position: relative;
            padding-left: 25px;
            text-decoration: none;
            &:hover {
                color: @october-purple;
                text-decoration: underline;
            }
        }
    }

    .edit-link {
        a:before {
            content: '';
            position: absolute;
            width: 16px;
            height: 15px;
            background: transparent url('/images/edit-page.svg') no-repeat left top;
            left: 0;
            top: 1px;
        }
    }

    .copy-markdown {
        margin-left: 20px;
        a:before {
            content: '';
            position: absolute;
            width: 16px;
            height: 15px;
            background: transparent url('/images/copy-markdown.svg') no-repeat left top;
            left: 0;
            top: 1px;
        }
    }
    .last-updated {
        float: right;
        font-size: 0.9em;
        .prefix {
            font-weight: 500;
            color: #666;
        }
        .time {
            font-weight: 400;
            color: #767676;
        }
    }
}

@media (max-width: @screen-sm-max) {
    .page-edit, .edit-link {
        margin-bottom: 0.5rem;
    }
    .last-updated {
        font-size: 0.8em;
        float: none;
        text-align: left;
    }
}
</style>
