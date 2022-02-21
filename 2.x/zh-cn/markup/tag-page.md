# {% page %}

{% page %}` 标签将 [页面](../cms/pages.md) 的内容呈现到布局模板中。

有关基本示例，请参阅 [布局](../cms/layouts.md).

`{% page %}` 标签解析来自页面模板的原始标记。 页面模板可以将内容注入占位符以及定义原始标记。

```
description="示例布局"
==
<html>
    <head>
        {% placeholder head %}
    </head>
    <body>
        {% page %}
        ...
```

将内容放在"head"占位符中。

```
description="示例页面"
==
{% put head %}
    <meta name="foo" content="bar">
{% endput %}

<p>我的内容.</p>
```

使用模板呈现的页面将导致：

```html
<html>
    <head>
        <meta name="foo" content="bar">
    </head>
    <body>
        <p>我的内容.</p>
        ...
```
