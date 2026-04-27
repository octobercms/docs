---
subtitle: Twig-фильтр
---
# |trans

Фильтры `|trans` и `|trans_choice` переводят переданное значение, используя конфигурацию локализации приложения. Строки локализации могут быть загружены путём передачи перевода по умолчанию вашей строки.

```twig
{{ 'I love programming.'|trans }};
```

Замена параметров в строках перевода возможна путём передачи массива в качестве первого аргумента. Каждый параметр имеет префикс `:`.

```twig
{{ ':name loves programming.'|trans({ name: 'Jeff' }) }}
```

## Плюрализация

Функция `trans_choice` используется для обработки значений во множественном числе.

```twig
{{ 'There is one apple|There are many apples'|trans_choice(3) }}
```

Второй аргумент может содержать параметры.

```twig
{{ '{1} :value minute ago|[2,*] :value minutes ago'|trans_choice(5, { value: 5 }) }}
```

## Сокращённый синтаксис

Фильтры `_` и `__` взаимозаменяемы с фильтрами `trans` и `trans_choice`.

```twig
{{ 'I love programming.'|_ }}

{{ '{1} :value minute ago|[2,*] :value minutes ago'|__(1, { value: 1 }) }}
```

#### См. также

::: also
* [Локализация тем CMS](../../cms/themes/settings.md)
* [Локализация Laravel](https://laravel.com/docs/10.x/localization)
:::
