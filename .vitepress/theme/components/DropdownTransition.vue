<template>
    <transition
        name="dropdown"
        @enter="setHeight"
        @after-enter="unsetHeight"
        @before-leave="setHeight"
    >
        <slot />
    </transition>
</template>

<script>
export default {
    name: 'DropdownTransition',

    methods: {
        setHeight (items) {
            // Explicitly set height so that it can be transitioned
            items.style.height = items.scrollHeight + 'px'
        },

        unsetHeight (items) {
            items.style.height = ''
        }
    }
}
</script>

<style lang="less">
.dropdown-enter, .dropdown-enter-from, .dropdown-leave-to {
    height: 0 !important;
}
</style>
