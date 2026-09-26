<template>
    <div class="pre-heading">
        <blockquote
            v-if="suggestedUpdatePath"
            class="version-warning"
        >
            <p>
                {{ $trans.old_version_warning }}
                <RouterLink :to="suggestedUpdatePath">{{ $trans.old_version_link }} →</RouterLink>
            </p>
        </blockquote>
    </div>
</template>
<script>
import { getSameContentForVersion } from "../util";

export default {
    mounted() {
        this.checkReferrer();
    },
    data() {
        return {
            suggestedUpdatePath: null,
        };
    },
    methods: {
        checkReferrer() {
            if (
                !this.$activeSet ||
                !this.$activeSet.versions ||
                !this.$activeVersion
            ) {
                // Only set content should generate suggestions
                return;
            }

            const isDefaultVersion = this.$activeSet.defaultVersion === this.$activeVersion;
            const isNewestVersion = this.$activeVersion === this.$activeSet.versions[0][0];

            // Only make suggestions for past versions
            if (isDefaultVersion || isNewestVersion) {
                return;
            }

            const alternateVersionPath = getSameContentForVersion(
                this.$activeSet.defaultVersion,
                this.$activeSet,
                this.$activeVersion,
                this.$page,
                this.$site.pages,
                false
            );

            if (alternateVersionPath === false) {
                return;
            }

            const searchMatch = [
                /google\.com/,
                /yahoo\.com/,
                /bing\.com/,
                /duckduckgo\.com/,
            ];

            // Does it look like the visitor came from a search engine?
            const isSearchReferral = searchMatch.some((item) =>
                item.test(document.referrer)
            );

            if (isSearchReferral || true) {
                this.suggestedUpdatePath = alternateVersionPath;
            }
        },
    },
};
</script>
