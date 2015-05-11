# {% scripts %}

The `{% scripts %}` tag inserts JavaScript file references to scripts added by [components](../plugin/components#component-assets), or [pages](../cms/pages#injecting-assets). The tag is commonly defined before the closing BODY tag:

    <body>
        ...
        {% scripts %}
    </body>

Another way to add scripts to the `{% scripts %}` tag is using the **scripts**  anonymous [placeholder](../cms/layouts#placeholders). Use the `{% put %}` tag in pages or layouts to add content to the placeholder:

    {% put scripts %}
        <script type="text/javascript" src="{{ 'assets/js/menu.js'|theme }}"></script>
    {% endput %}
