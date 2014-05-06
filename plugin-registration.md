# Plugin Registration

- [Introduction](#introduction)
- [Registration file](#registration-file)
- [Routing and initialization](#routing-initialization)
- [Component registration](#component-registration)
- [Extending Twig](#extending-twig)
- [Widget registration](#widget-registration)
- [Navigation and permissions](#navigation-permissions)
- [Backend settings](#backend-settings)
- [Migrations and version history](#migrations-version-history)

Plugins are the foundation for adding new features to the CMS by extending it. This article describes the component registration. The registration process allows plugins to declare their features such as [components](components) or back-end menus and pages. Some examples of what a plugin can do:

- Define [components](components).
- Define user permissions.
- Add back-end pages, menu items, and forms.
- Create database table structures and seed data.
- Alter functionality of the core or other plugins.
- Provide classes, back-end controllers, views, assets, and other files.

<a name="introduction" class="anchor" href="#introduction"></a>
## Introduction

Plugins reside in the **/plugins** subdirectory of the application directory. An example of a plugin directory structure:

    plugins/
      acme/              <=== Author name
        blog/            <=== Plugin name
          classes/
          components/
          controllers/
          models/
          updates/
          ...
          Plugin.php     <=== Plugin registration file

Not all plugin directories are required. The only required file is the **Plugin.php** described below. If your plugin provides only a single [component](components), your plugin directory could be much simpler, like this:

    plugins/
      acme/              <=== Author name
        blog/            <=== Plugin name
          components/
          Plugin.php     <=== Plugin registration file

<a name="namespaces" class="anchor" href="#namespaces"></a>
### Plugin namespaces

Plugin namespaces are very important, especially if you are going to publish your plugins on the [October Marketplace](http://octobercms.com/plugins). When you register as an author on the Marketplace you will be asked for the author code which should be used as a root namespace for all your plugins. You can specify the author code only once, when you register. The default author code offered by the Marketplace consists of the author first and last name: JohnSmith. The code cannot be changed after you register. All your plugin namespaces should be defined under the root namespace, for example `\JohnSmith\Blog`.

<a name="registration-file" class="anchor" href="#registration-file"></a>
## Registration file

The **Plugin.php** file, called the *Plugin registration file*, is an initialization script that declares a plugin's core functions and information. Registration files can provide the following:

- Information about the plugin, its name, and author
- Registration methods for extending the CMS

Registration scripts should use the plugin namespace. The registration script should define a class with the name `Plugin` that extends the `\System\Classes\PluginBase` class. The only required method of the plugin registration class is the `pluginDetails()`. An example Plugin registration file:

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

<a name="registration-methods" class="anchor" href="#registration-methods"></a>
### Supported methods

The following methods are supported in the plugin registration class:

- **pluginDetails()** - returns the plugin information.
- **register()** - register method, called when the plugin is first registered.
- **boot()** - boot method, called right before the request route.
- **registerComponents()** - registers any front-end components used by this plugin.
- **registerMarkupTags()** - registers additional markup tags that can be used in the CMS.
- **registerNavigation()** - registers back-end navigation items for this plugin.
- **registerPermissions()** - registers any back-end permissions used by this plugin.
- **registerSettings()** - registers any back-end configuration links used by this plugin.
- **registerFormWidgets()** - registers any back-end widgets used by this plugin.
- **registerReportWidgets()** - registers any report widgets, including the dashboard widgets.

<a name="basic-plugin-information" class="anchor" href="#basic-plugin-information"></a>
### Basic plugin information

The `pluginDetails()` is a required method of the plugin registration class. It should return an array containing 4 keys: 

- **name** - the plugin name.
- **description** - the plugin description.
- **author** - the plugin author name.
- **icon** - a name of the plugin icon. October uses [FontAwesome 3 icons](http://fortawesome.github.io/Font-Awesome/3.2.1/cheatsheet/). Any icon names provided by this font are valid, for example **icon-glass**, **icon-music**.

<a name="routing-initialization" class="anchor" href="#routing-initialization"></a>
## Routing and initialization

Plugin registration files can contain two methods `boot()` and `register()`. With these methods you can do anything you like, like register routes or attach handlers to events.

The `register()` method is called immediately when the plugin is registered. The `boot()` method is called right before a request is routed. So if your actions rely on another plugin, you should use the boot method. For example, inside the `boot()` method you can extend models:

    public function boot()
    {
        User::extend(function($model) {
            $model->hasOne['author'] = ['Acme\Blog\Models\Author'];
        });
    }

Plugins can also supply a file named **routes.php** that contain custom routing logic, as defined in the [Laravel Routing documentation](http://laravel.com/docs/routing). For example:

    Route::group(['prefix' => 'acme/blog'], function() {

        Route::get('cleanup_posts', function(){ return Posts::cleanUp(); });

    });

<a name="component-registration" class="anchor" href="#component-registration"></a>
## Component registration

[Components](components) must be registered in the [Plugin registration file](#registration-file). This tells the CMS about the Component and provides a **short name** for using it. An example of registering a component:

    public function registerComponents()
    {
        return [
            'October\Demo\Components\Todo' => 'demoTodo'
        ];
    }

This will register the Todo component class with the default alias name **demoTodo**. More information on building components can be found at the [Building Components](components) article.

<a name="extending-twig" class="anchor" href="#extending-twig"></a>
## Extending Twig

Custom Twig filters and functions can be registered in the CMS with the `registerMarkupTags()` method of the plugin registration class. The next example registers two Twig filters and two functions.

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

<a name="widget-registration" class="anchor" href="#widget-registration"></a>
## Widget registration

Plugins can register [form widgets](../backend/widgets#form-widgets) by overriding the `registerFormWidgets()` method in the plugin registration class. The method should return an array containing the widget classes in the keys and widget name and context in the values. Example:

    public function registerFormWidgets()
    {
        return [
            'Backend\FormWidgets\CodeEditor' => [
                'label' => 'Code editor',
                'alias' => 'codeeditor'
            ]
        ];
    }

Plugins can register [report widgets](../backend/widgets#report-widgets) by overriding the `registerReportWidgets()` method in the plugin registration class. The method should return an array containing the widget classes in the keys and widget name and context in the values. Example:

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

The **name** element defines the widget name for the Add Widget popup window. The **context** element defines the context where the widget could be used. October's report widget system allows to host the report container on any page, and the container context name is unique. The widget container on the Dashboard page uses the **dashboard** context.

<a name="navigation-permissions" class="anchor" href="#navigation-permissions"></a>
## Navigation and permissions

Plugins can extend the back-end navigation menus and permissions by overriding methods of the [Plugin registration class](#registration-file). This section shows you how to add menu items and permissions to the back-end navigation area. An example of registering a top-level navigation menu item with two sub-menu items:

    public function registerNavigation()
    {
        return [
            'blog' => [
                'label'       => 'Blog',
                'url'         => Backend::url('acme/blog/posts'),
                'icon'        => 'icon-pencil',
                'permissions' => ['acme.blog.*'],
                'order'       => 500,

                'subMenu' => [
                    'posts' => [
                        'label'       => 'Posts',
                        'icon'        => 'icon-copy',
                        'url'         => Backend::url('acme/blog/posts'),
                        'permissions' => ['acme.blog.access_posts'],
                    ],
                    'categories' => [
                        'label'       => 'Categories',
                        'icon'        => 'icon-copy',
                        'url'         => Backend::url('acme/blog/categories'),
                        'permissions' => ['acme.blog.access_categories']
                    ],
                ]

            ]
        ];
    }

When you register the back-end navigation you can use localization strings for the `label` values. The localization is described in the [plugin localization](localization) article.

The next example shows how to register back-end permission items. Permissions are defined with a permission key and description. In the back-end permission management user interface permissions are displayed as a checkbox list. Back-end controllers can use permissions defined by plugins for restricting the [user access](../backend/users) to pages or features.

    public function registerPermissions()
    {
        return [
            'acme.blog.access_posts'       => ['label' => 'Manage the blog posts'],
            'acme.blog.access_categories'  => ['label' => 'Manage the blog categories']
        ];
    }

<a name="backend-settings" class="anchor" href="#backend-settings"></a>
## Backend settings

The System / Settings page contains a list of links to the configuration pages. The list of links can be extended by plugins by overriding the `registerSettings()` method of the [Plugin registration class](#registration-file). When you create a configuration link you have two options - create a link to a specific back-end page, or create a link to a settings model. The next example shows how to create a link to a back-end page.

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

The following example creates a link to a settings model. Settings models is a part of the settings API which is described in the [Settings & Config](settings) article.

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

<a name="migrations-version-history" class="anchor" href="#migrations-version-history"></a>
## Migrations and version history

Plugins keep a change log inside the **/updates** directory to maintain version information and database structure. An example of an updates directory structure:

    plugins/
      author/
        myplugin/
          updates/                    <=== Updates directory
            version.yaml              <=== Plugin version file
            create_tables.php         <=== Database scripts
            seed_the_database.php     <=== Migration file
            create_another_table.php  <=== Migration file

The **version.yaml** file, called the *Plugin version file*, contains the version comments and refers to database scripts in the correct order. Please read the [Database structure](../database/structure) article for information about the migration files. An example Plugin version file:

    1.0.1:
        - First version
        - create_tables.php
        - seed_the_database.php
    1.0.2: Small fix that uses no scripts
    1.0.3: Another minor fix
    1.0.4:
        - Creates another table for this new feature
        - create_another_table.php

> **Note:** To apply plugin updates, log out of the back-end and sign in again. The plugin version history is applied when an administrator signs in to the back-end.
