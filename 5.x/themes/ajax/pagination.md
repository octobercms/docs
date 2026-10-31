---
previousPath: cms/features/pagination.md
subtitle: Split records across pages and display page links, with or without AJAX.
---
# Pagination

Pagination splits a long list of records into pages and displays links to move between them. It works with [model pagination queries](../../backend/data/model-queries.md) and the [`pager()` Twig function](../../handbook/twig-functions/pager.md). The following page shows blog posts from [a Tailor collection component](../../handbook/tailor-components/collection.md), **10** per page.

::: cmstemplate
```ini
url = "/blog"

[collection]
handle = "Blog\Post"
```
```twig
{% set posts = collection.paginate(10) %}

<div>
    {% for post in posts %}
        <h2>{{ post.title }}</h2>
    {% endfor %}
</div>

<nav>
    {{ pager(posts) }}
</nav>
```
:::

The paginated data can also come from [component logic](../extending/components.md) or the page or layout [PHP section](../structure.md).

## Paginating Multiple Lists on One Page

By default, pagination reads the current page number from the `?page` query string, so two lists on the same page share one page number. To give each list its own, use the `paginateCustom` method with a unique parameter name.

::: cmstemplate
```ini
url = "/blog"

[collection blog]
handle = "Blog\Post"

[collection category]
handle = "Blog\Category"
```
```twig
{% set posts = blog.paginateCustom(10, 'postPage') %}

{% set categories = category.paginateCustom(10, 'categoryPage') %}
```
:::

To keep the page number of the other lists in the links, set the `withQuery` option (optional).

```twig
{{ pager(categories, { withQuery: true }) }}
```

The query string then contains both page numbers, for example,<br>`?postPage=1&categoryPage=2`.

## Using Custom Pagination Markup

To use your own pagination markup, copy the contents of one of the following files to a partial in your theme.

Template | Detail
------------- | -------------
`default` | Renders the default pagination template.<br>Location: `~/modules/system/views/pagination/default.htm`
`simple` | Renders pagination with only next and previous buttons.<br>Location: `~/modules/system/views/pagination/simple.htm`
`ajax` | Renders AJAX paginated records.<br>Location: `~/modules/system/views/pagination/ajax.htm`

Then render it as a partial by passing the `partial` option to the pager.

```twig
{{ pager(records, { partial: 'my-custom-pagination' }) }}
```

## Paginating with AJAX

Use the `ajaxPager()` Twig function to change pages with AJAX instead of a page load. Put the records and the pager inside a partial, for example, a partial named **latest-posts.htm** with the following contents.

```twig
<div>
    {% for post in posts %}
        <h2>{{ post.title }}</h2>
    {% endfor %}
</div>

<nav>
    {{ ajaxPager(posts) }}
</nav>
```

Then render the partial on the page with the [`{% ajaxPartial %}` Twig tag](../../handbook/twig-tags/ajax-partial.md).

::: cmstemplate
```ini
url = "/blog"

[collection blog]
handle = "Blog\Post"
```
```twig
{% set posts = blog.paginate(10) %}

<h3>Latest Posts</h3>
{% ajaxPartial 'latest-posts' %}
```
:::

### Making the Partial Portable

You can move all the logic into the partial so it works on any page.

::: cmstemplate
```ini
[collection blog]
handle = "Blog\Post"
```
```twig
{% set posts = blog.paginate(10) %}

<div>
    {% for post in posts %}
        <h2>{{ post.title }}</h2>
    {% endfor %}
</div>

<nav>
    {{ ajaxPager(posts) }}
</nav>
```
:::

The partial can then be rendered anywhere on a page or layout without other configuration.

::: cmstemplate
```ini
url = "/blog"
```
```twig
{% ajaxPartial 'latest-posts' %}
```
:::

## Adding a Load More Button

A load more button, sometimes called an infinite loader, displays records in one growing list instead of across multiple pages.

This approach uses an AJAX partial that appends the new records along with a button that removes itself. For example, a partial named **load-more-posts.htm** with the following contents.

::: cmstemplate
```ini
[collection blog]
handle = "Blog\Post"
```
```twig
{% set posts = blog.paginate(10) %}

<div>
    {% for post in posts %}
        <h2>{{ post.title }}</h2>
    {% endfor %}
</div>

{% if posts.hasMorePages %}
    <button
        data-request="onAjax"
        data-request-update="{ _self: '@' }"
        data-request-success="this.remove()"
        data-request-data="{ page: {{ posts.currentPage + 1 }} }"
        data-attach-loading>
        Load More
    </button>
{% endif %}
```
:::

The button combines AJAX data attributes to perform [a self-update in append mode](./update-partials.md#appending-prepending-and-replacing-content). It passes the next page number as data and removes itself when the request completes.

Render the partial with the [`{% ajaxPartial %}` Twig tag](../../handbook/twig-tags/ajax-partial.md).

::: cmstemplate
```ini
url = "/blog"
```
```twig
{% ajaxPartial 'load-more-posts' %}
```
:::

#### See Also

::: also
* [Model Pagination](../../backend/data/model-queries.md)
* [Pager Twig function](../../handbook/twig-functions/pager.md)
* [Updating Partials](./update-partials.md)
:::
