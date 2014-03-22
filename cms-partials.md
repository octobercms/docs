# CMS Partials

- [Introduction](#introduction)
- [Passing variables](#variables)

<a name="introduction"></a>
## Introduction

Partials contain reusable chunks of HTML markup that can be used anywhere throughout the website.

Partial templates reside in the **/partials** directory of a theme. Partial files should have the **htm** extension. The configuration section is optional for partials.

The following configuration parameters are supported:

- **description** - the partial description, for the back-end UI (optional)

Simplest partial example:

    <p>This is a partial</p>

Use the `{% partial %}` tag to render a partial in a layout, page, or another partial.
Example of a page referring to a partial:

    <div class="sidebar">
        {% partial "sidebar-contacts" %}
    </div>



<a name="variables"></a>
## Passing variables

You can pass parameters to partials by specifying them after the partial name in the partial tag:

    <div class="sidebar">
        {% partial "sidebar-contacts" city="Vancouver" country="Canada" %}
    </div>

Inside the partial, parameters can be accessed like any other Markup variable:

    <p>Country: {{ country }}, city: {{ city }}.</p>
