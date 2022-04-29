---
subtitle: Twig Function
---
# response()

The `response()` function overrides the page from being displayed and returns a response, usually in the form of JSON payload.

```twig
{% do response({ foo: 'bar' }) %}
```

The above call will return a response with a `application/json` content type.

```json
{
    "foo": "bar"
}
```

By default a status code of `200` will be used. You may specify any status code by passing it as the second argument.

```twig
{% do response('Bad Request', 400) %}
```

You may also pass custom headers as the third argument.

```twig
{% do response('Bad Request', 400, {'X-Failure-Reason': 'Not wearing shoes'}) %}
```

## resource()

The `resource()` is similar to the response function except it should be used when handling models or collections. All data returned will be wrapped in the **data** attribute automatically or if placed there explicitly. Wrapping the response provides a consistent interface.

```json
{
    "data": {}
}
```

If a resource support pagination, the output will be specially crafted to include a **links** and **meta** attribute.

```json
{
    "data": {},
    "links": {
        "first": "...",
        "last": "...",
        "prev": "...",
        "next": "..."
    },
    "meta": {}
}
```
