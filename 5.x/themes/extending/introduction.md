---
subtitle: Add the PHP features a theme needs, such as a component, a Twig filter or a Tailor field, by creating a plugin.
---
# Extending with Plugins

A theme handles the markup and Tailor handles the content. When a page needs PHP code, such as a custom component, a Twig filter or a new Tailor field type, you add it with a plugin.

```bash
php artisan create:plugin Acme.Blog
```

## Creating a Plugin

The `create:plugin` command creates a plugin in the **plugins/acme/blog** directory. The argument is the plugin code, made of the author name and the plugin name separated by a dot. The command generates the following files.

::: dir
├── plugins
|   └── acme  _← Author Name_
|       └── blog  _← Plugin Name_
|           ├── updates
|           |   └── version.yaml
|           ├── composer.json
|           └── Plugin.php  _← Registration File_
:::

The **Plugin.php** file is the registration file. It tells October CMS what the plugin provides.

## Registering Features in Plugin.php

The registration file defines a `Plugin` class that extends `System\Classes\PluginBase`. Each feature has its own registration method. The following registers a component with the `registerComponents` method and a Twig filter with the `registerMarkupTags` method.

```php
namespace Acme\Blog;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function pluginDetails()
    {
        return [
            'name' => 'Blog',
            'description' => 'Adds blog features to the website.',
            'author' => 'Acme',
            'icon' => 'ph ph-leaf'
        ];
    }

    public function registerComponents()
    {
        return [
            \Acme\Blog\Components\BlogPosts::class => 'blogPosts'
        ];
    }

    public function registerMarkupTags()
    {
        return [
            'filters' => [
                'excerpt' => fn ($text) => str_limit(strip_tags($text), 100)
            ]
        ];
    }
}
```

The component class goes in the **components** directory of the plugin. Use the `create:component` command to generate it.

```bash
php artisan create:component Acme.Blog BlogPosts
```

## Using the Features in a Theme

Registered components and Twig filters are available to every theme. Attach the component to a page using its short name, and call the filter like any other Twig filter.

::: cmstemplate
```ini
url = "/blog"

[blogPosts]
```
```twig
{% for post in blogPosts.posts %}
    <p>
        {{ post|excerpt }}
    </p>
{% endfor %}
```
:::

## Choosing What to Build

Pick the kind of extension based on what the theme needs.

You Want To | Build | Guide
------------- | ------------- | -------------
Load data, handle forms or respond to AJAX requests on a page | a CMS component | [Building Components](./components.md)
Format or compute values inside templates | a Twig filter or function | [Registering Twig Functions & Filters](./twig.md)
Offer a new field type in Tailor blueprints | a content field | [Custom Tailor Fields](./tailor-fields.md)

Not every feature needs a plugin. You can [build JSON API endpoints](./building-apis.md) with CMS pages and Twig, and logic that only one page or layout uses can go in its [PHP code section](../structure.md).

#### See Also

::: also
* [Plugin Structure](../../backend/plugins/introduction.md)
* [Extending October CMS](../../backend/plugins/extending.md)
* [Building Components](./components.md)
* [Registering Twig Functions & Filters](./twig.md)
* [Custom Tailor Fields](./tailor-fields.md)
:::
