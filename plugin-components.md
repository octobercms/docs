# Component Development

- [Introduction](#introduction)
- [Defining properties](#define-properties)
- [Page events](#page-events)
- [AJAX events](#ajax-events)



<a name="introduction"></a>
## Introduction

Components reside in the **/components** directory inside a Plugin. An example of a component directory structure:

    plugins/
      acme/
        myplugin/
          components/
            componentname/      <=== Component partials directory
              default.htm       <=== Component default markup (optional)
            ComponentName.php   <=== Component class file
          Plugin.php

Components must be registered in the [Plugin registration file](http://octobercms.com/docs/plugin/registration#component-registration).

#### Class definition

The *Component class file* defines the functionality that is added to the page when it is attached and what properties can be used. In this example of a component class, the file would be named **Todo.php** and located in the **/plugins/october/demo/components** directory:

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

When this component is attached to a page or layout, the class properties and methods become available.
If we attach with an alias of **blog**:

    {% foreach post in blog.posts %}
        {{ post }}
    {% endforeach %}

> **Note:** The above tag  `{% demoTodo.items %}` resolves to the `items()` method in the Component class.
This means that you could fetch items from the database in order to populate the items property.
It also means the item list is created on demand and if it's not requested on the page, nothing is fetched from the database.

More information on using components can be found at the [Using Components article](http://octobercms.com/docs/cms/components).



<a name="define-properties"></a>
## Defining properties

Components can be configured using properties which are set when attaching them to a page or layout. For example:

    public function defineProperties()
    {
        return [
            'maxItems' => [
                 'title'             => 'Max items',
                 'description'       => 'The most amount of todo items allowed',
                 'default'           => 10,
                 'type'              => 'string',
                 'validationPattern' => '^[a-zA-Z]*$', // Optional
                 'validationMessage' => 'The Max Items property can contain only Latin symbols'
            ]
        ];
    }

This defines the properties accepted by this component.

##### Retrieving a property value

    $this->property('maxItems');

##### Retrieving a property value if the value is absent

    $this->property('maxItems', 6);

##### Getting all property values

    $this->getProperties();


<a name="page-events"></a>
## Page events

Components can be involved in the Page execution cycle events by overriding the `onRun` method in the component class.

    public function onRun()
    {
        // This code will be executed when the page or layout is
        // loaded and the component is attached to it.

        $this->page['var'] = 'value'; // Inject some variable to the page
    }



<a name="ajax-events"></a>
## AJAX events

Components can host AJAX event handlers. They are defined in the component class exactly like they can be defined in the page or layout code. An example AJAX handler:

    public function onAddItem()
    {
        $value1 = post('value1');
        $value2 = post('value2');
        $this->page['result'] = $value1 + $value2;
    }

If the alias for this component was *demoTodo* this handler can be accessed by `demoTodo::onAddItems`.
