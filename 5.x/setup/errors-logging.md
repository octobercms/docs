---
previousPath: setup/errors-logging.md
subtitle: Find errors and other log messages about your website, and control how much error detail visitors see.
---
# Errors & Logging

October CMS configures error and exception handling for you. You can read the event log in two places:

1. In the file system, by opening the file `storage/logs/system.log`.
1. In the backend panel, by navigating to **Settings → Event Log**.

October CMS always creates a log entry when an error page is shown, and for certain [exception types](../backend/services/exceptions.md).

## Showing Error Details

The `debug` option in your `config/app.php` file controls how much error detail the application displays in the browser. With it turned on, you see detailed error information that helps with debugging and troubleshooting. With it turned off, a page with a problem shows a generic error message. New installations turn it on in the `.env` file with `APP_DEBUG=true`.

Set the `debug` value to `true` for local development. In production, it must always be `false`.

```php
/*
|--------------------------------------------------------------------------
| Application Debug Mode
|--------------------------------------------------------------------------
|
| When your application is in debug mode, detailed error messages with
| stack traces will be shown on every error that occurs within your
| application. If disabled, a simple generic error page is shown.
|
*/

'debug' => false,
```

## Writing Daily Log Files

October CMS supports several logging modes, including `single`, `daily`, `syslog` and `errorlog`. For example, to write a new log file each day instead of a single file, set the `default` value in your `config/logging.php` file:

```php
'default' => env('LOG_CHANNEL', 'daily'),
```

The value loads from the `LOG_CHANNEL` environment variable, so you can also set it in the `.env` file.

```ini
LOG_CHANNEL=daily
```

#### See Also

::: also
* [Debug Mode](./configuration.md#debug-mode)
* [Writing to the Log](../backend/services/log.md)
* [Laravel Logging Documentation](https://laravel.com/docs/12.x/logging)
:::
