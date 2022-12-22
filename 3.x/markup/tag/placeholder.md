---
subtitle: Twig Tag
---
# {% placeholder %}

The `{% placeholder %}` tag will render a placeholder section which is generally [used inside Layouts](../../cms/themes/layouts.md). This tag will return any placeholder contents that have been added using the `{% put %}` tag, or any default content that is defined (optional).

```twig
{% placeholder name %}
```

Content can then be injected into the placeholder in any subsequent page or partial.

```twig
{% put name %}
    <p>Place this text in the name placeholder</p>
{% endput %}
```

## Default Placeholder Content

Placeholders can have default content that can be either replaced or complemented by a page. If the `{% put %}` tag for a placeholder with default content is not defined on a page, the default placeholder content is displayed. Example placeholder definition in the layout template:

```twig
{% placeholder sidebar default %}
    <p><a href="/contacts">Contact us</a></p>
{% endplaceholder %}
```

The page can inject more content to the placeholder. The `{% default %}` tag specifies a place where the default placeholder content should be displayed. If the tag is not used the placeholder content is completely replaced.

```twig
{% put sidebar %}
    <p><a href="/services">Services</a></p>
    {% default %}
{% endput %}
```

## Checking a Placeholder Exists

In a layout template you can check if a placeholder content exists by using the `hasPlaceholder()` function. This lets you to generate different markup depending on whether the page provides a placeholder content. Example:

```twig
{% if hasPlaceholder('sidemenu') %}
    <!-- Markup for a page with a sidebar -->
    <div class="row">
        <div class="col-md-3">
            {% placeholder sidemenu %}
        </div>
        <div class="col-md-9">
            {% page %}
        </div>
    </div>
{% else %}
    <!-- Markup for a page without a sidebar -->
    {% page %}
{% endif %}
```

## Using Placeholders as Variables

Placeholders can be useful for setting inherited variables, such as the active link in page navigation. The `{% put %}` tag allows you to set values directly. For example, setting the `activeNav` value to **home** inside a page template.

```twig
{% put activeNav = 'home' %}
```

The variable can be accessed inside the layout template using the `placeholder()` function. From this, we can determine the active link based on the value set by the page.

```twig
{% set active = placeholder('activeNav') %}

<ul>
    <li class="{{ active == 'home' ? 'active' }}">Home</li>
    <li class="{{ active == 'blog' ? 'active' }}">Blog</li>
    <li class="{{ active == 'contact' ? 'active' }}">Contact</li>
</ul>
```

A default value (second argument) can be supplied as a fallback.

```twig
{% set active = placeholder('activeNav', 'home') }} %}
```

## Custom Attributes

The `placeholder` tag accepts two optional attributes &mdash; `title` and `type`. The `title` attribute is not used by the CMS itself, but could be used by other plugins. The type attribute manages the placeholder type. There are two types supported at the moment &mdash; **text** and **html**. The content of text placeholders is escaped before it's displayed. The title and type attributes should be defined after the placeholder name and the `default` attribute, if it's presented. Example:

```twig
{% placeholder ordering title="Ordering information" type="text" %}
```

Example of a placeholder with a default content, title and type attributes.

```twig
{% placeholder ordering default title="Ordering information" type="text" %}
    There is no ordering information for this product.
{% endplaceholder %}
```

## System Placeholders

October CMS defines static placeholders that are used by the system. Packages will use these placeholders to inject their dependencies to the page, either using the PHP or Twig interface.

### {% scripts %}

The `{% scripts %}` tag inserts JavaScript file references to scripts injected by the application. The tag is commonly defined before the closing BODY tag:

```twig
<body>
    ...
    {% scripts %}
</body>
```

> **Note**: This tag should appear once only in a given page cycle to prevent duplicated references.

#### Injecting Scripts

Links to JavaScript files can be programmatically injected in PHP either by [components](../../extend/cms-components.md) or [pages](../../cms/themes/pages.md).

```php
function onStart()
{
    $this->addJs('assets/js/app.js');
}
```

You can also inject raw markup to the `{% scripts %}` tag by using the **scripts** anonymous placeholder [in the layout](../../cms/themes/layouts.md). Use the `{% put %}` tag in pages or layouts to add content to the placeholder.

```twig
{% put scripts %}
    <script type="text/javascript" src="/themes/demo/assets/js/menu.js"></script>
{% endput %}
```

### {% styles %}

The `{% styles %}` tag renders CSS links to stylesheet files injected by the application. The tag is commonly defined in the HEAD section of a page or layout:

```twig
<head>
    ...
    {% styles %}
</head>
```

> **Note**: This tag should appear once only in a given page cycle to prevent duplicated references.

#### Injecting Styles

Links to StyleSheet files can be programmatically injected in PHP either by [components](../../extend/cms-components.md) or [pages](../../cms/themes/pages.md).

```php
function onStart()
{
    $this->addCss('assets/css/hello.css');
}
```

You can also inject raw markup to the `{% styles %}` tag by using the **styles** anonymous placeholder [in the layout](../../cms/themes/layouts.md). Use the `{% put %}` tag in pages or layouts to add content to the placeholder.

```twig
{% put styles %}
    <link href="/themes/demo/assets/css/page.css" rel="stylesheet" />
{% endput %}
```
