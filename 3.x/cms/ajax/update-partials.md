---
subtitle: Learn more about the updating your content dynamically.
---
# Updating Partials

When a handler executes it may prepare partials that are updated on the page, either by pushing or pulling, which can be rendered with some supplied variables.

## Pulling Partial Updates

The client browser may request partials to be updated from the server when it performs an AJAX request, which is considered *pulling a content update*.

Using the [`{% partial %}` tag](../../markup/tag/partial.md), the following code renders the **mytime** partial inside a `#myDiv` element on the page when calling the `onRefreshTime` [event handler](./handlers.md).

```twig
<div id="myDiv">
    {% partial 'mytime' %}
</div>
```

The [data attributes API](./attributes-api.md) uses the `data-request-update` attribute.

```html
<!-- Attributes API -->
<button
    data-request="onRefreshTime"
    data-request-update="{ mytime: '#myDiv' }">
    Go
</button>
```

The [JavaScript API](./javascript-api.md) uses the `update` configuration option:

```js
// JavaScript API
oc.request('#mybutton', 'onRefreshTime', {
    update: { mytime: '#myDiv' }
});
```

### Self-Updating Partials

The [`{% ajaxPartial %}` tag](../../markup/tag/ajax-partial.md) is dedicated to rendering AJAX partials.

```twig
{% ajaxPartial 'mytime' %}
```

When using this tag, the contents are wrapped in a container for you, so you can update the partial by name alone. Simply pass the `true` value instead of a container selector.

```html
<button
    data-request="onRefreshTime"
    data-request-update="{ mytime: true }">
    Go
</button>
```

You may also use the partial name `_self` for updating a partial from within itself.

```js
{ _self: true }
```

::: tip
See the [AJAX Partial Twig Tag article](../../markup/tag/ajax-partial.md) to learn more about the `{% ajaxPartial %}` tag.
:::

### Global Partial Updates

In some cases, such as with [flash messages](../../cms/features/flash-messages.md), you may wish to include a specific partial update with every response. To merge an update definition with every AJAX request, add the `ajax-request-update` meta tag in the head section of the page, and set the content attribute to an update definition.

```html
<head>
    <meta name="ajax-request-update" content="{ flash-messages: true }" />
</head>
```

## Update Definition

The definition of what should be updated is specified as a JSON-like object where:

- the left side (key) is the **partial name**
- the right side (value) is the **target element** to update

The following will request to update the `#myDiv` element with **mypartial** contents.

```js
{ mypartial: '#myDiv' }
```

::: tip
The selector must start with a `#` or `.` character to be valid.
:::

Multiple partials are separated by commas.

```js
{ firstpartial: '#myDiv', secondpartial: '#otherDiv' }
```

If the partial name contains a slash or a dash, it is important to 'quote' the left side.

```js
{ 'folder/mypartial': '#myDiv', 'my-partial': '#myDiv' }
```

The target element will always be on the right side since it can also be a HTML element in JavaScript.

```js
{ 'folder/mypartial': document.getElementById('myDiv') }
```

### Appending and Prepending Content

If the selector string is prepended with the `@` symbol, the content received from the server will be appended to the element, instead of replacing the existing content.

If the selector string is prepended with the `^` symbol, the content will be prepended instead.

```js
{ 'folder/append-partial': '@#myDiv' }

{ 'folder/prepend-partial': '^#myDiv' }
```

Alternatively, you may add the `data-ajax-update-mode` attribute to the target element.

```html
<div id="myDiv" data-ajax-update-mode="append"></div>

<div id="myDiv" data-ajax-update-mode="prepend"></div>
```

### Using Custom HTML Selectors

If the selector string begins with an `=` symbol, then you can use any custom HTML selector to target an element.

```js
{ 'folder/append': '=[data-field-name="address"]' }
```

## Pushing Partial Updates

Comparatively, [AJAX handlers](./handlers.md) can push content updates to the client-side browser from the server-side. To push an update the handler returns an array where the key is a HTML element to update (using a simple CSS selector) and the value is the content to update.

::: aside
The key name must start with an identifier `#` or class `.` character to trigger a content update.
:::

The following example will update an element on the page with the id **myDiv** using the contents found inside the partial **mypartial**. The `onRefreshTime` handler calls the `renderPartial` method to render the partial contents in PHP.

```php
function onRefreshTime()
{
    return [
        '#myDiv' => $this->renderPartial('mypartial')
    ];
}
```

## Passing Variables to Partials

Depending on the execution context, an [AJAX event handler](./handlers.md) makes variables available to partials differently.

- Use `$this[]` inside a page or layout [PHP section](../themes/themes.md).
- Use `$this->page[]` inside a [component class](../themes/components.md).
- Use `$this->vars[]` in the [backend area](../../extend/system/controllers.md).

These examples will provide the **result** variable to a partial for each context:

```php
// From page or layout PHP code section
$this['result'] = 'Hello world!';

// From a component class
$this->page['result'] = 'Hello world!';

// From a backend controller or widget
$this->vars['result'] = 'Hello world!';
```

This value can then be accessed using Twig in the partial:

```twig
<!-- Hello world! -->
{{ result }}
```
