---
subtitle: October CMS comes with several basic exception types out of the box.
---
# Available Exceptions

### Application Exception

The `October\Rain\Exception\ApplicationException` class, aliased as `ApplicationException`, is the most common exception type that is used when a simple application condition has failed.

```php
throw new ApplicationException('You must be logged in to do that!');
```

The error message will be simplified and will never include any sensitive information like the PHP file and line number.

### System Exception

The `October\Rain\Exception\SystemException` class, aliased as `SystemException`, is used for errors that are critical to the system functioning and are always logged.

```php
throw new SystemException('Unable to contact the mail server API');
```

When this exception is thrown a detailed error message is shown with the file and line number where it occurred.

### Not Found Exception

The `October\Rain\Exception\NotFoundException` class, aliased as `NotFoundException`, is used for errors that occur when a missing record is encountered.

```php
throw new NotFoundException('Record not found');
```

When this exception is thrown the standard response will change to display the nearest not found page with a 404 status code added.

### Validation Exception

The `October\Rain\Exception\ValidationException` class, aliased as `ValidationException`, is used for errors that relate directly to a form submission and an invalid field. The message should contain an array with fields and error messages.

```php
throw new ValidationException(['username' => 'Sorry that username is already taken!']);
```

You can also pass an instance of the [validation service](../services/validation.md).

```php
$validation = Validator::make(...);

if ($validation->fails()) {
    throw new ValidationException($validation);
}
```

When this exception is thrown the [AJAX framework](./ajax.md) will provide this information in a usable format and focus the first invalid field.

### AJAX Exception

The `October\Rain\Exception\AjaxException` class, aliased as `AjaxException`, is considered a "smart error" and will return the HTTP code 406. This allows them to pass response contents as if they were a successful response.

```php
throw new AjaxException(['#flashMessages' => $this->renderPartial(...)]);
```

When this exception is thrown the [AJAX framework](./ajax.md) will follow the standard error workflow but will also refresh specified partials.

## Exception Handling

All exceptions are handled by the `October\Rain\Foundation\Exception\Handler` class. This class contains two methods: `report` and `render` that dictate if an error should be logged and how to respond to an error.

However, you may specify custom handlers if needed using the `App::error` method. Handlers are called based on the type-hint of the Exception they handle. For example, you may create a handler that only handles `RuntimeException` instances:

```php
App::error(function(RuntimeException $exception) {
    // Handle the exception...
});
```

If an exception handler returns a response, that response will be sent to the browser and no other error handlers will be called.

```php
App::error(function(InvalidUserException $exception) {
    return 'Sorry! Something is wrong with this account!';
});
```

To listen for PHP fatal errors, you may use check for the Error exception type:

```php
App::error(function(Error $exception) {
    //
});
```

If you have several exception handlers, they should be defined from most generic to most specific. So, for example, a handler that handles all exceptions of type `Exception` should be defined before a custom exception type such as `SystemException`.

### Where to Place Error Handlers

Error handler registrations generally fall under the category of bootstrap code. In other words, they prepare your application to actually handle requests, and usually need to be executed before a route or controller is actually called. The most common place is the `boot` method of a [plugin registration file](../extending.md). Alternatively, plugins can supply a file named **init.php** in the plugin directory that you can use to place error handler registrations.

## HTTP Exceptions

Some exceptions describe HTTP error codes from the server. For example, this may be a "page not found" error (404), an "unauthorized error" (401) or even a developer generated 500 error. In order to generate such a response from anywhere in your application, use the following.

```php
App::abort(404);
```

The `abort` method will immediately raise an exception which will be rendered by the exception handler. Optionally, you may provide the response text.

```php
App::abort(403, 'Unauthorized action.');
```

This method may be used at any time during the request's life cycle. There is also an accompanying [Twig filter for aborting requests](../../markup/function/abort.md).

### Custom Error Page

By default any errors will be shown with a detailed error page containing the file contents, line number and stack trace where the error occurred. You can display a custom error page by setting the configuration value `debug` to **false** in the `config/app.php` script and creating a page with the URL `/error`.
