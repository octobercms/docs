# AJAX JavaScript API

- [JavaScript API](#javascript-api)
- [Usage examples](#javascript-examples)
- [Global AJAX events](#global-events)

<a name="javascript-api"></a>
## JavaScript API

The JavaScript API is more powerful than the data attributes API. The `request()` method can be used with any element that is inside a form, or on a form element. When the method is used with an element inside a form, it is forwarded to the form.

The `request()` method has a single required parameter - the AJAX handler name. Example:

    <form onsubmit="$(this).request('onProcess'); return false;">
        ...

The second attribute of the `request()` method is the options object. You can use any option and method compatible with the [jQuery AJAX function](http://api.jquery.com/jQuery.ajax/). The following options are specific for the October framework:

Option | Description
------------- | -------------
**update** | an object, specifies a list partials and page elements (as CSS selectors) to update: {'partial': '#select'}. If the selector string is prepended with the `@` symbol, the content received from the server will be appended to the element, instead of replacing the existing content.
**confirm** | the confirmation string. If set, the confirmation is displayed before the request is sent. If the user clicks the Cancel button, the request cancels.
**data** | an optional object specifying data to be sent to the server along with the form data: {var: 'value'}.
**redirect** | string specifying an URL to redirect the browser to after the successful request.
**beforeUpdate** | a callback function to execute before page elements are updated. The function gets 3 parameters: the data object received from the server, text status string, and the jqXHR object. The `this` variable inside the function resolves to the request content - an object containing 2 properties: `handler` and `options` representing the original request() parameters.
**success** | a callback function to execute in case of a successful request. If this option is supplied it overrides the default framework's functionality: the elements are not updated, the `beforeUpdate` event is not triggered, the `ajaxUpdate` and `ajaxUpdateComplete` events are not triggered. The event handler gets 3 arguments: the data object received from the server, the text status string and the jqXHR object. However, you can still call the default framework functionality calling `this.success(...)` inside your function.
**error** | a callback function execute in case of an error. By default the alert message is displayed. If this option is overridden the alert message won't be displayed. The handler gets 3 parameters: the jqXHR object, the text status string and the error object - see [jQuery AJAX function](http://api.jquery.com/jQuery.ajax/).
**complete** | a callback function execute in case of a success or an error.
**flash** | when specified this option instructs the server to clear and send any flash messages with the response.

<a name="javascript-examples"></a>
## Usage examples

Request a confirmation before the onDelete request is sent:

    $('form').request('onDelete', {
        confirm: 'Are you sure?',
        redirect: '/dashboard'
    })

Run `onCalculate` handler and inject the rendered **calcresult** partial into the page element with the **result** CSS class:

    $('form').request('onCalculate', {
        update: {calcresult: '.result'}
    })

Run `onCalculate` handler with some extra data:

    $('form').request('onCalculate', {data: {value: 55}})

Run `onCalculate` handler and run some custom code before the page elements update:

    $('form').request('onCalculate', {
        update: {calcresult: '.result'},
        beforeUpdate: function() { /* do something */ }
    })

Run `onCalculate` handler and if successful, run some custom code and the default `success` function:

    $('form').request('onCalculate', {success: function(data) {
        //... do something ...
        this.success(data);
    }})

Execute a request without a FORM element:

    $.request('onCalculate', {
        success: function() {
            console.log('Finished!');
        }
    })

Run `onCalculate` handler and if successful, run some custom code after the default `success` function is done:

    $('form').request('onCalculate', {success: function(data) {
        this.success(data).done(function() {
            //... do something after parent success() is finished ...
        });
    }})

<a name="global-events"></a>
## Global AJAX events

The AJAX framework triggers several events on the updated elements, form, and the window object. The events are triggered regardless on which API was used - the data attributes API or the JavaScript API.

Event | Description
------------- | -------------
**ajaxBeforeSend** | triggered on the window object before sending the request.
**ajaxUpdate** | triggered on a page element after it has been updated with the framework. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxUpdateComplete** | triggered on the window object after all elements are updated by the framework. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxBeforeUpdate** | triggered on the form object directly after the request is complete, but before the page is updated. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxSuccess** | triggered on the form object after the request is successfully completed. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxError** | triggered on the form object if the request encounters an error. The handler gets 5 parameters: the event object, the context object, the error message, the status text string, and the jqXHR object.
**ajaxErrorMessage** | triggered on the window object if the request encounters an error. The handler gets 2 parameters: the event object and error message returned from the server.
**ajaxConfirmMessage** | triggered on the window object when `confirm` option is given. The handler gets 2 parameters: the event object and text message assigned to the handler as part of `confirm` option. This is useful for implementing custom confirm logic/interface instead of native javascript confirm box.

The next example execute JavaScript code when the `ajaxUpdate` event is triggered on an element.

    $('.calcresult').on('ajaxUpdate', function() {
        console.log('Updated!');
    })
