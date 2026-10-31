---
previousPath: cms/resources/building-apis.md
subtitle: Build JSON API endpoints with CMS pages, returning data from components with the response() Twig function.
---
# Building an API

A CMS page can act as an API endpoint that returns JSON instead of HTML. This is useful when a client-side framework such as Vue.js or React needs data from your website, and you can build each endpoint in your theme using Twig.

::: cmstemplate
```ini
url = "/api/foobar"
```
```twig
{% do response({ foo: 'bar' }) %}
```
:::

The page returns a response with the `application/json` content type.

```json
{ "foo": "bar" }
```

::: aside
See the [routing article](../../backend/services/routing.md) if you prefer to define API routes using PHP instead.
:::

The page works as a transformation layer between your CMS components and the JSON returned to your application. Most objects, such as models and collections, support JSON serialization and can be returned directly.

## Sending a Response

The [`response()` Twig function](../../handbook/twig-functions/response.md) replaces the page contents with a custom response. In most cases, you build the response from component variables.

```twig
{% do response({
    id: post.id,
    title: post.title,
    email: post.author.email,
    created_at: post.created_at,
    updated_at: post.updated_at
}) %}
```

### Returning a List of Items

The [`collect()` Twig function](../../handbook/twig-functions/collect.md) builds a collection for a response. Use its `push` method to add items one at a time and customize each result.

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

{% do response(result) %}
```

## Responding to Conditions

You can use any Twig condition to change the response. When `response()` is called more than once, the last call is the one sent to the browser.

### Checking the HTTP Method

Use the [`this.request.method` property](../../handbook/twig-properties/this-request.md) to check the request method.

```twig
{% if this.request.method == 'GET' %}
    <!-- Do GET Logic -->
{% else %}
    <!-- Method Unsupported -->
{% endif %}
```

### Returning a 404 Response

Use the [`abort()` Twig function](../../handbook/twig-functions/abort.md) to abort the request with a 404 response.

```twig
{% if post %}
    {% do response(post) %}
{% else %}
    {% do abort(404) %}
{% endif %}
```

## Returning Models and Collections

When returning models and collections, wrap the data in a **data** attribute. This gives every endpoint a consistent shape.

Use the `section` component to return a single model.

::: cmstemplate
```ini
url = "/api/blog/post/:slug"

[section post]
handle = "Blog\Post"
identifier = "slug"
```
```twig
{% if post %}
    {% do response({
        data: post
    }) %}
{% else %}
    {% do abort(404) %}
{% endif %}
```
:::

Use the `collection` component to return a collection.

::: cmstemplate
```ini
url = "/api/blog/posts"

[collection posts]
handle = "Blog\Post"
```
```twig
{% do response({
    data: posts
}) %}
```
:::

### Paginating the Response

For a paginated collection, use the [`pager()` Twig function](../../handbook/twig-functions/pager.md) to add the **links** and **meta** attributes to the response.

```twig
{% set posts = blog.paginate(3) %}

{% set pager = pager(posts) %}

{% do response({
    data: posts,
    links: pager.links,
    meta: pager.meta
}) %}
```

This produces the following JSON format.

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

## Sharing Logic Between Endpoints

Since the API is defined in the markup section of a page or layout, all components and life cycle events are available.

### Using Layouts as Middleware

Middleware applies common logic to several endpoints, such as checking authentication or throttling requests. A [CMS layout with priority mode](../layouts.md) applies logic to every page that uses it, and the layout logic runs before the page logic.

Include the [`{% page %}` Twig tag](../../handbook/twig-tags/page.md) so the page logic runs. For example, a layout named **api.htm** can contain any conditional logic.

::: cmstemplate
```ini
description = "API Authentication"
is_priority = 1
```
```twig
{% if someCondition %}
    {% page %}
{% else %}
    {% do response({ message: 'Condition not met' }, 400) %}
{% endif %}
```
:::

Every page that uses the layout has the conditions of the layout applied.

::: cmstemplate
```ini
layout = "api"
```
```twig
{% do response({ success: true }) %}
```
:::

::: warning
Always use [priority mode in the layout](../layouts.md) to make sure the layout contents run first.
:::

### Calling AJAX Handlers

To call an AJAX handler of a component or the page, use the [`ajaxHandler()` Twig function](../../handbook/twig-functions/ajax-handler.md).

::: cmstemplate
```ini
url = "/api/signin"

[account]
```
```twig
{% set result = ajaxHandler('onSignin') %}

{% if result.error %}
    {% do response({ message: 'Login Failed' }, 401) %}
{% else %}
    {% do response({ success: true }) %}
{% endif %}
```
:::

You can also pass the result of a handler directly as the response. The response includes the variables set on the page and the array values returned by the handler.

```twig
{% do response(ajaxHandler('onSubmitPost')) %}
```

Redirects are handled automatically. See the [`ajaxHandler()` function](../../handbook/twig-functions/ajax-handler.md) for more details.

## Example: Returning Users with Avatar Thumbnails

The following example sets the `users` variable to all the users found in the [User plugin](https://octobercms.com/plugin/rainlab-user). It eager loads the `avatar` relationship, then sets an `avatar_thumb` attribute on each user to a thumbnail URL when an avatar is found.

::: cmstemplate
```ini
## pages/api/users.htm
url = "/api/users"
```
```php
function onStart()
{
    $this['users'] = \RainLab\User\Models\User::all();
}
```
```twig
{# Load up the avatar relation #}
{% do users.load('avatar') %}

{# Set the 'avatar_thumb' attribute on each user #}
{% for user in users %}
    {% do user.setAttribute(
        'avatar_thumb',
        user.avatar.getThumbUrl(100, 100, {mode: 'crop'})|default(null)
    ) %}
{% endfor %}

{# Respond with the user #}
{% do response({
    data: users
}) %}
```
:::

#### See Also

::: also
* [Response Twig Function](../../handbook/twig-functions/response.md)
* [AJAX Handler Twig Function](../../handbook/twig-functions/ajax-handler.md)
* [Pager Twig Function](../../handbook/twig-functions/pager.md)
:::
