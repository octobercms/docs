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
# Start Here

<div class="home-hero">
    <div class="home-hero-warm">
        <div class="home-hero-icon"><i class="ph-duotone ph-rocket-launch"></i> Start Here</div>
        <h2>Install October CMS</h2>
        <p>Build your first project in minutes with our step-by-step guide.</p>
        <p><a href="/user-guide/quickstart/introduction/welcome.html" class="btn btn-primary btn-lg">Get Started</a></p>
    </div>
    <div class="home-hero-light">
        <ul class="home-hero-checklist">
            <li><i class="ph-duotone ph-check-circle"></i> Setup your server</li>
            <li><i class="ph-duotone ph-check-circle"></i> Install October CMS</li>
            <li><i class="ph-duotone ph-check-circle"></i> Build your first website</li>
        </ul>
        <p>Follow our <a href="/user-guide/quickstart/introduction/welcome.html">beginner tutorial</a> to get up and running fast.</p>
    </div>
</div>

## Build Features

<div class="row">
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-paper-plane-tilt"
            title="Creating a Blog"
            description="Build a fully-featured blog with posts, categories, tags, and an RSS feed."
            href="/user-guide/blog/introduction.html" />
    </div>
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-chats-circle"
            title="Creating a Forum"
            description="Build a community forum with channels, discussion threads, and replies."
            href="/user-guide/forum/introduction.html" />
    </div>
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-envelope-simple"
            title="Creating a Helpdesk"
            description="Build a fully-featured helpdesk with tickets, categories, tags, and an RSS feed."
            href="/user-guide/helpdesk/introduction.html" />
    </div>
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-chat-circle-text"
            title="Creating a Mailing List"
            description="Build a mailing list with signup forms, subscriber management, and campaigns."
            href="/user-guide/mailing-list/introduction.html" />
    </div>
</div>

## Reference

<div class="row">
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-brackets-curly"
            title="CMS Guide"
            description="Plugins and techniques using file structure with Twig templates."
            href="/4.x/cms/themes/themes.html" />
    </div>
    <div class="col-md-6">
        <SectionCardLink
            icon="ph-duotone ph-pencil-line"
            title="Markup Guide"
            description="Reference guide for the Twig template syntax for displaying content."
            href="/4.x/markup/templating.html" />
    </div>
</div>

## Plugins & Themes

<div class="row">
    <div class="col-md-5">
        <SectionCardLink
            icon="ph-duotone ph-plugs-connected"
            title="Browse Plugins"
            description="Browse plugins both free and paid"
            href="https://octobercms.com/plugins"
            target="_blank"
            cssClass="is-simple" />
    </div>
    <div class="col-md-5">
        <SectionCardLink
            icon="ph-duotone ph-paint-brush-broad"
            title="Browse Themes"
            description="Browse themes both free and paid"
            href="https://octobercms.com/themes"
            target="_blank"
            cssClass="is-simple" />
    </div>
</div>

## Contributing

You can find the published version by visiting the [October CMS Docs](https://docs.octobercms.com) website. For contributions and translations, you may submit suggestions by clicking the **Edit This Page** button or [contact us directly](https://octobercms.com/contact) for support.
