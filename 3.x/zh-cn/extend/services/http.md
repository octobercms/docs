# HTTP 客户端

`Http` 类提供了通过 HTTP 协议打开连接的功能。你可以使用它向其他应用程序和服务发起外部连接。此客户端由 Laravel 框架提供，你可以在 [Laravel 文档](https://laravel.com/docs/10.x/http-client)中了解所有可用功能。

## 基本用法

要发出请求，PHP 方法将关联到 HTTP 方法，支持 `get`、`post`、`patch`、`put`、`options` 和 `delete`。以下是对 URL 发起基本 `GET` 请求的示例。返回的结果将包含一个响应对象。

```php
$response = Http::get('https://octobercms.com');
```

你可以通过在方法调用前加上 `dd()` 来快速便捷地检查请求的内容。这将转储请求的内容并终止执行。

```php
Http::dd()->get('https://octobercms.com');
```

## 处理响应

响应对象将提供可用于检查响应的方法。

```php
$result = Http::post('https://octobercms.com');
echo $result->body();                  // Outputs: <html><head><title>...
echo $result->status();                // Outputs: 200
echo $result->header('Content-Type');  // Outputs: text/html; charset=UTF-8
```

该对象支持以下方法调用。

方法名 | 返回类型 | 用途
------------- | ------------- | -------------
**body()** | `string` | 获取响应的主体。
**json($key)** | `array|mixed` | 将响应的 JSON 解码主体作为数组或标量值获取。
**object()** | `object` | 将响应的 JSON 解码主体作为对象获取。
**collect($key)** | [Collection](./collection.md) | 将响应的 JSON 解码主体作为集合获取。
**status()** | `int` | 获取响应的状态码。
**ok()** | `bool` | 确定响应码是否为 "OK"。
**successful()** | `bool` | 确定请求是否成功。
**redirect()** | `bool` | 确定响应是否为重定向。
**failed()** | `bool` | 确定响应是否指示发生了客户端或服务器错误。
**serverError()** | `bool` | 确定响应是否指示发生了服务器错误。
**clientError()** | `bool` | 确定响应是否指示发生了客户端错误。
**header($header)** | `string` | 从响应中获取标头。
**headers()** | `array` | 从响应中获取所有标头。

## 发送请求数据

`post`、`put` 和 `patch` 方法支持随请求发送附加数据。默认情况下，数据使用 `application/json` 作为内容类型发送。

```php
Http::post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

要使用 `application/x-www-form-urlencoded` 内容类型发送数据，请在发出请求之前调用 `asForm` 方法。

```php
Http::asForm()->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

使用 `get` 请求传递数据时，数组将随 URL 中的查询字符串一起包含。

```php
Http::get('https://octobercms.com', [
    'page' => '1'
]);
```

`withHeaders` 方法可用于在请求中包含自定义标头。

```php
Http::withHeaders([
    'Rest-Key' => '...'
])->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

`withBasicAuth` 方法用于在请求中传递身份验证凭据。

```php
Http::withBasicAuth('user', 'password')->post('https://octobercms.com', [
    'name' => 'Jeff'
]);
```

## 错误处理

HTTP 客户端将所有响应视为有效响应，包括错误响应，因此要确定是否发生错误，你应该使用 `successful`、`failed`、`clientError` 或 `serverError` 方法进行检查。

```php
// 状态码 >= 200 且 < 300
$response->successful();

// 状态码 >= 400
$response->failed();

// 响应具有 400 级别的状态码
$response->clientError();

// 响应具有 500 级别的状态码
$response->serverError();
```

你也可以使用 `onError` 方法在发生客户端或服务器错误时执行回调。

```php
$response->onError(callable $callback);
```

#### 参见

::: also
* [Laravel HTTP 客户端](https://laravel.com/docs/10.x/http-client)
:::
