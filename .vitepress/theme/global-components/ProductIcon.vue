<template>
    <img :src="src" alt="" class="product-icon" />
</template>
<style lang="less">
.product-icon {
    float: right;
    margin-left: 20px;
    width: 100px;
}
</style>
<script>
    export default {
        name: 'ProductIcon',
        props: {
            src: {
                type: String,
                required: true,
            }
        }
    }
</script>
