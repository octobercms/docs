---
subtitle: Create pages that implement various features like forms and lists.
---
# Controllers

The October CMS backend implements an Model-View-Controller (MVC) pattern. This article describes how to develop backend controllers and how to configure controller behaviors.

Each controller is represented with a PHP script which resides in the the **/controllers** subdirectory of a Plugin directory. Controller views are `.php` files that reside in the controller view directory. The controller view directory name matches the controller class name written in lowercase. The view directory can also contain controller configuration files. An example of a controller directory structure:

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `controllers`
|           |   ├── users  _← View Directory_
|           |   |   ├── config_form.yaml  _← Config File_
|           |   |   ├── _partial.php  _← Partial File_
|           |   |   └── index.php  _← View File_
|           |   └── Users.php  _← Controller Class_
|           └── Plugin.php
:::

:::tip
For a practical example of using backend controllers, check out the [Beyond Behaviors tutorial series](https://octobercms.com/support/article/ob-19).
:::

### Class Definition

The `create:controller` command generates a controller, configuration and view files. The first argument specifies the author and plugin name. The second argument specifies the controller class name.

```bash
php artisan create:controller Acme.Blog Posts
```

Controller classes must extend the `Backend\Classes\Controller` class. As any other plugin class, controllers should belong to the [plugin namespace](../system/plugins.md). The most basic representation of a Controller used inside a Plugin looks like this.

```php
namespace Acme\Blog\Controllers;

class Posts extends \Backend\Classes\Controller
{
    public function index()    // ← Action method
    {

    }
}
```

Usually each controller implements functionality for working with a single type of data - like blog posts or categories. All backend behaviors described below assume this convention.

### Controller Properties

The backend controller base class defines a number of properties that allow to configure the page appearance and manage the page security:

Property | Description
------------- | -------------
**$fatalError** | allows to store a fatal exception generated in an action method in order to display it in the view.
**$user** | contains a reference to the the backend user object.
**$suppressView** | allows to prevent the view display. Can be updated in the action method or in the controller constructor.
**$params** | an array of the routed parameters.
**$action** | a name of the action method being executed in the current request.
**$publicActions** | defines an array of actions available without the backend user authentication. Can be overridden in the class definition.
**$requiredPermissions** | permissions required to view this page. Can be set in the class definition or in the controller constructor. See [users & permissions](../backend/users.md) for details.
**$pageTitle** | sets the page title. Can be set in the action method.
**$bodyClass** | body class property used for customizing the layout. Can be set in the controller constructor or action method.
**$guarded** | controller specific methods which cannot be called as actions. Can be extended in the controller constructor.
**$layout** | specify a custom layout for the [controller views](../system/views.md).

## Initialization Logic

Controllers may perform initialization logic in the native `__construct` method.

::: warning
Logic inside the constructor is not protected and should not handle any sensitive logic.
```php
public function __construct()
{
    parent::__construct();
}
```
:::

The `beforeDisplay` method is called after the permission checks happen and most logic should be placed here. This includes initializing widgets and other shared components.

```php
public function beforeDisplay()
{
    // Initialize widgets, handle file uploads, etc.
}
```

## Actions, Views and Routing

Public controller methods, called **actions** are coupled to **view files** which represent the page corresponding the action. Backend view files use PHP syntax. Example of the **index.php** view file contents, corresponding to the `index` action method.

```html
<h1>Hello World</h1>
```

URL of this page is made up of the author name, plugin name, controller name and action name.

```text
admin/[author name]/[plugin name]/[controller name]/[action name]
```

For example, the class definition used at the beginning of this article is accessible via the following URL.

```text
https://example.tld/admin/acme/blog/users/index
```

If a [plugin is registered](./plugins.md) with a **hint** in the `pluginDetails` method, a shorter URL structure becomes available, which is useful for masking the author name in URLs.

```text
admin/[plugin hint]/[controller name]/[action name]
```

## Passing Data to Views

Use the controller's `$vars` property to pass any data directly to your view:

```php
$this->vars['myVariable'] = 'value';
```

The variables passed with the `$vars` property can now be accessed directly in your view:

```php
<p>The variable value is <?= $myVariable ?></p>
```

## Setting the Navigation Context

Plugins can register the backend navigation menus and submenus in the [plugin registration file](../backend/navigation.md). The navigation context determines what backend menu and submenu are active for the current backend page. You can set the navigation context with the `BackendMenu` class:

```php
BackendMenu::setContext('Acme.Blog', 'blog', 'categories');
```

The first parameter specifies the author and plugin names. The second parameter sets the menu code. The optional third parameter specifies the submenu code. Usually you call the `BackendMenu::setContext` in the controller constructor.

```php
namespace Acme\Blog\Controllers;

class Categories extends \Backend\Classes\Controller {

public function __construct()
{
    parent::__construct();

    BackendMenu::setContext('Acme.Blog', 'blog', 'categories');
}
```

You can set the title of the backend page with the `$pageTitle` property of the controller class (note that the form and list behaviors can do it for you):

```php
$this->pageTitle = 'Blog Categories';
```

## Overriding a Response

You can override responses in your backend controllers as a mechanism for making changes to the response of a HTTP request. For example, you may wish to specify a HTTP header for certain actions in your controller, or redirect users if they don't meet certain criteria.

Overriding a response is useful particularly when extending other controllers. However you may find it useful to call these methods locally.

```php
\Author\Plugin\Controllers\SomeController::extend(function($controller) {
    $controller->setResponseHeader('Test-Header', 'Test');
});
```

If you want to check the routed action or parameters, you can find these available in the controller `getAction` and `getParams` methods.

```php
Author\Plugin\Controllers\SomeController::extend(function($controller) {
    if ($controller->getAction() === 'index') {
        // Only do it for the index action
    }

    if ($controller->getParams()[0] ?? null) {
        // Only if first parameter exists
    }
});
```

To add a header to your response, you may call the `setResponseHeader` method.

```php
$this->setResponseHeader('Test-Header', 'Test');
```

To change the status code of a response, use the `setStatusCode` method.

```php
$this->setStatusCode(404);
```

To override the entire response, call the `setResponse` method, this will force the response regardless of what happens on the page's life cycle.

```php
$this->setResponse('Page Not Found');
```

You may also pass a `Response` object to this method.

```php
$this->setResponse(Response::make(...));
```

View the [Views & Responses article](../services/response-view.md) for more information on building responses.

#### See Also

::: also
* [Views and Responses](../services/response-view.md)
:::
