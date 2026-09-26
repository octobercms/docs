<template>
    <div class="video-wrapper" :style="cssProps">
        <a class="video-preview" :href="src" target="_blank">
            <template v-if="isVideoFound || customThumbnail">
                <img v-if="isCustomThumbnailExist" :src="customThumbnail" :alt="isCustomTitleExist ? customTitle : getTitle"
                    @error="$event.target.src=getYoutubeThumbnail(videoID, thumbnailQuality)"
                >
                <img
                    v-else
                    :src="getYoutubeThumbnail(videoID, thumbnailQuality)" :alt="isCustomTitleExist ? customTitle : getTitle"
                >
                <button>
                    <slot name="button">
                        <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                            <path class="videopreview-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
                            <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                        </svg>
                    </slot>
                </button>
            </template>

            <template v-else-if="!fetchingInfo">
                <div class="videopreview-error-container">
                    <span class="videopreview-error-icon">
                        <svg fill="#fff" viewBox="0 0 48 48">
                            <path d="M0 0h48v48H0V0z" fill="none"></path>
                            <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" fill-opacity="0.7"></path>
                        </svg>
                    </span>

                    <span class="videopreview-error-content">
                        <span class="videopreview-error-content__reason">
                            <span>Preview unavailable</span>
                        </span>
                        <span class="videopreview-error-content__subreason">
                            <span>Click to view the video.</span>
                        </span>
                    </span>
                </div>

            </template>
        </a>
    </div>
</template>
<style lang="less">
div.video-wrapper {
    max-width: var(--max-width);
    width: 100%;
    display: inline-block;
    margin-bottom: 15px;
    position: relative;

    & * {
        padding: 0;
        margin: 0;
        overflow: hidden;
        box-sizing: border-box;
    }
    &:before {
        display: block;
        padding-top: 56.25%; /* 16:9 */
        /* falls back to 16/9, but otherwise uses ratio from HTML */
        padding-top: calc(var(--aspect-ratio) * 1%);
        content: "";
    }
}
a.video-preview {
    text-decoration: none;
    padding: 21px !important;
    color: #ffffff;
    border-radius: 5px;

    background-size: cover;
    display: block;
    height: 100%;
    width: 100%;
    cursor: pointer;
    position: absolute;
    top: 0;

    img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        top: 0;
        left: 0;
        pointer-events: none;
        border-radius: 5px;
    }

    button {
        border: none;
        background-color: transparent;
        padding: 0;
        color: inherit;
        text-align: inherit;
        font-size: 100%;
        font-family: inherit;
        cursor: pointer;
        line-height: inherit;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 68px;
        height: 48px;
        transform: translate(-50%, -50%);
        -webkit-transition: opacity .25s cubic-bezier(0, 0, 0.2, 1);
        transition: opacity .25s cubic-bezier(0, 0, 0.2, 1);
        z-index: 5;
    }
}

.videopreview-error-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #282828;
    padding: 0 4rem;
}
.videopreview-error-icon {
    height: 64px;
    width: 64px;
    min-width: 64px;
    min-height: 64px;
    margin-right: 12px;
    margin-top: -4px;
}
.videopreview-error-content {
    display: flex;
    flex-direction: column;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);

    &__reason {
        font-size: 18px;
        padding-bottom: 10px;
    }
    &__subreason {
        font-size: 14px;
    }
}
</style>
<script>
    // This code was adapted from library: https://github.com/seeratawan01/vue-lazytube
    export default {
        name: 'VideoPreview',
        props: {
            src: {
                type: String,
                required: true,
            },
            aspectRatio: {
                type: String,
                default: '16:9',
                validator: function (value) {
                    return /^\d+:\d+$/u.test(value)
                },
            },
            showTitle: {
                type: Boolean,
                default: true
            },
            maxWidth: {
                type: String,
                default: '280px' // 560px
            },
            autoplay: {
                type: Boolean,
                default: false
            },
            thumbnailQuality: {
                type: String,
                default: 'standard'
            },
            customTitle: {
                type: String,
                default: ''
            },
            customThumbnail: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                clicked: false,
                onceLoaded: false,
                videoInfo: null,
                fetchingInfo: true,
                isVideoFound: false
            }
        },
        computed: {
            videoID: function () {
                return this.getYouTubeID(this.src)
            },
            aspectRatioValue: function () {
                return this.calcAspect(this.aspectRatio)
            },
            getTitle:function () {
                return this.videoInfo !== null ? this.videoInfo.title : ''
            },
            isCustomTitleExist () {
                return this.customTitle.trim().length > 0
            },
            isCustomThumbnailExist () {
                return this.customThumbnail.trim().length > 0
            },
            cssProps() {
                return {
                    '--aspect-ratio': this.aspectRatioValue ? this.aspectRatioValue : 56,
                    '--max-width': this.maxWidth ? this.maxWidth : '560px'
                }
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.fetchingOembed('youtube')
            })
        },
        watch: {
            'src': function (val, oldVal) {
                if(val !== oldVal) {
                    this.fetchingOembed('youtube')
                }
            }
        },
        methods: {
            fetchingOembed (type = 'youtube') {
                const self = this
                const url = type === 'youtube'
                    ? `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${this.videoID}&format=json`
                    : `https://vimeo.com/api/oembed.json?url=${this.src}`

                fetch(url)
                    .then(function (response) {
                        if (!response.ok) throw new Error('Not found')
                        return response.json()
                    })
                    .then(function (data) {
                        // Handle success
                        self.videoInfo = data
                        self.isVideoFound = true
                    })
                    .catch(function () {
                        // Handle error
                        self.videoInfo = null
                        self.isVideoFound = false
                    })
                    .then(function () {
                        // Always executed
                        self.fetchingInfo = false
                    })
            },
            calcAspect (aspect) {
                const aspects = aspect.split(':')

                return typeof aspects[1] === 'undefined' ? 56.25 : aspects[1] / aspects[0] * 100
            },
            getYouTubeID (url) {
                url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/u)
                /* eslint-disable no-useless-escape */
                return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/iu)[0] : url[0]
            },
            getYoutubeThumbnail (video_id, quality) {
                let thumbnail

                if (video_id) {
                    if (typeof quality === 'undefined') {
                        quality = 'high'
                    }

                    let quality_key = 'maxresdefault' // Max quality
                    if (quality === 'default') {
                        quality_key = 'default'
                    } else if (quality === 'medium') {
                        quality_key = 'mqdefault'
                    } else if (quality === 'high') {
                        quality_key = 'hqdefault'
                    } else if (quality === 'standard') {
                        quality_key = 'sddefault'
                    } else if (quality === 'maxres') {
                        quality_key = 'maxresdefault'
                    }

                    thumbnail = 'http://img.youtube.com/vi/' + video_id + '/' + quality_key + '.jpg'
                    return thumbnail
                }

                return false
            }
        }
    }
</script>
