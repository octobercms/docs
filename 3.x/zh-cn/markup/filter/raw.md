---
subtitle: Twig 过滤器
---
# |raw

October CMS 中的输出变量会自动转义，`|raw` 过滤器将值标记为"安全的"，如果 `raw` 是最后应用的过滤器，则该值不会被转义。

```twig
{# This variable won't be escaped #}
{{ variable|raw }}
```

在表达式中使用 `raw` 过滤器时要小心：

```twig
{% set hello = '<strong>Hello</strong>' %}
{% set hola = '<strong>Hola</strong>' %}

{{ false ? '<strong>Hola</strong>' : hello|raw }}

{# The above will not render the same as #}
{{ false ? hola : hello|raw }}

{# But renders the same as #}
{{ (false ? hola : hello)|raw }}
```
