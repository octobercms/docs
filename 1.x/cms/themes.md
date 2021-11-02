# Themes

Themes define the appearance of your website or web application built with October. October themes are completely file-backed and can be managed with any version control system, for example, Git. This page gives you the high-level description of October themes. You will find more details about [pages](pages.md), [partials](partials.md), [layouts](layouts.md) and [content files](content.md) in the corresponding articles.

>**NOTE:** Themes can store templates in the database if `cms.databaseTemplates` is enabled, see the [database driven themes](#database-driven-themes) section for more information.

Themes are directories that reside in the **/themes** directory by default. Themes can contain the following objects:

Object | Description
------------- | -------------
[Pages](pages.md) | represent the website pages.
[Partials](partials.md) | contain reusable chunks of HTML markup.
[Layouts](layouts.md) | define the page scaffold.
[Content files](content.md) | text, HTML, or [Markdown](http://daringfireball.net/projects/markdown/syntax) blocks that can be edited separately from the page or layout.
**Asset files** | are resource files like images, CSS and JavaScript files.

## Directory structure

Below, you can see an example theme directory structure. Each October theme is represented with a separate directory and generally, one active theme is used for displaying the website. This example displays the "website" theme directory.

```
themes/
    website/         <=== Theme starts here
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
```

> The active theme is set with the `activeTheme` parameter in the `config/cms.php` file or with the Theme Selector on the System > CMS > Front-end Theme backend page. The theme set with the Theme Selector overrides the value in the `config/cms.php` file.

### Subdirectories

October supports single level subdirectories for **pages**, **partials**, **layouts** and **content** files, while the **assets** directory can have any structure. This simplifies the organization of large websites. In the example directory structure below, you can see that the **pages** and **partials** directories contain the **blog** subdirectory, and the **content** directory contains the **home** subdirectory.

```
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
```

To refer to a partial or a content file from a subdirectory, specify the subdirectory's name before the template's name. Example of rendering a partial from a subdirectory:

```twig
{% partial "blog/category-list" %}
```

> **Note:** The template paths are always absolute. If, in a partial, you render another partial from the same subdirectory, you still need to specify the subdirectory's name.

## Template structure

Pages, partials and layout templates can include up to 3 sections: **configuration**, **PHP code**, and **Twig markup**. Sections are separated with the `==` sequence. For example:

```
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
```

### Configuration section

The configuration section sets the template parameters. Supported configuration parameters are specific for different CMS templates and described in their corresponding documentation articles. The configuration section uses the simple [INI format](http://en.wikipedia.org/wiki/INI_file), where string parameter values are enclosed within quotes. Example configuration section for a page template:

```ini
url = "/blog"
layout = "default"

[component]
parameter = "value"
```

### PHP code section

The code in the PHP section executes every time before the template is rendered. The PHP section is optional for all CMS templates and its contents depend on the template type where it is defined. The PHP code section can contain optional open and close PHP tags to enable syntax highlighting in text editors. The open and close tags should always be specified on a different line to the section separator `==`.

```
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
```

In the PHP section, you can only define functions and refer to namespaces with the PHP `use` keyword. No other PHP code is allowed in the PHP section. This is because the PHP section is converted to a PHP class when the page is parsed. Example of using a namespace reference:

```
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
```

As a general way of setting variables, you should use the array access method on `$this`, although for simplicity you can use **object access as read-only**, for example:

```php
// Write via array
$this['foo'] = 'bar';

// Read via array
echo $this['foo'];

// Read-only via object
echo $this->foo;
```

### Twig markup section

The Twig section defines the markup to be rendered by the template. In the Twig section, you can use functions, tags, and filters [provided by October](../markup.md), all the [native Twig features](http://twig.sensiolabs.org/documentation), or those [provided by plugins](../plugin/registration.md#extending-twig). The content of the Twig section depends on the template type (page, layout, or partial). You can find more information about specific Twig objects further in the documentation.

More information can be found [in the Markup guide](../markup.md).

## Theme Logging

October CMS comes with a very useful feature, disabled by default, called Theme Logging.

Since layouts and pages store most of the data in flat files, it's possible for you or your clients to accidentally lose content. For example, switching the layout of a page will modify the scaffold of the page, and, as such, will result in data loss.

To enable Theme Logging, simply go to **Settings -> Log settings** and enable **Log theme changes**. All changes are now logged.

The theme changelog can be viewed at **Settings -> Theme log**. Each change has an overview of what has been added/removed, along with a copy of the changed file before and after. You can use this information to decide the appropriate action, to aid the reversion of these changes, if necessary.

## Database Driven Themes

October CMS comes with another very useful feature, disabled by default, called Database Driven Themes. When this feature is enabled (by setting `cms.databaseTemplates` to `true`, or `null` when `app.debug` is `false`); the database layer stores all modified CMS files in the database. Files that are not modified continue to be loaded from the filesystem. There is a [`theme:sync $themeDir`](../console/commands#theme-sync-command) console command that can be used to sync changes between the filesystem and database.

Files modified in the database are cached to indicate that they should be loaded from the database.

>**NOTE:** All CMS template objects (ex. `Layout`, `Page`, `Content`, `Partial`, `Meta`, etc) are stored in the database when this feature is enabled and a change is made to the template in question; however theme asset files will **not** be.
