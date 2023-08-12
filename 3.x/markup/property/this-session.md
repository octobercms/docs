---
subtitle: Twig Property
---
# this.session

You can access the current session manager via `this.session` and it returns the object `Illuminate\Session\Store` [current session configuration](../../extend/services/session.md).

## this.session.get()

You can retrieve data from the session by passing the key name to `this.session.get` as the first argument.

```twig
{{ this.session.get('key') }}
```

## this.session.has()

The `this.session.has` method can determine if an item exists in the session.

```twig
{% if this.session.has('key') %}
    <h1>We found key in the session</h1>
{% endif %}
```

## this.session.put()

The `this.session.put` method is used to store session data.

```twig
{% do this.session.put('my-preference', 'value') %}
```

## this.session.forget()

The `this.session.forget` will delete a single key (first argument) from the session.

```twig
{% do this.session.forget('key') %}
```

To remove all the session data, use `this.session.flush` instead.

```twig
{% do this.session.flush() %}
```

#### See Also

::: also
* [Session Service](../../extend/services/session.md)
:::
