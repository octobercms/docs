---
subtitle: Twig 函数
---
# pager()

`pager()` 函数用于处理[分页记录](../../extend/database/pagination.md)（第一个参数）。它返回一个包含记录详细信息的对象，包括页码和上一页/下一页链接。当作为字符串处理时，它将渲染默认的 HTML 标记。

获取结果后，您可以使用 `pager()` Twig 函数显示结果并渲染页面链接。

```twig
<div class="container">
    {% for user in users %}
        {{ user.name }}
    {% endfor %}
</div>

{{ pager(users) }}
```

支持以下可配置选项（第二个参数）。

选项 | 描述
------------- | -------------
**template** | 指定默认模板或[视图名称](../../extend/services/response-view.md)。例如：`app::my-custom-view`
**partial** | 指定主题中的[局部模板名称](../../cms/themes/partials.md)（仅限 CMS）。例如：`my-partial`
**withQuery** | 在生成的链接中包含任何现有的查询参数。默认值：`false`
**appends** | 一个可选的值数组，用于包含在查询参数中。
**fragment** | 一个可选的片段字符串，用于包含在 URL 中。

## 修改 URL

使用 `withQuery` 保留 URL 中现有的查询字符串。

```twig
{{ pager(records, { withQuery: true }) }}
```

您可以使用 `appends` 方法向分页链接的查询字符串添加内容。例如，要将 `&sort=votes` 附加到每个分页链接，应按以下方式调用 `appends`。

```twig
{{ pager(records, { appends: { sort: 'votes' } }) }}
```

如果您希望向分页 URL 附加"哈希片段"，可以使用 `fragment` 方法。例如，要将 `#foo` 附加到每个分页链接的末尾，请按以下方式调用 `fragment` 方法。

```twig
{{ pager(records, { fragment: 'foo' }) }}
```

## 访问分页器变量

将 `pager()` 函数赋值给一个变量，可以从分页查询中提取分页链接和元数据。这在[构建 API 端点](../../cms/resources/building-apis.md)（JSON）时特别有用，但也可用于在 Twig 中访问变量。

从一个分页集合开始。

```twig
{% set records = postModel.paginate(3) %}
```

`pager()` 函数将返回一个提取的对象。

```twig
{% set paginator = pager(records) %}
```

可以访问每个变量。

```twig
<a href="{{ paginator.links.first }}"></a>
```

返回的对象分为 **links** 和 **meta** 两部分，包含以下属性。

属性 | 描述
------------- | -------------
**links.first** | 第一页的 URL
**links.last** | 最后一页的 URL
**links.prev** | 上一页的 URL
**links.next** | 下一页的 URL
**meta.path** | 当前页的 URL
**meta.per_page** | 每页记录数
**meta.total** | 总记录数
**meta.current_page** | 当前页码
**meta.last_page** | 最后一页的页码
**meta.from** | 起始记录编号
**meta.to** | 结束记录编号

JSON 格式示例。

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

## 渲染分页器

直接渲染 `pager()` 函数（作为字符串访问）时，它将渲染一个用于显示分页链接的默认系统模板。

```twig
{{ pager(records) }}
```

配套的 `ajaxPager()` 函数将渲染一个支持 AJAX 的分页模板（参见下方的 AJAX 模板）。理想情况下，它应在 [AJAX 局部模板](../tag/ajax-partial.md)中使用。

```twig
{{ ajaxPager(records) }}
```

### 默认模板

`default` 模板渲染默认的分页模板。它默认与数据库查询的 `paginate()` 方法一起使用。

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

文件位置：`~/modules/system/views/pagination/default.htm`

### 简单模板

`simple` 模板仅渲染带有上一页和下一页按钮的分页。它默认与数据库查询的 `simplePaginate()` 方法一起使用。

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

文件位置：`~/modules/system/views/pagination/simple.htm`

### AJAX 模板

`ajax` 模板渲染 AJAX 分页记录。它默认与数据库查询的 `paginate()` 方法和 `ajaxPager()` 函数一起使用。

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

文件位置：`~/modules/system/views/pagination/ajax.htm`

## 使用自定义标记

::: tip
请访问[分页功能文章](../../cms/features/pagination.md)了解如何使用自定义分页标记的说明。
:::

#### 参见

::: also
* [构建 API 资源](../../cms/resources/building-apis.md)
* [CMS 分页](../../cms/features/pagination.md)
* [模型分页](../../extend/database/pagination.md)
:::
