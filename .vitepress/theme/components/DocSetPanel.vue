<template>
    <div class="control-docsetpanel">

        <div class="primary-panel">
            <template v-for="(set, index) in $site.themeConfig.docSets">
                <RouterLink
                    v-if="$page.frontmatter.home && set.primarySet"
                    :to="defaultUri(set)"
                    class="primary-link"
                >
                    <span class="inline-block primary-icon">
                        <img :src="set.icon" width="16" height="16" alt />
                    </span>
                    <span class="title">{{ set.setTitle ? set.setTitle : set.title }}</span>
                </RouterLink>
            </template>
        </div>

        <div v-if="$activeSet" class="active-panel">
            <RouterLink :to="defaultUri($activeSet)" class="active-link">
                <span class="inline-block active-icon">
                    <img :src="$activeSet.icon" width="28" height="28" alt />
                </span>
                <span class="title">{{ $activeSet.setTitle ? $activeSet.setTitle : $activeSet.title }}</span>
            </RouterLink>
        </div>

    </div>
</template>

<style lang="less">
.control-docsetpanel {
    .primary-panel {
        .primary-icon {
            position: relative;
            top: -2px;
        }
    }
}
</style>

<script>
import { getDocSetDefaultUri } from "../util";

export default {
    methods: {
        defaultUri(set) {
            return getDocSetDefaultUri(set);
        },
    },
};
</script>
