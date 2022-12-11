---
subtitle: Give your users an update on the outcome of a request.
---
# Flash Messages

Specify the `data-request-flash` attribute on a form to enable the use of flash messages on successful AJAX requests.

```html
<form
    data-request="onSuccess"
    data-request-flash>
    <!-- ... -->
</form>
```

Combined with use of the `Flash` facade in the event handler, a flash message will appear after the request finishes.

```php
function onSuccess()
{
    Flash::success('You did it!');
}
```

To remain consistent with AJAX based flash messages, you can render a [standard flash message](../../markup/tag/flash.md) when the page loads by placing this code in your page or layout.

```twig
{% flash %}
    <p
        data-control="flash-message"
        class="flash-message fade {{ type }}"
        data-interval="5">
        {{ message }}
    </p>
{% endflash %}
```

You may display a flash message using JavaScript using the `oc.flashMsg` function. A type can be specified as either `success`, `error` or `warning`. An optional `interval` can be specified to control how long the flash message is displayed in seconds.

```js
oc.flashMsg({
    message: 'The record has been successfully saved. This message will go away in 1 second.',
    type: 'success',
    interval: 1
});
```
