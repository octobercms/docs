---
subtitle: 使用专用 URL 定义网站部分。
---
# 部分（Section）

`section` 组件定义了一个带有关联条目的网站部分。该部分将在从后端面板预览条目时使用。

## 可用属性

该组件支持以下属性。

属性 | 描述
-------- | -------------
**handle** | [条目蓝图](../tailor/blueprints.md)的句柄。
**identifier** | 使用此标识符键来查找条目，支持的值为 `slug`、`fullslug` 或 `id`。默认值：`slug`
**value** | 使用此标识符值来查找条目，可选。留空则使用标识符键作为 URL 参数名称。可以设置为硬编码值或自定义参数，例如：`{{ :slug }}`
**isDefault** | 在预览条目时将此设为默认页面。默认值：`true`。

## 基本用法

以下示例为 **Blog\Author** 条目创建了一个部分，并使用默认的 `:slug` [URL 参数](../themes/pages.md)来定位它。通过访问 `{{ section.title }}` Twig 变量来显示作者名称作为标题。

::: cmstemplate
```ini
url = "author/:slug"

[section]
handle = "Blog\Author"
```
```twig
<h1>Posts by {{ section.title }}</h1>
```
:::

当同一页面上使用多个部分时，可以使用组件别名来分配不同的变量名称以供页面使用。以下组件别名 **author** 使得标题可以通过 `{{ author.title }}` Twig 变量来访问。

::: cmstemplate
```ini
[section author]
handle = "Blog\Author"
```
```twig
<h1>Posts by {{ author.title }}</h1>
```
:::

## 更改查找标识符

默认标识符为 `slug`，可以通过更改 `identifier` 属性来修改，例如使用 `id` 列来定位记录。请注意，页面 URL 也会相应更改为使用 `:id` 参数名称。

```ini
url = "author/:id"

[section]
handle = "Blog\Author"
identifier = "id"
```

您可以使用 `value` 属性硬编码标识符查找，例如将其设置为 **7** 将使用静态查找来显示记录。

```ini
url = "author/ceo"

[section]
handle = "Blog\Author"
identifier = "id"
value = 7
```

`value` 属性也接受外部参数，以下示例使用 **foobar** URL 参数来查找记录。

```ini
url = "author/:foobar"

[section]
handle = "Blog\Author"
identifier = "id"
value = "{{ :foobar }}"
```

::: warning
预览链接和使用[页面查找器小部件](../../element/form/widget-pagefinder.md)不支持具有自定义值的标识符。
:::

## 检查记录是否存在

在大多数情况下，当找不到记录时，您需要显示 404 页面。这可以通过使用 `{% if %}` 语句结合 `abort(404)` 函数来实现。

```twig
{% if author is empty %}
    {% do abort(404) %}
{% endif %}
```

::: tip
[`abort()` Twig 函数](../../markup/function/abort.md)用于在未找到记录时显示 404 页面。
:::

## 访问条目类型

当使用条目蓝图的[内容组](./blueprints.md)功能时，您可以使用 `content_group` 属性访问组代码。例如，一篇文章可能有 **regular_post** 和 **markdown_post** 内容组，其中内容的处理方式不同。

```twig
{% if post.content_group == 'markdown_post' %}
    <!-- Render content as Markdown -->
    {{ post.content|md }}
{% else %}
    <!-- Render content as HTML -->
    {{ post.content|raw }}
{% endif %}
```

## 使用完整 Slug

如果条目类型为 `structure`，则它将具有可用的 **fullslug** 属性。要在页面 URL 中使用完整 slug，应将其定义为[通配符 URL 参数](../themes/pages.md)。组件的 `identifier` 属性应设置为 **fullslug**。

```ini
url = "/wiki/:fullslug*"

[section article]
handle = "Wiki\Article"
identifier = "fullslug"
```

作为替代方法，我们建议将 **id** 放在 URL 的末尾来定位记录。这样可以自由移动记录而不会破坏网站中的链接。以下示例展示了如何通过重定向之前使用的 URL 来实现这一点。

::: cmstemplate
```ini
url = "/wiki/:fullslug*/:id"

[section article]
handle = "Wiki\Article"
identifier = "id"
```
```twig
{% if article is empty %}
    {% do abort(404) %}
{% elseif article.fullslug != this.param.fullslug %}
    {% do redirect(this|page({ fullslug: article.fullslug }), 301) %}
{% endif %}

<!-- Contents here -->
```
:::

::: tip
[`redirect()` Twig 函数](../../markup/function/redirect.md)用于在 slug 不匹配时进行永久 301 重定向。[`|page` Twig 过滤器](../../markup/filter/page.md)提供当前页面并将 `fullslug` URL 参数重写为正确的匹配值。
:::
