---
previousPath: extend/system/controllers.md
subtitle: Add pages to the admin panel with a controller, its actions and their views.
---
# Controllers

A backend controller adds pages to the admin panel. Each public method on the controller is a page, called an action, and each action renders a view file with the same name.

## Creating a Controller

The `create:controller` command generates a controller class along with its configuration and view files. The first argument is the author and plugin name, and the second is the controller name.

```bash
php artisan create:controller Acme.Blog Posts
```

The command creates the following files in the plugin.

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `controllers`
|           |   ├── posts  _← View Directory_
|           |   |   ├── _list_toolbar.php  _← Partial File_
|           |   |   ├── config_form.yaml  _← Config File_
|           |   |   ├── config_list.yaml  _← Config File_
|           |   |   ├── create.php  _← View File_
|           |   |   ├── index.php  _← View File_
|           |   |   ├── preview.php  _← View File_
|           |   |   └── update.php  _← View File_
|           |   └── Posts.php  _← Controller Class_
|           └── Plugin.php
:::

The generated pages list and edit records of the `Acme\Blog\Models\Post` model, named after the singular form of the controller. [Create the model](../data/models.md#creating-a-model) and its database table first, or use the `--model` option to name a different model. Once both exist, open the page in the admin panel.

```text
https://example.tld/admin/acme/blog/posts
```

The command supports the following options.

Option | Description
------------- | -------------
**--model** | the model class to use, defaults to the singular controller name.
**--no-list** | leaves out the list page.
**--no-form** | leaves out the create, update and preview pages.
**--design** | the form design to use: `basic`, `sidebar`, `survey`, `popup` or `custom`. See [form designs](../../handbook/controller-config/form.md#form-designs).

The generated controller requires the `acme.blog.posts` permission and highlights the `posts` item under the `blog` menu. Super users can open the page straight away. To add the page to the menu and grant it to other administrators, [register the navigation](./navigation.md) and [the permission](./permissions.md) in your plugin.

## Adding Forms and Lists with Behaviors

A controller gets its list and form pages from behaviors. A behavior is a class that adds its own actions and methods to the controller, listed in the `$implement` property. The generated controller uses two of them.

```php
namespace Acme\Blog\Controllers;

use BackendMenu;
use Backend\Classes\Controller;

class Posts extends Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class,
        \Backend\Behaviors\ListController::class,
    ];

    public $formConfig = 'config_form.yaml';

    public $listConfig = 'config_list.yaml';

    public $requiredPermissions = ['acme.blog.posts'];

    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Acme.Blog', 'blog', 'posts');
    }
}
```

The `ListController` behavior provides the `index` action, which shows a searchable list of records. The `FormController` behavior provides the `create`, `update` and `preview` actions. Each behavior reads its settings from the YAML file named in its property, such as `$listConfig`. You still supply the view files, which the command generates for you.

- [Form Controller](../forms/form-controller.md) explains the create, update and preview pages.
- [List Controller](../lists/list-controller.md) explains the list page.
- [Relation Controller](../relations/relation-controller.md) manages related records inside a form.
- [Import Export Controller](../import-export/import-export-controller.md) adds import and export pages.

Read [Behaviors](./behaviors.md) to learn how behaviors work and how to write your own.

## Adding a Custom Page

A page you write yourself is a public method on the controller, coupled to a view file of the same name. The following controller defines an `index` action.

```php
namespace Acme\Blog\Controllers;

class Posts extends \Backend\Classes\Controller
{
    public function index()    // ← Action method
    {
    }
}
```

The view file **controllers/posts/index.php** holds the page content. Backend views use PHP syntax.

```html
<h1>Hello World</h1>
```

Controller classes extend `Backend\Classes\Controller` and belong to the [plugin namespace](../plugins/introduction.md). The view directory is named after the controller class in lowercase, and can also hold partials and configuration files. A controller usually works with a single type of data, such as blog posts or categories, and the behaviors assume this convention. See [Views & Layouts](./views.md) for partials and layouts.

### Page URLs

The URL of a page is made of the author name, plugin name, controller name and action name.

```text
admin/[author name]/[plugin name]/[controller name]/[action name]
```

The `index` action of the `Posts` controller above is available at the following URL. When the URL leaves out the action name, the `index` action is used.

```text
https://example.tld/admin/acme/blog/posts/index
```

If the plugin defines a **hint** in its [plugin details](../plugins/introduction.md#plugin-details), a shorter URL is also available. This is useful for masking the author name in URLs.

```text
admin/[plugin hint]/[controller name]/[action name]
```

## Passing Data to Views

Use the `$vars` property of the controller to pass data to the view.

```php
$this->vars['myVariable'] = 'value';
```

Each value is available as a variable in the view.

```php
<p>The variable value is <?= $myVariable ?></p>
```

## Setting the Page Title

Set the title of the page with the `$pageTitle` property, usually inside the action method. The form and list behaviors set the title for you.

```php
$this->pageTitle = 'Blog Categories';
```

## Setting the Navigation Context

Plugins register their backend menus and submenus in the [plugin registration file](./navigation.md). The navigation context sets which menu and submenu are active on the current page. Set it with the `BackendMenu` class, usually in the controller constructor.

```php
namespace Acme\Blog\Controllers;

use BackendMenu;

class Categories extends \Backend\Classes\Controller
{
    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Acme.Blog', 'blog', 'categories');
    }
}
```

The first argument is the author and plugin name. The second is the menu code. The optional third argument is the submenu code.

## Restricting Access

Set the `$requiredPermissions` property to the permissions a user needs to open the pages of a controller. The user needs at least one of the listed permissions.

```php
public $requiredPermissions = ['acme.blog.access_posts'];
```

Every action requires a signed in administrator, except those listed in the `$publicActions` property. See [Permissions](./permissions.md) for registering permissions and checking them inside a page.

## Running Code Before Each Action

Use the `beforeDisplay` method for logic shared by every action of the controller, such as initializing widgets. It runs after the permission checks and before the action. If it returns a response, such as a redirect, that response is used instead of the page.

```php
public function beforeDisplay()
{
    // Initialize widgets, handle file uploads, etc.
}
```

Controllers may also run logic in the native `__construct` method.

```php
public function __construct()
{
    parent::__construct();
}
```

::: warning
The constructor runs before the permission checks, so it must not contain any sensitive logic.
:::

## Controller Properties

The backend controller base class defines the following properties to configure the page appearance and manage page security.

Property | Description
------------- | -------------
**$fatalError** | stores a fatal exception generated in an action method, to display it in the view.
**$user** | contains a reference to the backend user object.
**$suppressView** | prevents the view from being displayed. Can be updated in the action method or in the controller constructor.
**$params** | an array of the routed parameters.
**$action** | the name of the action method being executed in the current request.
**$publicActions** | an array of actions available without backend user authentication. Can be overridden in the class definition.
**$requiredPermissions** | permissions required to view this page. Can be set in the class definition or in the controller constructor. See [Permissions](./permissions.md) for details.
**$pageTitle** | sets the page title. Can be set in the action method.
**$bodyClass** | body class used for customizing the layout. Can be set in the controller constructor or action method.
**$guarded** | controller methods that cannot be called as actions. Can be extended in the controller constructor.
**$layout** | specifies a custom layout for the [controller views](./views.md).
**$turboRouter** | configures the [turbo router](../../themes/ajax/turbo-router.md) for PJAX navigation. Set to `true` to enable, `false` to disable, a string for visit control (e.g. `'reload'`), or an array of turbo meta tag values.

## Overriding a Response

You can override the response of a backend controller, for example to add an HTTP header to certain actions or to redirect users who do not meet certain criteria. This is most useful when extending another controller.

```php
\Author\Plugin\Controllers\SomeController::extend(function($controller) {
    $controller->setResponseHeader('Test-Header', 'Test');
});
```

To check the routed action or parameters, use the `getAction` and `getParams` methods of the controller.

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

You can also call these methods inside your own controller. To add a header to the response, call the `setResponseHeader` method.

```php
$this->setResponseHeader('Test-Header', 'Test');
```

To change the status code of the response, use the `setStatusCode` method.

```php
$this->setStatusCode(404);
```

To override the entire response, call the `setResponse` method. This forces the response regardless of what happens in the page life cycle.

```php
$this->setResponse('Page Not Found');
```

You may also pass a `Response` object to this method.

```php
$this->setResponse(Response::make(...));
```

See [Views & Responses](../services/response-view.md) for more information on building responses.

## Configuring the Turbo Router

The [turbo router](../../themes/ajax/turbo-router.md) uses PJAX (push state and AJAX) to swap page content without full page reloads. Configure it per controller with the `$turboRouter` property.

Setting the property to `true` enables turbo and outputs `<meta name="turbo-visit-control" content="enable">`.

```php
public $turboRouter = true;
```

Setting it to `false` disables turbo for the controller, and no turbo meta tags are output.

```php
public $turboRouter = false;
```

A string value is shorthand for the `visit-control` meta tag. For example, `'reload'` triggers a full page reload on incoming PJAX requests.

```php
public $turboRouter = 'reload';
```

For more control, use an array where each key maps to a `turbo-{key}` meta tag.

```php
public $turboRouter = [
    'visit-control' => 'enable',
    'view-transition' => 'same-origin',
    'root' => '/app',
];
```

This outputs the following meta tags.

```html
<meta name="turbo-visit-control" content="enable" />
<meta name="turbo-view-transition" content="same-origin" />
<meta name="turbo-root" content="/app" />
```

When turbo is enabled and no `root` key is specified, the `turbo-root` meta tag defaults to the backend base URL.

To enable turbo for every backend controller, set `turbo_router` to `true` in the **config/backend.php** file, or set `BACKEND_TURBO_ROUTER=true` in the environment file. A controller that sets its own `$turboRouter` value keeps that value.

#### See Also

::: also
* [Views & Layouts](./views.md)
* [Behaviors](./behaviors.md)
* [Navigation](./navigation.md)
* [Views and Responses](../services/response-view.md)
* [Beyond Behaviors Tutorial Series](https://octobercms.com/support/article/ob-19)
:::
