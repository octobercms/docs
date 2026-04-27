---
subtitle: Twig 标签
---
# {% content %}

`{% content %}` 标签将在页面上显示一个 [CMS 内容块](../../cms/themes/content.md)。要显示名为 **contacts.htm** 的内容块，在 `content` 标签后以引号字符串的形式传递文件名即可。

```twig
{% content "contacts.htm" %}
```

子目录中的内容块也可以用同样的方式渲染。

```twig
{% content "sidebar/content.htm" %}
```

::: tip
[主题文档](../../cms/themes/themes.md)有更多关于子目录用法的详细信息。
:::

内容块可以渲染为纯文本：

```twig
{% content "readme.txt" %}
```

你也可以使用 Markdown 语法：

```twig
{% content "changelog.md" %}
```

内容块还可以与[布局占位符](../../cms/themes/layouts.md)结合使用。

```twig
{% put sidebar %}
    {% content 'sidebar-content.htm' %}
{% endput %}
```

## 变量

你可以在文件名后指定变量来向内容块传递变量：

```twig
{% content "welcome.htm" name=user.name %}
```

你也可以为内容分配新的变量：

```twig
{% content "location.htm" city="Vancouver" country="Canada" %}
```

在内容内部，可以使用单*花括号*的基本语法访问变量：

```
<p>Country: {country}, city: {city}.</p>
```

你也可以将变量集合作为简单数组传递：

```twig
{% content "welcome.htm" likes=[
    {name:'Dogs'},
    {name:'Fishing'},
    {name:'Golf'}
] %}
```

变量集合通过使用一对开闭括号来访问：

```
<ul>
    {likes}
        <li>{name}</li>
    {/likes}
</ul>
```

> **注意**：内容块不支持 Twig 语法，请考虑使用 [CMS 部件](../cms/partials.md)代替。

## 将内容设置为 Twig 变量

在任何模板中，你可以使用 `content()` 函数将内容设置为变量。这允许你在显示之前操作输出。记得使用 `|raw` 过滤器来防止输出转义。

```twig
{% set welcomeContent = content('welcome.htm') %}

{{ welcomeContent|raw }}
```

你也可以将变量作为第二个参数传递给内容。

```twig
{% set welcomeContent = content('welcome.htm', { foo: 'bar' }) %}
```

## 检查内容文件是否存在

`hasContent()` 函数可用于检查内容是否存在而不渲染内容。要阻止内容的渲染，将第二个参数设置为 false，如果找到内容文件则返回 true，否则返回 false。

```twig
{% if hasContent('welcome.htm') %}
    {% content 'welcome.htm' %}
{% else %}
    <p>Welcome content not found!</p>
{% endif %}
```

## 将内容解析为字符串

使用 `{% content %}` 标签时，它会自动解析 [CMS 代码片段](../../cms/themes/snippets.md)和[页面查找器表单小部件](../../element/form/widget-pagefinder.md)创建的链接。

类似地，`|content` 过滤器可用于解析 HTML 字符串中的多个内容对象并在输出中解析它们。

```twig
{{ post.content|content }}
```

`|md` 过滤器也可用于解析字符串中的 Markdown 内容。

```twig
{{ post.markdown_content|md|content }}
```

#### 参见

::: also
* [CMS 代码片段](../../cms/themes/snippets.md)
* [Link Twig 过滤器](../../markup/filter/link.md)
* [Markdown Twig 过滤器](../../markup/filter/md.md)
:::
