# Request & Input

## Basic Input

You may access all user input with a few simple methods. You do not need to worry about the HTTP verb for the request when using the `Input` facade, as input is accessed in the same way for all verbs. The global `input` [helper function](./helpers.md) is an alias for `Input::get`.

#### Retrieving an Input Value

```php
$name = Input::get('name');
```

#### Retrieving a Default Value if the Input Value is Absent

```php
$name = Input::get('name', 'Sally');
```

#### Determining if an Input Value is Present

```php
if (Input::has('name')) {
    //
}
```

#### Getting All Input for the Request

```php
$input = Input::all();
```

#### Getting Only Some of the Request Input

```php
$input = Input::only('username', 'password');

$input = Input::except('credit_card');
```

When working on forms with "array" inputs, you may use dot notation to access the arrays:

```php
$input = Input::get('products.0.name');
```

::: tip
Some JavaScript libraries such as Backbone may send input to the application as JSON. You may access this data via `Input::get` like normal.
:::

## Cookies

By default, all cookies created by the October CMS are encrypted and signed with an authentication code, meaning they will be considered invalid if they have been changed by the client. Cookies named in the `system.unencrypt_cookies` config key will not be encrypted.

#### Retrieving a Cookie Value

```php
$value = Cookie::get('name');
```

#### Attaching a New Cookie to a Response

```php
$response = Response::make('Hello World');

$response->withCookie(Cookie::make('name', 'value', $minutes));
```

#### Queueing a Cookie for the Next Response

If you would like to set a cookie before a response has been created, use the `Cookie::queue` method. The cookie will automatically be attached to the final response from your application.

```php
Cookie::queue($name, $value, $minutes);
```

#### Creating a Cookie That Lasts Forever

```php
$cookie = Cookie::forever('name', 'value');
```

#### Handling Cookies Without Encryption

If you don't want some cookies to be encrypted or decrypted, you can specify them in configuration. This is useful, for example, when you want to pass data from frontend to server side backend via cookies, and vice versa.

Add names of the cookies that should not be encrypted or decrypted to `unencrypt_cookies` parameter in the `config/system.php` configuration file.

```php
'unencrypt_cookies' => [
    'my_cookie',
],
```

Alternatively for plugins, you can also add these dynamically from `Plugin.php` of your plugin.

```php
public function boot()
{
    Config::push('system.unencrypt_cookies', 'my_cookie');
}
```

## Old Input

You may need to keep input from one request until the next request. For example, you may need to re-populate a form after checking it for validation errors.

#### Flashing Input to the Session

```php
Input::flash();
```

#### Flashing Only Some Input to the Session

```php
Input::flashOnly('username', 'email');

Input::flashExcept('password');
```

Since you often will want to flash input in association with a redirect to the previous page, you may easily chain input flashing onto a redirect.

```php
return Redirect::to('form')->withInput();

return Redirect::to('form')->withInput(Input::except('password'));
```

::: tip
You may flash other data across requests using the [Session](./session.md) class.
:::

#### Retrieving Old Data

```php
Input::old('username');
```

## Files

#### Retrieving an Uploaded File

```php
$file = Input::file('photo');
```

#### Determining if a File was Uploaded

```php
if (Input::hasFile('photo')) {
    //
}
```

The object returned by the `file` method is an instance of the `Symfony\Component\HttpFoundation\File\UploadedFile` class, which extends the PHP `SplFileInfo` class and provides a variety of methods for interacting with the file.

#### Determining if an Uploaded File is Valid

```php
if (Input::file('photo')->isValid()) {
    //
}
```

#### Moving an Uploaded File

```php
Input::file('photo')->move($destinationPath);

Input::file('photo')->move($destinationPath, $fileName);
```

#### Retrieving the Path to an Uploaded File

```php
$path = Input::file('photo')->getRealPath();
```

#### Retrieving the Original Name of an Uploaded File

```php
$name = Input::file('photo')->getClientOriginalName();
```

#### Retrieving the Extension of an Uploaded File

```php
$extension = Input::file('photo')->getClientOriginalExtension();
```

#### Retrieving the Size of an Uploaded file

```php
$size = Input::file('photo')->getSize();
```

#### Retrieving the MIME Type of an Uploaded File

```php
$mime = Input::file('photo')->getMimeType();
```

## Request Information

The `Request` class provides many methods for examining the HTTP request for your application and extends the `Symfony\Component\HttpFoundation\Request` class. Here are some of the highlights.

#### Retrieving the Request URI

```php
$uri = Request::path();
```

#### Retrieving the Request Method

```php
$method = Request::method();

if (Request::isMethod('post')) {
    //
}
```

#### Determining if the Request Path Matches a Pattern

```php
if (Request::is('admin/*')) {
    //
}
```

#### Get the Request URL

```php
$url = Request::url();
```

#### Retrieve a Request URI Segment

```php
$segment = Request::segment(1);
```

#### Retrieving a Request Header

```php
$value = Request::header('Content-Type');
```

#### Retrieving Values from $_SERVER

```php
$value = Request::server('PATH_INFO');
```

#### Determining if the Request is Over HTTPS

```php
if (Request::secure()) {
    //
}
```

#### Determine if the Request is Using AJAX

```php
if (Request::ajax()) {
    //
}
```

#### Determine if the Request has JSON Content Type

```php
if (Request::isJson()) {
    //
}
```

#### Determine if the Request is Asking for JSON

```php
if (Request::wantsJson()) {
    //
}
```

#### Checking the Requested Response Format

The `Request::format` method will return the requested response format based on the HTTP Accept header:

```php
if (Request::format() == 'json') {
    //
}
```
