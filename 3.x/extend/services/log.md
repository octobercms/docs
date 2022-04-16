# Log

By default October is configured to create a single log file for your application which is stored in the `storage/logs` directory. You may write information to the logs using the `Log` facade:

```php
$user = User::find(1);
Log::info('Showing user profile for user: '.$user->name);
```

The logger provides the eight logging levels defined in [RFC 5424](http://tools.ietf.org/html/rfc5424): **emergency**, **alert**, **critical**, **error**, **warning**, **notice**, **info** and **debug**.

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

An array of contextual data may also be passed to the log methods. This contextual data will be formatted and displayed with the log message:

```php
Log::info('User failed to login.', ['id' => $user->id]);
```

<a id="oc-helper-functions"></a>
### Helper Functions

There are some global helper methods available to make logging easier. The `trace_log` function is an alias for `Log::info` with support for using arrays and exceptions as the message.

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

The `trace_sql` function enables database logging, when called it will log every command sent to the database. These records only appear in the `system.log` file and will not appear in the backend panel log as this is stored in the database and would result in a feedback loop.

```php
trace_sql();

Db::table('users')->count();

// select count(*) as aggregate from users
```
