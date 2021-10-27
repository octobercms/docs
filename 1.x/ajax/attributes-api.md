# Data Attributes API

The data attributes API lets you issue AJAX requests without any JavaScript. In many cases the data attributes API is less verbose than the JavaScript API - you write less code to get the same result. The supported AJAX data attributes are:

Attribute | Description
------------- | -------------
**data-request** | specifies the AJAX handler name.
**data-request-confirm** | specifies a confirmation message. The confirmation is displayed before the request is sent. If the user clicks the Cancel button the request isn't sent.
**data-request-redirect** | specifies a URL to redirect the browser after the successful AJAX request.
**data-request-url** | specifies a URL to which the request is sent. default: `window.location.href`
**data-request-update** | specifies a list of partials and page elements (CSS selectors) to update. The format is as follows: `partial: selector, partial: selector`. Usage of quotes is required in some cases, for example: `'my-partial': '#myelement'`. If the selector string is prepended with the `@` symbol, the content received from the server will be appended to the element, instead of replacing the existing content. If the selector string is prepended with the `^` symbol, the content will be prepended instead.
**data-request-ajax-global** | false by default. Set true to enable jQuery [ajax events](http://api.jquery.com/category/ajax/global-ajax-event-handlers/) globally : `ajaxStart`, `ajaxStop`, `ajaxComplete`, `ajaxError`, `ajaxSuccess` and `ajaxSend`.
**data-request-data** | specifies additional POST parameters to be sent to the server. The format is following: `var: value, var: value`. Use quotes if needed: `var: 'some string'`. The attribute can be used on the triggering element, for example on the button that also has the `data-request` attribute, on the closest element of the triggering element and on the parent form element. The framework merges values of the `data-request-data` attributes. If the attribute on different elements defines parameters with the same name, the framework uses the following priority: the triggering element `data-request-data`, the closer parent elements `data-request-data`, the form input data.
**data-request-before-update** | specifies JavaScript code to execute directly before the page contents are updated. Inside the JavaScript code you can access the following variables: `this` (the page element triggered the request), the `context` object, the `data` object received from the server, the `textStatus` text string, and the `jqXHR` object.
**data-request-success** | specifies JavaScript code to execute after the request is successfully completed. Inside the JavaScript code you can access the following variables: `this` (the page element triggered the request), the `context` object, the `data` object received from the server, the `textStatus` text string, and the `jqXHR` object.
**data-request-error** | specifies JavaScript code to execute if the request encounters an error. Inside the JavaScript code you can access the following variables: `this` (the page element triggered the request), the `context` object, the `textStatus` text string, and the `jqXHR` object.
**data-request-complete** | specifies JavaScript code to execute if the request is successfully completed or encounters an error. Inside the JavaScript code you can access the following variables: `this` (the page element triggered the request), the `context` object, the `textStatus` text string, and the `jqXHR` object.
**data-request-loading** | specifies a CSS selector for an element to be displayed while the request runs. You can use this option to show the AJAX loading indicator. The feature uses jQuery's `show()` and `hide()` functions to manage the element visibility.
**data-request-form** | explicitly specify a form element to use for sourcing the form data. If this is unspecified, the closest form to the triggering element is used, including if the element itself is a form.
**data-request-flash** | when specified this option instructs the server to clear and send any flash messages with the response. This option is also used by the [extra features](../ajax/extras#flash-messages).
**data-request-files** | when specified the request will accept file uploads, this requires `FormData` interface support by the browser.
**data-browser-validate** | when this option is specified, browser-based client side validation will be run on the request before it is submitted. This only applies to requests triggered in the context of a `<form>` element. **NOTE:** This form of validation does not play nice with complex forms where validated fields might not be visible to the user 100% of the time. Recommend that you avoid using it on anything but the most simple forms.
**data-track-input** | can be applied to a text, number, or password input field that also has the `data-request` attribute. When defined, the input field automatically sends an AJAX request when a user types something in the field. The optional attribute value can define the interval, in milliseconds, the framework waits before it sends the requests.

When the `data-request` attribute is specified for an element, the element triggers an AJAX request when a user interacts with it. Depending on the type of element, the request is triggered on the following events:

Element | Event
------------- | -------------
**Forms** | when the form is submitted.
**Links, buttons** | when the element is clicked.
**Text, number, and password fields** | when the text is changed and only if the `data-track-input` attribute is presented.
**Dropdowns, checkboxes, radios** | when the element is selected.

## Usage examples

Trigger the `onCalculate` handler when the form is submitted. Update the element with the identifier "result"` with the **calcresult** partial:

```html
<form data-request="onCalculate" data-request-update="calcresult: '#result'">
```

Request a confirmation when the Delete button is clicked before the request is sent:

```html
<form ... >
    ...
    <button data-request="onDelete" data-request-confirm="Are you sure?">Delete</button>
```

Redirect to another page after the successful request:

```html
<form data-request="onLogin" data-request-redirect="/admin">
```

Show a popup window after the successful request:

```html
<form data-request="onLogin" data-request-success="alert('Yay!')">
```

Send a POST parameter `mode` with a value `update`:

```html
<form data-request="onUpdate" data-request-data="mode: 'update'">
```

Send a POST parameter `id` with value `7` across multiple elements:

```html
<div data-request-data="id: 7">
    <button data-request="onDelete">Delete</button>
    <button data-request="onSave">Update</button>
</div>
```

Including [file uploads](../services/request-input#files) with a request:

```html
<form data-request="onSubmit" data-request-files>
    <input type="file" name="photo" accept="image/*" />
    <button type="submit">Submit</button>
</form>
```
