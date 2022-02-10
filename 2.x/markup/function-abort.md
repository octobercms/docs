# abort()

The `abort()` function aborts the successful request path by changing the response code and output. This is useful for setting a custom HTTP code, redirecting to another location or displaying the 404 page when a record is not found.

```twig
{% if record.notFound %}
    {{ abort(404) }}
{% endif %}
```

To set the response code and display the theme 404 page, use the `404` code. Any other code will display the error page.

```twig
{{ abort(404) }}
```

To set the code in the header without changing the response, pass `false` as the second argument.

```twig
{{ abort(404, false) }}
```

This can be used for any response code, for example, **Access Denied** status.

```twig
{{ abort(403, false) }}
```

You may also pass an error message as the second argument.

```twig
{{ abort(403, 'Access Denied') }}
```

To perform a redirect, pass the `302` (temporary) or `301` (permanent) code and the second argument can be a URL or a CMS page name.

```twig
{{ abort(301, 'blog/index') }}

{{ abort(302, 'https://octobercms.com') }}
```
