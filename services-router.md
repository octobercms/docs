# Router service

- [Basic routing](#basic-routing)
- [Route parameters](#route-parameters)
    - [Required parameters](#required-parameters)
    - [Optional parameters](#parameters-optional-parameters)
    - [Regular expression constraints](#parameters-regular-expression-constraints)
- [Named routes](#named-routes)
- [Route groups](#route-groups)
    - [Sub-domain routing](#route-group-sub-domain-routing)
    - [Route prefixes](#route-group-prefixes)
- [Throwing 404 errors](#throwing-404-errors)

<a name="basic-routing"></a>
## Basic routing

While routing is handled automatically for the [backend controllers](../backend/controllers-views-ajax) and CMS pages define their own URL routes in their [page configuration](../cms/pages#configuration), the router service is useful primarily for defining fixed APIs and end points. 

You can define these routes by creating a file named **routes.php** in a same directory as the [plugin registration file](../plugin/registration). The most basic routes simply accept a URI and a `Closure`:

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

#### Registering a route for multiple verbs

Sometimes you may need to register a route that responds to multiple HTTP verbs. You may do so using the `match` method on the `Route` facade:

    Route::match(['get', 'post'], '/', function () {
        return 'Hello World';
    });

You may even register a route that responds to all HTTP verbs using the `any` method:

    Route::any('foo', function () {
        return 'Hello World';
    });

#### Generating URLs to routes

You may generate URLs to your routes using the `Url` facade:

    $url = Url::to('foo');

<a name="route-parameters"></a>
## Route parameters

<a name="required-parameters"></a>
### Required parameters

Sometimes you will need to capture segments of the URI within your route, for example, you may need to capture a user's ID from the URL. You may do so by defining route parameters:

    Route::get('user/{id}', function ($id) {
        return 'User '.$id;
    });

You may define as many route parameters as required by your route:

    Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
        //
    });

Route parameters are always encased within singular *curly brackets*. The parameters will be passed into your route's `Closure` when the route is executed.

> **Note:** Route parameters cannot contain the `-` character. Use an underscore (`_`) instead.

<a name="parameters-optional-parameters"></a>
### Optional parameters

Occasionally you may need to specify a route parameter, but make the presence of that route parameter optional. You may do so by placing a `?` mark after the parameter name:

    Route::get('user/{name?}', function ($name = null) {
        return $name;
    });

    Route::get('user/{name?}', function ($name = 'John') {
        return $name;
    });

<a name="parameters-regular-expression-constraints"></a>
### Regular expression constraints

You may constrain the format of your route parameters using the `where` method on a route instance. The `where` method accepts the name of the parameter and a regular expression defining how the parameter should be constrained:

    Route::get('user/{name}', function ($name) {
        //
    })->where('name', '[A-Za-z]+');

    Route::get('user/{id}', function ($id) {
        //
    })->where('id', '[0-9]+');

    Route::get('user/{id}/{name}', function ($id, $name) {
        //
    })->where(['id' => '[0-9]+', 'name' => '[a-z]+']);

<a name="named-routes"></a>
## Named routes

Named routes allow you to conveniently generate URLs or redirects for a specific route. You may specify a name for a route using the `as` array key when defining the route:

    Route::get('user/profile', ['as' => 'profile', function () {
        //
    }]);

#### Route groups & named routes

If you are using [route groups](#route-groups), you may specify an `as` keyword in the route group attribute array, allowing you to set a common route name prefix for all routes within the group:

    Route::group(['as' => 'admin::'], function () {
        Route::get('dashboard', ['as' => 'dashboard', function () {
            // Route named "admin::dashboard"
        }]);
    });

#### Generating URLs to named routes

Once you have assigned a name to a given route, you may use the route's name when generating URLs or redirects via the `Url::route` method:

    $url = Url::route('profile');

    $redirect = Response::redirect()->route('profile');

If the route defines parameters, you may pass the parameters as the second argument to the `route` method. The given parameters will automatically be inserted into the URL:

    Route::get('user/{id}/profile', ['as' => 'profile', function ($id) {
        //
    }]);

    $url = Url::route('profile', ['id' => 1]);

<a name="route-groups"></a>
## Route groups

Route groups allow you to share route attributes across a large number of routes without needing to define those attributes on each individual route. Shared attributes are specified in an array format as the first parameter to the `Route::group` method.

<a name="route-group-sub-domain-routing"></a>
### Sub-domain routing

Route groups may also be used to route wildcard sub-domains. Sub-domains may be assigned route parameters just like route URIs, allowing you to capture a portion of the sub-domain for usage in your route or controller. The sub-domain may be specified using the `domain` key on the group attribute array:

    Route::group(['domain' => '{account}.myapp.com'], function () {
        Route::get('user/{id}', function ($account, $id) {
            //
        });
    });

<a name="route-group-prefixes"></a>
### Route prefixes

The `prefix` group array attribute may be used to prefix each route in the group with a given URI. For example, you may want to prefix all route URIs within the group with `admin`:

    Route::group(['prefix' => 'admin'], function () {
        Route::get('users', function () {
            // Matches The "/admin/users" URL
        });
    });

You may also use the `prefix` parameter to specify common parameters for your grouped routes:

    Route::group(['prefix' => 'accounts/{account_id}'], function () {
        Route::get('detail', function ($account_id) {
            // Matches The accounts/{account_id}/detail URL
        });
    });

<a name="throwing-404-errors"></a>
## Throwing 404 errors

There are two ways to manually trigger a 404 error from a route. First, you may use the `abort` helper. The `abort` helper simply throws a `Symfony\Component\HttpFoundation\Exception\HttpException` with the specified status code:

    App::abort(404);

Secondly, you may manually throw an instance of `Symfony\Component\HttpKernel\Exception\NotFoundHttpException`.

More information on handling 404 exceptions and using custom responses for these errors may be found in the [errors & logging](../services/error-log) section of the documentation.