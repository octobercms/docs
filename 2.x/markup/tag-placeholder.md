# {% placeholder %}

The `{% placeholder %}` tag will render a placeholder section which is generally [used inside Layouts](../cms/layouts.md#placeholders). This tag will return any placeholder contents that have been added using the `{% put %}` tag, or any default content that is defined (optional).

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

In a layout template you can check if a placeholder content exists by using the `placeholder()` function. This lets you to generate different markup depending on whether the page provides a placeholder content. Example:

```twig
{% if placeholder('sidemenu') %}
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
