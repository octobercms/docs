---
subtitle: 了解如何显示分页链接。
---
# 分页

October CMS 内置了分页功能，它与标准模板集成并提供完全灵活的自定义标记。分页记录与[模型分页查询](../../extend/database/pagination.md)和 [`pager()` Twig 函数](../../markup/function/pager.md)紧密集成。

## 分页数据

分页数据集可以来自[组件逻辑](../../extend/cms-components.md)、页面或布局的 [PHP 部分](../themes/themes.md)，或来自 [Tailor 组件](../tailor/components.md)。以下是一个页面从 Tailor 组件请求分页数据的示例，每页 **10** 条记录。

::: cmstemplate
```ini
url = "/blog"

[collection]
handle = "Blog\Post"
```
```twig
{% set posts = collection.paginate(10) %}
```
:::

现在 `posts` 变量已可用。我们可以遍历每条记录并显示分页链接。

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

### 多个分页实例

默认情况下，分页会从 `?page` 查询字符串获取当前页码，因此在显示两个或更多分页数据集时会使用相同的页码。要解决此问题，请使用 `paginateCustom` 方法并指定唯一的参数名称。

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

{% set comments = comments.paginateCustom(10, 'commentPage') %}
```
:::

设置 `withQuery` 选项以保留其他分页实例的页码（可选）。

```twig
{{ pager(categories, { withQuery: true }) }}
```

这将使查询字符串包含两个页码，例如，<br>`?postPage=1&commentPage=2`。

### 使用自定义分页标记

要使用自定义分页标记，请从以下文件位置开始，将内容复制到你主题中的一个部件中。

模板 | 详情
------------- | -------------
`default` | 渲染默认分页模板。<br>位置：`~/modules/system/views/pagination/default.htm`
`simple` | 渲染仅包含上一页和下一页按钮的分页。<br>位置：`~/modules/system/views/pagination/simple.htm`
`ajax` | 渲染 AJAX 分页记录。<br>位置：`~/modules/system/views/pagination/ajax.htm`

然后通过将 `partial` 选项传递给 pager 来渲染为部件。

```twig
{{ pager(records, { partial: 'my-custom-pagination' }) }}
```

## AJAX 分页

使用 `ajaxPager()` Twig 函数通过 AJAX 动态更新分页记录。部件应显示记录并在内部包含 pager，例如，一个名为 **latest-posts.htm** 的部件包含以下内容。

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

然后使用 [`{% ajaxPartial %}` Twig 标签](../../markup/tag/ajax-partial.md)在页面上渲染该部件。

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

或者，你可以将所有逻辑封装在部件内部，使其完全可移植。

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

然后可以在任何页面或布局上渲染该部件，无需任何额外配置。

::: cmstemplate
```ini
url = "/blog"
```
```twig
{% ajaxPartial 'latest-posts' %}
```
:::

## 加载更多分页

加载更多按钮，有时称为无限加载器，是一种以堆叠方式显示记录而非跨多页显示的方法。

此方法使用 AJAX 部件追加新内容以及一个自销毁按钮。例如，一个名为 **load-more-posts.htm** 的部件包含以下内容。

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

按钮元素利用 AJAX 数据属性的组合来执行[追加模式的自更新](../ajax/update-partials.md)，将下一页码作为数据传递，并在完成后移除自身。

该部件应使用 [`{% ajaxPartial %}` Twig 标签](../../markup/tag/ajax-partial.md)渲染。

::: cmstemplate
```ini
url = "/blog"
```
```twig
{% ajaxPartial 'load-more-posts' %}
```
:::

#### 参见

::: also
* [模型分页](../../extend/database/pagination.md)
* [Pager Twig 函数](../../markup/function/pager.md)
:::
