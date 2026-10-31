---
previousPath: extend/services/response-view.md
subtitle: Return strings, JSON, files and redirects as responses, and render view templates from your plugin.
---
# Response & View

A response is what your code sends back to the browser, such as a string, JSON data, a file or a redirect. Use the `Response` facade to build one with a custom status code or headers.

```php
return Response::make('Page not found', 404);
```

## Returning a Response

You can return a response from almost any PHP method that the page uses. This includes all the CMS methods in the [Layout Execution Life Cycle](../../themes/layouts.md) and [AJAX handler definitions](../../themes/ajax/handlers.md).

#### Returning Strings From a CMS Method

Returning a string from a CMS page, layout or component method stops the page process and overrides the default behavior. Here the "Hello World" string is displayed instead of the page.

```php
public function onStart()
{
    return 'Hello World';
}
```

#### Returning Strings From AJAX Handlers

Returning a string from an AJAX handler adds the string to the response collection using the default key of `result`. Requested partials are still included in the response.

```php
public function onDoSomething()
{
    return 'Hello World';
    // ['result' => 'Hello World']
}
```

#### Returning Strings From Routes

Returning a string from a [route definition](./routing.md) works the same as a CMS method and displays the string as the response.

```php
Route::get('/', function() {
    return 'Hello World';
});
```

#### Creating Custom Responses

For more control, return a `Response` object. It provides a variety of methods for building HTTP responses, covered in the rest of this article.

```php
$contents = 'Page not found';
$statusCode = 404;
return Response::make($contents, $statusCode);
```

### Attaching Headers to Responses

Most response methods are chainable, so you can build a response fluently. For example, use the `header` method to add several headers to the response before sending it to the user.

```php
return Response::make($content)
    ->header('Content-Type', $type)
    ->header('X-Header-One', 'Header Value')
    ->header('X-Header-Two', 'Header Value');
```

For example, you can return an XML response.

```php
return Response::make($xmlString)->header('Content-Type', 'text/xml');
```

### Attaching Cookies to Responses

The `withCookie` method generates a cookie and attaches it to the response instance.

```php
return Response::make($content)->withCookie('name', 'value');
```

The `withCookie` method accepts more optional arguments to customize the cookie's properties.

```php
->withCookie($name, $value, $minutes, $path, $domain, $secure, $httpOnly)
```

## Returning Other Response Types

The `Response` facade can also generate other types of response instances.

### View Responses

To return a view as the response content while keeping access to the `Response` class methods, use the `Response::view` method.

```php
return Response::view('acme.blog::hello')->header('Content-Type', $type);
```

### JSON Responses

The `json` method sets the `Content-Type` header to application/json, and converts the given array to JSON using the `json_encode` PHP function.

```php
return Response::json(['name' => 'Steve', 'state' => 'CA']);
```

To create a JSONP response, use the `json` method together with `setCallback`.

```php
return Response::json(['name' => 'Steve', 'state' => 'CA'])
    ->setCallback(Input::get('callback'));
```

### File Downloads

The `download` method generates a response that makes the user's browser download the file at the given path (first argument). It optionally accepts the file name the user sees when downloading (second argument), and an array of HTTP headers (third argument).

```php
return Response::download($pathToFile);

return Response::download($pathToFile, $name, $headers);

return Response::download($pathToFile)->deleteFileAfterSend(true);
```

#### Streamed Downloads

To turn a string into a download without writing it to disk, use the `streamDownload` method. It accepts a callback (first argument), a file name (second argument) and an optional array of headers (third argument).

```php
return Response::streamDownload(function() {
    echo 'CSV Contents...';
}, 'export.csv');
```

### File Responses

The `file` method displays a file, such as an image or PDF, directly in the user's browser instead of downloading it. It accepts the path to the file (first argument) and an array of headers (second argument).

```php
return Response::file($pathToFile);

return Response::file($pathToFile, $headers);
```

## Redirecting the User

Redirect responses are usually instances of the `Illuminate\Http\RedirectResponse` class, and contain the headers needed to send the user to another URL. The simplest way to create one is the `to` method on the `Redirect` facade.

```php
return Redirect::to('user/login');
```

### Returning a Redirect with Flash Data

You usually redirect to a new URL and [flash data to the session](./session.md) at the same time. You can do both in a single method chain.

```php
return Redirect::to('user/login')->with('message', 'Login Failed');
```

::: tip
The `with` method flashes data to the session, so you can retrieve it with the `Session::get` method.
:::

#### Redirecting to the Previous URL

To send the user back to their previous location, such as after a form submission, use the `back` method.

```php
return Redirect::back();

return Redirect::back()->withInput();
```

#### Redirecting to the Current Page

To refresh the current page, use the `refresh` method.

```php
return Redirect::refresh();
```

## Creating Response Macros

To define a custom response that you can reuse across your routes and controllers, use the `Response::macro` method.

```php
Response::macro('caps', function($value) {
    return Response::make(strtoupper($value));
});
```

The `macro` function accepts a name (first argument) and a Closure (second argument). The Closure runs when you call the macro name on the `Response` class.

```php
return Response::caps('foo');
```

Define your macros in the `boot` method of a [plugin registration file](../plugins/extending.md). Plugins can also supply a file named **init.php** in the plugin directory for macro registrations.

## Rendering Views

Views store system based presentation logic, such as markup used by an API or endpoint, or markup shared by the CMS and backend areas. The [Mail service](./mail.md) also uses views for default template content. Views are usually stored in the **views** directory of a plugin.

A simple view looks like this.

```twig
<!-- View stored in plugins/acme/blog/views/greeting.htm -->

<html>
    <body>
        <h1>Hello, {{ name }}</h1>
    </body>
</html>
```

Views can also use PHP templating with the `.php` extension.

```php
<!-- View stored in plugins/acme/blog/views/greeting.php -->

<html>
    <body>
        <h1>Hello, <?= $name ?></h1>
    </body>
</html>
```

Return the view to the browser with the `View::make` method.

```php
return View::make('acme.blog::greeting', ['name' => 'Charlie']);
```

The first argument is a "path hint" that contains the plugin name, followed by two colons `::` and the view file name. The second argument is an array of data to make available to the view.

::: tip
The path hint is case sensitive and the plugin name should always be in lowercase.
:::

#### Passing Data to Views

```php
// Using conventional approach
$view = View::make('acme.blog::greeting')->with('name', 'Steve');

// Using magic methods
$view = View::make('acme.blog::greeting')->withName('Steve');
```

In the example above, the view can access the `name` variable, which contains `Steve`. To pass an array of data instead, use the second argument of the `make` method.

```php
$view = View::make('acme.blog::greeting', $data);
```

You can also share a piece of data across all views.

```php
View::share('name', 'Steve');
```

#### Passing a Sub-view to a View

You can pass a view into another view. For example, given a sub-view stored at **plugins/acme/blog/views/child/view.php**, pass it to another view like this.

```php
$view = View::make('acme.blog::greeting')->nest('child', 'acme.blog::child.view');

$view = View::make('acme.blog::greeting')->nest('child', 'acme.blog::child.view', $data);
```

The parent view can then render the sub-view.

```twig
<html>
    <body>
        <h1>Hello!</h1>
        {{ child|raw }}
    </body>
</html>
```

#### Determining If a View Exists

To check if a view exists, use the `View::exists` method.

```php
if (View::exists('acme.blog::mail.customer')) {
    //
}
```

#### See Also

::: also
* [File Downloads](../../themes/ajax/downloads.md)
* [Laravel Responses](https://laravel.com/docs/12.x/responses)
* [Laravel Views](https://laravel.com/docs/12.x/views)
:::
