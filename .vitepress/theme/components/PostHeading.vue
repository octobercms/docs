<template>
    <div class="post-heading">
        <p v-if="$frontmatter.subtitle" class="subtitle">{{ $frontmatter.subtitle }}</p>
        <div class="auto-toc" v-if="$frontmatter.widebar !== false && headingItems.length && headingItems[0].children.length">
            <TocLinks :depth="0" :items="headingItems" :collapsible="true" />
        </div>
    </div>
</template>

<style lang="less">
@import "../styles/boot.less";

.post-heading {
    display: block;

    .auto-toc {
        margin-top: 0.75rem;
        margin-bottom: 1.5rem;
        width: 100%;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: #ccc;

        @media (min-width: @screen-xlg-min) {
            display: none;
        }
    }
}
</style>

<script>
import { resolveHeaders } from "../util";
import TocLinks from "./TocLinks.vue";

export default {
    components: {
        TocLinks,
    },
    computed: {
        headingItems() {
            return resolveHeaders(this.$page);
        },
    },
};
</script>
