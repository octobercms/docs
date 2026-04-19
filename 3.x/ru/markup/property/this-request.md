---
subtitle: Twig-свойство
---
# this.request

Позволяет получить доступ к текущему объекту запроса, включая метод запроса.

## this.request.method

Вы можете получить доступ к текущему методу запроса через `this.request.method`, который возвращает HTTP-глагол в верхнем регистре.

```twig
{% if this.request.method == 'GET' %}
    <!-- Do GET Logic -->
{% elseif this.request.method == 'POST' %}
    <!-- Do POST Logic -->
{% endif %}
```

## this.request.ajax

Чтобы проверить, использует ли текущий запрос AJAX-заголовок, обратитесь к свойству `this.request.ajax`.

```twig
{% if this.request.ajax %}
    Request was submitted via AJAX
{% endif %}
```

## this.request.pjax

Чтобы проверить, был ли текущий запрос выполнен с использованием [Turbo Router](../../cms/ajax/turbo-router.md), обратитесь к свойству `this.request.pjax`.

```twig
{% if this.request.pjax %}
    Page was loaded via PJAX
{% endif %}
```

## this.request.pjaxCached

Используйте свойство `this.request.pjaxCached`, чтобы также проверить, имел ли запрос [Turbo Router](../../cms/ajax/turbo-router.md) кэшированный снимок перед ним.

```twig
{% if this.request.pjaxCached %}
    Page was loaded via PJAX with a snapshot
{% endif %}
```
