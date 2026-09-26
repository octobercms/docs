---
home: true
widebar: false
pageClass: home-page
sidebar:
    -
        title: User Guide
        icon: ph-duotone ph-book-open-text
        collapsable: false
        children:
            - [/user-guide/quickstart/introduction/welcome, Quick Start]
            - [/user-guide/blog/introduction, Creating a Blog]
            - [/user-guide/forum/introduction, Creating a Forum]
            - [/user-guide/helpdesk/introduction, Creating a Helpdesk]
            - [/user-guide/mailing-list/introduction, Creating a Mailing List]
    -
        title: Documentation
        icon: ph-duotone ph-code
        collapsable: false
        children:
            - [/4.x/setup/installation, Installation]
            - [/4.x/cms/themes/themes, CMS Guide]
            - [/4.x/markup/templating, Markup Guide]
            - [/4.x/extend/system/plugins, Extending October CMS]
            - [/4.x/element/form-fields, API Handbook]
    -
        title: Plugins & Themes
        icon: ph-duotone ph-puzzle-piece
        collapsable: false
        children:
            - ['https://octobercms.com/plugins', Plugin Marketplace]
            - ['https://octobercms.com/themes', Theme Marketplace]
    -
        title: Resources
        icon: ph-duotone ph-link
        collapsable: false
        children:
            - ['https://larajax.org', Larajax Framework]
            - ['https://talk.octobercms.com', October Talk]
            - ['https://discord.gg/jNaFhfz6FX', Discord]
            - ['https://github.com/octobercms', GitHub]
# sidebar:
#     -
#         title: Docs
#         collapsable: false
#         children:
#             - [/user-guide/quickstart/introduction/welcome, Quick Start]
#             - [/4.x/cms/themes/themes, CMS Guide]
#             - [/4.x/markup/templating, Markup Guide]
#     -
#         title: Building Features
#         collapsable: false
#         children:
#             - [/user-guide/blog/introduction, Creating a Blog]
#             - [/user-guide/helpdesk/introduction, Creating a Helpdesk]
#             - [/user-guide/mailing-list/introduction, Creating a Mailing List]
#     -
#         title: Customize
#         collapsable: false
#         children:
#             - [/4.x/extend/system/plugins, Extending October CMS]
#             - [/4.x/element/form-fields, API Handbook]
#     -
#         title: Reference
#         collapsable: false
#         children:
#             - [/4.x/markup/templating, Markup Guide]
#             - [/4.x/cms/themes/themes, CMS Guide]
#     -
#         title: Plugins & Themes
#         collapsable: false
#         children:
#             - ['https://octobercms.com/plugins', Plugin Marketplace]
#             - ['https://octobercms.com/themes', Theme Marketplace]
#     -
#         title: AJAX Framework
#         collapsable: false
#         children:
#             - ['https://larajax.org', Larajax Framework]
---
<div class="home-hero">
    <div class="home-hero-content">
        <div class="home-hero-icon"><i class="ph-duotone ph-rocket-launch"></i> Start Here</div>
        <h2>Install October CMS</h2>
        <p>Build your first project in minutes with our step-by-step guide, or dive straight into the developer documentation.</p>
        <div class="home-hero-actions">
            <a href="/user-guide/quickstart/introduction/welcome.html" class="btn btn-primary btn-lg">Quick Start</a>
            <a href="/4.x/setup/installation.html" class="btn btn-outline btn-lg">v4 Documentation</a>
        </div>
    </div>
</div>

## Build Features

<p class="section-subtitle">Step-by-step guides to help you build common features with October CMS.</p>

<div class="row">
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-paper-plane-tilt"
            color="#6A6CF7"
            title="Creating a Blog"
            description="Build a fully-featured blog with posts, categories, tags, and an RSS feed."
            href="/user-guide/blog/introduction.html" />
    </div>
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-chats-circle"
            color="#E67E22"
            title="Creating a Forum"
            description="Build a community forum with channels, discussion threads, and replies."
            href="/user-guide/forum/introduction.html" />
    </div>
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-envelope-simple"
            color="#16A34A"
            title="Creating a Helpdesk"
            description="Build a fully-featured helpdesk with tickets, categories, tags, and an RSS feed."
            href="/user-guide/helpdesk/introduction.html" />
    </div>
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-chat-circle-text"
            color="#EAB308"
            title="Creating a Mailing List"
            description="Build a mailing list with signup forms, subscriber management, and campaigns."
            href="/user-guide/mailing-list/introduction.html" />
    </div>
</div>

## Reference

<p class="section-subtitle">Detailed guides and technical reference for developers.</p>

<div class="row">
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-brackets-curly"
            color="#6A6CF7"
            title="CMS Guide"
            description="Plugins and techniques using file structure with Twig templates."
            href="/4.x/cms/themes/themes.html" />
    </div>
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-pencil-line"
            color="#6A6CF7"
            title="Markup Guide"
            description="Reference guide for the Twig template syntax for displaying content."
            href="/4.x/markup/templating.html" />
    </div>
</div>

## Plugins & Themes

<p class="section-subtitle">Extend October CMS with powerful plugins and beautiful themes.</p>

<div class="row">
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-plugs-connected"
            color="#E67E22"
            title="Browse Plugins"
            description="Find and install plugins from the marketplace."
            href="https://octobercms.com/plugins"
            target="_blank" />
    </div>
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-monitor"
            color="#E67E22"
            title="Browse Themes"
            description="Discover beautiful themes for your project."
            href="https://octobercms.com/themes"
            target="_blank" />
    </div>
</div>

## Contributing

You can find the published version by visiting the [October CMS Docs](https://docs.octobercms.com) website. For contributions and translations, you may submit suggestions by clicking the **Edit This Page** button or [contact us directly](https://octobercms.com/contact) for support.
