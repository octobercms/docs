---
subtitle: Interact with handlers using HTML attributes.
---
# Data Attributes API

The data attributes API lets you issue AJAX requests without any JavaScript. In many cases the data attributes API is less verbose than the JavaScript API - you write less code to get the same result.

The primary attribute is `data-request` which specifies the AJAX handler name. Other common attributes include `data-request-update`, `data-request-confirm`, `data-request-data`, and `data-request-redirect`.

::: tip
For the complete list of available data attributes and their descriptions, see the [Larajax Attributes Reference](https://larajax.org/api/attributes).
:::

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

Send a GET parameter `page` with value `6` on the current request.

```html
<button data-request="onSetPage" data-request-query="{ page: 6 }">
    Page 6
</button>
```

Show a [flash message](../features/flash-messages.md) while the request is loading.

```html
<button data-request="onUpdate" data-request-message="Loading...">
    Save Changes
</button>
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

#### See Also

::: also
* [Larajax Attributes Reference](https://larajax.org/api/attributes)
* [JavaScript API](./javascript-api.md)
:::
