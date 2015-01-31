# Troubleshoot development

- [Event log](#event-log)
- [Writing to the log](#write-log)
- [Inspecting markup variables](#inspecting-markup-variables)
- [Error page](#error-page)
- [Bleeding edge updates](#edge-updates)

By default detailed error reporting is turned *on* so it is helpful to see detailed error information which can be useful for debugging and troubleshooting issues. When this feature is turned off, when there is a problem in a page, a friendly error message will be displayed.

When development has ended, it is advised that you switch off debug mode, open the configuration file `config/app.php` and change the `debug` value to **false**.

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

<a name="event-log" class="anchor" href="#event-log"></a>
## Event log

When any exception is thrown, such as a `SystemException` it will be recorded in the event log, however the `ApplicationException` will not be recorded.

    <?php

        throw new SystemException("I will be logged in the event log");

        throw new ApplicationException("I will cause an error but won't be logged anywhere");


There are two ways the event log can be accessed:

1. The event log can be viewed via the Administration area by navigating to *System > Logs > Event Log*.
1. Alternatively it can be viewed in the file system by opening the file `storage/logs/system.log`.

<a name="write-log" class="anchor" href="#write-log"></a>
## Writing to the log

During development you may wish to write to the [Event log](#event-log) without throwing an exception, this is possible with the global `traceLog()` helper.

    <?php

        // Write a string value
        $val = 'Hello world';
        traceLog('The value is '.$val);

        // Dump an array value
        $val = ['Some', 'array', 'data'];
        traceLog($val);

        // Trace an exception
        try {
            // [...]
        }
        catch (Exception $ex) {
            traceLog($ex);
        }

<a name="inspecting-markup-variables" class="anchor" href="#inspecting-markup-variables"></a>
## Inspecting markup variables

If you want to explore the variables available on a page, or inspect the contents of a specific variable, it is possible using the Twig `dump()` function.

    <body>

        <!-- This will display all available variables -->
        {{ dump() }}

        <!-- This will display the object properties of {{ foo }} -->
        {{ dump(foo) }}

    </body>

<a name="error-page" class="anchor" href="#error-page"></a>
## Error page

By default any errors will be shown with a detailed error page containing the file contents, line number and stack trace where the error occurred. You can display a custom error page by setting the configuration value `debug` to **false** in the `app/config/app.php` script and creating a page with the URL `/error`.

<a name="edge-updates" class="anchor" href="#edge-updates"></a>
## Bleeding edge updates

The October platform and some plugins will implement changes in two stages to ensure overall stability and integrity of the platform. This means they have a *test build* in addition to the default *stable build*.

You can instruct the platform to prefer test builds by changing the `edgeUpdates` parameter in the `app/config/cms.php` configuration file.

    /*
    |--------------------------------------------------------------------------
    | Bleeding edge updates
    |--------------------------------------------------------------------------
    |
    | If you are developing with October, it is important to have the latest
    | code base, set this value to 'true' to tell the platform to download
    | and use the development copies of core files and plugins.
    |
    */

    'edgeUpdates' => false,

> **Note:** For plugin developers we recommend enabling **Test updates** for your plugins listed on the marketplace, via the Plugin Settings page.
