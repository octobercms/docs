# |theme

The `|theme` filter returns a URL like the [app filter](#app-filter) to an asset specified in the parameter. The next example shows how to refer to a JavaScript file from the theme assets directory:

    <script type="text/javascript" src="{{ 'assets/js/menu.js'|theme }}"></script>

Asset files of the same type can also be [combined and minified](#combine-css-javascript) using this filter.

<a name="combine-css-javascript" class="anchor" href="#combine-css-javascript"></a>
## Combining CSS and JavaScript

Theme assets usually reside in the **assets** subdirectory of a theme directory. October provides the `|theme` filter for [creating links to assets files](#theme-filter), it can also combine assets of the same type by passing an array of files:

    <link href="{{ ['assets/css/styles1.css', 'assets/css/styles2.css']|theme }}" rel="stylesheet">

You can enable the assets minification with the `enableAssetMinify` parameter in the `config/cms.php` script. By default the minification is disabled.

<a name="combiner-aliases" class="anchor" href="#combiner-aliases"></a>
### Combiner aliases

The asset combiner supports common aliases that substitute file paths, these will begin with the `@` symbol. For example the [AJAX framework assets](ajax#introduction) can be included in the combiner:

    <script src="{{ [
        '@jquery',
        '@framework',
        '@framework.extras',
        'assets/javascript/app.js']|theme }}"></script>

The following aliases are supported:

Alias  | Description
------------- | -------------
jquery | Reference to the jQuery library used in the back-end. (JavaScript)
framework | AJAX framework extras, subsitute for `{% framework %}` tag. (JavaScript)
framework.extras | AJAX framework extras, subsitute for `{% framework extras %}` tag. (JavaScript, CSS)

> **Note:** The same alias can be used for JavaScript or CSS, at least one explicit reference with a file extension is needed in the array to determine which to use.

<a name="external-combiner-paths" class="anchor" href="#external-combiner-paths"></a>
### External combiner paths

In some cases you may wish to combine a file outside the theme, this is achieved by prefixing the path with a symbol to create a dynamic path. For example, a path beginning with `~/` will create a path relative to the application:

    <script src="{{ ['~/modules/system/assets/js/framework.js']|theme }}"></script>

These symbols are supported for creating dynamic paths:

Symbol  | Description
------------- | -------------
`$` | Relative to the plugins directory
`~` | Relative to the application directory