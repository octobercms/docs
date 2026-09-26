<template>
    <section
        class="toggle-sidebar-group"
        :class="[
            {
                collapsable,
                'is-sub-group': depth !== 0
            },
            `depth-${depth}`
        ]"
    >
        <h6 class="toggle" @click="isOpen = ! isOpen">
            {{ isOpen ? "Less" : "More" }}
            <span
                class="toggle-arrow"
                :class="{ 'down': ! isOpen, 'up': isOpen }"
            >
                <DownChevron />
            </span>
        </h6>
        <SidebarLinks
            v-if="isOpen"
            class="sidebar-group-items"
            :items="item.toggleChildren"
            :sidebar-depth="item.sidebarDepth"
            :depth="depth + 1"
        />
    </section>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { isActive } from "../util";
import DownChevron from "../icons/DownChevron.vue";

export default {
    name: "ToggleSidebarGroup",

    components: {
        DownChevron,
        // Circular reference between ToggleSidebarGroup and SidebarLinks
        SidebarLinks: defineAsyncComponent(() => import("./SidebarLinks.vue")),
    },

    data() {
        return {
            isOpen: this.descendantIsActive(this.item)
        };
    },

    props: ["item", "open", "collapsable", "depth"],

    methods: {
        isActive,
        descendantIsActive(item) {
            const route = this.$route;
            if (item.type === "group") {
                return item.toggleChildren.some(child => {
                    if (child.type === "group") {
                        return this.descendantIsActive(child);
                    } else {
                        return child.type === "page" && isActive(route, child.path);
                    }
                });
            }
            return false;
        }
    }
};
</script>

<style lang="less">
@import "../styles/boot.less";

.toggle-sidebar-group {
    &.group-0 {
        margin-top: 0;
    }

    .sidebar-link {
        padding-left: .4rem;
    }

    .toggle {
        cursor: pointer;
        font-size: 14px;
        color: @text-color;
        margin: 0;

        &:hover {
            color: @october-purple;
        }
    }

    .toggle-arrow {
        position: relative;
        top: -1px;
        margin-left: 0.125rem;

        &.up {
            svg {
                transform: rotate(-180deg);
            }
        }
    }
}
</style>
