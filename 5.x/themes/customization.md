---
previousPath: cms/themes/settings.md
subtitle: Describe a theme with its information file and let site owners customize it with settings fields.
---
# Theme Customization

A theme describes itself in a **theme.yaml** file, which can also define settings fields that site owners change in the admin panel. The **theme.yaml**, **version.yaml** and **assets/images/theme-preview.png** files are optional for local development, but required for themes published on the October CMS Marketplace.

```yaml
name: "October CMS Demo"
description: "Demonstrates the basic concepts of the front-end theming."
author: "October CMS"
homepage: "https://octobercms.com"
code: "Demo"
authorCode: "Acme"
```

## Theme Information File

The theme information file **theme.yaml** holds the theme name and description, the author name, the URL of the author's website and other details. Place it in the theme root directory.

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

The **theme.yaml** file supports the following fields.

Field | Description
------------- | -------------
**name** | the theme name, required.
**author** | the author name, required.
**homepage** | the author website URL, required.
**description** | the theme description, required.
**previewImage** | a custom preview image, with a path relative to the theme directory, for example `assets/images/preview.png`, optional.
**code** | the theme code, optional. The October CMS Marketplace uses it to initialize the theme code.
**authorCode** | the theme author code, optional. The October CMS Marketplace uses it to define the theme owner.
**form** | a configuration array, or a reference to a form field definition file, used for [customization settings](#adding-customization-settings), optional.
**require** | an array of plugin names the theme [depends on](#requiring-plugins), optional.
**parent** | the directory name of the parent theme, used by [child themes](./child-themes.md), optional.
**database** | stores changes to the theme in the database instead of the filesystem when enabled, see [Storing Themes in the Database](./database-themes.md), optional.

You can also edit most of these values on the **Settings → Site Theme** page, under **Manage → Edit Properties** for the theme.

## Adding Customization Settings

Define a `form` key in the theme information file to give the theme its own settings. The key holds a configuration array, or a reference to a form field definition file. See [Form Fields](../handbook/form-fields.md) for the available field types.

The following example defines a website name field called **site_name**.

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

Site owners edit the values on the **Settings → Site Theme** page with the **Customize** button. Any theme template can read a value with the [`this.theme`](../handbook/twig-properties/this-theme.md) variable.

```twig
<h1>Welcome to {{ this.theme.site_name }}!</h1>
```

A [child theme](./child-themes.md) without its own `form` key uses the fields of its parent theme.

### Loading Fields from a File

You can define the fields in a separate file, with a path relative to the theme. The following definition loads the form fields from the **config/fields.yaml** file inside the theme.

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

### Translating Theme Settings

When your website has [sites with different languages](./sites/multisite.md), set the `translatable` option on a field to give each locale its own value. Fields without this option share one value across every locale.

```yaml
form:
    fields:
        site_name:
            label: Site name
            default: My Amazing Site!
            translatable: true
```

When you select a different site in the site picker, every translatable field is edited in that site's locale. The `this.theme.site_name` variable returns the value for the active locale, and falls back to the default locale when no translation exists.

### Using Theme Settings in CSS

To use a setting in your theme stylesheet, pass it to a CSS custom property (variable). The following example uses a [color picker field](../handbook/form-fields/colorpicker.md) to choose a link color.

```yaml
form:
    fields:
        # [...]

        link_color:
            label: Link color
            type: colorpicker
```

Create a [partial](./partials.md) that passes the selected value to CSS in a local stylesheet, then render the partial inside the `<head>` tag of the [layout](./layouts.md).

```html
<style>
    :root {
        --my-color: {{ this.theme.link_color }};
    }
</style>
```

::: tip
Custom property names are case sensitive, so `--my-color` is a different custom property from `--My-color`.
:::

Your stylesheet can now use the custom property anywhere, by naming it inside the `var()` function in place of a regular value.

```css
a {
    color: var(--my-color);
}
```

### Passing Settings to LESS Files

Assets combined with the [`|theme` filter](../handbook/twig-filters/theme.md) can receive values in supporting filters, such as the LESS filter. Set the `assetVar` option on the form field to the variable name you want.

```yaml
form:
    fields:
        # [...]

        link_color:
            label: Link color
            type: colorpicker
            assetVar: 'link-color'
```

In the example above, the selected color is available in LESS files as `@link-color`. Given the following stylesheet reference:

```twig
<link href="{{ ['assets/less/theme.less']|theme }}" rel="stylesheet">
```

The **themes/yourtheme/assets/less/theme.less** file can use the variable.

```less
a { color: @link-color }
```

## Requiring Plugins

A theme can depend on plugins. List the plugin names in the **require** field of the theme information file. A theme that depends on **Acme.Blog** and **Acme.User** defines the requirement like this:

```yaml
name: "October CMS Demo"
# [...]

require:
    - "Acme.User"
    - "Acme.Blog"
```

When the theme is installed for the first time, the system also tries to install the required plugins. For a smoother experience, [add these plugins to the Composer dependency list](../backend/plugins/publishing-packages.md) as well.

## Version File

The theme version file **version.yaml** defines the current theme version and the change log. Place it in the theme root directory.

::: dir
├── themes
|   └── website
|       ├── ...
|       └── theme.yaml
|       └── `version.yaml`  _← Version File_
:::

The file uses the following format.

```yaml
v1.0.1: Theme initialization
v1.0.2: Added more features
v1.0.3: Some features are removed
```

## Theme Preview Image

The admin panel shows the theme preview image in the theme selector. Place the image file **theme-preview.png** in the theme's **assets/images** directory, or set a different path with the `previewImage` field.

::: dir
├── themes
|   └── website
|       ├── ...
|       └── assets
|           └── images
|               └── `theme-preview.png`  _← Preview Image_
:::

The image should be at least 600px wide. The ideal aspect ratio is 1.5, for example 600x400px.

#### See Also

::: also
* [Child Themes](./child-themes.md)
* [Theme Structure](./structure.md)
* [Form Fields](../handbook/form-fields.md)
* [`this.theme` Twig Property](../handbook/twig-properties/this-theme.md)
:::
