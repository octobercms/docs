<template>
    <div class="extra-sidebar-items">
        <div class="sidebar-extra-divider"></div>
        <div v-for="item in items">
            <RouterLink v-if=" ! isExternal(item.link)" :to="item.link" class="sidebar-extra-item">
                <span class="sidebar-extra-icon">
                    <img :src="item.icon" width="16" height="16" alt />
                </span>
                <span class="sidebar-extra-title">{{ item.title }}</span>
            </RouterLink>
            <a
                v-else
                :href="item.link"
                class="sidebar-extra-item"
                rel="noopener noreferrer"
                target="_blank"
            >
                <span class="sidebar-extra-icon">
                    <img :src="item.icon" width="16" height="16" alt />
                </span>
                <span class="sidebar-extra-title">{{ item.title }}</span>
                <OutboundLink />
            </a>
        </div>
    </div>
</template>

<style lang="less">
@import "../styles/boot.less";

.sidebar-extra-divider {
    border-top: 1px solid @grid-line-color;
    margin-top: 1px;
    padding-top: 3px;
}

.sidebar-extra-item {
    padding-top: 2px;
    padding-bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: @text-accent-color;
    }

    // Muted outbound icon
    .icon.outbound {
        color: lighten(@text-color-secondary, 30%);
    }

    &:hover .icon.outbound {
        color: @text-accent-color;
    }
}

.sidebar-extra-icon {
    height: 12px;
    width: 12px;
    margin: 5px;
    margin-left: 0;
    position: relative;
    top: -2px;
    display: inline-block;
}
</style>

<script>
import { isExternal } from "../util";

export default {
    props: ["items"],
    methods: {
        isExternal(link) {
            return isExternal(link);
        },
    },
};
</script>
