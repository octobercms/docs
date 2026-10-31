---
previousPath: extend/system/exceptions.md
subtitle: Throw the built-in exception types to show errors, return HTTP error codes and handle exceptions in your own way.
---
# Exceptions

October CMS includes several exception types for common error conditions. Throw the one that matches the situation, and October CMS shows the error in the right way, whether that is a simple message, a detailed error page, a 404 page or invalid form fields.

```php
throw new ApplicationException('You must be logged in to do that!');
```

## Choosing an Exception Type

Each exception type is aliased, so you can use it without the full namespace.

### Application Exception

The `October\Rain\Exception\ApplicationException` class, aliased as `ApplicationException`, is the most common exception type. Use it when a simple application condition has failed.

```php
throw new ApplicationException('You must be logged in to do that!');
```

The error message is simplified and never includes sensitive information, such as the PHP file and line number.

### System Exception

The `October\Rain\Exception\SystemException` class, aliased as `SystemException`, is for errors that are critical to the system functioning. These errors are always logged.

```php
throw new SystemException('Unable to contact the mail server API');
```

When this exception is thrown, a detailed error message is shown with the file and line number where it occurred.

### Not Found Exception

The `October\Rain\Exception\NotFoundException` class, aliased as `NotFoundException`, is for errors that occur when a record is missing.

```php
throw new NotFoundException('Record not found');
```

When this exception is thrown, the response changes to display the nearest not found page, with a 404 status code.

### Validation Exception

The `October\Rain\Exception\ValidationException` class, aliased as `ValidationException`, is for errors that relate to a form submission and an invalid field. Pass it an array of field names and error messages.

```php
throw new ValidationException(['username' => 'Sorry that username is already taken!']);
```

You can also pass an instance of the [validation service](./validation.md).

```php
$validation = Validator::make(...);

if ($validation->fails()) {
    throw new ValidationException($validation);
}
```

When this exception is thrown, the [AJAX framework](../panel/ajax.md) receives the errors in a usable format and focuses the first invalid field.

### AJAX Exception

The `October\Rain\Exception\AjaxException` class, aliased as `AjaxException`, is a "smart error" that returns the HTTP code 406. It can pass response contents as if it were a successful response.

```php
throw new AjaxException(['#flashMessages' => $this->renderPartial(...)]);
```

When this exception is thrown, the [AJAX framework](../panel/ajax.md) follows the standard error workflow, and also refreshes the specified partials.

## Returning HTTP Errors

Some errors are described by an HTTP status code, such as a "page not found" error (404), an "unauthorized error" (401) or a developer generated 500 error. To return one of these responses from anywhere in your application, use the `App::abort` method.

```php
App::abort(404);
```

The `abort` method immediately raises an exception, which the exception handler renders. You can also provide the response text.

```php
App::abort(403, 'Unauthorized action.');
```

You can call this method at any time during the request's life cycle. There is also a [Twig function for aborting requests](../../handbook/twig-functions/abort.md).

### Showing a Custom Error Page

By default, errors are shown on a detailed error page with the file contents, line number and stack trace where the error occurred. To show a custom error page instead, set the `debug` configuration value to **false** in the **config/app.php** file, and create a page with the URL `/error`.

## Handling Exceptions

All exceptions are handled by the `October\Rain\Foundation\Exception\Handler` class. Its `report` and `render` methods decide whether an error is logged and how to respond to it.

You can register your own handlers with the `App::error` method. Handlers are called based on the type-hint of the exception they handle. For example, this handler only handles `RuntimeException` instances.

```php
App::error(function(RuntimeException $exception) {
    // Handle the exception...
});
```

If a handler returns a response, that response is sent to the browser and no other error handlers are called.

```php
App::error(function(InvalidUserException $exception) {
    return 'Sorry! Something is wrong with this account!';
});
```

To listen for PHP fatal errors, type-hint the `Error` exception type.

```php
App::error(function(Error $exception) {
    //
});
```

If you have several exception handlers, define them from the most generic to the most specific. For example, define a handler for all exceptions of type `Exception` before a handler for a custom exception type such as `SystemException`.

### Where to Place Error Handlers

Register error handlers as part of your bootstrap code, so they are ready before a route or controller is called. The most common place is the `boot` method of the [plugin registration file](../plugins/introduction.md#running-code-when-the-plugin-loads). Alternatively, a plugin can include an [init.php file](../plugins/introduction.md#using-an-initialization-file) in the plugin directory to hold its error handler registrations.

#### See Also

::: also
* [Errors & Logging](../../setup/errors-logging.md)
* [Validation](./validation.md)
* [Backend AJAX](../panel/ajax.md)
:::
