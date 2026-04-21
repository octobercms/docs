---
subtitle: Create a page that displays all your blog posts with pagination.
---
# Listing Page

Now that your blog posts exist in the backend, you need a way to display them on your website. In this step, you will create a blog listing page that shows all published posts with pagination.

## Adding a Blog Link

First, add a link to the blog in your layout's navigation. Open **Editor → Layouts → default** and add a blog link alongside your existing navigation links:

```twig
<a href="{{ 'blog'|page }}" class="text-gray-600 hover:text-gray-900">
    Blog
</a>
```

Save the layout. The link won't work yet, you'll create the blog page next.

## Building the Listing Page

1. Navigate to **Editor → Pages** and click **+ Add**.
2. Fill in the settings:
    - **Title**: `Blog`
    - **URL**: `/blog`
    - **File Name**: `blog`
    - **Layout**: select `default`
3. Click the **Components** panel and add:
    - **Collection**: set its **handle** to `Blog\Post`
4. In the markup editor, enter:

```twig
{% set posts = collection.paginate(6) %}

<h1 class="text-3xl font-bold mb-8">
    Blog
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
            {% if post.categories is not empty %}
                &middot;
                {% for category in post.categories %}
                    <a href="{{ 'blog-category'|page({slug: category.slug}) }}" class="text-blue-600 hover:underline">
                        {{ category.title }}
                    </a>{{ not loop.last ? ',' }}
                {% endfor %}
            {% endif %}
        </div>

        {% if post.excerpt %}
            <p class="text-gray-600">
                {{ post.excerpt }}
            </p>
        {% endif %}
    </article>
{% else %}
    <p class="text-gray-500">
        No posts yet. Create some in the backend!
    </p>
{% endfor %}

{{ pager(posts) }}
```

5. Click **Save**.

::: tip
Don't worry about the `blog-post` and `blog-category` links showing errors. Those pages don't exist yet. You will create them in the next steps.
:::

### How This Works

- **`collection.paginate(6)`**: fetches posts, 6 per page. Because the blueprint is a `stream`, they are automatically sorted newest-first. No explicit sorting needed.
- **`post.published_at_date|date('F j, Y')`**: the stream's automatic published date field, formatted as "January 15, 2025".
- **`post.featured_image.thumb(800, 400, {mode: 'crop'})`**: generates a cropped thumbnail of the featured image at 800x400 pixels.
- **`'blog-post'|page({slug: post.slug})`**: generates the URL for the detail page using the post's slug.
- **`post.categories`**: accesses the categories relationship defined in the blueprint.
- **`{{ pager(posts) }}`**: renders pagination links (Previous, Next, page numbers).
- **`{% else %}`** on the for loop: displays a message when there are no posts.

## Try It Out

1. Preview your site and click the **Blog** link in the navigation.
2. You should see your sample posts displayed newest-first, with featured images, dates, excerpts, and category links.
3. If you have more than 6 posts, pagination links will appear at the bottom. Try creating a few more posts to see pagination in action.

## Next Steps

Continue to [Detail Page](./detail-page.md) to create the individual blog post view.

For the full component reference, see [Collection Component](../../4.x/cms/components/collection.md) in the developer documentation.
