---
subtitle: Useful for defining fixed APIs and endpoints.
---
# Routing & Middleware

While routing is handled automatically for the [backend controllers](../system/controllers.md) and CMS pages define their own URL routes in their [page configuration](../../cms/themes/pages.md). Plugins can also supply a file named **routes.php** that contain custom routing logic, as defined in the [router service](../services/router.md).

::: dir
├── plugins
|   └── acme _<== Author Name_
|       └── blog _<== Plugin Name_
|           ├── controllers
|           ├── models
|           ├── Plugin.php
|           └── `routes.php` _<== Routes File_
:::

Below is some example content.

```php
Route::get('api_acme_blog/cleanup_posts', function() {
    return Posts::cleanUp();
});
```

## Basic Routing

The most basic routes simply accept a URI and a `Closure`.

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

#### Registering a route for multiple verbs

Sometimes you may need to register a route that responds to multiple HTTP verbs. You may do so using the `match` method on the `Route` facade.

```php
Route::match(['get', 'post'], '/', function () {
    return 'Hello World';
});
```

You may even register a route that responds to all HTTP verbs using the `any` method:

```php
Route::any('foo', function () {
    return 'Hello World';
});
```

#### Generating URLs to routes

You may generate URLs to your routes using the `Url` facade:

```php
$url = Url::to('foo');
```

## Route Parameters

### Required Parameters

Sometimes you will need to capture segments of the URI within your route, for example, you may need to capture a user's ID from the URL. You may do so by defining route parameters:

```php
Route::get('user/{id}', function ($id) {
    return 'User '.$id;
});
```

You may define as many route parameters as required by your route:

```php
Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
    //
});
```

Route parameters are always encased within singular *curly brackets*. The parameters will be passed into your route's `Closure` when the route is executed.

> **Note**: Route parameters cannot contain the `-` character. Use an underscore (`_`) instead.

### Optional Parameters

Occasionally you may need to specify a route parameter, but make the presence of that route parameter optional. You may do so by placing a `?` mark after the parameter name:

```php
Route::get('user/{name?}', function ($name = null) {
    return $name;
});

Route::get('user/{name?}', function ($name = 'John') {
    return $name;
});
```

### Regular Expression Constraints

You may constrain the format of your route parameters using the `where` method on a route instance. The `where` method accepts the name of the parameter and a regular expression defining how the parameter should be constrained:

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

## Named Routes

Named routes allow you to conveniently generate URLs or redirects for a specific route. You may specify a name for a route using the `as` array key when defining the route:

```php
Route::get('user/profile', ['as' => 'profile', function () {
    //
}]);
```

#### Route Groups & Named Routes

If you are using [route groups](#oc-route-groups), you may specify an `as` keyword in the route group attribute array, allowing you to set a common route name prefix for all routes within the group:

```php
Route::group(['as' => 'admin::'], function () {
    Route::get('dashboard', ['as' => 'dashboard', function () {
        // Route named "admin::dashboard"
    }]);
});
```

#### Generating URLs to Named Routes

Once you have assigned a name to a given route, you may use the route's name when generating URLs or redirects via the `Url::route` method:

```php
$url = Url::route('profile');

$redirect = Response::redirect()->route('profile');
```

If the route defines parameters, you may pass the parameters as the second argument to the `route` method. The given parameters will automatically be inserted into the URL:

```php
Route::get('user/{id}/profile', ['as' => 'profile', function ($id) {
    //
}]);

$url = Url::route('profile', ['id' => 1]);
```

<a id="oc-route-groups"></a>
## Route Groups

Route groups allow you to share route attributes across a large number of routes without needing to define those attributes on each individual route. Shared attributes are specified in an array format as the first parameter to the `Route::group` method.

### Sub-domain Routing

Route groups may also be used to route wildcard sub-domains. Sub-domains may be assigned route parameters just like route URIs, allowing you to capture a portion of the sub-domain for usage in your route or controller. The sub-domain may be specified using the `domain` key on the group attribute array:

```php
Route::group(['domain' => '{account}.example.com'], function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
```

### Route Prefixes

The `prefix` group array attribute may be used to prefix each route in the group with a given URI. For example, you may want to prefix all route URIs within the group with `admin`:

```php
Route::group(['prefix' => 'admin'], function () {
    Route::get('users', function () {
        // Matches The "/admin/users" URL
    });
});
```

You may also use the `prefix` parameter to specify common parameters for your grouped routes:

```php
Route::group(['prefix' => 'accounts/{account_id}'], function () {
    Route::get('detail', function ($account_id) {
        // Matches The accounts/{account_id}/detail URL
    });
});
```

### Route Middleware

Registering middleware inside your plugin's `boot()` method will register it globally for each request.
If you want to register middleware to one route at a time you should do it like this:

```php
Route::get('info', 'Acme\News@info')->middleware('Path\To\Your\Middleware');
```

For route groups it could be done like this:

```php
Route::group(['middleware' => 'Path\To\Your\Middleware'], function() {
    Route::get('info', 'Acme\News@info');
});
```

And finally, if you want to assign a group of middleware to just one route you can it like this

```php
Route::middleware(['Path\To\Your\Middleware'])->group(function() {
    Route::get('info', 'Acme\News@info');
});
```

You can of course add more than one middleware in a group, just one is used in the above examples for convenience.

## Global Middleware

To register a global middleware, you can extend the `Cms\Classes\CmsController` or `Backend\Classes\BackendController` controller class by using the following method.

```php
public function boot()
{
    \Cms\Classes\CmsController::extend(function($controller) {
        $controller->middleware(\Path\To\Custom\Middleware::class);
    });
}
```

Alternatively, you can push it directly into the Kernel via the `boot()` registration method.

```php
public function boot()
{
    // Add a new middleware to beginning of the stack.
    $this->app[\Illuminate\Contracts\Http\Kernel::class]
            ->prependMiddleware('Path\To\Custom\Middleware');

    // Add a new middleware to end of the stack.
    $this->app[\Illuminate\Contracts\Http\Kernel::class]
            ->pushMiddleware('Path\To\Custom\Middleware');
}
```

## Throwing 404 Errors

There are two ways to manually trigger a 404 error from a route. First, you may use the `abort` helper. The `abort` helper simply throws a `Symfony\Component\HttpFoundation\Exception\HttpException` with the specified status code:

```php
App::abort(404);
```

Secondly, you may manually throw an instance of `Symfony\Component\HttpKernel\Exception\NotFoundHttpException`.

More information on handling 404 exceptions and using custom responses for these errors may be found in the [errors & logging](../services/error-log) section of the documentation.
