---
subtitle: Twig Tag
---
# {% ajaxPartial %}

::: aside
This tag extends the [`{% partial %}` Twig tag](./partial.md).
:::

The `{% ajaxPartial %}` tag renders partial contents on the page that includes [AJAX handler support](../../cms/ajax/introduction.md), self-updating and a shorter update syntax.

```twig
{% ajaxPartial "contact-form" %}
```

The tag wraps the contents with a special HTML tag for the first load only. Subsequent AJAX requests that call on the partial will not include this wrapper.

```html
<div data-request-update-partial="contact-form">
    ... Contents go here ...
</div>
```

## Short Update Syntax

When using the tag, you no longer need to use a selector to update it, just pass `true` to the [data attributes API](../../cms/ajax/attributes-api.md) uses the `data-request-update` attribute.

```html
<button
    data-request="onRefreshContactForm"
    data-request-update="{ contact-form: true }">
    Refresh
</button>
```

You may also update the partial from inside itself using the special `_self` partial name.

```html
<button
    data-request="onRefresh"
    data-request-update="{ _self: true }">
    Refresh
</button>
```

## Calling AJAX Handlers

When the AJAX framework sees a call inside an AJAX partial, it will trigger a capturing page lifecycle that makes the AJAX handlers defined in partials available.

The following example shows how to submit a simple contact form using a self-updating partial.

```php
description = "Self Updating Partial"
==
<?
function onSubmitContactForm()
{
    $this['submitted'] = true;
}
?>
==
{% if submitted %}
    <p>Thank you for contacting us!</p>
{% endif %}
<button
    data-request="onSubmitContactForm"
    data-request-update="{ _self: true }">
    Submit
</button>
```

Partials that use [CMS components](../../cms/themes/components.md) will also have their AJAX handlers made available.

```html
[contactForm]
==
<button
    data-request="contactForm::onSubmit"
    data-request-update="{ _self: true }">
    Submit
</button>
```
