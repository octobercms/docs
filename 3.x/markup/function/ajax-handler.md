---
subtitle: Twig Function
---
# ajaxHandler()

The `ajaxHandler()` function runs an AJAX handler inside Twig and prepares a `Cms\Classes\AjaxResponse` response object. An example of calling an **onResetPassword** handler.

```twig
{% set result = ajaxHandler('onResetPassword') %}
```

The following properties can be expected in the resulting object.

Property | Data
------------- | -------------
**data** | data set or returned by the handler, also available by directly calling the object.
**error** | an error was thrown during the handler execution.
**flash** | flash messages set by the handler.
**redirect** | the handler returned a redirect.

## Accessing Data

Take the following AJAX handler definition.

```php
function onResetPassword()
{
    $this['someVariable'] = 'someValue';
}
```

Next is an, an example of calling the **onResetPassword** handler.

```twig
{% set result = ajaxHandler('onResetPassword') %}
```

The **data** variables returned from the handler or set on the page during the handler call will be available via resulting variable.

```twig
{{ result.someVariable }}
```

## Using Responses

When [building APIs in your theme](../../cms/resources/building-apis.md), the response can be passed directly to  the `response()` [Twig function](./response.md).

```twig
{% do response(ajaxHandler('onResetPassword')) %}
```

When returning as a response, the data will be available in JSON as the **data** property.

```json
{
    "data": {}
}
```

## Handling Errors

If an exception occurs during the handler, the error message will be available in the **error.message** property. If the error is a `ValidationException` then the invalid fields can be found in the **error.fields** property.

```twig
{% if result.error %}
    An error occured: {{ result.error.message }}
{% endif %}
```

If an exception occurs, the error information will be available as the **error** property.

```json
{
    "error": {
        "message": "An error occured"
    }
}
```

When returning a response from an AJAX handler, the following status codes are used for the exception type.

Exception | Status Code
------------- | -------------
`ValidationException` | 422 Unprocessable Entity
`ApplicationException` | 400 Bad Request
`Exception` | 500 Internal Server Error

## Handling Redirects

If the AJAX handler caused a redirect, this will be available on the **redirect** property and can be returned directly. For example

```php
function onRedirect()
{
    return Redirect::to('https://octobercms.com');
}
```

The following will redirect to the browser as a response.

```twig
{% do response(ajaxHandler('onTest')) %}
```

The object contains the **redirect** messages alongside the data.

```json
{
    "data": {},
    "redirect": "https://octobercms.com"
}
```

## Handling Flash Messages

If flash messages were used, these will be available in the **flash** property. Take the following handler as an example.

```php
function onTest()
{
    Flash::success('Test successful');
}
```

Calling the handler and sending as a response.

```twig
{% do response(ajaxHandler('onTest')) %}
```

The output contains the **flash** messages alongside the data.

```json
{
    "data": {},
    "flash": {
        "success": "Test successful"
    }
}
```

#### See Also

::: also
* [Building API Resources](../../cms/resources/building-apis.md)
:::
