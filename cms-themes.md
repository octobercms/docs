# CMS Themes

- [Introduction](#introduction)
- [Directory structure](#directory-structure)
    - [Subdirectories](#subdirectories)
- [Template structure](#template-structure)
    - [Configuration section](#configuration-section)
    - [PHP code section](#php-section)
    - [Twig markup section](#twig-section)

<a name="introduction"></a>
## Introduction

Themes define the appearance of your website or web application built with October. October themes are completely file-based and can be managed with any version control system, for example Git. This page gives you the high-level description of October themes. You will find more details about [pages](pages), [partials](partials), [layouts](layouts) and [content files](content) in the corresponding articles.

Themes are directories that reside in the **/themes** directory by default. Themes can contain the following objects:

Object | Description
------------- | -------------
[Pages](pages) | represent the website pages.
[Partials](partials) | contain reusable chunks of HTML markup.
[Layouts](layouts) | define the page scaffold.
[Content files](content) | text, HTML or [Markdown](http://daringfireball.net/projects/markdown/syntax) blocks that can be edited separately from the page or layout.
**Asset files** | are resource files like images, CSS and JavaScript files.

<a name="directory-structure"></a>
## Directory structure

Below you can see an example theme directory structure. Each October theme is represented with a separate directory and generally one active theme is used for displaying the website. This example displays the "website" theme directory.

    themes/
      website/           <=== Theme starts here
        pages/           <=== Pages directory
          home.htm
        layouts/         <=== Layouts directory
          default.htm
        partials/        <=== Partials directory
          sidebar.htm
        content/         <=== Content directory
          intro.htm
        assets/          <=== Assets directory
          css/
            my-styles.css
          js/
          images/

> The active theme is set with the `activeTheme` parameter in the `config/cms.php` file or with the Theme Selector on the System > CMS > Front-end Theme back-end page. The theme set with the Theme Selector overrides the value in the `config/cms.php` file.

<a name="subdirectories"></a>
### Subdirectories

October supports a single level subdirectories for pages, partials, layouts and content files (the **assets** directory can have any structure). This simplifies organizing large websites. In the example directory structure below you can see that the pages and partials directories contain the **blog** subdirectory and the content directory contains the **home** subdirectory.

    themes/
      website/
        pages/
          home.htm
          blog/                  <=== Subdirectory
            archive.htm
            category.htm
        partials/
          sidebar.htm
          blog/                  <=== Subdirectory
            category-list.htm
        content/
          footer-contacts.txt
          home/                  <=== Subdirectory
            intro.htm
        ...

To refer to a partial or a content file from a subdirectory, specify the subdirectory name before the template name. Example of rendering a partial from a subdirectory:

    {% partial "blog/category-list" %}

> **Note:** The template paths are always absolute. If in a partial you render another partial from the same subdirectory you still need to specify the subdirectory name.

<a name="template-structure"></a>
## Template structure

Pages, partials and layout templates can include up to 3 sections: **configuration**, **PHP code**, and **Twig markup**.
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

<a name="configuration-section"></a>
### Configuration section

The configuration section sets the template parameters. Supported configuration parameters are specific for different CMS templates and described in their corresponding documentation articles. The configuration section uses the simple [INI format](http://en.wikipedia.org/wiki/INI_file), where string parameter values are enclosed within quotes. Example configuration section for a page template:

    url = "/blog"
    layout = "default"

    [component]
    parameter = "value"

<a name="php-section"></a>
### PHP code section

The code in the PHP section executes every time before the template is rendered. The PHP section is optional for all CMS templates and its contents depends on the template type where it is defined. The PHP code section can contain optional open and close PHP tags to enable syntax highlighting in text editors. The open and close tags should always be specified on another line to the section separator `==`.

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

In the PHP section you can only define functions and refer to namespaces with the PHP `use` keyword. No other PHP code is allowed in the PHP section. This is because the PHP section is converted to a PHP class when the page is parsed. Example of using a namespace reference:

    url = "/blog"
    layout = "default"
    ==
    <?
    use Acme\Blog\Classes\Post;

    function onStart()
    {
        $this['posts'] = Post::get();
    }
    ?>
    ==

As a general way of setting variables you should use the array access method on `$this`, although for simplicity you can use **object access as read-only**, for example:

    // Write via array
    $this['foo'] = 'bar';

    // Read via array
    echo $this['foo'];

    // Read-only via object
    echo $this->foo;

<a name="twig-section"></a>
### Twig markup section

The Twig section defines the markup to be rendered by the template. In the Twig section you can use functions, tags and filters [provided by October](../markup), all the [native Twig features](http://twig.sensiolabs.org/documentation), or those [provided by plugins](../plugin/registration#extending-twig). The content of the Twig section depends on the template type (page, layout or partial). You will find more information about specific Twig objects further in the documentation.

More information can be found [in the Markup guide](../markup).
