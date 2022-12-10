---
subtitle: Twig Function
---
# pager()

The `pager()` function is used to handle [paginated records](../../extend/database/pagination.md). By default it returns an array containing details about the records, including the page numbers and next / previous links.

The array template (default) is used for JSON and Twig variables.

```twig
{% set pager = pager(posts) %}
```

You may render pagination HTML by specify a custom template name with the pager configuration (second argument).

```yaml
{{ pager(posts, { template: 'default' }) }}
```

The available templates are below and described in more detail further.

Template | Detail
------------- | -------------
`array` | Returns a detailed array object, default.
`default` | Renders the default pagination template.<br>Location: `~/modules/system/views/pagination/default.htm`
`simple` | Renders pagination with only next and previous buttons.<br>Location: `~/modules/system/views/pagination/simple.htm`
`ajax` | Renders AJAX paginated records.<br>Location: `~/modules/system/views/pagination/ajax.htm`

## Array Template

The `array` template is used by default with the `pager()` function and extracts the paginated links and meta data from a paginated query. This is particularly useful when [building API endpoints](../../cms/resources/building-apis.md) but it can also be used to access the variables within Twig.

Starting with a paginated collection.

```twig
{% set posts = blogModel.paginate(3) %}
```

The `pager()` function will return the array details.

```twig
{% set pager = pager(posts) %}
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

## Default Template

The `default` template is used by standard pagiantion and outputs the following.

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

## Simple Template

The `simple` template is used by simplified pagiantion and outputs the following.

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

## AJAX Template

The `ajax` template is used by AJAX enabled pagiantion and outputs the following.

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

#### See Also

::: also
* [Building API Resources](../../cms/resources/building-apis.md)
* [Model Pagination](../../extend/database/pagination.md)
:::
