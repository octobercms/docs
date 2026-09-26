<template>
    <div>
        <div class="header-home-link">
            <a href="https://octobercms.com/">
                <img src="/images/october-leaf.svg" width="16" height="16" alt="October CMS" />
                {{ $trans.header_home_link || "Main Website" }} →
            </a>
        </div>
        <div class="header-tabs">
            <template v-if="items && items.length">
                <div v-for="item in items" :class="isActive(item) ? 'is-active' : ''">
                    <RouterLink v-if="!isExternal(item.link)" :to="item.link">
                        <span class="sidebar-extra-title">{{ item.title }}</span>
                    </RouterLink>
                    <a
                        v-else
                        :href="item.link"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <span class="sidebar-extra-title">{{ item.title }}</span>
                    </a>
                </div>
            </template>
            <template v-else-if="$page.frontmatter.home">
                <div class="is-active">
                    <RouterLink to="/">
                        <span class="sidebar-extra-title">Home</span>
                    </RouterLink>
                </div>
                <div v-for="set in docSetTabs">
                    <RouterLink :to="set.link">
                        <span class="sidebar-extra-title">{{ set.title }}</span>
                    </RouterLink>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="less">
@import "../styles/boot.less";
</style>

<script>
import { isExternal, getDocSetDefaultUri } from "../util";

export default {
    props: ["items"],
    computed: {
        docSetTabs() {
            return (this.$site.themeConfig.docSets || [])
                .filter(set => set.primarySet)
                .map(set => ({
                    title: set.setTitle || set.title,
                    link: set.defaultUri || getDocSetDefaultUri(set)
                }));
        }
    },
    methods: {
        isExternal(link) {
            return isExternal(link);
        },
        isActive (item) {
            return this.findActiveItem(this.$route.path) === item.prefix;
        },
        findActiveItem(path) {
            let result = this.items
                .map(a => a.prefix)
                .sort((a, b) => b.length - a.length)
            ;

            for (var key in result) {
                if (path.startsWith(result[key])) {
                    return result[key];
                }
            }
            return null;
        }
    },
};
</script>
