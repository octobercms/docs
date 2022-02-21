# {% verbatim %}

`{% verbatim %}` 将HTML代码原样输出。

```twig
{% verbatim %}<p>你好, {{ name }}</p>{% endverbatim %}
```

以上将在浏览器中完全呈现：

```twig
<p>你好, {{ name }}</p>
```

例如，AngularJS 使用相同的模板语法，因此您可以决定为每个变量使用哪些变量。

```twig
<p>你好 {{ name }}, 这是由 Twig 解析的</p>

{% verbatim %}
    <p>你好 {{ name }}, 这是由 AngularJS 解析的</p>
{% endverbatim %}
```
