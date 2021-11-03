# |raw

Выходные переменные в OctoberCMS автоматически экранируются. Фильтр `| raw` отмечает переменную как "безопасную" и отображает ее "как есть", если `raw` является последним примененным фильтром.

```twig
{# This variable won't be escaped #}
{{ variable|raw }}
```

Соблюдайте осторожность при использовании фильтра `raw` внутри выражений:

```twig
{% set hello = '<strong>Hello</strong>' %}
{% set hola = '<strong>Hola</strong>' %}

{{ false ? '<strong>Hola</strong>' : hello|raw }}

{# The above will not render the same as #}
{{ false ? hola : hello|raw }}

{# But renders the same as #}
{{ (false ? hola : hello)|raw }}
```
