---
subtitle: Twig 标签
---
# {% page %}

`{% page %}` 标签将[页面](../../cms/themes/pages.md)的内容渲染到布局模板中。参见[布局](../../cms/themes/layouts.md)了解基本示例。

`{% page %}` 标签解析页面模板中的原始标记。页面模板可以将内容注入到占位符中，也可以定义原始标记。

::: cmstemplate
```ini
description="example layout"
```
```twig
<html>
    <head>
        {% placeholder head %}
    </head>
    <body>
        {% page %}
        ...
```
:::

将内容放入 `head` 占位符中。

::: cmstemplate
```ini
description="example page"
```
```twig
{% put head %}
    <meta name="foo" content="bar">
{% endput %}

<p>My content.</p>
```
:::

使用该模板渲染的页面将产生以下结果：

```html
<html>
    <head>
        <meta name="foo" content="bar">
    </head>
    <body>
        <p>My content.</p>
        ...
```
