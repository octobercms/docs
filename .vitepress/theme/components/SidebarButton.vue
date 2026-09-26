<template>
    <div
        class="sidebar-button"
        @click="$emit('toggle-sidebar')"
    >
        <svg v-if="!isClosed" class="icon" width="18px" height="14px" viewBox="0 0 18 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>menu-btn</title>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.900000036">
                <g id="Docs---Mobile" transform="translate(-27.000000, -23.000000)" fill="#2C3E4F">
                    <g id="menu-btn" transform="translate(27.000000, 23.000000)">
                        <rect id="Rectangle" x="0" y="0" width="18" height="2"></rect>
                        <rect id="Rectangle-Copy" x="0" y="6" width="18" height="2"></rect>
                        <rect id="Rectangle-Copy-2" x="0" y="12" width="18" height="2"></rect>
                    </g>
                </g>
            </g>
        </svg>
        <svg v-else class="icon" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>menu-close</title>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.900000036">
                <g id="Docs---Mobile---menu" transform="translate(-28.000000, -22.000000)" fill="#2C3E4F">
                    <g id="menu-close" transform="translate(28.000000, 22.000000)">
                        <g id="Group-3">
                            <rect id="Rectangle-Copy" transform="translate(8.000000, 8.000000) rotate(45.000000) translate(-8.000000, -8.000000) " x="-1" y="7" width="18" height="2"></rect>
                        </g>
                        <g id="Group-3-Copy-4" transform="translate(8.000000, 8.000000) scale(-1, 1) translate(-8.000000, -8.000000) ">
                            <rect id="Rectangle-Copy" transform="translate(8.000000, 8.000000) rotate(45.000000) translate(-8.000000, -8.000000) " x="-1" y="7" width="18" height="2"></rect>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    </div>
</template>

<style lang="less">
@import "../styles/boot.less";

.sidebar-button {
    cursor: pointer;
    display: none;
    padding: 12px 6px;
    .icon {
        display: block;
        width: 16px;
        height: 16px;
    }

    @media (max-width: @screen-sm-max) {
        display: block;
    }
}
</style>

<script>
export default {
    props: ["isClosed"]
};
</script>
