# Backend Controllers & AJAX

- [Introduction](#introduction)
    - [Class definition](#class-definition)
    - [Controller properties](#controller-properties)
- [Actions, views and routing](#actions-views-routing)
- [Passing data to views](#passing-data-to-views)
- [Setting the navigation context](#navigation-context)
- [Using AJAX handlers](#ajax)
    - [Back-end AJAX handlers](#ajax-handlers)
    - [Triggering AJAX requests](#triggering-ajax-requests)

<a name="introduction"></a>
## Introduction

October back-end implements the MVC pattern. Controllers manage back-end pages and implement various features like forms and lists. This article describes how to develop back-end controllers and how to configure controller behaviors.

Each controller is represented with a PHP script which resides in the the **/controllers** subdirectory of a Plugin directory. Controller views are htm files that reside in the controller view directory. The controller view directory name matches the controller class name written in lowercase. The view directory can also contain controller configuration files. An example of a controller directory structure:

    plugins/
      acme/
        blog/
          controllers/
            users/                <=== Controller view directory
              _partial.htm        <=== Controller partial file
              config_form.yaml    <=== Controller config file
              index.htm           <=== Controller view file
            Users.php             <=== Controller class
          Plugin.php

<a name="class-definition"></a>
### Class definition

Controller classes must extend the `\Backend\Classes\Controller` class. As any other plugin class, controllers should belong to the [plugin namespace](../plugin/registration#namespaces). The most basic representation of a Controller used inside a Plugin looks like this:

    namespace Acme\Blog\Controllers;

    class Posts extends \Backend\Classes\Controller {

        public function index()    // <=== Action method
        {

        }
    }

Usually each controller implements functionality for working with a single type of data - like blog posts or categories. All back-end behaviors described below assume this convention.

<a name="controller-properties"></a>
### Controller properties

The back-end controller base class defines a number of properties that allow to configure the page appearance and manage the page security:

Property | Description
------------- | -------------
**$fatalError** | allows to store a fatal exception generated in an action method in order to display it in the view.
**$user** | contains a reference to the the back-end user object.
**$suppressView** | allows to prevent the view display. Can be updated in the action method or in the controller constructor.
**$params** | an array of the routed parameters.
**$action** | a name of the action method being executed in the current request.
**$publicActions** | defines an array of actions available without the back-end user authentication. Can be overridden in the class definition.
**$requiredPermissions** | permissions required to view this page. Can be set in the class definition or in the controller constructor. See [users & permissions](users) for details.
**$pageTitle** | sets the page title. Can be set in the action method.
**$bodyClass** | body class property used for customizing the layout. Can be set in the controller constructor or action method.
**$guarded** | controller specific methods which cannot be called as actions. Can be extended in the controller constructor.
**$layout** | specify a custom layout for the controller views (see [layouts](#layouts) below).

<a name="actions-views-routing"></a>
## Actions, views and routing

Public controller methods, called **actions** are coupled to **view files** which represent the page corresponding the action. Back-end view files use PHP syntax. Example of the **index.htm** view file contents, corresponding to the **index** action method:

    <h1>Hello World</h1>

URL of this page is made up of the author name, plugin name, controller name and action name.

    backend/[author name]/[plugin name]/[controller name]/[action name]

The above Controller results in the following:

    http://yoursite.com/backend/acme/blog/users/index

<a name="passing-data-to-views"></a>
## Passing data to views

Usually when you build the back-end user interface you can use the **controller behaviors**, described below, and don't need to pass any variables directly to your views. However you can do it with the controller's `$vars` property:

    $this->vars['var'] = 'value';

The variables passed with the `$vars` property can be accessed in the view code directly:

    <p>The variable value is <?= $var ?></p>

<a name="navigation-context"></a>
## Setting the navigation context

Plugins can register the back-end navigation menus and submenus in the [plugin registration file](../plugin/registration#navigation-menus). The navigation context determines what back-end menu and submenu are active for the current back-end page. You can set the navigation context with the `BackendMenu` class:

    BackendMenu::setContext('Acme.Blog', 'blog', 'categories');

The first parameter specifies the author and plugin names. The second parameter sets the menu code. The optional third parameter specifies the submenu code. Usually you call the `BackendMenu::setContext()` in the controller constructor.

    namespace Acme\Blog\Controllers;

    class Categories extends \Backend\Classes\Controller {

    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Acme.Blog', 'blog', 'categories');
    }

You can set the title of the back-end page with the `$pageTitle` property of the controller class (note that the form and list behaviors can do it for you):

    $this->pageTitle = 'Blog categories';

<a name="ajax"></a>
## Using AJAX handlers

The back-end AJAX framework uses the same [AJAX library](../ajax/introduction) as the front-end pages. The library is loaded automatically on the back-end pages.

<a name="ajax-handlers"></a>
### Back-end AJAX handlers

The back-end AJAX handlers can be defined in the controller class or [widgets](widgets). In the controller class the AJAX handlers are defined as public methods with the name starting with "on" string: **onCreateTemplate**, **onGetTemplateList**, etc.

Back-end AJAX handlers can return an array of data, throw an exception or redirect to another page (see [AJAX event handlers](../ajax/handlers)). You can use `$this->vars` to set variables and the controller's `makePartial()` method to render a partial and return its contents as a part of the response data.

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

<a name="triggering-ajax-requests"></a>
### Triggering AJAX requests

The AJAX request can be triggered with the data attributes API or the JavaScript API. Please see the [front-end AJAX library](../ajax/introduction) for details. The following example shows how to trigger a request with a back-end button.

    <button
        type="button"
        data-request="onDoSomething"
        class="btn btn-default">
        Do something
    </button>

> **Note**: You can specifically target the AJAX handler of a widget using a preix `widget::onName`. See the [widget AJAX handler article](../backend/widgets#generic-ajax-handlers) for more details.
