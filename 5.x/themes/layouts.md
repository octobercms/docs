---
previousPath: cms/themes/layouts.md
subtitle: Wrap your pages in a shared layout that holds the header, footer and other markup they have in common.
---
# Layouts

A layout holds the markup that every page shares, such as the `<html>`, `<head>` and `<body>` tags, a header and a footer. The `{% page %}` tag marks where the page content goes.

```twig
<html>
    <body>
        {% page %}
    </body>
</html>
```

Layout files live in the **layouts** directory of your theme and use the **htm** extension.

## Using a Layout on a Page

A [page](./pages.md) picks its layout with the `layout` parameter in its configuration section, using the layout file name without the extension. The following page uses the **default.htm** layout.

::: cmstemplate
```ini
url = "/"
layout = "default"
```
```twig
<p>Hello, world!</p>
```
:::

When the page is requested, the layout's `{% page %}` tag is replaced with the page content. The previous examples generate the following markup.

```html
<html>
    <body>
        <p>Hello, world!</p>
    </body>
</html>
```

If the layout is in a subdirectory, include the subdirectory name in the `layout` parameter.

### Sharing Markup Between Layouts

Layouts can [render partials](./partials.md), which lets several layouts share the same markup. For example, a partial can output the website's CSS and JavaScript links. To add a JavaScript reference, you then edit one partial instead of every layout.

## Layout Configuration

The configuration section is optional for layouts. It supports the **description** parameter, shown in the admin panel, and the **is_priority** parameter, described in [Priority Layouts](#priority-layouts).

::: cmstemplate
```ini
description = "Basic layout example"
```
```twig
<html>
    <body>
        {% page %}
    </body>
</html>
```
:::

## Displaying Page Properties

The layout can read the active page's properties with the `this.page` variable. The following layout outputs the page's `meta_title` in the `<title>` tag.

```twig
<html>
    <head>
        <title>{{ this.page.meta_title }} - October CMS</title>
    </head>
    <body>
        {% page %}
    </body>
</html>
```

Pages can build the `meta_title` value from variables, set it in PHP, or replace it with a placeholder. See [Setting the Page Title](./pages.md#setting-the-page-title).

## Injecting Content with Placeholders

Placeholders let a page inject content into the layout. Define a placeholder in the layout with the `{% placeholder %}` tag. The following layout defines a placeholder named **head** inside the `<head>` tag.

```twig
<html>
    <head>
        {% placeholder head %}
    </head>
    ...
</html>
```

The page adds content to the placeholder with the `{% put %}` and `{% endput %}` tags. The following page injects a CSS link into the **head** placeholder.

::: cmstemplate
```ini
url = "/my-page"
layout = "default"
```
```twig
{% put head %}
    <link href="/themes/demo/assets/css/page.css" rel="stylesheet">
{% endput %}

<p>The page content goes here.</p>
```
:::

See the [placeholder tag](../handbook/twig-tags/placeholder.md) for default content, replacing content and checking whether a placeholder has content.

## Adding Logic to Layouts

Layouts can have a PHP section and use any Twig feature, the same as [pages](./pages.md#adding-page-logic).

### Layout Life Cycle

The PHP section of a layout can define four special functions.

- `onInit` runs when all components are initialized, before AJAX requests are handled.
- `onStart` runs at the beginning of the page processing.
- `onBeforePageStart` runs after the layout [components](./components.md) run, before the page's `onStart` function.
- `onEnd` runs last, after the page's `onEnd` function.

Together with the page functions, they run in the following order.

1. Layout `onInit()` function.
1. Page `onInit()` function.
1. Layout `onStart()` function.
1. Layout components `onRun()` method.
1. Layout `onBeforePageStart()` function.
1. Page `onStart()` function.
1. Page components `onRun()` method.
1. Page `onEnd()` function.
1. Layout `onEnd()` function.

### Variable and Method Access

When a template reads a variable or calls a method, the nearest context wins. Take the following [PHP section](./structure.md#php-code-section).

```php
function onStart()
{
    $this['myVariable'] = 'foo';
}

function myMethod()
{
    return 'bar';
}
```

When Twig reads `myVariable` or calls `this.myMethod()`, it looks in the following order.

1. Partial
1. Page
1. Layout

## Priority Layouts

By default, the page renders before the layout. This lets the page change layout properties, such as the title or meta description. The render order looks like this.

```text
Layout (3) ← Page (1) → Partials (2)
```

Set the `is_priority` parameter to switch the layout to priority mode. The layout then renders first, and the `{% page %}` tag renders the page inline with the layout contents. Placeholders are not supported in this mode. The render order looks like this.

```text
Layout (1) → Page (2) → Partials (3)
```

Priority mode is useful when [building API endpoints](./extending/building-apis.md). In the following example, the page markup never renders because the layout never calls the page tag.

::: cmstemplate
```ini
description = "API Layout"
is_priority = 1
```
```twig
{% if false %}
    {% page %}
{% endif %}
```
:::

#### See Also

::: also
* [Pages](./pages.md)
* [Partials](./partials.md)
* [Page Twig Tag](../handbook/twig-tags/page.md)
* [Placeholder Twig Tag](../handbook/twig-tags/placeholder.md)
* [`this.layout` Twig Property](../handbook/twig-properties/this-layout.md)
:::
