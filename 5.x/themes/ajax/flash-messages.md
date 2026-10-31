---
previousPath: cms/features/flash-messages.md
subtitle: Show a short message about the outcome of a request, such as a success or an error.
---
# Flash Messages

Flash messages tell the user how a request turned out, such as a success or a failure. Set a message with the `Flash` facade in your [AJAX handler](./handlers.md), then add the `data-request-flash` attribute to the form so the AJAX framework displays it when the request completes.

```html
<form data-request="onSave" data-request-flash>
    <!-- ... -->
</form>
```

```php
function onSave()
{
    Flash::success('Settings successfully saved!');
}
```

A flash message disappears after 3 seconds. Clicking a flash message stops it from disappearing.

::: tip
Flash messages are one of the extra features, so the layout must include the `{% framework extras %}` tag. See [Including the Framework](./introduction.md#including-the-framework).
:::

## Setting Flash Messages

Set flash messages inside [AJAX handlers](./handlers.md), inside [component logic](../extending/components.md) or inside the page or layout [PHP section](../structure.md). Each message type has its own method.

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

## Showing Messages After a Redirect

When a handler redirects the browser, the message must be displayed on the next page load. Render an [inline flash message](../../handbook/twig-tags/flash.md) by placing this code in your page or layout.

```twig
{% flash %}
    <p
        data-control="flash-message"
        data-type="{{ type }}"
        data-interval="5">
        {{ message }}
    </p>
{% endflash %}
```

## Choosing Which Types to Show

To display only specific message types, pass them as the attribute value: **success**, **error**, **info**, **warning** or **validate**. Separate multiple values with commas.

```html
<form data-request-flash="success,warning"></form>
```

To show every type except some, prefix those types with a minus sign.

```html
<form data-request-flash="-warning"></form>
```

When you combine `data-request-flash` with the [validation features](./validation.md), validation errors show inside the form and as a flash message. To show them inside the form only, exclude the **validate** type.

```html
<form
    data-request-validate
    data-request-flash="-validate">
```

## Showing a Loading Message

The `data-request-message` attribute displays a flash progress message while the request runs. This is useful for long running processes.

```html
<button
    data-request="onSubmit"
    data-request-message="Please wait while we process your request...">
    Submit
</button>
```

## Styling Flash Messages

To change the appearance of flash messages, target the `.jax-flash-message` CSS class along with the message type.

```css
.jax-flash-message.success {
    background: green;
}
.jax-flash-message.error {
    background: red;
}
.jax-flash-message.warning {
    background: orange;
}
.jax-flash-message.info {
    background: aqua;
}
.jax-flash-message.loading {
    background: aqua;
}
```

## Using Custom Flash Message Markup

::: aside
See the [Flash Twig Tag article](../../handbook/twig-tags/flash.md) to learn more about the `{% flash %}` tag.
:::

To display flash messages inline, or to replace the default markup entirely, create a partial in your theme with your own content. For example, create a partial named **flash-messages.htm** with the following content.

```twig
{% flash %}
    <div class="alert alert-{{ type }}">
        {{ message }}
    </div>
{% endflash %}
```

Include the partial in your form as [a self-updating partial](../../handbook/twig-tags/ajax-partial.md) with the `{% ajaxPartial %}` tag. When `data-request-update` references the partial name, the request updates this partial, and the built-in flash messages are not used.

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

### Updating Messages on Every Request

Instead of adding the update to every element, include the partial in a layout and [update it globally](./update-partials.md). Add the `ajax-request-update` meta tag to the head section of the page, with the partial in the content attribute.

```html
<head>
    <meta name="ajax-request-update" content="{ flash-messages: true }" />
</head>
<body>
    <!-- Updates with every AJAX request -->
    {% ajaxPartial 'flash-messages' %}
</body>
```

## Showing a Flash Message from JavaScript

Use the `jax.flashMsg` function to display a flash message with JavaScript. Set the type to `success`, `error`, `warning` or `info`. The optional `interval` sets how long the message is displayed, in seconds.

```js
jax.flashMsg({
    message: 'Record has been successfully saved. This message will disappear in 1 second.',
    type: 'success',
    interval: 1
});
```

#### See Also

::: also
* [Flash Twig Tag](../../handbook/twig-tags/flash.md)
* [Validating Forms](./validation.md)
:::
