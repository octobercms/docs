# |raw

October CMS 中的输出变量会自动转义，`|raw` 过滤器将值标记为"safe"，如果 `raw` 是最后应用的过滤器，则不会转义。

```twig
{# 这个变量不会被转义 #}
{{ variable|raw }}
```

在表达式中使用 `raw` 过滤器时要注意：

```twig
{% set hello = '<strong>Hello</strong>' %}
{% set hola = '<strong>Hola</strong>' %}

{{ false ? '<strong>Hola</strong>' : hello|raw }}

{# 上面的渲染不会和下面一样 #}
{{ false ? hola : hello|raw }}

{# 但呈现与下面相同 #}
{{ (false ? hola : hello)|raw }}
```
