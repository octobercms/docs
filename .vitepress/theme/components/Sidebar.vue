<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="mobile-sidebar">
                <div class="mobile-search">
                    <SearchBox v-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
                </div>
                <DocSetVersion @select-version="handleVersionSelect" />
                <DocSetLocale :set="$activeSet" @select-language="handleLanguageSelect" />
            </div>
        </div>
        <div class="sidebar-content">
            <div class="docs-index" v-if="!$activeSet && !(items && items.length)">
                <DocSetPanel @select-version="handleVersionSelect" />
            </div>
            <div class="docs-nav" v-if="$activeSet || (items && items.length)">
                <SidebarLinks
                    :depth="0"
                    :items="items"
                    :extra-items="extraItems"
                />
            </div>
        </div>
        <div class="sidebar-footer">
            <!--
            <ExtraSidebarItems
                v-if="extraItems && extraItems.length"
                :items="extraItems"
            />
            -->
        </div>
    </aside>
</template>

<script>
import SidebarLinks from './SidebarLinks.vue'
import DocSetPanel from './DocSetPanel.vue'
import SearchBox from './SearchBox.vue'
import DocSetVersion from './DocSetVersion.vue'
import DocSetLocale from './DocSetLocale.vue'

export default {
    name: 'Sidebar',
    components: {
        SidebarLinks,
        DocSetPanel,
        SearchBox,
        DocSetVersion,
        DocSetLocale
    },
    props: ['items', 'extraItems', 'set', 'language'],
    methods: {
        handleLanguageSelect(selected) {
            this.$emit("select-language", selected);
        },
        handleVersionSelect(selected) {
            this.$emit("select-version", selected);
        },
    }
}
</script>

<style lang="less">
@import "../styles/boot.less";
.sidebar {
    ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
    }
    a {
        display: inline-block;
        text-decoration: none;
    }
    > .sidebar-links {
        padding: 1.5rem 0;
        > li > a.sidebar-link {
            font-size: 1.1em;
            line-height: 1.7;
            font-weight: bold;
        }
        > li:not(:first-child) {
            margin-top: 0.75rem;
        }
    }
}

@media (min-width: @screen-sm-min) {
    .sidebar {
        .nav-links {
            display: block;
        }
        & > .sidebar-links {
            padding: 1rem 0;
        }
    }
}
</style>
