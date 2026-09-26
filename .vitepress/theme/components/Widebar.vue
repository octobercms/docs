<template>
    <div class="widebar">
        <h6>{{ $trans.on_this_page || 'On This Page' }}</h6>
        <div class="widebar-links auto-toc" v-if="headingItems.length && headingItems[0].children.length">
            <TocLinks :depth="0" :items="headingItems" />
        </div>
    </div>
</template>

<script>
import TocLinks from "./TocLinks.vue";

export default {
    name: 'Widebar',
    components: {
        TocLinks,
    },
    props: ['headingItems']
}
</script>

<style lang="less">
@import "../styles/boot.less";

.widebar {
    h6 {
        padding: 45px 0 0;
        margin-bottom: 15px;
        text-transform: uppercase;
        font-size: 16px;
    }
    > .widebar-links {
        li {
            margin: 0;
            padding: 0;
            font-size: 14px;
        }

        li a {
            color: @text-color-secondary;
            text-decoration: none;

            &:hover {
                color: @october-purple;
                text-decoration: underline;
            }

            &.active {
                color: @october-purple;
            }
        }
    }
}
</style>
