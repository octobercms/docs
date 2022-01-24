# {% partial %}

`{% partial %}` 标签将解析 [CMS部件](../cms/partials.md) 并在页面上呈现部件内容。要显示一个名为 **footer.htm** 的部件，只需在 `partial` 标记后传递名称作为字符串引用。

```twig
{% partial "footer" %}
```

子目录中的部件可以以相同的方式呈现。

```twig
{% partial "sidebar/menu" %}
```

> **注意**:  [主题文档](../cms/themes.md#subdirectories) 有更多关于子目录使用的详细信息。

部件名称也可以是变量：

```twig
{% set tabName = "profile" %}
{% partial tabName %}
```

## 变量

在部件内部，变量可以像任何其他标记变量一样被访问：

```twig
{% partial "blog-posts" posts=posts %}
```

您还可以分配新变量以在部件中使用：

```twig
{% partial "location" city="温哥华" country="加拿大" %}
```

在部件内部，变量可以像任何其他标记变量一样被访问：

```twig
<p>Country: {{ country }}, city: {{ city }}.</p>
```

## 将标记作为变量传递

可以使用 `body` 属性将标记传递给部件。

```twig
{% partial "card" body %}
    这是卡片内容
{% endpartial %}
```

然后内容可作为 `body` 变量使用。

```twig
{{ body|raw }}
```

## 检查部件是否存在

在任何模板中，您都可以使用 `partial()` 函数检查是否存在部件内容。这使您可以根据部件是否存在来生成不同的标记。例子：

```twig
{% set cardPartial = 'my-cards/' ~ cardCode %}

{% if partial(cardPartial) %}
    {% partial cardPartial %}
{% else %}
    <p>卡片不存在!</p>
{% endif %}
```
