---
subtitle: Learn how to display pagination links.
---
# Pagination

October CMS includes pagination features out of the box, it integrates with standard templates and offers complete flexibility for custom markup. Paginated records are integrated closely with the [model pagination queries](../../extend/database/pagination.md) and the [`pager()` Twig function](../../markup/function/pager.md).

## Paginating Data

A paginated set of data can come from [Component logic](../../extend/cms-components.md), inside the page or layout [PHP section](../themes/themes.md), or from [a Tailor component](../tailor/components.md). The following is an example of a page requesting paginated data from a Tailor component, stepping through the records at **10** per page.

```twig
url = "/blog"

[collection]
handle = "Blog\Post"
==
{% set posts = collection.paginate(10) %}
```

Now the `posts` variable is available. We can loop through each record and display the pagination links.

```twig
<div>
    {% for post in posts %}
        <h2>{{ post.title }}</h2>
    {% endfor %}
</div>

<nav>
    {{ pager(posts) }}
</nav>
```

### Multiple Pagination Instances

By default the pagination will take the current page number from the `?page` query string, so the same page number will be used when displaying two or more sets of paginated data. To solve this problem, use the `paginateCustom` method and specify a unique parameter name.

```twig
url = "/blog"

[collection blog]
handle = "Blog\Post"

[collection category]
handle = "Blog\Category"
==
{% set posts = blog.paginateCustom(10, 'postPage') %}

{% set comments = comments.paginateCustom(10, 'commentPage') %}
```

Set the `withQuery` option to preserve the page number for other pagination instances (optional). This results in the query string containing both page numbers, for example,<br>`?postPage=1&commentPage=2`.

```twig
{{ pager(categories, { withQuery: true }) }}
```

### Using Custom Pagination Markup

To use custom pagination markup, start with the file locations below and copy the contents to a partial inside your theme.

Template | Detail
------------- | -------------
`default` | Renders the default pagination template.<br>Location: `~/modules/system/views/pagination/default.htm`
`simple` | Renders pagination with only next and previous buttons.<br>Location: `~/modules/system/views/pagination/simple.htm`
`ajax` | Renders AJAX paginated records.<br>Location: `~/modules/system/views/pagination/ajax.htm`

Then render as a partial by passing the `partial` option to the pager.

```twig
{{ pager(records, { partial: 'my-custom-pagination' }) }}
```

## AJAX Pagination

Use the `ajaxPager()` Twig function to update paginated records dynamically using AJAX. The partial should display the records and include the pager inside, for example, a partial named **latest-posts.htm** with the following contents.

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

Then render the partial on the page using the [`{% ajaxPartial %}` Twig tag](../../markup/tag/ajax-partial.md).

```twig
url = "/blog"

[collection blog]
handle = "Blog\Post"
==
{% set posts = blog.paginate(10) %}

<h3>Latest Posts</h3>
{% ajaxPartial 'latest-posts' %}
```

Alternatively, you can encapsulate all the logic inside the partial to make it completely portable.

```twig
[collection blog]
handle = "Blog\Post"
==
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

The partial can then be rendered anywhere on a page or layout without any additional configuration.

```twig
url = "/blog"
==
{% ajaxPartial 'latest-posts' %}
```

## Load More Pagination

A load more button, sometimes called an infinite loader, is a method of displaying records in a stack instead of across multiple pages.

This approach uses an AJAX partial to append the new content along with a self-destructing button. For example, a partial named **load-more-posts.htm** with the following contents.

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

The button element leverages a combination of AJAX data attributes to perform [a self-update in append mode](../ajax/update-partials.md), passing the next page number as data and removing itself upon completion.

The partial should be rendered using  [`{% ajaxPartial %}` Twig tag](../../markup/tag/ajax-partial.md).

```twig
url = "/blog"
==
{% ajaxPartial 'load-more-posts' %}
```

#### See Also

::: also
* [Model Pagination](../../extend/database/pagination.md)
* [Pager Twig function](../../markup/function/pager.md)
:::
