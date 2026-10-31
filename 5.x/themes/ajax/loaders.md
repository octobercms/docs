---
previousPath: cms/features/loaders.md
subtitle: Show the visitor that an AJAX request is in progress and prevent double submissions.
---
# Loading Indicators

The page may not update the moment an AJAX request starts, so show a loading indicator while it runs. The quickest option is the `data-attach-loading` attribute, which adds a loading spinner to the element during the request.

```html
<a href="#"
    data-request="onDoSomething"
    data-attach-loading>
    Do Something
</a>
```

::: tip
The loading button and progress bar are extra features, so the layout must include the `{% framework extras %}` tag. See [Including the Framework](./introduction.md#including-the-framework).
:::

## Preventing Double Submissions with a Loading Button

Users can click a submit button twice by accident and send the form twice. A loading button solves this. During an AJAX request, button elements with the `data-attach-loading` attribute are disabled and get the `jax-attach-loader` CSS class. The class adds a loading spinner to button and anchor elements using the `:after` CSS selector.

Inside a form, submit buttons with the `data-attach-loading` attribute display the loading indicator while the form's request runs.

```html
<form data-request="onSubmit">
    <button type="submit" data-attach-loading>
        Submit
    </button>
</form>
```

Inputs do not support the `:after` CSS selector, so the framework inserts a new element after them instead and removes it when the request completes. This is useful with the `data-track-input` attribute, which watches the input for changes and sends the AJAX request.

```html
<input name="username"
    data-request="onCheckUsername"
    data-track-input
    data-attach-loading />
```

To add the loader to an element manually, use the `show` and `hide` functions of the `jax.attachLoader` object. Pass the element selector or object as the first argument.

```js
jax.attachLoader.show('.my-element');

jax.attachLoader.hide('.my-element');
```

## Showing the Progress Bar

The AJAX framework displays a progress bar at the top of the page while a request runs. The bar appears when a request takes longer than 500ms and hides again when the request completes.

To disable the progress bar for a request, set the `data-request-progress-bar` attribute to `false`.

```html
<button
    data-request="onDoSomething"
    data-request-progress-bar="false">
    Do something
</button>
```

In JavaScript, set the `progressBar` option of the request to `false`.

```js
jax.ajax('onSilentRequest', { progressBar: false });
```

To disable the progress bar globally, set its `visibility` style to `hidden` in a stylesheet.

```css
.jax-progress-bar {
    visibility: hidden;
}
```

To display the progress bar from JavaScript, use the `show` and `hide` functions of the `jax.progressBar` object.

```js
jax.progressBar.show();

jax.progressBar.hide();
```

## Showing an Element While Loading

The `data-request-loading` attribute makes an element visible during an AJAX request. The value is a CSS selector, and the framework sets the element's CSS display to `block` or `none` to manage its visibility.

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

### Styling the Page During Any Request

While any AJAX request is in progress, the HTML element has the `data-ajax-progress` attribute. Use it in a stylesheet.

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

### Targeting a Specific Handler

To show a loading indicator for one [AJAX handler](./handlers.md), use the form's `data-ajax-progress` attribute, which contains the name of the most recent handler.

```html
<form>
    <button data-request="onPay">Pay Now</button>
    <button data-request="onCancel">Cancel</button>

    <div class="is-payment-loading">
        Processing Payment...
    </div>
</form>
```

Target the handler with an attribute value selector in a stylesheet.

```css
.is-payment-loading {
    display: none;
}

form[data-ajax-progress=onPay] .is-payment-loading {
    display: block;
}
```

## Working with JavaScript

For more complex cases, use the `ajax:promise` and `ajax:always` events from the [AJAX JavaScript API](./javascript-api.md). You can listen to them on the document, a form or a target element.

```js
formElement.addEventListener('ajax:promise', function() {
    // A new request has started
});

formElement.addEventListener('ajax:always', function() {
    // A request has ended
});
```

The following disables all inputs inside a form while the request runs.

```js
addEventListener('ajax:promise', function(event) {
    event.target.closest('form').querySelectorAll('input').forEach(function(el) {
        el.disabled = true;
    });
});

addEventListener('ajax:always', function(event) {
    event.target.closest('form').querySelectorAll('input').forEach(function(el) {
        el.disabled = false;
    });
});
```

#### See Also

::: also
* [Data Attributes API](./attributes-api.md)
* [JavaScript API](./javascript-api.md)
:::
