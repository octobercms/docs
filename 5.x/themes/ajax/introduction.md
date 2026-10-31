---
previousPath: cms/ajax/introduction.md
subtitle: Call PHP code from the page and update parts of it without a full reload.
---
# AJAX Framework

The AJAX framework lets a page call PHP code on the server and update part of the page with the result, without reloading the browser. It works in CMS themes and anywhere in the admin panel.

A typical AJAX feature has three parts: a handler function in PHP, a `data-request` attribute in HTML that calls it, and a partial that renders the result. The following page adds two numbers on the server.

::: cmstemplate
```ini
url = "/calculator"
layout = "default"
```
```php
function onTest()
{
    $this['result'] = input('value1') + input('value2');
}
```
```twig
<form data-request="onTest" data-request-update="{ mypartial: '#myDiv' }">
    <input name="value1"> + <input name="value2">
    <button type="submit">Calculate</button>
</form>

<div id="myDiv"></div>
```
:::

The **mypartial** partial reads the `result` variable.

```twig
<p>The answer is {{ result }}</p>
```

Read the example like this: when the form is submitted, send an AJAX request to the **onTest** handler. The form values `value1` and `value2` are sent with the request, and the handler reads them with the `input()` [helper function](../../backend/services/helpers.md). When the handler finishes, render the **mypartial** partial and place it inside the `#myDiv` element.

For this to work, the page or its layout must include the framework, as shown next.

## Including the Framework

::: aside
The AJAX framework is optional in your CMS theme. You can include your preferred framework instead.
:::

Place the `{% framework %}` tag anywhere inside your page or [layout](../layouts.md). It adds a reference to the October CMS frontend JavaScript library.

```twig
{% framework %}
```

### Including Extra Features

The **extras** parameter adds the stylesheet and JavaScript for [form validation](./validation.md), [loading indicators](./loaders.md), the [turbo router](./turbo-router.md) and [flash messages](./flash-messages.md).

```twig
{% framework extras %}
```

### Including the Vue Library

The **vue** parameter includes the Vue 3 library and exposes it as the `Vue` global, for use with [Vue components](../../backend/panel/vue-components.md) registered on the page.

```twig
{% framework vue %}
```

## How an AJAX Request Works

A request can start from a data attribute or from JavaScript. Each request calls an [AJAX handler](./handlers.md) on the server, also called an event handler, and can update page elements with partials. Forms work best, since the framework sends the form data with the request automatically.

1. The browser sends an AJAX request with the handler name and any other options.
1. The server finds the [AJAX handler](./handlers.md) and runs it.
1. The handler runs your logic and sets page variables.
1. The server [renders the partials](./update-partials.md) the browser asked for with the `update` option.
1. The server sends a response containing the rendered partial markup.
1. The framework in the browser updates the page elements with the partial markup.

## Choosing an API

You can send requests in two ways. The [data attributes API](./attributes-api.md) needs no JavaScript knowledge and covers most tasks with HTML alone. The [JavaScript API](./javascript-api.md) gives you more control from your own scripts. Both use the same handlers and options.

## About Larajax

October CMS uses [Larajax](https://larajax.org) as the foundation of its AJAX framework. The `jax` JavaScript object provides the client-side API, while the server side works with October's CMS components and Twig templates.

For standalone Laravel applications or advanced usage, see the [Larajax documentation](https://larajax.org).

#### See Also

::: also
* [AJAX Handlers](./handlers.md)
* [Updating Partials](./update-partials.md)
* [Data Attributes API](./attributes-api.md)
* [JavaScript API](./javascript-api.md)
:::
