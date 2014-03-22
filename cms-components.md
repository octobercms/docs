# Using Components

- [Introduction](#introduction)
- [Component aliases](#aliases)
- [Default markup](#default-markup)

<a name="introduction"></a>
## Introduction

Components are building blocks that can be attached to any page or layout. They extend the behavior of front-end pages by:

- Injecting variables by participating in the page execution cycle
- Handling AJAX events triggered by the page
- Providing basic markup using partials

#### Using a component

Components can be attached to a page or layout by adding its name to the configuration section:

    [demoTodo]
    maxItems = 20

This initializes the component with the settings that are defined in the component section.
Also, this creates a page variable that matches the component name (`demoTodo` in this example).
Thus components can be used like this:

    {% component 'demoTodo' %}



<a name="aliases"></a>
## Components aliases

If there are two plugins which register components with a same name, you can attach a component by using its fully qualified class name and assigning it an *alias*:

    [October\Demo\Components\Todo demoTodoAlias]
    maxItems = 20

The first parameter in the section is the class name, the second is the component alias name that will be used when attached to the page.

You can also attach components of the same class by using the short name first and an alias second:

    [demoTodo todoA]
    maxItems = 10
    [demoTodo todoB]
    maxItems = 20

> If two components with the same name are assigned to a page and layout together, the page component overrides any properties of the layout component.



<a name="default-markup"></a>
## Default markup

All components can come with default markup that is used when including it on a page, although this is optional. Default markup is kept inside the *Component partials directory*, which has the same name as the component class in lower case.

The default markup should be placed in a file named **default.htm**, so continuing from our previous example, the markup for the *Todo* plugin would be located in the file **/plugins/october/demo/components/todo/default.htm**

It can then be inserted anywhere on the page by using the `{% component %}` tag:

    {% component 'demoTodo' %}

#### Component partials

In addition to the default markup, components can also offer additional partials that can be used on the front-end or within the default markup itself. If we had a *pagination* partial, it could be located in **/plugins/october/demo/components/todo/pagination.htm** and displayed on the page using:

    {% partial 'demoTodo::pagination' %}

#### Referencing "self"

Components can reference themselves inside their default markup or in any partials by using the `__SELF__` variable. By default it will return the component's alias.

    <form data-request="{{__SELF__}}::onEventHandler">
        [...]
    </form>

Components can also reference their own properties.

    {% foreach item in __SELF__.items() %}
        {{ item }}
    {% endforeach %}

#### Unique identifier

If an identical component is called twice on the same page, an `id` property can be used to reference each instance.

    {{__SELF__.id}}

The ID is unique each time the component is displayed.

    <!-- ID: demoTodo527c532e9161b -->
    {% component 'demoTodo' %}

    <!-- ID: demoTodo527c532ec4c33 -->
    {% component 'demoTodo' %}
