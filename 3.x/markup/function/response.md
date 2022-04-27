---
subtitle: Twig Function
---
# response()

The `response()` function overrides the page from being displayed and returns a response, usually in the form of JSON payload.

```twig
{% do response({ 'foo': 'bar' }) %}
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
