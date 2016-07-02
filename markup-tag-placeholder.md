# {% placeholder %}

The `{% placeholder %}` tag will render a placeholder section which is generally [used inside Layouts](../cms/layouts#placeholders). This tag will return any placeholder contents that have been added using the `{% put %}` tag, or any default content that is defined (optional).

    {% placeholder name %}

Content can then be injected into the placeholder in any subsequent page or partial.

    {% put name %}
        <p>Place this text in the name placeholder</p>
    {% endput %}

<a name="default-placeholder-content"></a>
## Default placeholder content

Placeholders can have default content that can be either replaced or complemented by a page. If the `{% put %}` tag for a placeholder with default content is not defined on a page, the default placeholder content is displayed. Example placeholder definition in the layout template:

    {% placeholder sidebar default %}
        <p><a href="/contacts">Contact us</a></p>
    {% endplaceholder %}

The page can inject more content to the placeholder. The `{% default %}` tag specifies a place where the default placeholder content should be displayed. If the tag is not used the placeholder content is completely replaced.

    {% put sidebar %}
        <p><a href="/services">Services</a></p>
        {% default %}
    {% endput %}

<a name="checking-placeholder-exits"></a>
## Checking a placeholder exists

In a layout template you can check if a placeholder content exists by using the `placeholder()` function. This lets you to generate different markup depending on whether the page provides a placeholder content. Example:

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

<a name="custom-placeholder-attributes"></a>
## Custom attributes

The `placeholder` tag accepts two optional attributes &mdash; `title` and `type`. The `title` attribute is not used by the CMS itself, but could be used by other plugins. The type attribute manages the placeholder type. There are two types supported at the moment &mdash; **text** and **html**. The content of text placeholders is escaped before it's displayed. The title and type attributes should be defined after the placeholder name and the `default` attribute, if it's presented. Example:

    {% placeholder ordering title="Ordering information" type="text" %}

Example of a placeholder with a default content, title and type attributes.

    {% placeholder ordering default title="Ordering information" type="text" %}
        There is no ordering information for this product.
    {% endplaceholder %}
