# JavaScript API

The JavaScript API is more powerful than the data attributes API. The `request` method can be used with any element that is inside a form, or on a form element. When the method is used with an element inside a form, it is forwarded to the form.

The `request` method has a single required argument - the AJAX handler name. Example:

```html
<form onsubmit="$(this).request('onProcess'); return false;">
    ...
```

The second argument of the `request` method is the options object. You can use any option and method compatible with the [jQuery AJAX function](http://api.jquery.com/jQuery.ajax/). The following options are specific for the October framework:

Option | Description
------------- | -------------
**update** | an object, specifies a list partials and page elements (as CSS selectors) to update: {'partial': '#select'}. If the selector string is prepended with the `@` symbol, the content received from the server will be appended to the element, instead of replacing the existing content.
**confirm** | the confirmation string. If set, the confirmation is displayed before the request is sent. If the user clicks the Cancel button, the request cancels.
**data** | an optional object specifying data to be sent to the server along with the form data: {var: 'value'}. When `files` is true, you may also include files to be uploaded in this object by using [`Blob` objects](https://developer.mozilla.org/en-US/docs/Web/API/Blob). To specify the filename of any `Blob` objects, simply set the `filename` property on the `Blob` object. (Ex. `var blob = new Blob(variable); blob.filename = 'test.txt'; var data = {'uploaded_file': blob};`)
**redirect** | string specifying an URL to redirect the browser to after the successful request.
**beforeUpdate** | a callback function to execute before page elements are updated. The function gets 3 parameters: the data object received from the server, text status string, and the jqXHR object. The `this` variable inside the function resolves to the request content - an object containing 2 properties: `handler` and `options` representing the original request() parameters.
**success** | a callback function to execute in case of a successful request. If this option is supplied it overrides the default framework's functionality: the elements are not updated, the `beforeUpdate` event is not triggered, the `ajaxUpdate` and `ajaxUpdateComplete` events are not triggered. The event handler gets 3 arguments: the data object received from the server, the text status string and the jqXHR object. However, you can still call the default framework functionality calling `this.success(...)` inside your function.
**error** | a callback function execute in case of an error. By default the alert message is displayed. If this option is overridden the alert message won't be displayed. The handler gets 3 parameters: the jqXHR object, the text status string and the error object - see [jQuery AJAX function](http://api.jquery.com/jQuery.ajax/).
**complete** | a callback function execute in case of a success or an error.
**form** | a form element to use for sourcing the form data sent with the request, either passed as a selector string or a form element.
**flash** | when true, instructs the server to clear and send any flash messages with the response. default: false
**files** | when true, the request will accept file uploads, this requires `FormData` interface support by the browser. default: false
**browserValidate** | when true, browser-based client side validation will be performed on the request before submitting. This only applies to requests triggered in the context of a `<form>` element. **NOTE:** This form of validation does not play nice with complex forms where validated fields might not be visible to the user 100% of the time. Recommend that you avoid using it on anything but the most simple forms.
**loading** | an optional string or object to be displayed when a request runs. The string should be a CSS selector for an element, the object should support the `show()` and `hide()` functions to manage the visibility. You may pass the global object `$.oc.stripeLoadIndicator` when using the [framework extras](../ajax/extras).

You may also override some of the request logic by passing new functions as options. These logic handlers are available.

Handler | Description
------------- | -------------
**handleConfirmMessage(message)** | called when requesting confirmation from the user.
**handleErrorMessage(message)** | called when an error message should be displayed.
**handleValidationMessage(message, fields)** | focuses the first invalid field when validation is used.
**handleFlashMessage(message, type)** | called when a flash message is provided using the **flash** option (see above).
**handleRedirectResponse(url)** | called when the browser should redirect to another location.

## Usage Examples

Request a confirmation before the onDelete request is sent:

```js
$('form').request('onDelete', {
    confirm: 'Are you sure?',
    redirect: '/dashboard'
})
```

Run `onCalculate` handler and inject the rendered **calcresult** partial into the page element with the **result** CSS class:

```js
$('form').request('onCalculate', {
    update: {calcresult: '.result'}
})
```

Run `onCalculate` handler with some extra data:

```js
$('form').request('onCalculate', {data: {value: 55}})
```

Run `onCalculate` handler and run some custom code before the page elements update:

```js
$('form').request('onCalculate', {
    update: {calcresult: '.result'},
    beforeUpdate: function() { /* do something */ }
})
```

Run `onCalculate` handler and if successful, run some custom code and the default `success` function:

```js
$('form').request('onCalculate', {success: function(data) {
    //... do something ...
    this.success(data);
}})
```

Execute a request without a FORM element:

```js
$.request('onCalculate', {
    success: function() {
        console.log('Finished!');
    }
})
```

Run `onCalculate` handler and if successful, run some custom code after the default `success` function is done:

```js
$('form').request('onCalculate', {success: function(data) {
    this.success(data).done(function() {
        //... do something after parent success() is finished ...
    });
}})
```

## Global AJAX Events

The AJAX framework triggers several events on the updated elements, triggering element, form, and the window object. The events are triggered regardless on which API was used - the data attributes API or the JavaScript API.

Event | Description
------------- | -------------
**ajaxBeforeSend** | triggered on the window object before sending the request.
**ajaxBeforeUpdate** | triggered on the form object directly after the request is complete, but before the page is updated. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxUpdate** | triggered on a page element after it has been updated with the framework. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxUpdateComplete** | triggered on the window object after all elements are updated by the framework. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxSuccess** | triggered on the form object after the request is successfully completed. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxError** | triggered on the form object if the request encounters an error. The handler gets 5 parameters: the event object, the context object, the error message, the status text string, and the jqXHR object.
**ajaxErrorMessage** | triggered on the window object if the request encounters an error. The handler gets 2 parameters: the event object and error message returned from the server.
**ajaxConfirmMessage** | triggered on the window object when `confirm` option is given. The handler gets 2 parameters: the event object and text message assigned to the handler as part of `confirm` option. This is useful for implementing custom confirm logic/interface instead of native javascript confirm box.

These events are fired on the triggering element:

Event | Description
------------- | -------------
**ajaxSetup** | triggered before the request is formed, allowing options to be modified via the `context.options` object.
**ajaxPromise** | triggered directly before the AJAX request is sent.
**ajaxFail** | triggered finally if the AJAX request fails.
**ajaxDone** | triggered finally if the AJAX request was successful.
**ajaxAlways** | triggered regardless if the AJAX request fails or was successful.

## Usage Examples

Executes JavaScript code when the `ajaxUpdate` event is triggered on an element.

```js
$('.calcresult').on('ajaxUpdate', function() {
    console.log('Updated!');
})
```

Execute a single request that shows a Flash Message using logic handler.

```js
$.request('onDoSomething', {
    flash: 1,
    handleFlashMessage: function(message, type) {
        $.oc.flashMsg({ text: message, class: type })
    }
})
```

Applies configurations to all AJAX requests globally.

```js
$(document).on('ajaxSetup', function(event, context) {
    // Enable AJAX handling of Flash messages on all AJAX requests
    context.options.flash = true

    // Enable the StripeLoadIndicator on all AJAX requests
    context.options.loading = $.oc.stripeLoadIndicator

    // Handle Error Messages by triggering a flashMsg of type error
    context.options.handleErrorMessage = function(message) {
        $.oc.flashMsg({ text: message, class: 'error' })
    }

    // Handle Flash Messages by triggering a flashMsg of the message type
    context.options.handleFlashMessage = function(message, type) {
        $.oc.flashMsg({ text: message, class: type })
    }
})
```
