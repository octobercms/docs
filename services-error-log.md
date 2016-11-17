# Errors & Logging

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Exception types](#exception-types)
    - [Application exception](#application-exception)
    - [System exception](#system-exception)
    - [Validation exception](#validation-exception)
    - [AJAX exception](#ajax-exception)
- [Exception handling](#exception-handling)
- [HTTP exceptions](#http-exceptions)
    - [Custom error page](#custom-error-page)
- [Logging](#logging)
    - [Helper functions](#helpers)

<a name="introduction"></a>
## Introduction

When you first start using OctoberCMS, error and exception handling is already configured for you. There are two ways the event log can be accessed:

1. The event log can be viewed in the file system by opening the file `storage/logs/system.log`.
1. Alternatively it can be viewed via the Administration area by navigating to *System > Logs > Event Log*.

Log entries are always created when an error page is shown and for certain [exception types](#exception-types).

<a name="configuration"></a>
## Configuration

#### Error detail

The amount of error detail your application displays through the browser is controlled by the `debug` configuration option in your `config/app.php` configuration file. By default detailed error reporting is turned *on* so it is helpful to see detailed error information which can be useful for debugging and troubleshooting issues. When this feature is turned off, when there is a problem in a page, a generic error message will be displayed.

For local development, you should set the `debug` value to `true`. In your production environment, this value should always be `false`.

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

#### Log file modes

October supports `single`, `daily`, `syslog` and `errorlog` logging modes. For example, if you wish to use daily log files instead of a single file, you should simply set the `log` value in your `config/app.php` configuration file:

    'log' => 'daily'

<a name="exception-types"></a>
## Available exceptions

October comes with several basic exception types out of the box.

<a name="application-exception"></a>
### Application exception

The `October\Rain\Exception\ApplicationException` class, aliased as `ApplicationException`, is the most common exception type that is used when a simple application condition has failed.

    throw new ApplicationException('You must be logged in to do that!');

The error message will be simplified and will never include any sensitive information like the php file and line number.

<a name="system-exception"></a>
### System exception

The `October\Rain\Exception\SystemException` class, aliased as `SystemException`, is used for errors that are critical to the system functioning and are always logged.

    throw new SystemException('Unable to contact the mail server API');

When this exception is thrown a detailed error message is shown with the file and line number where it occured.

<a name="validation-exception"></a>
### Validation exception

The `October\Rain\Exception\ValidationException` class, aliased as `ValidationException`, is used for errors that relate directly to a form submission and an invalid field. The message should contain an array with fields and error messages.

    throw new ValidationException(['username' => 'Sorry that username is already taken!']);

You can also pass an instance of the [validation service](validation).

    $validation = Validator::make(...);

    if ($validation->fails()) {
        throw new ValidationException($validation);
    }

When this exception is thrown the [AJAX framework](../ajax/introduction) will provide this information in a usable format and focus the first invalid field.

<a name="ajax-exception"></a>
### AJAX exception

The `October\Rain\Exception\AjaxException` class, aliased as `AjaxException`, is considered a "smart error" and will return the HTTP code 406. This allows them to pass response contents as if they were a successful response.

    throw new AjaxException(['#flashMessages' => $this->renderPartial(...)]);

When this exception is thrown the [AJAX framework](../ajax/introduction) will follow the standard error workflow but will also refresh specified partials.

<a name="exception-handling"></a>
## Exception handling

All exceptions are handled by the `October\Rain\Foundation\Exception\Handler` class. This class contains two methods: `report` and `render` that dictate if an error should be logged and how to respond to an error.

However, you may specify custom handlers if needed using the `App::error` method. Handlers are called based on the type-hint of the Exception they handle. For example, you may create a handler that only handles `RuntimeException` instances:

    App::error(function(RuntimeException $exception) {
        // Handle the exception...
    });

If an exception handler returns a response, that response will be sent to the browser and no other error handlers will be called:

    App::error(function(InvalidUserException $exception) {
        return 'Sorry! Something is wrong with this account!';
    });

To listen for PHP fatal errors, you may use the `App::fatal` method:

    App::fatal(function($exception) {
        //
    });

If you have several exception handlers, they should be defined from most generic to most specific. So, for example, a handler that handles all exceptions of type `Exception` should be defined before a custom exception type such as `SystemException`.

### Where to place error handlers

Error handler registrations, like [event handlers](events), generally fall under the category of "bootstrap code". In other words, they prepare your application to actually handle requests, and usually need to be executed before a route or controller is actually called. The most common place is the `boot()` method of a [Plugin registration file](../plugin/registration#registration-methods). Alternatively, plugins can supply a file named **init.php** in the plugin directory that you can use to place error handler registrations.

<a name="http-exceptions"></a>
## HTTP exceptions

Some exceptions describe HTTP error codes from the server. For example, this may be a "page not found" error (404), an "unauthorized error" (401) or even a developer generated 500 error. In order to generate such a response from anywhere in your application, use the following:

    App::abort(404);

The `abort` method will immediately raise an exception which will be rendered by the exception handler. Optionally, you may provide the response text:

    App::abort(403, 'Unauthorized action.');

This method may be used at any time during the request's lifecycle.

<a name="custom-error-page"></a>
### Custom error page

By default any errors will be shown with a detailed error page containing the file contents, line number and stack trace where the error occurred. You can display a custom error page by setting the configuration value `debug` to **false** in the `config/app.php` script and creating a page with the URL `/error`.

<a name="logging"></a>
## Logging

By default October is configured to create a single log file for your application which is stored in the `storage/logs` directory. You may write information to the logs using the `Log` facade:

    $user = User::find(1);
    Log::info('Showing user profile for user: '.$user->name);

The logger provides the eight logging levels defined in [RFC 5424](http://tools.ietf.org/html/rfc5424): **emergency**, **alert**, **critical**, **error**, **warning**, **notice**, **info** and **debug**.

    Log::emergency($error);
    Log::alert($error);
    Log::critical($error);
    Log::error($error);
    Log::warning($error);
    Log::notice($error);
    Log::info($error);
    Log::debug($error);

#### Contextual information

An array of contextual data may also be passed to the log methods. This contextual data will be formatted and displayed with the log message:

    Log::info('User failed to login.', ['id' => $user->id]);

<a name="helpers"></a>
### Helper functions

There are some global helper methods available to make logging easier. The `trace_log()` function is an alias for `Log::info` with support for using arrays and exceptions as the message.

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

The `trace_sql()` function enables database logging, when called it will log every command sent to the database. These records only appear in the `system.log` file and will not appear in the admininstration area log as this is stored in the database and would result in a feedback loop.

    trace_sql();

    Db::table('users')->count();

    // select count(*) as aggregate from users
