# Developing themes

- [Theme information file](#theme-information)
- [Version file](#version-file)
- [Theme preview image](#preview-image)
- [Theme customization](#customization)
- [Theme dependencies](#dependencies)

The theme directory could include the **theme.yaml**, **version.yaml** and **assets/images/theme-preview.png** files. These files are optional for the local development but required for themes published on the OctoberCMS Marketplace.

<a name="theme-information"></a>
## Theme information file

The theme information file **theme.yaml** contains the theme description, the author name, URL of the author's website and some other information. The file should be placed to the theme root directory:

    themes/
      demo/
        theme.yaml    <=== Theme information file

The following fields are supported in the **theme.yaml** file:

Field | Description
------------- | -------------
**name** | specifies the theme name, required.
**author** | specifies the author name, required.
**homepage** | specifies the author website URL, required.
**description** | the theme description, required.
**code** | the theme code, optional. The value is used on the OctoberCMS marketplace for initializing the theme code value. If the theme code is not provided, the theme directory name will be used as a code. When a theme is installed from the Marketplace, the code is used as the new theme directory name.
**form** | a configuration array or reference to a form field definition file, used for [theme customization](#customization), optional.
**require** | an array of plugin names used for [theme dependencies](#dependencies), optional.

Example of the theme information file:

    name: "OctoberCMS Demo"
    description: "Demonstrates the basic concepts of the front-end theming."
    author: "OctoberCMS"
    homepage: "http://octobercms.com"
    code: "demo"

<a name="version-file"></a>
## Version file

The theme version file **version.yaml** defines the current theme version and the change log. The file should be placed to the theme root directory:

    themes/
      demo/
        ...
        version.yaml    <=== Theme version file

The file format is following:

    1.0.1: Theme initialization
    1.0.2: Added more features
    1.0.3: Some features are removed

<a name="preview-image"></a>
## Theme preview image

The theme preview image is used in the back-end theme selector. The image file **theme-preview.png** should be placed to the theme's **assets/images** directory:

    themes/
      demo/
        assets/
          images/
            theme-preview.png    <=== Theme preview image

The image width should be at least 600px. The ideal aspect ratio is 1.5, for example 600x400px.

<a name="customization"></a>
## Theme customization

Themes can support configuration values by defining a `form` key in the theme information file. This key should contain a configuration array or reference to a form field definition file, see [form fields](../backend/forms#form-fields) for more information.

The following is an example of how to define a website name configuration field called **site_name**:

    name: My Theme
    # [...]

    form:
        fields:
            site_name:
                label: Site name
                comment: The website name as it should appear on the front-end
                default: My Amazing Site!

The value can then be accessed inside any of the Theme templates using the [default page variable](../cms/markup#default-variables) called `this.theme`.

    <h1>Welcome to {{ this.theme.site_name }}!</h1>

You may also define the configuration in a separate file, where the path is relative to the theme. The following definition will source the form fields from the file **config/fields.yaml** inside the theme.

    name: My Theme
    # [...]

    form: config/fields.yaml

<a name="combiner-vars"></a>
### Combiner variables

Assets combined using the `|theme` [filter and combiner](../markup/filter-theme) can have values passed to supporting filters, such as the LESS filter. Simply specify the `assetVar` option when defining the form field, the value should contain the desired variable name.

    form:
        fields:
            # [...]

            link_color:
                label: Link color
                type: colorpicker
                assetVar: 'link-color'

In the above example, the color value selected will be available inside the less file as `@link-color`. Assuming we have the following stylesheet reference:

    <link href="{{ ['assets/less/theme.less']|theme }}" rel="stylesheet">

Using some example content inside **themes/yourtheme/assets/less/theme.less**:

    a { color: @link-color }

<a name="dependencies"></a>
## Theme dependencies

A theme can depend on plugins by defining a **require** option in the [Theme information file](#theme-information), the option should supply an array of plugin names that are considered requirements. A theme that depends on **Acme.Blog** and **Acme.User** can define this requirement like so:

    name: "OctoberCMS Demo"
    # [...]

    require:
        - Acme.User
        - Acme.Blog

When the theme is installed for the first time, the system will attempt to install the required plugins at the same time.
