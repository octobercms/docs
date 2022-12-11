---
subtitle: Indicate that the page is currently loading.
---
# Loading Indicators

October CMS ships with some unobtrusive loading indicators it easier to handle pending requests.

## Progress Bar

The first feature you should notice is a progress bar that is displayed on the top of the page when an AJAX request runs.

The progress bar listens for the AJAX event used by [the JavaScript AJAX framework](./javascript-api.md). When an AJAX request starts the `ajax:promise` event is fired that displays the indicator and puts the mouse cursor in a loading state. The `ajax:fail` and `ajax:done` events are used to detect when the request finishes, where the indicator is hidden again.

You may display the progress bar using JavaScript using the `oc.progressBar` object and `show` / `hide` functions.

```js
oc.progressBar.show();

oc.progressBar.hide();
```

You can disable the progress bar for a request using the `progressBar` option of an AJAX request.

```js
oc.ajax('onSilentRequest', { progressBar: false });
```

## Loading Button

When any element contains the `data-attach-loading` attribute, the CSS class `oc-attach-loader` will be added to it during the AJAX request. This class will spawn a loading spinner on button and anchor elements using the `:after` CSS selector.

```html
<form data-request="onSubmit">
    <button data-attach-loading>
        Submit
    </button>
</form>

<a
    href="#"
    data-request="onDoSomething"
    data-attach-loading>
    Do something
</a>
```

You can manually add the loader to a button using the `oc.attachLoader` object and `show` / `hide` functions passing the element selector or object as the first argument.

```js
oc.attachLoader.show('.some-button');

oc.attachLoader.hide('.some-button');
```
