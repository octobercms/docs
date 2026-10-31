---
previousPath: cms/ajax/update-partials.md
subtitle: Refresh parts of the page with rendered partials when an AJAX request completes.
---
# Updating Partials

An AJAX request can replace the contents of page elements with freshly rendered partials. The browser can ask for partials by name, which is pulling an update, or the handler can send content for specific elements, which is pushing an update.

The following renders the **mytime** partial inside a `#myDiv` element using the [`{% partial %}` tag](../../handbook/twig-tags/partial.md).

```twig
<div id="myDiv">
    {% partial 'mytime' %}
</div>
```

The button calls the `onRefreshTime` [handler](./handlers.md) and asks for the **mytime** partial to be rendered into `#myDiv` when it completes.

```html
<button
    data-request="onRefreshTime"
    data-request-update="{ mytime: '#myDiv' }">
    Go
</button>
```

## Requesting Partial Updates

The [data attributes API](./attributes-api.md) uses the `data-request-update` attribute, as shown above. The [JavaScript API](./javascript-api.md) uses the `update` option.

```js
jax.request('#mybutton', 'onRefreshTime', {
    update: { mytime: '#myDiv' }
});
```

### Updating a Self-Updating Partial

The [`{% ajaxPartial %}` tag](../../handbook/twig-tags/ajax-partial.md) renders a partial that is ready for AJAX updates.

```twig
{% ajaxPartial 'mytime' %}
```

The tag wraps the contents in a container for you, so you can update the partial by name alone. Pass `true` instead of a container selector.

```html
<button
    data-request="onRefreshTime"
    data-request-update="{ mytime: true }">
    Go
</button>
```

To update a partial from inside itself, use the partial name `_self`.

```js
{ _self: true }
```

See the [AJAX Partial Twig Tag article](../../handbook/twig-tags/ajax-partial.md) to learn more about the `{% ajaxPartial %}` tag.

### Updating a Partial on Every Request

Some partials, such as [flash messages](./flash-messages.md), should update with every response. To merge an update definition into every AJAX request, add the `ajax-request-update` meta tag to the head section of the page and set its content attribute to the update definition.

```html
<head>
    <meta name="ajax-request-update" content="{ flash-messages: true }" />
</head>
```

## Writing the Update Definition

The update definition is a JSON-like object where:

- the left side (key) is the **partial name**
- the right side (value) is the **target element** to update

The following updates the `#myDiv` element with the **mypartial** contents.

```js
{ mypartial: '#myDiv' }
```

::: tip
The selector must start with a `#` or `.` character to be valid, unless it uses one of the prefixes described below.
:::

Separate multiple partials with commas.

```js
{ firstpartial: '#myDiv', secondpartial: '#otherDiv' }
```

In the JavaScript API, quote the partial name when it contains a slash or a dash, since the object is JavaScript code.

```js
{ 'folder/mypartial': '#myDiv', 'my-partial': '#myDiv' }
```

The target element is always on the right side, since in JavaScript it can also be an HTML element.

```js
{ 'folder/mypartial': document.getElementById('myDiv') }
```

### Appending, Prepending and Replacing Content

Prefix the selector with `@` to append the content from the server to the element, instead of replacing the existing content. Prefix it with `^` to prepend the content.

```js
{ 'folder/append-partial': '@#myDiv' }

{ 'folder/prepend-partial': '^#myDiv' }
```

Prefix the selector with `!` to replace the element itself with the content.

You can also set the mode with the `data-ajax-update-mode` attribute on the target element.

```html
<div id="myDiv" data-ajax-update-mode="append"></div>

<div id="myDiv" data-ajax-update-mode="prepend"></div>
```

### Using Any CSS Selector

Prefix the selector with `=` to target an element with any CSS selector.

```js
{ 'folder/append': '=[data-field-name="address"]' }
```

## Passing Variables to Partials

How an [AJAX handler](./handlers.md) passes variables to partials depends on where it runs.

- Use `$this[]` inside a page or layout [PHP section](../structure.md).
- Use `$this->page[]` inside a [component class](../components.md).
- Use `$this->vars[]` in the [backend area](../../backend/panel/controllers.md).

These examples set the **result** variable for each context.

```php
// From page or layout PHP code section
$this['result'] = 'Hello world!';

// From a component class
$this->page['result'] = 'Hello world!';

// From a backend controller or widget
$this->vars['result'] = 'Hello world!';
```

The partial reads the value with Twig.

```twig
<!-- Hello world! -->
{{ result }}
```

## Pushing Updates from a Handler

An [AJAX handler](./handlers.md) can also push content to the browser. Return an array where each key is a CSS selector for the element to update, and each value is the content.

::: aside
The key must start with an ID `#` or class `.` character to trigger a content update. The `@`, `^`, `!` and `=` prefixes also work here.
:::

The following updates the element with the ID **myDiv** using the contents of the **mypartial** partial. The `renderPartial` method renders the partial in PHP.

```php
function onRefreshTime()
{
    return [
        '#myDiv' => $this->renderPartial('mypartial')
    ];
}
```

#### See Also

::: also
* [AJAX Partial Twig Tag](../../handbook/twig-tags/ajax-partial.md)
* [Partial Twig Tag](../../handbook/twig-tags/partial.md)
* [AJAX Handlers](./handlers.md)
:::
