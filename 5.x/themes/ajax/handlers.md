---
previousPath: cms/ajax/handlers.md
subtitle: Write PHP handlers that respond to AJAX requests with data, redirects or partial updates.
---
# AJAX Handlers

An AJAX handler is a PHP function that runs on the server when the page sends an AJAX request. It can return data, redirect the browser or update partials on the page.

```php
function onSubmitContactForm()
{
    // ...
}
```

Call the handler from the page with the `data-request` attribute.

```html
<button data-request="onSubmitContactForm">Go</button>
```

## Defining a Handler

Define a handler as a PHP function in the PHP section of a page, layout or partial, or [inside a CMS component](../components.md). Handler names use the `onSomething` pattern, for example, `onName`. Every handler can [update partials](./update-partials.md) as part of the request.

::: tip
If a page and its layout define a handler with the same name, the page handler takes priority. Handlers defined in components have the lowest priority.
:::

## Calling a Handler

Every AJAX request names a handler, using either the [data attributes API](./attributes-api.md) or the [JavaScript API](./javascript-api.md). The server searches the registered handlers and runs the first one it finds.

```html
<!-- Attributes API -->
<button data-request="onSubmitContactForm">Go</button>

<!-- JavaScript API -->
<script> jax.ajax('onSubmitContactForm') </script>
```

Handlers defined by pages, layouts and components are registered automatically. To call a handler defined inside a partial, render the partial with the [`{% ajaxPartial %}` Twig tag](../../handbook/twig-tags/ajax-partial.md), which adjusts the page cycle to register its handlers.

## Reading Form Values

When the request starts inside an HTML form, every input value in the form is sent to the handler. In the following example, the `first_name` value is sent with the request.

```html
<form id="myForm">
    <input name="first_name" />
    <button data-request="onSubmitContactForm">Go</button>
</form>
```

The JavaScript API does the same with the `jax.request` function.

```html
<script> jax.request('#myForm', 'onSubmitContactForm') </script>
```

Use the `input()` PHP function to read the value.

```php
function onSubmitContactForm()
{
    $firstName = input('first_name');
}
```

## Updating the Page Without Writing a Handler

To send a request only to update page contents, use the generic `onAjax` handler. It is available everywhere and runs no code, so you don't need to write it.

```html
<button data-request="onAjax">Do nothing</button>
```

## Calling a Component Handler

If two components register the same handler name, prefix the handler with the [component short name or alias](../components.md). For a component with the alias **mycomponent**, target the handler with `mycomponent::onName`.

```html
<button data-request="mycomponent::onSubmitContactForm">Go</button>
```

See the [Component Development article](../extending/components.md) to learn more.

## Returning Data

A handler can act as an API by returning structured data. When it returns an array, the elements are available in the `success` callback.

```php
function onFetchDataFromServer()
{
    // Some server-side code

    return [
        'totalUsers' => 1000,
        'totalProjects' => 937
    ];
}
```

Read the data with the data attributes API.

```html
<form data-request="onHandleForm" data-request-success="console.log(data)">
```

The same with the JavaScript API.

```html
<form onsubmit="jax.request(this, 'onHandleForm', {
        success: function(data) {
            console.log(data);
        }
    }); return false"
>
```

## Redirecting the Browser

To send the browser to another location, return a `Redirect` response from the handler. The framework redirects as soon as the response arrives. See [Redirects](./redirects.md) for more options.

```php
function onRedirectMe()
{
    return Redirect::to('http://google.com');
}
```

## Returning an Error

Throw an [AJAX exception](../../backend/services/exceptions.md) with the `AjaxException` class to treat the response as an error while still sending response contents. Pass the contents as the first argument.

```php
throw new AjaxException([
    'error' => 'Not enough questions',
    'questionsNeeded' => 2
]);
```

Read the contents in the `error` callback with the data attributes API.

```html
<form data-request="onHandleForm" data-request-error="console.log(data)">
```

The same with the JavaScript API.

```html
<form onsubmit="jax.request(this, 'onHandleForm', {
        error: function(data) {
            console.log(data);
        }
    }); return false"
>
```

::: tip
When this exception is thrown, [partials are updated](./update-partials.md) as normal.
:::

## Running Code Before Handlers

To run code before every AJAX handler, define an `onInit` function in a page or layout. It runs as part of the [layout execution life cycle](../layouts.md).

```php
function onInit()
{
    // From a page or layout PHP code section
}
```

Inside a [CMS component class](../extending/components.md), define an `init` method instead.

```php
function init()
{
    // From a component or widget class
}
```

## Dispatching Browser Events

::: aside
Dispatched events fire after the request completes and before partials are updated.
:::

Use the `dispatchBrowserEvent` method to fire a JavaScript event from a handler. The first argument is the event name and the second is the detail variables to pass with it. The variables must be compatible with JSON serialization.

```php
function onPerformAction()
{
    $this->dispatchBrowserEvent('app:update-profile');

    $this->dispatchBrowserEvent('app:update-profile', ['name' => 'Jeff']);
}
```

In the browser, listen for the event with `addEventListener`. The variables are available on the `event.detail` object.

```js
addEventListener('app:update-profile', function (event) {
    alert('Profile updated with name: ' + event.detail.name);
});
```

### Asking the User Before Continuing

A dispatched event can pair with an exception to pause a process. For example, to warn that another user has already updated a document, dispatch an event and throw an `AjaxException` to halt the handler.

::: tip
`AjaxException` and `ValidationException` are halting exceptions that support dispatched events.
```php
public function onUpdate()
{
    $this->dispatchBrowserEvent('app:stale-document');

    throw new AjaxException;
}
```
:::

Listen for the event in the browser. This example asks the user before sending the request again with a `force` flag in the data.

```js
addEventListener('app:stale-document', function (event) {
    if (confirm('Another user has updated this document, proceed?')) {
        jax.request(event.target, 'onUpdate', { data: {
            force: true
        }});
    }
});
```

To stop the partials from updating as part of the response, call `preventDefault()` on the event object.

```js
addEventListener('app:stale-document', function (event) {
    event.preventDefault();
});
```

#### See Also

::: also
* [Updating Partials](./update-partials.md)
* [Validating Forms](./validation.md)
* [Redirects](./redirects.md)
* [AJAX Partial Twig Tag](../../handbook/twig-tags/ajax-partial.md)
:::
