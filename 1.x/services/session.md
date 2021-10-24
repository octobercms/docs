# Session services

- [Configuration](#configuration)
- [Session usage](#session-usage)
- [Flash data](#flash-data)

<a name="configuration"></a>
## Configuration

Since HTTP driven applications are stateless, sessions provide a way to store information about the user across requests. October ships with a variety of session back-ends available for use through a clean, unified API. Support for popular back-ends such as [Memcached](http://memcached.org), [Redis](http://redis.io), and databases is included out of the box.

The session configuration is stored in `config/session.php`. Be sure to review the well documented options available to you in this file. By default, October is configured to use the `file` session driver, which will work well for the majority of applications.

<div class="content-list" markdown="1">
- `file` - sessions are stored in `storage/framework/sessions`.
- `cookie` - sessions are stored in secure, encrypted cookies.
- `database` - sessions are stored in a database used by your application.
- `memcached` / `redis` - sessions are stored in one of these fast, cache based stores.
- `array` - sessions are stored in a simple PHP array and will not be persisted across requests.
</div>

> **Note:** The array driver is typically used for running unit tests to prevent session data from persisting.

#### Reserved keys

October uses the `flash` session key internally, so you should not add an item to the session by that name.

<a name="session-usage"></a>
## Session usage

#### Storing data in the session

Using the `Session` facade you may call a variety of functions to interact with the underlying data. For example, the `put` method stores a new piece of data in the session:

    Session::put('key', 'value');

#### Pushing to array session values

The `push` method may be used to push a new value onto a session value that is an array. For example, if the `user.teams` key contains an array of team names, you may push a new value onto the array like so:

    Session::push('user.teams', 'developers');

#### Retrieving data from the session

When you retrieve a value from the session, you may also pass a default value as the second argument to the `get` method. This default value will be returned if the specified key does not exist in the session. If you pass a `Closure` as the default value to the `get` method, the `Closure` will be executed and its result returned:

    $value = Session::get('key');

    $value = Session::get('key', 'default');

    $value = Session::get('key', function() { return 'default'; });

#### Retrieving all data from the session

If you would like to retrieve all data from the session, you may use the `all` method:

    $data = Session::all();

#### Retrieving data and forgetting it

The `pull` method will retrieve and delete an item from the session:

    $value = Session::pull('key', 'default');

#### Determining if an item exists in the session

The `has` method may be used to check if an item exists in the session. This method will return `true` if the item exists:

    if (Session::has('users')) {
        //
    }

#### Deleting data from the session

The `forget` method will remove a piece of data from the session. If you would like to remove all data from the session, you may use the `flush` method:

    Session::forget('key');

    Session::flush();

#### Regenerating the session ID

If you need to regenerate the session ID, you may use the `regenerate` method:

    Session::regenerate();

<a name="flash-data"></a>
## Flash data

Sometimes you may wish to store items in the session only for the next request. You may do so using the `Session::flash` method. Data stored in the session using this method will only be available during the subsequent HTTP request, and then will be deleted. Flash data is primarily useful for short-lived status messages:

    Session::flash('key', 'value');

If you need to keep your flash data around for even more requests, you may use the `reflash` method, which will keep all of the flash data around for an additional request. If you only need to keep specific flash data around, you may use the `keep` method:

    Session::reflash();

    Session::keep(['username', 'email']);
