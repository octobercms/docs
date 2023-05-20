---
subtitle: Build your website using a simple file structure.
---
# Themes

::: aside
The active theme is set with the `active_theme` item in the `config/cms.php` file or via the  **Settings → Frontend Theme** backend panel. The backend setting overrides the value in the `config/cms.php` file.
:::

Themes are completely file-based and can be managed with any version control system, for example, Git. This page gives you a high-level description of October CMS themes. You will find more details about pages, partials, layouts and content files in the corresponding articles below.

Themes are directories that reside in the **themes** directory by default. Themes can contain the following objects:

Object | Description
------------- | -------------
[Pages](./pages.md) | represent the website pages.
[Partials](./partials.md) | contain reusable chunks of HTML markup.
[Layouts](./layouts.md) | define the page scaffold.
[Content Files](./content.md) | text, HTML, or [Markdown](http://daringfireball.net/projects/markdown/syntax) blocks that can be edited separately from the page or layout.
**Asset Files** | are resource files like images, CSS, and JavaScript files.

## Directory Structure

Below, you can see an example theme directory structure. Each theme represents a separate directory, and generally, one theme is active to display the website. This example demonstrates the **website** theme directory.

::: dir
├── themes
|   └── website  _← Theme Starts Here_
|       ├── `pages`
|       │   └── index.htm
|       ├── `layouts`
|       │   └── default.htm
|       ├── `partials`
|       │   └── sidebar.htm
|       ├── `content`
|       │   └── footer-contacts.md
|       └── `assets`
|           ├── css
|           |   └── my-styles.css
|           ├── js
|           └── images
:::

### Subdirectories

October CMS supports a depth of five subdirectories for **pages**, **partials**, **layouts** and **content** files, while the **assets** directory can have an unlimited depth. This approach simplifies the organization of large websites. In the example directory structure below, the **pages** and **partials** directories contain the **blog** subdirectory, and the **content** directory contains the **home** subdirectory.

::: dir
├── themes
|   └── website
|       ├── pages
|       │   ├── index.htm
|       │   └── `blog`  _← Page Subdirectory_
|       │       ├── index.htm
|       │       └── category.htm
|       ├── layouts
|       │   └── default.htm
|       ├── partials
|       │   ├── sidebar.htm
|       │   └── `blog`  _← Partial Subdirectory_
|       │       └── category-list.htm
|       ├── content
|       │   ├── footer-contacts.md
|       │   └── `home`  _← Content Subdirectory_
|       │       └── intro.md
|       └── assets
:::

To refer to a template in a subdirectory, specify the subdirectory's name before the template's name. For example, rendering the **category-list** partial from a **blog** subdirectory.

::: tip
The template paths are always absolute. If in a partial you render another partial from the same subdirectory, you still need to specify the subdirectory's name.

```twig
{% partial "blog/category-list" %}
```
:::

## Template Structure

Pages, partials and layout templates can include up to 3 sections: **configuration**, **PHP code**, and **Twig markup**. Sections are separated with the `==` sequence.

::: cmstemplate
```ini
url = "/blog"
layout = "default"
```
```php
function onStart()
{
    $this['posts'] = [...];
}
```
```twig
<h3>Blog archive</h3>
{% for post in posts %}
    <h4>{{ post.title }}</h4>
    {{ post.content }}
{% endfor %}
```
:::

### Configuration Section

The configuration section sets the template parameters. Supported configuration parameters are specific for different CMS templates and described in their corresponding documentation articles. The configuration section uses the simple [INI format](http://en.wikipedia.org/wiki/INI_file), where string parameter values are enclosed within quotes. Example configuration section for a page template:

```ini
url = "/blog"
layout = "default"

[component]
parameter = "value"
```

### PHP Code Section

The code in the PHP section executes every time before the template is rendered. The PHP section is optional for all CMS templates and its contents depend on the template type where it is defined. The PHP code section can contain optional open and close PHP tags to enable syntax highlighting in text editors. The open and close tags should always be specified on a different line to the section separator `==`.

::: cmstemplate
```ini
url = "/blog"
layout = "default"
```
```php
<?
function onStart()
{
    $this['posts'] = [...];
}
?>
```
```twig
<h3>Blog archive</h3>
{% for post in posts %}
    <h4>{{ post.title }}</h4>
    {{ post.content }}
{% endfor %}
```
:::

In the PHP section, you can only define functions and refer to namespaces with the PHP `use` keyword. No other PHP code is allowed in the PHP section. This is because the PHP section is converted to a PHP class when the page is parsed. Example of using a namespace reference:

::: cmstemplate
```ini
url = "/blog"
layout = "default"
```
```php
<?
use Acme\Blog\Classes\Post;

function onStart()
{
    $this['posts'] = Post::get();
}
?>
```
```twig
```
:::

As a general way of setting variables, you should use the array access method on `$this`, although for simplicity you can use **object access as read-only**, for example:

```php
// Write via array
$this['foo'] = 'bar';

// Read via array
echo $this['foo'];

// Read-only via object
echo $this->foo;
```

### Twig Markup Section

The Twig section defines the markup to be rendered by the template. In the Twig section, you can use functions, tags, and filters [provided by October CMS](../../markup/templating.md), all the [native Twig features](https://twig.symfony.com/doc/), or [those provided by plugins](../../extend/twig-tags.md). The content of the Twig section depends on the template type (page, layout, or partial). You can find more information about specific Twig objects further in the documentation.

::: tip
More information can be found in [the Markup guide](../../markup/templating.md).
:::

## Theme Logging

Since layouts and pages store most of the data in flat files, you or your clients can lose content accidentally. For example, switching the layout of a page will modify the scaffold of the page and, as such, will result in data loss.

October CMS can record every change made to a theme called Theme Logging, and this feature is disabled by default. To enable Theme Logging, go to **Settings → Log Settings** and enable **Log Theme Changes**.

You may now view the theme changelog via **Settings → Theme Log** where you can observe an overview of each change. You can use this information to decide the appropriate action to aid the regression of these changes, if necessary.

#### See Also

::: also
* [CMS Markup Guide](../../markup/templating.md)
:::
