---
previousPath: extend/system/plugins.md
subtitle: Create a plugin and declare its features in a registration file so the CMS can load them.
---
# Plugin Structure

A plugin is a folder of PHP code that adds features to October CMS, such as database tables, CMS components, backend pages and settings. Every plugin has a registration file named **Plugin.php** that tells the system what the plugin provides.

```bash
php artisan create:plugin Acme.Blog
```

This command creates the plugin in the **plugins/acme/blog** directory with a registration file, an **updates/version.yaml** file and a **composer.json** file. The argument is the plugin code, made of the author name and the plugin name separated by a dot.

<a name="registration-file"></a>
## Writing the Registration File

The registration file defines a class named `Plugin` that extends `System\Classes\PluginBase` and uses the plugin namespace. The only required method is `pluginDetails`, which returns information about the plugin. Other methods register features with the system, such as `registerComponents` below.

```php
namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    public function pluginDetails()
    {
        return [
            'name' => 'Blog Plugin',
            'description' => 'Provides some really cool blog features.',
            'author' => 'ACME Corporation',
            'icon' => 'ph ph-leaf'
        ];
    }

    public function registerComponents()
    {
        return [
            \Acme\Blog\Components\Post::class => 'blogPost'
        ];
    }
}
```

A plugin uses its registration methods to declare features. Here are some examples of what a plugin can do.

1. Create database table structures and seed data.
1. Define [CMS components](../../themes/extending/components.md).
1. Define [user permissions](../panel/permissions.md).
1. Add [settings pages](../settings/introduction.md), [navigation items](../panel/navigation.md), [lists](../lists/list-controller.md) and [forms](../forms/form-controller.md).
1. Alter [functionality of the core or other plugins](./extending.md).
1. Provide classes, [backend controllers](../panel/controllers.md), views, assets and other files.

The full list of registration methods is in the [Extending October CMS](./extending.md#registration-methods) article.

### Plugin Details

The `pluginDetails` method returns an array with the following keys.

Key | Description
------------- | -------------
**name** | the plugin name, required.
**description** | the plugin description, required.
**author** | the plugin author name, required.
**icon** | a name of the plugin icon, for example **ph ph-leaf** or **icon-leaf**. See the [available icons](../../handbook/icons.md) for the full list, optional.
**iconSvg** | an SVG icon to use in place of the standard icon. The SVG icon should be a rectangle and can support colors, optional.
**homepage** | a link to the author's website address, optional.
**hint** | a shorter code used for [routing controller URLs](../panel/controllers.md) in the admin panel, optional.

## Organizing the Plugin Directory

Plugins live in the **plugins** directory of the application. A plugin code such as `Acme.Blog` maps to the directory **plugins/acme/blog**. Below is an example of a plugin directory structure.

::: dir
├── `plugins`
|   └── acme  _← Author Name_
|       └── blog  _← Plugin Name_
|           ├── classes
|           ├── components
|           ├── controllers
|           ├── models
|           ├── updates
|           └── Plugin.php  _← Registration File_
:::

Only the **Plugin.php** file is required. A plugin that provides a single component can be as small as this.

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `components`
|           └── Plugin.php
:::

### Choosing a Plugin Namespace

The plugin namespace matters most if you plan to publish your plugins on the [October CMS Marketplace](https://octobercms.com/plugins). When you register as an author on the Marketplace, you choose an author code that becomes the root namespace for all your plugins. The default code offered is your first and last name, for example `JohnSmith`. You can set the author code only once and it cannot be changed later. Define all your plugin namespaces under this root, for example `JohnSmith\Blog`.

## Running Code When the Plugin Loads

The registration file can contain `register` and `boot` methods. Use them to run any setup code, such as registering routes or attaching handlers to events.

- The `register` method is called immediately when the plugin is registered.
- The `boot` method is called right before a request is routed.

If your code relies on another plugin, use the `boot` method. For example, you can extend models inside `boot`.

```php
public function boot()
{
    User::extend(function($model) {
        $model->hasOne['author'] = \Acme\Blog\Models\Author::class;
    });
}
```

::: tip
The `boot` method is optional, and leaving it undefined helps with performance. Only the `boot` method supports dependency injection through the application container.
:::

### Using an Initialization File

A plugin can also supply a file named **init.php** for custom initialization logic. The file is loaded after the plugin's `register` method is called.

```php
App::before(function() {
    // Logic when the request starts, after routes are registered
});

App::after(function() {
    // Logic when the request has finished, after the response is sent
});
```

## Requiring Other Plugins

A plugin can depend on other plugins by defining a `$require` property in the registration file. The property contains an array of plugin codes that are required. A plugin that depends on the **Acme.User** plugin declares it like this.

```php
namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    /**
     * @var array require these plugins
     */
    public $require = ['Acme.User'];

    // ...
}
```

Dependencies affect how the plugin operates and the order in which the update process applies migrations. The installation process attempts to install any dependencies automatically. If the system finds a plugin without its dependencies, it disables that plugin to prevent errors.

Avoid circular references between plugins. The dependency graph should always be directed, and a circular dependency is a design error.

#### See Also

::: also
* [Extending October CMS](./extending.md)
* [Version History](./versions.md)
* [Defining Models](../data/models.md)
:::
