---
subtitle: Indicate that the page is currently loading.
---
# Loading Indicators

When the AJAX framework makes a request to the server, it is a good idea to display a loading indicator since the page may not update immediately. There are several approaches and standard loading indicators to make it clear when an AJAX request has been triggered and is in progress.

## Progress Bar

A prominent feature of the AJAX framework is a progress bar that is displayed on the top of the page when an AJAX request runs. The progress bar listens for an AJAX request and will appear when a request takes longer than 300ms and hides again when the request is complete.

To disable the progress bar for a request, set the `data-request-progress-bar` attribute to `false`.

```html
<button
    data-request="onDoSomething"
    data-request-progress-bar="false">
    Do something
</button>
```

In JavaScript, set the `progressBar` option of an AJAX request to `false`.

```js
oc.ajax('onSilentRequest', { progressBar: false });
```

To disable the progress bar globally, set the `visibility` style to `hidden` using a StyleSheet.

```css
.oc-progress-bar {
    visibility: hidden;
}
```

You may display the progress bar using JavaScript using the `oc.progressBar` object and `show` / `hide` functions.

```js
oc.progressBar.show();

oc.progressBar.hide();
```

## Loading Button

When submitting forms, users can accidentally click the button twice and cause a double submission, and this is solved using a loading button. During AJAX requests, button elements that have the `data-attach-loading` attribute will be disabled, and a CSS class `oc-attach-loader` added. This class will spawn a loading spinner on button and anchor elements using the `:after` CSS selector.

```html
<a href="#"
    data-request="onDoSomething"
    data-attach-loading>
    Do Something
</a>
```

When a button exists inside a form that contain the `oc-attach-loader` attribute will display the loading indicator.

```html
<form data-request="onSubmit">
    <button data-attach-loading>
        Submit
    </button>
</form>
```

Since inputs do not support the `:after` CSS selector, they have a new element inserted after them instead. The element is removed once the AJAX request is complete. This is useful when working with the `data-track-input` attribute that watches the input for changes and submits the AJAX request.

```html
<input name="username"
    data-request="onCheckUsername"
    data-track-input
    data-attach-loading />
```

You can manually add the loader to a button using the `oc.attachLoader` object and `show` / `hide` functions passing the element selector or object as the first argument.

```js
oc.attachLoader.show('.my-element');

oc.attachLoader.hide('.my-element');
```

## Toggling Elements

You can use the `data-request-loading` attribute to make an element visible during an AJAX request. The value is a CSS selector that uses display `block` and `none` attributes to manage the element visibility.

```html
<button
    data-request="onPay"
    data-request-loading=".is-loading">
    Pay Now
</button>

<div style="display:none" class="is-loading">
    Processing Payment...
</div>
```

### Detecting Global Requests

You can detect when a global AJAX request is in progress by checking the `data-ajax-progress` attribute on the HTML element. Expressed in a StyleSheet as the following.

```css
html[data-ajax-progress] {
    /* Display loading indicators */
}
```

The attribute is also added to form elements.

```css
form[data-ajax-progress] {
    /* The form is loading */
}
```

### Targeting Specific Handlers

In some cases you may want to show a loading indicator for a specific [AJAX handler event](../ajax/handlers.md), the `data-ajax-progress` attribute will contain the most recent handler name, and this can be used to target a specific request.

```html
<form>
    <button data-request="onPay">Pay Now</button>
    <button data-request="onCancel">Cancel</button>

    <div class="is-payment-loading">
        Processing Payment...
    </div>
</form>
```

This can be targeted using a StyleSheet attribute value selector.

```css
.is-payment-loading {
    display: none;
}

form[data-ajax-progress=onPayment] .is-payment-loading {
    display: block;
}
```

## Working with JavaScript

For more complex scenarios, you can hook in to the [AJAX JavaScript API](../ajax/javascript-api.md) using the `ajax:promise` and `ajax:always` events. These events can be attached to the document, form or target elements.

```js
formElement.addEventListener('ajax:promise', function() {
    // A new request has started
});

formElement.addEventListener('ajax:always', function() {
    // A request has ended
});
```

The following example will disable all inputs inside a form while the request is running.

```js
addEventListener('ajax:promise', function(event) {
    event.target.closest('form').querySelectorAll('input').forEach(function(el) {
        el.disabled = true;
    });
});

addEventListener('ajax:always', function() {
    event.target.closest('form').querySelectorAll('input').forEach(function(el) {
        el.disabled = false;
    });
});
```
