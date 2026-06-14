---
subtitle: Build the topic page for reading and posting in discussions.
---
# Topic Page

The topic page is the heart of the forum. It displays a discussion thread with all its posts, lets members reply, and provides moderation tools. It also doubles as the "create topic" page when accessed from a channel.

## Creating the Topic Page

Create a new page at `pages/forum/topic.htm`:

::: cmstemplate
```ini
title = "Forum Topic"
url = "/forum/topic/:slug?"
layout = "default"

[forumTopic]
slug = "{{ :slug }}"
channelPage = "forum/channel"
memberPage = "forum/member"
```
```twig
{% if topic %}

    <div class="mb-4">
        <a href="{{ 'forum/channel'|page({ slug: channel.slug }) }}" class="text-sm text-blue-600 hover:underline">
            &larr; Back to {{ channel.title }}
        </a>
    </div>

    <div class="flex items-start gap-8">
        <div class="flex-1 min-w-0">
            <h1 class="text-2xl font-bold mb-6">
                {{ topic.subject }}
            </h1>

            <div id="topicPosts">
                {% partial 'forum/topic/posts' %}
            </div>

            {% if topic.canPost %}
                <div id="postForm" class="mt-8">
                    {% partial 'forum/topic/postform' %}
                </div>
            {% elseif topic.is_locked %}
                <p class="mt-8 text-sm text-gray-500">
                    This topic is locked. No new replies can be posted.
                </p>
            {% endif %}
        </div>

        <div class="w-64 shrink-0">
            <div id="topicControlPanel">
                {% partial 'forum/topic/controlpanel' %}
            </div>
        </div>
    </div>

{% elseif channel %}

    <div class="mb-4">
        <a href="{{ 'forum/channel'|page({ slug: channel.slug }) }}" class="text-sm text-blue-600 hover:underline">
            &larr; Back to {{ channel.title }}
        </a>
    </div>

    <h1 class="text-2xl font-bold mb-6">
        Start a New Topic
    </h1>

    {% partial 'forum/topic/createform' %}

{% else %}

    <p class="text-gray-500">
        Topic not found.
    </p>

{% endif %}
```
:::

## How the Dual Mode Works

The URL uses an optional slug parameter (`:slug?`). When the component loads:

- **With a slug**: it finds the matching topic and injects `topic`, `posts`, `channel`, and `member` into the page. You see the discussion thread.
- **Without a slug** (accessed via `?channel=ID`): it loads the channel and injects `channel` into the page. You see the "create topic" form.

This means the channel page's "New Topic" button links to `/forum/topic?channel=5`, which shows the creation form. After submission, the user is redirected to the new topic's URL.

## Creating the Posts Partial

Create `partials/forum/topic/posts.htm` to display the list of posts:

```twig
<div class="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white">
    {% for post in posts %}
        <div id="post-{{ post.id }}">
            {% partial 'forum/topic/post' post=post %}
        </div>
    {% endfor %}
</div>
```

Each post is wrapped in a `div` with a unique ID. This is important for AJAX updates when editing or deleting posts.

## Creating the Post Partial

Create `partials/forum/topic/post.htm` to render a single post:

```twig
{% if mode is defined and mode == 'delete' and post.id == post.id %}

    <div class="p-4 text-sm text-gray-500 italic">
        This post has been removed.
    </div>

{% elseif mode is defined and mode == 'edit' and post.id == post.id %}

    <div class="p-4">
        <form>
            <input type="hidden" name="mode" value="save" />
            <input type="hidden" name="post" value="{{ post.id }}" />

            {% if topic.first_post.id == post.id %}
                <div class="mb-3">
                    <input
                        type="text"
                        name="subject"
                        value="{{ topic.subject }}"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Subject"
                    />
                </div>
            {% endif %}

            <div class="mb-3">
                <textarea
                    name="content"
                    rows="5"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >{{ post.content }}</textarea>
            </div>

            <div class="flex items-center gap-3">
                <button
                    type="button"
                    data-request="onUpdate"
                    data-request-data="post: {{ post.id }}, mode: 'save'"
                    data-request-update="{ 'forum/topic/post': '#post-{{ post.id }}' }"
                    data-attach-loading
                    class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                    Save
                </button>
                <button
                    type="button"
                    data-request="onUpdate"
                    data-request-data="post: {{ post.id }}, mode: 'delete'"
                    data-request-update="{ 'forum/topic/post': '#post-{{ post.id }}' }"
                    data-request-confirm="Are you sure you want to delete this post?"
                    class="px-3 py-1.5 text-sm text-red-600 hover:underline"
                >
                    Delete
                </button>
                <button
                    type="button"
                    data-request="onUpdate"
                    data-request-data="post: {{ post.id }}, mode: 'view'"
                    data-request-update="{ 'forum/topic/post': '#post-{{ post.id }}' }"
                    class="px-3 py-1.5 text-sm text-gray-600 hover:underline"
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>

{% else %}

    <div class="p-4 flex items-start gap-4">
        <div class="shrink-0">
            <img
                src="{{ post.member.user.avatarThumb(40) }}"
                alt="{{ post.member.username }}"
                class="w-10 h-10 rounded-full"
            />
        </div>
        <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
                <a href="{{ post.member.url }}" class="text-sm font-medium text-gray-900 hover:underline">
                    {{ post.member.username }}
                </a>
                {% if post.member.is_moderator %}
                    <span class="text-xs font-medium text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                        Mod
                    </span>
                {% endif %}
                <span class="text-xs text-gray-400">
                    {{ post.created_at|date('M j, Y \\a\\t g:i a') }}
                </span>
            </div>

            <div class="prose prose-sm max-w-none text-gray-700">
                {{ post.content_html|raw }}
            </div>

            {% if post.created_at != post.updated_at %}
                <p class="text-xs text-gray-400 mt-2">
                    Edited {{ post.updated_at|date('M j, Y \\a\\t g:i a') }}
                </p>
            {% endif %}

            {% if topic.canPost %}
                <div class="flex items-center gap-3 mt-3">
                    <button
                        type="button"
                        class="text-xs text-gray-500 hover:text-blue-600"
                        data-request-data="post: {{ post.id }}"
                        data-quote-button
                    >
                        Quote
                    </button>
                    {% if post.canEdit %}
                        <button
                            type="button"
                            class="text-xs text-gray-500 hover:text-blue-600"
                            data-request="onUpdate"
                            data-request-data="post: {{ post.id }}"
                            data-request-update="{ 'forum/topic/post': '#post-{{ post.id }}' }"
                        >
                            Edit
                        </button>
                    {% endif %}
                </div>
            {% endif %}
        </div>
    </div>

{% endif %}
```

This partial handles three display modes:

- **View mode** (default): shows the post content with the author's avatar, username, timestamp, and action buttons
- **Edit mode**: shows a form with the post content in a textarea, plus Save, Delete, and Cancel buttons
- **Delete mode**: shows a "post has been removed" message

## How AJAX Post Updates Work

When a user clicks "Edit", the button calls `data-request="onUpdate"` with the post ID. The handler sets `mode = 'edit'` and returns the updated page variables. The `data-request-update` attribute tells the framework to re-render the `forum/topic/post` partial and replace the content of `#post-{{ post.id }}`.

The same pattern applies for Save, Delete, and Cancel. Each action calls `onUpdate` with a different `mode` value, and the partial re-renders itself with the appropriate content.

## Creating the Reply Form Partial

Create `partials/forum/topic/postform.htm`:

```twig
<form data-request="onPost" data-request-flash>
    <input type="hidden" name="topic" value="{{ topic.id }}" />

    <h3 class="text-lg font-semibold mb-3">
        Post a Reply
    </h3>

    <div class="mb-3">
        <textarea
            id="topicContent"
            name="content"
            rows="5"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="Write your reply... Markdown is supported."
        >{{ form_value('content') }}</textarea>
    </div>

    <button
        type="submit"
        data-attach-loading
        class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
    >
        Post a Reply
    </button>
</form>
```

The `onPost` handler creates the reply and redirects the user to the last page of the topic with the new post visible.

## Creating the New Topic Form Partial

Create `partials/forum/topic/createform.htm`:

```twig
<form data-request="onCreate" data-request-flash>
    <input type="hidden" name="channel" value="{{ channel.id }}" />

    <div class="mb-4">
        <label for="topicSubject" class="block text-sm font-medium text-gray-700 mb-1">
            Subject
        </label>
        <input
            id="topicSubject"
            name="subject"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            value="{{ post('subject') }}"
        />
    </div>

    <div class="mb-4">
        <label for="topicContent" class="block text-sm font-medium text-gray-700 mb-1">
            Content
        </label>
        <textarea
            id="topicContent"
            name="content"
            rows="8"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
        >{{ post('content') }}</textarea>
        <p class="text-xs text-gray-500 mt-1">
            You can use Markdown syntax for formatting.
        </p>
    </div>

    <button
        type="submit"
        data-attach-loading
        class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
    >
        Post this Topic
    </button>
</form>
```

The `onCreate` handler creates the topic and its first post, then redirects to the new topic page.

## Creating the Control Panel Partial

Create `partials/forum/topic/controlpanel.htm` for the sidebar with topic actions and moderation tools:

```twig
<div class="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
    {% if member %}
        <a
            href="javascript:;"
            data-request="onFollow"
            data-request-update="{ 'forum/topic/controlpanel': '#topicControlPanel' }"
            class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        >
            {% if member.isFollowing(topic) %}
                Unfollow this topic
            {% else %}
                Follow this topic
            {% endif %}
        </a>
    {% endif %}

    {% if topic.is_locked %}
        <div class="px-4 py-3 text-sm text-red-600">
            This topic is locked
        </div>
    {% else %}
        <a href="#postForm" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
            Post a reply
        </a>
    {% endif %}

    <div class="px-4 py-3 text-sm text-gray-500">
        {{ topic.count_views }} views
    </div>

    {% if member.is_moderator %}
        <div class="px-4 py-3">
            <p class="text-xs font-semibold text-gray-400 uppercase mb-2">
                Moderation
            </p>

            <div class="space-y-2">
                <a
                    href="javascript:;"
                    data-request="onLock"
                    data-request-update="{ 'forum/topic/controlpanel': '#topicControlPanel' }"
                    class="block text-sm text-gray-700 hover:text-blue-600"
                >
                    {% if topic.is_locked %}
                        Unlock topic
                    {% else %}
                        Lock topic
                    {% endif %}
                </a>

                <a
                    href="javascript:;"
                    data-request="onSticky"
                    data-request-update="{ 'forum/topic/controlpanel': '#topicControlPanel' }"
                    class="block text-sm text-gray-700 hover:text-blue-600"
                >
                    {% if topic.is_sticky %}
                        Unsticky topic
                    {% else %}
                        Sticky topic
                    {% endif %}
                </a>
            </div>

            <form data-request="onMove" data-request-confirm="Move this topic to the selected channel?" class="mt-3">
                <select name="channel" class="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm mb-2">
                    {% for id, title in forumTopic.channelList %}
                        <option value="{{ id }}">
                            {{ title|raw }}
                        </option>
                    {% endfor %}
                </select>
                <button type="submit" class="w-full px-3 py-1.5 bg-gray-100 text-sm text-gray-700 rounded-md hover:bg-gray-200">
                    Move topic
                </button>
            </form>
        </div>
    {% endif %}
</div>
```

The control panel uses `data-request-update` to refresh itself after toggling follow, lock, or sticky status. This keeps the button labels in sync without a full page reload.

## Creating Your First Topic

1. Navigate to `/forum`, click into a channel, and click "New Topic"
2. Enter a subject and content (Markdown formatting is supported)
3. Click "Post this Topic". You are redirected to the new topic page.

## Replying and Editing

- **Reply**: scroll to the bottom of a topic and use the reply form. After posting, you are redirected to the last page with your new post visible.
- **Edit**: click "Edit" on any of your own posts. The post content switches to a textarea where you can make changes. Click "Save" to commit the edit or "Cancel" to discard.
- **Delete**: while editing, click "Delete" and confirm. The post is removed and replaced with a notice.
- **Quote**: click "Quote" on a post to insert its content into the reply form (requires JavaScript handling in your theme).

## Moderation Tools

Moderators see additional controls in the sidebar:

- **Lock/Unlock**: prevents new replies to the topic
- **Sticky/Unsticky**: pins the topic to the top of the channel
- **Move**: relocates the topic to a different channel

To make a user a moderator, go to the backend **Users** section, click the user, navigate to the **Forum** tab, and check **Forum moderator**.

## Try It Out

1. Create a topic from the channel page
2. Post a few replies to build the thread
3. Edit one of your posts and save the changes
4. Register a second test account and verify it can reply but not edit your posts
5. Mark the first user as a moderator in the backend and test the lock, sticky, and move controls

## Next Steps

Continue to [Member Profile](./member-profile.md) to add member profiles with activity and moderation tools.
