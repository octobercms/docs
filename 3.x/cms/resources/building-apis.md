---
subtitle: Defining API routes using CMS Pages.
---
# Building Theme-based APIs

::: aside
View the [routing article](../../extend/system/routing.md) if you prefer to define routes using PHP instead.
:::

When working with client-side frameworks such as Vue.js or React, it will be necessary to consume server-side APIs. These can be defined using your theme where each page represents an API endpoint.

## Basic Definition

In the simplest form, an API resource can be composed by returning a Twig variable using the `response()` [Twig function](../../markup/function/response.md). This function overrides the page contents and returns a custom response to the browser.

```twig
url = "/api/blog/posts"

[collection posts]
handle = "Blog\Post"
==
{% do response(posts) %}
```

## Checking the HTTP method

Use the `this.method` property to check the request method.

```twig
{% if this.method == 'GET' %}
    <!-- Do GET Logic -->
{% else this.method == 'POST' %}
    <!-- Do POST Logic -->
{% endif %}
```

## Aborting the Request

The `abort()` function can be used to abort the request with a 404 response.

```twig
url = "/api/blog/post/:slug"

[section post]
handle = "Blog\Post"
entrySlug = "{{ :slug }}"
==
{% if post %}
    {% do response(post) %}
{% else %}
    {% do abort(404) %}
{% endif %}
```

## Calling AJAX Handlers

In some cases you may wish to call an AJAX handler of a component or inside the page. This is possible using the `ajaxHandler()` [Twig function](../../markup/function/ajax-handler.md).

```twig
url = "/api/blog/post
==
{% set result = ajaxHandler('onSubmitPost') %}
{% if not result.error %}
    {% do response({ success: true }) %}
{% endif %}
```

The result of calling the handler can be returned directly to the browser.

```twig
{% do response(ajaxHandler('onSubmitPost')) %}
```
