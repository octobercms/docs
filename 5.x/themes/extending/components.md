---
previousPath: extend/cms-components.md
subtitle: Build a CMS component in a plugin to add your own PHP features to pages, layouts and partials.
---
# Building Components

A component is a PHP class in a plugin that adds a feature to any page, layout or partial. Build one when a theme needs data or behavior that Twig alone cannot provide, such as loading records, handling a form or responding to AJAX requests.

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

Once the component is registered as `blogPosts` and attached to a page, its methods are available through a variable of the same name.

::: cmstemplate
```ini
url = "/blog"

[blogPosts]
```
```twig
{% for post in blogPosts.posts %}
    {{ post }}
{% endfor %}
```
:::

Twig supports the property notation for methods, so you do not need brackets when calling `posts`.

## Creating a Component

The `create:component` command creates a new component class and its default markup. The first argument is the author and plugin name, and the second argument is the component class name.

```bash
php artisan create:component Acme.Blog BlogPosts
```

Components live in the **components** subdirectory of a plugin. Each component has a PHP class file and an optional partials directory, named after the class in lowercase.

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

The class file name matches the class name, and the class extends `Cms\Classes\ComponentBase`. The component in the example above belongs in the **plugins/acme/blog/components/BlogPosts.php** file.

### Describing the Component

The `componentDetails` method is required. It returns an array with a `name` and `description`, which are displayed in the admin panel. The array can also include the following optional keys.

Key | Description
------------- | -------------
**icon** | an icon for the component in the admin panel.
**ajaxPartial** | when `true`, wraps the [`{% component %}` tag](../../handbook/twig-tags/component.md) output in an [AJAX partial](../../handbook/twig-tags/ajax-partial.md) so it can be updated in place using `_self`.
**snippetAjax** | when `true`, renders the component as an AJAX partial when used as a [snippet](../snippets.md).
**snippetInline** | when `true`, inserts the component within a line of text when used as a [snippet](../snippets.md).

## Registering the Component

Register components by overriding the `registerComponents` method in the [plugin registration file](../../backend/plugins/introduction.md#registration-file). This tells the CMS about the component and gives it a **short name** for use on pages.

```php
public function registerComponents()
{
    return [
        \Acme\Blog\Components\BlogPosts::class => 'blogPosts'
    ];
}
```

This registers the `BlogPosts` class with the default alias **blogPosts**. See [Using Components](../components.md) to learn how to attach components to pages and layouts.

## Adding Properties

Properties let you configure a component each time you attach it to a page or layout. Define them with the `defineProperties` method. The following defines a property using the **string** [inspector type](../../handbook/inspector-types.md).

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

The method returns an array with the property keys as indexes and the property parameters as values. The [inspector types article](../../handbook/inspector-types.md) describes the available parameters and types.

### Reading Property Values

Use the `property` method to read a property value inside the component class.

```php
$this->property('maxItems');
```

Pass a second argument to supply a default value when the property is not defined.

```php
$this->property('maxItems', 6);
```

Use the `getProperties` method to load all the properties as an array.

```php
$properties = $this->getProperties();
```

To read a property in the component partials, use the `__SELF__` variable, which refers to the component object.

```twig
{{ __SELF__.property('maxItems') }}
```

## Reading URL Parameters

Components can read routing parameter values defined in the [URL of the page](../pages.md) using the `param` method.

```php
// Returns the URL segment value, eg: /page/:post_id
$postId = $this->param('post_id');
```

A component property can hold a hard coded value or reference a value from the URL. The following shows the blog post with the identifier `2`.

```ini
url = "/blog/hard-coded-page"

[blogPost]
id = "2"
```

The value can also come from the page URL using an [external property value](../components.md).

```ini
url = "/blog/:my_custom_parameter"

[blogPost]
id = "{{ :my_custom_parameter }}"
```

In both cases, read the value with the `property` method.

```php
$this->property('id');
```

Use the `paramName` method to find the name of the routing parameter.

```php
// Returns "my_custom_parameter"
$this->paramName('id');
```

## Running Code When the Page Loads

Override the `onRun` method to run code every time the page or layout loads. Inside the method, you can pass variables to Twig through the `page` property.

```php
public function onRun()
{
    // This code will be executed when the page or layout is
    // loaded and the component is attached to it.

    $this->page['var'] = 'value'; // Inject some variable to the page
}
```

### Understanding the Page Execution Life Cycle

When a page loads, October CMS runs the handler functions defined in the layout and page PHP sections and in component classes, in the following order.

1. Layout `onInit()` function.
1. Page `onInit()` function.
1. Layout `onStart()` function.
1. Layout components `onRun()` method.
1. Layout `onBeforePageStart()` function.
1. Page `onStart()` function.
1. Page components `onRun()` method.
1. Page `onEnd()` function.
1. Layout `onEnd()` function.

### Initializing the Component

Override the `init` method to run code when the component class is first created. This runs before AJAX handlers and before the page execution life cycle. For example, you can use it to attach another component to the page.

```php
public function init()
{
    $this->addComponent(\Acme\Blog\Components\BlogPosts::class, 'blogPosts');
}
```

### Halting With a Response

As with all methods in the [layout execution life cycle](../layouts.md), returning a value from the `onRun` method stops the cycle and sends that response to the browser. The following returns an access denied message using the `Response` facade.

```php
public function onRun()
{
    if (true) {
        return Response::make('Access denied!', 403);
    }
}
```

You can also return a 404 response from the `onRun` method.

```php
public function onRun()
{
    if (true) {
        $this->setStatusCode(404);
        return $this->controller->run('404');
    }
}
```

## Handling AJAX Requests

Components can host AJAX handlers, defined in the class in the same way as in the [page or layout code](../ajax/handlers.md).

```php
public function onAddItem()
{
    $value1 = post('value1');
    $value2 = post('value2');
    $this->page['result'] = $value1 + $value2;
}
```

If the component alias is **demoTodo**, the handler is called as `demoTodo::onAddItem`. See the [AJAX handlers article](../ajax/handlers.md) to learn more.

## Providing Default Markup

A component can include default markup that the `{% component %}` tag renders on the page. Place it in a file named **default.htm** in the component partials directory. For example, the default markup for the Demo ToDo component is in the **plugins/october/demo/components/todo/default.htm** file.

::: cmstemplate
```ini
url = "/todo"

[demoTodo]
```
```twig
{% component 'demoTodo' %}
```
:::

The tag can pass parameters that override the component properties when it renders.

```twig
{% component 'demoTodo' maxItems="7" %}
```

These values are not available in the `onRun` method, since they are set after the page cycle has completed. Override the `onRender` method to process them instead, which runs before the default markup is rendered.

```php
public function onRender()
{
    // This code will be executed before the default component
    // markup is rendered on the page or layout.

    $this->page['var'] = 'Maximum items allowed: ' . $this->property('maxItems');
}
```

## Using Component Partials

Components can offer more partials besides the default markup, for use on the page or inside the default markup. If the Demo ToDo component had a **pagination** partial, it would be in the **plugins/october/demo/components/todo/pagination.htm** file and rendered with the following.

```twig
{% partial 'demoTodo::pagination' %}
```

The `@` prefix finds the partial based on context. Inside a component partial, it refers to the same component. Inside a theme partial, it checks every component on the page or layout for a partial with that name.

```twig
{% partial '@pagination' %}
```

Components in the same plugin can share partials placed in the **components/partials** directory. These partials are used when the component's own partial cannot be found. For example, a shared partial in **plugins/acme/blog/components/partials/shared.htm** can be rendered by any of the plugin's components.

```twig
{% partial '@shared' %}
```

### Referencing the Component with `__SELF__`

Inside its partials, a component can refer to itself using the `__SELF__` variable, which returns the [component short name or alias](../components.md).

```twig
<form data-request="{{__SELF__}}::onEventHandler">
    [...]
</form>
```

The variable also gives access to the component methods.

```twig
{% for item in __SELF__.items() %}
    {{ item }}
{% endfor %}
```

To render another partial of the same component, join the `__SELF__` variable with the partial name.

```twig
{% partial __SELF__~"::screenshot-list" %}
```

### Telling Component Instances Apart

When the same component appears twice on a page, the `id` property identifies each instance.

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

## Rendering Partials in PHP

Use the `renderPartial` method to render a component partial in PHP. The following checks the component for a partial named **component-partial.htm** and returns the result as a string. The second argument passes variables to the partial. Partial paths resolve the same way as in Twig, so use the `@` prefix to refer to the component's own partials.

```php
$content = $this->renderPartial('@component-partial.htm');

$content = $this->renderPartial('@component-partial.htm', [
    'name' => 'John Smith'
]);
```

For example, you can render a partial as the response to an [AJAX handler](../ajax/handlers.md).

```php
function onGetTemplate()
{
    return ['#someDiv' => $this->renderPartial('@component-partial.htm')];
}
```

You can also replace the entire page response by returning a value from the `onRun` method. The following returns an XML response using the `Response` facade.

```php
public function onRun()
{
    $content = $this->renderPartial('@default.htm');
    return Response::make($content)->header('Content-Type', 'text/xml');
}
```

## Adding CSS and JavaScript to the Page

Components can add CSS and JavaScript files to the pages or layouts they are attached to. Call the `addCss` and `addJs` methods, usually from the `onRun` method. Paths are relative to the plugin directory, so the following adds the **plugins/acme/blog/assets/javascript/blog-controls.js** file for a component in the Acme.Blog plugin.

```php
public function onRun()
{
    $this->addJs('assets/javascript/blog-controls.js');
}
```

The second argument sets the attributes of the injected asset as an array.

```php
public function onRun()
{
    $this->addJs('assets/javascript/blog-controls.js', ['defer' => true]);
}
```

When the path begins with a slash (`/`), it is relative to the website root. Use this to give the full path to an asset, including assets outside the plugin.

```php
public function onRun()
{
    $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js');
}
```

#### See Also

::: also
* [Using Components](../components.md)
* [Inspector Types](../../handbook/inspector-types.md)
* [Extending with Plugins](./introduction.md)
:::
