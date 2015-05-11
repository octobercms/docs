# {% styles %}

The `{% styles %}` tag inserts CSS links to files added by [components](../plugin/components#component-assets), or [pages](../cms/pages#injecting-assets). The tag is commonly defined in the HEAD section of a page or layout:

    <head>
        ...
        {% styles %}
    </head>

Another way to add styles to the `{% styles %}` tag is using the **styles**  anonymous [placeholder](../cms/layouts#placeholders). Use the `{% put %}` tag in pages or layouts to add content to the placeholder:

    {% put styles %}
        <link href="/themes/demo/assets/css/page.css" rel="stylesheet">
    {% endput %}