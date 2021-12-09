# Registration

Plugins are the foundation for adding new features to the CMS by extending it. This article describes the component registration. The registration process allows plugins to declare their features such as [components](components.md) or back-end menus and pages. Some examples of what a plugin can do:

1. Define [components](components.md).
1. Define [user permissions](../backend/users.md).
1. Add [settings pages](settings.md#backend-settings-pages), [menu items](#navigation-menus), [lists](../backend/lists.md) and [forms](../backend/forms.md).
1. Create [database table structures and seed data](updates.md).
1. Alter [functionality of the core or other plugins](events.md).
1. Provide classes, [back-end controllers](../backend/controllers-ajax), views, assets, and other files.

### Directory Structure

Plugins reside in the **plugins** subdirectory of the application directory. An example of a plugin directory structure:

::: dir
├── `plugins`
|   └── acme     _<== Author Name_
|       └── blog _<== Plugin Name_
|           ├── classes
|           ├── components
|           ├── controllers
|           ├── models
|           ├── updates
|           └── Plugin.php _<== Registration File_
:::

Not all plugin directories are required. The only required file is the **Plugin.php** described below. If your plugin provides only a single [component](components.md), your plugin directory could be much simpler, like this:

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `components`
|           └── Plugin.php
:::

> **Note**: if you are developing a plugin for the [Marketplace](http://octobercms.com/help/site/marketplace), the [updates/version.yaml](updates) file is required.

### Plugin Namespaces

Plugin namespaces are essential, especially if you are going to publish your plugins on the [October Marketplace](http://octobercms.com/plugins). When you register as an author on the Marketplace you will be asked for the author code which should be used as a root namespace for all your plugins. You can specify the author code only once, when you register. The default author code offered by the Marketplace consists of the author first and last name: JohnSmith. The code cannot be changed after you register. All your plugin namespaces should be defined under the root namespace, for example `\JohnSmith\Blog`.

## Registration File

The **Plugin.php** file, called the *Plugin registration file*, is an initialization script that declares a plugin's core functions and information. Registration files can provide the following:

1. Information about the plugin, its name, and author.
1. Registration methods for extending the CMS.

Registration scripts should use the plugin namespace. The registration script should define a class with the name `Plugin` that extends the `\System\Classes\PluginBase` class. The only required method of the plugin registration class is `pluginDetails`. An example Plugin registration file:

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

### Registration Methods

The following methods are supported in the plugin registration class:

Method | Description
------------- | -------------
**pluginDetails()** | returns information about the plugin.
**register()** | register method, called when the plugin is first registered.
**boot()** | boot method, called right before the request route.
**registerMarkupTags()** | registers [additional markup tags](#extending-twig) that can be used in the CMS.
**registerComponents()** | registers any [front-end components](components#component-registration) used by this plugin.
**registerNavigation()** | registers [back-end navigation menu items](#navigation-menus) for this plugin.
**registerPermissions()** | registers any [back-end permissions](../backend/users#registering-permissions) used by this plugin.
**registerSettings()** | registers any [back-end configuration links](settings#settings-link-registration) used by this plugin.
**registerFormWidgets()** | registers any [back-end form widgets](../backend/widgets#form-widget-registration) supplied by this plugin.
**registerReportWidgets()** | registers any [back-end report widgets](../backend/widgets#report-widget-registration), including the dashboard widgets.
**registerListColumnTypes()** | registers any [custom list column types](../backend/lists.md#custom-column-types) supplied by this plugin.
**registerMailLayouts()** | registers any [mail view layouts](mail.md#registering-mail-layouts-templates-partials) supplied by this plugin.
**registerMailTemplates()** | registers any [mail view templates](mail.md#registering-mail-layouts-templates-partials) supplied by this plugin.
**registerMailPartials()** | registers any [mail view partials](mail.md#registering-mail-layouts-templates-partials) supplied by this plugin.
**registerSchedule()** | registers [scheduled tasks](../plugin/scheduling.md#defining-schedules) that are executed on a regular basis.

### Basic Plugin Information

The `pluginDetails` is a required method of the plugin registration class. It should return an array containing the following keys:

Key | Description
------------- | -------------
**name** | the plugin name, required.
**description** | the plugin description, required.
**author** | the plugin author name, required.
**icon** | a name of the plugin icon. The full list of available icons can be found in the [UI documentation](../ui/icon.md). Any icon names provided by this font are valid, for example **icon-glass**, **icon-music**, optional.
**iconSvg** | an SVG icon to be used in place of the standard icon. The SVG icon should be a rectangle and can support colors, optional.
**homepage** | a link to the author's website address, optional.

## Routing and Initialization

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

Plugins can also supply a file named **routes.php** that contain custom routing logic, as defined in the [router service](../services/router.md). For example:

```php
Route::get('api_acme_blog/cleanup_posts', function() {
    return Posts::cleanUp();
});
```

## Dependency Definitions

A plugin can depend upon other plugins by defining a `$require` property in the [Plugin registration file](#registration-file), the property should contain an array of plugin names that are considered requirements. A plugin that depends on the **Acme.User** plugin can declare this requirement in the following way:

```php
namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    /**
     * @var array Plugin dependencies
     */
    public $require = ['Acme.User'];

    // ...
}
```

Dependency definitions will affect how the plugin operates and [how the update process applies updates](../plugin/updates.md#update-process). The installation process will attempt to install any dependencies automatically, however if a plugin is detected in the system without any of its dependencies it will be disabled to prevent system errors.

Dependency definitions can be complex but care should be taken to prevent circular references. The dependency graph should always be directed and a circular dependency is considered a design error.

## Extending Twig

Custom Twig filters and functions can be registered in the CMS with the `registerMarkupTags` method of the plugin registration class. The next example registers two Twig filters and two functions.

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
            'form_open' => [\October\Rain\Html\Form::class, 'open'],

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

## Navigation Menus

Plugins can extend the back-end navigation menus by overriding the `registerNavigation` method of the [Plugin registration class](#registration-file). This section shows you how to add menu items to the back-end navigation area. An example of registering a top-level navigation menu item with two sub-menu items:

```php
public function registerNavigation()
{
    return [
        'blog' => [
            'label' => 'Blog',
            'url' => Backend::url('acme/blog/posts'),
            'icon' => 'icon-pencil',
            'permissions' => ['acme.blog.*'],
            'order' => 500,

            'sideMenu' => [
                'posts' => [
                    'label' => 'Posts',
                    'icon' => 'icon-copy',
                    'url' => Backend::url('acme/blog/posts'),
                    'permissions' => ['acme.blog.access_posts'],
                ],
                'categories' => [
                    'label' => 'Categories',
                    'icon' => 'icon-copy',
                    'url' => Backend::url('acme/blog/categories'),
                    'permissions' => ['acme.blog.access_categories'],
                ]
            ]
        ]
    ];
}
```

When you register the back-end navigation you can use [localization strings](localization.md) for the `label` values. Back-end navigation can also be controlled by the `permissions` values and correspond to defined [back-end user permissions](../backend/users). The order in which the back-end navigation appears on the overall navigation menu items, is controlled by the `order` value. Higher numbers mean that the item will appear later on in the order of menu items while lower numbers mean that it will appear earlier on.

To make the sub-menu items visible, you may [set the navigation context](../backend/controllers-ajax.md#setting-the-navigation-context) in the back-end controller using the `BackendMenu::setContext` method. This will make the parent menu item active and display the children in the side menu.

Key | Description
------------- | -------------
**label** | specifies the menu label localization string key, required.
**icon** | an icon name from the [October CMS icon collection](../ui/icon.md), optional.
**iconSvg** | an SVG icon to be used in place of the standard icon, the SVG icon should be a rectangle and can support colors, optional.
**url** | the URL the menu item should point to (eg. `Backend::url('author/plugin/controller/action')`, required.
**counter** | a numeric value to output near the menu icon. The value should be a number or a callable returning a number, optional.
**counterLabel** | a string value to describe the numeric reference in counter, optional.
**badge** | a string value to output in place of the counter, the value should be a string and will override the badge property if set, optional.
**attributes** | an associative array of attributes and values to apply to the menu item, optional.
**permissions** | an array of permissions the backend user must have in order to view the menu item (Note: direct access of URLs still requires separate permission checks), optional.

The following are system generated value and are not provided when registering the navigation items.

Key | Description
------------- | -------------
**code** | a string value that acts as an unique identifier for that menu option.
**owner** | a string value that specifies the menu items owner plugin or module in the format "Author.Plugin".

### Navigation Counters

Navigation items support specifying a badge or a counter to indicate that there are items that require attention. These properties are available to parent and child menu items alike. Use the **counter** and **counterLabel** to show a numeric counter.

```php
'blog' => [
    // ...
    'counter' => [\Author\Plugin\Classes\MyMenuCounterService::class, 'getCounterMethod'],
    'counterLabel' => 'Label describing a dynamic menu counter',
],
```

Use the **badge** item to display a badge with a word, such as "New", for example.

```php
'blog' => [
    // ...
    'badge' => 'New'
],
```

## Registering Middleware

To register a custom middleware, you can extend a Controller class by using the following method.

```php
public function boot()
{
    \Cms\Classes\CmsController::extend(function($controller) {
        $controller->middleware(\Path\To\Custom\Middleware::class);
    });
}
```

Alternatively, you can push it directly into the Kernel via the following.

```php
public function boot()
{
    // Add a new middleware to beginning of the stack.
    $this->app[\Illuminate\Contracts\Http\Kernel::class]
            ->prependMiddleware('Path\To\Custom\Middleware');

    // Add a new middleware to end of the stack.
    $this->app[\Illuminate\Contracts\Http\Kernel::class]
            ->pushMiddleware('Path\To\Custom\Middleware');
}
```
