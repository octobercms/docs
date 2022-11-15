---
subtitle: Twig Property
---
# this.session

You can access the current session manager via `this.session` and it returns the object `Illuminate\Session\SessionManager` [current session configuration](../../extend/services/session.md).

## Retrieving data from the session

```twig
{{ this.session.get('key') }}
```

## Determining if an item exists in the session

```twig
{% if this.session.has('key') %}
    <h1>We found key in the session</h1>
{% endif %}
```

## Deleting data from the session

#### Remove data for a single key

```twig
{{ this.session.forget('key') }}
```

#### Remove all session data

```twig
{{ this.session.flush() }}
```
