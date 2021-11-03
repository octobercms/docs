# this.param

Используйте переменную `this.param`, чтобы получить массив с URL-параметрами.

## Доступ к параметрам страницы

Пример:

```
url = "/account/:tab"
==

{% if this.param.tab == 'details' %}

    <p>Here are all your details</p>

{% elseif this.param.tab == 'history' %}

    <p>You are viewing a blast from the past</p>

{% endif %}
```

Другой пример:

```
url = "/account/:post_id"
==
{% set name = 'post_id' %}

<p>The post ID is: {{ this.param[name] }}</p>
```
