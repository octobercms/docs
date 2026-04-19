---
subtitle: Twig 函数
---
# ajaxHandler()

`ajaxHandler()` 函数在 Twig 中运行 AJAX 处理程序，并准备一个 `Cms\Classes\AjaxResponse` 响应对象。以下是调用 **onResetPassword** 处理程序的示例。

```twig
{% set result = ajaxHandler('onResetPassword') %}
```

返回的对象中可以包含以下属性。

属性 | 数据
------------- | -------------
**data** | 处理程序设置或返回的数据，也可通过直接调用对象获取。
**error** | 处理程序执行期间抛出的错误。
**flash** | 处理程序设置的闪存消息。
**redirect** | 处理程序返回的重定向。

## 访问数据

分配给页面的变量可在返回的对象中使用。以下是一个 AJAX 处理程序的定义示例。

```php
function onResetPassword()
{
    $this['someVariable'] = 'someValue';
}
```

以下是调用 **onResetPassword** 处理程序的示例。

```twig
{% set result = ajaxHandler('onResetPassword') %}
```

处理程序返回的或在处理程序调用期间设置的 **data** 变量可通过返回的变量访问。

```twig
{{ result.someVariable }}
```

## 使用响应

当[在主题中构建 API](../../cms/resources/building-apis.md) 时，可以将响应直接传递给 `response()` [Twig 函数](./response.md)。

```twig
{% do response(ajaxHandler('onResetPassword')) %}
```

作为响应返回时，数据将以 JSON 格式在 **data** 属性中提供。

```json
{
    "data": {}
}
```

出于安全原因，页面变量不会包含在响应中。调用 `withPageVars` 方法可将它们包含在响应中。

```twig
{% do response(ajaxHandler('onResetPassword').withPageVars()) %}
```

`withVars` 方法可用于在响应中包含附加数据。

```twig
{% do response(ajaxHandler('onResetPassword').withVars({ 'token': 'foobar' })) %}
```

## 处理错误

如果在处理程序执行期间发生异常，错误消息将在 **error.message** 属性中提供。如果错误是 `ValidationException`，则无效字段可在 **error.fields** 属性中找到。

```twig
{% if result.error %}
    An error occurred: {{ result.error.message }}
{% endif %}
```

如果发生异常，错误信息将作为 **error** 属性提供。

```json
{
    "error": {
        "message": "An error occurred"
    }
}
```

当从 AJAX 处理程序返回响应时，以下状态码用于对应的异常类型。

异常 | 状态码
------------- | -------------
`ValidationException` | 422 Unprocessable Entity
`ApplicationException` | 400 Bad Request
`Exception` | 500 Internal Server Error

## 处理重定向

如果 AJAX 处理程序触发了重定向，该重定向将在 **redirect** 属性中提供，并可直接返回。例如：

```php
function onRedirect()
{
    return Redirect::to('https://octobercms.com');
}
```

以下代码将作为响应重定向到浏览器。

```twig
{% do response(ajaxHandler('onTest')) %}
```

该对象包含 **redirect** 消息以及数据。

```json
{
    "data": {},
    "redirect": "https://octobercms.com"
}
```

## 处理闪存消息

如果使用了闪存消息，它们将在 **flash** 属性中提供。以下处理程序为示例。

```php
function onTest()
{
    Flash::success('Test successful');
}
```

调用处理程序并作为响应发送。

```twig
{% do response(ajaxHandler('onTest')) %}
```

输出包含 **flash** 消息以及数据。

```json
{
    "data": {},
    "flash": {
        "success": "Test successful"
    }
}
```

#### 参见

::: also
* [构建 API 资源](../../cms/resources/building-apis.md)
:::
