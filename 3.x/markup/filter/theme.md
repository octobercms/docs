---
subtitle: Twig Filter
---
# |theme

The `|theme` filter returns an address relative to the active theme path of the website. The result is an absolute URL, including domain and protocol, to the asset specified in the filter parameter. Theme assets usually reside in the **assets** subdirectory of a theme directory.

```twig
<script type="text/javascript" src="{{ 'assets/js/menu.js'|theme }}"></script>
```

If the website address is __https://octobercms.com__ and the active theme is called `website` the above example would output the following:

```html
<script type="text/javascript" src="http://october.com/themes/website/assets/js/menu.js"></script>
```

## Combining CSS and JavaScript

The filter can also be used to combine assets of the same type by passing an array of files.

```twig
<link href="{{ [
    'assets/css/styles1.css',
    'assets/css/styles2.css'
]|theme }}" rel="stylesheet">
```

> **Note**: You can enable the assets minification with the `enableAssetMinify` parameter in the `config/cms.php` script. By default the minification is disabled.

### Combiner Aliases

The asset combiner supports common aliases that substitute file paths, these will begin with the `@` symbol. For example the [AJAX framework assets](../../cms/ajax/introduction.md) can be included in the combiner.

```twig
<script src="{{ [
    '@framework.extras',
    'assets/javascript/app.js'
]|theme }}"></script>
```

The following aliases are supported:

Alias | Description
------------- | -------------
`@framework` | AJAX framework extras, subsitute for `{% framework %}` tag (JavaScript)
`@framework.extras` | AJAX framework extras, subsitute for `{% framework extras %}` tag (JavaScript, CSS)
`@framework.turbo` | AJAX framework turbo, subsitute for `{% framework turbo %}` tag (JavaScript)
`@framework.bundle` | AJAX framework bundle, subsitute for `{% framework extras turbo %}` tag (JavaScript, CSS)

:: tip
The same alias can be used for JavaScript or CSS, for example `@framework.extras`. At least one other reference with a CSS or JS file extension is needed in the array to determine which to use.
:::

### External Combiner Paths

In some cases you may wish to combine a file outside the theme, this is achieved by prefixing the path with a symbol to create a dynamic path. For example, a path beginning with `~/` will create a path relative to the application:

```twig
<script src="{{ ['~/modules/system/assets/js/framework.js']|theme }}"></script>
```

These symbols are supported for creating dynamic paths:

Symbol | Description
------------- | -------------
`~` | Relative to the application directory
`$` | Relative to the plugins directory
`#` | Relative to the themes directory
