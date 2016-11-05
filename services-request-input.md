# Requests & Input

- [Basic input](#basic-input)
- [Cookies](#cookies)
- [Old input](#old-input)
- [Files](#files)
- [Request information](#request-information)

<a name="basic-input"></a>
## Basic input

You may access all user input with a few simple methods. You do not need to worry about the HTTP verb for the request when using the `Input` facade, as input is accessed in the same way for all verbs. The global `input()` [helper function](../services/helpers) is an alias for `Input::get`.

#### Retrieving an input value

    $name = Input::get('name');

#### Retrieving a default value if the input value is absent

    $name = Input::get('name', 'Sally');

#### Determining if an input value is present

    if (Input::has('name')) {
        //
    }

#### Getting all input for the request

    $input = Input::all();

#### Getting only some of the request input

    $input = Input::only('username', 'password');

    $input = Input::except('credit_card');

When working on forms with "array" inputs, you may use dot notation to access the arrays:

    $input = Input::get('products.0.name');

> **Note:** Some JavaScript libraries such as Backbone may send input to the application as JSON. You may access this data via `Input::get` like normal.

<a name="cookies"></a>
## Cookies

All cookies created by the October are encrypted and signed with an authentication code, meaning they will be considered invalid if they have been changed by the client.

#### Retrieving a cookie value

    $value = Cookie::get('name');

#### Attaching a new cookie to a response

    $response = Response::make('Hello World');

    $response->withCookie(Cookie::make('name', 'value', $minutes));

#### Queueing a cookie for the next response

If you would like to set a cookie before a response has been created, use the `Cookie::queue()` method. The cookie will automatically be attached to the final response from your application.

    Cookie::queue($name, $value, $minutes);

#### Creating a cookie that lasts forever

    $cookie = Cookie::forever('name', 'value');

<a name="old-input"></a>
## Old input

You may need to keep input from one request until the next request. For example, you may need to re-populate a form after checking it for validation errors.

#### Flashing input to the session

    Input::flash();

#### Flashing only some input to the session

    Input::flashOnly('username', 'email');

    Input::flashExcept('password');

Since you often will want to flash input in association with a redirect to the previous page, you may easily chain input flashing onto a redirect.

    return Redirect::to('form')->withInput();

    return Redirect::to('form')->withInput(Input::except('password'));

> **Note:** You may flash other data across requests using the [Session](../services/session) class.

#### Retrieving old data

    Input::old('username');

<a name="files"></a>
## Files

#### Retrieving an uploaded file

    $file = Input::file('photo');

#### Determining if a file was uploaded

    if (Input::hasFile('photo')) {
        //
    }

The object returned by the `file` method is an instance of the `Symfony\Component\HttpFoundation\File\UploadedFile` class, which extends the PHP `SplFileInfo` class and provides a variety of methods for interacting with the file.

#### Determining if an uploaded file is valid

    if (Input::file('photo')->isValid()) {
        //
    }

#### Moving an uploaded file

    Input::file('photo')->move($destinationPath);

    Input::file('photo')->move($destinationPath, $fileName);

#### Retrieving the path to an uploaded file

    $path = Input::file('photo')->getRealPath();

#### Retrieving the original name of an uploaded file

    $name = Input::file('photo')->getClientOriginalName();

#### Retrieving the extension of an uploaded file

    $extension = Input::file('photo')->getClientOriginalExtension();

#### Retrieving the size of an uploaded file

    $size = Input::file('photo')->getSize();

#### Retrieving the MIME type of an uploaded file

    $mime = Input::file('photo')->getMimeType();

<a name="request-information"></a>
## Request information

The `Request` class provides many methods for examining the HTTP request for your application and extends the `Symfony\Component\HttpFoundation\Request` class. Here are some of the highlights.

#### Retrieving the request URI

    $uri = Request::path();

#### Retrieving the request method

    $method = Request::method();

    if (Request::isMethod('post')) {
        //
    }

#### Determining if the request path matches a pattern

    if (Request::is('admin/*')) {
        //
    }

#### Get the request URL

    $url = Request::url();

#### Retrieve a request URI segment

    $segment = Request::segment(1);

#### Retrieving a request header

    $value = Request::header('Content-Type');

#### Retrieving values from $_SERVER

    $value = Request::server('PATH_INFO');

#### Determining if the request is over HTTPS

    if (Request::secure()) {
        //
    }

#### Determine if the request is using AJAX

    if (Request::ajax()) {
        //
    }

#### Determine if the request has JSON content type

    if (Request::isJson()) {
        //
    }

#### Determine if the request is asking for JSON

    if (Request::wantsJson()) {
        //
    }

#### Checking the requested response format

The `Request::format` method will return the requested response format based on the HTTP Accept header:

    if (Request::format() == 'json') {
        //
    }
