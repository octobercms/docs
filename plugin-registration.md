# Plugin Registration

- [Introduction](#introduction)
- [Registration file](#registration-file)
- [Routing and initialization](#routing-initialization)
- [Dependency definitions](#dependency-definitions)
- [Extending Twig](#extending-twig)
- [Navigation menus](#navigation-menus)
- [Scheduled tasks](#scheduled-tasks)
- [Migrations and version history](#migrations-version-history)

Plugins are the foundation for adding new features to the CMS by extending it. This article describes the component registration. The registration process allows plugins to declare their features such as [components](components) or back-end menus and pages. Some examples of what a plugin can do:

1. Define [components](components).
1. Define [user permissions](../backend/users).
1. Add [settings pages](settings#backend-pages), [menu items](#navigation-menus), [lists](../backend/lists) and [forms](../backend/forms).
1. Create [database table structures and seed data](#migrations-version-history).
1. Alter [functionality of the core or other plugins](events).
1. Provide classes, [back-end controllers](../backend/controllers-views-ajax), views, assets, and other files.

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

> **Note:** if you are developing a plugin for the [Marketplace](http://octobercms.com/help/site/marketplace), the [updates/version.yaml](#migrations-version-history) file is required.

<a name="namespaces" class="anchor" href="#namespaces"></a>
### Plugin namespaces

Plugin namespaces are very important, especially if you are going to publish your plugins on the [October Marketplace](http://octobercms.com/plugins). When you register as an author on the Marketplace you will be asked for the author code which should be used as a root namespace for all your plugins. You can specify the author code only once, when you register. The default author code offered by the Marketplace consists of the author first and last name: JohnSmith. The code cannot be changed after you register. All your plugin namespaces should be defined under the root namespace, for example `\JohnSmith\Blog`.

<a name="registration-file" class="anchor" href="#registration-file"></a>
## Registration file

The **Plugin.php** file, called the *Plugin registration file*, is an initialization script that declares a plugin's core functions and information. Registration files can provide the following:

1. Information about the plugin, its name, and author.
1. Registration methods for extending the CMS.

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

Method | Description
------------- | -------------
**pluginDetails()** | returns information about the plugin.
**register()** | register method, called when the plugin is first registered.
**boot()** | boot method, called right before the request route.
**registerMarkupTags()** | registers [additional markup tags](#extending-twig) that can be used in the CMS.
**registerComponents()** | registers any [front-end components](components#component-registration) used by this plugin.
**registerNavigation()** | registers [back-end navigation menu items](#navigation-menus) for this plugin.
**registerPermissions()** | registers any [back-end permissions](../backend/users#permission-registration) used by this plugin.
**registerSettings()** | registers any [back-end configuration links](settings#link-registration) used by this plugin.
**registerFormWidgets()** | registers any [back-end form widgets](../backend/widgets#form-widget-registration) used by this plugin.
**registerReportWidgets()** | registers any [back-end report widgets](../backend/widgets#report-widget-registration), including the dashboard widgets.
**registerMailTemplates()** | registers any [mail view templates](mail#mail-template-registration) supplied by this plugin.
**registerSchedule()** | registers [scheduled tasks](#scheduled-tasks) that are executed on a regular basis.

<a name="basic-plugin-information" class="anchor" href="#basic-plugin-information"></a>
### Basic plugin information

The `pluginDetails()` is a required method of the plugin registration class. It should return an array containing the following keys:

Key | Description
------------- | -------------
**name** | the plugin name, required.
**description** | the plugin description, required.
**author** | the plugin author name, required.
**icon** | a name of the plugin icon. October uses [Font Autumn icons](http://daftspunk.github.io/Font-Autumn/), any icon names provided by this font are valid, for example **icon-glass**, **icon-music**.
**homepage** | A link to the author's website address, optional.

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

> **Note:** The `boot()` and `register()` methods are not called during the update process to protect the system from critical errors.

Plugins can also supply a file named **routes.php** that contain custom routing logic, as defined in the [Laravel Routing documentation](http://laravel.com/docs/routing). For example:

    Route::group(['prefix' => 'api_acme_blog'], function() {

        Route::get('cleanup_posts', function(){ return Posts::cleanUp(); });

    });

<a name="dependency-definitions" class="anchor" href="#dependency-definitions"></a>
## Dependency definitions

A plugin can depend upon other plugins by defining a `$require` property in the [Plugin registration file](#registration-file), the property should contain an array of plugin names that are considered requirements. A plugin that depends on the **Acme.User** plugin can declare this requirement in the following way:

    namespace Acme\Blog;

    class Plugin extends \System\Classes\PluginBase
    {
        /**
         * @var array Plugin dependencies
         */
        public $require = ['Acme.User'];

        [...]
    }

Dependency definitions will affect how the plugin operates and [how the update process applies updates](../database/structure#update-process). The installation process will attempt to install any dependencies automatically, however if a plugin is detected in the system without any of its dependencies it will be disabled to prevent system errors.

Dependency definitions can be complex but care should be taken to prevent circular references. The dependency graph should always be directed and a circular dependency is considered a design error.

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

<a name="navigation-menus" class="anchor" href="#navigation-menus"></a>
## Navigation menus

Plugins can extend the back-end navigation menus by overriding methods of the [Plugin registration class](#registration-file). This section shows you how to add menu items to the back-end navigation area. An example of registering a top-level navigation menu item with two sub-menu items:

    public function registerNavigation()
    {
        return [
            'blog' => [
                'label'       => 'Blog',
                'url'         => Backend::url('acme/blog/posts'),
                'icon'        => 'icon-pencil',
                'permissions' => ['acme.blog.*'],
                'order'       => 500,

                'sideMenu' => [
                    'posts' => [
                        'label'       => 'Posts',
                        'icon'        => 'icon-copy',
                        'url'         => Backend::url('acme/blog/posts'),
                        'permissions' => ['acme.blog.access_posts']
                    ],
                    'categories' => [
                        'label'       => 'Categories',
                        'icon'        => 'icon-copy',
                        'url'         => Backend::url('acme/blog/categories'),
                        'permissions' => ['acme.blog.access_categories']
                    ]
                ]
            ]
        ];
    }

When you register the back-end navigation you can use [localization strings](localization) for the `label` values. Back-end navigation can also be controlled by the `permissions` values and correspond to defined [back-end user permissions](../backend/users).

<a name="scheduled-tasks" class="anchor" href="#scheduled-tasks"></a>
## Scheduled tasks

October has the ability to [run automated tasks on a regular basis](http://laravel.com/docs/5.0/artisan#scheduling-artisan-commands). A plugin can register to this service by overriding the `registerSchedule` method. The method will take a single `$schedule` argument and is used for defining commands along with their frequency.

    public function registerSchedule($schedule)
    {
        // Clear the cache every 10 minutes
        $schedule->command('cache:clear')->everyFiveMinutes();

        // Perform a task every hour
        $schedule->call(function() {
            //...
        })->hourly();
    }

The time methods supported by `$schedule` are:

Method | Description
------------- | -------------
**everyFiveMinutes()** | Run a command every `5` minutes
**everyTenMinutes()** | Run a command every `10` minutes
**everyThirtyMinutes()** | Run a command every `30` minutes
**hourly()** | Run once an hour at the beginning of the hour
**daily()** | Run once a day at midnight
**weekly()** | Run once a week at midnight on Sunday morning
**monthly()** | Run once a month at midnight in the morning of the first day of the month
**yearly()** | Run once a year at midnight in the morning of January 1

<a name="migrations-version-history" class="anchor" href="#migrations-version-history"></a>
## Migrations and version history

Plugins keep a change log inside the **/updates** directory to maintain version information and database structure. An example of an updates directory structure:

    plugins/
      author/
        myplugin/
          updates/                      <=== Updates directory
            version.yaml                <=== Plugin version file
            create_tables.php           <=== Database scripts
            seed_the_database.php       <=== Migration file
            create_another_table.php    <=== Migration file

The **version.yaml** file, called the *Plugin version file*, contains the version comments and refers to database scripts in the correct order. Please read the [Database structure](../database/structure) article for information about the migration files. This file is required if you're going to submit the plugin to the [Marketplace](http://octobercms.com/help/site/marketplace). An example Plugin version file:

    1.0.1:
        - First version.
        - create_tables.php
        - seed_the_database.php
    1.0.2: Small fix that uses no scripts.
    1.0.3: Another minor fix.
    1.0.4:
        - Creates another table for this new feature.
        - create_another_table.php

> **Note:** To apply plugin updates during development, log out of the back-end and sign in again. The plugin version history is applied when an administrator signs in to the back-end. Plugin updates are applied automatically for plugins installed from the Marketplace when you update the system.

More information on the plugin version file can be found in the [database structure article](../database/structure#update-files).
