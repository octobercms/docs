---
subtitle: Twig-фильтр
---
# |raw

Выходные переменные в October CMS автоматически экранируются. Фильтр `|raw` помечает значение как «безопасное», и оно не будет экранировано, если `raw` является последним применённым фильтром.

```twig
{# This variable won't be escaped #}
{{ variable|raw }}
```

Будьте осторожны при использовании фильтра `raw` внутри выражений:

```twig
{% set hello = '<strong>Hello</strong>' %}
{% set hola = '<strong>Hola</strong>' %}

{{ false ? '<strong>Hola</strong>' : hello|raw }}

{# The above will not render the same as #}
{{ false ? hola : hello|raw }}

{# But renders the same as #}
{{ (false ? hola : hello)|raw }}
```
