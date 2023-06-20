---
subtitle: Twig Tag
---
# {% ajaxPartial %}

::: aside
This tag extends the [`{% partial %}` Twig tag](./partial.md).
:::

The `{% ajaxPartial %}` tag renders partial contents on the page and includes support for [AJAX handlers](../../cms/ajax/introduction.md), self-updating and short update syntax. This is commonly referred to as a self-updating partial.

```twig
{% ajaxPartial "contact-form" %}
```

The partial contents are wrapped with a specific HTML tag on the first load only. Subsequent updates of the partial via AJAX do not include the wrapper tag.

```html
<div data-ajax-partial="contact-form">
    ... Contents go here ...
</div>
```

## Short Update Syntax

When an AJAX partial is used, you no longer need to specify a selector to update it. Just pass `true` to the [data attributes API](../../cms/ajax/attributes-api.md) when using the `data-request-update` attribute.

```html
<button
    data-request="onRefresh"
    data-request-update="{ contact-form: true }">
    Refresh
</button>
```

You may also update the partial from inside itself using `_self` as the partial name.

```html
<button
    data-request="onRefresh"
    data-request-update="{ _self: true }">
    Refresh
</button>
```

You may also pass the `^` symbol to prepend and the `@` symbol to append content to the container instead of replacing it.

```html
<button
    data-request="onRefresh"
    data-request-update="{ _self: '@' }">
    Append
</button>
```

## Lazy Loading Partials

The `{% ajaxPartial %}` accepts a `lazy` attribute that will defer rendering the content until the page loads.

```twig
{% ajaxPartial "posts" lazy %}
```

The `lazy body` attributes allow specifying the initial content before loading, followed by the `{% endpartial %}` tag.

```twig
{% ajaxPartial 'posts' lazy body %}
    <p>Loading posts...</p>
{% endpartial %}
```

## Calling AJAX Handlers

When calling an AJAX handler from inside an AJAX partial, a capturing page life cycle (see below) is triggered that enables the use of AJAX handlers within the requested partials.

The following example shows how to submit a simple contact form using a self-updating partial.

::: cmstemplate
```ini
description = "Self Updating Partial"
```
```php
<?
function onSubmitContactForm()
{
    $this['submitted'] = true;
}
?>
```
```twig
{% if submitted %}
    <p>Thank you for contacting us!</p>
{% endif %}

<button
    data-request="onSubmitContactForm"
    data-request-update="{ _self: true }">
    Submit
</button>
```
:::

Partials that use [CMS components](../../cms/themes/components.md) will also have their AJAX handlers made available.

::: cmstemplate
```ini
[contactForm]
```
```html
<button
    data-request="contactForm::onSubmit"
    data-request-update="{ _self: true }">
    Submit
</button>
```
:::

### Capture Lifecycle

When calling a handler from an AJAX partial, it will trigger a different lifecycle, called the capture lifecycle. ​The capture lifecycle renders the entire page, however it renders the contents into the void. This way, the page is initialized completely, including all the used partials and AJAX handlers.

Since it counts as a complete page render, this may mean the `onRun` [component method](../../extend/cms-components.md) is called when an AJAX partial handler is used. ​You can use `Request::ajax()` [helper method](../../extend/services/request-input.md) to determine if the request is occurring as the result of an AJAX request.
