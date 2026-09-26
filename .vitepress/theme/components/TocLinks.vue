<template>
    <div v-if="items.length" :class="cssClass">
        <ul v-if="items[0].children.length">
            <template v-for="(item, i) in items[0].children">
                <li :class="{ active: isActive($route, item.path) }">
                    <a :href="item.path">{{ item.title }}</a>
                </li>

                <template v-for="(child, j) in item.children">
                    <li v-if="child.level <= maxChildLevel" :class="{ 'level-2': true, active: isActive($route, $page.path + '#' + child.slug) }">
                        <a :href="'#' + child.slug">{{ child.title }}</a>
                    </li>
                </template>
            </template>
        </ul>

        <p v-if="hasCollapsedItems" class="more-link">
            <a href="#" @click.prevent="onExpandClick">More...</a>
        </p>
    </div>
</template>
<style lang="less">
@import "../styles/boot.less";

.auto-toc {
    ul li {
        a {
            font-size: 14px;
            margin: 5px 0;
            display: inline-block;
            color: #536061;
            text-decoration: none;
        }

        &.active a {
            color: @october-purple;
            font-weight: 500;
        }
    }

    p.more-link {
        font-size: 14px;
        margin-top: -35px;
    }

    > div.collapsed ul li:nth-child(n+6) {
        display: none;
    }

    > div > ul:first-child {
        padding: 0;
        margin: 0 0 @line-grid-standard-padding 0;

        li, a {
            line-height: 1.4;
        }

        li.level-2 {
            padding-left: 20px;
        }

        &, ul {
            list-style: none;
        }

        ul {
            padding-left: 20px;
            margin-bottom: 0 !important;
        }
    }
}
</style>
<script>
import { isActive } from "../util";

export default {
    name: 'TocLinks',

    data() {
        return {
            collapsed: true,
            maxItemsCollapsed: 5,
            maxChildLevel: 3
        };
    },

    computed: {
        cssClass() {
            let result = '';

            if (this.collapsible && this.collapsed) {
                result = 'collapsed';
            }

            return result;
        },

        hasCollapsedItems() {
            if (!this.items.length) {
                return false;
            }

            if (!this.collapsible || !this.collapsed) {
                return false;
            }

            let globalIndex = 0;
            for (let index=0; index < this.items[0].children.length; index++) {
                globalIndex++;
                let item = this.items[0].children[index];
                if (globalIndex > this.maxItemsCollapsed) {
                    return true;
                }

                if (!item.children.length) {
                    continue;
                }

                for (let cIndex=0; cIndex < item.children.length; cIndex++) {
                    if (item.children[cIndex].level > this.maxChildLevel) {
                        continue;
                    }

                    globalIndex++;
                    if (globalIndex > this.maxItemsCollapsed) {
                        return true;
                    }
                }

            }

            return false;
        }
    },

    methods: {
        onExpandClick() {
            this.collapsed = false;
        },
        isActive
    },

    props: [
        'collapsible',
        'items',
    ],
}
</script>
