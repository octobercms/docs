To use the AJAX framework it should be included by placing the `{% framework %}` tag anywhere inside the page or layout. 
This adds a reference to to the October front-end JavaScript library. The library requires jQuery, so it should be loaded first, for example:

```php
<script src="{{ [
    'assets/javascript/jquery.js',
]|theme }}"></script> 

{% framework %}
```

#### How AJAX requests work

A page can issue an AJAX request with the data attributes or with JavaScript. Each request invokes an *event handler* on the server and can update page elements using Partials. AJAX requests work best with forms, since the form data is automatically sent to the server. 

The AJAX request workflow:

1. Client issues an AJAX request by providing the event handler name, and optionally other parameters. The update list is an important request parameter - it tells the framework which page element should be updated with which partials.
2. The server finds an event handler by its name and executes it.
3. The handler executes the required business logic and updates the Page environment by injecting variables.
4. The server renders partials requested by the client.
5. The server sends the response, containing the rendered partials markup.
6. The client-side framework updates page elements with the partials data received from the server.

#### Event handlers

Event handlers are functions that can be defined in the page or layout PHP code section. Handlers can also be defined inside [Components](../extensibility/components).

Handler names should have the following pattern: `onName`. Handlers can inject variables to the next page cycle, where they can be used during the partial rendering. Example:

```php
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
```

> If two handlers with a same name defined in a page and layout together, the page handler will be executed.

#### Data attributes

AJAX requests can be issued using HTML data attributes. Using the data attributes doesn't require any JavaScript knowledge. The supported attributes are:

- **data-request** - specifies the AJAX handler name.
- **data-request-confirm** - specifies a confirmation message. The confirmation is displayed before the request is sent. If the user clicks Cancel button the request isn't sent.
- **data-request-redirect** - specifies a URL to redirect the browser after the successful AJAX request.
- **data-request-update** - specifies a list of partials and page elements (CSS selectors) to update. The format is as follows: `partial: selector, partial: selector`. Usage of quotes is required in some cases, for example: `'my-partial': '#myelement'`. If the selector string is prepended with the @ symbol, the content received from the server will be appended to the element, instead of replacing the existing content.
- **data-request-data** - specifies additional POST parameters to be sent to the server. The format is following: `var: value, var: value`. Use ampersands if needed: `var: 'some string'`.
- **data-request-success** - specifies JavaScript code to execute after the request is successfully completed.
- **data-request-loading** - will `show()` the specified element when loading and then `hide()` after the request is complete.
- **data-track-input** - can be applied to a text or password input field that also has the `data-request` attribute. When defined, the input field automatically sends an AJAX request when a user types something in the field. The optional attribute value can define the interval, in milliseconds, the framework waits before it sends the requests.

When the `data-request` attribute is specified for an element, the element triggers an AJAX request when a user interacts with it. Depending on the type of element, the request is triggered on the following events:

- **Forms** - when the form is submitted.
- **Links, buttons** - when the element is clicked.
- **Drop-down lists, checkboxes, radios** - when the element is selected.

##### Data attribute examples

Trigger the `onCalculate` handler when the form is submitted. Update the element with `ID = "result"` with the **calcresult** partial.

```php
<form data-request="onCalculate" data-request-update="calcresult: '#result'">
```

Confirm a record deletion.

```php
<form ... >
    ...
    <button data-request="onDelete" data-request-confirm="Are you sure?">Delete</button>
```

Redirect to another page after the successful request.

```php
<form data-request="onLogin" data-request-redirect="/admin">
```

Show a popup window after the successful request.

```php
<form data-request="onLogin" data-request-success="alert('Yay!')">
```

Send a POST parameter of `mode` with a value `update`.

```php
<form data-request="onUpdate" data-request-data="mode: 'update'">
```

Send a POST parameter of `id` with value `7` across multiple elements.

```php
<div data-request-data="id: 7">
    <button data-request="onDelete">Delete</button>
    <button data-request="onSave">Update</button>
</div>
```

The priority of POST parameter values is:

1. The triggering element `data-request-data`
1. The closer parent elements `data-request-data`
1. The form input data

#### JavaScript API

The JavaScript API is more powerful than using data attributes. The `request()` method can be used with any element that is inside a form, or on with a form element. When the method is used with an element inside a form, it is forwarded to the form. 

The `request()` method has a single required parameter - the handler name. Example:

```php
<form onsubmit="$(this).request('onProcess'); return false;">
    ...
```

The second attribute of the `request()` method is the options. You can use any options and methods compatible with the [jQuery AJAX function](http://api.jquery.com/jQuery.ajax/). The following options are specific for the October framework:

- **update** - an object, specifies a list partials and page elements (as CSS selectors) to update: {'partial': '#select'}. If the selector string is prepended with the @ symbol, the content received from the server will be appended to the element, instead of replacing the existing content.
- **confirm** - the confirmation string. If set, the confirmation is displayed before the request is sent. If the users clicks the Cancel button, the request cancels.
- **data** - an optional object specifying data to be sent to the server along with the form data: {var: 'value'}.
- **redirect** a string specifying an URL to redirect the browser to after the successful request.
- **beforeUpdate** - a callback function to execute before page elements are updated. The function gets 3 parameters: the data object received from the server, text status string, and the jqXHR object. The `this` variable inside the function resolves to the request content - an object containing 2 properties: `handler` and `options` representing the original request() parameters.
- **success** - a callback function to execute in case of a successful request. If this option is supplied it overrides the default framework's functionality: the elements are not updated, the beforeUpdate event is not triggered, the ajaxUpdate and ajaxUpdateComplete events are not triggered. The event handler gets 3 arguments: the data object received from the server, the text status string and the jqXHR object. However, you can still call the default framework functionality calling `this.success(...)` inside your function.
- **error** - a callback function execute in case of an error. By default the alert message is displayed. If this option is overridden the alert message won't be displayed. The handler gets 3 parameters: the jqXHR object, the text status string and the error object (see [jQuery AJAX function](http://api.jquery.com/jQuery.ajax/)).
- **complete** - a callback function execute in case of a success or an error.

The `request()` method triggers several events on the updated elements, form, and the window object:

- **ajaxUpdate** - triggered on a page element after it has been updated with the framework. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
- **ajaxUpdateComplete** - triggered on the window object after all elements was updated with the framework. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.
- **ajaxSuccess** - triggered on the form object after all elements have been updated by the framework. The handler gets 5 parameters: the event object, the context object, the data object received from the server, the status text string, and the jqXHR object.

##### Some JavaScript API examples

```js
// Confirm a record deletion
$('form').request('onDelete', {confirm: 'Are you sure?', redirect: '/dashboard'})

// Run onCalculate handler and update with calcresult partial
$('form').request('onCalculate', {update: {calcresult: '.calcresult'})

// Run onCalculate handler with some extra data
$('form').request('onCalculate', {data: {value: 55})

// Run onCalculate and before updating, run some custom code
$('form').request('onCalculate', {beforeUpdate: function(){ /* do something */ }})

// Run onCalculate and if successful, run some custom code and the default
$('form').request('onCalculate', {success: function(data){
    //... do something ...
    this.success(data);
}})

// Execute a request without an element
$.request('onCalculate', {success: function(){ console.log('Finished!') }})

// Run onCalculate and if successful, run some custom code after the default is done
$('form').request('onCalculate', {success: function(data){
    this.success(data).done(function() {
        //... do something after parent success() is finished ...
    });
}})

// Assign the ajaxUpdate event handler to the .calcresult element
$('.calcresult').on('ajaxUpdate', function(){ console.log('Updated!'); })
```
