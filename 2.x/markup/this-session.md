# this.session

You can access the current session manager via `this.session` and it returns the object `Illuminate\Session\SessionManager` [current session configuration](../services/session#configuration).

## Retrieving data from the session

```twig
{{ this.session.get('key') }}
```

## Determining if an item exists in the session

```twig
{% if this.session.has('key') %}
    <h1>we found it in the session</h1>
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
