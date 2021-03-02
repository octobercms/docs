# CMS Themes

- [Introduction](#introduction)
- [Directory Structure](#directory-structure)
    - [Subdirectories](#subdirectories)
- [Template Structure](#template-structure)
    - [Configuration Section](#configuration-section)
    - [PHP Code Section](#php-section)
    - [Twig Markup Section](#twig-section)
- [Database Driven Themes](#database-driven-themes)
- [Child Themes](#child-themes)
- [Theme Logging](#theme-logging)

<a name="introduction"></a>
## Introduction

Themes define the appearance of your website or web application built with October CMS. They are completely file-backed and can be managed with any version control system, for example, Git. This page gives you a high-level description of October themes. You will find more details about [pages](pages), [partials](partials), [layouts](layouts) and [content files](content) in the corresponding articles.

Themes are directories that reside in the **themes** directory by default. Themes can contain the following objects:

Object | Description
------------- | -------------
[Pages](pages) | represent the website pages.
[Partials](partials) | contain reusable chunks of HTML markup.
[Layouts](layouts) | define the page scaffold.
[Content files](content) | text, HTML, or [Markdown](http://daringfireball.net/projects/markdown/syntax) blocks that can be edited separately from the page or layout.
**Asset files** | are resource files like images, CSS and JavaScript files.

<a name="directory-structure"></a>
## Directory Structure

Below, you can see an example theme directory structure. Each theme represents a separate directory, and generally, one theme is active to display the website. This example demonstrates the **website** theme directory.

    themes/
      website/           <=== Theme starts here
        pages/           <=== Page files
          home.htm
        layouts/         <=== Layout files
          default.htm
        partials/        <=== Partial files
          sidebar.htm
        content/         <=== Content files
          intro.htm
        assets/          <=== Asset files
          css/
            my-styles.css
          js/
          images/

> The active theme is set with the `activeTheme` parameter in the `config/cms.php` file or with the Theme Selector on the System > CMS > Front-end Theme backend page. The theme set with the Theme Selector overrides the value in the `config/cms.php` file.

<a name="subdirectories"></a>
### Subdirectories

October CMS supports a single level of subdirectories for **pages**, **partials**, **layouts** and **content** files, while the **assets** directory can have an unlimited depth. This approach simplifies the organization of large websites. In the example directory structure below, the **pages** and **partials** directories contain the **blog** subdirectory, and the **content** directory contains the **home** subdirectory.

    themes/
      website/
        pages/
          home.htm
          blog/                  <=== Page subdirectory
            archive.htm
            category.htm
        partials/
          sidebar.htm
          blog/                  <=== Partial subdirectory
            category-list.htm
        content/
          footer-contacts.txt
          home/                  <=== Content subdirectory
            intro.htm
        ...

To refer to a template in a subdirectory, specify the subdirectory's name before the template's name. For example, rendering the **category-list** partial from a **blog** subdirectory.

    {% partial "blog/category-list" %}

> **Note**: The template paths are always absolute. If, in a partial, you render another partial from the same subdirectory, you still need to specify the subdirectory's name.

<a name="template-structure"></a>
## Template Structure

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
### Configuration Section

The configuration section sets the template parameters. Supported configuration parameters are specific for different CMS templates and described in their corresponding documentation articles. The configuration section uses the simple [INI format](http://en.wikipedia.org/wiki/INI_file), where string parameter values are enclosed within quotes. Example configuration section for a page template:

    url = "/blog"
    layout = "default"

    [component]
    parameter = "value"

<a name="php-section"></a>
### PHP Code Section

The code in the PHP section executes every time before the template is rendered. The PHP section is optional for all CMS templates and its contents depend on the template type where it is defined. The PHP code section can contain optional open and close PHP tags to enable syntax highlighting in text editors. The open and close tags should always be specified on a different line to the section separator `==`.

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

In the PHP section, you can only define functions and refer to namespaces with the PHP `use` keyword. No other PHP code is allowed in the PHP section. This is because the PHP section is converted to a PHP class when the page is parsed. Example of using a namespace reference:

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

As a general way of setting variables, you should use the array access method on `$this`, although for simplicity you can use **object access as read-only**, for example:

    // Write via array
    $this['foo'] = 'bar';

    // Read via array
    echo $this['foo'];

    // Read-only via object
    echo $this->foo;

<a name="twig-section"></a>
### Twig Markup Section

The Twig section defines the markup to be rendered by the template. In the Twig section, you can use functions, tags, and filters [provided by October CMS](../markup), all the [native Twig features](http://twig.sensiolabs.org/documentation), or those [provided by plugins](../plugin/registration#extending-twig). The content of the Twig section depends on the template type (page, layout, or partial). You can find more information about specific Twig objects further in the documentation.

More information can be found [in the Markup guide](../markup).

<a name="database-driven-themes"></a>
## Database Driven Themes

In some cases you may not have access to write to the filesystem to make changes to the theme. Database driven themes allows you to store all changes to CMS templates in the database.

To enable this feature for a single theme, navigate to **Settings > Frontend Theme**, select **Edit Properties** and check the checkbox called **Save Changes in Database**.

Alternatively you can enable this feature globally for all themes with the config item `cms.database_templates` or using the environment variable.

    CMS_DB_TEMPLATES=true

> **Note**: Assets files like images and stylesheets do not save in the database and cannot be modified without access to the filesystem.

<a name="child-themes"></a>
## Child Themes

Child themes allow for the possibility of theme inheritence. A good use of this is when you have a third party theme or a theme that is in read-only mode. A child theme will reference a parent and use it as a fallback source.

If a page named `home.htm` exists in the parent theme but not the child, it treats it the same as if it did; the URL is active, and you can open the page like normal. When saving the page in the backend area, a new file is created in the child theme to override the contents.

To enable this feature for a theme, navigate to **Settings > Frontend Theme**, select **Edit Properties** and select a parent from the **Parent Theme** dropdown list.

<a name="theme-logging"></a>
## Theme Logging

Since layouts and pages store most of the data in flat files, you or your clients can lose content accidentally. For example, switching the layout of a page will modify the scaffold of the page and, as such, will result in data loss.

October CMS can record every change made to a theme called Theme Logging, and this feature is disabled by default. To enable Theme Logging, go to **Settings > Log Settings** and enable **Log Theme Changes**.

You may now view the theme changelog via **Settings > Theme Log** where you can observe an overview of each change. You can use this information to decide the appropriate action to aid the regression of these changes, if necessary.
