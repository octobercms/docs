# this.theme

You can access the current theme object via `this.theme` and it returns the object `Cms\Classes\Theme`, a reference to the [theme customization object](../themes/development#customization).

## Properties

`this.theme` will provide direct access to form field values, defined by any theme customization. It also has the following properties natively.

### id

Converts the theme directory name to a CSS friendly identifier.

    <body class="theme-{{ this.theme.id }}">

If the theme directory was **website** this would generate a class name of `theme-website`.

### config

An array containing all the theme configuration values found in the `theme.yaml` file.

    <meta name="description" content="{{ this.theme.config.description }}">
