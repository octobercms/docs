---
subtitle: Twig-свойство
---
# this.param

Вы можете получить доступ к текущим параметрам URL через `this.param`, который возвращает PHP-массив.

## Доступ к параметрам страницы

Этот пример демонстрирует, как получить доступ к параметру URL `tab` на странице.

::: cmstemplate
```ini
url = "/account/:tab"
```
```twig
{% if this.param.tab == 'details' %}

    <p>Here are all your details</p>

{% elseif this.param.tab == 'history' %}

    <p>You are viewing a blast from the past</p>

{% endif %}
```
:::

Если имя параметра также является переменной, можно использовать синтаксис массива.

::: cmstemplate
```ini
url = "/account/:post_id"
```
```twig
{% set name = 'post_id' %}

<p>The post ID is: {{ this.param[name] }}</p>
```
:::
