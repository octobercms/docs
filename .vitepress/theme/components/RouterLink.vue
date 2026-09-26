<template>
    <a :href="to"><slot /></a>
</template>

<script>
// A plain anchor: VitePress intercepts same-origin anchor clicks globally,
// so this gives SPA navigation without any extra routing component.
export default {
    name: 'RouterLink',
    props: {
        to: {
            type: String,
            required: true
        },
        activeClass: String,
        exactActiveClass: String
    }
};
</script>
