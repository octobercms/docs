# Partials

Partials contain reusable chunks of code that are used anywhere throughout your website. They are useful for elements that repeat on different pages or layouts. One such example is a page footer used across different [page layouts](layouts.md). Partials are also a key ingredient when [updating the page content with AJAX](../ajax/update-partials.md).

Partial templates files reside in the **partials** directory in your theme. Partial files should have the **htm** extension. Next is an example of the simplest possible partial.

```
<p>This is a partial</p>
```

A [Configuration](themes.md#oc-configuration-section) section is optional for partials and can contain the optional **description** parameter which is displayed in the backend user interface. This example shows a partial with a description defined.

```
description = "Demo partial"
==
<p>This is a partial</p>
```

The partial configuration section can also contain component definitions. The [Components article](components.md) explains components in more detail.

## Rendering Partials

The `{% partial "partial-name" %}` Twig tag renders a partial. The tag has a single required parameter - the partial file name without the extension. Remember that if you refer a partial from a [subdirectory](themes.md#oc-subdirectories) you should specify the subdirectory name. The `{% partial %}` tag can be used inside a page, layout or another partial. Example of a page referring to a partial:

```twig
<div class="sidebar">
    {% partial "sidebar-contacts" %}
</div>
```

## Passing Variables to Partials

You will find that you often need to pass variables to a partial from the external code. This makes partials even more useful. For example, you can have a partial that renders a list of blog posts. If you can pass the post collection to the partial, the same partial could be used on the blog archive page, on the blog category page and so on. You can pass variables to partials by specifying them after the partial name in the `{% partial %}` tag:

```twig
<div class="sidebar">
    {% partial "blog-posts" posts=posts %}
</div>
```

You can also assign new variables for use in the partial:

```twig
<div class="sidebar">
    {% partial "sidebar-contacts" city="Vancouver" country="Canada" %}
</div>
```

Inside the partial, variables can be accessed like any other markup variable:

```twig
<p>Country: {{ country }}, city: {{ city }}.</p>
```

### Passing Markup as a Variable

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

Combined with the [placeholder markup tag](../markup/tag-placeholder.md), this lets you build composable partials.

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

Partials, like pages, can use any Twig features. Please refer to the [Dynamic pages](pages.md#oc-dynamic-pages) documentation for details.

### Partial Execution Life Cycle

There are special functions that can be defined in the PHP section of partials: `onStart` and `onEnd`. The `onStart` function is executed before the partial is rendered and before the partial [components](components.md) are executed. The `onEnd` function is executed before the partial is rendered and after the partial [components](components.md) are executed. In the onStart and onEnd functions you can inject variables to the Twig environment. Use the `array notation` to pass variables to the page:

```
==
function onStart()
{
    $this['hello'] = "Hello world!";
}
==
<h3>{{ hello }}</h3>
```

Externally assigned variables to the partial can be accessed in PHP using the `$this` object.

```
==
function onStart()
{
    $this['location'] = $this->city . ', ' . $this->country;
}
==
{{ location }} is the same as {{ city }}, {{ country }}.
```

The templating language provided by October CMS is described in the [Markup Guide](../markup.md). The overall sequence the handlers are executed is described in the [Dynamic layouts](layouts.md#oc-dynamic-layouts) article.

### Life Cycle Limitations

Since they are instantiated late, during the time the page is rendered, some limitations apply to the life cycle of partials. They do not follow the standard execution process, as described in the [layout execution life cycle](layouts.md#oc-dynamic-layouts). The following limitations should be noted:

1. AJAX events are not registered and won't function as normal.
1. The life cycle functions cannot return any values.
1. Regular POST form handling will occur at the time the partial is rendered.

In general, component usage in partials is designed for basic components that render simple markup without much processing, such as a *Like* or *Tweet* button.
