# 布局

布局为您的页面定义了一个公用的框架，这通常意味着在每个页面上重复的所有内容，例如页眉和页脚。几乎所有页面都包含的 HTML 代码，例如 HEAD、TITLE 和 BODY 标签。

布局模板文件位于主题的 **layouts** 目录中。布局模板文件应具有 **htm** 扩展名。在布局文件中，您应该使用 `{% page %}` 标签来输出页面内容。接下来是最简单的布局示例。

```twig
<html>
    <body>
        {% page %}
    </body>
</html>
```

要为 [页面](pages.md) 使用布局，该页面应引用 [Configuration](themes.md#configuration-section) 部分中的布局文件名(不带扩展名)。请记住，如果您从 [子目录](themes.md#subdirectories) 引用布局，则应指定子目录名称。使用 default.htm 布局的示例页面模板：

```
url = "/"
layout = "default"
==
<p>Hello, world!</p>
```

当这个页面被请求时，它的内容与布局合并，或者更准确地说 - 布局的 `{% page %}` 标签被页面内容替换。前面的示例将生成以下标记：

```html
<html>
    <body>
        <p>Hello, world!</p>
    </body>
</html>
```

请注意，您可以在布局中渲染 [部件](partials.md)。这使您可以在不同布局之间共享公共标记元素。例如，您可以有一个部件输出网站 CSS 和 JavaScript 链接。这种方法简化了资源管理 - 如果您想添加 JavaScript 引用，您应该修改单个部件而不是编辑所有布局。

[Configuration](themes.md#configuration-section) 部件对于布局是可选的。支持的配置参数是 **name** 和 **description**。这些参数是可选的，用于后端用户界面。带有描述的示例布局模板：

```twig
description = "基本布局示例"
==
<html>
    <body>
        {% page %}
    </body>
</html>
```

## 使用动态页面标题

[页面](pages.md) 的 `meta_title` 和 `meta_description` 属性支持从页面生命周期解析变量。以下布局模板将根据活动页面的值设置页面标题。

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

然后页面模板可以使用类似于 Twig 的变量语法使用全局环境中可用的值定义其标题，在这种情况下使用 **post.title** 值。

```ini
url = "/blog"
meta_title = "{{ post.title }} - Blog"
```

> **注意**：仅支持基本的 Twig 变量。不能使用过滤器、标签和函数。

## 占位符

占位符允许页面向布局注入内容。占位符在布局模板中使用 `{% placeholder %}` 标签定义。下一个示例显示了一个布局模板，其中在 HTML HEAD 中定义了一个占位符 **head**。

```twig
<html>
    <head>
        {% placeholder head %}
    </head>
    ...
```

页面可以使用 `{% put %}` 和 `{% endput %}` 标签向占位符注入内容。以下示例演示了一个简单的页面模板，该模板将 CSS 链接注入到上一个示例中定义的占位符 **head**。

```
url = "/my-page"
layout = "default"
==
{% put head %}
    <link href="/themes/demo/assets/css/page.css" rel="stylesheet">
{% endput %}

<p>页面内容在这里</p>
```

关于占位符的更多信息可以在 [标记指南](../markup/tag-placeholder.md) 中找到。

## 动态布局

布局，就像页面一样，可以使用任何 Twig 功能。详情请参考[动态页面](pages.md#dynamic-pages) 文档。

### 布局执行生命周期

在布局的 [PHP 部分](themes.md#php-section) 中，您可以定义以下用于处理页面执行生命周期的函数：`onInit`、`onStart`、`onBeforePageStart` 和 `onEnd`。

`onInit` 函数在所有组件初始化时和 AJAX 请求被处理之前执行。 `onStart` 函数在页面处理开始时执行。 `onBeforePageStart` 函数在布局 [组件](components.md) 运行之后执行，但在页面的 `onStart` 函数执行之前。 `onEnd` 函数在页面呈现后执行。处理程序的执行顺序如下：

1.布局`onInit()`函数。
1.页面`onInit()`函数。
1.布局`onStart()`函数。
1.布局组件`onRun()`方法。
1.布局`onBeforePageStart()`函数。
1.页面`onStart()`函数。
1.页面组件`onRun()`方法。
1.页面`onEnd()`函数。
1.布局`onEnd()`函数。