# this.page

You can access the current page object via `this.page` and it returns the object `Cms\Classes\Page`.

## Properties

`this.page` has the following properties.

### id

Converts the page file name and folder name to a CSS friendly identifier.

    <body class="page-{{ this.page.id }}">

If the page file was **home/index.htm** this would generate a class name of `page-home-index`.

### title

The page title as defined by the configuration.

    <title>{{ this.page.title }}</title>

### description

The page description as defined by the configuration.

    <meta name="description" content="{{ this.page.description }}">
