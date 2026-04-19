---
subtitle: Twig 标签
---
# {% verbatim %}

`{% verbatim %}` 标签将整个区域标记为不应被解析的原始文本。

```twig
{% verbatim %}<p>Hello, {{ name }}</p>{% endverbatim %}
```

上面的代码将在浏览器中完全按照以下方式渲染：

```twig
<p>Hello, {{ name }}</p>
```

例如，AngularJS 使用相同的模板语法，因此你可以决定为每个框架使用哪些变量。

```twig
<p>Hello {{ name }}, this is parsed by Twig</p>

{% verbatim %}
    <p>Hello {{ name }}, this is parsed by AngularJS</p>
{% endverbatim %}
```
