---
previousPath: extend/services/session.md
subtitle: Store information about the user across requests, including flash data for the next request.
---
# Session

HTTP applications are stateless, so sessions let you store information about the user across requests. Use the `Session` facade to store and retrieve session data.

```php
Session::put('key', 'value');

$value = Session::get('key');
```

## Storing Data

The `Session` facade has a variety of methods for working with session data. For example, the `put` method stores a new piece of data in the session.

```php
Session::put('key', 'value');
```

::: warning
October CMS uses the `flash` session key internally, so avoid using it as a key name.
:::

The `push` method adds a new value to a session value that is an array. For example, if the `user.teams` key contains an array of team names, you can push a new value onto the array.

```php
Session::push('user.teams', 'developers');
```

## Retrieving Data

When you retrieve a value from the session, you can pass a default value as the second argument to the `get` method. The default value is returned if the key does not exist in the session. If you pass a `Closure` as the default value, the `Closure` runs and its result is returned.

```php
$value = Session::get('key');

$value = Session::get('key', 'default');

$value = Session::get('key', function() { return 'default'; });
```

To retrieve all data from the session, use the `all` method.

```php
$data = Session::all();
```

To check if an item exists in the session, use the `has` method. It returns `true` if the item exists.

```php
if (Session::has('users')) {
    //
}
```

## Deleting Data

The `pull` method retrieves an item from the session and deletes it.

```php
$value = Session::pull('key', 'default');
```

The `forget` method removes a piece of data from the session. To remove all data from the session, use the `flush` method.

```php
Session::forget('key');

Session::flush();
```

## Regenerating the Session

To regenerate the session ID, use the `regenerate` method.

```php
Session::regenerate();
```

To regenerate the session ID and remove all data from the session in a single statement, use the `invalidate` method.

```php
Session::invalidate();
```

## Flashing Data for the Next Request

To store an item in the session only for the next request, use the `Session::flash` method. Data stored this way is available during the next HTTP request only, and is then deleted. Flash data is mostly used for short-lived status messages.

```php
Session::flash('key', 'value');
```

To keep your flash data for one more request, use the `reflash` method, which keeps all of the flash data. To keep only specific flash data, use the `keep` method.

```php
Session::reflash();

Session::keep(['username', 'email']);
```

## Configuring the Session Driver

The session configuration is stored in **config/session.php**. Review the options documented in this file. October CMS supports a variety of session drivers through a single API, including popular services such as [Memcached](http://memcached.org), [Redis](https://redis.io) and databases.

- `file` - sessions are stored in `storage/framework/sessions`.
- `cookie` - sessions are stored in secure, encrypted cookies.
- `database` - sessions are stored in a database used by your application.
- `memcached` / `redis` - sessions are stored in one of these fast, cache based stores.
- `array` - sessions are stored in a simple PHP array and will not be persisted across requests.

By default, October CMS uses the `file` session driver, which works well for most applications. The `array` driver is usually used for running unit tests, so session data does not persist.

#### See Also

::: also
* [Response & View](./response-view.md)
* [this.session](../../handbook/twig-properties/this-session.md)
* [Laravel HTTP Session](https://laravel.com/docs/12.x/session)
:::
