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
    data-request="onRefreshContactForm"
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

## Calling AJAX Handlers

When calling an AJAX handler from inside an AJAX partial, a capturing page life cycle is triggered that enables the use of AJAX handlers within the requested partials.

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
