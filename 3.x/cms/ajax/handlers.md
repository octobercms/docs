# Event Handlers

## AJAX Handlers

AJAX event handlers are PHP functions that can be defined in the page or layout PHP section or [inside components](../themes/components.md). Handler names should have the following pattern: `onName`. All handlers support the use of [updating partials](../ajax/update-partials.md) as part of the AJAX request.

```php
function onSubmitContactForm()
{
    // ...
}
```

If two handlers with the same name are defined in a page and layout together, the page handler will be executed. The handlers defined in [components](../cms/components.md) have the lowest priority.

<a id="oc-calling-a-handler"></a>
### Calling a Handler

Every AJAX request should specify a handler name, either using the [data attributes API](../ajax/attributes-api.md) or the [JavaScript API](../ajax/javascript-api.md). When the request is made, the server will search all the registered handlers and locate the first one it finds.

```html
<!-- Attributes API -->
<button data-request="onSubmitContactForm">Go</button>

<!-- JavaScript API -->
<script> $.request('onSubmitContactForm') </script>
```

If two components register the same handler name, it is advised to prefix the handler with the [component short name or alias](../cms/components.md#oc-components-aliases). If a component uses an alias of **mycomponent** the handler can be targeted with `mycomponent::onName`.

```html
<button data-request="mycomponent::onSubmitContactForm">Go</button>
```

You may want to use the [`__SELF__`](https://octobercms.com/docs/plugin/components#referencing-self) reference variable instead of the hard coded alias in case the user changes the component alias used on the page.

```html
<form data-request="{{ __SELF__ }}::onCalculate" data-request-update="'{{ __SELF__ }}::calcresult': '#result'">
```

#### Generic handler

Sometimes you may need to make an AJAX request for the sole purpose of updating page contents, not needing to execute any code. You may use the `onAjax` handler for this purpose. This handler is available everywhere without needing to write any code.

```html
<button data-request="onAjax">Do nothing</button>
```

## Redirects in AJAX Handlers

If you need to redirect the browser to another location, return the `Redirect` object from the AJAX handler. The framework will redirect the browser as soon as the response is returned from the server. Example AJAX handler:

```php
function onRedirectMe()
{
    return Redirect::to('http://google.com');
}
```

## Returning Data from AJAX Handlers

In advanced cases you may want to return structured data from your AJAX handlers. If an AJAX handler returns an array, you can access its elements in the `success` event handler. Example AJAX handler:

```php
function onFetchDataFromServer()
{
    /* Some server-side code */

    return [
        'totalUsers' => 1000,
        'totalProjects' => 937
    ];
}
```

The data can be fetched with the data attributes API:

```html
<form data-request="onHandleForm" data-request-success="console.log(data)">
```

The same with the JavaScript API:

```html
<form
    onsubmit="$(this).request('onHandleForm', {
        success: function(data) {
            console.log(data);
        }
    }); return false;">
```

## Throwing an AJAX Exception

You may throw an [AJAX exception](../services/error-log.md#oc-ajax-exception) using the `AjaxException` class to treat the response as an error while retaining the ability to send response contents as normal. Simply pass the response contents as the first argument of the exception.

```php
throw new AjaxException([
    'error' => 'Not enough questions',
    'questionsNeeded' => 2
]);
```

> **Note**: When throwing this exception type [partials will be updated](../ajax/update-partials.md) as normal.

## Running Code Before Handlers

Sometimes you may want code to execute before a handler executes. Defining an `onInit` function as part of the [page execution life cycle](../cms/layouts.md#oc-dynamic-layouts) allows code to run before every AJAX handler.

```php
function onInit()
{
    // From a page or layout PHP code section
}
```

You may define an `init` method inside a [component class](../plugin/components.md#oc-component-initialization) or [backend widget class](../backend/widgets.md).

```php
function init()
{
    // From a component or widget class
}
```
