---
subtitle: 为您的网站页面定义脚手架。
---
# 布局

布局为您的页面定义了一个通用的脚手架，通常意味着在每个页面上重复出现的所有内容，例如页头和页脚。它们几乎总是包含 HTML 代码，如 HEAD、TITLE 和 BODY 标签。

布局模板文件位于主题中的 **layouts** 目录中。布局模板文件应具有 **htm** 扩展名。在布局文件中，您应该使用 `{% page %}` 标签来输出页面内容。以下是最简单的布局示例。

```twig
<html>
    <body>
        {% page %}
    </body>
</html>
```

::: aside
请记住，如果您引用子目录中的布局，则应指定子目录名称。
:::

要为[页面](./pages.md)使用布局，页面应在配置部分中引用布局文件名（不带扩展名）。下面是使用 **default.htm** 布局的页面模板示例。

::: cmstemplate
```ini
url = "/"
layout = "default"
```
```twig
<p>Hello, world!</p>
```
:::

当请求此页面时，其内容会与布局合并，更准确地说 - 布局的 `{% page %}` 标签会被页面内容替换。前面的示例将生成以下标记：

```html
<html>
    <body>
        <p>Hello, world!</p>
    </body>
</html>
```

请注意，您可以在布局中[渲染部件](./partials.md)。这使您可以在不同的布局之间共享通用的标记元素。例如，您可以有一个输出网站 CSS 和 JavaScript 链接的部件。这种方法简化了资源管理 - 如果您想添加 JavaScript 引用，只需修改一个部件而不是编辑所有布局。

配置部分对于布局是可选的。支持的配置参数是 **name** 和 **description**。这些参数是可选的，用于后端用户界面。带有描述的布局模板示例：

::: cmstemplate
```ini
description = "Basic layout example"
```
```twig
<html>
    <body>
        {% page %}
    </body>
</html>
```
:::

## 使用动态页面标题

[页面](pages.md)的 `meta_title` 和 `meta_description` 属性支持从页面生命周期中解析变量。以下布局模板将根据活动页面的值设置页面标题。

```html
<html>
    <head>
        <title>{{ this.page.meta_title }} - October CMS</title>
    </head>
    <body>
        {% page %}
    </body>
<html>
```

页面模板可以使用类似 Twig 的变量语法来定义其标题，使用全局环境中可用的值，在此情况下使用 **post.title** 值。

```ini
url = "/blog"
meta_title = "{{ post.title }} - Blog"
```

> **注意**：仅支持基本的 Twig 变量。不能使用过滤器、标签和函数。

## 占位符

占位符允许页面向布局注入内容。占位符在布局模板中使用 `{% placeholder %}` 标签定义。下一个示例显示了在 HTML HEAD 部分中定义了 **head** 占位符的布局模板。

```twig
<html>
    <head>
        {% placeholder head %}
    </head>
    ...
</html>
```

页面可以使用 `{% put %}` 和 `{% endput %}` 标签向占位符注入内容。以下示例演示了一个简单的页面模板，它将 CSS 链接注入到前面示例中定义的 **head** 占位符。

::: cmstemplate
```ini
url = "/my-page"
layout = "default"
```
```twig
{% put head %}
    <link href="/themes/demo/assets/css/page.css" rel="stylesheet">
{% endput %}

<p>The page content goes here.</p>
```
:::

有关占位符的更多信息可以在[标记指南](../markup/tag-placeholder.md)中找到。

## 动态布局

布局与页面一样，可以使用任何 Twig 功能。有关详细信息，请参阅文档的[动态页面部分](pages.md)。

### 布局执行生命周期

在布局的 PHP 代码部分中，您可以定义以下用于处理页面执行生命周期的函数：`onInit`、`onStart`、`onBeforePageStart` 和 `onEnd`。

`onInit` 函数在所有组件初始化后和处理 AJAX 请求之前执行。`onStart` 函数在页面处理开始时执行。`onBeforePageStart` 函数在布局[组件](./components.md)运行之后但在页面的 `onStart` 函数执行之前执行。`onEnd` 函数在页面渲染之后执行。处理程序的执行顺序如下：

1. 布局 `onInit()` 函数。
1. 页面 `onInit()` 函数。
1. 布局 `onStart()` 函数。
1. 布局组件 `onRun()` 方法。
1. 布局 `onBeforePageStart()` 函数。
1. 页面 `onStart()` 函数。
1. 页面组件 `onRun()` 方法。
1. 页面 `onEnd()` 函数。
1. 布局 `onEnd()` 函数。

### 方法和变量访问

在部件、页面和布局内部访问变量和方法时，使用最近的上下文。以下是 [PHP 代码部分](./themes.md)的定义。

```php
function onStart()
{
    $this['myVariable'] = 'foo';
}

function myMethod()
{
    return 'bar';
}
```

在上面的示例中，在 Twig 中访问 `myVariable` 或 `this.myMethod()` 将按以下顺序检查存在性：

1. 部件
1. 页面
1. 布局

### 优先布局

布局可以在其设置中指定 `is_priority` 属性以激活优先模式。在正常情况下，布局内容在页面内容之后渲染。这允许页面操作布局属性，如标题或元描述。从视觉上看，顺序如下。

```text
Layout (3) ← Page (1) → Partials (2)
```

在优先模式下，布局使用更自然的加载顺序，其中 `{% page %}` 标签与布局内容内联渲染。但是，在使用此模式时不支持占位符。优先布局的加载顺序更像这样。

```text
Layout (1) → Page (2) → Partials (3)
```

这在[构建 API 端点](../resources/building-apis.md)时特别有用。在以下示例中，由于从未调用 page 标签，页面逻辑将不会运行。

::: cmstemplate
```ini
description = "API Layout"
is_priority = 1
```
```twig
{% if false %}
    {% page %}
{% endif %}
```
:::

#### 另请参阅

::: also
* [Page Twig 标签](../../markup/tag/page.md)
:::
