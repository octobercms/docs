---
subtitle: Twig 属性
---
# this.request

允许访问当前请求对象，包括请求方法。

## this.request.method

您可以通过 `this.request.method` 访问当前请求方法对象，它返回大写的 HTTP 动词。

```twig
{% if this.request.method == 'GET' %}
    <!-- Do GET Logic -->
{% elseif this.request.method == 'POST' %}
    <!-- Do POST Logic -->
{% endif %}
```

## this.request.ajax

要检查当前请求是否使用了 AJAX 头，请访问 `this.request.ajax` 属性。

```twig
{% if this.request.ajax %}
    Request was submitted via AJAX
{% endif %}
```

## this.request.pjax

要检查当前请求是否通过 [Turbo Router](../../cms/ajax/turbo-router.md) 发出，请访问 `this.request.pjax` 属性。

```twig
{% if this.request.pjax %}
    Page was loaded via PJAX
{% endif %}
```

## this.request.pjaxCached

使用 `this.request.pjaxCached` 属性还可以检查 [Turbo Router](../../cms/ajax/turbo-router.md) 请求之前是否有缓存快照。

```twig
{% if this.request.pjaxCached %}
    Page was loaded via PJAX with a snapshot
{% endif %}
```
