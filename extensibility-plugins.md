Plugins are the foundation for adding new features to the CMS by extending it. Some examples of what a plugin can do:

1. Define components
2. Define user permissions
3. Add back-end pages, menu items, and forms
4. Create database table structures and seed data
5. Alter functionality of the core or other plugins
6. Provide classes, back-end controllers, views, assets, and other files

Plugins reside in the **/plugins** directory. An example of a plugin directory structure:

```
plugins/
  author/              <=== Author name
    plugin/            <=== Plugin name
      classes/
      components/
      controllers/
      models/
      updates/
      ...
      Plugin.php       <=== Plugin information file
```

#### Plugin information file

The **Plugin.php** file, called the *Plugin information file*, is an initialization script that defines a plugin's core functions and information. They can provide the following:

1. Information about the plugin, its name, and author
2. Registration methods for extending the CMS

An example Plugin information file:

```php
class Plugin extends System\Classes\PluginBase
{
    public function pluginDetails()
    {
        return [
            'name' => 'October Demo',
            'description' => 'Provides features used by the provided demonstration theme.',
            'author' => 'Alexey Bobkov, Samuel Georges',
            'icon' => 'icon-leaf'
        ];
    }

    public function registerComponents()
    {
        return [
            'October\Demo\Components\Todo' => 'demoTodo'
        ];
    }
}
```

#### Supported methods

The following registration methods are supported:

| Method                | Purpose                                                         |
|:--------------------- |:----------------------------------------------------------------|
| register              | Register method, called when the plugin is first registered.    |
| boot                  | Boot method, called right before the request route.             |
| registerComponents    | Registers any front-end components used by this plugin.         |
| registerWidgets       | Registers any back-end widgets used by this plugin.             |
| registerNavigation    | Registers back-end navigation items for this plugin.            |
| registerPermissions   | Registers any back-end permissions used by this plugin.         |
| registerSettings      | Registers any back-end configuration links used by this plugin. |
| registerReportWidgets | Registers any report widgets, including the dashboard widgets.  |
| registerMarkupTags    | Registers additional markup tags that can be used in the CMS.   |

#### Version & Database history

Plugins use a change log inside the **/updates** directory to maintain version information and database structure. An example of an updates directory structure:

```
plugins/
  author/
    myplugin/
      updates/                    <=== Updates directory
        version.yaml              <=== Plugin version file
        create_tables.php         <=== Database scripts
        seed_the_database.php     <==^
        create_another_table.php  <==^
```

The **version.yaml** file, called the *Plugin version file*, contains the version comments and refers to database scripts in the correct order.
An example Plugin version file:

```
1.0.1:
    - First version
    - create_tables.php
    - seed_the_database.php
1.0.2: Small fix that uses no scripts
1.0.3: Another minor fix
1.0.4:
    - Creates another table for this new feature
    - create_another_table.php
```

#### Initialization methods

Plugin information files can contain two methods: `boot` and `register`. With these methods you can do anything you like, like register routes or attach to events.

The `register` method is called immediately when the plugin is registered. The `boot` method is called right before a request is routed. So if your actions rely on another plugin, you should use the boot method.

#### Registering a component

Components are registered in the Plugin information file. An example of registering a component:

```php
public function registerComponents()
{
    return [
        'October\Demo\Components\Todo' => 'demoTodo'
    ];
}
```
You can learn more about what components do by reading the [Components article](components).

#### Registering menu items

Backend menu items are registered in the Plugin information file. An example of registering a menu item:

```php
public function registerNavigation()
{
    return [
        'blog' => [
            'label' => 'Blog',
            'url' => Backend::url('october/blog/posts')
        ]
    ];
}
```
You can learn more about registering backend menu items by reading the Backend navigation article (To do).

