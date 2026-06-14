---
subtitle: "A lightweight AJAX framework that replaces the need for building API endpoints"
---
# Meet the AJAX Framework

October CMS ships with a built-in AJAX framework called **Larajax**. Think of it as `fetch()` in JavaScript, but with extra features built in: DOM patching, form validation, flash messages, and loading indicators. It is designed to be simple enough to learn in minutes, yet powerful enough to grow with your project.

The key idea: instead of building separate API endpoints and writing JavaScript to call them, you define **handlers** directly on your pages. The framework connects your HTML elements to those handlers automatically. It is still an API, but it lives on the page itself, so there is no routing or controller boilerplate.

## How It Works

The framework revolves around one HTML attribute: `data-request`. Add it to almost any element (a button, a form, a link, a dropdown) and the framework will call the named handler on the server when that element is triggered.

```html
<button data-request="onSayHello">Click Me</button>
```

When the visitor clicks this button, the framework sends an AJAX request to the server, which runs the `onSayHello` handler. No JavaScript code needed.

Different elements trigger at different moments:

| Element | Triggers When |
|---|---|
| Form | The form is submitted |
| Button, link | The element is clicked |
| Select, checkbox, radio | The selection changes |
| Text input | The text changes (with `data-track-input`) |

## Handlers Live on the Page

An AJAX handler is a PHP function defined in the **code section** of your page file. The code section sits between `==` separators, above the Twig markup. Handler names always start with `on`.

Here is what a page with a handler looks like in the backend editor:

**Code** tab:

```php
function onSayHello()
{
    // This runs on the server when the button is clicked
}
```

**Markup** tab:

```twig
<button data-request="onSayHello">Click Me</button>
```

That is the entire pattern. The HTML triggers the handler, the handler runs PHP on the server, and the framework takes care of the request/response cycle.

## Sending Data

When `data-request` is used inside a form, all form input values are sent to the server automatically. You can read them with the `input()` helper:

```php
function onSayHello()
{
    $name = input('name');
}
```

You can also send data from individual elements using `data-request-data`:

```html
<button data-request="onLoadPage" data-request-data="page: 2">
    Next Page
</button>
```

## Updating the Page

The framework can update parts of the page after a request completes. There are two directions:

- **Pull**: the browser requests a partial to be rendered and tells the framework where to put it.
- **Push**: the handler decides what to update and sends the HTML back.

We will explore both approaches in detail in [Updating the Page](./flash-messages-and-loaders.md). For now, just know that the framework can surgically patch the DOM without reloading the entire page.

## What We Already Set Up

If you have been following along, your layout already includes this line:

```twig
{% framework extras %}
```

This loads the AJAX framework with its **extras**: automatic validation error display, flash message notifications, and a loading progress bar. We added this when we [created the layout](../editor/creating-a-layout.md), so there is nothing else to set up.

## Next Steps

Now that you understand the basics, let's put the framework to work. Continue to [Build a Form](./building-forms.md) to add a contact form to the team profile page.

For the complete AJAX framework reference, see [AJAX Introduction](../../../4.x/cms/ajax/introduction.md) in the developer documentation.
