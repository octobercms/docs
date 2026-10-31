---
previousPath: cms/ajax/javascript-api.md
subtitle: Send AJAX requests and listen to AJAX events from your own JavaScript.
---
# JavaScript API

The JavaScript API gives you more control than the [data attributes API](./attributes-api.md). Use it when you need to send a request or react to one from your own scripts.

```html
<form onsubmit="jax.request(this, 'onProcess'); return false;">
    ...
```

## Sending a Request

The `jax.request` method takes the target element as the first argument and the AJAX handler name as the second. The target element can be a selector string or an HTML element. It works with a form element or any element inside a form. When used with an element inside a form, the request is forwarded to the form.

To send a request without a form, use the `jax.ajax` method with the handler name as the first argument.

```js
jax.ajax('onCalculate', {
    success: function() {
        console.log('Finished!');
    }
})
```

## Request Options

The last argument of `jax.request` and `jax.ajax` is an options object. The following options are available.

Option | Description
------------- | -------------
[update](https://larajax.org/api/framework#request-options) | an object, specifies a list of partials and page elements (as CSS selectors) to update: `{'partial': '#select'}`. The selector string should start with a `#` or `.` character, except you may also prepend it with `@` to append contents to the element, `^` to prepend, `!` to replace with and `=` to use any CSS selector.
[confirm](https://larajax.org/api/framework#request-options) | the confirmation string. If set, a confirmation dialog is displayed before the request is sent. If the user clicks the Cancel button, the request cancels.
[data](https://larajax.org/api/framework#request-options) | an optional object specifying data to be sent to the server along with the form data: `{var: 'value'}`. When the **files** option is enabled, you may also include files to be uploaded in this object by using [`Blob` objects](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
[query](https://larajax.org/api/framework#request-options) | an optional object specifying data to be added to the current URL query string.
[headers](https://larajax.org/api/framework#request-options) | an optional object specifying header values to be sent to the server with the request.
[redirect](https://larajax.org/api/framework#request-options) | string specifying a URL to redirect the browser to after the successful request.
[beforeUpdate](https://larajax.org/api/framework#request-options) | a callback function to execute before page elements are updated. The `this` variable inside the function resolves to the request context, an object containing the `handler` and `options` properties representing the original request parameters.
[afterUpdate](https://larajax.org/api/framework#request-options) | a callback function identical to `beforeUpdate` except it executes after the page elements are updated.
[success](https://larajax.org/api/framework#request-options) | a callback function to execute in case of a successful request. If this option is supplied it overrides the default framework functionality: the elements are not updated, the `beforeUpdate` and `afterUpdate` callbacks are not triggered, the `ajax:update` and `ajax:update-complete` events are not triggered. To call the default framework functionality, use `this.success(...)` inside your function.
[error](https://larajax.org/api/framework#request-options) | a callback function to execute in case of an error. By default the alert message is displayed. If this option is overridden the alert message won't be displayed.
[complete](https://larajax.org/api/framework#request-options) | a callback function to execute in case of a success or an error.
[cancel](https://larajax.org/api/framework#request-options) | a callback function to execute in case the user aborts the request or cancels it via a confirmation dialog.
[form](https://larajax.org/api/framework#request-options) | a form element to use for sourcing the form data sent with the request, either passed as a selector string or a form element.
[flash](https://larajax.org/api/framework#request-options) | when true, instructs the server to clear and send any flash messages with the response. Default: `false`
[files](https://larajax.org/api/framework#request-options) | when true, the request will accept file uploads using the `FormData` interface. Default: `false`
[download](https://larajax.org/api/framework#request-options) | not required for file downloads. A response with a `Content-Disposition` header is downloaded automatically, using the filename sent by the server. See [File Downloads](./downloads.md).
[browserTarget](https://larajax.org/api/framework#request-options) | when the response is a file download, opens it in this window target, for example `_blank`. Default: `null`
[bulk](https://larajax.org/api/framework#request-options) | when true, the request is sent as JSON for bulk data transactions. Default: `false`
[browserValidate](https://larajax.org/api/framework#request-options) | when true, browser-based client side validation will be performed on the request before submitting. Only applies to requests triggered in the context of a `<form>` element.
[browserRedirectBack](https://larajax.org/api/framework#request-options) | when true and a redirect occurs, if the previous URL from the browser is available, use that in place of the redirect URL provided. Default: `false`.
[message](https://larajax.org/api/framework#request-options) | displays a progress message with the specified text, shown while the request is running. This option is used by the [flash messages features](./flash-messages.md).
[loading](https://larajax.org/api/framework#request-options) | an optional string or object to be displayed when a request runs. The string should be a CSS selector for an element or the object should support the `show()` and `hide()` functions to manage the visibility.
[progressBar](https://larajax.org/api/framework#request-options) | enables the [progress bar](./loaders.md) when an AJAX request occurs.

The **beforeUpdate**, **afterUpdate**, **success**, **error**, and **complete** options all take functions with three arguments: the data object received from the server, the HTTP status code and the XHR object.

```js
success: function(data, responseCode, xhr) { }
```

### Overriding Request Logic

You can override parts of the request logic by passing new functions as options. The following logic handlers are available.

Handler | Description
------------- | -------------
[handleConfirmMessage(message)](https://larajax.org/api/framework#request-options) | called when requesting confirmation from the user.
[handleErrorMessage(message)](https://larajax.org/api/framework#request-options) | called when an error message should be displayed.
[handleValidationMessage(message, fields)](https://larajax.org/api/framework#request-options) | focuses the first invalid field when validation is used.
[handleFlashMessage(message, type)](https://larajax.org/api/framework#request-options) | called when a flash message is provided using the **flash** option (see above).
[handleRedirectResponse(url)](https://larajax.org/api/framework#request-options) | called when the browser should redirect to another location.

## Request Examples

### Confirming Before Sending

Ask for confirmation before the `onDelete` request is sent, then redirect when it succeeds.

```js
jax.request('#myform', 'onDelete', {
    confirm: 'Are you sure?',
    redirect: '/dashboard'
});
```

### Updating a Partial

Run the `onCalculate` handler and place the rendered **calcresult** partial in the page element with the **result** CSS class.

```js
jax.request('#myform', 'onCalculate', {
    update: { calcresult: '.result' }
})
```

### Sending Extra Data

Run the `onCalculate` handler with some extra data.

```js
jax.request('#myform', 'onCalculate', { data: { value: 55 } })
```

### Running Code Around the Update

Run the `onCalculate` handler and run custom code before the page elements update.

```js
jax.request('#myform', 'onCalculate', {
    update: { calcresult: '.result' },
    beforeUpdate: function() { /* do something */ }
})
```

Run the `onCalculate` handler and, if it succeeds, run custom code after the page elements are updated.

```js
jax.request('#myform', 'onCalculate', {
    afterUpdate: function() { /* do something */ }
})
```

### Extending the Default Success Logic

Run the `onCalculate` handler and, if it succeeds, run custom code after the default `success` function is done.

```js
jax.request('#myform', 'onCalculate', {
    success: function(data) {
        this.success(data).done(function() {
            // ... do something after parent success() is finished ...
        });
    }
})
```

## Global AJAX Events

The AJAX framework triggers events on the updated elements, the triggering element, the form and the window object. The events fire whichever API sent the request, the data attributes API or the JavaScript API.

Extra details are available on the `event.detail` property. Unless otherwise specified, the details are the `context` object, the `data` object received from the server, the `responseCode` and the `xhr` object.

JavaScript Event | Description
------------- | -------------
[ajax:before-send](https://larajax.org/api/events#ajax-before-send) | triggered on the window object before sending the request. The handler details provide the `context` object.
[ajax:before-update](https://larajax.org/api/events#ajax-before-update) | triggered on the form object directly after the request is complete, but before the page is updated.
[ajax:update](https://larajax.org/api/events#ajax-update) | triggered on a page element after it has been updated with the framework.
[ajax:update-complete](https://larajax.org/api/events#ajax-update-complete) | triggered on the window object after all elements are updated by the framework.
[ajax:request-success](https://larajax.org/api/events#ajax-request-success) | triggered on the form object after the request is successfully completed.
[ajax:request-error](https://larajax.org/api/events#ajax-request-error) | triggered on the form object if the request encounters an error.
[ajax:error-message](https://larajax.org/api/events#ajax-error-message) | triggered on the window object if the request encounters an error. The handler has a `message` detail with the error message returned from the server.
[ajax:confirm-message](https://larajax.org/api/events#ajax-confirm-message) | triggered on the window object when the `confirm` option is given. The handler has a `message` detail with the text message assigned to the `confirm` option. A `promise` detail is also provided to defer or cancel the outcome, which is useful for building a custom confirmation interface instead of the native JavaScript confirm box.

These events fire on the triggering element.

JavaScript Event | Description
------------- | -------------
[ajax:setup](https://larajax.org/api/events#ajax-setup) | triggered before the request is formed. The handler details provide the `context` object, allowing options to be modified via the `context.options` property.
[ajax:promise](https://larajax.org/api/events#ajax-promise) | triggered directly before the AJAX request is sent. The handler details provide the `context` object.
[ajax:fail](https://larajax.org/api/events#ajax-fail) | triggered finally if the AJAX request fails.
[ajax:done](https://larajax.org/api/events#ajax-done) | triggered finally if the AJAX request was successful.
[ajax:always](https://larajax.org/api/events#ajax-always) | triggered regardless if the AJAX request fails or was successful.

## Event Examples

### Reacting to an Element Update

Run code when the `ajax:update` event fires on an element.

```js
document.querySelector('#result').addEventListener('ajax:update', function() {
    console.log('Updated!');
});
```

### Showing a Flash Message for One Request

Send a single request that shows a flash message using a logic handler.

```js
jax.ajax('onDoSomething', {
    flash: true,
    handleFlashMessage: function(message, type) {
        jax.flashMsg({ message: message, type: type });
    }
});
```

### Changing Options for Every Request

Apply options to all AJAX requests globally.

```js
addEventListener('ajax:setup', function(event) {
    const { options } = event.detail.context;

    // Enable AJAX handling of Flash messages on all AJAX requests
    options.flash = true;

    // Disable the progress bar for all AJAX requests
    options.progressBar = false;

    // Handle Error Messages by triggering a flashMsg of type error
    options.handleErrorMessage = function(message) {
        jax.flashMsg({ message: message, type: 'error' });
    }

    // Handle Flash Messages by triggering a flashMsg of the message type
    options.handleFlashMessage = function(message, type) {
        jax.flashMsg({ message: message, type: type });
    }
});
```

### Building a Custom Confirmation

Use the `promise` from the event detail to resolve or reject the request.

```js
addEventListener('ajax:confirm-message', function(event) {
    const { message, promise } = event.detail;

    // Prevent default behavior
    event.preventDefault();

    // Handle promise
    if (confirm(message)) {
        promise.resolve();
    }
    else {
        promise.reject();
    }
});
```

### Animating After a Specific Handler

Animate an element after a specific AJAX handler completes its update.

```js
addEventListener('ajax:update-complete', function(event) {
    const { handler } = event.detail.context;

    // If the handler is either of the following
    if (['onRemoveFromCart', 'onAddToCart'].includes(handler)) {

        // Run an animation for 2 seconds
        var el = document.querySelector('#miniCart');
        el.classList.add('animate-shockwave');
        setTimeout(function() { el.classList.remove('animate-shockwave'); }, 2000);
    }
});
```

#### See Also

::: also
* [Larajax JavaScript API](https://larajax.org/api/framework)
* [Larajax Events Reference](https://larajax.org/api/events)
* [Data Attributes API](./attributes-api.md)
:::
