---
subtitle: Reuse chunks of HTML code anywhere in website.
---
# Partials

Partials are powerful elements that can repeat HTML on different pages or layouts, for example, a page footer used across different [page layouts](./layouts.md). Partials are also a powerful tool for dynamically [updating the page content with AJAX](../../ajax/update-partials.md).

Partial templates files reside in the **partials** directory in your theme. Partial files should have the **htm** extension. Next is an example of the simplest possible partial.

```html
<p>This is a partial</p>
```

A configuration section is optional for partials and can contain the optional **description** parameter that is displayed in the backend user interface. This example shows a partial with a description defined.

::: cmstemplate
```ini
description = "Demo partial"
```
```html
<p>This is a partial</p>
```
:::

The partial configuration section can also contain component definitions. The [Components article](./components.md) explains components in more detail.

## Rendering Partials

::: aside
Remember that if you refer a partial from a subdirectory you should specify the subdirectory name.
:::

The `{% partial "partial-name" %}` Twig tag renders a partial. The tag has a single required parameter - the partial file name without the extension. The `{% partial %}` tag can be used inside a page, layout or another partial. The following is an example of a page referring to a partial.

```twig
<div class="sidebar">
    {% partial "sidebar-contacts" %}
</div>
```

## Passing Variables to Partials

You will find that you often need to pass variables to a partial from the external code. This makes partials even more useful. For example, you can have a partial that renders a list of blog posts. If you can pass the post collection to the partial, the same partial could be used on the blog archive page, on the blog category page and so on. You can pass variables to partials by specifying them after the partial name in the `{% partial %}` tag.

```twig
<div class="sidebar">
    {% partial "blog-posts" posts=posts %}
</div>
```

You can also provide new variables for use in the partial.

```twig
<div class="sidebar">
    {% partial "sidebar-contacts" city="Vancouver" country="Canada" %}
</div>
```

Inside the partial, variables can be accessed like any other markup variable.

```twig
<p>Country: {{ country }}, city: {{ city }}.</p>
```

### Variable Scope

The partial contents will have access to the variables from the current context and the additional ones provided.

```twig
{% partial "mypartial" foo="bar" %}
```

In the following example, the `foo` variable will be available inside the `mypartial` partial template.

```twig
{% set foo = "bar" %}
{% partial "mypartial" %}
```

You can disable access to the context by appending the `only` keyword. In this example, only the `foo` variable will be accessible.

```twig
{% partial "mypartial" foo="bar" only %}
```

In the next example, no variables will be accessible.

```twig
{% partial "mypartial" only %}
```

### Parsing Markup as a Variable

It is possible to pass markup to a partial by adding the `body` attribute to the partial tag.

```twig
{% partial "card" body %}
    This is the card contents
{% endpartial %}
```

The contents are available inside the partial as the `body` variable.

```twig
{{ body|raw }}
```

Combined with the [placeholder markup tag](../../markup/tag/placeholder.md), this lets you build composable partials.

```twig
{% partial "card" image="img.jpg" body %}
    {% put header %}
        <h2>This is the card header</h2>
    {% endput %}
    This is the card contents
{% endpartial %}
```

The **card** partial is composed of two content areas and an image variable.

```twig
<div class="header">
    <div class="image">
        <img src="{{ image }}" />
    </div>
    {% placeholder header %}
</div>
<div class="body">
    {{ body|raw }}
</div>
```

## Props and Attributes

Partials can declare which parameters are **props** (template data) and which are **attributes** (HTML pass-through) using the `{% props %}` tag. This brings a component-style pattern to partials, allowing you to build reusable UI elements with smart class merging and attribute forwarding.

### Declaring Props

Place the `{% props %}` tag at the top of a partial `.htm` file. It uses Twig hash syntax where keys are prop names and values are defaults:

```twig
{% props {title: null, icon: null, size: 'md'} %}
```

- Keys listed in `{% props %}` become Twig variables (props), values are their defaults
- Parameters **not** listed flow into the `attributes` bag
- An empty `{% props {} %}` means all parameters go to attributes

### The Attributes Variable

When `{% props %}` is present, the template receives an `attributes` variable — an instance of Laravel's `ComponentAttributeBag`. It supports smart class merging where the caller's classes are appended to the partial's defaults.

```twig
{# partials/ui/card.htm #}
{% props {title: null} %}

<div {{ attributes.merge({class: 'card'}) }}>
    <h2>{{ title }}</h2>
    {{ body }}
</div>
```

```twig
{% partial "ui/card" title="Hello" class="mt-4 shadow" id="featured" body %}
    <p>Card content goes here</p>
{% endpartial %}
```

The `title` parameter is a prop and becomes a template variable. The `class` and `id` parameters are not listed in props, so they flow into the attribute bag. The `merge` method appends the caller's `class` to the default, producing `class="card mt-4 shadow"`.

::: tip
See the [Props Twig Tag](../../markup/tag/props.md) for the full attribute bag API including `only()`, `except()`, `has()`, and `get()` methods.
:::

### Composable Partials with Props

The existing `{% put %}` / `{% placeholder %}` system works alongside `{% props %}` for partials that need multiple content sections:

```twig
{# Caller #}
{% partial "card" class="shadow" body %}
    {% put header %}
        <h2>Card Title</h2>
    {% endput %}
    <p>Body content</p>
{% endpartial %}
```

```twig
{# card.htm #}
{% props {} %}
<div {{ attributes.merge({class: 'card'}) }}>
    <div class="card-header">
        {% placeholder header %}
    </div>
    <div class="card-body">{{ body }}</div>
</div>
```

## Dynamic Partials

Partials, like pages, can use any Twig features. Please refer to the [Dynamic Pages section](pages.md) of the documentation for details.

### Partial Execution Life Cycle

There are special functions that can be defined in the PHP section of partials: `onStart` and `onEnd`. The `onStart` function is executed before the partial is rendered and before the [partial components](./components.md) are executed. The `onEnd` function is executed before the partial is rendered and after the partial components are executed. In the `onStart` and `onEnd` functions you can inject variables to the Twig environment. Use the `$this` with array notation to pass variables to the page.

::: cmstemplate
```ini
```
```php
<?
function onStart()
{
    $this['hello'] = "Hello world!";
}
?>
```
```twig
<h3>{{ hello }}</h3>
```
:::

Externally assigned variables to the partial can be accessed in PHP using the `$this` object.

::: cmstemplate
```ini
```
```php
<?
function onStart()
{
    $this['location'] = $this->city . ', ' . $this->country;
}
?>
```
```twig
<p>{{ location }} is the same as {{ city }}, {{ country }}.</p>
```
:::

The templating language provided by October CMS is described in the [Markup Guide](../../markup/templating.md). The overall sequence the handlers are executed is described in the [Dynamic Layouts section](./layouts.md) of the documentation.

### Calling AJAX Handlers in Partials

Since they are instantiated late, during the time the page is rendered, some limitations apply to the life cycle of regular partials. To overcome this, you may use the `{% ajaxPartial %}` to allow AJAX handlers to be called inside your partial.

```twig
{% ajaxPartial "contact-form" %}
```

::: tip
See the [AJAX Partial Twig Tag article](../../markup/tag/ajax-partial.md) to learn more about the `{% ajaxPartial %}` tag.
:::

When calling a handler from within an AJAX partial, the life cycle operates differently compared to a regular AJAX handler.

1. The handler runs after the partial's `onEnd` function.
1. The complete page life cycle runs, including logic in the layout, page and parent partials.
1. All variables are available during the request, including variables set using Twig.
1. The partial life cycle functions do not support returning any values.

#### See Also

::: also
* [Partial Twig Tag](../../markup/tag/partial.md)
* [Props Twig Tag](../../markup/tag/props.md)
* [AJAX Partial Twig Tag](../../markup/tag/ajax-partial.md)
:::
