---
subtitle: Learn how to build a simple API using CMS Pages.
---
# Building API Resources

::: aside
View the [routing article](../../extend/system/routing.md) if you prefer to define API routes using PHP instead.
:::

When working with client-side frameworks such as Vue.js or React, it will be necessary to consume server-side APIs. These can be defined using your theme where each page represents an API endpoint.

The page represents a transformation layer that sits between your CMS Components and the JSON responses that are actually returned to your application's users. Most objects, such as models and collections, support JSON serialization and can be returned directly as a response.

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

```twig
description = "API Authentication"

[session]
security = "user"
redirect = "api/unauthenticated"
==
{% page %}
```

## Working with Resources

The companion `resource()` [Twig function](../../markup/function/response.md) can be used for dealing with models and collections. All data returned will be wrapped in the **data** attribute automatically or if placed there explicitly. Wrapping the response provides a consistent interface and pipes through the resource resolver.

### Models & Collections

Returning a model resource.

```twig
url = "/api/blog/post/:slug"

[section post]
handle = "Blog\Post"
entrySlug = "{{ :slug }}"
==
{% if post %}
    {% do response(resource(post)) %}
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
{% do response(resource(posts)) %}
```

### Pagination

When responding with a paginated collection, extra information can be found in the **links** and **meta** attributes of the response.

```twig
{% do response(resource(posts.paginate(3))) %}
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
* [response / resource Twig Function](../../markup/function/response.md)
* [ajaxHandler Twig Function](../../markup/function/ajax-handler.md)
:::
