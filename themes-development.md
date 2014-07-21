# Developing themes

- [Theme information file](#theme-information)
- [Version file](#version-file)
- [Theme preview image](#preview-image)

The theme directory could include the **theme.yaml**, **version.yaml** and **assets/images/theme-preview.png** files. These files are optional for the local development but required for themes published on the OctoberCMS Marketplace. 

<a name="theme-information" class="anchor" href="#theme-information"></a>
## Theme information file

The theme information file **theme.yaml** contains the theme description, the author name, URL of the author's website and some other information. The file should be placed to the theme root directory:

    themes/
      demo/
        theme.yaml       <=== Theme information file

The following fields are supported in the **theme.yaml** file:

* **name** - specifies the theme name, required.
* **author** - specifies the author name, required.
* **author-url** - specifies the author website URL, required.
* **description** - the theme description, required.
* **code** - the theme code, optional. The value is used on the OctoberCMS marketplace for initializing the theme code value. If the theme code is not provided, the theme directory name will be used as a code. When a theme is installed from the Marketplace, the code is used as the new theme directory name.

Example of the theme information file:

    name: "Demo"
    description: "Demo OctoberCMS theme. Demonstrates the basic concepts of the front-end theming: layouts, pages, partials, components, content blocks, AJAX framework."
    author: "OctoberCMS"
    author-url: "http://octobercms.com"
    code: "demo"

<a name="version-file" class="anchor" href="#version-file"></a>
## Version file

The theme version file **version.yaml** defines the current theme version and the change log. The file should be placed to the theme root directory:

    themes/
      demo/
        ... 
        version.yaml       <=== Theme version file

The file format is following:

    1.0.1: Theme initialization
    1.0.2: Added more features
    1.0.3: Some features are removed

<a name="preview-image" class="anchor" href="#preview-image"></a>
## Theme preview image

The theme preview image is used in the back-end theme selector. The image file **theme-preview.png** should be placed to the theme's **assets/images** directory:

    themes/
      demo/
        assets/
          images/
            theme-preview.png <=== Theme preview image

The image width should be at least 600 px. The ideal aspect ratio is 1.5, for example 600x400px.