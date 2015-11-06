# {% scripts %}

The `{% scripts %}` tag inserts JavaScript file references to scripts injected by the application. The tag is commonly defined before the closing BODY tag:

    <body>
        ...
        {% scripts %}
    </body>

> **Note**: This tag should appear once only in a given page cycle to prevent duplicated references.

## Injecting scripts

Links to JavaScript files can be programmatically injected in PHP either by [components](../plugin/components#component-assets) or [pages](../cms/pages#injecting-assets).

    function onStart()
    {
        $this->addJs('assets/js/app.js');
    }

You can also inject raw markup to the `{% scripts %}` tag by using the **scripts**  anonymous [placeholder](../cms/layouts#placeholders). Use the `{% put %}` tag in pages or layouts to add content to the placeholder:

    {% put scripts %}
        <script type="text/javascript" src="/themes/demo/assets/js/menu.js"></script>
    {% endput %}
