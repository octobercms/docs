---
previousPath: resources/debugbar.md
subtitle: Inspect database queries, performance and application state with the Debugbar toolbar.
---
# Debugbar

The October CMS Debugbar integrates [Laravel Debugbar](https://github.com/fruitcake/laravel-debugbar) with October CMS. It adds a toolbar to the bottom of each page that shows database queries, memory usage, request data and more, with extra collectors for backend controllers, CMS pages and components.

```bash
composer require october/debugbar --dev
```

## Installing the Debugbar

Install the package as a dev dependency with Composer, as shown above. The debugbar turns on automatically when `APP_DEBUG=true` in your `.env` file. To override this, set the `DEBUGBAR_ENABLED` environment variable.

```ini
DEBUGBAR_ENABLED=true
```

The toolbar only appears when you are signed in to the backend panel as a super user. Other visitors and backend users don't see it, and no debugbar data is stored for their requests.

## Reading the Toolbar

The toolbar appears on both frontend and backend pages. It includes these tabs.

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

### October CMS Tabs

In addition to the standard collectors, the debugbar includes these October CMS collectors. The **Backend** tab appears on backend pages, and the **CMS** and **Components** tabs appear on frontend pages.

Collector | Description
--- | ---
**Backend** | Shows the backend controller, action, parameters, and AJAX handler with file location
**CMS** | Shows the CMS page, URL, AJAX handler, and page properties with file location
**Components** | Lists all components from the page and layout with their class and properties

## Logging Messages

Send messages to the debugbar with the `debug()` helper anywhere in your code.

```php
debug('Hello from the debugbar');
debug($myVariable);
```

For more control, use the debugbar instance directly.

```php
debugbar()->info('Informational message');
debugbar()->warning('Something looks off');
debugbar()->error('Something went wrong');
debugbar()->addMeasure('my-operation', $startTime, $endTime);
```

In Twig templates, use the `dump` function to inspect variables.

```twig
{{ dump(page) }}
```

## Configuring Collectors

Publish the configuration file to customize the collector settings.

```bash
php artisan vendor:publish --provider="October\Debugbar\ServiceProvider" --tag=config
```

Or create `config/debugbar.php` manually. Common options include turning specific collectors on or off.

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

::: tip
If the debugbar causes out-of-memory errors, check the `cache` collector first. The `cache`, `models`, `views` and `events` collectors can use a lot of memory, which is why they are off by default.
:::

## Debugging AJAX Requests

The debugbar captures AJAX requests automatically and lists them in the toolbar dropdown. To turn this off, set `capture_ajax` to `false` in `config/debugbar.php`.

## Disabling the Debugbar

The debugbar turns off automatically when `APP_DEBUG=false`. To turn it off whatever the debug setting, add this to your `.env` file.

```ini
DEBUGBAR_ENABLED=false
```

::: warning
The debugbar exposes sensitive information, including database queries, session data and application internals. Only super users can see it, so you can enable it on a live site to debug a problem that only happens in production, but turn it off again when you are done.
:::

#### See Also

::: also
* [Errors & Logging](./errors-logging.md)
* [Laravel Debugbar](https://github.com/fruitcake/laravel-debugbar)
:::
