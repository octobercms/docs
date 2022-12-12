---
subtitle: Give your users an update on the outcome of a request.
---
# Flash Messages

Flash Messages are a handy way to let the user know the outcome of a request, either as a sucess or failure. Simply use the `Flash` facade to display a message after the request finishes. Flash messages are usually set inside [AJAX handlers](../ajax/handlers.md), inside [Component logic](../themes/components.md) or inside the page or layout [PHP section](../themes/themes.md).

```php
function onSave()
{
    // Sets a successful message
    Flash::success('Settings successfully saved!');

    // Sets an error message
    Flash::error('Something went wrong...');

    // Sets a warning message
    Flash::warning('Please confirm your email address soon');

    // Sets an informative message
    Flash::info('The export is still processing. Please try again in a minute.');
}
```

Flash messages will disappear after an interval of 5 seconds. The `error` message does not disappear automatically to preserve any important details.

## Built-in Flash Messages

The AJAX framework has built-in support for flash messages, simply specify the `data-request-flash` attribute on a form to enable the use of flash messages on completed AJAX requests.

```html
<form
    data-request="onSuccess"
    data-request-flash>
    <!-- ... -->
</form>
```

To ensure flash messages are also displayed when the browser is redirected, you should render a [inline flash message](../../markup/tag/flash.md) when the page loads by placing this code in your page or layout.

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

### Styling the Flash Message

To change the appearance of the flash message, target the `.oc-flash-message` CSS class.

```css
.oc-flash-message.success {
    background: green;
}
.oc-flash-message.error {
    background: red;
}
.oc-flash-message.warning {
    background: orange;
}
.oc-flash-message.info {
    background: aqua;
}
```

## Custom Flash Messages

To display inline flash messages or completely change the default flash message markup, create a new partial in your theme with the custom content. For example, a partial named **flash-messages.htm** may contain the following.

```twig
{% flash %}
    <div class="alert alert-{{ type }}">
        {{ message }}
    </div>
{% endflash %}
```

::: tip
See the [AJAX Partial Twig Tag article](../../markup/tag/flash.md) to learn more about the `{% flash %}` tag.
:::

Next, include the flash message in your forms (or layout) as [a self-updating partial](../../markup/tag/ajax-partial.md) using the `{% ajaxPartial %}` tag. Referencing the partial name using `data-request-flash` will automatically update this partial and disable the in-built flash messages.

```twig
<form>
    {% ajaxPartial 'flash-messages' %}

    Title: <input type="text" name="title" />

    <button
        data-request="onSave"
        data-request-flash="flash-messages">
        Save
    </button>
</form>
```

## Working with JavaScript

### Enable Flash Messages Globally

The following will force all AJAX requests to use (and flush) flash messages.

```js
addEventListener('ajax:setup', function(event) {
    const { options } = event.detail.context;
    options.flash = true;
});
```

You may also specify a self-updating partial name to include this partial update with every request.

```js
addEventListener('ajax:setup', function(event) {
    const { options } = event.detail.context;
    options.flash = 'flash-messages';
});
```

### Display a Flash Message Manually

Use the `oc.flashMsg` function to display a flash message using JavaScript. A type can be specified as either `success`, `error` or `warning`. An optional `interval` can be specified to control how long the flash message is displayed in seconds.

```js
oc.flashMsg({
    message: 'Record has been successfully saved. This message will disappear in 1 second.',
    type: 'success',
    interval: 1
});
```

#### See Also

::: also
* [Flash Twig Tag](../../markup/tag/flash.md)
:::
