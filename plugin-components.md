# Component Development

- [Introduction](#introduction)

<a name="introduction"></a>
## Introduction

Components reside in the **/components** directory inside a Plugin. An example of a component directory structure:

  /plugins
    /author
      /myplugin
        /components
          /componentname        <=== Component partials directory
            default.htm         <=== Component default markup (optional)
          ComponentName.php     <=== Component class file
        Plugin.php

Components must be registered in the [Plugin registration file](http://octobercms.com/docs/plugin/registration#component-registration).

#### Creating a component

The *Component class file* defines the functionality that is added to the page when it is attached and what properties can be used. In this example of a component class, the file would be named **Todo.php** and located in the **/plugins/october/demo/components** directory:

```php
class Todo extends Cms\Classes\ComponentBase
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

##### Retrieving a property value

```php
$this->property('max-items');
```

##### Retrieving a property value if the value is absent

```php
$this->property('max-items', 6);
```

##### Getting all property values

```php
$this->getProperties();
```

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
