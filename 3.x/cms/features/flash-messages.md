---
subtitle: Display a message about the outcome of a request.
---
# Flash Messages

Flash Messages are a handy way to let the user know the outcome of a request, either as a sucess or failure. Simply use the `Flash` facade to display a message after the request finishes. Flash messages are usually set inside [AJAX handlers](../ajax/handlers.md), inside [Component logic](../../extend/cms-components.md) or inside the page or layout [PHP section](../themes/themes.md).

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

To only display a specific flash message type, you may pass the value to the attribute &mdash; **success**, **error**, **info** or **warning**. Multiple values are separated by commas.

```html
<form data-request-flash="success,warning"></form>
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

::: aside
See the [Flash Twig Tag article](../../markup/tag/flash.md) to learn more about the `{% flash %}` tag.
:::

To display inline flash messages or completely change the default flash message markup, create a new partial in your theme with the custom content. For example, create a new partial named **flash-messages.htm** and paste in the following content.

```twig
{% flash %}
    <div class="alert alert-{{ type }}">
        {{ message }}
    </div>
{% endflash %}
```

Next, include the partial in your form as [a self-updating partial](../../markup/tag/ajax-partial.md) using the `{% ajaxPartial %}` tag. Referencing the partial name in `data-request-update` will automatically update this partial and disable the in-built flash messages.

```twig
<form>
    {% ajaxPartial 'flash-messages' %}

    <label>Title</label>
    <input name="title" />

    <button
        data-request="onSave"
        data-request-update="{ flash-messages: true }">
        Save
    </button>
</form>
```

Alternatively, you can include the partial inside a layout, and update it globally instead of adding the `data-request-flash` every element. Add the `ajax-request-update` meta tag in the head section of the page, and set the content attribute to [update the partial globally](../ajax/update-partials.md).

```html
<head>
    <meta name="ajax-request-update" content="{ flash-messages: true }" />
</head>
<body>
    <!-- Updates with every AJAX request -->
    {% ajaxPartial 'flash-messages' %}
</body>
```

## Working with JavaScript

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
