<template>
    <div class="search-box">
        <input
            ref="input"
            aria-label="Search"
            :value="query"
            :class="{ focused: focused }"
            :placeholder="placeholder"
            class="search-box-input"
            autocomplete="off"
            spellcheck="false"
            @input="query = $event.target.value"
            @focus="focused = true"
            @blur="focused = false"
            @keyup.enter="go(focusIndex)"
            @keyup.up="onUp"
            @keyup.down="onDown"
        />
        <span class="search-icon-hotkey">/</span>
        <div
            v-if="showSuggestions"
            class="search-results"
            @mouseleave="unfocus"
        >
            <div v-for="(s, i) in suggestions" :key="i">
                <div
                    v-if="!$activeSet && shouldShowSetTitle(s, i)"
                    class="result-docset"
                    :class="{ first: shouldShowSetTitle(s, i) && i === 0 }"
                >{{ s.docSetTitle }}</div>
                <div
                    class="result-item"
                    :class="{
                        focused: i === focusIndex,
                        first: i === 0,
                        last: i === suggestions.length - 1
                    }"
                    @mousedown="go(i)"
                    @mouseenter="focus(i)"
                >
                    <a :href="s.path + s.slug" @click.prevent>
                        <div class="result-row">
                            <div
                                class="page-title"
                                v-html="s.match == 'title' ? highlight(s.title || s.path) : s.title || s.path"
                            ></div>
                            <div class="result-content">
                                <div
                                    class="header"
                                    v-if="s.headingStr"
                                    v-html="s.match == 'header' ? highlight(s.headingStr) : s.headingStr"
                                ></div>
                                <div
                                    class="excerpt"
                                    v-if="s.contentStr && s.headingStr != s.contentStr"
                                    v-html="s.match == 'content' ? highlight(s.contentStr) : s.contentStr"
                                ></div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchService from "../util/flexsearch-service";

export default {
    name: "SearchBox",
    data() {
        return {
            query: "",
            focused: false,
            focusIndex: 0,
            maxSuggestions: 10,
            suggestions: null,
            hotkeys: ["/"],
        };
    },
    computed: {
        queryTerms() {
            if (!this.query) return [];
            const result = this.query
                .trim()
                .toLowerCase()
                .split(/[^\p{L}]+/iu)
                .filter((t) => t);
            return result;
        },
        showSuggestions() {
            return this.focused && this.suggestions && this.suggestions.length;
        },
        placeholder() {
            return (
                this.$trans.search_placeholder ||
                this.$activeSet.searchPlaceholder ||
                this.$site.themeConfig.searchPlaceholder ||
                "Search"
            );
        },
    },
    watch: {
        query() {
            this.getSuggestions();
        },
    },
    mounted() {
        // the search records are code-split into their own chunk and only
        // fetched (then indexed) once a search box mounts
        if (!searchService.isIndexed()) {
            import("../data/search.data.mjs").then(({ data }) => {
                searchService.buildIndex(
                    data.map(page => ({
                        ...page,
                        contentLowercase: page.content.toLowerCase()
                    }))
                );
            });
        }

        document.addEventListener("keydown", this.onHotkey);
    },
    beforeUnmount() {
        document.removeEventListener("keydown", this.onHotkey);
    },
    methods: {
        highlight(str) {
            if (!this.queryTerms.length) {
                return str;
            }

            str = this.escapeHtml(str.trim());

            return str.replace(new RegExp(this.query, "gi"), (match) => {
                return `<mark>${match}</mark>`;
            });
        },
        escapeHtml(unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        },
        async getSuggestions() {
            if (!this.query || !this.queryTerms.length) {
                this.suggestions = [];
                return;
            }

            this.suggestions = await searchService.match(
                this.query,
                this.queryTerms,
                this.$activeSet ? this.$activeSet.handle : false,
                this.$activeVersion,
                this.$lang,
                this.maxSuggestions
            );
        },
        onHotkey(event) {
            if (
                event.srcElement !== this.$refs.input &&
                this.hotkeys.includes(event.key)
            ) {
                this.$refs.input.focus();
                event.preventDefault();
            }

            if (event.keyCode === 27) {
                this.query = "";
                this.$refs.input.blur();
                event.preventDefault();
            }
        },
        onUp() {
            if (this.showSuggestions) {
                if (this.focusIndex > 0) {
                    this.focusIndex--;
                } else {
                    this.focusIndex = this.suggestions.length - 1;
                }
            }
        },
        onDown() {
            if (this.showSuggestions) {
                if (this.focusIndex < this.suggestions.length - 1) {
                    this.focusIndex++;
                } else {
                    this.focusIndex = 0;
                }
            }
        },
        go(i) {
            if (!this.showSuggestions) {
                return;
            }
            this.$router.push(this.suggestions[i].path + this.suggestions[i].slug);
            this.query = "";
            this.$refs.input.blur();
            this.focusIndex = 0;
        },
        focus(i) {
            this.focusIndex = i;
        },
        unfocus() {
            this.focusIndex = -1;
        },
        shouldShowSetTitle(suggestion, index) {
            let previousSuggestion = this.suggestions[index - 1];

            return (
                !previousSuggestion ||
                previousSuggestion.docSetTitle !== suggestion.docSetTitle
            );
        },
    },
};
</script>

<style lang="less">
@import "../styles/boot.less";

.search-box {
    position: relative;
    width: 100%;

    .search-icon-hotkey {
        display: block;
        width: 20px;
        height: 20px;
        line-height: 18px;
        border: 1px solid @header-border-color;
        border-radius: 3px;
        position: absolute;
        background: #ecf0f1;
        text-align: center;
        font-size: 16px;
        color: #616d6e;

        right: 8px;
        top: 8px;
    }

    .search-box-input {
        background-color: #fff;
        border: 1px solid @header-border-color;
        width: 100%;
        border-radius: 5px;
        height: 35px;
        padding: 0 16px;
        padding-top: 2px;
        font-size: 16px;
        line-height: 1.42857143;
        transition: border-color ease-in-out .15s;

        &::placeholder {
            color: #b9c0c4;
        }

        &:focus {
            border-color: @header-border-active-color;
            outline: 0;
        }
    }
}

.search-results {
    background: #fff;
    position: absolute;
    z-index: 50;
    border-radius: 5px;
    list-style-type: none;
    box-shadow: 0 20px 55px rgba(0, 0, 0, 0.3);
    top: 40px;
    z-index: 20;
    max-height: calc(100vh - 140px);
    overflow: auto;

    mark {
        color: #333;
        background-color: rgba(255, 116, 116, .4);
    }

    .result-item.focused mark {
        background-color: rgba(255, 116, 116, .9);
        color: #fff;
    }
}

.result-docset {
    padding: 5px 10px;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
    user-select: none;
    background: #f0f0f0;
    position: relative;

    &.first {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin-top: 0;
        margin-bottom: 0;
    }
}

.result-item {
    cursor: pointer;
    border-radius: 5px;
    margin: 0 5px;
    line-height: 1.4;

    a {
        text-decoration: none;
        color: #586667;
    }

    .result-row {
        width: 100%;
        padding-bottom: 10px;

        .page-title,
        .result-content {
            padding: 4px 6px;
        }

        .page-title {
            font-size: 14px;
            font-weight: 600;
            color: @october-purple;
        }

        .result-content {
            .header {
                font-weight: 600;
                font-size: 12px;
            }

            .excerpt {
                font-size: 12px;
                overflow: hidden;
            }
        }
    }

    &.focused {
        background-color: @october-purple;
        color: #fff;

        a, .page-title {
            color: #fff;
        }
    }

    &.first {
        margin-top: 0.5rem;
    }

    &.last {
        margin-bottom: 0.5rem;
    }
}
</style>
