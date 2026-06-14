---
subtitle: Configurable controllers that can be attached to any page, partial or layout.
---
# Components

Components are a key feature of building scalable and modern solutions with October CMS. Each component implements some functionality that extends your website. Components can output HTML markup on a page, but it is not necessary - other important features of components are [handling AJAX requests](../../ajax/introduction.md), handling form postbacks and handling the page execution cycle, that allows to inject variables to pages or implement the website security.

This article describes the components basics and doesn't explain how to use [components with AJAX](../../ajax/handlers.md), [developing components](../../extend/cms-components.md) as part of plugins, or the [components included](../components/section.md) with October CMS.

## Introduction

Components can be found in the Editor in the admin panel. You can add components to your pages, partials and layouts by clicking the Components toolbar button on any open document. If you use a text editor you can attach a component to a page or layout by adding its name to the configuration section of the template file. The next example demonstrates how to add a demo To-Do component to a page.

::: cmstemplate
```ini
title = "Components demonstration"
url = "/components"

[demoTodo]
maxItems = 20
```
```twig
<!-- HTML Content Here -->
```
:::

This initializes the component with the properties that are defined in the component section. Many components have properties, but it is not a requirement. Some properties are required, and some properties have default values. If you are not sure what properties are supported by a component, refer to the documentation provided by the developer, or use the Inspector in the Editor admin panel. The Inspector opens when you click a component in the page or layout component panel.

::: aside
If two components with the same name are assigned to a page and layout together, the page component will take priority.
:::

When you refer a component, it automatically creates a page variable that matches the component name (`demoTodo` in the previous example). Components provide two things to your page: **variables** (data) and **AJAX handlers** (server-side actions). You write your own markup using these directly.

```twig
{% for item in demoTodo.items %}
    <li>{{ item.title }}</li>
{% endfor %}

<button data-request="onAddItem">Add Item</button>
```

Components may also inject variables directly into the page scope. For example, a component might make a `posts` variable available that you can use without referencing the component name.

::: warning
Using components inside partials has limited functionality, this is described in more detail in the [Dynamic Partials section](./partials.md) of the documentation.
:::

## Components Aliases

If there are two plugins that register components with the same name, you can attach a component by using its fully qualified class name and assigning it an *alias*.

```ini
[October\Demo\Components\Todo demoTodoAlias]
maxItems = 20
```

The first parameter in the section is the class name, the second is the component alias name that will be used when attached to the page. If you specified a component alias you should use it everywhere in the page code when you refer to the component. Note that the next example refers to the component alias:

```twig
{% for item in demoTodoAlias.items %}
    {{ item.title }}
{% endfor %}
```

The aliases also allow you to define multiple components of the same class on a same page by using the short name first and an alias second. This lets you to use multiple instances of a same component on a page.

```ini
[demoTodo todoA]
maxItems = 10
[demoTodo todoB]
maxItems = 20
```

## Using External Property Values

By default property values are initialized in the Configuration section where the component is defined, and the property values are static, like this:

```ini
[demoTodo]
maxItems = 20
==
...
```

::: v-pre
However there is a way to initialize properties with values loaded from external parameters - URL parameters or [partial](partials.md) parameters (for components defined in partials). Use the `{{ paramName }}` syntax for values that should be loaded from partial variables:
:::

```ini
[demoTodo]
maxItems = {{ maxItems }}
==
...
```

Assuming that in the example above the component **demoTodo** is defined in a partial, it will be initialized with a value loaded from the **maxItems** partial variable:

```twig
{% partial 'my-todo-partial' maxItems='10' %}
```

You may use dot notation to retrieve a deeply nested value from an external parameter:

```ini
[demoTodo]
maxItems = {{ data.maxItems }}
==
...
```

::: v-pre
To load a property value from the URL parameter, use the `{{ :paramName }}` syntax, where the name starts with a colon (`:`), for example.
:::

```ini
[demoTodo]
maxItems = {{ :maxItems }}
==
...
```

The page that the component belongs to should have a corresponding [URL parameter](pages.md) defined.

```ini
url = "/todo/:maxItems"
```

In the October back-end you can use the Inspector tool for assigning external values to component properties. In the Inspector you don't need to use the curly brackets to enter the parameter name. Each field in the Inspector has an icon on the right side, which opens the external parameter name editor. Enter the parameter name as `paramName` for partial variables or `:paramName` for URL parameters.

## Passing Variables to Components

When using the `{% component %}` tag to render default markup, you can pass variables that override [component properties](../../extend/cms-components.md), similar to [partial variables](./partials.md).

In this example, the **maxItems** property of the component will be set to *7* at the time the component is rendered:

```twig
{% component 'demoTodoAlias' maxItems='7' %}
```

## Writing Your Own Markup

When you add a component to a page, it injects variables and provides AJAX handlers. You write your own HTML markup using these directly. There is no need to use a `{% component %}` tag or follow the component's internal partial structure.

For example, if a **blogPosts** component injects a `posts` variable and provides an `onLoadMore` handler, you write your own markup from scratch:

::: cmstemplate
```ini
url = "/blog"

[blogPosts]
postsPerPage = 10
```
```twig
<div class="grid gap-6">
    {% for post in posts %}
        <article>
            <h2>
                <a href="{{ post.url }}">{{ post.title }}</a>
            </h2>
            <p>{{ post.excerpt }}</p>
        </article>
    {% endfor %}
</div>

<button data-request="onLoadMore">
    Load More
</button>
```
:::

This is the standard workflow for building themes: components handle the data and logic, you handle the presentation. You are free to structure your markup however you want, use any CSS framework, and organize your templates using [CMS partials](./partials.md).

### Using Default Markup as a Reference

Each component ships with a **default.htm** partial located in the plugin directory (e.g. `plugins/acme/blog/components/blogposts/default.htm`). This is a reference implementation that demonstrates what variables are available and how AJAX handlers are called. You can look at it to understand the component's API, then write your own markup.

::: aside
Inside default partials you may see references to `__SELF__`, this is a variable that refers to the component object. In your own markup, use the component alias directly (e.g. `blogPosts.property` instead of `__SELF__.property`).
:::

### Rendering Default Markup

For quick prototyping or to verify a component is working, you can render its default partial using the `{% component %}` tag:

```twig
{% component 'blogPosts' %}
```

This outputs the boilerplate markup shipped with the plugin. It is useful for testing but not intended for production themes, since the default markup uses generic styling and may not match your design.

### Overriding Component Partials

In rare cases, you may want to use a component's default markup but customize a specific partial within it. This is possible by creating a file in your theme that matches the component's partial structure.

For example, if a component called **channel** uses a **title.htm** partial internally, you can override just that partial by creating **partials/channel/title.htm** in your theme.

Segment | Description
------------- | -------------
**partials** | the theme partials directory
**channel** | the component alias (a partial subdirectory)
**title.htm** | the component partial to override

The partial subdirectory name matches the component alias. If you assign the component a different alias, the override directory changes accordingly.

::: cmstemplate
```ini
[channel foobar]
```
```twig
{% component "foobar" %}
```
:::

Now the override path becomes **partials/foobar/title.htm** instead.

::: aside
This feature is designed for edge cases where a component has a complex internal partial structure that you want to mostly keep but tweak one section. In most cases, writing your own markup directly is simpler and more flexible.
:::

## The "View Bag" Component

::: aside
The viewBag component is hidden in the backend panel and is only available for file-based editing. It can also be used by other plugins to store data.
:::

There is a special component included in October CMS called `viewBag` that can be used on any page or layout. It allows ad hoc properties to be defined and accessed inside the markup area easily as variables. A good usage example is defining an active menu item inside a page.

::: cmstemplate
```ini
title = "About"
url = "/about.html"
layout = "default"

[viewBag]
activeMenu = "about"
```
```twig
<p>Page content...</p>
```
:::

Any property defined for the component is then made available inside the page, layout, or partial markup using the `viewBag` variable. For example, in this layout the **active** class is added to the list item if the `viewBag.activeMenu` value is set to **about**.

::: cmstemplate
```ini
description = "Default layout"
```
```twig
...

<!-- Main navigation -->
<ul>
    <li class="{{ viewBag.activeMenu == 'about' ? 'active' }}">About</li>
    ...
</ul>
```
:::

### AJAX Handlers

Components introduce [AJAX handlers](../../ajax/introduction.md) that are available globally on the page. You call them using `data-request` in your markup.

```html
data-request="onMyComponentHandler"
```

If there is a naming conflict between handlers from different components, the fully qualified name can be used.

```html
data-request="componentName::onMyComponentHandler"
```

#### See Also

::: also
* [CMS Component Development](../../extend/cms-components.md)
:::
