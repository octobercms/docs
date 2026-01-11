---
subtitle: Interact with handlers using JavaScript code.
---
# JavaScript API

The JavaScript API is more powerful than the data attributes API. The `jax.request` method can be used with any element that is inside a form, or on a form element. When the method is used with an element inside a form, it is forwarded to the form.

The `jax.request` takes the target element and AJAX handler name as the first and second arguments. The target element can be a selector string or a HTML element. For example:

```html
<form onsubmit="jax.request(this, 'onProcess'); return false;">
    ...
```

The third argument of the `jax.request` method is an options object. Common options include `update`, `confirm`, `data`, `redirect`, and callback functions like `success` and `error`.

::: tip
For the complete list of request options and their descriptions, see the [Larajax JavaScript API Reference](https://larajax.org/api/framework).
:::

## Usage Examples

Request a confirmation before the `onDelete` request is sent.

```js
jax.request('#myform', 'onDelete', {
    confirm: 'Are you sure?',
    redirect: '/dashboard'
});
```

Run `onCalculate` handler and inject the rendered **calcresult** partial into the page element with the **result** CSS class.

```js
jax.request('#myform', 'onCalculate', {
    update: { calcresult: '.result' }
})
```

Run `onCalculate` handler with some extra data.

```js
jax.request('#myform', 'onCalculate', { data: { value: 55 } })
```

Run `onCalculate` handler and run some custom code before the page elements update.

```js
jax.request('#myform', 'onCalculate', {
    update: { calcresult: '.result' },
    beforeUpdate: function() { /* do something */ }
})
```

Run `onCalculate` handler and if successful, run some custom code after the page elements are updated.

```js
jax.request('#myform', 'onCalculate', {
    afterUpdate: function() { /* do something */ }
})
```

Use the `jax.ajax` method to execute a request without a FORM element.

```js
jax.ajax('onCalculate', {
    success: function() {
        console.log('Finished!');
    }
})
```

Run `onCalculate` handler and if successful, run some custom code after the default `success` function is done.

```js
jax.request('#myform', 'onCalculate', {
    success: function(data) {
        this.success(data).done(function() {
            // ... do something after parent success() is finished ...
        });
    }
})
```

## Global AJAX Events

The AJAX framework triggers events on the updated elements, triggering element, form, and window object. The events are triggered regardless of which API was used - the data attributes API or the JavaScript API.

Extra details are available on the `event.detail` property of the event handler. Common events include `ajax:before-send`, `ajax:update`, `ajax:update-complete`, `ajax:done`, and `ajax:fail`.

::: tip
For the complete list of AJAX events and their details, see the [Larajax Events Reference](https://larajax.org/api/events).
:::

## Event Examples

Executes JavaScript code when the `ajax:update` event is triggered on an element.

```js
document.querySelector('#result').addEventListener('ajax:update', function() {
    console.log('Updated!');
});
```

Execute a single request that shows a Flash Message using logic handler.

```js
jax.ajax('onDoSomething', {
    flash: true,
    handleFlashMessage: function(message, type) {
        jax.flashMsg({ message: message, type: type });
    }
});
```

Applies configurations to all AJAX requests globally.

```js
addEventListener('ajax:setup', function(event) {
    const { options } = event.detail.context;

    // Enable AJAX handling of Flash messages on all AJAX requests
    options.flash = true;

    // Disable the progress bar for all AJAX requests
    options.progressBar = false;

    // Handle Error Messages by triggering a flashMsg of type error
    options.handleErrorMessage = function(message) {
        jax.flashMsg({ message: message, type: 'error' });
    }

    // Handle Flash Messages by triggering a flashMsg of the message type
    options.handleFlashMessage = function(message, type) {
        jax.flashMsg({ message: message, type: type });
    }
});
```

Using a supplied `promise` from the event detail.

```js
addEventListener('ajax:confirm-message', function(event) {
    const { message, promise } = event.detail;

    // Prevent default behavior
    event.preventDefault();

    // Handle promise
    if (confirm(message)) {
        promise.resolve();
    }
    else {
        promise.reject();
    }
});
```

Animating an element after a specific AJAX handler completes its update.

```js
addEventListener('ajax:update-complete', function(event) {
    const { handler } = event.detail.context;

    // If the handler is either of the following
    if (['onRemoveFromCart', 'onAddToCart'].includes(handler)) {

        // Run an animation for 2 seconds
        var el = document.querySelector('#miniCart');
        el.classList.add('animate-shockwave');
        setTimeout(function() { el.classList.remove('animate-shockwave'); }, 2000);
    }
});
```

#### See Also

::: also
* [Larajax JavaScript API](https://larajax.org/api/framework)
* [Larajax Events Reference](https://larajax.org/api/events)
* [Data Attributes API](./attributes-api.md)
:::
