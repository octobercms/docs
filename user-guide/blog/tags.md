---
subtitle: Add a tag cloud partial with post counts and create a tag filter page.
---
# Tags

The category page filters posts using `whereRelation`. Tags will take a different approach. You will build a **tag cloud partial** that displays all tags with their post counts, then include it on multiple pages. This is a great way to learn how partials can contain their own components.

## Creating the Tag Cloud Partial

Instead of adding the tag cloud markup directly to a page, you will create a reusable partial. This way, you can include it on the blog listing page, the category page, or anywhere else you want to show tags.

1. Navigate to **Editor → Partials** and click **+ Add**.
2. Set the **File Name** to `blog/tag-cloud`.
3. Click the **Components** panel and add:
    - **Collection**: set its **alias** to `tags` and its **handle** to `Blog\Tag`
4. In the markup editor, enter:

```twig
{% set allTags = tags.withCount('posts').get() %}

{% if allTags is not empty %}
    <div class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-lg font-semibold mb-4">
            Browse by Tag
        </h2>
        <div class="flex flex-wrap gap-2">
            {% for tag in allTags %}
                <a href="{{ 'blog-tag'|page({slug: tag.slug}) }}" class="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm">
                    {{ tag.title }}
                    <span class="bg-gray-300 text-gray-600 text-xs font-medium px-1.5 py-0.5 rounded-full">
                        {{ tag.posts_count }}
                    </span>
                </a>
            {% endfor %}
        </div>
    </div>
{% endif %}
```

5. Click **Save**.

### How This Works

- **Partials can have components**: the Collection component attached to this partial loads tag data independently. Any page that includes this partial gets the tag cloud without needing to add the component itself.
- **`withCount('posts')`**: counts how many related posts each tag has. This uses the inverse relation you defined in the tag blueprint earlier.
- **`tag.posts_count`**: the count is available as an attribute named `{relation}_count`. Since the relation is called `posts`, the attribute is `posts_count`.
- **`.get()`**: returns all tags without pagination (tag lists are typically short).

::: tip
The `withCount` method works because the tag blueprint defines an inverse `posts` field pointing back to `Blog\Post`. Without that inverse relation, Tailor wouldn't know how to count posts for each tag.
:::

## Including the Tag Cloud

Now add the tag cloud to your blog pages. Open the **blog listing page** (**Editor → Pages → Blog**) and add the following line at the bottom of the markup, after `{{ pager(posts) }}`:

```twig
{% partial 'blog/tag-cloud' %}
```

Save the page. You can include the same partial on the **category page** too. Open **Editor → Pages → Blog Category** and add the same line at the bottom, after `{{ pager(posts) }}`:

```twig
{% partial 'blog/tag-cloud' %}
```

The tag cloud now appears on both pages, and you only wrote the markup once.

## Creating the Tag Filter Page

When a visitor clicks a tag, they need to see the matching posts. This works the same way as the category filter page.

1. Navigate to **Editor → Pages** and click **+ Add**.
2. Fill in the settings:
    - **Title**: `Blog Tag`
    - **URL**: `/blog/tag/:slug`
    - **File Name**: `blog-tag`
    - **Layout**: select `default`
3. Click the **Components** panel and add:
    - **Section**: set its **handle** to `Blog\Tag`
    - **Collection**: set its **handle** to `Blog\Post`
4. In the markup editor, enter:

```twig
{% if section is empty %}
    {% do abort(404) %}
{% endif %}

{% set posts = collection.whereRelation('tags', 'slug', section.slug).paginate(6) %}

<a href="{{ 'blog'|page }}" class="text-blue-600 hover:underline mb-6 inline-block">
    &larr; Back to blog
</a>

<h1 class="text-3xl font-bold mb-8">
    Posts tagged "{{ section.title }}"
</h1>

{% for post in posts %}
    <article class="mb-8 pb-8 border-b border-gray-200">
        {% if post.featured_image %}
            <a href="{{ 'blog-post'|page({slug: post.slug}) }}">
                <img
                    src="{{ post.featured_image.thumb(800, 400, {mode: 'crop'}) }}"
                    alt="{{ post.title }}"
                    class="w-full rounded-lg mb-4"
                >
            </a>
        {% endif %}

        <h2 class="text-2xl font-semibold mb-2">
            <a href="{{ 'blog-post'|page({slug: post.slug}) }}" class="hover:text-blue-600">
                {{ post.title }}
            </a>
        </h2>

        <div class="text-sm text-gray-500 mb-3">
            {{ post.published_at_date|date('F j, Y') }}
        </div>

        {% if post.excerpt %}
            <p class="text-gray-600">
                {{ post.excerpt }}
            </p>
        {% endif %}
    </article>
{% else %}
    <p class="text-gray-500">
        No posts with this tag yet.
    </p>
{% endfor %}

{{ pager(posts) }}

{% partial 'blog/tag-cloud' %}
```

5. Click **Save**.

## Try It Out

1. Preview your site and go to the blog listing page. Below the posts, you should see a "Browse by Tag" section with all your tags and their post counts.
2. Click on a tag to see the filtered posts.
3. Notice the tag cloud appears on the tag filter page too.
4. Navigate to a category page. The tag cloud is there as well.
5. Go to a blog post detail page and click a tag pill at the bottom. It takes you to the same filtered view.

## Going Further

Your blog is fully functional. Here are some ideas for extending it:

- **Category list partial**: apply the same pattern to create a reusable category list partial with `withCount`.
- **Search**: add a search page using the Collection component's `searchWhere` method to filter posts by title and content.
- **Authors**: create an Author blueprint with avatar, bio, and social links, then link it to posts with an `entries` field.

The [demo theme](https://github.com/octobercms/october/tree/4.x/themes/demo) includes all of these features and more. It is a great reference for extending your blog.

## Next Steps

Continue to [RSS Feed](./rss-feed.md) to add an RSS feed so readers can subscribe to your blog.
