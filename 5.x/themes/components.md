---
previousPath: cms/themes/components.md
subtitle: Add features to pages, layouts and partials with components, and write your own markup to display them.
---
# Using Components

A component adds a feature to your website, such as a list of blog posts or a contact form. You attach it to a page, layout or partial, and it gives you **variables** (data) to display and **AJAX handlers** (server-side actions) to call. You write the markup yourself.

::: cmstemplate
```ini
title = "Components demonstration"
url = "/components"

[demoTodo]
maxItems = 20
```
```twig
{% for item in demoTodo.items %}
    <li>{{ item.title }}</li>
{% endfor %}

<button data-request="onAddItem">Add Item</button>
```
:::

Components can also [handle AJAX requests](./ajax/introduction.md) and form postbacks, and take part in the page execution cycle, for example to inject variables or secure the page. This page covers using components in a theme. To build your own, see [Building Components](./extending/components.md). For the components that ship with October CMS, see [Tailor Components](../handbook/tailor-components.md) in the Handbook.

## Attaching a Component

In the Editor in the admin panel, open a page, partial or layout and click the **Components** toolbar button to add a component. In a text editor, add the component name as a section in the configuration section of the template, as shown in the example above.

The section initializes the component with the properties listed below it. Many components have properties, but they are not required. Some properties are required, and some have default values. To find the properties a component supports, read the developer's documentation or use the Inspector in the Editor. The Inspector opens when you click a component in the page or layout component panel.

::: aside
If a page and its layout attach components with the same name, the page component takes priority.
:::

::: warning
Components inside partials have limited functionality. See [Adding Logic to Partials](./partials.md#adding-logic-to-partials) for details.
:::

## Displaying Component Data

Attaching a component creates a page variable that matches the component name, `demoTodo` in the example above. Components may also inject variables directly into the page scope. For example, a **blogPosts** component might provide a `posts` variable and an `onLoadMore` handler, which you use directly in your own markup.

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

This is the standard way to build themes: components handle the data and logic, and you handle the presentation. You don't need the `{% component %}` tag or the component's internal partial structure. Structure your markup however you want, use any CSS framework, and organize your templates with [partials](./partials.md).

### Using Default Markup as a Reference

Each component ships with a **default.htm** partial in the plugin directory, for example `plugins/acme/blog/components/blogposts/default.htm`. This reference implementation shows which variables are available and how the AJAX handlers are called. Read it to learn the component's API, then write your own markup.

::: aside
Default partials may refer to `__SELF__`, a variable that holds the component object. In your own markup, use the component alias directly, for example `blogPosts.property` instead of `__SELF__.property`.
:::

### Rendering Default Markup

For quick prototyping, or to check that a component works, render its default partial with the `{% component %}` tag.

```twig
{% component 'blogPosts' %}
```

This outputs the boilerplate markup shipped with the plugin. It is useful for testing but not intended for production themes, since the default markup uses generic styling and may not match your design.

## Calling Component AJAX Handlers

Components provide [AJAX handlers](./ajax/introduction.md) that are available globally on the page. Call them with the `data-request` attribute in your markup.

```html
data-request="onMyComponentHandler"
```

If handlers from different components share a name, use the fully qualified name.

```html
data-request="componentName::onMyComponentHandler"
```

## Using Component Aliases

If two plugins register components with the same name, attach the component by its fully qualified class name and give it an *alias*.

```ini
[October\Demo\Components\Todo demoTodoAlias]
maxItems = 20
```

The first value in the section is the class name, and the second is the alias used on the page. When a component has an alias, use the alias everywhere in the page code.

```twig
{% for item in demoTodoAlias.items %}
    {{ item.title }}
{% endfor %}
```

Aliases also let you attach several instances of the same component to one page. Use the short name first and an alias second.

```ini
[demoTodo todoA]
maxItems = 10
[demoTodo todoB]
maxItems = 20
```

## Setting Properties from URL and Partial Variables

Property values set in the configuration section are static.

```ini
[demoTodo]
maxItems = 20
==
...
```

A property can instead load its value from a [partial](./partials.md) variable, for components defined in partials, or from a URL parameter. Use the `{{ paramName }}` syntax for a partial variable.

```ini
[demoTodo]
maxItems = {{ maxItems }}
==
...
```

If the **demoTodo** component above is defined in a partial, it takes the value of the **maxItems** partial variable.

```twig
{% partial 'my-todo-partial' maxItems='10' %}
```

Use dot notation to read a nested value.

```ini
[demoTodo]
maxItems = {{ data.maxItems }}
==
...
```

To load the value from a URL parameter, start the name with a colon, as in `{{ :paramName }}`.

```ini
[demoTodo]
maxItems = {{ :maxItems }}
==
...
```

The page must define the matching [URL parameter](./pages.md#url-parameters).

```ini
url = "/todo/:maxItems"
```

In the admin panel, assign these values with the Inspector. Each Inspector field has an icon on the right side that opens the external parameter editor. Enter the name without curly brackets, as `paramName` for a partial variable or `:paramName` for a URL parameter.

## Passing Variables to Components

When you render default markup with the `{% component %}` tag, you can pass variables that override [component properties](./extending/components.md), in the same way as [partial variables](./partials.md#passing-variables-to-partials). In this example, the **maxItems** property is set to *7* when the component renders.

```twig
{% component 'demoTodoAlias' maxItems='7' %}
```

## Overriding Component Partials

In rare cases, you may want to keep a component's default markup but change one partial inside it. Create a file in your theme that matches the component's partial structure.

For example, if a component called **channel** uses a **title.htm** partial, override that partial by creating **partials/channel/title.htm** in your theme.

Segment | Description
------------- | -------------
**partials** | the theme partials directory
**channel** | the component alias (a partial subdirectory)
**title.htm** | the component partial to override

The subdirectory name matches the component alias. If you give the component a different alias, the override directory changes with it.

::: cmstemplate
```ini
[channel foobar]
```
```twig
{% component "foobar" %}
```
:::

The override path is now **partials/foobar/title.htm**.

::: aside
This feature is for edge cases, where a component has a complex internal partial structure that you want to mostly keep. In most cases, writing your own markup is simpler and more flexible.
:::

## Using the View Bag Component

October CMS includes a special component called `viewBag` that works on any page or layout. It lets you define ad hoc properties and read them as variables in the markup. A common use is marking the active menu item on a page.

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

Every property defined on the component is available in the page, layout or partial markup through the `viewBag` variable. In the following layout, the list item gets the **active** class when `viewBag.activeMenu` is **about**.

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

::: aside
The `viewBag` component is hidden in the admin panel and is only available for file-based editing. Other plugins can also use it to store data.
:::

#### See Also

::: also
* [Building Components](./extending/components.md)
* [Component Twig Tag](../handbook/twig-tags/component.md)
* [Tailor Components](../handbook/tailor-components.md)
:::
