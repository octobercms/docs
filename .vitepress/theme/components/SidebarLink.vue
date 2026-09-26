<script>
import { h } from 'vue'
import { isActive, hashRE, groupHeaders } from '../util'
import OutboundLink from './OutboundLink.vue'

export default {
    name: 'SidebarLink',

    props: ['item', 'sidebarDepth'],

    render() {
        const {
            $page,
            $route,
            $themeConfig
        } = this;

        const { item, sidebarDepth } = this;

        // Use custom active class matching logic
        // due to edge case of paths ending with / + hash
        const selfActive = isActive($route, item.path)
        // For sidebar: auto pages, a hash link should be active if one of its child
        // matches
        const active = item.type === 'auto'
            ? selfActive || item.children.some(c => isActive($route, item.basePath + '#' + c.slug))
            : selfActive
        const link = item.type === 'external'
            ? renderExternal(item.path, item.title || item.path)
            : renderLink(item.path, (item.frontmatter && item.frontmatter.shortname) || item.title || item.path, active)

        const maxDepth = [
            $page.frontmatter.sidebarDepth,
            sidebarDepth,
            $themeConfig.sidebarDepth,
            1
        ].find(depth => depth !== undefined)

        const displayAllHeaders = $themeConfig.displayAllHeaders

        // Page headers ship with the live page data rather than the manifest;
        // only the active page ever renders its headers
        const itemHeaders = item.headers
            || (selfActive && item.path === $page.path ? $page.headers : null)

        if (item.type === 'auto') {
            return [link, renderChildren(item.children, item.basePath, $route, maxDepth)]
        } else if ((active || displayAllHeaders) && itemHeaders && !hashRE.test(item.path)) {
            const children = groupHeaders(itemHeaders)
            return [link, renderChildren(children, item.path, $route, maxDepth)]
        } else {
            return link
        }
    }
}

function renderLink (to, text, active, level) {
    const data = {
        href: to,
        class: {
            active,
            'sidebar-link': true
        }
    }

    if (level > 2) {
        data.style = {
            'padding-left': level + 'rem'
        }
    }

    return h('a', data, text)
}

function renderChildren (children, path, route, maxDepth, depth = 1) {
    if (!children || depth > maxDepth) return null
    return h('ul', { class: 'sidebar-sub-headers' }, children.map(c => {
        const active = isActive(route, path + '#' + c.slug)
        return h('li', { class: 'sidebar-sub-header' }, [
            renderLink(path + '#' + c.slug, c.title, active, c.level - 1),
            renderChildren(c.children, path, route, maxDepth, depth + 1)
        ])
    }))
}

function renderExternal (to, text) {
    return h('a', {
        href: to,
        target: '_blank',
        rel: 'noopener noreferrer',
        class: {
            'sidebar-link': true
        }
    }, [text, h(OutboundLink)])
}
</script>

<style lang="less">
@import "../styles/boot.less";

.sidebar .sidebar-sub-headers {
    padding-left: 10px;
}
a.sidebar-link {
    font-size: 15px;
    font-weight: 400;
    display: inline-block;
    color: #3a3a3a;
    padding: 5px 10px 5px 12px;
    line-height: 1.4;
    width: 100%;
    box-sizing: border-box;

    &:hover {
        color: @october-purple;
        text-decoration: underline;
    }
    &.active {
        color: @october-purple;
        font-weight: 500;
        position: relative;
    }

    // Muted outbound icon
    .icon.outbound {
        color: lighten(#3a3a3a, 45%);
        margin-left: 3px;
    }
    &:hover .icon.outbound,
    &.active .icon.outbound {
        color: @october-purple;
    }
}

.toggle-sidebar-group h6,
.toggle-sidebar-group a.sidebar-link,
.sidebar-group a.sidebar-link {
    padding-left: 33px;
}

.sidebar-group.has-icon > .sidebar-group-items {
    margin-bottom: 2rem;
}

.sidebar-group.has-icon > .sidebar-group-items a.sidebar-link {
    padding-left: 44px;
}

.sidebar-sub-headers a.sidebar-link {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-left: none;
    &.active {
        font-weight: 500;
    }
}
</style>
