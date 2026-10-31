---
previousPath: extend/services/log.md
subtitle: Write messages, data and exceptions to the application log file.
---
# Log

By default, October CMS writes a single log file for your application, stored in the `storage/logs` directory. Use the `Log` facade to write information to the log.

```php
$user = User::find(1);
Log::info('Showing user profile for user: '.$user->name);
```

## Choosing a Log Level

The logger provides the eight logging levels defined in [RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424): **emergency**, **alert**, **critical**, **error**, **warning**, **notice**, **info** and **debug**.

```php
Log::emergency($error);
Log::alert($error);
Log::critical($error);
Log::error($error);
Log::warning($error);
Log::notice($error);
Log::info($error);
Log::debug($error);
```

#### Contextual Information

You can also pass an array of contextual data to the log methods. This data is formatted and displayed with the log message.

```php
Log::info('User failed to login.', ['id' => $user->id]);
```

## Using the Helper Functions

Global helper functions make logging quicker. The `trace_log` function is an alias for `Log::info` that also accepts arrays and exceptions as the message.

```php
// Write a string value
$val = 'Hello world';
trace_log('The value is '.$val);

// Dump an array value
$val = ['Some', 'array', 'data'];
trace_log($val);

// Trace an exception
try {
    //
}
catch (Exception $ex) {
    trace_log($ex);
}
```

### Logging Database Queries

The `trace_sql` function turns on database logging. Once called, it logs every command sent to the database. These records only appear in the `system.log` file. They do not appear in the backend panel log, which is stored in the database and would cause a feedback loop.

```php
trace_sql();

Db::table('users')->count();

// select count(*) as aggregate from users
```

#### See Also

::: also
* [Errors & Logging](../../setup/errors-logging.md)
* [Helper Functions](./helpers.md#method-trace-log)
* [Laravel Logging](https://laravel.com/docs/12.x/logging)
:::
