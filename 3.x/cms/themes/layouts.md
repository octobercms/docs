---
subtitle: Define the scaffold for your website pages.
---
# Layouts

Layouts define a common scaffold for your pages, which usually means everything that repeats on every page, such as a header and a footer. They will almost always contain HTML code such as HEAD, TITLE and BODY tags.

Layout template files reside in the **layouts** directory in your theme. Layout template files should have the **htm** extension. Inside the layout file you should use the `{% page %}` tag to output the page content. Next is an example of the simplest possible layout.

```twig
<html>
    <body>
        {% page %}
    </body>
</html>
```

::: aside
Remember that if you refer a layout from a subdirectory you should specify the subdirectory name.
:::

To use a layout for a [page](./pages.md), the page should refer the layout file name (without extension) in the configuration section. Below is an example page template using the **default.htm** layout.

```twig
url = "/"
layout = "default"
==
<p>Hello, world!</p>
```

When this page is requested its content is merged with the layout, or more precisely - the layout's `{% page %}` tag is replaced with the page content. The previous examples would generate the following markup:

```html
<html>
    <body>
        <p>Hello, world!</p>
    </body>
</html>
```

Note that you can [render partials](./partials.md) in layouts. This lets you to share the common markup elements between different layouts. For example, you can have a partial that outputs the website CSS and JavaScript links. This approach simplifies the resource management - if you want to add a JavaScript reference you should modify a single partial instead of editing all the layouts.

The configuration section is optional for layouts. The supported configuration parameters are **name** and **description**. The parameters are optional and used in the back-end user interface. Example layout template with a description:

```twig
description = "Basic layout example"
==
<html>
    <body>
        {% page %}
    </body>
</html>
```

## Using a Dynamic Page Title

The `meta_title` and `meta_description` properties of a [page](pages.md) support parsing variables from the page life cycle. The following layout template will set the page title based on the value of the active page.

```html
<html>
    <head>
        <title>{{ this.page.meta_title }} - October CMS</title>
    </head>
    <body>
        {% page %}
    </body>
<html>
```

The page template can then define its title using Twig-like variable syntax using values that are available in the global environment, in this case the **post.title** value is used.

```ini
url = "/blog"
meta_title = "{{ post.title }} - Blog"
```

> **Note**: Only basic Twig variables are supported. Filters, tags and functions cannot be used.

## Placeholders

Placeholders allow pages to inject content to the layout. Placeholders are defined in the layout templates with the `{% placeholder %}` tag. The next example shows a layout template with a placeholder **head** defined in the HTML HEAD section.

```twig
<html>
    <head>
        {% placeholder head %}
    </head>
    ...
</html>
```

Pages can inject content to placeholders with the `{% put %}` and `{% endput %}` tags. The following example demonstrates a simple page template which injects a CSS link to the placeholder **head** defined in the previous example.

```twig
url = "/my-page"
layout = "default"
==
{% put head %}
    <link href="/themes/demo/assets/css/page.css" rel="stylesheet">
{% endput %}

<p>The page content goes here.</p>
```

More information on placeholders can be found [in the Markup guide](../markup/tag-placeholder.md).

## Dynamic Layouts

Layouts, like pages, can use any Twig features. Please refer to the [Dynamic Pages section](pages.md) of the documentation for details.

### Layout Execution Life Cycle

Inside the layout's PHP section you can define the following functions for handling the page execution life cycle: `onInit`, `onStart`, `onBeforePageStart` and `onEnd`.

The `onInit` function is executed when all components are initialized and before AJAX requests are handled. The `onStart` function is executed in the beginning of the page processing. The `onBeforePageStart` function is executed after the layout [components](./components.md) ran, but before the page's `onStart` function is executed. The `onEnd` function is executed after the page is rendered. The sequence the handlers are executed is following:

1. Layout `onInit()` function.
1. Page `onInit()` function.
1. Layout `onStart()` function.
1. Layout components `onRun()` method.
1. Layout `onBeforePageStart()` function.
1. Page `onStart()` function.
1. Page components `onRun()` method.
1. Page `onEnd()` function.
1. Layout `onEnd()` function.

### Priority Layouts

Layouts can specify an `is_priorty` attribute in their settings to activate priority mode. In normal circumstances, the layout contents render after the page contents. This allows the page to manipulate layout properties, like the title or meta description. Visually the order looks like this.

```text
Layout (3) ← Page (1) → Partials (2)
```

In priority mode, the layout uses a more natural load order where the `{% page %}` tag renders inline with the layout contents. However, there is no support for placeholders when using this mode. The priority layout load order looks more like this.

```text
Layout (1) → Page (2) → Partials (3)
```

This is particularly useful when [building API endpoints](../resources/building-apis.md). In the following example, the page logic will not run since the page tag is never called.

```twig
description = "API Layout"
is_priority = 1
==
{% if false %}
    {% page %}
{% endif %}
```

#### See Also

::: also
* [Page Twig Tag](../../markup/tag/page.md)
:::
