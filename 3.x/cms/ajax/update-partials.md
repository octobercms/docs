---
subtitle: Learn more about the updating your content dynamically.
---
# Updating Partials

When a handler executes it may prepare partials that are updated on the page, either by pushing or pulling, which can be rendered with some supplied variables.

## Pulling Partial Updates

The client browser may request partials to be updated from the server when it performs an AJAX request, which is considered *pulling a content update*. The following code renders the **mytime** partial inside the `#myDiv` element on the page after calling the `onRefreshTime` [event handler](./handlers.md).

```twig
<div id="myDiv">{% partial 'mytime' %}</div>
```

The [data attributes API](./attributes-api.md) uses the `data-request-update` attribute.

```html
<!-- Attributes API -->
<button
    data-request="onRefreshTime"
    data-request-update="mytime: '#myDiv'">
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

### Update Definition

The definition of what should be updated is specified as a JSON-like object where:

- the left side (key) is the **partial name**
- the right side (value) is the **target element** to update

The following will request to update the `#myDiv` element with **mypartial** contents.

```js
mypartial: '#myDiv'
```

Multiple partials are separated by commas.

```js
firstpartial: '#myDiv', secondpartial: '#otherDiv'
```

If the partial name contains a slash or a dash, it is important to 'quote' the left side.

```js
'folder/mypartial': '#myDiv', 'my-partial': '#myDiv'
```

The target element will always be on the right side since it can also be a HTML element in JavaScript.

```js
mypartial: document.getElementById('myDiv')
```

### Appending and Prepending Content

If the selector string is prepended with the `@` symbol, the content received from the server will be appended to the element, instead of replacing the existing content.

```js
'folder/append': '@#myDiv'
```

If the selector string is prepended with the `^` symbol, the content will be prepended instead.

```js
'folder/append': '^#myDiv'
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
