Components are building blocks that can be attached to any page or layout. They extend the behavior of front-end pages by:

- Injecting variables by participating in the page execution cycle
- Handling AJAX events triggered by the page
- Providing basic markup using partials

Components reside in the **/components** directory inside a Plugin. An example of a component directory structure:

```
/plugins
  /author
    /myplugin
      /components
        /componentname        <=== Component partials directory
          default.htm         <=== Component default markup (optional)
        ComponentName.php     <=== Component class file
      Plugin.php
```

#### Creating a component

The *Component class file* defines the functionality that is added to the page when it is attached and what properties can be used. In this example of a component class, the file would be named **Todo.php** and located in the **/plugins/october/demo/components** directory:

```php
class Todo extends Modules\Cms\Classes\ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'Todo List',
            'description' => 'Implements a simple to-do list.'
        ];
    }

    // This array becomes available on the page as {{ component.items }}
    public function items()
    {
        return ['First Item', 'Second Item', 'Third Item'];
    }
}
```

#### Registering a component

Components must be registered in the [Plugin information file](plugins). This tells the CMS about the Component and provides a *short name* for using it. An example of registering a component:

```php
public function registerComponents()
{
    return [
        'Plugins\October\Demo\Components\Todo' => 'demoTodo'
    ];
}
```

This will register the Todo component class with the name *demoTodo*.

#### Component properties

Components can be configured using properties which are set when attaching them to a page or layout. For example:

```php
public function defineProperties()
{
    return [
        'max-items' => [
             'title' => 'Max items',
             'description' => 'The most amount of todo items allowed',
             'default' => 10,
             'type' => 'string',
             'validationPattern' => '^[a-zA-Z]*$', // Optional
             'validationMessage' => 'The Max Items property can contain only Latin symbols'
        ]
    ];
}
```

This defines the properties accepted by this component.

#### Component events

Components can be involved in the Page execution cycle events by overriding the `onRun` method in the component class.

```php
public function onRun()
{
    // This code will be executed when the page or layout is
    // loaded and the component is attached to it.

    $this->page['var'] = 'value'; // Inject some variable to the page
}
```

#### Components and AJAX

Components can host AJAX event handlers. They are defined in the component class exactly like they can be defined in the page or layout code. An example AJAX handler:

```php
public function onAddItem()
{
    $value1 = post('value1');
    $value2 = post('value2');
    $this->page['result'] = $value1 + $value2;
}
```

If the alias for this component was *demoTodo* this handler can be accessed by `demoTodo::onAddItems`.

---

### Using a component

Components can be attached to a page or layout by adding its name to the settings section:

```
[demoTodo]
max-items = 20
```

This initializes the component with the settings that are defined in the component section. Also, this creates a page variable that matches the component name (`demoTodo` in this example). Thus components can be used like this:

```
{% foreach item in demoTodo.items %}
  {{ item }}
{% endforeach %}
```

> Note that  `{% demoTodo.items %}` resolves to the `items()` method in the class above. This means that you could fetch items from the database in order to populate the items property. It also means the item list is created on demand and if it's not requested on the page, nothing is fetched from the database.

#### Component aliases

If there are two plugins which register components with a same name, you can attach a component by using its fully qualified class name and assigning it an *alias*:

```
[Plugins\October\Demo\Components\Todo demoTodoAlias]
max-items = 20
```

The first parameter in the section is the class name, the second is the component alias name that will be used when attached to the page.

You can also attach components of the same class by using the short name first and an alias second:

```
[demoTodo todoA]
max-items = 10
[demoTodo todoB]
max-items = 20
```

> If two components with the same name are assigned to a page and layout together, the page component overrides any properties of the layout component.

---

### Component views

All components can come with default markup that is used when including it on a page, although this is optional. Default markup is kept inside the *Component partials directory*, which has the same name as the component class in lower case.

The default markup should be placed in a file named **default.htm**, so continuing from our previous example, the markup for the *Todo* plugin would be located in the file **/plugins/october/demo/components/todo/default.htm**

It can then be inserted anywhere on the page by using the `{% component %}` tag:

```
{% component 'demoTodo' %}
```

#### Component partials

In addition to the default markup, components can also offer additional partials that can be used on the front-end or within the default markup itself. If we had a *pagination* partial, it could be located in **/plugins/october/demo/components/todo/pagination.htm** and displayed on the page using:

```
{% partial 'demoTodo::pagination' %}
```

#### Referencing "self"

Components can reference themselves inside their default markup or in any partials by using the Twig variable `__SELF__`. 

```
{% foreach item in __SELF__.items() %}
  {{ item }}
{% endforeach %}
```

Components can also explicitly reference their alias by calling the `alias` property attached to the `__SELF__` variable.

```
{{__SELF__.alias}}
```

#### Unique identifier

If an identical component is called twice on the same page, an `id` property attached to the  `__SELF__` variable can be used to reference each instance.

```
{{__SELF__.id}}
```

The ID is unique each time the component is displayed.

```
<!-- ID: demoTodo527c532e9161b -->
{% component 'demoTodo' %}

<!-- ID: demoTodo527c532ec4c33 -->
{% component 'demoTodo' %}
```
