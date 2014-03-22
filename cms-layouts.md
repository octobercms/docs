# CMS Layouts

- [Introduction](#introduction)
- [Placeholders](#placeholders)



<a name="introduction"></a>
## Introduction

Layouts define the page scaffold, that is: everything that repeats on a page, such as a header and footer.

Layout templates reside in the **/layouts** directory of a theme. Layout files should have the **htm** extension. The configuration section is optional for layouts. 

The following configuration parameters are supported:

- **name** - the layout name, for the back-end UI (optional)
- **description** - the layout description, for the back-end UI (optional)

Simplest layout example:

    <html>
        <body>
            {% page %}
        </body>
    </html>

The `{% page %}` tag outputs the page content.



<a name="placeholders"></a>
## Placeholders

Placeholders allow pages to inject content to the layout defined with the **placeholder** tag. Content is then injected with the **put** tag.

For example, injecting content to the HEAD section.

#### Layout

    <head>
        {% placeholder head %}
    </head>

#### Page

    url = "/my-page"
    ==
    {% put head %}
        <link href="/themes/demo/assets/css/page.css" rel="stylesheet">
    {% endput %}

    <p>The page content goes here.</p>

Placeholders can have default content, that can be either replaced or complemented by a page. Example:

#### Layout

    {% placeholder sidebar default %}
        <p><a href="/contacts">Contact us</a></p>
    {% endplaceholder %}

#### Page

    {% put sidebar %}
        <p><a href="/services">Services</a></p>
        {% default %}
    {% endput %}

The **default** tag specifies a place where the default placeholder content should be displayed.

#### Checking a placeholder exists

You can check if a placeholder content exists by using the `placeholder()` function. Example:

    {% if placeholder('sidemenu') %}
        <div class="row">
            <div class="col-md-3">
                {% placeholder sidemenu %}
            </div>
            <div class="col-md-9">
                {% page %}
            </div>
        </div>
    {% else %}
        {% page %}
    {% endif %}
