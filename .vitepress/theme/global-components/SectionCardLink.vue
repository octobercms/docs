<template>
    <a v-bind:href="href" :class="cssClassName" :target="target">
        <span class="card-badge" :style="badgeStyle">
            <i v-if="icon" :class="icon" :style="{ color }"></i>
        </span>
        <span class="card-body">
            <span class="card-title">{{ title }}</span>
            <span class="card-desc">{{ description }}</span>
        </span>
        <i class="ph-duotone ph-arrow-right card-arrow"></i>
    </a>
</template>
<style lang="less">
    .section-card-wrapper {
        display: flex;
        align-items: flex-start;
        background: white;
        border-radius: 12px;
        border: 1px solid #ECF0F1;
        padding: 22px 24px;
        margin-bottom: 20px;
        text-decoration: none;
        color: inherit;
        transition: box-shadow 0.15s ease, border-color 0.15s ease;

        &:hover {
            text-decoration: none;
            color: inherit;
            border-color: #d9dfe6;
            box-shadow: 0 6px 20px rgba(38, 57, 74, 0.08);

            .card-arrow {
                transform: translateX(3px);
            }
        }

        .card-badge {
            flex: 0 0 auto;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;

            i {
                font-size: 22px;
                line-height: 1;
            }
        }

        .card-body {
            flex: 1 1 auto;
            min-width: 0;
        }

        .card-title {
            display: block;
            color: #26394a;
            font-weight: 700;
            font-size: 18px;
            margin-bottom: 4px;
        }

        .card-desc {
            display: block;
            font-size: 14px;
            line-height: 1.5;
            color: #6b7785;
        }

        .card-arrow {
            flex: 0 0 auto;
            margin-left: 12px;
            color: #7f81ef;
            font-size: 18px;
            position: relative;
            top: 2px;
            transition: transform 0.15s ease;
        }

        &.is-simple {
            .card-desc,
            .card-arrow {
                display: none;
            }
            .card-title:after {
                content: " ›";
                color: #999;
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
            icon: {
                type: String,
                required: false
            },
            color: {
                type: String,
                required: false,
                default: '#7f81ef'
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
        computed: {
            cssClassName() {
                return 'section-card-wrapper ' + (this.cssClass || '');
            },
            badgeStyle() {
                return { backgroundColor: this.hexToTint(this.color) };
            }
        },
        methods: {
            hexToTint(hex) {
                const c = (hex || '#7f81ef').replace('#', '');
                const r = parseInt(c.substring(0, 2), 16);
                const g = parseInt(c.substring(2, 4), 16);
                const b = parseInt(c.substring(4, 6), 16);
                return `rgba(${r}, ${g}, ${b}, 0.12)`;
            }
        }
    }
</script>
