---
subtitle: Learn how to build a simple API using CMS Pages.
---
# Building API Resources

::: aside
View the [routing article](../../extend/system/routing.md) if you prefer to define API routes using PHP instead.
:::

When working with client-side frameworks such as Vue.js or React, it will be necessary to consume server-side APIs. These can be defined using your theme where each page represents an API endpoint.

The page represents a transformation layer that sits between your CMS Components and the JSON responses that are returned to your application. Most objects, such as models and collections, support JSON serialization and can be returned directly as a response.

## Sending a Response

In the simplest form, an API resource can be composed by returning a Twig variable using the `response()` [Twig function](../../markup/function/response.md). This function overrides the page contents and returns a custom response to the browser.

```twig
url = "/api/foobar
==
{% do response({ foo: 'bar' }) %}
```

The above call will return a response with a `application/json` content type.

```json
{ "foo": "bar" }
```

In most cases you will be converting component variables to a response.

```twig
{% do response({
    id: post.id,
    title: post.title,
    email: post.author.email,
    created_at: post.created_at,
    updated_at: post.updated_at
}) %}
```

## Conditions

All Twig conditions can be used in the markup to affect the response and the last response call is the one that will be sent to the browser.

### Checking the HTTP Method

Use the `this.method` [Twig property](../../markup/property/this-method.md) to check the request method.

```twig
{% if this.method == 'GET' %}
    <!-- Do GET Logic -->
{% else %}
    <!-- Method Unsupported -->
{% endif %}
```

### Aborting the Request

The `abort()` [Twig function](../../markup/function/abort.md) can be used to abort the request with a 404 response.

```twig
{% if post %}
    {% do response(post) %}
{% else %}
    {% do abort(404) %}
{% endif %}
```

## Working with Pages and Layouts

Since the API is defined in the Markup section of the page or layout, all components and life-cycle events are available.

### Calling AJAX Handlers

In some cases you may wish to call an AJAX handler of a component or inside the page. This is possible using the `ajaxHandler()` [Twig function](../../markup/function/ajax-handler.md).

```twig
url = "/api/signin

[account]
==
{% set result = ajaxHandler('onSignin') %}

{% if result.error %}
    {% abort('Login Failed', 401) %}
{% else %}
    {% do response({ success: true }) %}
{% endif %}
```

You may also call a handler and pass it directly as a response. The response includes variables set on the page and array values returned by the function.

```twig
{% do response(ajaxHandler('onSubmitPost')) %}
```

It will also handle redirects automatically. See the [Twig function article](../../markup/function/ajax-handler.md) for more details.

### Using Layouts as Middleware

Middleware allows you to apply common logic to multiple endpoints, such as checking authentication or throttling requests. A [CMS layout](../themes/layouts.md) can be used to apply logic to multiple pages and the layout logic executes before the page logic. Remember to include the `{% page %}` [Twig tag](../../markup/tag/page.md) so the page logic is included.

For example, a layout named **api.htm** can have any conditional logic.

```twig
description = "API Authentication"
==
{% if someCondition %}
    {% page %}
{% else %}
    {% do abort(400, 'Condition not met') %}
{% endif %}
```

Every page that uses the layout will have the conditions of the layout applied.

```twig
layout = "api"
==
{% do response({ success: true }) %}
```

## Working with Resources

When working with models and collections, it is recommended to return data wrapped in the **data** attribute. Wrapping the response provides a consistent interface.

### Models & Collections

Returning a model resource.

```twig
url = "/api/blog/post/:slug"

[section post]
handle = "Blog\Post"
entrySlug = "{{ :slug }}"
==
{% if post %}
    {% do response({
        data: post
    }) %}
{% else %}
    {% do abort(404) %}
{% endif %}
```

Returning a collection resource.

```twig
url = "/api/blog/posts"

[collection posts]
handle = "Blog\Post"
==
{% do response({
    data: posts
}) %}
```

### Building a Custom Collection

Use the `collect()`[Twig function](../../markup/function/collect.md) to process a collection for a response. The `push` method is used to push items on to the collection and it can be used to customize each result.

```twig
{% set result = collect() %}

{% for post in posts %}
    {% do result.push({
        id: post.id,
        title: post.title,
        email: post.author.email,
        created_at: post.created_at,
        updated_at: post.updated_at
    }) %}
{% endfor %}

{% do response({
    data: result
}) %}
```

### Pagination

When responding with a paginated collection, it is recommended to use the `pager()` [Twig function](../../markup/function/pager.md) to construct the response using the **links** and **meta** attributes.

```twig
{% set posts = blog.paginate(3) %}

{% set pager = pager(posts) %}

{% do response({
    data: posts,
    links: pager.links,
    meta: pager.meta
}) %}
```

The above will output the following JSON format.

```json
{
    "data": {},
    "links": {
        "first": "https://yoursite.tld/api/blog/posts?page=1",
        "last": "https://yoursite.tld/api/blog/posts?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "path": "https://yoursite.tld/api/blog/posts",
        "per_page": 3,
        "total": 2,
        "current_page": 1,
        "last_page": 1,
        "from": 1,
        "to": 2
    }
}
```

#### See Also

::: also
* [Response Twig Function](../../markup/function/response.md)
* [AJAX Handler Twig Function](../../markup/function/ajax-handler.md)
:::
