---
subtitle: Twig Function
---
# pager()

The `pager()` function extracts the paginated links and meta data from a paginated query.

```twig
{% set posts = blog.paginate(3) %}

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

#### See Also

::: also
* [Building API Resources](../../cms/resources/building-apis.md)
:::
