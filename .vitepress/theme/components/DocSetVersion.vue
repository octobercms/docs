<template>
    <div v-if="$activeSet.versions" class="docset-version">
        <select name class="version-select custom-select" @change="handleVersionSelect($event)">
            <option
                v-for="version in $activeSet.versions"
                :value="version[0]"
                :selected="version[0] == $activeVersion"
            >v{{ version[0] }}</option>
        </select>
        <span class="dropdown-arrow">
            <DownChevron />
        </span>
    </div>
</template>

<style lang="less">
.docset-version {
    position: relative;

    .version-title {
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
    components: {
        DownChevron
    },
    emits: ["select-version"],
    methods: {
        handleVersionSelect(event) {
            const selected = event.target.value;
            this.$emit("select-version", selected);
        },
    },
};
</script>
