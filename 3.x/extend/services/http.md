# HTTP Client

The `Http` class provides features used for opening connections via the HTTP protocol. You can use it to make outgoing connections to other applications and services. This client is supplied by the Laravel framework and you can learn about all the possible features in the [Laravel documentation article](https://laravel.com/docs/9.x/http-client).

## Basic Usage

To make requests, the PHP method will assocaite to the HTTP method, which supports `get`, `post`, `patch`, `put`, `options` and `delete`. The following is an example of a basic `GET` request to a URL. The returned result will contain a response object.

```php
$response = Http::get('https://octobercms.com');
```

You can quickly and easily inspect the contents of a request by prefixing the method call with `dd()`. This will dump the contents of the request and terminate the execution.

```php
Http::dd()->get('https://octobercms.com');
```

## Handling the Response

The response object will provide methods that can be used to inspect the response.

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
**json($key)** | `array|mixed` | Get the JSON decoded body of the response as an array or scalar value.
**object()** | `object` | Get the JSON decoded body of the response as an object.
**collect($key)** | [Collection](./collection.md) | Get the JSON decoded body of the response as a collection.
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

The `post`, `put` and `patch` methods support sending additional data with the request. By default the data is sent using `application/json` as the content type.

```php
Http::post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

To send the data using the `application/x-www-form-urlencoded` content type instead, call the `asForm` method before making the request.

```php
Http::asForm()->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

Passing data when using a `get` request, the array will be included with the query string in the URL.

```php
Http::get('https://octobercms.com', [
    'page' => '1'
]);
```

The `withHeaders` method can be used to include custom headers with the request.

```php
Http::withHeaders([
    'Rest-Key' => '...'
])->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

The `withBasicAuth` method is used to pass authentication credentials with the request.

```php
Http::withBasicAuth('user', 'password')->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

## Error Handling

The HTTP client treats all responses as valid, including errors, so to determine if an error occured you should check with the `successful`, `failed`, `clientError`, or `serverError` methods.

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

You may also use the `onError` method to execute a callback if a client or server error occurs.

```php
$response->onError(callable $callback);
```

#### See Also

::: also
* [Laravel HTTP Client](https://laravel.com/docs/9.x/http-client)
:::
