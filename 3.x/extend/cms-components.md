---
subtitle: Extending the CMS with custom components.
---
# Building CMS Components

Components files and directories reside in the **components** subdirectory of a plugin directory. Each component has a PHP file defining the component class and an optional component partials directory. The component partials directory name matches the component class name written in lowercase. An example of a component directory structure:

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `components`
|           |   ├── blogposts  _← Partials Directory_
|           |   |   └── default.htm  _← Default Markup (Optional)_
|           |   └── BlogPosts.php  _← Component Class_
|           └── Plugin.php
:::

Components must be [registered in the plugin registration file](../extend/extending.md) with the `registerComponents` method. Components can be configured using properties and their [inspector type definitions](../element/inspector-types.md).

## Component Class Definition

The `create:component` command creates a new component class and the default component view. The first argument specifies the author and plugin name. The second argument specifies the component class name.

```bash
php artisan create:component Acme.Blog BlogPosts
```

The component class file defines the component functionality and component properties. The component class file name should match the component class name. Component classes should extend the `Cms\Classes\ComponentBase` class. The component from the next example should be defined in the **plugins/acme/blog/components/BlogPosts.php** file.

```php
namespace Acme\Blog\Components;

class BlogPosts extends \Cms\Classes\ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'Blog Posts',
            'description' => 'Displays a collection of blog posts.',
            'icon' => 'icon-puzzle-piece'
        ];
    }

    /**
     * posts becomes available on the page as {{ component.posts }}
     */
    public function posts()
    {
        return ['First Post', 'Second Post', 'Third Post'];
    }
}
```

The `componentDetails` method is required. The method should return an array with two keys: `name` and `description`. The name and description are display in the CMS back-end user interface.

When this [component is attached to a page or layout](../cms/themes/components.md), the class properties and methods become available on the page through the component variable, which name matches the component short name or the alias. For example, if the BlogPost component from the previous example was defined on a page with its short name:

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

Components must be registered by overriding the `registerComponents` method inside the [plugin registration file](../extend/extending.md). This tells the CMS about the Component and provides a **short name** for using it. An example of registering a component:

```php
public function registerComponents()
{
    return [
        \October\Demo\Components\Todo::class => 'demoTodo'
    ];
}
```

This will register the Todo component class with the default alias name **demoTodo**. More information on using components can be found at the [CMS components article](../cms/themes/components.md).

## Component Properties

When you add a component to a page or layout you can configure it using properties. The properties are defined with the `defineProperties` method of the component class. The next example shows how to define a component property using a **string** inspector type.

```php
public function defineProperties()
{
    return [
        'maxItems' => [
            'title' => 'Max items',
            'description' => 'The most amount of todo items allowed',
            'default' => 10,
            'type' => 'string',
            'validation' => [
                'regex' => [
                    'message' => 'The Max Items property can contain only numeric symbols.',
                    'pattern' => '^[0-9]+$'
                ]
            ]
        ]
    ];
}
```

The method should return an array with the property keys as indexes and property parameters as values. The property keys are used for accessing the component property values inside the component class.

::: tip
The property parameters and available types are described in the [inspector types article](../element/inspector-types.md).
:::

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

## Routing Parameters

Components can directly access routing parameter values defined in the [URL of the page](../cms/themes/pages.md).

```php
// Returns the URL segment value, eg: /page/:post_id
$postId = $this->param('post_id');
```

In some cases a component property may act as a hard coded value or reference the value from the URL. This hard coded example shows the blog post with an identifier `2` being used:

```ini
url = "/blog/hard-coded-page"

[blogPost]
id = "2"
```

Alternatively the value can be referenced dynamically from the page URL using an [external property value in a component](../cms/themes/components.md).

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

When a page loads, October executes handler functions that could be defined in the layout and page PHP section and component classes. The sequence the handlers are executed is as follows.

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

Like all methods in the [Layout Execution Life Cycle](../cms/themes/layouts.md), if the `onRun` method in a component returns a value, this will stop the cycle at this point and return the response to the browser. Here we return an access denied message using the `Response` facade:

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

Components can host AJAX event handlers. They are defined in the component class exactly like they can be defined in the [page or layout code](../cms/ajax/handlers.md). An example AJAX handler method defined in a component class:

```php
public function onAddItem()
{
    $value1 = post('value1');
    $value2 = post('value2');
    $this->page['result'] = $value1 + $value2;
}
```

If the alias for this component was *demoTodo* this handler can be accessed by `demoTodo::onAddItem`. See the [AJAX handlers article](../cms/ajax/handlers.md) to learn about using AJAX with components.

## Default Markup

All components can come with default markup that is used when including it on a page with the `{% component %}` tag, although this is optional. Default markup is kept inside the **component partials directory**, which has the same name as the component class in lower case.

The default component markup should be placed in a file named **default.htm**. For example, the default markup for the Demo ToDo component is defined in the file **/plugins/october/demo/components/todo/default.htm**. It can then be inserted anywhere on the page by using the `{% component %}` tag:

::: cmstemplate
```ini
url = "/todo"

[demoTodo]
```
```twig
{% component 'demoTodo' %}
```
:::

The default markup can also take parameters that override the component properties at the time they are rendered.

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

Components can reference themselves inside their partials by using the `__SELF__` variable. By default it will return the [component's short name or alias](../cms/themes/components.md).

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

You may programmatically render component partials inside the PHP code using the `renderPartial` method. This will check the component for the partial named `component-partial.htm` and return the result as a string. The second parameter is used for passing view variables. The same path resolution logic applies when you render a component partial in PHP as it does with Twig; use the `@` prefix to refer to partials within the component itself.

```php
$content = $this->renderPartial('@component-partial.htm');

$content = $this->renderPartial('@component-partial.htm', [
    'name' => 'John Smith'
]);
```

For example, to render a partial as a response to an [AJAX handler](../cms/ajax/handlers.md):

```php
function onGetTemplate()
{
    return ['#someDiv' => $this->renderPartial('@component-partial.htm')];
}
```

Another example could be overriding the entire page view response by returning a value from the `onRun` page execution cycle. This code will specifically return an XML response using the `Response` facade:

```php
public function onRun()
{
    $content = $this->renderPartial('@default.htm');
    return Response::make($content)->header('Content-Type', 'text/xml');
}
```

## Injecting Page Assets with Components

Components can inject assets (CSS and JavaScript files) to pages or layouts they're attached to. Use the controller's `addCss` and `addJs` methods to add assets to the CMS controllers. It could be done in the component's `onRun` method.

```php
public function onRun()
{
    $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js');
}
```

If the path specified in the `addCss` and `addJs` method argument begins with a slash (`/`) then it will be relative to the website root. If the asset path does not begin with a slash then it is relative to the component directory.

The `addCss` and `addJs` methods provide a second argument that defines the attributes of your injected asset as an array.

```php
public function onRun()
{
    $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js', ['defer' => true]);
}
```

#### See Also

::: also
* [Inspector Types](../element/inspector-types.md)
:::
