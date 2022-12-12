---
subtitle: Interact with handlers using HTML attributes.
---
# Data Attributes API

The data attributes API lets you issue AJAX requests without any JavaScript. In many cases the data attributes API is less verbose than the JavaScript API - you write less code to get the same result. The supported AJAX data attributes are:

data-request Attribute | Description
------------- | -------------
**data-request** | specifies the AJAX handler name.
**data-request-confirm** | specifies a confirmation message. The confirmation is displayed before the request is sent. If the user clicks the Cancel button the request isn't sent.
**data-request-redirect** | specifies a URL to redirect the browser after the successful AJAX request.
**data-request-url** | specifies a URL to which the request is sent. default: `window.location.href`
**data-request-update** | specifies a list of partials and page elements (CSS selectors) to update. The format is as follows: `partial: selector, partial: selector`. Usage of quotes is required in some cases, for example: `'my-partial': '#myelement'`. The selector string should start with a `#` or `.` character, except you may also prepend it with `@` to append contents to the element, `^` to prepend, `!` to replace with and `=` to use any CSS selector.
**data-request-data** | specifies additional POST parameters to be sent to the server. The format is following: `var: value, var: value`. Use quotes if needed: `var: 'some string'`. The attribute can be used on the triggering element, for example on the button that also has the `data-request` attribute, on the closest element of the triggering element and on the parent form element. The framework merges values of the `data-request-data` attributes. If the attribute on different elements defines parameters with the same name, the framework uses the following priority: the triggering element `data-request-data`, the closer parent elements `data-request-data`, the form input data.
**data-request-before-update** | specifies JavaScript code to execute directly before the page contents are updated.
**data-request-success** | specifies JavaScript code to execute after the request is successfully completed.
**data-request-error** | specifies JavaScript code to execute if the request encounters an error.
**data-request-complete** | specifies JavaScript code to execute if the request is successfully completed or encounters an error.
**data-request-loading** | specifies a CSS selector for an element to be displayed while the request runs. You can use this option to show an AJAX loading indicator. The feature uses CSS display `block` and `none` attributes to manage the element visibility.
**data-request-progress-bar** | enable the progress bar when an AJAX request occurs. Default `true` when using [extra features](./introduction.md), otherwise `false`.
**data-request-form** | explicitly specify a form element to use for sourcing the form data. If this is unspecified, the closest form to the triggering element is used, including if the element itself is a form.
**data-request-flash** | when included, instructs the server to clear and send any flash messages with the response. This option is used by the [flash messages features](../features/flash-messages.md).
**data-request-files** | when specified the request will accept file uploads using the `FormData` interface.
**data-request-download** | when specified file downloads are accepted with a `Content-Disposition` response. This attribute can be added anonymously or set to the downloaded filename.
**data-request-bulk** | when specified the request be sent as JSON for bulk data transactions.
**data-browser-validate** | when specified browser-based client side validation will run on the request before it submits.
**data-track-input** | can be applied to a text, number, or password input field that also has the `data-request` attribute. When defined, the input field automatically sends an AJAX request when a user types something in the field. The optional attribute value can define the interval, in milliseconds, the framework waits before it sends the requests.

When the `data-request` attribute is specified for an element, the element triggers an AJAX request when a user interacts with it. Depending on the type of element, the request is triggered on the following events:

Element | Event
------------- | -------------
**Forms** | when the form is submitted.
**Links, buttons** | when the element is clicked.
**Text, number, and password fields** | when the text is changed and only if the `data-track-input` attribute is presented.
**Dropdowns, checkboxes, radios** | when the element is selected.

## Usage Examples

Trigger the `onCalculate` handler when the form is submitted. Update the element with the identifier "result"` with the **calcresult** partial.

```html
<form data-request="onCalculate" data-request-update="{ calcresult: '#result' }">
```

Request a confirmation when the Delete button is clicked before the request is sent.

```html
<form ... >
    ...
    <button data-request="onDelete" data-request-confirm="Are you sure?">Delete</button>
```

Redirect to another page after the successful request.

```html
<form data-request="onLogin" data-request-redirect="/admin">
```

Show a popup window after the successful request.

```html
<form data-request="onLogin" data-request-success="alert('Yay!')">
```

Send a POST parameter `mode` with a value `update`.

```html
<form data-request="onUpdate" data-request-data="{ mode: 'update' }">
```

Send a POST parameter `id` with value `7` across multiple elements.

```html
<div data-request-data="{ id: 7 }">
    <button data-request="onDelete">Delete</button>
    <button data-request="onSave">Update</button>
</div>
```

Including [file uploads](../../extend/services/request-input.md) with a request.

```html
<form data-request="onSubmit" data-request-files>
    <input type="file" name="photo" accept="image/*" />
    <button type="submit">Submit</button>
</form>
```

Including [file downloads](../../extend/services/response-view.md) with a response.

```html
<button data-request="onDownloadFile" data-request-download>
    Download
</button>
```

To specify a custom filename and open the download in a new window, such as previewing a PDF.

```html
<button
    data-request="onDownloadFile"
    data-request-download="sample.pdf"
    data-browser-target="_blank">
    Download
</button>
```
