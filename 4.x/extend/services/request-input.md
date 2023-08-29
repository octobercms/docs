# Request & Input

## Basic Input

You may access all user input with a few simple methods. You do not need to worry about the HTTP verb for the request when using the `Input` facade, as input is accessed in the same way for all verbs. The global `input` [helper function](./helpers.md) is an alias for `Input::get`.

#### Retrieving an Input Value

```php
$name = Input::get('name');

$name = input('name');
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

Fetch individual input value.

```php
Input::old('username');
```

Fetch all old input values.

```php
$data = Input::old();
```

## Files

You can retrieve  uploaded files from the request using the `file` method on the `Input` facade or the global `files()` helper.

```php
$file = Input::file('photo');

$file = files('photo');
```

To determine if a file is present on the request, use the `hasFile` method.

```php
if (Input::hasFile('photo')) {
    //
}
```

In addition to checking if the file is present, you may verify that there were no problems uploading the file via the isValid method.

```php
if ($file->isValid()) {
    //
}
```

The returned file object has a variety of methods related to the uploaded file.

Method Name | Purpose
------------- | -------------
**move($destinationPath, $fileName)** | Moves the uploaded file to a local path
**store($folder, $disk)** | Stores the file using the [storage service](../../extend/services/storage.md).
**storeAs($folder, $name, $disk)** | Stores the file with a specific name using the [storage service](../../extend/services/storage.md).
**extension()** | Guesses the extension based on the file contents
**getRealPath()** | Returns the local path
**getClientOriginalName()** | Returns the original name
**getClientOriginalExtension()** | Returns the original extension
**getSize()** | Returns the size
**getMimeType()** | Returns the MIME type

An example of moving an uploaded file.

```php
$file->move($destinationPath);

$file->move($destinationPath, $fileName);
```

Examples of [storing an uploaded file](./storage.md) in a folder (first argument) and an optional disk (second argument).

```php
$file->store($folder);

$file->store($folder, 's3');
```

::: warning
The folder names `media`, `resources`, `uploads` or `public` are reserved.
:::

Examples of `storeAs` storing the file with a custom disk name (second argument). The `storePubliclyAs` stores the file with public visibility.

```php
$file->storeAs($folder, 'avatar');

$file->storeAs($folder, 'avatar', 's3');

$file->storePublicly($folder, 's3');

$file->storePubliclyAs($folder, 'avatar', 's3');
```

An example of retrieving the path to an uploaded file.

```php
$path = $file->getRealPath();
```

An example of retrieving the original name of an uploaded file.

```php
$name = $file->getClientOriginalName();
```

Retrieving the extension of an uploaded file.

```php
$extension = $file->getClientOriginalExtension();
```

Retrieving the size of an uploaded file.

```php
$size = $file->getSize();
```

Retrieving the MIME type of an uploaded file.

```php
$mime = $file->getMimeType();
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
