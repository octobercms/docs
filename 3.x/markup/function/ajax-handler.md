---
subtitle: Twig Function
---
# ajaxHandler()

The `ajaxHandler()` function runs an AJAX handler inside Twig and prepares a `Cms\Classes\AjaxResponse` response object. An example of calling an **onResetPassword** handler.

```twig
{% set result = ajaxHandler('onResetPassword') %}
```

Any variables returned from the handler or set on the page during the handler call will be available in the result.

```twig
{{ result.someVariable }}
```

When building APIs the response can be passed directly to  the `response()` [Twig function](./response.md).

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
