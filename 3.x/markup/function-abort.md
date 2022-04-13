# abort()

The `abort()` function aborts the successful request path by changing the response code and contents. This is useful for setting a custom HTTP code or displaying the 404 page when a record is not found.

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
