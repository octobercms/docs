# Using Components

- [Introduction](#introduction)
- [Component aliases](#aliases)

Components are configurable building elements that can be attached to any page or layout. Components is a key feature of October. Each component implements some functionality that extends your website. Components can output HTML markup on a page, but it is not necessary - other important features of components are handling [AJAX requests](ajax), handling form postbacks and handling the page execution cycle, that allows to inject variables to pages or implement the website security.

This article describes the components basics and doesn't explain how to use components with AJAX. This topic is described in the [AJAX](ajax) article.

<a name="introduction" class="anchor" href="#introduction"></a>
## Introduction

If you use the back-end user interface you can add components to your pages and layouts by clicking the component in the Components panel. If you use a text editor you can attach a component to a page or layout by adding its name to the [Configuration](themes#configuration-section) section of the template file. The next example demonstrates how to add a demo ToDo component to a page:

    title = "Components demonstration"
    url = "/components"

    [demoTodo]
    maxItems = 20
    ==
    ...

This initializes the component with the properties that are defined in the component section. Many components have properties, but it is not a requirement. Some properties are required, and some properties have default values. If you are not sure what properties are supported by a component, refer to the documentation provided by the developer, or use the Inspector in the October back-end. The Inspector opens when you click a component in the page or layout component panel.

When you refer a component, it automatically creates a page variable that matches the component name (`demoTodo` in the previous example example). Components that provide HTML markup can be rendered on a page with the `{% component %}` tag, like this:

    {% component 'demoTodo' %}

> **Note:** if two components with the same name are assigned to a page and layout together, the page component overrides any properties of the layout component.

<a name="aliases" class="anchor" href="#aliases"></a>
## Components aliases

If there are two plugins which register components with a same name, you can attach a component by using its fully qualified class name and assigning it an *alias*:

    [October\Demo\Components\Todo demoTodoAlias]
    maxItems = 20

The first parameter in the section is the class name, the second is the component alias name that will be used when attached to the page. If you specified a component alias you should use it everywhere in the page code when you refer to the component. Note that the next example refers to the component alias:

    {% component 'demoTodoAlias' %}

The aliases also allow you to define multiple components of the same class on a same page by using the short name first and an alias second. This lets you to use multiple instances of a same component on a page.

    [demoTodo todoA]
    maxItems = 10
    [demoTodo todoB]
    maxItems = 20