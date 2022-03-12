# {% content %}

`{% content %}` 标签将在页面上显示 [CMS 内容块](../cms/content.md) 要显示名为 **contacts.htm** 的内容块，您需要在 `content` 标记后传递文件名作为字符串引用。

```twig
{% content "contacts.htm" %}
```

子目录中的内容块可以以相同的方式呈现

```twig
{% content "sidebar/content.htm" %}
```

> **注意**:  [主题文档](../cms/themes.md#oc-subdirectories) 有更多关于子目录使用的详细信息。

内容块可以呈现为纯文本：

```twig
{% content "readme.txt" %}
```

您还可以使用 Markdown 语法：

```twig
{% content "changelog.md" %}
```

内容块也可以与 [布局占位符](../cms/layouts.md#oc-placeholders) 结合使用：

```twig
{% put sidebar %}
    {% content 'sidebar-content.htm' %}
{% endput %}
```

## 变量

您可以通过在文件名之后指定变量来将变量传递给内容块：

```twig
{% content "welcome.htm" name=user.name %}
```

您还可以分配新变量以在内容中使用：

```twig
{% content "location.htm" city="Vancouver" country="Canada" %}
```

在内容内部，可以使用单数*花括号*的基本语法访问变量：

```
<p>国家: {country}, 城市: {city}.</p>
```

您还可以将变量集合作为简单数组传递：

```twig
{% content "welcome.htm" likes=[
    {name:'Dogs'},
    {name:'Fishing'},
    {name:'Golf'}
] %}
```

变量的集合是通过使用{}来访问的：

```
<ul>
    {likes}
        <li>{name}</li>
    {/likes}
</ul>
```

> **注意**: 内容块不支持 Twig 语法，请考虑改用 [CMS部件](../cms/partials.md) 代替

## 将内容设置为 Twig 变量

在任何模板中，您都可以使用 `content()` 函数将内容设置为变量。 这使您可以在显示之前操作输出。 请记住使用 `|raw` 过滤器来防止输出转义。

```twig
{% set welcomeContent = content('welcome.htm') %}

{{ welcomeContent|raw }}
```

您也可以将变量作为第二个参数传递给内容。

```twig
{% set welcomeContent = content('welcome.htm', { foo: 'bar' }) %}
```

## 检查内容文件是否存在

`hasContent()` 函数可用于在不渲染内容的情况下检查内容是否存在。 为了防止内容的呈现，将第二个参数作为 false 传递，如果找到内容文件，它将返回 true 或 false。

```twig
{% if hasContent('welcome.htm') %}
    {% content 'welcome.htm' %}
{% else %}
    <p>未找到欢迎内容！</p>
{% endif %}
```
