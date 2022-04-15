# Plugins

Plugins are the foundation for adding new features to the CMS by extending it. This article describes the component registration. The registration process allows plugins to declare their features such as [components](components.md) or back-end menus and pages. Some examples of what a plugin can do:

1. Define [components](components.md).
1. Define [user permissions](../backend/users.md).
1. Add [settings pages](settings.md#oc-backend-settings-pages), [menu items](#oc-navigation-menus), [lists](../backend/lists.md) and [forms](../backend/forms.md).
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

> **Note**: if you are developing a plugin for the [Marketplace](https://octobercms.com/help/site/marketplace), the [updates/version.yaml](updates.md) file is required.

<a id="oc-plugin-namespaces"></a>
### Plugin Namespaces

Plugin namespaces are essential, especially if you are going to publish your plugins on the [October Marketplace](https://octobercms.com/plugins). When you register as an author on the Marketplace you will be asked for the author code which should be used as a root namespace for all your plugins. You can specify the author code only once, when you register. The default author code offered by the Marketplace consists of the author first and last name: JohnSmith. The code cannot be changed after you register. All your plugin namespaces should be defined under the root namespace, for example `\JohnSmith\Blog`.

<a id="oc-registration-file"></a>
## Registration File

The **Plugin.php** file, called the *plugin registration file*, is an initialization script that declares a plugin's core functions and information. Registration files can provide the following:

1. Information about the plugin, its name, and author.
1. Registration methods for extending the CMS.

Registration scripts should use the plugin namespace. The registration script should define a class with the name `Plugin` that extends the `\System\Classes\PluginBase` class. The only required method of the plugin registration class is `pluginDetails`. An example plugin registration file is below.

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
**icon** | a name of the plugin icon. The full list of available icons can be found in the [UI documentation](https://octobercms.com/docs/ui/icon). Any icon names provided by this font are valid, for example **icon-glass**, **icon-music**, optional.
**iconSvg** | an SVG icon to be used in place of the standard icon. The SVG icon should be a rectangle and can support colors, optional.
**homepage** | a link to the author's website address, optional.

<a id="oc-routing-and-initialization"></a>
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

<a id="oc-dependency-definitions"></a>
## Dependency Definitions

A plugin can depend upon other plugins by defining a `$require` property in the plugin registration file, the property should contain an array of plugin names that are considered requirements. A plugin that depends on the **Acme.User** plugin can declare this requirement in the following way:

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

Dependency definitions will affect how the plugin operates and [how the update process applies updates](../plugin/updates.md). The installation process will attempt to install any dependencies automatically, however if a plugin is detected in the system without any of its dependencies it will be disabled to prevent system errors.

Dependency definitions can be complex but care should be taken to prevent circular references. The dependency graph should always be directed and a circular dependency is considered a design error.

<a id="oc-extending-twig"></a>
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
