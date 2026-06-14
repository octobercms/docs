---
subtitle: Create the forum index and channel pages to browse discussions.
---
# Forum Pages

The forum needs two browsing pages: an index page that lists all channels, and a channel page that shows the topics within a selected channel.

## Creating the Forum Index Page

Create a new page at `pages/forum/index.htm`:

::: cmstemplate
```ini
title = "Forum"
url = "/forum"
layout = "default"

[forumChannels]
channelPage = "forum/channel"
topicPage = "forum/topic"
memberPage = "forum/member"
```
```twig
<h1 class="text-2xl font-bold mb-6">
    Forum
</h1>

{% for category in channels %}
    <div class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-3">
            {{ category.title }}
        </h2>

        {% if category.children|length %}
            <div class="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                {% for channel in category.children %}
                    <div class="p-4 flex items-start justify-between">
                        <div>
                            <a href="{{ channel.url }}" class="font-medium text-blue-600 hover:underline">
                                {{ channel.title }}
                            </a>
                            {% if channel.description %}
                                <p class="text-sm text-gray-500 mt-1">
                                    {{ channel.description }}
                                </p>
                            {% endif %}
                        </div>
                        <div class="text-right text-sm text-gray-500 shrink-0 ml-4">
                            <span>{{ channel.count_topics }} topics</span>
                            <span class="mx-1">&middot;</span>
                            <span>{{ channel.count_posts }} posts</span>
                        </div>
                    </div>
                {% endfor %}
            </div>
        {% else %}
            <p class="text-gray-500">
                No channels available.
            </p>
        {% endif %}
    </div>
{% endfor %}
```
:::

## How Component Properties Work

The `channelPage`, `topicPage`, and `memberPage` properties tell the `forumChannels` component which CMS pages to generate URLs for. When the component runs, it calls `setUrl()` on each channel, topic, and member object, making the `.url` property available in your markup.

For example, `channelPage = "forum/channel"` means that `channel.url` will point to your `pages/forum/channel.htm` page with the channel's slug filled in.

## Creating the Channel Page

Create a new page at `pages/forum/channel.htm`:

::: cmstemplate
```ini
title = "Forum Channel"
url = "/forum/channel/:slug"
layout = "default"

[forumChannel]
slug = "{{ :slug }}"
topicPage = "forum/topic"
memberPage = "forum/member"
```
```twig
<div class="mb-4">
    <a href="{{ 'forum/index'|page }}" class="text-sm text-blue-600 hover:underline">
        &larr; Back to Forum
    </a>
</div>

<div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold">
        {{ channel.title }}
    </h1>
    {% if user %}
        <a
            href="{{ 'forum/topic'|page }}?channel={{ channel.id }}"
            class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
            New Topic
        </a>
    {% endif %}
</div>

{% if channel.description %}
    <p class="text-gray-600 mb-6">
        {{ channel.description }}
    </p>
{% endif %}

{% if topics|length %}
    <div class="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {% for topic in topics %}
            <div class="p-4 flex items-start justify-between">
                <div>
                    <div class="flex items-center gap-2">
                        {% if topic.is_sticky %}
                            <span class="text-xs font-medium text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                                Sticky
                            </span>
                        {% endif %}
                        {% if topic.is_locked %}
                            <span class="text-xs font-medium text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                                Locked
                            </span>
                        {% endif %}
                        <a href="{{ topic.url }}" class="font-medium text-gray-900 hover:text-blue-600">
                            {{ topic.subject }}
                        </a>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">
                        by <a href="{{ topic.start_member.url }}" class="hover:underline">{{ topic.start_member.username }}</a>
                    </p>
                </div>
                <div class="text-right text-sm text-gray-500 shrink-0 ml-4">
                    <div>{{ topic.count_posts - 1 }} replies</div>
                    <div>{{ topic.count_views }} views</div>
                </div>
            </div>
        {% endfor %}
    </div>
{% else %}
    <p class="text-gray-500">
        There are no topics in this channel yet.
        {% if user %}
            <a href="{{ 'forum/topic'|page }}?channel={{ channel.id }}" class="text-blue-600 hover:underline">
                Start a discussion
            </a>
        {% endif %}
    </p>
{% endif %}
```
:::

The `slug = "{{ :slug }}"` property binds the URL parameter `:slug` to the component, which uses it to load the correct channel. The component injects the `channel` and `topics` variables into the page.

## Try It Out

1. Preview your site and navigate to `/forum`
2. You should see the channels you created in the backend
3. Click a channel to see its topic list (empty for now)
4. The "New Topic" button links to the topic page (which you will create next)

## Next Steps

Continue to [Topic Page](./topic-page.md) to build the page where users create topics and post replies.
