<template>
    <section
        class="sidebar-group"
        :class="[
            {
                collapsable,
                'is-sub-group': depth !== 0,
                'has-icon': !!item.icon,
            },
            `depth-${depth}`,
        ]"
    >
        <RouterLink
            v-if="item.path"
            class="sidebar-heading clickable"
            :class="{
                open,
                active: isActive($route, item.path),
            }"
            :to="item.path"
            @click="$emit('toggle')"
        >
            <span v-if="collapsable" class="arrow" :class="open ? 'down' : 'right'" />
            <i v-if="item.icon" :class="item.icon" class="sidebar-heading-icon"></i>
            <span class="title">{{ item.title }}</span>
        </RouterLink>

        <p
            v-else
            class="sidebar-heading"
            :class="{ open }"
            @click="$emit('toggle')"
        >
            <span v-if="collapsable" class="arrow" :class="open ? 'down' : 'right'" />
            <i v-if="item.icon" :class="item.icon" class="sidebar-heading-icon"></i>
            <span class="title">{{ item.title }}</span>
        </p>

        <DropdownTransition>
            <SidebarLinks
                v-if="open || !collapsable"
                class="sidebar-group-items"
                :items="item.children"
                :sidebar-depth="item.sidebarDepth || sidebarDepth"
                :depth="depth + 1"
            />
        </DropdownTransition>
    </section>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { isActive } from "../util";
import DropdownTransition from "./DropdownTransition.vue";

export default {
    name: "SidebarGroup",

    components: {
        DropdownTransition,
        // Circular reference between SidebarGroup and SidebarLinks
        SidebarLinks: defineAsyncComponent(() => import("./SidebarLinks.vue")),
    },

    props: [
        "item",
        "open",
        "collapsable",
        "depth",
        "sidebarDepth",
    ],

    emits: ["toggle"],

    methods: { isActive },
};
</script>

<style lang="less">
.sidebar-group {
    margin-top: 10px;

    &.group-0 {
        margin-top: 0;
    }

    &:not(.collapsable) {
        .sidebar-heading:not(.clickable) {
            cursor: auto;
            color: inherit;
        }
    }

    &.is-sub-group {
        padding-left: 0;

        & > .sidebar-heading {
            padding-left: 20px;
            line-height: 1.4;

            &:not(.clickable) {
                opacity: 0.5;
            }
        }

        & > .sidebar-group-items {
            padding-left: 10px;

            & > li > .sidebar-link {
                font-size: 0.95em;
            }
        }
    }
}

.sidebar-heading {
    box-sizing: border-box;
    margin: 0;
    width: 100%;
    cursor: pointer;
    transition: color 0.15s ease;
    margin-bottom: 5px;
    position: relative;
    font-size: 15px;

    &:hover {
        color: inherit;
    }

    .sidebar-heading-icon {
        font-size: 18px;
        position: relative;
        top: 2px;
        margin-left: 15px;
        color: #888;
    }

    span.title {
        color: #333;
        font-weight: 500;
        margin-left: 15px;
    }

    .sidebar-heading-icon + span.title {
        margin-left: 6px;
    }

    span.arrow {
        position: absolute;
        top: 7px;
        left: 0;
        &.down {
            top: 9px;
        }
    }
}

.sidebar-group-items {
    overflow: hidden;
    transition: height 0.1s ease-out;
    font-size: 0.95em;
}
</style>
