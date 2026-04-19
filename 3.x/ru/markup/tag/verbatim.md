---
subtitle: Twig-тег
---
# {% verbatim %}

Тег `{% verbatim %}` помечает целые секции как необработанный текст, который не должен парситься.

```twig
{% verbatim %}<p>Hello, {{ name }}</p>{% endverbatim %}
```

Приведённый выше код отобразится в браузере точно как:

```twig
<p>Hello, {{ name }}</p>
```

Например, AngularJS использует тот же синтаксис шаблонизации, поэтому вы можете решить, какие переменные использовать для каждого из них.

```twig
<p>Hello {{ name }}, this is parsed by Twig</p>

{% verbatim %}
    <p>Hello {{ name }}, this is parsed by AngularJS</p>
{% endverbatim %}
```
