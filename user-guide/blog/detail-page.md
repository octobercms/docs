---
subtitle: Display individual blog posts with their full content.
---
# Detail Page

When a visitor clicks on a blog post from the listing, they need to see the full post. In this step, you will create a detail page that displays a single blog post based on its URL slug.

## Creating the Detail Page

1. Navigate to **Editor → Pages** and click **+ Add**.
2. Fill in the settings:
    - **Title**: `Blog Post`
    - **URL**: `/blog/:slug`
    - **File Name**: `blog-post`
    - **Layout**: select `default`
3. Click the **Components** panel and add:
    - **Section**: set its **handle** to `Blog\Post`
4. In the markup editor, enter:

```twig
{% if section is empty %}
    {% do abort(404) %}
{% endif %}

<article class="max-w-3xl">
    <a href="{{ 'blog'|page }}" class="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to blog
    </a>

    {% if section.featured_image %}
        <img
            src="{{ section.featured_image.thumb(900, 450, {mode: 'crop'}) }}"
            alt="{{ section.title }}"
            class="w-full rounded-lg mb-6"
        >
    {% endif %}

    <h1 class="text-4xl font-bold mb-3">
        {{ section.title }}
    </h1>

    <div class="text-sm text-gray-500 mb-8">
        {{ section.published_at_date|date('F j, Y') }}
        {% if section.categories is not empty %}
            &middot;
            {% for category in section.categories %}
                <a href="{{ 'blog-category'|page({slug: category.slug}) }}" class="text-blue-600 hover:underline">
                    {{ category.title }}
                </a>{{ not loop.last ? ',' }}
            {% endfor %}
        {% endif %}
    </div>

    <div class="prose max-w-none">
        {{ section.content|content }}
    </div>

    {% if section.tags is not empty %}
        <div class="mt-8 pt-6 border-t border-gray-200">
            <span class="text-sm font-medium text-gray-500 mr-2">
                Tags:
            </span>
            {% for tag in section.tags %}
                <a href="{{ 'blog-tag'|page({slug: tag.slug}) }}" class="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mr-1 mb-1 hover:bg-gray-200">
                    {{ tag.title }}
                </a>
            {% endfor %}
        </div>
    {% endif %}
</article>
```

5. Click **Save**.

### How This Works

- **`{% if section is empty %} {% do abort(404) %} {% endif %}`**: if no post matches the slug in the URL, a 404 page is returned. You already learned this pattern in the Quick Start.
- **`section.content|content`**: the `|content` filter processes rich editor output, resolving any internal links and media paths. Always use `|content` when rendering richeditor fields.
- **`section.categories`** and **`section.tags`**: the entries relationships defined in the blueprint are accessible as collections you can loop through.
- **`prose max-w-none`**: Tailwind's typography class for nicely formatted article content. This styles headings, paragraphs, lists, and other HTML elements within the post body.

::: tip
The `prose` class is included with the Tailwind CSS CDN. If your blog content looks unstyled, make sure you have the Tailwind CDN link in your layout's `<head>` tag.
:::

## Try It Out

1. Preview your site and go to the blog listing page.
2. Click on any post title or featured image.
3. You should see the full post with its featured image, published date, content, categories, and tags.
4. Click the **Back to blog** link to return to the listing.
5. Try visiting a URL with a slug that doesn't exist, like `/blog/nonexistent`. You should see a 404 page.

## Next Steps

Continue to [Categories](./categories.md) to add category filtering to your blog.

For the full component reference, see [Section Component](../../4.x/cms/components/section.md) in the developer documentation.
