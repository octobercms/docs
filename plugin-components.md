# Component Development

- [Introduction](#introduction)
- [Component class definition](#component-class-definition)
    - [Component registration](#component-registration)
- [Component properties](#component-properties)
    - [Dropdown properties](#dropdown-properties)
    - [Page list properties](#page-list-properties)
- [Routing parameters](#routing-parameters)
- [Handling the page execution cycle](#page-cycle)
    - [Page execution life cycle handlers](#page-cycle-handlers)
    - [Component initialization](#page-cycle-init)
    - [Halting with a response](#page-cycle-response)
- [AJAX handlers](#ajax-handlers)
- [Default markup](#default-markup)
- [Component partials](#component-partials)
    - [Referencing "self"](#referencing-self)
    - [Unique identifier](#unique-identifier)
- [Rendering partials from code](#render-partial-method)
- [Injecting page assets with components](#component-assets)

<a name="introduction"></a>
## Introduction

Components files and directories reside in the **/components** subdirectory of a plugin directory. Each component has a PHP file defining the component class and an optional component partials directory. The component partials directory name matches the component class name written in lowercase. An example of a component directory structure:

    plugins/
      acme/
        myplugin/
          components/
            componentname/       <=== Component partials directory
              default.htm        <=== Component default markup (optional)
            ComponentName.php    <=== Component class file
          Plugin.php

Components must be [registered in the Plugin registration class](#component-registration) with the `registerComponents()` method.

<a name="component-class-definition"></a>
## Component class definition

The **component class file** defines the component functionality and [component properties](#component-properties). The component class file name should match the component class name. Component classes should extend the `\Cms\Classes\ComponentBase` class. The component form the next example should be defined in the plugins/acme/blog/components/BlogPosts.php file.

    namespace Acme\Blog\Components;

    class BlogPosts extends \Cms\Classes\ComponentBase
    {
        public function componentDetails()
        {
            return [
                'name' => 'Blog Posts',
                'description' => 'Displays a collection of blog posts.'
            ];
        }

        // This array becomes available on the page as {{ component.posts }}
        public function posts()
        {
            return ['First Post', 'Second Post', 'Third Post'];
        }
    }

The `componentDetails()` method is required. The method should return an array with two keys: `name` and `description`. The name and description are display in the CMS back-end user interface.

When this [component is attached to a page or layout](../cms/components), the class properties and methods become available on the page through the component variable, which name matches the component short name or the alias. For example, if the BlogPost component from the previous example was defined on a page with its short name:

    url = "/blog"

    [blogPosts]
    ==

You would be able to access its `posts()` method through the `blogPosts` variable. Note that Twig supports the property notation for methods, so that you don't need to use brackets.

    {% for post in blogPosts.posts %}
        {{ post }}
    {% endfor %}

<a name="component-registration"></a>
### Component registration

Components must be registered by overriding the `registerComponents()` method inside the [Plugin registration class](registration#registration-file). This tells the CMS about the Component and provides a **short name** for using it. An example of registering a component:

    public function registerComponents()
    {
        return [
            'October\Demo\Components\Todo' => 'demoTodo'
        ];
    }

This will register the Todo component class with the default alias name **demoTodo**. More information on using components can be found at the [CMS components article](../cms/components).

<a name="component-properties"></a>
## Component properties

When you add a component to a page or layout you can configure it using properties. The properties are defined with the `defineProperties()` method of the component class. The next example shows how to define a component property:

    public function defineProperties()
    {
        return [
            'maxItems' => [
                 'title'             => 'Max items',
                 'description'       => 'The most amount of todo items allowed',
                 'default'           => 10,
                 'type'              => 'string',
                 'validationPattern' => '^[0-9]+$',
                 'validationMessage' => 'The Max Items property can contain only numeric symbols'
            ]
        ];
    }

The method should return an array with the property keys as indexes and property parameters as values. The property keys are used for accessing the component property values inside the component class. The property parameters are defined with an array with the following keys:

Key | Description
------------- | -------------
**title** | required, the property title, it is used by the component Inspector in the CMS back-end.
**description** | required, the property description, it is used by the component Inspector in the CMS back-end.
**default** | optional, the default property value to use when the component is added to a page or layout in the CMS back-end.
**type** | optional, specifies the property type. The type defines the way how the property is displayed in the Inspector. Currently supported types are **string**, **checkbox** and **dropdown**. Default value: **string**.
**validationPattern** | optional Regular Expression to use when a user enters the property value in the Inspector. The validation can be used only with **string** properties.
**validationMessage** | optional error message to display if the validation fails.
**required** | optional, forces field to be filled. Uses validationMessage when left empty.
**placeholder** | optional placeholder for string and dropdown properties.
**options** | optional array of options for dropdown properties.
**depends** | an array of property names a dropdown property depends on. See the [dropdown properties](#dropdown-properties) below.
**group** | an optional group name. Groups create sections in the Inspector simplifying the user experience. Use a same group name in multiple properties to combine them.
**showExternalParam** | specifies visiblity of the External Parameter editor for the property in the Inspector. Default value: **true**.

Inside the component you can read the property value with the `property()` method:

    $this->property('maxItems');

If the property value is not defined, you can supply the default value as a second parameter of the `property()` method:

    $this->property('maxItems', 6);

You can also load all the properties as array:

    $properties = $this->getProperties();

<a name="dropdown-properties"></a>
### Dropdown properties

The option list for dropdown properties can be static or dynamic. Static options are defined with the `options` element of the property definition.Example:

    public function defineProperties()
    {
        return [
            'units' => [
                'title'       => 'Units',
                'type'        => 'dropdown',
                'default'     => 'imperial',
                'placeholder' => 'Select units',
                'options'     => ['metric'=>'Metric', 'imperial'=>'Imperial']
            ]
        ];
    }

The list of options could be fetched dynamically from the server when the Inspector is displayed. If the `options` parameter is omitted in a dropdown property definition the option list is considered dynamic. The component class must define a method returning the option list. The method should have a name in the following format: `get*Property*Options()`, where **Property** is the property name, for example: `getCountryOptions`. The method returns an array of options with the option values as keys and option labels as values. Example of a dynamic dropdown list definition:

    public function defineProperties()
    {
        return [
            'country' => [
                'title'   => 'Country',
                'type'    => 'dropdown',
                'default' => 'us'
            ]
        ];
    }

    public function getCountryOptions()
    {
        return ['us'=>'United states', 'ca'=>'Canada'];
    }

Dynamic drop-down lists can depend on other properties. For example, the state list could depend on the selected country. The dependencies are declared with the `depends` parameter in the property definition. The next example defines two dynamic dropdown properties and the state list depends on the country:

    public function defineProperties()
    {
        return [
            'country' => [
                'title'       => 'Country',
                'type'        => 'dropdown',
                'default'     => 'us'
            ],
            'state' => [
                'title'       => 'State',
                'type'        => 'dropdown',
                'default'     => 'dc',
                'depends'     => ['country'],
                'placeholder' => 'Select a state'
            ]
        ];
    }

In order to load the state list you should know what country is currently selected in the Inspector. The Inspector POSTs all property values to the `getPropertyOptions()` handler, so you can do the following:

    public function getStateOptions()
    {
        $countryCode = Request::input('country'); // Load the country property value from POST

        $states = [
            'ca' => ['ab'=>'Alberta', 'bc'=>'British columbia'],
            'us' => ['al'=>'Alabama', 'ak'=>'Alaska']
        ];

        return $states[$countryCode];
    }

<a name="page-list-properties"></a>
### Page list properties

Sometimes components need to create links to the website pages. For example, the blog post list contains links to the blog post details page. In this case the component should know the post details page file name (then it can use the [page Twig filter](../cms/markup#page-filter)). October includes a helper for creating dynamic dropdown page lists. The next example defines the postPage property which displays a list of pages:

    public function defineProperties()
    {
            return [
                'postPage' => [
                    'title' => 'Post page',
                    'type' => 'dropdown',
                    'default' => 'blog/post'
                ]
            ];
    }

    public function getPostPageOptions()
    {
        return Page::sortBy('baseFileName')->lists('baseFileName', 'baseFileName');
    }

<a name="routing-parameters"></a>
## Routing parameters

Components can directly access routing parameter values defined the [URL of the page](../cms/pages#url-syntax).

    // Returns the URL segment value, eg: /page/:post_id
    $postId = $this->param('post_id');

In some cases a [component property](#component-properties) may act as a hard coded value or reference the value from the URL.

This hard coded example shows the blog post with an identifier `2` being used:

    url = "/blog/hard-coded-page"

    [blogPost]
    id = "2"

Alternatively the value can be referenced dynamically from the page URL using an [external property value](../cms/components#external-property-values):

    url = "/blog/:my_custom_parameter"

    [blogPost]
    id = "{{ :my_custom_parameter }}"

In both cases the value can be retrieved by using the `property()` method:

    $this->property('id');

If you need to access the routing parameter name:

    $this->paramName('id'); // Returns "my_custom_parameter"

<a name="page-cycle"></a>
## Handling the page execution cycle

Components can be involved in the Page execution cycle events by overriding the `onRun()` method in the component class. The CMS controller executes this method every time when the page or layout loads. Inside the method you can inject variables to the Twig environment through the `page` property:

    public function onRun()
    {
        // This code will be executed when the page or layout is
        // loaded and the component is attached to it.

        $this->page['var'] = 'value'; // Inject some variable to the page
    }

<a name="page-cycle-handlers"></a>
### Page execution life cycle handlers

When a page loads, October executes handler functions that could be defined in the layout and page [PHP section](../cms/themes#php-section) and component classes. The sequence the handlers are executed is following:

1. Layout `onInit()` function.
1. Page `onInit()` function.
1. Layout `onStart()` function.
1. Layout components `onRun()` method.
1. Layout `onBeforePageStart()` function.
1. Page `onStart()` function.
1. Page components `onRun()` method.
1. Page `onEnd()` function.
1. Layout `onEnd()` function.

<a name="page-cycle-init"></a>
### Component initialization

Sometimes you may wish to execute code at the time the component class is first instantiated. You may override the `init` method in the component class to handle any initialization logic, this will execute before AJAX handlers and before the page execution life cycle. For example, this method can be used for attaching another component to the page dynamically.

    public function init()
    {
        $this->addComponent('Acme\Blog\Components\BlogPosts', 'blogPosts');
    }

<a name="page-cycle-response"></a>
### Halting with a response

Like all methods in the [page execution life cycle](../cms/layouts#layout-life-cycle), if the `onRun()` method in a component returns a value, this will stop the cycle at this point and return the response to the browser. Here we return an access denied message using the `Response` facade:

    public function onRun()
    {
        if (true) {
            return Response::make('Access denied!', 403);
        }
    }

<a name="ajax-handlers"></a>
## AJAX handlers

Components can host AJAX event handlers. They are defined in the component class exactly like they can be defined in the [page or layout code](../ajax/handlers). An example AJAX handler method defined in a component class:

    public function onAddItem()
    {
        $value1 = post('value1');
        $value2 = post('value2');
        $this->page['result'] = $value1 + $value2;
    }

If the alias for this component was *demoTodo* this handler can be accessed by `demoTodo::onAddItems`. Please see the [Calling AJAX handlers defined in components](../ajax/handlers#calling-handlers) article for details about using AJAX with components.

<a name="default-markup"></a>
## Default markup

All components can come with default markup that is used when including it on a page with the `{% component %}` tag, although this is optional. Default markup is kept inside the **component partials directory**, which has the same name as the component class in lower case.

The default component markup should be placed in a file named **default.htm**. For example, the default markup for the Demo ToDo component is defined in the file **/plugins/october/demo/components/todo/default.htm**. It can then be inserted anywhere on the page by using the `{% component %}` tag:

    url = "/todo"

    [demoTodo]
    ==
    {% component 'demoTodo' %}

The default markup can also take parameters that override the [component properties](#component-properties) at the time they are rendered.

    {% component 'demoTodo' maxItems="7" %}

These properties will not be available in the `onRun()` method since they are established after the page cycle has completed. Instead they can be processed by overriding the `onRender()` method in the component class. The CMS controller executes this method before the default markup is rendered.

    public function onRender()
    {
        // This code will be executed before the default component
        // markup is rendered on the page or layout.

        $this->page['var'] = 'Maximum items allowed: ' . $this->property('maxItems');
    }

<a name="component-partials"></a>
## Component partials

In addition to the default markup, components can also offer additional partials that can be used on the front-end or within the default markup itself. If the Demo ToDo component had a **pagination** partial, it would be located in **/plugins/october/demo/components/todo/pagination.htm** and displayed on the page using:

    {% partial 'demoTodo::pagination' %}

A relaxed method can be used that is contextual. If called inside a component partial, it will directly refer to itself. If called inside a theme partial, it will scan all components used on the page/layout for a matching partial name and use that.

    {% partial '@pagination' %}

Multiple components can share partials by placing the partial file in a directory called **components/partials**. The partials found in this directory are used as a fallback when the usual component partial cannot be found. For example, a shared partial located in **/plugins/acme/blog/components/partials/shared.htm** can be displayed on the page by any component using:

    {% partial '@shared' %}

<a name="referencing-self"></a>
### Referencing "self"

Components can reference themselves inside their partials by using the `__SELF__` variable. By default it will return the component's short name or [alias](../cms/components#aliases).

    <form data-request="{{__SELF__}}::onEventHandler">
        [...]
    </form>

Components can also reference their own properties.

    {% for item in __SELF__.items() %}
        {{ item }}
    {% endfor %}

If inside a component partial you need to render another component partial concatenate the `__SELF__` variable with the partial name:

    {% partial __SELF__~"::screenshot-list" %}

<a name="unique-identifier"></a>
### Unique identifier

If an identical component is called twice on the same page, an `id` property can be used to reference each instance.

    {{__SELF__.id}}

The ID is unique each time the component is displayed.

    <!-- ID: demoTodo527c532e9161b -->
    {% component 'demoTodo' %}

    <!-- ID: demoTodo527c532ec4c33 -->
    {% component 'demoTodo' %}

<a name="render-partial-method"></a>
## Rendering partials from code

You may programmatically render component partials inside the PHP code using the `renderPartial` method. This will check the component for the partial named `component-partial.htm` and return the result as a string. The second parameter is used for passing view variables.

    $content = $this->renderPartial('component-partial.htm');

    $content = $this->renderPartial('component-partial.htm', [
        'name' => 'John Smith'
    ]);

For example, to render a partial as a response to an [AJAX handler](../ajax/handlers):

    function onGetTemplate()
    {
        return ['#someDiv' => $this->renderPartial('component-partial.htm')];
    }

Another example could be overriding the entire page view response by returning a value from the `onRun` [page cycle method](#page-cycle). This code will specifically return an XML response using the `Response` facade:

    public function onRun()
    {
        $content = $this->renderPartial('default.htm');
        return Response::make($content)->header('Content-Type', 'text/xml');
    }

<a name="component-assets"></a>
## Injecting page assets with components

Components can inject assets (CSS and JavaScript files) to pages or layouts they're attached to. Use the controller's `addCss()` and `addJs()` methods to add assets to the CMS controllers. It could be done in the component's `onRun()` method. Please read more details about [injecting assets in the Pages article](../cms/page#injecting-assets). Example:

    public function onRun()
    {
        $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js');
    }

If the path specified in the `addCss()` and `addJs()` method argument begins with a slash (/) then it will be relative to the website root. If the asset path does not begin with a slash then it is relative to the component directory.
