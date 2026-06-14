---
subtitle: Twig Tag
---
# {% props %}

The `{% props %}` tag is used inside [CMS partials](../../cms/themes/partials.md) to declare which parameters are **props** (template data) and which are **attributes** (HTML pass-through). When this tag is present, an `attributes` variable becomes available for rendering HTML attributes on elements.

```twig
{% props {title: null, size: 'md'} %}
```

The tag uses Twig hash syntax. Keys become template variables with their specified defaults, and any parameters passed by the caller that are **not** listed become part of the `attributes` bag.

## Basic Usage

A card partial that declares `title` as a prop and forwards everything else as HTML attributes:

```twig
{# partials/card.htm #}
{% props {title: null} %}

<div {{ attributes.merge({class: 'card'}) }}>
    <h2>{{ title }}</h2>
</div>
```

When rendered with extra attributes:

```twig
{% partial "card" title="Hello" class="mt-4" id="featured" %}
```

The output will be:

```html
<div class="card mt-4" id="featured">
    <h2>Hello</h2>
</div>
```

The `title` parameter was declared as a prop, so it becomes a template variable. The `class` and `id` parameters were not listed, so they flow into the `attributes` bag.

### Hyphenated Attributes

Hyphenated attribute names such as `data-*` and `aria-*` can be passed directly to the partial tag and flow into the `attributes` bag like any other attribute:

```twig
{% partial "card" title="Hello" data-testid="featured-card" aria-label="Featured" %}
```

The output preserves the original attribute names:

```html
<div class="card" data-testid="featured-card" aria-label="Featured">
    <h2>Hello</h2>
</div>
```

## The Attributes Variable

The `attributes` variable is an instance of Laravel's `ComponentAttributeBag`. It supports the following methods:

Method | Description
------------- | -------------
`attributes.merge({class: 'btn'})` | Merge defaults with smart-appending for `class` and `style`
`attributes.only('class', 'id')` | Keep only specific attributes
`attributes.except('class')` | Exclude specific attributes
`attributes.has('id')` | Check if an attribute exists
`attributes.get('id')` | Get a single attribute value

When rendered (cast to string), the bag produces HTML attribute pairs: `class="card mt-4" id="featured"`.

### Smart Class Merging

The `merge` method handles `class` and `style` attributes intelligently — the caller's values are appended to the defaults rather than replacing them.

```twig
{% props {} %}
<button {{ attributes.merge({class: 'btn btn-primary'}) }}>
    {{ body }}
</button>
```

```twig
{% partial "button" class="mt-4 w-full" body %}
    Click Me
{% endpartial %}
```

Output: `<button class="btn btn-primary mt-4 w-full">Click Me</button>`

## Empty Props

Using `{% props {} %}` with an empty hash means all parameters go to attributes. This is useful for wrapper elements that only need HTML pass-through:

```twig
{% props {} %}
<div {{ attributes }}>{{ body }}</div>
```

## Default Values

Props support default values that are used when the caller does not pass the parameter:

```twig
{% props {type: 'info', dismissible: false} %}
```

If the caller passes `type="warning"`, the `type` variable will be `"warning"`. If not passed, it defaults to `"info"`.

## Working with Body Content

The `{% props %}` tag works naturally with the existing `body` keyword on partials. The `body` parameter is automatically excluded from the attribute bag.

```twig
{# partials/ui/alert.htm #}
{% props {type: 'info', dismissible: false} %}

<div {{ attributes.merge({class: 'alert alert-' ~ type, role: 'alert'}) }}>
    <div class="alert-content">{{ body }}</div>

    {% if dismissible %}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    {% endif %}
</div>
```

```twig
{% partial "ui/alert" type="warning" dismissible=true class="mb-3" body %}
    <strong>Warning!</strong> Something needs your attention.
{% endpartial %}
```

#### See Also

::: also
* [Partial Twig Tag](./partial.md)
* [CMS Partials](../../cms/themes/partials.md)
:::
