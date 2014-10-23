# AJAX framework

- [Introduction](#introduction)
- [Ajax handlers](#ajax-handlers)
- [Data attributes API](#data-attributes)
- [JavaScript API](#javascript-api)
- [Calling AJAX handlers defined in components](#components-ajax-handlers)
- [Global AJAX events](#global-events)
- [Returning data from AJAX handlers](#returning-data-from-handlers)
- [Redirections in AJAX handlers](#redirections-in-handlers)
- [Pushing content updates](#pushing-content-updates)

October includes the AJAX framework that lets you to execute AJAX handlers defined in your [pages](pages), [layouts](layouts) or [components](components) and update page blocks with [partials](partials). The AJAX framework comes in two flavors - as JavaScript API and data attributes API. The data attributes API doesn't require any JavaScript knowledge to use AJAX with October.

<a name="introduction" class="anchor" href="#introduction"></a>
## Introduction

To use the AJAX framework it should be included by placing the `{% framework %}` tag anywhere inside the page or layout. 
This adds a reference to to the October front-end JavaScript library. The library requires jQuery, so it should be loaded first, for example:

    <script src="{{ [
        'assets/javascript/jquery.js',
    ]|theme }}"></script> 

    {% framework %}

The `{% framework %}` tag supports the optional **extras** parameter. If this parameter is specified, the tag adds a CSS and JavaScript files that contain the loading indicator plugin and CSS classes for styling the loading indicator. The indicator is displayed on the top of the page when an AJAX request runs.

    {% framework extras %}

<a name="how-ajax-works" class="anchor" href="#how-ajax-works"></a>
### How AJAX requests work

A page can issue an AJAX request with the data attributes or with JavaScript. Each request invokes an **event handler** on the server and can update page elements using [partials](partials). AJAX requests work best with forms, since the form data is automatically sent to the server. The AJAX request flow:

1. Client issues an AJAX request by providing the AJAX handler name, and optionally other parameters. 
2. The server finds the AJAX handler and executes it.
3. The handler executes the required business logic and updates the Twig environment by injecting page variables.
4. The server renders partials requested by the client with the `update` option.
5. The server sends the response, containing the rendered partials markup.
6. The client-side framework updates page elements with the partials data received from the server.

Below is a simple example of using the data attributes API for an AJAX calculator form. The form refers to the **onTest** handler example demonstrated in the [Ajax Handlers](#ajax-handlers) section below. The example can easily be converted to use the [JavaScript API](#javascript-api).

    <form data-request="onTest" data-request-update="calcresult: '#result'">
        <input type="text" name="value1"/>
        <input type="text" name="value2"/>
        <input type="submit" value="Calculate">
    </form>
    <div id="#result"></div>

The form configuration from the previous example could be read like this: "When the form is submitted, issue an AJAX request to the **onTest** AJAX handler. When the handler finishes, render the **calcresult** partial and inject its contents to the **#result** element.". Below is an example of the **calcresult** partial. It basically outputs the `result` variable prepared by the AJAX handler.

    The result is {{ result }}

<a name="ajax-handlers" class="anchor" href="#ajax-handlers"></a>
## Ajax handlers

AJAX handlers are PHP functions that can be defined in the page or layout [PHP section](themes#php-section) or inside [components](components). Handler names should have the following pattern: `onName`. Handlers can inject variables the Twig environment, where they can be used during the partial rendering. The next example shows an Ajax handler defined in the page PHP section. The handler loads two POST values and injects the **result** page variable.

    url = "js"
    layout = "default"
    ==
    function onTest()
    {
        $value1 = post('value1');
        $value2 = post('value2');
        $this['result'] = $value1 + $value2;
    }
    ==

> **Note:** If two handlers with a same name defined in a page and layout together, the page handler will be executed. The handlers defined in [components](components) have the lowest priority.

The `onInit()` methods found in the [page execution life cycle](layouts#dynamic-pages) can be used for defining code that always executes before an AJAX event is handled.

    function onInit()
    {
        // This code will be executed before
        // an AJAX request is handled.
    }

<a name="data-attributes" class="anchor" href="#data-attributes"></a>
## Data attributes API

The data attributes API lets you to issue AJAX requests without any JavaScript. In many cases the data attributes API is less verbose than the JavaScript API - you write less code to get the same result. The supported AJAX data attributes are:

Attribute  | Description
------------- | -------------
**data-request** | specifies the AJAX handler name.
**data-request-confirm** | specifies a confirmation message. The confirmation is displayed before the request is sent. If the user clicks the Cancel button the request isn't sent.
**data-request-redirect** | specifies a URL to redirect the browser after the successful AJAX request.
**data-request-update** | specifies a list of partials and page elements (CSS selectors) to update. The format is as follows: `partial: selector, partial: selector`. Usage of quotes is required in some cases, for example: `'my-partial': '#myelement'`. If the selector string is prepended with the `@` symbol, the content received from the server will be appended to the element, instead of replacing the existing content. If the selector string is prepended with the `^` symbol, the content will be prepended instead.
**data-request-data** | specifies additional POST parameters to be sent to the server. The format is following: `var: value, var: value`. Use ampersands if needed: `var: 'some string'`. The attribute can be used on the triggering element, for example on the button that also has the `data-request` attribute, on the closest element of the triggering element and on the parent form element. The framework merges values of the `data-request-data` attributes. If the attribute on different elements defines parameters with the same name, the framework uses the following priority: the triggering element `data-request-data`, the closer parent elements `data-request-data`, the form input data.
**data-request-before-update** | specifies JavaScript code to execute directly before the page contents are updated. Inside the JavaScript code you can access the following variables: `$el` (the page element triggered the request), the `context` object, the `data` object received from the server, the `textStatus` text string, and the `jqXHR` object.
**data-request-success** | specifies JavaScript code to execute after the request is successfully completed. Inside the JavaScript code you can access the following variables: `$el` (the page element triggered the request), the `context` object, the `data` object received from the server, the `textStatus` text string, and the `jqXHR` object.
**data-request-error** | specifies JavaScript code to execute if the request encounters an error. Inside the JavaScript code you can access the following variables: `$el` (the page element triggered the request), the `context` object, the `textStatus` text string, and the `jqXHR` object.
**data-request-loading** | specifies a CSS selector for an element to be displayed while the request runs. You can use this option to show the AJAX loading indicator. The feature uses jQuery's `show()` and `hide()` functions to manage the element visibility.
**data-track-input** | can be applied to a text or password input field that also has the `data-request` attribute. When defined, the input field automatically sends an AJAX request when a user types something in the field. The optional attribute value can define the interval, in milliseconds, the framework waits before it sends the requests.

When the `data-request` attribute is specified for an element, the element triggers an AJAX request when a user interacts with it. Depending on the type of element, the request is triggered on the following events:

Element  | Event
------------- | -------------
**Forms** | when the form is submitted.
**Links, buttons** | when the element is clicked.
**Text and password fields** | when the text is changed and only if the `data-track-input` attribute is presented.
**Dropdowns, checkboxes, radios** | when the element is selected.

<a name="data-attribute-examples" class="anchor" href="#data-attribute-examples"></a>
### Data attributes API examples

Trigger the `onCalculate` handler when the form is submitted. Update the element with the identifier "result"` with the **calcresult** partial:

    <form data-request="onCalculate" data-request-update="calcresult: '#result'">

Request a confirmation when the Delete button is clicked before the request is sent:

    <form ... >
        ...
        <button data-request="onDelete" data-request-confirm="Are you sure?">Delete</button>

Redirect to another page after the successful request:

    <form data-request="onLogin" data-request-redirect="/admin">

Show a popup window after the successful request:

    <form data-request="onLogin" data-request-success="alert('Yay!')">

Send a POST parameter `mode` with a value `update`:

    <form data-request="onUpdate" data-request-data="mode: 'update'">

Send a POST parameter `id` with value `7` across multiple elements:

    <div data-request-data="id: 7">
        <button data-request="onDelete">Delete</button>
        <button data-request="onSave">Update</button>
    </div>

<a name="javascript-api" class="anchor" href="#javascript-api"></a>
## JavaScript API

The JavaScript API is more powerful than the data attributes API. The `request()` method can be used with any element that is inside a form, or on with a form element. When the method is used with an element inside a form, it is forwarded to the form. 

The `request()` method has a single required parameter - the AJAX handler name. Example:

    <form onsubmit="$(this).request('onProcess'); return false;">
        ...

The second attribute of the `request()` method is the options object. You can use any options and methods compatible with the [jQuery AJAX function](http://api.jquery.com/jQuery.ajax/). The following options are specific for the October framework:

Option  | Description
------------- | -------------
**update** | an object, specifies a list partials and page elements (as CSS selectors) to update: {'partial': '#select'}. If the selector string is prepended with the `@` symbol, the content received from the server will be appended to the element, instead of replacing the existing content.
**confirm** | the confirmation string. If set, the confirmation is displayed before the request is sent. If the users clicks the Cancel button, the request cancels.
**data** | an optional object specifying data to be sent to the server along with the form data: {var: 'value'}.
**redirect** | string specifying an URL to redirect the browser to after the successful request.
**beforeUpdate** | a callback function to execute before page elements are updated. The function gets 3 parameters: the data object received from the server, text status string, and the jqXHR object. The `this` variable inside the function resolves to the request content - an object containing 2 properties: `handler` and `options` representing the original request() parameters.
**success** | a callback function to execute in case of a successful request. If this option is supplied it overrides the default framework's functionality: the elements are not updated, the `beforeUpdate` event is not triggered, the `ajaxUpdate` and `ajaxUpdateComplete` events are not triggered. The event handler gets 3 arguments: the data object received from the server, the text status string and the jqXHR object. However, you can still call the default framework functionality calling `this.success(...)` inside your function.
**error** | a callback function execute in case of an error. By default the alert message is displayed. If this option is overridden the alert message won't be displayed. The handler gets 3 parameters: the jqXHR object, the text status string and the error object - see [jQuery AJAX function](http://api.jquery.com/jQuery.ajax/).
**complete** | a callback function execute in case of a success or an error.

<a name="javascript-examples" class="anchor" href="#javascript-examples"></a>
### JavaScript API examples

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
        beforeUpdate: function(){ /* do something */ }
    })

Run `onCalculate` handler and if successful, run some custom code and the default `success` function:

    $('form').request('onCalculate', {success: function(data){
        //... do something ...
        this.success(data);
    }})

Execute a request without a FORM element:

    $.request('onCalculate', {
        success: function(){
            console.log('Finished!')
        }
    })

Run `onCalculate` handler and if successful, run some custom code after the default `success` function is done:

    $('form').request('onCalculate', {success: function(data){
        this.success(data).done(function() {
            //... do something after parent success() is finished ...
        });
    }})

<a name="components-ajax-handlers" class="anchor" href="#components-ajax-handlers"></a>
## Calling AJAX handlers defined in components

If you need to issue a request to an AJAX handler defined in a [component](components) attached to a page or layout, you should prefix the handler name with the component short name or [alias](components#aliases). The next example demonstrates how to invoke the **onCalculate** AJAX handler defined in the imaginary **calculator** component:

    <form data-request="calculator::onCalculate" data-request-update="calcresult: '#result'">

<a name="global-events" class="anchor" href="#global-events"></a>
## Global AJAX events

The AJAX framework triggers several events on the updated elements, form, and the window object. The events are triggered regardless on which API was used - the data attributes API or the JavaScript API.

Event  | Description
------------- | -------------
**ajaxBeforeSend** | triggered on the window object before sending the request.
**ajaxUpdate** | triggered on a page element after it has been updated with the framework. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxUpdateComplete** | triggered on the window object after all elements are updated by the framework. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxBeforeUpdate** | triggered on the form object directly after the request is complete, but before the page is updated. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxSuccess** | triggered on the form object after after the request is successfully completed. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
**ajaxError** | triggered on the form object if the request encounters an error. The handler gets 5 parameters: the event object, the context object, the status text string, and the jqXHR object.


The next example execute JavaScript code when the `ajaxUpdate` event is triggered on an element. 

    $('.calcresult').on('ajaxUpdate', function(){
        console.log('Updated!');
    })

<a name="returning-data-from-handlers" class="anchor" href="#returning-data-from-handlers"></a>
## Returning data from AJAX handlers

In advanced cases you may want to return structured data from your AJAX handlers. If an AJAX handler returns an array, you can access its elements in the `success` event handler. Example AJAX handler:

    function onFetchDataFromServer()
    {
        /* Something server-side code */

        return [
            'totalUsers'=>1000,
            'totalProjects'=>937
        ];
    }

The data can be fetched with the data attributes API:

    <form data-request="onHandleForm" data-request-success="console.log(data)">

The same with the JavaScript API:

    <form
        onsubmit="$(this).request('onHandleForm', {
            success: function(data){
                console.log(data)
            }
        }); return false;">

<a name="redirections-in-handlers" class="anchor" href="#redirections-in-handlers"></a>
## Redirections in AJAX handlers

If you need to redirect the browser to another location, return the `Redirect` object from the AJAX handler. The framework will redirect the browser as soon as the response is returned from the server. Example AJAX handler:

    function onRedirectMe()
    {
        return Redirect::to('http://google.com');
    }


<a name="pushing-content-updates" class="anchor" href="#pushing-content-updates"></a>
## Pushing content updates

AJAX handlers can push content updates to the client-side browser from the server-side. Comparatively, using **data-request-update** attribute in [data attributes](#data-attributes) or the **update** property in the [javascript-api](#javascript-api) is considered *pulling a content update*.

To push an update the handler can return an array where the key is a HTML element to update (using a simple CSS selector) and the value is the content to update. The following example will update an element on the page with the id **flashMessages** using the contents found inside the partial **flash-messages** containing [markup to display flash messages](markup#flash-messages).

    function onFlash()
    {
        return ['#flashMessages' => $this->renderPartial('flash-messages')];
    }

> **Note:** The key name must start with an identifier `#` or class `.` character to trigger a content update.
