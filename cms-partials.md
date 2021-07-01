# CMS Partials

- [Introduction](#introduction)
- [Rendering Partials](#rendering-partials)
- [Passing Variables to Partials](#partial-variables)
    - [Passing Markup as a Variable](#partial-markup-variable)
- [Dynamic Partials](#dynamic-partials)
    - [Partial Execution Life Cycle](#partial-life-cycle)
    - [Life Cycle Limitations](#life-cycle-limitations)

<a name="introduction"></a>
## Introduction

Partials contain reusable chunks of code that are used anywhere throughout your website. They are useful for elements that repeat on different pages or layouts. One such example is a page footer used across different [page layouts](layouts). Partials are also a key ingredient when [updating the page content with AJAX](../ajax/update-partials).

Partial templates files reside in the **partials** directory in your theme. Partial files should have the **htm** extension. Next is an example of the simplest possible partial.

    <p>This is a partial</p>

A [Configuration](themes#configuration-section) section is optional for partials and can contain the optional **description** parameter which is displayed in the backend user interface. This example shows a partial with a description defined.

    description = "Demo partial"
    ==
    <p>This is a partial</p>

The partial configuration section can also contain component definitions. The [Components article](components) explains components in more detail.

<a name="rendering-partials"></a>
## Rendering Partials

The `{% partial "partial-name" %}` Twig tag renders a partial. The tag has a single required parameter - the partial file name without the extension. Remember that if you refer a partial from a [subdirectory](themes#subdirectories) you should specify the subdirectory name. The `{% partial %}` tag can be used inside a page, layout or another partial. Example of a page referring to a partial:

    <div class="sidebar">
        {% partial "sidebar-contacts" %}
    </div>

<a name="partial-variables"></a>
## Passing Variables to Partials

You will find that you often need to pass variables to a partial from the external code. This makes partials even more useful. For example, you can have a partial that renders a list of blog posts. If you can pass the post collection to the partial, the same partial could be used on the blog archive page, on the blog category page and so on. You can pass variables to partials by specifying them after the partial name in the `{% partial %}` tag:

    <div class="sidebar">
        {% partial "blog-posts" posts=posts %}
    </div>

You can also assign new variables for use in the partial:

    <div class="sidebar">
        {% partial "sidebar-contacts" city="Vancouver" country="Canada" %}
    </div>

Inside the partial, variables can be accessed like any other markup variable:

    <p>Country: {{ country }}, city: {{ city }}.</p>

<a name="partial-markup-variable"></a>
### Passing Markup as a Variable

It is possible to pass markup to a partial by adding the `body` attribute to the partial tag.

    {% partial "card" body %}
        This is the card contents
    {% endpartial %}

The contents are then available inside the partial as the `body` variable.

    {{ body|raw }}

Combined with the [placeholder markup tag](../markup/tag-placeholder), this lets you build composable partials.

    {% partial "card" image="img.jpg" body %}
        {% put header %}
            <h2>This is the card header</h2>
        {% endput %}
        This is the card contents
    {% endpartial %}

The **card** partial is then composed of two content areas and an image variable.

    <div class="header">
        <div class="image">
            <img src="{{ image }}" />
        </div>
        {% placeholder header %}
    </div>
    <div class="body">
        {{ body|raw }}
    </div>

<a name="dynamic-partials"></a>
## Dynamic Partials

Partials, like pages, can use any Twig features. Please refer to the [Dynamic pages](pages#dynamic-pages) documentation for details.

<a name="partial-life-cycle"></a>
### Partial Execution Life Cycle

There are special functions that can be defined in the PHP section of partials: `onStart` and `onEnd`. The `onStart` function is executed before the partial is rendered and before the partial [components](components) are executed. The `onEnd` function is executed before the partial is rendered and after the partial [components](components) are executed. In the onStart and onEnd functions you can inject variables to the Twig environment. Use the `array notation` to pass variables to the page:

    ==
    function onStart()
    {
        $this['hello'] = "Hello world!";
    }
    ==
    <h3>{{ hello }}</h3>

The templating language provided by October is described in the [Markup Guide](../markup). The overall sequence the handlers are executed is described in the [Dynamic layouts](layouts#dynamic-layouts) article.

<a name="life-cycle-limitations"></a>
### Life Cycle Limitations

Since they are instantiated late, during the time the page is rendered, some limitations apply to the life cycle of partials. They do not follow the standard execution process, as described in the [layout execution life cycle](layouts#dynamic-layouts). The following limitations should be noted:

1. AJAX events are not registered and won't function as normal.
1. The life cycle functions cannot return any values.
1. Regular POST form handling will occur at the time the partial is rendered.

In general, component usage in partials is designed for basic components that render simple markup without much processing, such as a *Like* or *Tweet* button.
