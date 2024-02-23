---
subtitle: The foundation for adding new features to the CMS by extending it.
---
# Plugins

::: aside
Plugins are identified with a unique code, for example, a plugin called `Acme.Blog` is found in the directory **plugins/acme/blog**.
:::

This article describes plugins and their registration functions. The registration process allows plugins to declare their features such as CMS components or backend navigation and pages. Here are some examples of what a plugin can do.

1. Create database table structures and seed data.
1. Define [CMS components](../cms-components.md).
1. Define [user permissions](../backend/permissions.md).
1. Add [settings pages](../settings/settings.md), [navigation items](../backend/navigation.md), [lists](../lists/list-controller.md) and [forms](../forms/form-controller.md).
1. Alter [functionality of the core or other plugins](../extending.md).
1. Provide classes, [backend controllers](../system/controllers.md), views, assets and other files.

### Directory Structure

Plugins reside in the **plugins** directory of the application directory. An example of a plugin directory structure is below.

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

Not all plugin directories are required. The only required file is the **Plugin.php** described below. If your plugin provides only a single component, your plugin directory could be much simpler, like this.

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `components`
|           └── Plugin.php
:::

### Plugin Namespaces

Plugin namespaces are essential, especially if you are going to publish your plugins on the [October CMS Marketplace](https://octobercms.com/plugins). When you register as an author on the Marketplace you will be asked for the author code which should be used as a root namespace for all your plugins. You can specify the author code only once, when you register. The default author code offered by the Marketplace consists of the author first and last name: JohnSmith. The code cannot be changed after you register. All your plugin namespaces should be defined under the root namespace, for example `JohnSmith\Blog`.

## Registration File

The `create:plugin` command generates a plugin folder and basic files for the plugin. The first argument specifies the author and plugin name.

```bash
php artisan create:plugin Acme.Blog
```

The **Plugin.php** file, called the plugin registration file, is an initialization script that declares a plugin's core functions and information. Registration files can provide the following:

1. Information about the plugin, its name, and author.
1. Registration methods for extending the CMS.

Registration scripts should use the plugin namespace. The registration script should define a class with the name `Plugin` that extends the `System\Classes\PluginBase` class. The only required method of the plugin registration class is `pluginDetails`. An example plugin registration file is below.

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
            'icon' => 'icon-leaf'
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

### Basic Plugin Information

The `pluginDetails` is a required method of the plugin registration class. It should return an array containing the following keys:

Key | Description
------------- | -------------
**name** | the plugin name, required.
**description** | the plugin description, required.
**author** | the plugin author name, required.
**icon** | a name of the plugin icon. The full list of available icons can be found in the [available icon documentation](../../element/available-icons.md). Any icon names provided by this font are valid, for example **icon-glass**, **icon-music**, optional.
**iconSvg** | an SVG icon to be used in place of the standard icon. The SVG icon should be a rectangle and can support colors, optional.
**homepage** | a link to the author's website address, optional.
**hint** | a shorter code used for [routing controller URLs](./controllers.md) in the admin panel, optional.

## Booting and Initialization

Plugin registration files can contain two methods `boot` and `register`. With these methods you can do anything you like, like register routes or attach handlers to events.

The `register` method is called immediately when the plugin is registered. The `boot` method is called right before a request is routed. So if your actions rely on another plugin, you should use the boot method. For example, inside the `boot` method you can extend models:

```php
public function boot()
{
    User::extend(function($model) {
        $model->hasOne['author'] = \Acme\Blog\Models\Author::class;
    });
}
```

Plugins may also supply a file named **init.php** that contains custom initialization logic. Below is some example content.

```php
App::before({
    // Logic when the request starts, after routes are registered
});

App::after({
    // Logic the request has finished, after the response is sent
});
```

## Dependency Definitions

A plugin can depend upon other plugins by defining a `$require` property in the plugin registration file, the property should contain an array of plugin names that are considered requirements. A plugin that depends on the **Acme.User** plugin can declare this requirement in the following way:

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

Dependency definitions will affect how the plugin operates and how the update process applies migrations. The installation process will attempt to install any dependencies automatically, however if a plugin is detected in the system without any of its dependencies it will be disabled to prevent system errors.

Dependency definitions can be complex but care should be taken to prevent circular references. The dependency graph should always be directed and a circular dependency is considered a design error.

## Version History

It is good practice for plugins to maintain a change log that documents any changes or improvements in the code. In addition to writing notes about changes, this process has the useful ability to execute [migration and seed files](../database/structure.md) in their correct order.

The change log is stored in a YAML file called `version.yaml` inside the **updates** directory of a plugin, which co-exists with migration and seed files. This example displays a typical plugin updates directory structure:

::: dir
├── plugins
|   └── author
|       └── myplugin
|           ├── `updates`
|           |   ├── `version.yaml`  _← Version File_
|           |   ├── create_tables.php  _← Database Script_
|           |   ├── seed_the_database.php
|           |   └── create_another_table.php
|           └── Plugin.php
:::

### Plugin Dependencies

Updates are applied in a specific order, based on the defined dependencies in the plugin registration file. Plugins that are dependant will not be updated until all their dependencies have been updated first.

```php
namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    public $require = ['Acme.User'];
}
```

In the example above the **Acme.Blog** plugin will not be updated until the **Acme.User** plugin has been fully updated.

## Plugin Version File

The **version.yaml** file, called the Plugin Version File, contains the version comments and refers to database scripts in the correct order. Please read the [Database structure](../database/structure.md) article for information about the migration files. This file is required if you're going to submit the plugin to the [Marketplace](https://octobercms.com/help/site/marketplace). Here is an example of a plugin version file.

```yaml
v1.0.1: First version
v1.0.2: Second version
v1.0.3:
    - Update with a migration and seed
    - create_tables.php
    - seed_the_database.php
v2.0.0: Important update
v2.0.1: Latest version
```

::: tip
The `version.yaml` file should always use the first line for a text update that describes the changes and the remaining lines for update scripts. For more verbose updates, consider using a dedicated changelog file.
:::

As you can see above, there should be a key that represents the version number followed by the update message, which is either a string or an array containing update messages. For updates that refer to migration or seeding files, lines that are script file names can be placed in any position. An example of a comment with no associated update files.

```yaml
v1.0.1: A single comment that uses no update scripts.
```

### Important Updates

Sometimes a plugin needs to introduce features that will break websites already using the plugin. To prevent the changes from being deployed automatically, you should increase the **major** segment of the version string (`major.minor.patch`). An example of an important update comment is below.

```yaml
v2.1.0: This is an important update from v1 that contains breaking changes.
```

When tagging the new version `v2` from a version `v1` then the changes are not deployed as part of a regular update. The user must install the plugin again to receive the latest version via Composer.

### Migration and Seed Files

As previously described, updates also define when [migration and seed files](../database/structure.md) should be applied. An update line with a comment and updates:

```yaml
v1.1.1:
    - This update will execute the two scripts below.
    - some_upgrade_file.php
    - some_seeding_file.php
```

The update file name should use *snake_case* while the containing PHP class should use *CamelCase*. For a file named **some_upgrade_file.php** the corresponding class would be `SomeUpgradeFile`.

```php
<?php namespace Acme\Blog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

/**
 * some_upgrade_file.php
 */
class SomeUpgradeFile extends Migration
{
    ///
}
```

#### See Also

::: also
* [Database Migrations and Seeding](../database/structure.md)
:::
