<template>
    <a class="video-link-wrapper" :href="src" target="_blank">
        <div class="clearfix">
            <button>
                <svg height="100%" version="1.1" viewBox="0 0 48 34" width="100%">
                    <polygon id="Triangle" fill="#FFFFFF" fill-rule="nonzero" points="19.0306868 23.0618175 31.967804 16.3588909 19.0306868 9.60909064"></polygon>
                    <polygon id="The_Sharpness" fill="#420000" fill-rule="nonzero" opacity="0.12" points="19 10 30.3741011 17.1838665 31.967804 16.3588909"></polygon>
                    <path d="M47.5206579,7.33472512 C47.5206579,7.33472512 47.0507147,4.00334029 45.6126885,2.53639527 C43.7893088,0.610438413 41.7403564,0.600974252 40.8051694,0.487404315 C34.0849814,0 24.0093989,0 24.0093989,0 L23.9906011,0 C23.9906011,0 13.9150186,0 7.19483062,0.487404315 C6.25964363,0.600974252 4.21069121,0.610438413 2.38731153,2.53639527 C0.949285295,4.00334029 0.479342079,7.33472512 0.479342079,7.33472512 C0.479342079,7.33472512 0,11.2434238 0,15.1568546 L0,18.8242171 C0,22.7376479 0.479342079,26.6463466 0.479342079,26.6463466 C0.479342079,26.6463466 0.949285295,29.9777314 2.38731153,31.4446764 C4.21539064,33.3706333 6.61210104,33.3091162 7.67887214,33.5125957 C11.5183082,33.881698 24,34 24,34 C24,34 34.0849814,33.9858038 40.8051694,33.4936674 C41.7450558,33.3800974 43.7893088,33.3706333 45.6126885,31.4446764 C47.0507147,29.9777314 47.5206579,26.6463466 47.5206579,26.6463466 C47.5206579,26.6463466 48,22.7329158 48,18.8242171 L48,15.1568546 C48,11.2434238 47.5206579,7.33472512 47.5206579,7.33472512 Z M19,23 L19,10 L31.967804,16.3588909 L19,23 Z" id="Shape" fill="#F70800" fill-rule="nonzero"></path>
                </svg>
            </button>
            <h4 v-text="title"></h4>
        </div>
        <p v-text="description"></p>
        <p v-text="prompt" class="video-prompt"></p>
    </a>
</template>
<style lang="less">
    .video-link-wrapper {
        display: block;
        width: 280px;
        min-height: 160px;
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

        button {
            width: 48px;
            height: 34px;
            background-color: transparent;
            padding: 0;
            cursor: pointer;
            border: none;
            -webkit-appearance: none;
            float: left;
        }

        h4 {
            margin-left: 63px;
            margin-bottom: 0;
            margin-top: 0;
            color: #6A6CF7;
            font-weight: bold;
            font-size: 18px;
        }

        p {
            font-size: 14px;
            margin-top: 15px;
            line-height: 150%;
            margin-bottom: 0;

            &.video-prompt {
                margin-top: 10px;
                color: #7f81ef;
                text-decoration: underline;
            }
        }
    }
</style>
<script>
    export default {
        name: 'VideoBlockLink',
        props: {
            src: {
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
                required: true
            }
        },
        data () {
            return {
            }
        },
        computed: {
        },
        methods: {
        }
    }
</script>