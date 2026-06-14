---
subtitle: Add member profiles with recent activity and moderation tools.
---
# Member Profile

The member profile page shows a forum member's information, recent posts, and moderation tools. It serves double duty: when you visit your own profile, you see your details; when you visit another member's profile, you see theirs along with actions like reporting or moderating.

## Creating the Member Page

Create a new page at `pages/forum/member.htm`:

::: cmstemplate
```ini
title = "Forum Member"
url = "/forum/member/:slug?"
layout = "default"

[forumMember]
slug = "{{ :slug }}"
topicPage = "forum/topic"
channelPage = "forum/channel"
```
```twig
{% if not member %}
    {% do abort(404) %}
{% endif %}

<div class="mb-4">
    <a href="{{ 'forum/index'|page }}" class="text-sm text-blue-600 hover:underline">
        &larr; Back to Forum
    </a>
</div>

<div class="flex items-start gap-8">
    <div class="flex-1 min-w-0">
        {% partial 'forum/member/preview' %}
    </div>

    <div class="w-64 shrink-0">
        <div id="memberControlPanel">
            {% partial 'forum/member/controlpanel' %}
        </div>
    </div>
</div>
```
:::

The URL uses an optional slug (`:slug?`). When no slug is provided, the component loads the currently logged-in user's profile. When a slug is present, it loads that member's profile. If the member is not found, `{% do abort(404) %}` returns a 404 page.

## Creating the Preview Partial

Create `partials/forum/member/preview.htm` to display the member's information and recent posts:

```twig
<div class="flex items-center gap-4 mb-6">
    <img
        src="{{ member.user.avatarThumb(64) }}"
        alt="{{ member.username }}"
        class="w-16 h-16 rounded-full"
    />
    <div>
        <h1 class="text-2xl font-bold">
            {{ member.username }}
        </h1>
        <p class="text-sm text-gray-500">
            Member since {{ member.created_at|date('F Y') }}
        </p>
        <div class="flex items-center gap-2 mt-1">
            {% if member.is_moderator %}
                <span class="text-xs font-medium text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                    Moderator
                </span>
            {% endif %}
            {% if member.is_banned %}
                <span class="text-xs font-medium text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                    Banned
                </span>
            {% endif %}
        </div>
    </div>
</div>

<h2 class="text-lg font-semibold mb-3">
    Recent Posts
</h2>

{% partial 'forum/member/recentposts' %}
```

## Creating the Recent Posts Partial

Create `partials/forum/member/recentposts.htm` to list the member's recent forum activity:

```twig
{% set recentPosts = forumMember.getRecentPosts() %}

{% if recentPosts|length %}
    <div class="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
        {% for post in recentPosts %}
            <div class="p-4">
                <div class="text-sm text-gray-500 mb-1">
                    Posted in
                    <a href="{{ post.topic.url }}" class="text-blue-600 hover:underline">
                        {{ post.topic.subject }}
                    </a>
                    <span class="mx-1">&middot;</span>
                    {{ post.created_at|date('M j, Y') }}
                </div>
                <div class="text-sm text-gray-700">
                    {{ html_limit(post.content_html, 200)|raw }}
                </div>
            </div>
        {% endfor %}
    </div>
{% else %}
    <p class="text-gray-500">
        This member has not posted in the forum yet.
    </p>
{% endif %}
```

The `forumMember.getRecentPosts()` method returns the last 10 posts by this member, each with its topic URL already set.

## Creating the Control Panel Partial

Create `partials/forum/member/controlpanel.htm` for the sidebar actions:

```twig
<div class="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
    <div class="px-4 py-3 text-sm text-gray-500">
        {{ member.count_posts }} posts
    </div>

    {% if user %}
        {% if member.id != otherMember.id %}
            <a
                href="javascript:;"
                data-request="onPoke"
                data-request-flash
                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
                Poke member
            </a>
        {% endif %}

        {% if otherMember.is_moderator %}
            <div class="px-4 py-3">
                <p class="text-xs font-semibold text-gray-400 uppercase mb-2">
                    Moderation
                </p>
                <div class="space-y-2">
                    <a
                        href="javascript:;"
                        data-request="onApprove"
                        data-request-update="{ 'forum/member/controlpanel': '#memberControlPanel' }"
                        class="block text-sm text-gray-700 hover:text-blue-600"
                    >
                        {% if not member.is_approved %}
                            Approve member
                        {% else %}
                            Unapprove member
                        {% endif %}
                    </a>
                    <a
                        href="javascript:;"
                        data-request="onBan"
                        data-request-update="{ 'forum/member/controlpanel': '#memberControlPanel' }"
                        class="block text-sm text-gray-700 hover:text-blue-600"
                    >
                        {% if member.is_banned %}
                            Unban member
                        {% else %}
                            Ban member
                        {% endif %}
                    </a>
                    <a
                        href="javascript:;"
                        data-request="onPurgePosts"
                        data-request-confirm="Are you sure? This will delete all posts by this member."
                        class="block text-sm text-red-600 hover:underline"
                    >
                        Purge posts
                    </a>
                </div>
            </div>
        {% else %}
            <a
                href="javascript:;"
                data-request="onReport"
                data-request-update="{ 'forum/member/controlpanel': '#memberControlPanel' }"
                data-request-confirm="Are you sure you want to flag this member as a spammer?"
                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
                Report spammer
            </a>
        {% endif %}
    {% endif %}
</div>
```

The sidebar shows different actions depending on who is viewing:

- **All logged-in users**: can poke the member (a friendly notification) and report spammers
- **Moderators** (`otherMember.is_moderator`): can approve/unapprove, ban/unban, and purge all posts by the member

The approve and ban buttons refresh the sidebar via `data-request-update` to reflect the updated state.

## How Forum Members Work

When a user first posts in the forum, a Member record is automatically created with a username derived from their name. The member profile tracks their post count and recent activity.

The component injects two member variables:

- `member`: the profile being viewed (loaded from the URL slug, or the current user when no slug is given)
- `otherMember`: the logged-in user who is viewing the page (used for permission checks)

This separation allows the template to check whether the viewer has moderation rights over the member being viewed.

## Try It Out

1. Navigate to `/forum/member` (no slug) to see your own profile
2. Create some topics and replies, then check that they appear under "Recent Posts"
3. Click a username on any forum post to visit that member's profile
4. Mark a user as a moderator in the backend (**Users** section, click the user, **Forum** tab, check **Forum moderator**) and test the approve, ban, and purge actions

## Summary

You now have a complete forum built with October CMS plugins:

1. **User Authentication**: login, registration, and password reset pages powered by the RainLab.User plugin
2. **Forum Index and Channels**: a channel listing and channel detail page that organize discussions
3. **Topics and Posts**: topic creation, threaded replies, inline editing, and Markdown support
4. **Member Profiles**: member information, recent post history, and moderation tools
5. **Moderation**: lock, sticky, move, ban, approve, and purge actions for moderators

All of this was built using the data and handlers provided by the plugins. You wrote all the markup yourself, directly in your pages and partials, using the variables and AJAX handlers that the components inject.

## Going Further

Here are some ways to extend your forum:

- **Account Management**: add a page with the `account` component from RainLab.User for profile editing, password changes, and avatar uploads
- **RSS Feed**: add a page with the `forumRssFeed` component for topic subscriptions
- **Embedded Discussions**: use the `forumEmbedTopic` component to add comment threads to blog posts or any page
- **Email Notifications**: the forum sends reply notifications automatically when members follow topics. Configure your mail settings in **Settings > Mail Configuration**.
