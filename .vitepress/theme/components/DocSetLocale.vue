<template>
    <div v-if="shouldShowLocales" class="docset-language">
        <select name class="language-select custom-select" @change="handleLanguageSelect($event)">
            <option
                v-for="(locale, path) in availableLocales"
                :value="locale.lang"
                :selected="$lang == locale.lang"
            >{{ locale.name }}</option>
        </select>
        <span class="dropdown-arrow">
            <DownChevron />
        </span>
    </div>
</template>

<style lang="less">
.docset-language {
    position: relative;

    .language-title {
        margin: 0;
        padding: 0;
        font-size: 12px;
        text-transform: uppercase;
        color: #666;
    }
}
</style>

<script>
import DownChevron from "../icons/DownChevron.vue";

export default {
    props: ["set"],
    components: {
        DownChevron
    },
    emits: ["select-language"],
    computed: {
        shouldShowLocales() {
            return this.$activeSet &&
                this.set.hasOwnProperty("locales") &&
                Object.keys(this.availableLocales).length > 1;
        },
        availableLocales() {
            if (!this.set.hasOwnProperty("locales")) {
                return {};
            }

            let available = {};

            for (const key in this.set.locales) {
                if (this.set.locales.hasOwnProperty(key)) {
                    const locale = this.set.locales[key];
                    const config = locale.config;

                    if (!config.sidebar[this.$activeVersion]) {
                        continue;
                    }

                    if (config.hasOwnProperty("disabled") && config.disabled) {
                        continue;
                    }

                    available[key] = locale;
                }
            }

            return available;
        },
    },
    methods: {
        handleLanguageSelect(event) {
            const selected = event.target.value;
            this.$emit("select-language", selected);
        },
    },
};
</script>
