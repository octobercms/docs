# Component Development

- [Component class definition](#component-class-definition)
- [Component properties](#component-properties)
- [Handling the page execution cycle](#page-cycle)
- [AJAX handlers](#ajax-handlers)
- [Default markup](#default-markup)
- [Component partials](#component-partials)

Components files and directories reside in the **/components** subdirectory of a plugin directory. Each component has a PHP file defining the component class and an optional component partials directory. The component partials directory name matches the component class name written in lowercase. An example of a component directory structure:

    plugins/
      acme/
        myplugin/
          components/
            componentname/      <=== Component partials directory
              default.htm       <=== Component default markup (optional)
            ComponentName.php   <=== Component class file
          Plugin.php

Components must be registered in the [Plugin registration file](registration#component-registration) with the `registerComponents()` method.

<a name="component-class-definition" class="anchor" href="#component-class-definition"></a>
## Component class definition

The **component class file** defines the component functionality and [component properties](#component-properties). The component class file name should match the component class name. Component classes should extend the `\Cms\Classes\ComponentBase` class. The component form the next example should be defined in the plugins/acme/blog/components/BlogPosts.php file.

    namespace Acme\Blog\Components;

    class BlogPosts extends Cms\Classes\ComponentBase
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
            return ['First Post', 'Second Post', 'Third Third'];
        }
    }

The `componentDetails()` method is required. The method should return an array with two keys: `name` and `description`. The name and description are display in the CMS back-end user interface.

When this [component is attached to a page or layout](../cms/components), the class properties and methods become available on the page through the component variable, which name matches the component short name or the alias. For example, if the BlogPost component from the previous example was defined on a page with its short name:

    url = "/blog"

    [blogPosts]
    ==

you would be able to access its `posts()` method through the `blogPosts` variable. Note that Twig supports the property notation for methods, so that you don't need to use brackets.

    {% foreach post in blog.posts %}
        {{ post }}
    {% endforeach %}

<a name="component-properties" class="anchor" href="#component-properties"></a>
## Component properties

When you add a component to a page or layout you can configure it using using properties. The properties are defined with the `defineProperties()` method of the component class. The next example shows how to define a component property:

    public function defineProperties()
    {
        return [
            'maxItems' => [
                 'title'             => 'Max items',
                 'description'       => 'The most amount of todo items allowed',
                 'default'           => 10,
                 'type'              => 'string',
                 'validationPattern' => '^[a-zA-Z]*$',
                 'validationMessage' => 'The Max Items property can contain only Latin symbols'
            ]
        ];
    }

The method should return an array with the property keys as indexes and property parameters as values. The property keys are used for accessing the component property values inside the component class. The property parameters are defined with an array with the following keys:

* **title** - required, the property title, it is used by the component Inspector in the CMS back-end.
* **description** - required, the property description, it is used by the component Inspector in the CMS back-end.
* **default** - optional, the default property value to use when the component is added to a page or layout in the CMS back-end.
* **type** - optional, the default value is **string**. Specifies the property type. The type defines the way how the property is displayed in the Inspector. Currently supported types are **string** and **checkbox**.
* **validationPattern** - optional Regular Expression to use when a user enters the property value in the Inspector. The validation can be used only with **string** properties.
* **validationMessage** - optional error message to display if the validation fails.

Inside the component you can read the property value with the `property()` method:

    $this->property('maxItems');

If the property value is not defined, you can supply the default value as a second parameter of the `property()` method:

    $this->property('maxItems', 6);

You can also load all the properties as array:

    $properties = $this->getProperties();

<a name="page-cycle" class="anchor" href="#page-cycle"></a>
## Handling the page execution cycle

Components can be involved in the Page execution cycle events by overriding the `onRun()` method in the component class. The CMS controller executes this method every time when the page or layout loads. Inside the method you can inject variables to the Twig environment through the `page` property:

    public function onRun()
    {
        // This code will be executed when the page or layout is
        // loaded and the component is attached to it.

        $this->page['var'] = 'value'; // Inject some variable to the page
    }

<a name="page-cycle-handlers" class="anchor" href="#page-cycle-handlers"></a>
### Page execution life cycle handlers

When a page loads, October executes handler functions that could be defined in the layout and page [PHP section](../cms/themes#php-section) and component classes. The sequence the handlers are executed is following:

* Layout `onStart()` function.
* Layout components `onRun()` method.
* Layout `onBeforePageStart()` function.
* Page `onStart()` function.
* Page components `onRun()` method.
* Page `onEnd()` function.
* Layout `onEnd()` function.

<a name="ajax-handlers" class="anchor" href="#ajax-handlers"></a>
## AJAX handlers

Components can host AJAX event handlers. They are defined in the component class exactly like they can be defined in the [page or layout code](../cms/ajax#ajax-handlers). An example AJAX handler method defined in a component class:

    public function onAddItem()
    {
        $value1 = post('value1');
        $value2 = post('value2');
        $this->page['result'] = $value1 + $value2;
    }

If the alias for this component was *demoTodo* this handler can be accessed by `demoTodo::onAddItems`. Please see the [Calling AJAX handlers defined in components](../cms/ajax#components-ajax-handlers) article for details about using AJAX with components.

<a name="default-markup" class="anchor" href="#default-markup"></a>
## Default markup

All components can come with default markup that is used when including it on a page with the `{% component %}` tag, although this is optional. Default markup is kept inside the **component partials directory**, which has the same name as the component class in lower case.

The default component markup should be placed in a file named **default.htm**. For example, the default markup for the Demo ToDo component is defined in the file **/plugins/october/demo/components/todo/default.htm**. It can then be inserted anywhere on the page by using the `{% component %}` tag:

    url = "/todo"

    [demoTodo]
    ==
    {% component 'demoTodo' %}

<a name="component-partials" class="anchor" href="#component-partials"></a>
## Component partials

In addition to the default markup, components can also offer additional partials that can be used on the front-end or within the default markup itself. If the Demo ToDo component had a **pagination** partial, it Would be located in **/plugins/october/demo/components/todo/pagination.htm** and displayed on the page using:

    {% partial 'demoTodo::pagination' %}

<a name="referencing-self" class="anchor" href="#referencing-self"></a>
### Referencing "self"

Components can reference themselves inside their partials by using the `__SELF__` variable. By default it will return the component's short name or [alias](../cms/components#aliases).

    <form data-request="{{__SELF__}}::onEventHandler">
        [...]
    </form>

Components can also reference their own properties.

    {% foreach item in __SELF__.items() %}
        {{ item }}
    {% endforeach %}

If inside a component partial you need to render another component partial concatenate the `__SELF__` variable with the partial name:

    {% partial __SELF__~"::screenshot-list" %}

<a name="unique-identifier" class="anchor" href="#unique-identifier"></a>
### Unique identifier

If an identical component is called twice on the same page, an `id` property can be used to reference each instance.

    {{__SELF__.id}}

The ID is unique each time the component is displayed.

    <!-- ID: demoTodo527c532e9161b -->
    {% component 'demoTodo' %}

    <!-- ID: demoTodo527c532ec4c33 -->
    {% component 'demoTodo' %}
