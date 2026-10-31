---
previousPath: cms/themes/partials.md
subtitle: Reuse chunks of markup across pages and layouts, and pass them variables, markup and props.
---
# Partials

A partial is a reusable chunk of markup, such as a footer or a card, that you render inside pages, layouts and other partials. Partials can also [update parts of the page with AJAX](./ajax/update-partials.md).

```html
<p>This is a partial</p>
```

Partial files live in the **partials** directory of your theme and use the **htm** extension.

## Rendering a Partial

The `{% partial %}` tag renders a partial. Its one required parameter is the partial file name without the extension. You can use the tag in a page, a layout or another partial. The following page renders the **sidebar-contacts** partial.

```twig
<div class="sidebar">
    {% partial "sidebar-contacts" %}
</div>
```

If the partial is in a subdirectory, include the subdirectory name, for example `{% partial "blog/category-list" %}`.

## Passing Variables to Partials

Pass variables after the partial name. For example, a partial that lists blog posts can then serve the blog archive page, the blog category page and others.

```twig
<div class="sidebar">
    {% partial "blog-posts" posts=posts %}
</div>
```

You can also provide new values.

```twig
<div class="sidebar">
    {% partial "sidebar-contacts" city="Vancouver" country="Canada" %}
</div>
```

Inside the partial, read them like any other variable.

```twig
<p>Country: {{ country }}, city: {{ city }}.</p>
```

### Variable Scope

A partial can read the variables from the current context as well as the ones you pass. In the following example, the `foo` variable is available inside the `mypartial` partial.

```twig
{% set foo = "bar" %}
{% partial "mypartial" %}
```

Append the `only` keyword to hide the current context. In this example, only the `foo` variable is available.

```twig
{% partial "mypartial" foo="bar" only %}
```

In the next example, no variables are available.

```twig
{% partial "mypartial" only %}
```

## Passing Markup to a Partial

Add the `body` keyword to the tag to pass a block of markup, closed with `{% endpartial %}`.

```twig
{% partial "card" body %}
    This is the card contents
{% endpartial %}
```

Inside the partial, the markup is available as the `body` variable.

```twig
{{ body|raw }}
```

### Composable Partials

Combine `body` with the [placeholder tag](../handbook/twig-tags/placeholder.md) to fill several content areas in one partial. The following call fills a **header** area and the body, and passes an image variable.

```twig
{% partial "card" image="img.jpg" body %}
    {% put header %}
        <h2>This is the card header</h2>
    {% endput %}
    This is the card contents
{% endpartial %}
```

The **card** partial outputs each area where it belongs.

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

## Declaring Props and Attributes

The `{% props %}` tag lets a partial declare which parameters are **props**, used as template data, and which are **attributes**, passed through to the HTML. This gives partials a component-style pattern for building reusable UI elements, with class merging and attribute forwarding.

```twig
{# partials/ui/card.htm #}
{% props {title: null} %}

<div {{ attributes.merge({class: 'card'}) }}>
    <h2>{{ title }}</h2>
    {{ body|raw }}
</div>
```

```twig
{% partial "ui/card" title="Hello" class="mt-4 shadow" id="featured" body %}
    <p>Card content goes here</p>
{% endpartial %}
```

The `title` parameter is a prop and becomes a template variable. The `class` and `id` parameters are not listed as props, so they go into the attribute bag. The `merge` method appends the caller's `class` to the default, producing `class="card mt-4 shadow"`.

### Declaring Props

Place the `{% props %}` tag at the top of the partial. It takes a Twig hash, where keys are prop names and values are their defaults.

```twig
{% props {title: null, icon: null, size: 'md'} %}
```

- Keys listed in `{% props %}` become Twig variables, and the values are their defaults.
- Parameters **not** listed go into the `attributes` bag.
- An empty `{% props {} %}` sends every parameter to the attributes.

### Using the Attributes Bag

When a partial declares props, it receives an `attributes` variable, an instance of Laravel's `ComponentAttributeBag`. Its `merge` method appends the caller's classes to the partial's defaults. See the [Props Twig Tag](../handbook/twig-tags/props.md) for the full attribute bag API, including the `only()`, `except()`, `has()` and `get()` methods.

The `{% put %}` and `{% placeholder %}` tags work alongside props for partials with several content areas.

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
    <div class="card-body">{{ body|raw }}</div>
</div>
```

## Adding Logic to Partials

Partials can have a PHP section and use any Twig feature, the same as [pages](./pages.md#adding-page-logic). The configuration section is optional. It can attach [components](./components.md) and hold the settings that turn the partial into a [snippet](./snippets.md).

### Partial Life Cycle

The PHP section of a partial can define two special functions.

- `onStart` runs before the partial renders and before the partial's [components](./components.md) run.
- `onEnd` runs before the partial renders and after the partial's components run.

In both functions you can pass variables to the Twig section using array access on `$this`.

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

Variables passed to the partial are available in PHP on the `$this` object.

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

For the order in which page and layout functions run, see [Layout Life Cycle](./layouts.md#layout-life-cycle).

### Calling AJAX Handlers in Partials

Regular partials are instantiated late, while the page renders, so their life cycle has some limits. Render the partial with the `{% ajaxPartial %}` tag to let AJAX handlers be called inside it.

```twig
{% ajaxPartial "contact-form" %}
```

When you call a handler from inside an AJAX partial, the life cycle works differently from a regular AJAX handler.

1. The handler runs after the partial's `onEnd` function.
1. The complete page life cycle runs, including logic in the layout, page and parent partials.
1. All variables are available during the request, including variables set using Twig.
1. The partial life cycle functions do not support returning any values.

See the [AJAX Partial Twig Tag](../handbook/twig-tags/ajax-partial.md) to learn more about the `{% ajaxPartial %}` tag.

#### See Also

::: also
* [Partial Twig Tag](../handbook/twig-tags/partial.md)
* [Props Twig Tag](../handbook/twig-tags/props.md)
* [AJAX Partial Twig Tag](../handbook/twig-tags/ajax-partial.md)
* [Updating Partials with AJAX](./ajax/update-partials.md)
:::
