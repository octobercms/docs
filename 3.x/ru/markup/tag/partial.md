---
subtitle: Twig-тег
---
# {% partial %}

Тег `{% partial %}` парсит [CMS-фрагмент](../../cms/themes/partials.md) и рендерит его содержимое на странице. Чтобы отобразить фрагмент с именем **footer.htm**, просто передайте имя после тега `partial` в кавычках как строку.

```twig
{% partial "footer" %}
```

Фрагмент в поддиректории рендерится аналогичным образом.

```twig
{% partial "sidebar/menu" %}
```

::: tip
[Документация по темам](../../cms/themes/themes.md) содержит подробности об использовании поддиректорий.
:::

Имя фрагмента также может быть переменной:

```twig
{% set tabName = "profile" %}
{% partial tabName %}
```

## Переменные

Вы можете передавать переменные во фрагменты, указав их после имени фрагмента:

```twig
{% partial "blog-posts" posts=posts %}
```

Вы также можете назначать новые переменные для использования во фрагменте:

```twig
{% partial "location" city="Vancouver" country="Canada" %}
```

Внутри фрагмента к переменным можно обращаться как к любой другой переменной разметки:

```twig
<p>Country: {{ country }}, city: {{ city }}.</p>
```

## Передача разметки как переменной

Можно передать разметку во фрагмент с помощью атрибута `body`.

```twig
{% partial "card" body %}
    This is the card contents
{% endpartial %}
```

Содержимое затем доступно как переменная `body`.

```twig
{{ body|raw }}
```

### Составные фрагменты

Составные фрагменты возможны в сочетании с [Twig-тегом](./placeholder.md) `{% placeholder %}`. Следующий фрагмент определяет секции `header` и `body`, куда можно добавлять HTML-контент.

```twig
<div class="header">
    {% placeholder header %}
</div>
<div class="body">
    {{ body|raw }}
</div>
```

Далее вы можете включить тег `{% put %}` внутри `body`, чтобы составить результат фрагмента с двумя секциями HTML-контента.

```twig
{% partial "card" body %}
    {% put header %}
        <h2>This is the card header</h2>
    {% endput %}
    <p>This is the card contents</p>
{% endpartial %}
```

## Сохранение содержимого фрагмента в Twig-переменную

В любом шаблоне вы можете сохранить содержимое фрагмента в переменную с помощью функции `partial()`. Это позволяет манипулировать выводом перед отображением. Не забудьте использовать фильтр `|raw`, чтобы предотвратить экранирование вывода.

```twig
{% set cardPartial = partial('my-cards/card') %}

{{ cardPartial|raw }}
```

Вы также можете передать переменные во фрагмент как второй аргумент.

```twig
{% set cardPartial = partial('my-cards/card', { foo: 'bar' }) %}
```

## Проверка существования фрагмента

Функция `hasPartial()` может использоваться для проверки существования фрагмента без рендеринга содержимого — она вернёт true или false в зависимости от того, найден ли фрагмент.

```twig
{% if hasPartial('my-cards/card') %}
    {% partial 'my-cards/card' %}
{% else %}
    <p>Card not found!</p>
{% endif %}
```
