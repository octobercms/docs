# CMS Layouts

- [Introduction](#introduction)
- [Placeholders](#placeholders)

Layouts define the page scaffold, that is everything that repeats on a page, such as a header and footer. Layouts often contain the HTML tag as well as the HEAD, TITLE and BODY tags.

<a name="introduction" class="anchor" href="#introduction"></a>
## Introduction

Layout templates reside in the **/layouts** subdirectory of a theme directory. Layout template files should have the **htm** extension. Inside the layout file you should use the `{% page %}` tag to output the page content. Simplest layout example:

    <html>
        <body>
            {% page %}
        </body>
    </html>

To use a layout for a [page](pages) the page should refer the layout file name (without extension) in the [Configuration](themes#configuration-section) section. Remember that if you refer a layout from a [subdirectory](themes#subdirectories) you should specify the subdirectory name. Example page template using the default.md layout:

    url = "/"
    layout = "default"
    ==
    <p>Hello, world!</p>

When this page is requested its content is merged with the layout, or more precisely - the layout's `{% page %}` tag is replaced with the page content. The previous examples would generate the following markup:

    <html>
        <body>
            <p>Hello, world!</p>
        </body>
    </html>

Note that you can render [partials](partials) in layouts. This lets you to share the common markup elements between different layouts. For example, you can have a partial that outputs the website CSS and JavaScript links. This approach simplifies the resource management - if you want to add a JavaScript reference you should modify a single partial instead of editing all the layouts.

The [Configuration](themes#configuration-section) section is optional for layouts. The supported configuration parameters are **name** and **description**. The parameters are optional and used in the back-end user interface. Example layout template with a description:

    description = "Basic layout example"
    ==
    <html>
        <body>
            {% page %}
        </body>
    </html>

<a name="placeholders" class="anchor" href="#placeholders"></a>
## Placeholders

Placeholders allow pages to inject content to the layout. Placeholders are defined in the layout templates with the `{% placeholder name %}` tag. The next example shows a layout template with a placeholder **head** defined in the HTML HEAD section.

    <html>
        <head>
            {% placeholder head %}
        </head>
        ...

Pages can inject content to placeholders with the `{% put %}` and `{% endput %}` tags. The following example demonstrates a simple page template which injects a CSS link to the placeholder **head** defined in the previous example


    url = "/my-page"
    layout = "default"
    ==
    {% put head %}
        <link href="/themes/demo/assets/css/page.css" rel="stylesheet">
    {% endput %}

    <p>The page content goes here.</p>

Placeholders can have default content, that can be either replaced or complemented by a page. Example placeholder definition in the layout template:

    {% placeholder sidebar default %}
        <p><a href="/contacts">Contact us</a></p>
    {% endplaceholder %}

The page can inject more content to the placeholder. The `{% default %}` tag specifies a place where the default placeholder content should be displayed. If the tag is not used the placeholder content is completely replaced.

    {% put sidebar %}
        <p><a href="/services">Services</a></p>
        {% default %}
    {% endput %}

<a name="checking-placeholder-exits" class="anchor" href="#checking-placeholder-exits"></a>
### Checking a placeholder exists

In a layout template you can check if a placeholder content exists by using the `placeholder()` function. This lets you to generate different markup depending on whether the page provides a placeholder content. Example:

    {% if placeholder('sidemenu') %}
        <!-- Markup for a page with a sidebar -->
        <div class="row">
            <div class="col-md-3">
                {% placeholder sidemenu %}
            </div>
            <div class="col-md-9">
                {% page %}
            </div>
        </div>
    {% else %}
        <!-- Markup for a page without a sidebar -->
        {% page %}
    {% endif %}
