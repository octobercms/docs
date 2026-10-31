---
previousPath: extend/services/http.md
subtitle: Send HTTP requests to other applications and services, and inspect their responses.
---
# HTTP Client

The `Http` class opens connections over the HTTP protocol, so you can make outgoing requests to other applications and services. The Laravel framework supplies this client, and you can learn about all of its features in the [Laravel documentation article](https://laravel.com/docs/12.x/http-client).

```php
$response = Http::get('https://octobercms.com');
```

## Making a Request

Each HTTP method has a matching PHP method: `get`, `post`, `patch`, `put`, `options` and `delete`. The following is an example of a basic `GET` request to a URL. The result is a response object.

```php
$response = Http::get('https://octobercms.com');
```

To inspect a request, prefix the method call with `dd()`. This dumps the contents of the request and stops execution.

```php
Http::dd()->get('https://octobercms.com');
```

## Handling the Response

The response object provides methods to inspect the response.

```php
$result = Http::post('https://octobercms.com');
echo $result->body();                  // Outputs: <html><head><title>...
echo $result->status();                // Outputs: 200
echo $result->header('Content-Type');  // Outputs: text/html; charset=UTF-8
```

The object supports the following method calls.

Method Name | Return Type | Purpose
------------- | ------------- | -------------
**body()** | `string` | Get the body of the response.
**json($key)** | `array\|mixed` | Get the JSON decoded body of the response as an array or scalar value.
**object()** | `object` | Get the JSON decoded body of the response as an object.
**collect($key)** | [Collection](../data/collection-methods.md) | Get the JSON decoded body of the response as a collection.
**status()** | `int` | Get the status code of the response.
**ok()** | `bool` | Determine if the response code was "OK".
**successful()** | `bool` | Determine if the request was successful.
**redirect()** | `bool` | Determine if the response was a redirect.
**failed()** | `bool` | Determine if the response indicates a client or server error occurred.
**serverError()** | `bool` | Determine if the response indicates a server error occurred.
**clientError()** | `bool` | Determine if the response indicates a client error occurred.
**header($header)** | `string` | Get a header from the response.
**headers()** | `array` | Get the headers from the response.

## Sending Request Data

The `post`, `put` and `patch` methods can send extra data with the request. By default the data is sent with the `application/json` content type.

```php
Http::post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

To send the data with the `application/x-www-form-urlencoded` content type instead, call the `asForm` method before making the request.

```php
Http::asForm()->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

When you pass data to a `get` request, the array is added to the query string of the URL.

```php
Http::get('https://octobercms.com', [
    'page' => '1'
]);
```

Use the `withHeaders` method to include custom headers with the request.

```php
Http::withHeaders([
    'Rest-Key' => '...'
])->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

Use the `withBasicAuth` method to pass authentication credentials with the request.

```php
Http::withBasicAuth('user', 'password')->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

## Handling Errors

The HTTP client treats all responses as valid, including errors. To find out if an error occurred, check the response with the `successful`, `failed`, `clientError` or `serverError` methods.

```php
// Status code is >= 200 and < 300
$response->successful();

// Status code is >= 400
$response->failed();

// Response has a 400 level status code
$response->clientError();

// Response has a 500 level status code
$response->serverError();
```

You can also use the `onError` method to run a callback if a client or server error occurs.

```php
$response->onError(callable $callback);
```

#### See Also

::: also
* [Laravel HTTP Client](https://laravel.com/docs/12.x/http-client)
:::
