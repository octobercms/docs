---
subtitle: Twig 标签
---
# {% partial %}

`{% partial %}` 标签将解析一个 [CMS 部件](../../cms/themes/partials.md)并在页面上渲染部件内容。要显示一个名为 **footer.htm** 的部件，只需在 `partial` 标签后以引号字符串的形式传递名称即可。

```twig
{% partial "footer" %}
```

子目录中的部件也可以用同样的方式渲染。

```twig
{% partial "sidebar/menu" %}
```

::: tip
[主题文档](../../cms/themes/themes.md)有更多关于子目录用法的详细信息。
:::

部件名称也可以是一个变量：

```twig
{% set tabName = "profile" %}
{% partial tabName %}
```

## 变量

你可以在部件名称后指定变量来向部件传递变量：

```twig
{% partial "blog-posts" posts=posts %}
```

你也可以为部件分配新的变量：

```twig
{% partial "location" city="Vancouver" country="Canada" %}
```

在部件内部，变量可以像任何其他标记变量一样被访问：

```twig
<p>Country: {{ country }}, city: {{ city }}.</p>
```

## 将标记作为变量传递

可以使用 `body` 属性将标记传递给部件。

```twig
{% partial "card" body %}
    This is the card contents
{% endpartial %}
```

然后内容可以作为 `body` 变量使用。

```twig
{{ body|raw }}
```

### 可组合部件

可组合部件可以与 `{% placeholder %}` [Twig 标签](./placeholder.md)结合使用来实现。以下部件定义了一个 `header` 和一个 `body` 区域，可以在其中添加 HTML 内容。

```twig
<div class="header">
    {% placeholder header %}
</div>
<div class="body">
    {{ body|raw }}
</div>
```

接下来，你可以在 `body` 内包含 `{% put %}` 标签，通过两个 HTML 内容区域来组合部件结果。

```twig
{% partial "card" body %}
    {% put header %}
        <h2>This is the card header</h2>
    {% endput %}
    <p>This is the card contents</p>
{% endpartial %}
```

## 将部件内容设置为 Twig 变量

在任何模板中，你可以使用 `partial()` 函数将部件内容设置为变量。这允许你在显示之前操作输出。记得使用 `|raw` 过滤器来防止输出转义。

```twig
{% set cardPartial = partial('my-cards/card') %}

{{ cardPartial|raw }}
```

你也可以将变量作为第二个参数传递给部件。

```twig
{% set cardPartial = partial('my-cards/card', { foo: 'bar' }) %}
```

## 检查部件是否存在

`hasPartial()` 函数可用于在不渲染内容的情况下检查部件是否存在，如果找到部件则返回 true，否则返回 false。

```twig
{% if hasPartial('my-cards/card') %}
    {% partial 'my-cards/card' %}
{% else %}
    <p>Card not found!</p>
{% endif %}
```
