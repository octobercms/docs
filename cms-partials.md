# CMS Partials

- [Introduction](#introduction)
- [Rendering partials](#rendering-partials)
- [Passing variables to partials](#variables)
- [Partial execution life cycle](#life-cycle)

Partials contain reusable chunks of Twig markup that can be used anywhere throughout the website. Partials are extremely useful for page elements that repeat on different pages or layouts. A good partial example is a page footer which is used in different page [layouts](layouts). Also, partials are required for updating the page content with [AJAX](ajax).

<a name="introduction" class="anchor" href="#introduction"></a>
## Introduction

Partial templates files reside in the **/partials** subdirectory of a theme directory. Partial files should have the **htm** extension. Example of a simplest possible partial:

    <p>This is a partial</p>

The [Configuration](themes#configuration-section) section is optional for partials and can contain the optional **description** parameter which is displayed in the back-end user interface. The next example shows a partial with description:

    description = "Demo partial"
    ==
    <p>This is a partial</p>

The partial configuration section can also contain component definitions. [Components](components) are explained in another article.

> **Note:** The component support in partials has limitations. Please read about them in the [Components](components#limitations) article.

<a name="rendering-partials" class="anchor" href="#rendering-partials"></a>
## Rendering partials

The `{% partial "partial-name" %}` Twig tag renders a partial. The tag has a single required parameter - the partial file name without the extension. Remember that if you refer a partial from a [subdirectory](themes#subdirectories) you should specify the subdirectory name. The `{% partial %}` tag can be used inside a page, layout or another partial. Example of a page referring to a partial:

    <div class="sidebar">
        {% partial "sidebar-contacts" %}
    </div>

<a name="variables" class="anchor" href="#variables"></a>
## Passing variables to partials

You will find that you often need to pass variables to a partial from the external code. This makes partials even more useful. For example, you can have a partial that renders a list of blog post. If you can pass the post collection to the partial, the same partial could be used on the blog archive page, on the blog category page and so on. You can pass parameters to partials by specifying them after the partial name in the `{% partial %}` tag:

    <div class="sidebar">
        {% partial "sidebar-contacts" city="Vancouver" country="Canada" %}
    </div>

Inside the partial, parameters can be accessed like any other markup variable:

    <p>Country: {{ country }}, city: {{ city }}.</p>

<a name="life-cycle" class="anchor" href="#life-cycle"></a>
## Partial execution life cycle

There are special functions that can be defined in the PHP section of partials: `onStart()` and `onEnd()`. The `onStart()` function is executed before the partial is rendered and before the partial [components](components) are executed. The `onEnd()` function is executed before the partial is rendered and after the partial [components](components) are executed. In the onStart and onEnd functions you can inject variables to the Twig environment. Use the `array notation` to pass variables to the page:

    <?
    function onStart()
    {
        $this['hello'] = "Hello world!";
    }
    ?>
    ==
    <h3>{{ hello }}</h3>

The default variables and Twig extensions provided by October are described in the [Markup Guide](markup).