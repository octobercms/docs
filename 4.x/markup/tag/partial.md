---
subtitle: Twig Tag
---
# {% partial %}

The `{% partial %}` tag will parse a [CMS partial](../../cms/themes/partials.md) and render the partial contents on the page. To display a partial called **footer.htm**, simply pass the name after the `partial` tag quoted as a string.

```twig
{% partial "footer" %}
```

A partial inside a subdirectory can be rendered in the same way.

```twig
{% partial "sidebar/menu" %}
```

::: tip
The [Themes documentation](../../cms/themes/themes.md) has more details on subdirectory usage.
:::

The partial name can also be a variable:

```twig
{% set tabName = "profile" %}
{% partial tabName %}
```

## Variables

You can pass variables to partials by specifying them after the partial name:

```twig
{% partial "blog-posts" posts=posts %}
```

You can also assign new variables for use in the partial:

```twig
{% partial "location" city="Vancouver" country="Canada" %}
```

Inside the partial, variables can be accessed like any other markup variable:

```twig
<p>Country: {{ country }}, city: {{ city }}.</p>
```

## Passing Markup as a Variable

It is possible to pass markup to a partial using the `body` attribute.

```twig
{% partial "card" body %}
    This is the card contents
{% endpartial %}
```

The contents are then available as the `body` variable.

```twig
{{ body|raw }}
```

### Composable Partials

Composable partials are possible when combined with the `{% placeholder %}` [Twig tag](./placeholder.md). The following partial defines a `header` and a `body` section where HTML content can be added.

```twig
<div class="header">
    {% placeholder header %}
</div>
<div class="body">
    {{ body|raw }}
</div>
```

Next, you can include the `{% put %}` tag inside the `body` to compose the partial result with two HTML content sections.

```twig
{% partial "card" body %}
    {% put header %}
        <h2>This is the card header</h2>
    {% endput %}
    <p>This is the card contents</p>
{% endpartial %}
```

## Props and Attributes

Partials can use the `{% props %}` tag to separate parameters into **props** (template variables) and **attributes** (HTML pass-through). This lets you build reusable partials with smart class merging and attribute forwarding.

```twig
{# partials/card.htm #}
{% props {title: null} %}

<div {{ attributes.merge({class: 'card'}) }}>
    <h2>{{ title }}</h2>
    {{ body }}
</div>
```

```twig
{% partial "card" title="Hello" class="mt-4" id="featured" body %}
    <p>Card content goes here</p>
{% endpartial %}
```

The `title` parameter is a declared prop and becomes a template variable. The `class` and `id` parameters flow into the `attributes` bag. The `merge` method smart-appends the caller's class to the default.

::: tip
See the [Props Twig Tag](./props.md) for the full `attributes` API and detailed usage examples.
:::

## Setting Partial Contents to a Twig Variable

In any template you can set the partial contents to a variable with the `partial()` function. This lets you manipulate the output before display. Remember to use the `|raw` filter to prevent output escaping.

```twig
{% set cardPartial = partial('my-cards/card') %}

{{ cardPartial|raw }}
```

You may also pass variables to the partial as the second argument.

```twig
{% set cardPartial = partial('my-cards/card', { foo: 'bar' }) %}
```

## Checking a Partial Exists

The `hasPartial()` function can be used to check if a partial exists without rendering the contents, it will return true or false if the partial is found.

```twig
{% if hasPartial('my-cards/card') %}
    {% partial 'my-cards/card' %}
{% else %}
    <p>Card not found!</p>
{% endif %}
```
