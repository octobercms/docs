---
subtitle: Interact with handlers using JavaScript code.
---
# JavaScript API

The JavaScript API is more powerful than the data attributes API. The `oc.request` method can be used with any element that is inside a form, or on a form element. When the method is used with an element inside a form, it is forwarded to the form.

The `oc.request` takes the target element and AJAX handler name as the first and second arguments. The target element can be a selector string or a HTML element. For example:

```html
<form onsubmit="oc.request(this, 'onProcess'); return false;">
    ...
```

The third argument of the `oc.request` method is an options object. The following options are specific for the October CMS framework.

Option | Description
------------- | -------------
**update** | an object, specifies a list partials and page elements (as CSS selectors) to update: `{'partial': '#select'}`. The selector string should start with a `#` or `.` character, except you may also prepend it with `@` to append contents to the element, `^` to prepend, `!` to replace with and `=` to use any CSS selector.
**confirm** | the confirmation string. If set, the confirmation is displayed before the request is sent. If the user clicks the Cancel button, the request cancels.
**data** | an optional object specifying data to be sent to the server along with the form data: `{var: 'value'}`. You may also include files to be uploaded in this object by using [`Blob` objects](https://developer.mozilla.org/en-US/docs/Web/API/Blob). To specify the filename of any `Blob` objects, simply set the `filename` property on the `Blob` object. (Eg. `var blob = new Blob(variable); blob.filename = 'test.txt'; var data = {uploaded_file: blob};`)
**headers** | an optional object specifying header values to be sent to the server with the request.
**redirect** | string specifying an URL to redirect the browser to after the successful request.
**beforeUpdate** | a callback function to execute before page elements are updated. The function gets 3 parameters: the data object received from the server, HTTP status code, and the XHR object. The `this` variable inside the function resolves to the request content - an object containing 2 properties: `handler` and `options` representing the original request() parameters.
**afterUpdate** | a callback function identical to `beforeUpdate` except it executes after the page elements are updated.
**success** | a callback function to execute in case of a successful request. If this option is supplied it overrides the default framework functionality: the elements are not updated, the `beforeUpdate` and `afterUpdate` callbacks are not triggered, the `ajax:update` and `ajax:update-complete` events are not triggered. The event handler gets 3 arguments: the data object received from the server, the HTTP status code and the XHR object. However, you can still call the default framework functionality calling `this.success(...)` inside your function.
**error** | a callback function execute in case of an error. By default the alert message is displayed. If this option is overridden the alert message won't be displayed. The event handler gets 3 arguments: the data object received from the server, the HTTP status code and the XHR object.
**complete** | a callback function execute in case of a success or an error.
**form** | a form element to use for sourcing the form data sent with the request, either passed as a selector string or a form element.
**flash** | when true, instructs the server to clear and send any flash messages with the response. default: `false`
**files** | when true, the request will accept file uploads using the `FormData` interface. default: `false`
**download** | when true, file downloads are accepted with a `Content-Disposition` response. When a string, the downloaded filename can be specified. default: `false`
**bulk** | when true, the request be sent as JSON for bulk data transactions. default: `false`
**browserValidate** | when true, browser-based client side validation will be performed on the request before submitting. Only applies to requests triggered in the context of a `<form>` element.
**loading** | an optional string or object to be displayed when a request runs. The string should be a CSS selector for an element or the object should support the `show()` and `hide()` functions to manage the visibility.
**progressBar** | enable the progress bar when an AJAX request occurs. Default `true` when using [extra features](./extras.md), otherwise `false`.

You may also override some of the request logic by passing new functions as options. These logic handlers are available.

Handler | Description
------------- | -------------
**handleConfirmMessage(message, promise)** | called when requesting confirmation from the user.
**handleErrorMessage(message)** | called when an error message should be displayed.
**handleValidationMessage(message, fields)** | focuses the first invalid field when validation is used.
**handleFlashMessage(message, type)** | called when a flash message is provided using the **flash** option (see above).
**handleRedirectResponse(url)** | called when the browser should redirect to another location.

## Usage Examples

Request a confirmation before the `onDelete` request is sent.

```js
oc.request('#myform', 'onDelete', {
    confirm: 'Are you sure?',
    redirect: '/dashboard'
});
```

Run `onCalculate` handler and inject the rendered **calcresult** partial into the page element with the **result** CSS class.

```js
oc.request('#myform', 'onCalculate', {
    update: { calcresult: '.result' }
})
```

Run `onCalculate` handler with some extra data.

```js
oc.request('#myform', 'onCalculate', { data: { value: 55 } })
```

Run `onCalculate` handler and run some custom code before the page elements update.

```js
oc.request('#myform', 'onCalculate', {
    update: { calcresult: '.result' },
    beforeUpdate: function() { /* do something */ }
})
```

Run `onCalculate` handler and if successful, run some custom code after the page elements are updated.

```js
oc.request('#myform', 'onCalculate', {
    afterUpdate: function() { /* do something */ }
})
```

Use the `oc.ajax` method to execute a request without a FORM element.

```js
oc.ajax('onCalculate', {
    success: function() {
        console.log('Finished!');
    }
})
```

Run `onCalculate` handler and if successful, run some custom code after the default `success` function is done.

```js
oc.request('#myform', 'onCalculate', {
    success: function(data) {
        this.success(data).done(function() {
            // ... do something after parent success() is finished ...
        });
    }
})
```

## Global AJAX Events

The AJAX framework triggers events on the updated elements, triggering element, form, and window object. The events are triggered regardless of which API was used - the data attributes API or the JavaScript API.

Extra details are available on the `event.detail` property of the event handler. Unless otherwise specified, the handler details are the `context` object, the `data` object received from the server, the `responseCode` and the `xhr` object.

Event | Description
------------- | -------------
**ajax:before-send** | triggered on the window object before sending the request. The handler details provide the `context` object.
**ajax:before-update** | triggered on the form object directly after the request is complete, but before the page is updated.
**ajax:update** | triggered on a page element after it has been updated with the framework.
**ajax:update-complete** | triggered on the window object after all elements are updated by the framework.
**ajax:request-success** | triggered on the form object after the request is successfully completed. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the XHR object.
**ajax:request-error** | triggered on the form object if the request encounters an error.
**ajax:error-message** | triggered on the window object if the request encounters an error. The handler has a `message` detail with the error message returned from the server.
**ajax:confirm-message** | triggered on the window object when `confirm` option is given. The handler has a `message` detail with a text message assigned to the handler as part of `confirm` option. A `promise` detail is also provided to defer or cancel the outcome, this is useful for implementing custom confirm logic/interface instead of native javascript confirm box.

These events are fired on the triggering element:

Event | Description
------------- | -------------
**ajax:setup** | triggered before the request is formed. The handler details provide the `context` object, allowing options to be modified via the `context.options` property.
**ajax:promise** | triggered directly before the AJAX request is sent. The handler details provide the `context` object.
**ajax:fail** | triggered finally if the AJAX request fails.
**ajax:done** | triggered finally if the AJAX request was successful.
**ajax:always** | triggered regardless if the AJAX request fails or was successful.

## Usage Examples

Executes JavaScript code when the `ajax:update` event is triggered on an element.

```js
document.querySelector('#result').addEventListener('ajax:update', function() {
    console.log('Updated!');
});
```

Execute a single request that shows a Flash Message using logic handler.

```js
oc.request('onDoSomething', {
    flash: true,
    handleFlashMessage: function(message, type) {
        oc.flashMsg({ text: message, class: type });
    }
});
```

Applies configurations to all AJAX requests globally.

```js
addEventListener('ajax:setup', function(event) {
    const { context } = event.detail;

    // Enable AJAX handling of Flash messages on all AJAX requests
    context.options.flash = true;

    // Handle Error Messages by triggering a flashMsg of type error
    context.options.handleErrorMessage = function(message) {
        oc.flashMsg({ text: message, class: 'error' });
    }

    // Handle Flash Messages by triggering a flashMsg of the message type
    context.options.handleFlashMessage = function(message, type) {
        oc.flashMsg({ text: message, class: type });
    }
});
```

Using a supplied `promise` from the event detail.

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
