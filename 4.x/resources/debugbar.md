---
subtitle: Learn how to inspect queries, performance, and application state with the Debugbar.
---
# Debugbar

The October CMS Debugbar integrates [Laravel Debugbar](https://github.com/fruitcake/laravel-debugbar) with October CMS. It displays a toolbar at the bottom of every page showing database queries, memory usage, request data, and more. Custom data collectors are included for backend controllers, CMS pages, components, and models.

## Installation

Install the package as a dev dependency using Composer.

```bash
composer require october/debugbar --dev
```

The debugbar is enabled automatically when `APP_DEBUG=true` in your `.env` file. You can override this with the `DEBUGBAR_ENABLED` environment variable.

```ini
DEBUGBAR_ENABLED=true
```

## What You'll See

Once installed, a dark toolbar appears at the bottom of every page (both frontend and backend). It includes tabs for the following.

Tab | Description
--- | ---
**Messages** | Messages logged with `debug()` or `debugbar()->info()`
**Timeline** | Request lifecycle with timing breakdown
**Exceptions** | Any exceptions thrown during the request
**Queries** | All database queries with bindings and execution time
**Route** | The matched route and middleware
**Session** | Current session data
**Request** | Request headers, cookies, and server variables
**Mail** | Emails sent during the request

## October CMS Collectors

In addition to the standard collectors, the following October-specific tabs are included.

Collector | Description
--- | ---
**Backend** | Shows the backend controller, action, parameters, and AJAX handler with file location
**CMS** | Shows the CMS page, URL, AJAX handler, and page properties with file location
**Components** | Lists all components from the page and layout with their class and properties

## Logging Messages

You can send messages to the debugbar using the `debug()` helper anywhere in your code.

```php
debug('Hello from the debugbar');
debug($myVariable);
```

For more control, resolve the debugbar instance directly.

```php
debugbar()->info('Informational message');
debugbar()->warning('Something looks off');
debugbar()->error('Something went wrong');
debugbar()->addMeasure('my-operation', $startTime, $endTime);
```

In Twig templates, you can use the `dump` function to inspect variables.

```twig
{{ dump(page) }}
```

## Configuration

Publish the configuration file to customize collector settings.

```bash
php artisan vendor:publish --provider="October\Debugbar\ServiceProvider" --tag=config
```

Or create `config/debugbar.php` manually. Common options include enabling or disabling specific collectors.

```php
return [
    'collectors' => [
        'db' => true,       // Database queries
        'views' => false,   // Views with their data
        'events' => false,  // All events fired
        'cache' => false,   // Cache events
    ],

    'options' => [
        'db' => [
            'with_params' => true,  // Show query parameters
            'backtrace' => true,    // Show query origin in code
        ],
    ],
];
```

## AJAX Debugging

AJAX requests are captured by the debugbar automatically and displayed in the toolbar dropdown. To disable this, set `capture_ajax` to `false` in `config/debugbar.php`.

## Disabling the Debugbar

The debugbar is automatically disabled when `APP_DEBUG=false`. To explicitly disable it regardless of the debug setting, add the following to your `.env` file.

```ini
DEBUGBAR_ENABLED=false
```

::: warning
The debugbar should never be enabled in production environments. It exposes sensitive information including database queries, session data, and application internals.
:::
