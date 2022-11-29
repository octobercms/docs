---
subtitle: Learn how to customize the theme management features.
---
# Theme Settings

The theme directory could include the **theme.yaml**, **version.yaml** and **assets/images/theme-preview.png** files. These files are optional for the local development but required for themes published on the October CMS Marketplace.

## Theme Information File

The theme information file **theme.yaml** contains the theme description, the author name, URL of the author's website and some other information. The file should be placed to the theme root directory:

::: dir
├── themes
|   └── website
|       ├── pages
|       ├── layouts
|       ├── partials
|       ├── content
|       ├── assets
|       └── `theme.yaml`  _← Information File_
:::

The following fields are supported in the **theme.yaml** file:

Field | Description
------------- | -------------
**name** | specifies the theme name, required.
**author** | specifies the author name, required.
**homepage** | specifies the author website URL, required.
**description** | the theme description, required.
**previewImage** | custom preview image, path relative to the theme directory, eg: `assets/images/preview.png`, optional.
**code** | the theme code, optional. The value is used on the October CMS marketplace for initializing the theme code value.
**authorCode** | the theme author code, optional. The value is used on the October CMS marketplace for defining the theme owner.
**form** | a configuration array or reference to a form field definition file, used for theme customization, optional.
**require** | an array of plugin names used for theme dependencies, optional.

Example of the theme information file:

```yaml
name: "October CMS Demo"
description: "Demonstrates the basic concepts of the front-end theming."
author: "October CMS"
homepage: "https://octobercms.com"
code: "Demo"
authorCode: "Acme"
```

## Version File

The theme version file **version.yaml** defines the current theme version and the change log. The file should be placed to the theme root directory.

::: dir
├── themes
|   └── website
|       ├── ...
|       └── theme.yaml
|       └── `version.yaml`  _← Version File_
:::

The file contains the following format.

```yaml
v1.0.1: Theme initialization
v1.0.2: Added more features
v1.0.3: Some features are removed
```

## Theme Preview Image

The theme preview image is used in the back-end theme selector. The image file **theme-preview.png** should be placed to the theme's **assets/images** directory:

::: dir
├── themes
|   └── website
|       ├── ...
|       └── assets
|           └── images
|               └── `theme-preview.png`  _← Preview Image_
:::

The image width should be at least 600px. The ideal aspect ratio is 1.5, for example 600x400px.

## Theme Dependencies

A theme can depend on plugins by defining a **require** option in the theme information file, the option should supply an array of plugin names that are considered requirements. A theme that depends on **Acme.Blog** and **Acme.User** can define this requirement like so:

```yaml
name: "October CMS Demo"
# [...]

require:
    - "Acme.User"
    - "Acme.Blog"
```

When the theme is installed for the first time, the system will attempt to install the required plugins at the same time. For a streamlined experience, consider [adding these plugins to the composer depedency list](../../extend/resources/publishing-packages.md) as well.

## Theme Customization

Themes can support configuration values by defining a `form` key in the theme information file. This key should contain a configuration array or reference to a form field definition file, see [form field definitions](../../element/form-fields.md) for more information.

The following is an example of how to define a website name configuration field called **site_name**:

```yaml
name: My Theme
# [...]

form:
    fields:
        site_name:
            label: Site name
            comment: The website name as it should appear on the front-end
            default: My Amazing Site!
```

The value can then be accessed inside any of the Theme templates using the [global Twig variable](../../markup/property/this-theme.md) called `this.theme`.

```twig
<h1>Welcome to {{ this.theme.site_name }}!</h1>
```

You may also define the configuration in a separate file, where the path is relative to the theme. The following definition will source the form fields from the file **config/fields.yaml** inside the theme.

```yaml
name: My Theme
# [...]

form: config/fields.yaml
```

**themes/demo/config/fields.yaml**:

```yaml
fields:
    site_name:
        label: Site name
        comment: The website name as it should appear on the front-end
        default: My Amazing Site!
```

### Using Theme Data in CSS

Sometimes you want to include a visual preference inside your theme stylesheet. You may use CSS custom properties (variables) to make these values available. In the following example, we will use a [Color Picker field type](../../element/form/widget-colorpicker.md) to specify a custom link color.

```yaml
form:
    fields:
        # [...]

        link_color:
            label: Link color
            type: colorpicker
```

Using the above example we can define a [CMS partial](./partials.md) that passes the selected value to CSS using a local stylesheet. The partial is then included in the [theme layout](./layouts.md) inside the `<head>` tag.

```html
<style>
    :root {
        --my-color: {{ this.theme.link_color }};
    }
</style>
```

::: tip
Custom property names are case sensitive so `--my-color` will be treated as a separate custom property to `--My-color`.
:::

Now inside your stylesheet the custom property can be used anywhere by specifying the custom property name inside the `var()` function, in place of a regular property value.

```css
a {
    color: var(--my-color);
}
```

### Using Theme Data with Combined Assets

Assets combined using the `|theme` [filter and combiner](../markup/filter-theme.md) can have values passed to supporting filters, such as the LESS filter. Simply specify the `assetVar` option when defining the form field, the value should contain the desired variable name.

```yaml
form:
    fields:
        # [...]

        link_color:
            label: Link color
            type: colorpicker
            assetVar: 'link-color'
```

In the above example, the color value selected will be available inside the less file as `@link-color`. Assuming we have the following stylesheet reference:

```twig
<link href="{{ ['assets/less/theme.less']|theme }}" rel="stylesheet">
```

Using some example content inside **themes/yourtheme/assets/less/theme.less**:

```less
a { color: @link-color }
```
