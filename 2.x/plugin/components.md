# Building Components

Components files and directories reside in the **/components** subdirectory of a plugin directory. Each component has a PHP file defining the component class and an optional component partials directory. The component partials directory name matches the component class name written in lowercase. An example of a component directory structure:

```
plugins/
    acme/
    myplugin/
        components/
        componentname/       <=== Component partials directory
            default.htm        <=== Component default markup (optional)
        ComponentName.php    <=== Component class file
        Plugin.php
```

Components must be [registered in the Plugin registration class](#component-registration) with the `registerComponents` method.

## Component Class Definition

The **component class file** defines the component functionality and [component properties](#component-properties). The component class file name should match the component class name. Component classes should extend the `\Cms\Classes\ComponentBase` class. The component from the next example should be defined in the plugins/acme/blog/components/BlogPosts.php file.

```php
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
```

The `componentDetails` method is required. The method should return an array with two keys: `name` and `description`. The name and description are display in the CMS back-end user interface.

When this [component is attached to a page or layout](../cms/components), the class properties and methods become available on the page through the component variable, which name matches the component short name or the alias. For example, if the BlogPost component from the previous example was defined on a page with its short name:

```ini
url = "/blog"

[blogPosts]
==
```

You would be able to access its `posts` method through the `blogPosts` variable. Note that Twig supports the property notation for methods, so that you don't need to use brackets.

```twig
{% for post in blogPosts.posts %}
    {{ post }}
{% endfor %}
```

### Component Registration

Components must be registered by overriding the `registerComponents` method inside the [Plugin registration class](registration#registration-file). This tells the CMS about the Component and provides a **short name** for using it. An example of registering a component:

```php
public function registerComponents()
{
    return [
        \October\Demo\Components\Todo::class => 'demoTodo'
    ];
}
```

This will register the Todo component class with the default alias name **demoTodo**. More information on using components can be found at the [CMS components article](../cms/components).

## Component Properties

When you add a component to a page or layout you can configure it using properties. The properties are defined with the `defineProperties` method of the component class. The next example shows how to define a component property:

```php
public function defineProperties()
{
    return [
        'maxItems' => [
            'title' => 'Max items',
            'description' => 'The most amount of todo items allowed',
            'default' => 10,
            'type' => 'string',
            'validationPattern' => '^[0-9]+$',
            'validationMessage' => 'The Max Items property can contain only numeric symbols'
        ]
    ];
}
```

The method should return an array with the property keys as indexes and property parameters as values. The property keys are used for accessing the component property values inside the component class. The property parameters are defined with an array with the following keys:

Key | Description
------------- | -------------
**title** | required, the property title, it is used by the component Inspector in the CMS back-end.
**description** | required, the property description, it is used by the component Inspector in the CMS back-end.
**default** | optional, the default property value to use when the component is added to a page or layout in the CMS back-end.
**type** | optional, specifies the property type. The type defines the way how the property is displayed in the Inspector. Currently supported types are **string**, **checkbox**, **dropdown** and **set**. Default value: **string**.
**validationPattern** | optional Regular Expression to use when a user enters the property value in the Inspector. The validation can be used only with **string** properties.
**validationMessage** | optional error message to display if the validation fails.
**required** | optional, forces field to be filled. Uses validationMessage when left empty.
**placeholder** | optional placeholder for string and dropdown properties.
**options** | optional array of options for dropdown properties.
**depends** | an array of property names a dropdown property depends on. See the [dropdown properties](#dropdown-and-set-properties) below.
**group** | an optional group name. Groups create sections in the Inspector simplifying the user experience. Use a same group name in multiple properties to combine them.
**showExternalParam** | specifies visibility of the External Parameter editor for the property in the Inspector. Default value: **true**.

Inside the component you can read the property value with the `property` method:

```php
$this->property('maxItems');
```

If the property value is not defined, you can supply the default value as a second parameter of the `property` method:

```php
$this->property('maxItems', 6);
```

You can also load all the properties as array:

```php
$properties = $this->getProperties();
```

To access the property from the Twig partials for the component, utilize the `__SELF__` variable which refers to the Component object:

```twig
{{ __SELF__.property('maxItems') }}
```

### Dropdown and Set Properties

The option list for dropdown and set properties can be static or dynamic. Static options are defined with the `options` element of the property definition. Example:

```php
public function defineProperties()
{
    return [
        'units' => [
            'title' => 'Units',
            'type' => 'dropdown',
            'default' => 'imperial',
            'placeholder' => 'Select units',
            'options' => ['metric' => 'Metric', 'imperial' => 'Imperial']
        ]
    ];
}
```

The list of options could be fetched dynamically from the server when the Inspector is displayed. If the `options` parameter is omitted in a dropdown or set property definition the option list is considered dynamic. The component class must define a method returning the option list. The method should have a name in the following format: `get*Property*Options`, where **Property** is the property name, for example: `getCountryOptions`. The method returns an array of options with the option values as keys and option labels as values. Example of a dynamic dropdown list definition:

```php
public function defineProperties()
{
    return [
        'country' => [
            'title' => 'Country',
            'type' => 'dropdown',
            'default' => 'us'
        ]
    ];
}

public function getCountryOptions()
{
    return ['us' => 'United states', 'ca' => 'Canada'];
}
```

Dynamic dropdown and set lists can depend on other properties. For example, the state list could depend on the selected country. The dependencies are declared with the `depends` parameter in the property definition. The next example defines two dynamic dropdown properties and the state list depends on the country:

```php
public function defineProperties()
{
    return [
        'country' => [
            'title' => 'Country',
            'type' => 'dropdown',
            'default' => 'us'
        ],
        'state' => [
            'title' => 'State',
            'type' => 'dropdown',
            'default' => 'dc',
            'depends' => ['country'],
            'placeholder' => 'Select a state'
        ]
    ];
}
```

In order to load the state list you should know what country is currently selected in the Inspector. The Inspector POSTs all property values to the `getPropertyOptions` handler, so you can do the following:

```php
public function getStateOptions()
{
    // Load the country property value from POST
    $countryCode = post('country');

    $states = [
        'ca' => ['ab' => 'Alberta', 'bc' => 'British columbia'],
        'us' => ['al' => 'Alabama', 'ak' => 'Alaska']
    ];

    return $states[$countryCode];
}
```

### Page list Properties

Sometimes components need to create links to the website pages. For example, the blog post list contains links to the blog post details page. In this case the component should know the post details page file name (then it can use the [page Twig filter](../cms/markup#page-filter)). October includes a helper for creating dynamic dropdown page lists. The next example defines the postPage property which displays a list of pages:

```php
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
```

## Routing Parameters

Components can directly access routing parameter values defined in the [URL of the page](../cms/pages#url-syntax).

```php
// Returns the URL segment value, eg: /page/:post_id
$postId = $this->param('post_id');
```

In some cases a [component property](#component-properties) may act as a hard coded value or reference the value from the URL.

This hard coded example shows the blog post with an identifier `2` being used:

```ini
url = "/blog/hard-coded-page"

[blogPost]
id = "2"
```

Alternatively the value can be referenced dynamically from the page URL using an [external property value](../cms/components#using-external-property-values):

```ini
url = "/blog/:my_custom_parameter"

[blogPost]
id = "{{ :my_custom_parameter }}"
```

In both cases the value can be retrieved by using the `property` method:

```php
$this->property('id');
```

If you need to access the routing parameter name:

```php
// Returns "my_custom_parameter"
$this->paramName('id');
```

## Handling the Page Execution Cycle

Components can be involved in the Page execution cycle events by overriding the `onRun` method in the component class. The CMS controller executes this method every time when the page or layout loads. Inside the method you can inject variables to the Twig environment through the `page` property:

```php
public function onRun()
{
    // This code will be executed when the page or layout is
    // loaded and the component is attached to it.

    $this->page['var'] = 'value'; // Inject some variable to the page
}
```

### Page Execution Life Cycle Handlers

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

### Component Initialization

Sometimes you may wish to execute code at the time the component class is first instantiated. You may override the `init` method in the component class to handle any initialization logic, this will execute before AJAX handlers and before the page execution life cycle. For example, this method can be used for attaching another component to the page dynamically.

```php
public function init()
{
    $this->addComponent(\Acme\Blog\Components\BlogPosts::class, 'blogPosts');
}
```

### Halting With a Response

Like all methods in the [page execution life cycle](../cms/layouts#layout-execution-life-cycle), if the `onRun` method in a component returns a value, this will stop the cycle at this point and return the response to the browser. Here we return an access denied message using the `Response` facade:

```php
public function onRun()
{
    if (true) {
        return Response::make('Access denied!', 403);
    }
}
```

You can also return a 404 response from the `onRun` method:

```php
public function onRun()
{
    if (true) {
        $this->setStatusCode(404);
        return $this->controller->run('404');
    }
}
```

## AJAX Handlers

Components can host AJAX event handlers. They are defined in the component class exactly like they can be defined in the [page or layout code](../ajax/handlers). An example AJAX handler method defined in a component class:

```php
public function onAddItem()
{
    $value1 = post('value1');
    $value2 = post('value2');
    $this->page['result'] = $value1 + $value2;
}
```

If the alias for this component was *demoTodo* this handler can be accessed by `demoTodo::onAddItem`. Please see the [Calling AJAX handlers defined in components](../ajax/handlers#calling-a-handler) article for details about using AJAX with components.

## Default Markup

All components can come with default markup that is used when including it on a page with the `{% component %}` tag, although this is optional. Default markup is kept inside the **component partials directory**, which has the same name as the component class in lower case.

The default component markup should be placed in a file named **default.htm**. For example, the default markup for the Demo ToDo component is defined in the file **/plugins/october/demo/components/todo/default.htm**. It can then be inserted anywhere on the page by using the `{% component %}` tag:

```
url = "/todo"

[demoTodo]
==
{% component 'demoTodo' %}
```

The default markup can also take parameters that override the [component properties](#component-properties) at the time they are rendered.

```twig
{% component 'demoTodo' maxItems="7" %}
```

These properties will not be available in the `onRun` method since they are established after the page cycle has completed. Instead they can be processed by overriding the `onRender` method in the component class. The CMS controller executes this method before the default markup is rendered.

```php
public function onRender()
{
    // This code will be executed before the default component
    // markup is rendered on the page or layout.

    $this->page['var'] = 'Maximum items allowed: ' . $this->property('maxItems');
}
```

## Component Partials

In addition to the default markup, components can also offer additional partials that can be used on the front-end or within the default markup itself. If the Demo ToDo component had a **pagination** partial, it would be located in **/plugins/october/demo/components/todo/pagination.htm** and displayed on the page using:

```twig
{% partial 'demoTodo::pagination' %}
```

A relaxed method can be used that is contextual. If called inside a component partial, it will directly refer to itself. If called inside a theme partial, it will scan all components used on the page/layout for a matching partial name and use that.

```twig
{% partial '@pagination' %}
```

Multiple components can share partials by placing the partial file in a directory called **components/partials**. The partials found in this directory are used as a fallback when the usual component partial cannot be found. For example, a shared partial located in **/plugins/acme/blog/components/partials/shared.htm** can be displayed on the page by any component using:

```twig
{% partial '@shared' %}
```

### Referencing "self"

Components can reference themselves inside their partials by using the `__SELF__` variable. By default it will return the component's short name or [alias](../cms/components#components-aliases).

```twig
<form data-request="{{__SELF__}}::onEventHandler">
    [...]
</form>
```

Components can also reference their own properties.

```twig
{% for item in __SELF__.items() %}
    {{ item }}
{% endfor %}
```

If inside a component partial you need to render another component partial concatenate the `__SELF__` variable with the partial name:

```twig
{% partial __SELF__~"::screenshot-list" %}
```

### Unique Identifier

If an identical component is called twice on the same page, an `id` property can be used to reference each instance.

```twig
{{__SELF__.id}}
```

The ID is unique each time the component is displayed.

```twig
<!-- ID: demoTodo527c532e9161b -->
{% component 'demoTodo' %}

<!-- ID: demoTodo527c532ec4c33 -->
{% component 'demoTodo' %}
```

## Rendering Partials from Code

You may programmatically render component partials inside the PHP code using the `renderPartial` method. This will check the component for the partial named `component-partial.htm` and return the result as a string. The second parameter is used for passing view variables. The same [path resolution logic](#component-partials) applies when you render a component partial in PHP as it does with Twig; use the `@` prefix to refer to partials within the component itself.

```php
$content = $this->renderPartial('@component-partial.htm');

$content = $this->renderPartial('@component-partial.htm', [
    'name' => 'John Smith'
]);
```

For example, to render a partial as a response to an [AJAX handler](../ajax/handlers):

```php
function onGetTemplate()
{
    return ['#someDiv' => $this->renderPartial('@component-partial.htm')];
}
```

Another example could be overriding the entire page view response by returning a value from the `onRun` [page cycle method](#handling-the-page-execution-cycle). This code will specifically return an XML response using the `Response` facade:

```php
public function onRun()
{
    $content = $this->renderPartial('@default.htm');
    return Response::make($content)->header('Content-Type', 'text/xml');
}
```

## Injecting Page Assets with Components

Components can inject assets (CSS and JavaScript files) to pages or layouts they're attached to. Use the controller's `addCss` and `addJs` methods to add assets to the CMS controllers. It could be done in the component's `onRun` method. Please read more details about [injecting assets in the Pages article](../cms/page#injecting-page-assets-programmatically). Example:

```php
public function onRun()
{
    $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js');
}
```

If the path specified in the `addCss` and `addJs` method argument begins with a slash (/) then it will be relative to the website root. If the asset path does not begin with a slash then it is relative to the component directory.

The `addCss` and `addJs` methods provide a second argument that defines the attributes of your injected asset as an array. A special attribute - `build` - is available, that will suffix your injected assets with the current version of the plugin specified. This can be used to refresh cached assets when a plugin is upgraded.

```php
public function onRun()
{
    $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js', [
        'build' => 'Acme.Test',
        'defer' => true
    ]);
}
```

You may also use a string as the second argument, which then defaults to using the string value as the `build`.

```php
public function onRun()
{
    $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js', 'Acme.Test');
}
```
