---
subtitle: Twig Tag
---
# {% component %}

The `{% component %}` tag will parse the default markup content for a [CMS component](../../cms/themes/components.md) and display it on the page. Not all components provide default markup, the documentation for the plugin will guide in the correct usage.

```twig
{% component "blogPosts" %}
```

This will render the component partial with a fixed name of **default.htm** and is essentially an alias for the following:

```twig
{% partial "blogPosts::default" %}
```

## Variables

Some components support passing variables to them at render time.

```twig
{% component "blogPosts" postsPerPage="5" %}
```

## AJAX Updates

To update the component markup with an [AJAX request](../../cms/ajax/introduction.md), the output can be wrapped in an [AJAX partial](ajax-partial.md) so it can be targeted by the `_self` update, including [from within the component itself](../../cms/ajax/update-partials.md). Enable this by setting `ajaxPartial` to `true` in the [component class definition](../../extend/cms-components.md).

```php
public function componentDetails()
{
    return [
        // ...
        'ajaxPartial' => true
    ];
}
```

With this enabled, the `{% component %}` tag wraps its output so that AJAX handlers can update the component in place.

```twig
{% component "contactForm" %}
```

For example, the component markup below submits to its own handler and updates itself with the result.

```twig
<form
    data-request="contactForm::onSave"
    data-request-update="{ _self: true }">
    <!-- ... -->
</form>
```

## Customizing Components

In most cases the `{% component %}` tag is not needed and the markup is provided as a usage example for the component API. Components are intended to be customized, this can be done in two ways:

1. Moving the default markup to a partial
1. Overriding component partials using the theme

The [CMS Components article](../../cms/themes/components.md) outlines the process of customizing default markup.

#### See Also

::: also
* [CMS Components](../../cms/themes/components.md)
:::
