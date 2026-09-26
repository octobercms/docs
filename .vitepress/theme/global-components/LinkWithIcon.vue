<template>
    <a v-bind:href="href" class="link-with-icon">
        <img v-bind:src="icon">
        <span v-text="text"></span>
    </a>
</template>
<style lang="less">
    .link-with-icon {
        display: inline-block;
        background: #ECF0F1;
        border-radius: 6px;
        padding: 0 4px;
        margin-top: -4px;
        text-decoration: none!important;
        position: relative;
        padding-left: 25px;

        &:hover {
            background: #DEE5E7;
        }

        span {
            text-decoration: underline;
        }

        img {
            display: inline-block;
            position: absolute;
            width: 18px;
            height: 18px;
            left: 4px;
            top: 4px;
        }
    }
</style>
<script>
    export default {
        name: 'LinkWithIcon',
        props: {
            text: {
                type: String,
                required: true
            },
            href: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            }
        },
        data () {
            return {
            }
        },
    }
</script>