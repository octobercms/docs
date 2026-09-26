<template>
    <a v-bind:href="href" :class="cssClassName" :target="target">
        <div class="d-flex">
            <i v-if="icon" :class="icon" class="card-icon"></i>
            <i v-else class="icon icon-chevron-right"></i>
            <h4 v-text="title"></h4>
        </div>
        <p v-text="description"></p>
        <p v-text="prompt" class="link-prompt"></p>
    </a>
</template>
<style lang="less">
    .section-card-wrapper {
        display: block;
        // width: 280px;
        min-height: 120px;
        background: white;
        border-radius: 6px;
        border: 1px solid #ECF0F1;
        padding: 16px 18px;
        margin-bottom: 20px;
        text-decoration: none;
        color: inherit;

        &:hover {
            text-decoration: none;
            color: inherit;
            box-shadow: 0 0 0 2px #7f81ef;
        }

        .icon {
            position: relative;
            top: 6px;
        }

        .card-icon {
            font-size: 20px;
            position: relative;
            top: 3px;
            color: #6A6CF7;
        }

        h4 {
            margin-left: 10px;
            margin-bottom: 10px;
            margin-top: 0;
            color: #6A6CF7;
            font-weight: bold;
            font-size: 18px;
        }

        p {
            font-size: 14px;
            line-height: 150%;
            margin-bottom: 0;

            &.link-prompt {
                margin-top: 10px;
                color: #7f81ef;
                text-decoration: underline;
            }
        }

        &.is-simple {
            border: 0;
            padding: 0;
            background: none;
            box-shadow: none !important;
            min-height: auto;
            .d-flex {
                align-items: center;
            }
            .icon {
                display: none;
            }
            .card-icon {
                font-size: 22px;
                top: 0;
                color: #555;
            }
            h4 {
                margin-left: 8px;
                margin-bottom: 0;
                color: #333;
                font-size: 16px;
                font-weight: 500;
                &:after {
                    content: " ›";
                    color: #999;
                }
            }
            p {
                display: none;
            }
            &:hover {
                h4 {
                    color: #6A6CF7;
                }
                .card-icon {
                    color: #6A6CF7;
                }
            }
        }
    }
</style>
<script>
    export default {
        name: 'SectionCardLink',
        props: {
            href: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            prompt: {
                type: String,
                required: false
            },
            icon: {
                type: String,
                required: false
            },
            cssClass: {
                type: String,
                required: false
            },
            target: {
                type: String,
                required: false
            }
        },
        data () {
            return {
            }
        },
        computed: {
            cssClassName: function(val) {
                return 'section-card-wrapper ' + this.cssClass;
            }
        },
        methods: {
        }
    }
</script>
