# Backend Controllers, Views & AJAX

- [Introduction](#introduction)
- [Actions, views and routing](#actions-views-routing)
- [Passing data to views](#passing-data-to-views)
- [Partials](#partials)
- [Setting the navigation context](#navigation-context)
- [AJAX](#ajax)

October back-end implements the MVC pattern. Controllers manage back-end pages and implement various features like forms and lists. This article describes how to develop back-end controllers and how to configure controller behaviors.

<a name="introduction" class="anchor" href="#introduction"></a>
## Introduction

Each controller is represented with a PHP script which resides in the the **/controllers** subdirectory of a Plugin directory. Controller views are htm files that reside in the controller view directory. The controller view directory name matches the controller class name written in lowercase. The view directory can also contain controller configuration files. An example of a controller directory structure:

    plugins/
      acme/
        blog/
          controllers/
            users/               <=== Controller view directory
              _partial.htm       <=== Controller partial file
              config_form.yaml   <=== Controller config file
              index.htm          <=== Controller view file
            Users.php            <=== Controller class
          Plugin.php

<a name="class-definition" class="anchor" href="#class-definition"></a>
### Class definition

Controller classes must extend the `\Backend\Classes\Controller` class. As any other plugin class, controllers should belong to the [plugin namespace](../plugin/registration#namespaces). The most basic representation of a Controller used inside a Plugin looks like this:

    namespace Acme\Blog\Controllers;

    class Posts extends \Backend\Classes\Controller {

        public function index()    // <=== Action method
        {

        }
    }

Usually each controller implements functionality for working with a single type of data - like blog posts or categories. All back-end behaviors described below assume this convention.

<a name="controller-properties" class="anchor" href="#controller-properties"></a>
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

<a name="actions-views-routing" class="anchor" href="#actions-views-routing"></a>
## Actions, views and routing

Public controller methods, called **actions** are coupled to **view files** which represent the page corresponding the action. Back-end view files use PHP syntax. Example of the **index.htm** view file contents, corresponding to the **index** action method:

    <h1>Hello World</h1>

URL of this page is made up of the author name, plugin name, controller name and action name.

    backend/[author name]/[plugin name]/[controller name]/[action name]

The above Controller results in the following:

    http://yoursite.com/backend/acme/blog/users/index

<a name="passing-data-to-views" class="anchor" href="#passing-data-to-views"></a>
## Passing data to views

Usually when you build the back-end user interface you can use the **controller behaviors**, described below, and don't need to pass any variables directly to your views. However you can do it with the controller's `$vars` property:

    $this->vars['var'] = 'value';

The variables passed with the `$vars` property can be accessed in the view code directly:

    <p>The variable value is <?= $var ?></p>

<a name="partials" class="anchor" href="#partials"></a>
## Partials

Back-end partials are files with the extension **htm** that reside in the [controller's views](#introduction) directory. The partial file names should start with the underscore: *_partial.htm*. Partials can be rendered from a back-end page or another partial. Use the controller's `makePartial()` method to render a partial. The method takes two parameters - the partial name and the optional array of variables to pass to the partial. Example:

    <?= $this->makePartial('sidebar', ['showHeader' => true]) ?>

<a name="navigation-context" class="anchor" href="#navigation-context"></a>
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

<a name="ajax" class="anchor" href="#ajax"></a>
## Back-end AJAX framework

The back-end AJAX framework uses the same [AJAX library](../cms/ajax) as the front-end pages. The library is loaded automatically on the back-end pages.

<a name="ajax-handlers" class="anchor" href="#ajax-handlers"></a>
### Back-end AJAX handlers

The back-end AJAX handlers can be defined in the controller class or [widgets](widgets). In the controller class the AJAX handlers are defined as public methods with the name starting with "on" string: **onCreateTemplate**, **onGetTemplateList**, etc.

Back-end AJAX handlers can return an array of data, throw an exception or redirect to another page (see the [front-end AJAX library](../cms/ajax)). You can use the controller's `makePartial()` method to render a partial and return its contents as a part of the response data.

    public function onOpenTemplate()
    {
        if (Request::input('someVar') != 'someValue')
            throw new ApplicationException('Invalid value');

        return [
            'partialContents' => $this->makePartial('some_partial', [
                'var' => 'value'
            ])
        ];
    }

<a name="triggering-ajax-requests" class="anchor" href="#triggering-ajax-requests"></a>
### Triggering AJAX requests

The AJAX request can be triggered with the data attributes API or the JavaScript API. Please see the [front-end AJAX library](../cms/ajax) for details. The following example shows how to trigger a request with a back-end button.

    <button 
        type="button" 
        data-request="onDoSomething" 
        class="btn btn-default">
        Do something
    </button>
