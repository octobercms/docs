# Controllers & AJAX

The October CMS backend implements an Model-View-Controller (MVC) pattern. Controllers manage backend pages and implement various features like forms and lists. This article describes how to develop backend controllers and how to configure controller behaviors.

Each controller is represented with a PHP script which resides in the the **/controllers** subdirectory of a Plugin directory. Controller views are `.htm` files that reside in the controller view directory. The controller view directory name matches the controller class name written in lowercase. The view directory can also contain controller configuration files. An example of a controller directory structure:

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `controllers`
|           |   ├── users                _<== View Directory_
|           |   |   ├── _partial.htm     _<== Partial File_
|           |   |   ├── config_form.yaml _<== Config File_
|           |   |   └── index.htm        _<== View File_
|           |   └── Users.php            _<== Controller Class_
|           └── Plugin.php
:::

> **Tip**: For a practical example of using backend controllers, check out the [Beyond Behaviors tutorial series](https://octobercms.com/support/article/ob-19).

### Class Definition

Controller classes must extend the `\Backend\Classes\Controller` class. As any other plugin class, controllers should belong to the [plugin namespace](../plugin/registration.md#plugin-namespaces). The most basic representation of a Controller used inside a Plugin looks like this.

```php
namespace Acme\Blog\Controllers;

class Posts extends \Backend\Classes\Controller
{
    public function index()    // <=== Action method
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
**$requiredPermissions** | permissions required to view this page. Can be set in the class definition or in the controller constructor. See [users & permissions](users) for details.
**$pageTitle** | sets the page title. Can be set in the action method.
**$bodyClass** | body class property used for customizing the layout. Can be set in the controller constructor or action method.
**$guarded** | controller specific methods which cannot be called as actions. Can be extended in the controller constructor.
**$layout** | specify a custom layout for the controller views (see [layouts](../backend/views-partials.md#layouts-and-child-layouts)).

## Actions, Views and Routing

Public controller methods, called **actions** are coupled to **view files** which represent the page corresponding the action. Back-end view files use PHP syntax. Example of the **index.htm** view file contents, corresponding to the **index** action method:

```html
<h1>Hello World</h1>
```

URL of this page is made up of the author name, plugin name, controller name and action name.

    backend/[author name]/[plugin name]/[controller name]/[action name]

The above Controller results in the following:

    http://example.com/backend/acme/blog/users/index

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

Plugins can register the backend navigation menus and submenus in the [plugin registration file](../plugin/registration.md#navigation-menus). The navigation context determines what backend menu and submenu are active for the current backend page. You can set the navigation context with the `BackendMenu` class:

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
$this->pageTitle = 'Blog categories';
```

## Using AJAX Handlers

The backend AJAX framework uses the same [AJAX library](../ajax/introduction.md) as the front-end pages. The library is loaded automatically on the backend pages.

### Backend AJAX Handlers

The backend AJAX handlers can be defined in the controller class or [widgets](widgets.md). In the controller class the AJAX handlers are defined as public methods with the name starting with "on" string: **onCreateTemplate**, **onGetTemplateList**, etc.

Back-end AJAX handlers can return an array of data, throw an exception or redirect to another page (see [AJAX event handlers](../ajax/handlers.md)). You can use `$this->vars` to set variables and the controller's `makePartial` method to render a partial and return its contents as a part of the response data.

```php
public function onOpenTemplate()
{
    if (Request::input('someVar') != 'someValue') {
        throw new ApplicationException('Invalid value');
    }

    $this->vars['foo'] = 'bar';

    return [
        'partialContents' => $this->makePartial('some-partial')
    ];
}
```

### Triggering AJAX Requests

The AJAX request can be triggered with the data attributes API or the JavaScript API. Please see the [front-end AJAX library](../ajax/introduction) for details. The following example shows how to trigger a request with a backend button.

```html
<button
    type="button"
    data-request="onDoSomething"
    class="btn btn-default">
    Do something
</button>
```

> **Note**: You can specifically target the AJAX handler of a widget using a prefix `widget::onName`. See the [widget AJAX handler article](../backend/widgets.md#ajax-handlers) for more details.

## Overriding a Response

You can override responses in your backend controllers as a mechanism for making changes to the response of a HTTP request. For example, you may wish to specify a HTTP header for certain actions in your controller, or redirect users if they don't meet certain criteria.

Overriding a response is useful particularly when extending other controllers. However you may find it useful to call these methods locally.

```php
\Author\Plugin\Controllers\SomeController::extend(function($controller) {
    $controller->setResponseHeader('Test-Header', 'Test');
});
```

If you want to check the routed action or parameters, you can find these available in the controller `action` and `params` properties.

```php
Author\Plugin\Controllers\SomeController::extend(function($controller) {
    if ($this->action === 'index') {
        // Only do it for the index action
    }

    if ($this->params[0] ?? null) {
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

To override the entire response, call the `setResponse` method, this will force the response regardless of what happens on the page's lifecycle.

```php
$this->setResponse('Page Not Found');
```

You may also pass a `Response` object to this method.

```php
$this->setResponse(Response::make(...));
```

> **Note**: Check out the [Views & Responses article](../services/response-view) for more information on building responses.
