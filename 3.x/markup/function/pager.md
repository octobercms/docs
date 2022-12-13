---
subtitle: Twig Function
---
# pager()

The `pager()` function is used to handle [paginated records](../../extend/database/pagination.md) (first argument). It returns an object containing details about the records, including the page numbers and next / previous links. When treated as a string, it will render default HTML markup.

Once you have retrieved the results, you may display the results and render the page links using the `pager()` Twig function.

```twig
<div class="container">
    {% for user in users %}
        {{ user.name }}
    {% endfor %}
</div>

{{ pager(users) }}
```

The following configurable options are supported (second argument).

Option | Description
------------- | -------------
**template** | specify a default template or [view name](../../extend/services/response-view.md). Example: `app::my-custom-view`
**partial** | specify a [partial name](../../cms/themes/partials.md) in the theme (CMS only). Example: `my-partial`
**withQuery** | include any existing query parameters with the generated links. Default: `false`
**appends** | an optional array of values to include in the query parameters.
**fragment** | an optional fragment string to include in the URLs.

## Modifying the URL

Use the `withQuery` to preserve the existing query string in the URL.

```twig
{{ pager(records, { withQuery: true }) }}
```

You may add to the query string of pagination links using the `appends` method. For example, to append `&sort=votes` to each pagination link, you should make the following call to `appends`.

```twig
{{ pager(records, { appends: { sort: 'votes' } }) }}
```

If you wish to append a "hash fragment" to the pagination URLs, you may use the `fragment` method. For example, to append `#foo` to the end of each pagination link, make the following call to the `fragment` method.

```twig
{{ pager(records, { fragment: 'foo' }) }}
```

## Accessing Pager Variables

Setting the `pager()` function to a variable extracts the paginated links and meta data from a paginated query. This is particularly useful when [building API endpoints](../../cms/resources/building-apis.md) (JSON) but it can also be used to access the variables within Twig.

Starting with a paginated collection.

```twig
{% set records = postModel.paginate(3) %}
```

The `pager()` function will return an extracted object.

```twig
{% set paginator = pager(records) %}
```

Where each variable can be accessed.

```twig
<a href="{{ paginator.links.first }}"></a>
```

The returned object is divided in to **links** and **meta** with the following attributes.

Attribute | Description
------------- | -------------
**links.first** | URL to the first page
**links.last** | URL to the last page
**links.prev** | URL to the previous page
**links.next** | URL to the next page
**meta.path** | URL to the current page
**meta.per_page** | Number of records per page
**meta.total** | Total records found
**meta.current_page** | The current page number
**meta.last_page** | The last page number
**meta.from** | Starting record number
**meta.to** | Ending record number

An example in JSON format.

```json
{
    "links": {
        "first": "https://yoursite.tld/api/blog/posts?page=1",
        "last": "https://yoursite.tld/api/blog/posts?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "path": "https://yoursite.tld/api/blog/posts",
        "per_page": 3,
        "total": 2,
        "current_page": 1,
        "last_page": 1,
        "from": 1,
        "to": 2
    }
}
```

## Rendering the Pager

When rendering the `pager()` function directly, accessing it as a string, it will render a default system template for displaying paginated links.

```twig
{{ pager(records) }}
```

The companion `ajaxPager()` function will render a AJAX-enabled pagination template (see AJAX template below). Ideally, this should be used inside an [AJAX partial](../tag/ajax-partial.md).

```twig
{{ ajaxPager(records) }}
```

### Default Template

The `default` template is used by standard pagiantion and outputs the following. It is used by deafult with the `paginate()` method on a database query.

```html
<ul class="pagination">
    <li class="page-item first">
        <span class="page-link">&larr;</span>
    </li>
    <li class="page-item">
        <a class="page-link" href="?page=1">1</a>
    </li>
    <li class="page-item last">
        <a class="page-link" href="?page=2">&rarr;</a>
    </li>
</ul>
```

### Simple Template

The `simple` template is used by simplified pagiantion and outputs the following. It is used by deafult with the `simplePaginate()` method on a database query.

```html
<ul class="pagination">
    <li class="page-item first">
        <span class="page-link">&larr;</span>
    </li>
    <li class="page-item last">
        <a class="page-link" href="?page=2">&rarr;</a>
    </li>
</ul>
```

### AJAX Template

The `ajax` template is used by AJAX enabled pagiantion and outputs the following. It is used by deafult with the `paginate()` method on a database query and the `ajaxPager()` function.

```html
<ul class="pagination">
    <li class="page-item first">
        <span class="page-link">&larr;</span>
    </li>
    <li class="page-item">
        <a
            class="page-link"
            data-request="onAjax"
            data-request-data="{ page: 1 }"
            data-request-update="{ _self: true }">1</a>
    </li>
    <li class="page-item last">
        <a
            class="page-link"
            data-request="onAjax"
            data-request-data="{ page: 2 }"
            data-request-update="{ _self: true }">&rarr;</a>
    </li>
</ul>
```

## Using Custom Markup

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

#### See Also

::: also
* [Building API Resources](../../cms/resources/building-apis.md)
* [CMS Pagination](../../cms/features/pagination.md)
* [Model Pagination](../../extend/database/pagination.md)
:::
