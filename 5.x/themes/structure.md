---
previousPath: cms/themes/themes.md
subtitle: Learn how the files in a theme fit together and how to create a new theme.
---
# Theme Structure

A theme is a folder of files that builds your website. Themes are plain files, so you can edit them in any text editor and keep them in version control, such as Git.

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

Themes live in the **themes** directory, one directory per theme. Each theme can contain the following objects.

Object | Description
------------- | -------------
[Pages](./pages.md) | the pages of the website, each with its own URL.
[Layouts](./layouts.md) | the scaffold that wraps each page.
[Partials](./partials.md) | reusable chunks of markup.
[Content Blocks](./content.md) | text, HTML or [Markdown](http://daringfireball.net/projects/markdown/syntax) that can be edited separately from the page or layout.
**Asset Files** | resource files, such as images, CSS and JavaScript files.

## Creating a Theme

The `create:theme` command scaffolds a new theme with a starter layout, a home page and the supporting configuration files. The theme name is converted to a directory slug.

```bash
php artisan create:theme "My Theme"
```

The example above creates the theme in the **themes/my-theme** directory with the following files.

::: dir
├── themes
|   └── my-theme  _← Theme Starts Here_
|       ├── `layouts`
|       │   └── default.htm
|       ├── `pages`
|       │   └── index.htm
|       ├── `partials`
|       ├── `content`
|       ├── `assets`
|       ├── theme.yaml  _← Theme Metadata_
|       ├── version.yaml
|       └── composer.json
:::

Pass the `--overwrite` option (or `-o`) to replace existing files when you regenerate a theme.

```bash
php artisan create:theme "My Theme" --overwrite
```

The **theme.yaml** and **version.yaml** files describe the theme and its change log. See [Theme Customization](./customization.md) for the fields they support.

## Setting the Active Theme

One theme is active at a time and displays the website. Set it with the `active_theme` item in the **config/cms.php** file, which reads the `ACTIVE_THEME` environment variable, or on the **Settings → Site Theme** page in the admin panel. The admin panel setting overrides the configuration file.

## Writing a Template

Pages, layouts and partials are templates. A template can have up to three sections: **configuration**, **PHP code** and **Twig markup**. The `==` sequence separates the sections.

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

The configuration section sets the template parameters. Each template type supports its own parameters, described on the [Pages](./pages.md), [Layouts](./layouts.md) and [Partials](./partials.md) pages. The section uses the [INI format](http://en.wikipedia.org/wiki/INI_file), where string values are enclosed in quotes.

```ini
url = "/blog"
layout = "default"

[component]
parameter = "value"
```

### PHP Code Section

The PHP section runs every time before the template renders. It is optional for every template type. You can wrap the code in open and close PHP tags to enable syntax highlighting in text editors. Place these tags on their own lines, separate from the `==` separator.

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

The PHP section is converted to a PHP class when the template is parsed. For this reason, it can only define functions and import namespaces with the `use` keyword. No other PHP code is allowed.

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

Set variables with array access on `$this`. You can also read them with object access, which is read-only.

```php
// Write via array
$this['foo'] = 'bar';

// Read via array
echo $this['foo'];

// Read-only via object
echo $this->foo;
```

Functions you define become methods, available on `$this` in PHP and on the `this` variable in Twig. The following example defines a **doSomething** function and calls it in both places.

::: cmstemplate
```ini
url = "/"
```
```php
function onStart()
{
    $this['foo'] = $this->doSomething();
}

function doSomething()
{
    return 'bar';
}
```
```twig
<h3>{{ this.doSomething() }}</h3>
```
:::

### Twig Markup Section

The Twig section defines the markup the template renders. It can use the tags, filters and functions [provided by October CMS](./templating.md), all the [native Twig features](https://twig.symfony.com/doc/), and [those provided by plugins](./extending/twig.md). See [Twig Templating](./templating.md) for the syntax.

## Using Subdirectories

The **pages**, **partials**, **layouts** and **content** directories support up to five levels of subdirectories. The **assets** directory has no depth limit. Subdirectories help you organize large websites. In the following example, the **pages** and **partials** directories contain a **blog** subdirectory, and the **content** directory contains a **home** subdirectory.

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

To refer to a template in a subdirectory, put the subdirectory name before the template name. For example, this renders the **category-list** partial from the **blog** subdirectory.

```twig
{% partial "blog/category-list" %}
```

::: tip
Template paths are always absolute. When a partial renders another partial from the same subdirectory, you still need to include the subdirectory name.
:::

## Logging Theme Changes

Theme templates are files, so saving a change in the admin panel overwrites the previous version, and content can be lost by accident. Theme logging records every change made to a theme. It is disabled by default.

To enable it, go to **Settings → Log Settings** and turn on **Log Theme Changes**. You can then review each change on the **Settings → Theme Log** page and use it to restore lost content by hand.

#### See Also

::: also
* [Pages](./pages.md)
* [Layouts](./layouts.md)
* [Partials](./partials.md)
* [Twig Templating](./templating.md)
* [Theme Customization](./customization.md)
:::
