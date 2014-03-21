# Plugin Registration

- [Introduction](#introduction)
- [Registration File](#registration-file)
- [Version History](#version-history)

<a name="introduction"></a>
## Introduction

Plugins are the foundation for adding new features to the CMS by extending it. Some examples of what a plugin can do:

1. Define components.
2. Define user permissions.
3. Add back-end pages, menu items, and forms.
4. Create database table structures and seed data.
5. Alter functionality of the core or other plugins.
6. Provide classes, back-end controllers, views, assets, and other files.

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
      Plugin.php       <=== Plugin registration file
```



<a name="registration-file"></a>
## Registration File

The **Plugin.php** file, called the *Plugin registration file*, is an initialization script that defines a plugin's core functions and information. They can provide the following:

1. Information about the plugin, its name, and author
2. Registration methods for extending the CMS

An example Plugin registration file:

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
            'Acme\Blog\Components\Post' => 'blogPost'
        ];
    }
}
```

#### Supported methods

The following registration methods are supported:

- **register()** - Register method, called when the plugin is first registered.
- **boot()** - Boot method, called right before the request route.
- **registerComponents()** - Registers any front-end components used by this plugin.
- **registerWidgets()** - Registers any back-end widgets used by this plugin.
- **registerNavigation()** - Registers back-end navigation items for this plugin.
- **registerPermissions()** - Registers any back-end permissions used by this plugin.
- **registerSettings()** - Registers any back-end configuration links used by this plugin.
- **registerReportWidgets()** - Registers any report widgets, including the dashboard widgets.
- **registerMarkupTags()** - Registers additional markup tags that can be used in the CMS.

#### Initialization methods

Plugin registration files can contain two methods: `boot` and `register`. With these methods you can do anything you like, like register routes or attach to events.

The `register` method is called immediately when the plugin is registered. The `boot` method is called right before a request is routed. So if your actions rely on another plugin, you should use the boot method.



<a name="version-history"></a>
## Version History

Plugins keep a change log inside the **/updates** directory to maintain version information and database structure. An example of an updates directory structure:

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



<a name="navigation"></a>
## Registering menu items

This section shows you how to add menu items to the back-end navigation area.

Backend menu items are registered in the Plugin registration file. An example of registering a menu item:

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

#### Adding back-end menu items

Back-end navigation items are registered in the system by plugins, contained in the Plugin Information File. An example of registering a navigation menu item:

```php
<?php namespace Plugins\October\Blog;

class Plugin extends System\Classes\PluginBase
{

    [...]

    public function registerNavigation()
    {
        return [
            'blog' => [
                'label' => 'Blog',
                'url' => Backend::url('october/blog/posts'),
                'icon' => 'icon-pencil',
                'permissions' => ['blog:*'],
                'order' => 500,
                'subMenu' => [
                    'posts' => [
                        'label' => 'Posts',
                        'icon' => 'icon-copy',
                        'url' => Backend::url('october/blog/posts'),
                        'permissions' => ['blog:access_posts'],
                    ],
                    'categories' => [
                        'label' => 'Categories',
                        'icon' => 'icon-copy',
                        'url' => Backend::url('october/blog/categories'),
                        'permissions' => ['blog:access_categories'],
                    ],
                ]
            ]
        ];
    }

}
```


<a name="custom-markup-tags"></a>
## Custom markup tags

Additional markup tags can be registered in the CMS by plugins. An example of registering a custom markup tag:

* A **filter** will manipulate a value with a specified function. Example: `{{ 'value'|uppercase }}`
* A **function** can be used by itself and takes some parameters. Example: `{{ form_open('value') }}`

```php
public function registerMarkupTags()
{
    return [
        'filters' => [
            // A global function, i.e str_plural()
            'plural' => 'str_plural',

            // A local method, i.e $this->makeTextAllCaps()
            'uppercase' => [$this, 'makeTextAllCaps']
        ],
        'functions' => [
            // A static method call, i.e Form::open()
            'form_open' => ['October\Rain\Html\Form', 'open'],

            // Using an inline closure
            'helloWorld' => function() { return 'Hello World!'; }
        ]
    ];
}

public function makeTextAllCaps($text)
{
    return strtoupper($text);
}
```
