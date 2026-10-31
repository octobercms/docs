---
previousPath: extend/system/routing.md
subtitle: Define custom routes and middleware in your plugin to build APIs and other fixed endpoints.
---
# Routing & Middleware

Plugins can define custom URL routes in a file named **routes.php**, using the [Laravel router service](https://laravel.com/docs/12.x/routing). You do not need this for [backend controllers](../panel/controllers.md), which are routed automatically, or for CMS pages, which set their URL in the [page configuration](../../themes/pages.md).

::: dir
├── plugins
|   └── acme  _← Author Name_
|       └── blog  _← Plugin Name_
|           ├── controllers
|           ├── models
|           ├── Plugin.php
|           └── `routes.php`  _← Routes File_
:::

Routes are defined in PHP using the `Route` facade. The following route responds to a GET request at **https://yoursite.tld/api_acme_blog/cleanup_posts**.

```php
Route::get('api_acme_blog/cleanup_posts', function() {
    return Posts::cleanUp();
});
```

Use the `Url` facade to generate a URL to your route.

```php
$url = Url::to('api_acme_blog/cleanup_posts');
```

## Defining Routes

Each HTTP method has a matching method on the `Route` facade: `get`, `post`, `patch`, `put`, `options` and `delete`. The most basic route accepts a URI and a `Closure`.

```php
Route::get('/', function () {
    return 'Hello World';
});

Route::post('foo/bar', function () {
    return 'Hello World';
});

Route::put('foo/bar', function () {
    //
});

Route::delete('foo/bar', function () {
    //
});
```

### Registering Multiple Methods

To register a route that responds to several HTTP methods, use the `match` method.

```php
Route::match(['get', 'post'], '/', function () {
    return 'Hello World';
});
```

To register a route that responds to all HTTP methods, use the `any` method.

```php
Route::any('foo', function () {
    return 'Hello World';
});
```

## Routing to a Class

For larger applications, organize your routes in classes instead of closures. The best place for these classes is the **handlers** directory. Reference the route as an array containing the class name and method name. In this example, the `/install` route maps to the `install` method of the `Installer` class.

```php
Route::any('/install', [Installer::class, 'install']);
```

Next, define the class and its method. In this example the file is located at **app/handlers/Installer.php**.

```php
namespace App\Handlers;

class Installer extends \Illuminate\Routing\Controller
{
    /**
     * Route: /install
     */
    public function install()
    {
        return 'Welcome!';
    }
}
```

## Route Parameters

To capture a segment of the URI, define a route parameter. For example, you can capture a user's ID from the URL.

```php
Route::get('user/{id}', function ($id) {
    return 'User '.$id;
});
```

You can define as many route parameters as your route needs.

```php
Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
    //
});
```

Route parameters are always wrapped in single curly braces. Their values are passed to the route's `Closure` when the route runs.

::: warning
Route parameters cannot contain the `-` character. Use an underscore (`_`) instead.
:::

### Optional Parameters

To make a route parameter optional, place a `?` after the parameter name and give the matching variable a default value.

```php
Route::get('user/{name?}', function ($name = null) {
    return $name;
});

Route::get('user/{name?}', function ($name = 'John') {
    return $name;
});
```

### Regular Expression Constraints

To constrain the format of a route parameter, call the `where` method on the route. It accepts the parameter name and a regular expression that the parameter must match.

```php
Route::get('user/{name}', function ($name) {
    //
})->where('name', '[A-Za-z]+');

Route::get('user/{id}', function ($id) {
    //
})->where('id', '[0-9]+');

Route::get('user/{id}/{name}', function ($id, $name) {
    //
})->where(['id' => '[0-9]+', 'name' => '[a-z]+']);
```

## Naming Routes

A named route lets you generate URLs or redirects for that route. Set the name with the `as` array key when you define the route.

```php
Route::get('user/profile', ['as' => 'profile', function () {
    //
}]);
```

#### Naming Routes in a Group

When you use [route groups](#grouping-routes), set the `as` key in the group attributes to give every route in the group a common name prefix.

```php
Route::group(['as' => 'admin::'], function () {
    Route::get('dashboard', ['as' => 'dashboard', function () {
        // Route named "admin::dashboard"
    }]);
});
```

#### Generating URLs to Named Routes

Once a route has a name, use it to generate a URL with the `Url::route` method, or a redirect with the `Redirect::route` method.

```php
$url = Url::route('profile');

$redirect = Redirect::route('profile');
```

If the route defines parameters, pass them as the second argument to the `route` method. They are inserted into the URL.

```php
Route::get('user/{id}/profile', ['as' => 'profile', function ($id) {
    //
}]);

$url = Url::route('profile', ['id' => 1]);
```

## Grouping Routes

Route groups share attributes across many routes, so you do not need to define them on each route. Pass the shared attributes as an array to the first argument of the `Route::group` method.

### Sub-domain Routing

Route groups can also route wildcard sub-domains. A sub-domain accepts route parameters like a route URI does, so you can capture part of the sub-domain for use in your route. Set the sub-domain with the `domain` key in the group attributes.

```php
Route::group(['domain' => '{account}.example.tld'], function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
```

### Route Prefixes

The `prefix` attribute adds a URI prefix to each route in the group. For example, to prefix every route URI in the group with `admin`:

```php
Route::group(['prefix' => 'admin'], function () {
    Route::get('users', function () {
        // Matches The "/admin/users" URL
    });
});
```

You can also use the `prefix` attribute to define parameters shared by the grouped routes.

```php
Route::group(['prefix' => 'accounts/{account_id}'], function () {
    Route::get('detail', function ($account_id) {
        // Matches The accounts/{account_id}/detail URL
    });
});
```

## Adding Middleware to Routes

To add middleware to a single route, call the `middleware` method on the route.

```php
Route::get('info', [\App\News::class, 'info'])->middleware(\Path\To\Your\Middleware::class);
```

To add middleware to a route group, use the `middleware` attribute.

```php
Route::group(['middleware' => \Path\To\Your\Middleware::class], function() {
    Route::get('info', [\App\News::class, 'info']);
});
```

You can also call the `middleware` method first and then chain the `group` method. The middleware applies to every route inside the group.

```php
Route::middleware([\Path\To\Your\Middleware::class])->group(function() {
    Route::get('info', [\App\News::class, 'info']);
});
```

Each example uses one middleware for brevity, but you can add more than one. To run middleware on every request instead, see [Registering Global Middleware](#registering-global-middleware).

## Registering Global Middleware

To register a global middleware, extend the `Cms\Classes\CmsController` or `Backend\Classes\BackendController` class in the `boot` method of your plugin.

```php
public function boot()
{
    \Cms\Classes\CmsController::extend(function($controller) {
        $controller->middleware(\App\Middleware::class);
    });
}
```

Alternatively, push the middleware directly into the HTTP kernel from the `boot` method.

```php
public function boot()
{
    // Add a new middleware to beginning of the stack.
    $this->app[\Illuminate\Contracts\Http\Kernel::class]
        ->prependMiddleware(\App\Middleware::class);

    // Add a new middleware to end of the stack.
    $this->app[\Illuminate\Contracts\Http\Kernel::class]
        ->pushMiddleware(\App\Middleware::class);
}
```

## Throwing 404 Errors

There are two ways to trigger a 404 error from a route. The first is the `App::abort` method, which throws a `Symfony\Component\HttpKernel\Exception\HttpException` with the given status code.

```php
App::abort(404);
```

The second is to throw an instance of `October\Rain\Exception\NotFoundException`. To learn how to handle 404 errors and return custom responses for them, see the [Exceptions](./exceptions.md) article.

#### See Also

::: also
* [Response & View](./response-view.md)
* [Laravel Routing](https://laravel.com/docs/12.x/routing)
* [Eloquent API Resources](https://laravel.com/docs/12.x/eloquent-resources)
:::
