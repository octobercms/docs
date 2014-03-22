# CMS Themes

- [Introduction](#introduction)
- [Template structure](#template-structure)



<a name="introduction"></a>
## Introduction

Themes represent the entire contents of a single website, including the template and asset files.

Themes are directories that reside in the **/themes** directory by default.
Themes can contain the following CMS templates:

- **Pages** - hold the content for each URL.
- **Partials** - contain reusable chunks of HTML markup.
- **Layouts** - define the page scaffold.
- **Content files** - text or HTML blocks that can be edited separately from the page or layout.
- **Asset files** - are resource files like images and stylesheets.

Example theme directory structure:

    themes/
        website/                <== Theme starts here
            pages/              <== Pages directory
                home.htm
            layouts/            <== Layouts directory
                default.htm
            partials/           <== Partials directory
                sidebar.htm
            content/            <== Content directory
                intro.htm
            assets/             <== Assets directory
                css/
                    my-styles.css
                js/
                images/

#### Subdirectories

All CMS templates can be grouped as a single level of subdirectories.
This simplifies organizing large websites.

    themes/
        website/
            pages/
                home.htm
                blog/                   <== Subdirectory
                    archive.htm
                    category.htm
            partials/
                sidebar.htm
                blog/                   <== Subdirectory
                    category-list.htm
            content/
                footer-contacts.txt
                home/                   <== Subdirectory
                    intro.htm
            ...

To refer to a template from a subdirectory, specify the subdirectory name before the template name.
Example:

    {% partial "blog/category-list" %}

> **Note**: To keep things simple, only one level of subdirectories is supported.



<a name="template-structure"></a>
## Template structure

Template files (pages, partials and layouts) can include up to 3 sections: configuration, PHP code, and Twig markup. 
Sections are separated with the `==` sequence.
For example:

    url = "/blog"
    layout = "default"
    ==
    function onStart()
    {
        $this['posts'] = ...;
    }
    ==
    <h3>Blog archive</h3>
    {% for post in posts %}
        <h4>{{ post.title }}</h4>
        {{ post.content }}
    {% endfor %}

The **configuration section** uses INI format, where string parameter values are enclosed within quotes.
Supported configuration parameters are specific for different CMS templates.

The **PHP code section** can contain optional open and close PHP tags to enable syntax highlighting in text editors.
The open and close tags should always be specified on another line to the section separator (`==`):

    url = "/blog"
    layout = "default"
    ==
    <?
    function onStart()
    {
        $this['posts'] = ...;
    }
    ?>
    ==
    <h3>Blog archive</h3>
    {% for post in posts %}
        <h4>{{ post.title }}</h4>
        {{ post.content }}
    {% endfor %}

The PHP section is optional for all CMS templates.
