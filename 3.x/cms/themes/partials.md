---
subtitle: Chunks of HTML code that are used anywhere throughout your website.
---
# Partials

Partials are useful for elements that repeat on different pages or layouts. One such example is a page footer used across different [page layouts](./layouts.md). Partials are also a key ingredient when [updating the page content with AJAX](../ajax/update-partials.md).

Partial templates files reside in the **partials** directory in your theme. Partial files should have the **htm** extension. Next is an example of the simplest possible partial.

```html
<p>This is a partial</p>
```

A configuration section is optional for partials and can contain the optional **description** parameter that is displayed in the backend user interface. This example shows a partial with a description defined.

```twig
description = "Demo partial"
==
<p>This is a partial</p>
```

The partial configuration section can also contain component definitions. The [Components article](./components.md) explains components in more detail.

## Rendering Partials

::: aside
Remember that if you refer a partial from a subdirectory you should specify the subdirectory name.
:::

The `{% partial "partial-name" %}` Twig tag renders a partial. The tag has a single required parameter - the partial file name without the extension. The `{% partial %}` tag can be used inside a page, layout or another partial. Example of a page referring to a partial:

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
{% partial 'mypartial' foo='bar' %}
```

In the following example, the `foo` variable will be available inside the `mypartial` partial template.

```twig
{% set foo = 'bar' %}
{% partial 'mypartial' %}
```

You can disable access to the context by appending the `only` keyword. In this example, only the `foo` variable will be accessible.

```twig
{% partial 'mypartial' foo='bar' only %}
```

In the next example, no variables will be accessible.

```twig
{% partial 'mypartial' only %}
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

## Dynamic Partials

Partials, like pages, can use any Twig features. Please refer to the [Dynamic Pages section](pages.md) of the documentation for details.

### Partial Execution Life Cycle

There are special functions that can be defined in the PHP section of partials: `onStart` and `onEnd`. The `onStart` function is executed before the partial is rendered and before the [partial components](./components.md) are executed. The `onEnd` function is executed before the partial is rendered and after the partial components are executed. In the onStart and onEnd functions you can inject variables to the Twig environment. Use the _array notation_ to pass variables to the page.

```php
==
function onStart()
{
    $this['hello'] = "Hello world!";
}
==
<h3>{{ hello }}</h3>
```

Externally assigned variables to the partial can be accessed in PHP using the `$this` object.

```php
==
function onStart()
{
    $this['location'] = $this->city . ', ' . $this->country;
}
==
{{ location }} is the same as {{ city }}, {{ country }}.
```

The templating language provided by October CMS is described in the [Markup Guide](../../markup/templating.md). The overall sequence the handlers are executed is described in the [Dynamic Layouts section](./layouts.md) of the documentation.

### Life Cycle Limitations

Since they are instantiated late, during the time the page is rendered, some limitations apply to the life cycle of partials. They do not follow the standard execution process, as described in the [Layout Execution Life Cycle section](./layouts.md). The following limitations should be noted:

1. AJAX events are not registered and won't function as normal.
1. The life cycle functions cannot return any values.
1. Regular POST form handling will occur at the time the partial is rendered.

In general, component usage in partials is designed for basic components that render simple markup without much processing, such as a *Like* or *Tweet* button.

#### See Also

::: also
* [Partial Twig Tag](../../markup/tag/partial.md)
:::
