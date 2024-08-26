---
subtitle: Twig Property
---
# this.request

Allows access to the current request object, including request method.

## this.request.method

You can access the current request method object via `this.request.method` and it returns the HTTP verb in uppercase.

```twig
{% if this.request.method == 'GET' %}
    <!-- Do GET Logic -->
{% elseif this.request.method == 'POST' %}
    <!-- Do POST Logic -->
{% endif %}
```

## this.request.ajax

To check if the current request uses the AJAX header, access the `this.request.ajax` property.

```twig
{% if this.request.ajax %}
    Request was submitted via AJAX
{% endif %}
```

## this.request.pjax

To check if the current request was made using the [Turbo Router](../../cms/ajax/turbo-router.md), access the `this.request.pjax` property.

```twig
{% if this.request.pjax %}
    Page was loaded via PJAX
{% endif %}
```

## this.request.pjaxCached

Use the `this.request.pjaxCached` property to also check if the [Turbo Router](../../cms/ajax/turbo-router.md) request had a cached snapshot coming before it.

```twig
{% if this.request.pjaxCached %}
    Page was loaded via PJAX with a snapshot
{% endif %}
```
