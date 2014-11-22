==
==
# Using Components

- [Introduction](#introduction)
- [Component aliases](#aliases)
- [Overriding component partials](#overriding-partials)
- [Using external property values](#external-property-values)
- [Passing variables to components](#variables)
- [The "View Bag" component](#viewbag-component)

Components are configurable building elements that can be attached to any page, partial or layout. Components are key features of October. Each component implements some functionality that extends your website. Components can output HTML markup on a page, but it is not necessary - other important features of components are handling [AJAX requests](ajax), handling form postbacks and handling the page execution cycle, that allows to inject variables to pages or implement the website security.

This article describes the components basics and doesn't explain how to use components with AJAX. This topic is described in the [AJAX](ajax) article.

> **Note:** Using components inside partials has limited functionality, this is described in more detail in the [dynamic partials](partials#dynamic-partials) article.

<a name="introduction" class="anchor" href="#introduction"></a>
## Introduction

If you use the back-end user interface you can add components to your pages, partials and layouts by clicking the component in the Components panel. If you use a text editor you can attach a component to a page or layout by adding its name to the [Configuration](themes#configuration-section) section of the template file. The next example demonstrates how to add a demo To-do component to a page:

    title = "Components demonstration"
    url = "/components"

    [demoTodo]
    maxItems = 20
    ==
    ...

This initializes the component with the properties that are defined in the component section. Many components have properties, but it is not a requirement. Some properties are required, and some properties have default values. If you are not sure what properties are supported by a component, refer to the documentation provided by the developer, or use the Inspector in the October back-end. The Inspector opens when you click a component in the page or layout component panel.

When you refer a component, it automatically creates a page variable that matches the component name (`demoTodo` in the previous example). Components that provide HTML markup can be rendered on a page with the `{% component %}` tag, like this:

    {% component 'demoTodo' %}

> **Note:** If two components with the same name are assigned to a page and layout together, the page component overrides any properties of the layout component.

<a name="aliases" class="anchor" href="#aliases"></a>
## Components aliases

If there are two plugins that register components with the same name, you can attach a component by using its fully qualified class name and assigning it an *alias*:

    [October\Demo\Components\Todo demoTodoAlias]
    maxItems = 20

The first parameter in the section is the class name, the second is the component alias name that will be used when attached to the page. If you specified a component alias you should use it everywhere in the page code when you refer to the component. Note that the next example refers to the component alias:

    {% component 'demoTodoAlias' %}

The aliases also allow you to define multiple components of the same class on a same page by using the short name first and an alias second. This lets you to use multiple instances of a same component on a page.

    [demoTodo todoA]
    maxItems = 10
    [demoTodo todoB]
    maxItems = 20

<a name="overriding-partials" class="anchor" href="#overriding-partials"></a>
## Overriding component partials

All component partials can be overridden using the theme partials. If a component called **channel** uses the **title.htm** partial.

    url = "mypage"

    [channel]
    ==
    {% component "channel" %}

We can override the partial by creating a file in our theme called **partials/channel/title.htm**.

The file path segments are broken down like this:

Segment  | Description
------------- | -------------
**partials** | the theme partials directory
**channel** | the component alias (a partial subdirectory)
**title.htm** | the component partial to override

The partial subdirectory name can be customized to anything by simply assigning the component an alias of the same name. For example, by assigning the **channel** component with a different alias **foobar** the override directory is also changed:

    [channel foobar]
    ==
    {% component "foobar" %}

Now we can override the **title.htm** partial by creating a file in our theme called **partials/foobar/title.htm**.

<a name="external-property-values" class="anchor" href="#external-property-values"></a>
## Using external property values

By default property values are initialized in the Configuration section where the component is defined, and the property values are static, like this:

    [demoTodo]
    maxItems = 20
    ==
    ...

However there is a way to initialize properties with values loaded from external parameters - URL parameters or [partial](partials) parameters (for components defined in partials). Use the `{{ paramName }}` syntax for values that should be loaded from partial variables:

    [demoTodo]
    maxItems = {{ maxItems }}
    ==
    ...

Assuming that in the example above the component **demoTodo** is defined in a partial, it will be initialized with a value loaded from the **maxItems** partial variable:

    {% partial 'my-todo-partial' maxItems='10' %}

To load a property value from the URL parameter, use the `{{ :paramName }}` syntax, where the name starts with a colon (`:`), for example:

    [demoTodo]
    maxItems = {{ :maxItems }}
    ==
    ...

The page, the component belongs to, should have a corresponding [URL parameter](pages#url-syntax) defined:

    url = "/todo/:maxItems"

In the October back-end you can use the Inspector tool for assigning external values to component properties. In the Inspector you don't need to use the curly brackets to enter the parameter name. Each field in the Inspector has an icon on the right side, which opens the external parameter name editor. Enter the parameter name as `paramName` for partial variables or `:paramName` for URL parameters.

<a name="variables" class="anchor" href="#variables"></a>
## Passing variables to components

Components can be designed to use variables at the time they are rendered, similar to [Partial variables](partials#variables), they can be specified after the component name in the `{% component %}` tag. The specified variables will explicitly override the value of the [component properties](../plugin/components#component-properties), including [external property values](#external-property-values).

In this example, the **maxItems** property of the component will be set to *7* at the time the component is rendered:

    {% component 'demoTodoAlias' maxItems='7' %}

> **Note**: Not all components support passing variables when rendering.

<a name="viewbag-component" class="anchor" href="#viewbag-component"></a>
## The "View Bag" component

There is a special component included in October called `viewBag` that can be used on any page or layout. It allows ad hoc properties to be defined and accessed inside the markup area easily as variables. A good usage example is defining an active menu item inside a page:


    title = "About"
    url = "/about.html"
    layout = "default"

    [viewBag]
    activeMenu = "about"
    ==

    <p>Page content...</p>

Any property defined for the component is then made available inside the page, layout, or partial markup using the `viewBag` variable. For example, in this layout the **active** class is added to the list item if the `viewBag.activeMenu` value is set to **about**:

    description = "Default layout"
    ==
    [...]

    <!-- Main navigation -->
    <ul>
        <li class="{{ viewBag.activeMenu == 'about' ? 'active' }}">About</li>
        [...]
    </ul>

> **Note**: The viewBag component is hidden on the back-end and can only be used for file-based editing at this stage.
