# this.theme

You can access the current theme object via `this.theme` and it returns the object `Cms\Classes\Theme`.

## Properties

`this.theme` has the following properties.

### id

Converts the theme directory name to a CSS friendly identifier.

    <body class="theme-{{ this.theme.id }}">

If the theme directory was **website** this would generate a class name of `theme-website`.

### description

The theme description as defined by the configuration.

    <meta name="description" content="{{ this.theme.description }}">

