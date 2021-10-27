# | theme

The `| theme` filter returns an address relative to the active theme path of the website. The result is an absolute URL, including domain and protocol, to the asset specified in the filter parameter. Theme assets usually reside in the **assets** subdirectory of a theme directory.

```twig
<script type="text/javascript" src="{{ 'assets/js/menu.js' | theme }}"></script>
```

If the website address is __https://octobercms.com__ and the active theme is called `website` the above example would output the following:

```twig
<script type="text/javascript" src="http://october.com/themes/website/assets/js/menu.js"></script>
```

<a name="combine-css-javascript"></a>
## Combining CSS and JavaScript

The filter can also be used to combine assets of the same type by passing an array of files.

```twig
<link href="{{ [
    'assets/css/styles1.css',
    'assets/css/styles2.css'
] | theme }}" rel="stylesheet">
```

> **Note**: You can enable the assets minification with the `enableAssetMinify` parameter in the `config/cms.php` script. By default the minification is disabled.

<a name="combiner-aliases"></a>
### Combiner aliases

The asset combiner supports common aliases that substitute file paths, these will begin with the `@` symbol. For example the [AJAX framework assets](../ajax/introduction#including-the-framework) can be included in the combiner:

```twig
<script src="{{ [
    '@jquery',
    '@framework',
    '@framework.extras',
    'assets/javascript/app.js'
] | theme }}"></script>
```

The following aliases are supported:

Alias | Description
------------- | -------------
`@jquery` | Reference to the jQuery library (v3.4.0) used in the back-end. (JavaScript)
`@framework` | AJAX framework extras, subsitute for `{% framework %}` tag. (JavaScript)
`@framework.extras` | AJAX framework extras, subsitute for `{% framework extras %}` tag. (JavaScript, CSS)
`@framework.extras.js` | AJAX framework extras, (JavaScript)
`@framework.extras.css` | AJAX framework extras, (CSS)

The same alias can be used for JavaScript or CSS, for example `@framework.extras`. At least one explicit reference with a file extension is needed in the array to determine which is used.

<a name="external-combiner-paths"></a>
### External combiner paths

In some cases you may wish to combine a file outside the theme, this is achieved by prefixing the path with a symbol to create a dynamic path. For example, a path beginning with `~/` will create a path relative to the application:

```twig
<script src="{{ ['~/modules/system/assets/js/framework.js'] | theme }}"></script>
```

These symbols are supported for creating dynamic paths:

Symbol | Description
------------- | -------------
`$` | Relative to the plugins directory
`~` | Relative to the application directory
