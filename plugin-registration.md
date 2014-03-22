# Plugin Registration

- [Introduction](#introduction)
- [Registration file](#registration-file)
- [Routing and initialization](#routing-initialization)
- [Component registration](#component-registration)
- [Custom markup tags](#custom-markup-tags)
- [Widget registration](#widget-registration)
- [Navigation and permissions](#navigation-permissions)
- [Backend settings](#backend-settings)
- [Version history](#version-history)

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

    plugins/
      acme/              <=== Author name
        blog/            <=== Plugin name
          classes/
          components/
          controllers/
          models/
          updates/
          ...
          Plugin.php       <=== Plugin registration file




<a name="registration-file"></a>
## Registration file

The **Plugin.php** file, called the *Plugin registration file*, is an initialization script that defines a plugin's core functions and information. They can provide the following:

1. Information about the plugin, its name, and author
2. Registration methods for extending the CMS

An example Plugin registration file:

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

#### Supported methods

The following registration methods are supported:

- **register()** - Register method, called when the plugin is first registered.
- **boot()** - Boot method, called right before the request route.
- **registerComponents()** - Registers any front-end components used by this plugin.
- **registerMarkupTags()** - Registers additional markup tags that can be used in the CMS.
- **registerNavigation()** - Registers back-end navigation items for this plugin.
- **registerPermissions()** - Registers any back-end permissions used by this plugin.
- **registerSettings()** - Registers any back-end configuration links used by this plugin.
- **registerFormWidgets()** - Registers any back-end widgets used by this plugin.
- **registerReportWidgets()** - Registers any report widgets, including the dashboard widgets.



<a name="routing-initialization"></a>
## Routing and initialization

Plugin registration files can contain two methods: `boot` and `register`.
With these methods you can do anything you like, like register routes or attach to events.

The `register` method is called immediately when the plugin is registered.
The `boot` method is called right before a request is routed.
So if your actions rely on another plugin, you should use the boot method.

Plugins can also supply a file named **routes.php** that contain custom routing logic, as defined in the [Laravel Routing documentation](http://laravel.com/docs/routing). For example:

    Route::group(['prefix' => 'acme/blog'], function() {

        Route::get('cleanup_posts', function(){ return Posts::cleanUp(); });

    });




<a name="component-registration"></a>
## Component registration

Components must be registered in the [Plugin registration file](plugins).
This tells the CMS about the Component and provides a *short name* for using it.
An example of registering a component:

    public function registerComponents()
    {
        return [
            'October\Demo\Components\Todo' => 'demoTodo'
        ];
    }

This will register the Todo component class with the default alias name *demoTodo*.

More information on building components can be found at the [Component Development article](http://octobercms.com/docs/plugin/components).



<a name="custom-markup-tags"></a>
## Custom markup tags

Additional markup tags can be registered in the CMS by plugins. An example of registering a custom markup tag:

* A **filter** will manipulate a value with a specified function. Example: `{{ 'value'|uppercase }}`
* A **function** can be used by itself and takes some parameters. Example: `{{ form_open('value') }}`

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



<a name="widget-registration"></a>
## Widget registration

#### Form Widgets

Plugins can register form widgets by overriding the **registerFormWidgets()** method in the plugin registration class.
The method should return an array containing the widget classes in the keys and widget name and context in the values.
Example:

    public function registerFormWidgets()
    {
        return [
            'Backend\FormWidgets\CodeEditor' => [
                'label' => 'Code editor',
                'alias' => 'codeeditor'
            ]
        ];
    }

#### Report Widgets

Plugins can register dashboard widgets by overriding the **registerReportWidgets()** method in the plugin registration class. The method should return an array containing the widget classes in the keys and widget name and context in the values. Example:

    public function registerReportWidgets()
    {
        return [
            'RainLab\GoogleAnalytics\ReportWidgets\TrafficOverview'=>[
                'label'   => 'Google Analytics traffic overview',
                'context' => 'dashboard'
            ],
            'RainLab\GoogleAnalytics\ReportWidgets\TrafficSources'=>[
                'label'   => 'Google Analytics traffic sources',
                'context' => 'dashboard'
            ]
        ];
    }

The **name** element defines the widget name for the Add Widget popup window.
The **context** element defines the context where the widget could be used.
October's report widget system allows to host the report container on any page, and the container context name is unique.
The widget container on the Dashboard page uses the **dashboard** context.



<a name="navigation-permissions"></a>
## Navigation and permissions

Back-end navigation and permission items are registered in the system by plugins, contained in the Plugin Information File. 
This section shows you how to add menu and permission items to the back-end navigation area.

#### Adding to the backend menu

An example of registering a navigation menu item:

    public function registerNavigation()
    {
        return [
            'blog' => [
                'label'       => 'Blog',
                'url'         => Backend::url('october/blog/posts'),
                'icon'        => 'icon-pencil',
                'permissions' => ['blog:*'],
                'order'       => 500,

                'subMenu' => [
                    'posts' => [
                        'label'       => 'Posts',
                        'icon'        => 'icon-copy',
                        'url'         => Backend::url('october/blog/posts'),
                        'permissions' => ['blog:access_posts'],
                    ],
                    'categories' => [
                        'label'       => 'Categories',
                        'icon'        => 'icon-copy',
                        'url'         => Backend::url('october/blog/categories'),
                        'permissions' => ['blog:access_categories'],
                    ],
                ]

            ]
        ];
    }

#### Creating new permissions

An example of registering a backend permission item:

    public function registerPermissions()
    {
        return [
            'backend.access_dashboard' => ['label' => 'View the dashboard'],
            'backend.manage_users'     => ['label' => 'Manage other administrators']
        ];
    }



<a name="backend-settings"></a>
## Backend settings

The section shows you how to add linkable items to the System Settings page.

#### Link to a page URL

```php
public function registerSettings()
{
    return [
        'location' => [
            'label'       => 'Locations',
            'description' => 'Manage available user countries and states.',
            'category'    => 'Users',
            'icon'        => 'icon-globe',
            'url'         => Backend::url('october/user/locations'),
            'order'       => 100
        ]
    ];
}
```

#### Link to a Settings model

```php
public function registerSettings()
{
    return [
        'settings' => [
            'label'       => 'User Settings',
            'description' => 'Manage user based settings.',
            'category'    => 'Users',
            'icon'        => 'icon-cog',
            'class'       => 'October\User\Models\Settings',
            'order'       => 100
        ]
    ];
}
```

More information on Settings models can be found at the [Plugin Settings & Configuration article](http://octobercms.com/docs/plugin/settings).




<a name="version-history"></a>
## Version history

Plugins keep a change log inside the **/updates** directory to maintain version information and database structure. An example of an updates directory structure:

    plugins/
      author/
        myplugin/
          updates/                    <=== Updates directory
            version.yaml              <=== Plugin version file
            create_tables.php         <=== Database scripts
            seed_the_database.php     <==^
            create_another_table.php  <==^

The **version.yaml** file, called the *Plugin version file*, contains the version comments and refers to database scripts in the correct order.
An example Plugin version file:

    1.0.1:
        - First version
        - create_tables.php
        - seed_the_database.php
    1.0.2: Small fix that uses no scripts
    1.0.3: Another minor fix
    1.0.4:
        - Creates another table for this new feature
        - create_another_table.php
