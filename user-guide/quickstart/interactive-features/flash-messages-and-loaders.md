---
subtitle: "Give your visitors clear feedback with flash messages, loading indicators, and smooth page transitions."
---

# Flash Messages & Loaders

Good interactive design is about communication. When a visitor submits a form, they need to know it worked. When something goes wrong, they need to know what happened. And when the site is processing a request, they should see that something is happening rather than staring at a frozen screen. October CMS provides built-in tools for all of this: flash messages, loading indicators, and a turbo router for seamless page transitions.

## Flash Messages

Flash messages are temporary notifications that appear after an action — a form submission, a successful save, or an error. They are called "flash" messages because they appear briefly and then disappear, either automatically or when the visitor dismisses them.

### Setting Flash Messages from PHP

In your page handlers, you can set flash messages using the `Flash` facade:

```php
Flash::success('Your changes have been saved!');
Flash::error('Something went wrong. Please try again.');
Flash::warning('Your session is about to expire.');
Flash::info('A confirmation email has been sent to your inbox.');
```

Each method corresponds to a message type — `success`, `error`, `warning`, and `info` — which you can style differently in your theme.

### Displaying Flash Messages in Your Layout

To render flash messages on the page, add a `{% flash %}` block to your layout. This is typically placed near the top of the `<body>` so messages are visible immediately.

```twig
{% flash %}
    <div class="alert alert-{{ type }}">
        {{ message }}
    </div>
{% endflash %}
```

The `{{ type }}` variable contains the message type (`success`, `error`, `warning`, or `info`), and `{{ message }}` contains the text. You can style each type with your own CSS classes for colors, icons, or animations.

### AJAX-Driven Flash Messages

When you are using the AJAX framework, flash messages can be displayed automatically without a page reload. To enable this, two things are needed:

1. Include `{% framework extras %}` in your layout.
2. Add the `data-request-flash` attribute to the element that triggers the AJAX request.

```html
<form data-request="onSubmit" data-request-flash>
    <!-- form fields -->
    <button type="submit">Submit</button>
</form>
```

When the handler sets a flash message (for example, `Flash::success('Done!')`), the extras framework displays it automatically at the top of the page with a smooth animation. The visitor does not need to reload the page to see the message.

::: aside
AJAX-driven flash messages and layout-rendered `{% flash %}` blocks serve the same purpose but in different contexts. The layout block handles messages after a full page load, while `data-request-flash` handles messages during AJAX interactions. For a complete experience, include both in your project.
:::

## Loading Indicators

When an AJAX request takes a moment to complete — perhaps it is sending an email or querying an external service — visitors need to know the site is working and has not frozen. Loading indicators solve this problem.

### The Automatic Loading Bar

If you have included `{% framework extras %}` in your layout, you get a loading indicator for free. The extras framework displays a thin progress bar at the top of the browser window whenever an AJAX request is in progress. It appears automatically and disappears when the request completes. You do not need to add any extra markup.

This is the same kind of loading bar you see on sites like YouTube and GitHub, and it gives visitors a clear visual signal that something is happening.

### Custom Loading Indicators

Sometimes you want more specific feedback — for example, showing "Processing..." text inside a button while a request is running. You can do this with a combination of `data-request` and a simple show/hide pattern.

```html
<button data-request="onProcess">
    Process
    <span data-request-loading style="display:none">Loading...</span>
</button>
```

The element with `data-request-loading` is hidden by default. The framework automatically shows it when the AJAX request starts and hides it again when the request finishes. You can place this on any element — a spinner icon, a text label, or an overlay.

::: tip
You can combine the automatic loading bar with custom indicators. The loading bar provides a general signal that the page is working, while custom indicators give contextual feedback on the specific element the visitor interacted with.
:::

## Turbo Router

October CMS includes a **Turbo Router** that makes navigating between pages feel nearly instant. Instead of loading an entirely new page from the server, the Turbo Router intercepts link clicks and loads the new page content via AJAX. It then swaps out the page body and updates the browser's address bar — giving visitors the snappy feel of a single-page application without the complexity.

To enable the Turbo Router, use the `turbo` option in your layout's framework tag:

```twig
{% framework turbo %}
```

Once enabled, all standard links on your site will be handled by the Turbo Router automatically. The page transition happens smoothly, the loading bar appears during the request, and the browser history works as expected (back and forward buttons still function normally).

::: aside
The Turbo Router is a great way to improve perceived performance. Even if your server response times stay the same, visitors experience the site as faster because the browser does not have to tear down and rebuild the entire page on every navigation.
:::

## Bringing It All Together

A well-polished website combines all three of these features:

- **Flash messages** tell visitors when actions succeed or fail.
- **Loading indicators** reassure visitors that the site is processing their request.
- **Turbo Router** makes page-to-page navigation feel seamless and fast.

With `{% framework extras %}` (or `{% framework turbo %}` for full turbo support) included in your layout, most of this behavior works out of the box. You can focus on building your content and forms, knowing that the framework handles the polish.

For more technical details, see the [Flash Messages](../../../4.x/cms/features/flash-messages.md) and [Turbo Router](../../../4.x/cms/ajax/turbo-router.md) pages in the developer documentation.
