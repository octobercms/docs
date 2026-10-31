---
previousPath: cms/ajax/attributes-api.md
subtitle: Send AJAX requests and handle the response using HTML data attributes.
---
# Data Attributes API

The data attributes API sends AJAX requests from HTML, with no JavaScript required. It is usually shorter than the [JavaScript API](./javascript-api.md) for the same result.

```html
<button data-request="onSave" data-request-update="{ result: '#result' }">
    Save
</button>
```

## Available Attributes

The following attributes are supported. Each name links to its full reference on the Larajax site.

data-request Attribute | Description
------------- | -------------
[data-request](https://larajax.org/api/attributes/request) | specifies the AJAX handler name.
[data-request-confirm](https://larajax.org/api/attributes/request-confirm) | specifies a confirmation message. A confirmation dialog is displayed before the request is sent. If the user clicks the Cancel button the request isn't sent.
[data-request-redirect](https://larajax.org/api/attributes/request-redirect) | specifies a URL to redirect the browser after the successful AJAX request.
[data-request-url](https://larajax.org/api/attributes/request-url) | specifies a URL to which the request is sent. default: `window.location.href`
[data-request-update](https://larajax.org/api/attributes/request-update) | specifies a list of partials and page elements (CSS selectors) to update. The format is as follows: `partial: selector, partial: selector`. Usage of quotes is required in some cases, for example: `'my-partial': '#myelement'`. The selector string should start with a `#` or `.` character, except you may also prepend it with `@` to append contents to the element, `^` to prepend, `!` to replace with and `=` to use any CSS selector.
[data-request-data](https://larajax.org/api/attributes/request-data) | specifies additional POST parameters to be sent to the server. The format is as follows: `var: value, var: value`. Use quotes if needed: `var: 'some string'`. The attribute can be used on the triggering element, for example on the button that also has the `data-request` attribute, on the closest element of the triggering element and on the parent form element. The framework merges values of the `data-request-data` attributes. If the attribute on different elements defines parameters with the same name, the framework uses the following priority: the triggering element `data-request-data`, the closer parent elements `data-request-data`, the form input data.
[data-request-query](https://larajax.org/api/attributes/request-query) | specifies additional GET parameters to be sent to the server and added to the current URL query string.
[data-request-before-update](https://larajax.org/api/attributes/request-before-update) | specifies JavaScript code to execute directly before the page contents are updated.
[data-request-success](https://larajax.org/api/attributes/request-success) | specifies JavaScript code to execute after the request is successfully completed. The `data` variable is available in this function containing the response data.
[data-request-error](https://larajax.org/api/attributes/request-error) | specifies JavaScript code to execute if the request encounters an error. The `data` variable is available in this function containing the response data.
[data-request-complete](https://larajax.org/api/attributes/request-complete) | specifies JavaScript code to execute if the request is successfully completed or encounters an error. The `data` variable is available in this function containing the response data.
[data-request-cancel](https://larajax.org/api/attributes/request-cancel) | specifies JavaScript code to execute if the user aborts the request or cancels it via a confirmation dialog.
[data-request-message](https://larajax.org/api/attributes/request-message) | displays a progress message with the specified text, shown while the request is running. This option is used by the [flash messages features](./flash-messages.md).
[data-request-loading](https://larajax.org/api/attributes/request-loading) | specifies a CSS selector for an element to be displayed while the request runs. You can use this option to show an AJAX loading indicator. The feature uses the CSS display values `block` and `none` to manage the element visibility.
[data-request-progress-bar](https://larajax.org/api/attributes/request-loading) | enables the [progress bar](./loaders.md) when an AJAX request occurs.
[data-request-form](https://larajax.org/api/attributes/request) | explicitly specifies a form element to use for sourcing the form data. If this is unspecified, the closest form to the triggering element is used, including if the element itself is a form.
[data-request-flash](https://larajax.org/api/attributes/request-flash) | when included, instructs the server to clear and send any flash messages with the response. This option is used by the [flash messages features](./flash-messages.md).
[data-request-files](https://larajax.org/api/attributes/request-files) | when specified the request will accept file uploads using the `FormData` interface.
[data-request-download](https://larajax.org/api/attributes/request-files) | not required for file downloads. A response with a `Content-Disposition` header is downloaded automatically, using the filename sent by the server. See [File Downloads](./downloads.md).
[data-request-bulk](https://larajax.org/api/attributes/request) | when specified the request is sent as JSON for bulk data transactions.
[data-browser-target](https://larajax.org/api/attributes/request-files) | when the response is a file download, opens it in this window target, for example `_blank`.
[data-browser-validate](https://larajax.org/api/attributes/request-validate) | when specified browser-based client side validation will run on the request before it submits.
[data-browser-redirect-back](https://larajax.org/api/attributes/request-redirect) | when a redirect occurs, if the previous URL from the browser is available, use that in place of the redirect URL provided.
[data-request-poll](https://larajax.org/api/attributes/request-poll) | automatically triggers an AJAX request on elements that also have the `data-request` attribute. The request submits when the browser window is active using the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API). The attribute value sets the interval the framework waits between requests, in milliseconds or with a unit such as `5s`.
[data-track-input](https://larajax.org/api/attributes/request-trigger) | can be applied to a text, number, or password input field that also has the `data-request` attribute. When defined, the input field automatically sends an AJAX request when a user types something in the field. The optional attribute value can define the interval, in milliseconds, the framework waits before it sends the requests.

## Triggering Events

An element with the `data-request` attribute sends an AJAX request when the user interacts with it. The event depends on the type of element.

Element | Event
------------- | -------------
**Forms** | when the form is submitted.
**Links, buttons** | when the element is clicked.
**Text, number, and password fields** | when the text is changed and only if the `data-track-input` attribute is present.
**Dropdowns, checkboxes, radios** | when the element is selected.

## Examples

### Updating a Partial

Trigger the `onCalculate` handler when the form is submitted, then update the element with the ID **result** with the **calcresult** partial.

```html
<form data-request="onCalculate" data-request-update="{ calcresult: '#result' }">
```

### Asking for Confirmation

Ask for confirmation before the request is sent when the Delete button is clicked.

```html
<form ... >
    ...
    <button data-request="onDelete" data-request-confirm="Are you sure?">Delete</button>
```

### Redirecting After Success

Redirect to another page after the request succeeds.

```html
<form data-request="onLogin" data-request-redirect="/admin">
```

### Running Code After Success

Show a popup window after the request succeeds.

```html
<form data-request="onLogin" data-request-success="alert('Yay!')">
```

### Sending Extra Data

Send a POST parameter `mode` with the value `update`.

```html
<form data-request="onUpdate" data-request-data="{ mode: 'update' }">
```

Send a POST parameter `id` with the value `7` from multiple elements.

```html
<div data-request-data="{ id: 7 }">
    <button data-request="onDelete">Delete</button>
    <button data-request="onSave">Update</button>
</div>
```

Send a GET parameter `page` with the value `6` on the current request.

```html
<button data-request="onSetPage" data-request-query="{ page: 6 }">
    Page 6
</button>
```

### Showing a Loading Message

Show a [flash message](./flash-messages.md) while the request is loading.

```html
<button data-request="onUpdate" data-request-message="Loading...">
    Save Changes
</button>
```

### Uploading and Downloading Files

Include [file uploads](./uploads.md) with a request.

```html
<form data-request="onSubmit" data-request-files>
    <input type="file" name="photo" accept="image/*" />
    <button type="submit">Submit</button>
</form>
```

Open a [file download](./downloads.md) in a new window, such as to preview a PDF.

```html
<button
    data-request="onDownloadFile"
    data-browser-target="_blank">
    Download
</button>
```

#### See Also

::: also
* [Larajax Attributes Reference](https://larajax.org/api/attributes)
* [JavaScript API](./javascript-api.md)
:::
