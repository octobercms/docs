---
previousPath: extend/services/request-input.md
subtitle: Read user input, cookies and uploaded files, and inspect the current request.
---
# Request & Input

Use the `Input` facade to read user input from the current request, and the `Request` facade to inspect the request itself, such as its URL or headers.

```php
$name = Input::get('name');

$url = Request::url();
```

## Retrieving Input

The `Input` facade reads input the same way for every HTTP verb, so you do not need to check which verb the request used. The global `input` [helper function](./helpers.md) is an alias for `Input::get`.

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

When a form uses "array" inputs, use dot notation to access the array values.

```php
$input = Input::get('products.0.name');
```

::: tip
Some JavaScript libraries send input to the application as JSON. You can read this data with `Input::get` as usual.
:::

## Working with Cookies

By default, every cookie created by October CMS is encrypted and signed with an authentication code, so the cookie is considered invalid if the client changes it. Cookies named in the `system.unencrypt_cookies` config key are not encrypted.

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

To set a cookie before the response exists, use the `Cookie::queue` method. The cookie is attached to the final response from your application.

```php
Cookie::queue($name, $value, $minutes);
```

#### Creating a Cookie That Lasts Forever

```php
$cookie = Cookie::forever('name', 'value');
```

#### Handling Cookies Without Encryption

You can exclude some cookies from encryption in the configuration. This is useful when you want to pass data between the browser and the server through cookies, in either direction.

Add the names of these cookies to the `unencrypt_cookies` parameter in the `config/system.php` configuration file.

```php
'unencrypt_cookies' => [
    'my_cookie',
],
```

Plugins can also add them dynamically from the **Plugin.php** file.

```php
public function boot()
{
    Config::push('system.unencrypt_cookies', 'my_cookie');
}
```

## Keeping Input for the Next Request

Sometimes you need to keep input from one request until the next. For example, you may need to fill a form again after it fails validation.

#### Flashing Input to the Session

```php
Input::flash();
```

#### Flashing Only Some Input to the Session

```php
Input::flashOnly('username', 'email');

Input::flashExcept('password');
```

You often flash input while redirecting to the previous page, so you can chain the flash onto the redirect.

```php
return Redirect::to('form')->withInput();

return Redirect::to('form')->withInput(Input::except('password'));
```

::: tip
You can flash other data across requests using the [Session](./session.md) class.
:::

#### Retrieving Old Input

Fetch a single old input value.

```php
Input::old('username');
```

Fetch all old input values.

```php
$data = Input::old();
```

## Handling Uploaded Files

Retrieve an uploaded file from the request with the `file` method on the `Input` facade, or with the global `files()` helper.

```php
$file = Input::file('photo');

$file = files('photo');
```

To check if a file is present on the request, use the `hasFile` method.

```php
if (Input::hasFile('photo')) {
    //
}
```

To check that the file uploaded without problems, use the `isValid` method.

```php
if ($file->isValid()) {
    //
}
```

The returned file object has these methods for working with the uploaded file.

Method Name | Purpose
------------- | -------------
**move($destinationPath, $fileName)** | Moves the uploaded file to a local path
**store($folder, $disk)** | Stores the file using the [storage service](./storage.md).
**storeAs($folder, $name, $disk)** | Stores the file with a specific name using the [storage service](./storage.md).
**extension()** | Guesses the extension based on the file contents
**getRealPath()** | Returns the local path
**getClientOriginalName()** | Returns the original name
**getClientOriginalExtension()** | Returns the original extension
**getSize()** | Returns the size
**getMimeType()** | Returns the MIME type

### Moving and Storing Files

Move an uploaded file to a local path, with an optional file name.

```php
$file->move($destinationPath);

$file->move($destinationPath, $fileName);
```

[Store an uploaded file](./storage.md) in a folder (first argument) on an optional disk (second argument).

```php
$file->store($folder);

$file->store($folder, 's3');
```

::: warning
The folder names `media`, `resources`, `uploads` or `public` are reserved.
:::

The `storeAs` method stores the file with a specific name (second argument) on an optional disk (third argument). The `storePublicly` and `storePubliclyAs` methods store the file with public visibility.

```php
$file->storeAs($folder, 'avatar');

$file->storeAs($folder, 'avatar', 's3');

$file->storePublicly($folder, 's3');

$file->storePubliclyAs($folder, 'avatar', 's3');
```

### Reading File Information

The following examples read the path, original name, original extension, size and MIME type of an uploaded file.

```php
$path = $file->getRealPath();

$name = $file->getClientOriginalName();

$extension = $file->getClientOriginalExtension();

$size = $file->getSize();

$mime = $file->getMimeType();
```

## Inspecting the Request

The `Request` class extends the `Symfony\Component\HttpFoundation\Request` class and provides many methods for examining the HTTP request. Here are some of the highlights.

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

#### Retrieving the Request URL

```php
$url = Request::url();
```

#### Retrieving a Request URI Segment

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

#### Determining if the Request is Using AJAX

```php
if (Request::ajax()) {
    //
}
```

#### Determining if the Request has JSON Content Type

```php
if (Request::isJson()) {
    //
}
```

#### Determining if the Request is Asking for JSON

```php
if (Request::wantsJson()) {
    //
}
```

#### Checking the Requested Response Format

The `Request::format` method returns the requested response format, based on the HTTP Accept header.

```php
if (Request::format() == 'json') {
    //
}
```

#### See Also

::: also
* [Response & View](./response-view.md)
* [File Uploads](../../themes/ajax/uploads.md)
* [Laravel HTTP Requests](https://laravel.com/docs/12.x/requests)
:::
