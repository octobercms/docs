# Views & Responses

- [Basic responses](#basic-responses)
    - [Attaching headers to responses](#attaching-headers-to-responses)
    - [Attaching cookies to responses](#attaching-cookies-to-responses)
- [Other response types](#other-response-types)
    - [View responses](#view-responses)
    - [JSON responses](#json-responses)
    - [File downloads](#file-downloads)
- [Redirects](#redirects)
    - [Returning a redirect with flash data](#redirect-flash-data)
    - [Redirecting to the previous URL](#redirecting-previous-url)
    - [Redirecting to the current page](#redirecting-current-page)
- [Response macros](#response-macros)
- [Views](#views)

<a name="basic-responses"></a>
## Basic responses

A response can be returned from almost PHP method that is used by the page. This includes all the CMS methods contained in the [layout execution life cycle](../cms/layouts#layout-life-cycle) and [AJAX handler definitions](../ajax/handlers).

#### Returning strings from a CMS method

Returning a string from a CMS page, layout or component method will halt the process at this point and override the default behavior, so here it will display the "Hello World" string instead of displaying the page.

    public function onStart()
    {
        return 'Hello World';
    }

#### Returning strings from AJAX handlers

Returning a string from an AJAX handler will add the string to the response collection using the default key of `result`. Requested partials will still be included in the response.

    public function onDoSomething()
    {
        return 'Hello World';
        // ['result' => 'Hello World']
    }

#### Returning strings from routes

Returning a string from a [route definition](../services/router) will act the same as a CMS method and display the string as the response.

    Route::get('/', function() {
        return 'Hello World';
    });

#### Creating custom responses

For a more robust solution, returning a `Response` object providing a variety of methods for building HTTP responses. We will explore this topic further in this article.

    $contents = 'Page not found';
    $statusCode = 404;
    return Response::make($contents, $statusCode);

<a name="attaching-headers-to-responses"></a>
### Attaching headers to responses

Keep in mind that most response methods are chainable, allowing for the fluent building of responses. For example, you may use the `header` method to add a series of headers to the response before sending it back to the user:

    return Response::make($content)
                ->header('Content-Type', $type)
                ->header('X-Header-One', 'Header Value')
                ->header('X-Header-Two', 'Header Value');

A practical example of this could be returning an XML response:

    return Response::make($xmlString)->header('Content-Type', 'text/xml');

<a name="attaching-cookies-to-responses"></a>
### Attaching cookies to responses

The `withCookie` method  allows you to easily attach cookies to the response. For example, you may use the withCookie method to generate a cookie and attach it to the response instance:

    return Response::make($content)->withCookie('name', 'value');

The `withCookie` method accepts additional optional arguments which allow you to further customize your cookie's properties:

    ->withCookie($name, $value, $minutes, $path, $domain, $secure, $httpOnly)

<a name="other-response-types"></a>
## Other response types

The `Response` facade may be used to conveniently generate other types of response instances.

<a name="view-responses"></a>
### View responses

If you need access to the `Response` class methods, but want to return a [view](#views) as the response content, you may use the `Response::view` method for convenience:

    return Response::view('acme.blog::hello')->header('Content-Type', $type);

<a name="json-responses"></a>
### JSON responses

The `json` method will automatically set the `Content-Type` header to application/json, as well as convert the given array into JSON using the `json_encode` PHP function:

    return Response::json(['name' => 'Steve', 'state' => 'CA']);

If you would like to create a JSONP response, you may use the `json` method in addition to `setCallback`:

    return Response::json(['name' => 'Steve', 'state' => 'CA'])
        ->setCallback(Input::get('callback'));

<a name="file-downloads"></a>
### File downloads

The `download` method may be used to generate a response that forces the user's browser to download the file at the given path. The `download` method accepts a file name as the second argument to the method, which will determine the file name that is seen by the user downloading the file. Finally, you may pass an array of HTTP headers as the third argument to the method:

    return Response::download($pathToFile);

    return Response::download($pathToFile, $name, $headers);

    return Response::download($pathToFile)->deleteFileAfterSend(true);

> **Note:** Symfony HttpFoundation, which manages file downloads, requires the file being downloaded to have an ASCII file name.

<a name="redirects"></a>
## Redirects

Redirect responses are typically instances of the `Illuminate\Http\RedirectResponse` class, and contain the proper headers needed to redirect the user to another URL. The simplest way to generate a `RedirectResponse` instance is to use the `to` method on the `Redirect` facade.

    return Redirect::to('user/login');

<a name="redirect-flash-data"></a>
### Returning a redirect with flash data

Redirecting to a new URL and [flashing data to the session](../services/session) are typically done at the same time. So, for convenience, you may create a `RedirectResponse` instance and flash data to the session in a single method chain:

    return Redirect::to('user/login')->with('message', 'Login Failed');

> **Note:** Since the `with` method flashes data to the session, you may retrieve the data using the typical `Session::get` method.

<a name="redirecting-previous-url"></a>
#### Redirecting to the previous URL

You may wish to redirect the user to their previous location, for example, after a form submission. You can do so by using the `back` method:

    return Redirect::back();

    return Redirect::back()->withInput();

<a name="redirecting-current-page"></a>
#### Redirecting to the current page

Sometimes you want to simply refresh the current page, you can do this using the `refresh` method:

    return Redirect::refresh();

<a name="response-macros"></a>
## Response macros

If you would like to define a custom response that you can re-use in a variety of your routes and controllers, you may use the `Response::macro` method:

    Response::macro('caps', function($value) {
        return Response::make(strtoupper($value));
    });

The `macro` function accepts a name as its first argument, and a Closure as its second. The macro's Closure will be executed when calling the macro name on the `Response` class:

    return Response::caps('foo');

You may define your macros in the `boot()` method of a [Plugin registration file](../plugin/registration#registration-methods). Alternatively, plugins can supply a file named **init.php** in the plugin directory that you can use to place macro registrations.

<a name="views"></a>
## Views

Views are a great way to store system based presentation logic, such as markup used by an API or end point, or markup that is shared with the CMS and back-end areas. Views are also used by the [Mail service](../services/mail) for providing default template content. Views are typically stored in the `views` directory of a plugin.

A simple view could look something like this:

    <!-- View stored in plugins/acme/blog/views/greeting.htm -->

    <html>
        <body>
            <h1>Hello, {{ name }}</h1>
        </body>
    </html>

Views can also be parsed using PHP templating by using the `.php` extension:

    <!-- View stored in plugins/acme/blog/views/greeting.php -->

    <html>
        <body>
            <h1>Hello, <?php echo $name; ?></h1>
        </body>
    </html>

This view may be returned to the browser using the `View::make` method:

    return View::make('acme.blog::greeting', ['name' => 'Charlie']);

The first argument is a "path hint" that contains the plugin name, separated by two colons `::`, followed by the view file name. The second argument passed to `View::make` is an array of data that should be made available to the view.

> **Note**: The path hint is case sensitive and the plugin name should always be in lowercase.

#### Passing data to views

    // Using conventional approach
    $view = View::make('acme.blog::greeting')->with('name', 'Steve');

    // Using magic methods
    $view = View::make('acme.blog::greeting')->withName('steve');

In the example above the variable `name` would be accessible from the view, and would contain `Steve`. As above, if you want to pass an array of data, you may do so as the second argument given to the `make` method:

    $view = View::make('acme.blog::greeting', $data);

It is also possible to share a piece of data across all views:

    View::share('name', 'Steve');

#### Passing a sub-view to a view

Sometimes you may wish to pass a view into another view. For example, given a sub-view stored at `plugins/acme/blog/views/child/view.php`, we could pass it to another view like so:

    $view = View::make('acme.blog::greeting')->nest('child', 'acme.blog::child.view');

    $view = View::make('acme.blog::greeting')->nest('child', 'acme.blog::child.view', $data);

The sub-view can then be rendered from the parent view:

    <html>
        <body>
            <h1>Hello!</h1>
            {{ child|raw }}
        </body>
    </html>

#### Determining if a view exists

If you need to check if a view exists, use the `View::exists` method:

    if (View::exists('acme.blog::mail.customer')) {
        //
    }
