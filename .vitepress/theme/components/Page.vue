<template>
    <main class="page">
        <slot name="top" />

        <Content class="theme-default-content article" />

        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />

        <slot name="bottom" />
    </main>
</template>

<script>
import { Content } from 'vitepress'
import PageEdit from './PageEdit.vue'
import PageNav from './PageNav.vue'

export default {
    components: { Content, PageEdit, PageNav },
    props: ['sidebarItems']
}
</script>

<style lang="less">
.page {
    padding-bottom: 2rem;
    display: block;
}
</style>
