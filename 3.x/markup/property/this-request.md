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
{% else this.request.method == 'POST' %}
    <!-- Do POST Logic -->
{% endif %}
```

## this.ajax

To check if the current request uses the AJAX header, access the `this.request.ajax` property.

```twig
{% if this.request.ajax %}
    Request was submitted via AJAX
{% endif %}
```

## this.turbo

To check if the current request was made using the [Turbo Router](../../cms/ajax/turbo-router.md), access the `this.request.pjax` property.

```twig
{% if this.request.pjax %}
    Request was submitted via PJAX
{% endif %}
```
