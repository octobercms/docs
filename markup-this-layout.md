# this.layout

You can access the current layout object via `this.layout` and it returns the object `Cms\Classes\Layout`.

## Properties

`this.layout` has the following properties.

### id

Converts the layout file name and folder name to a CSS friendly identifier.

    <body class="layout-{{ this.layout.id }}">

If the layout file was **default.htm** this would generate a class name of `layout-default`.

### description

The layout description as defined by the configuration.

    <meta name="description" content="{{ this.layout.description }}">
