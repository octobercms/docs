# abort()

The `abort()` function aborts the successful request path by changing the response code and output. This is useful for setting a custom HTTP code, redirecting to another location or displaying the 404 page when a record is not found.

```twig
{% if record.notFound %}
    {% do abort(404) %}
{% endif %}
```

To set the response code and display the theme 404 page, use the `404` code.

```twig
{% do abort(404) %}
```

Any other code will display the error page, with an optional message as the second argument.

```twig
{% do abort(403, 'Access Denied') %}
```

To set the HTTP code in the header without changing the response contents, pass `false` as the second argument.

```twig
{% do abort(404, false) %}
```

To perform a redirect, pass the `302` (temporary) or `301` (permanent) code using the second argument as the destination, as either a CMS page name or a URL address.

```twig
{% do abort(301, 'blog/index') %}

{% do abort(302, 'https://octobercms.com') %}
```
