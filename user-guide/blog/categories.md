---
subtitle: Let visitors browse blog posts by category.
---
# Categories

In the previous steps, you added category links to the listing and detail pages. Now let's create a dedicated page so visitors can browse all posts in a specific category.

## Creating the Category Page

1. Navigate to **Editor → Pages** and click **+ Add**.
2. Fill in the settings:
    - **Title**: `Blog Category`
    - **URL**: `/blog/category/:slug`
    - **File Name**: `blog-category`
    - **Layout**: select `default`
3. Click the **Components** panel and add:
    - **Section**: set its **handle** to `Blog\Category`
    - **Collection**: set its **handle** to `Blog\Post`
4. In the markup editor, enter:

```twig
{% if section is empty %}
    {% do abort(404) %}
{% endif %}

{% set posts = collection.whereRelation('categories', 'slug', section.slug).paginate(6) %}

<a href="{{ 'blog'|page }}" class="text-blue-600 hover:underline mb-6 inline-block">
    &larr; Back to blog
</a>

<h1 class="text-3xl font-bold mb-2">
    {{ section.title }}
</h1>

{% if section.description %}
    <p class="text-gray-600 mb-8">
        {{ section.description }}
    </p>
{% endif %}

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
        No posts in this category yet.
    </p>
{% endfor %}

{{ pager(posts) }}
```

5. Click **Save**.

### How This Works

The key line is:

```twig
{% set posts = collection.whereRelation('categories', 'slug', section.slug).paginate(6) %}
```

- **`section`**: loads the category record matching the `:slug` URL parameter, just like the post detail page loads a post.
- **`collection.whereRelation('categories', 'slug', section.slug)`**: filters the post collection to only include posts where the `categories` relationship contains a record matching the current category's slug. This is the technique for filtering entries by a related blueprint.
- **`.paginate(6)`**: paginates the filtered results.

Everything else follows the same patterns from the listing page.

## Try It Out

1. Preview your site and go to the blog listing page.
2. Click on a category link next to any post (e.g., "Technology").
3. You should see only the posts assigned to that category, with the category name and description at the top.
4. Click **Back to blog** to return to the full listing.

## Next Steps

Continue to [Tags](./tags.md) to add tag filtering so visitors can browse posts by tag.

For the full component reference, see [Collection Component](../../4.x/cms/components/collection.md) and [Entries Content Field](../../4.x/cms/tailor/content-fields.md) in the developer documentation.
