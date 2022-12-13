---
subtitle: Learn how to display paginated data including navigation.
---
# Pagination

October CMS includes pagination features out of the box, it integrates with standard templates and offers complete flexibility for custom markup. Paginated records are integrated closely with the [model pagination queries](../../extend/database/pagination.md) and the [`pager()` Twig function](../../markup/function/pager.md).

## Paginating Data

A paginated set of data is the result of a database query and can come from [Component logic](../../extend/cms-components.md), inside the page or layout [PHP section](../themes/themes.md), or from [a Tailor component](../tailor/components.md). The following is an example of paginated data from a Tailor component requesting **10** records per page.

```twig
url = "/blog"

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
    {{ pager(posts) }}
</nav>
```

### Multiple Pagination Instances

By default the pagination will take the current page number from the `?page` query string, so the same page number will be used when displaying two or more sets of paginated data. Use the `paginateCustom` method to overcome this problem.

```twig
{% set posts = blog.paginateCustom(10, 'postPage') %}

{% set comments = comments.paginateCustom(10, 'commentPage') %}
```

Optionally set the `withQuery` option to preserve the page number for other pagination instances.

```twig
{{ pager(categories, { withQuery: true }) }}
```

This results in a query string that contains both page numbers.

```html
?postPage=1&commentPage=2
```

### Using Custom Pagination Markup

Specify the `partial` option to customize the pagination markup either in your theme using a CMS partial.

```twig
{{ pager(records, { partial: 'my-custom-pagination' }) }}
```

View the [`pager()` Twig function](../../markup/function/pager.md) article to learn more about the available templates and their file locations.

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

A load more button, sometimes called an infinite loader, is a method of displaying records in a stack instead of across multiple pages. The approach uses an AJAX partial to append the new content along with a self-destructing button.

For example, create a partial named **load-more-posts.htm** with the following contents.

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

The button inside leverages a combination of AJAX data attributes to perform [a self-update in append mode](../ajax/update-partials.md), passing the next page number as data and removing itself upon completion.

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
