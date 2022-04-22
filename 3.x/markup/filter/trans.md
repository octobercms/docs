# |trans

The `|trans` and `|transchoice` filters translate the value passed in using the applications localization configuration. The localization strings can be loaded by passing the default translation of your string.

```twig
{{ 'I love programming.'|trans }};
```

Replacing parameters in translation strings is possible by passing an array as the first argument. Every parameter is prefixed with a `:` character.

```twig
{{ ':name loves programming.'|trans({ name: 'Jeff' }) }}
```

The `trans_choice` function is used to process pluralized values.

```php
{{ 'There is one apple|There are many apples'|transchoice(3) }}
```

#### See Also

::: also
* [CMS Theme Localization](../../cms/themes/settings.md)
* [Laravel Localization](https://laravel.com/docs/9.x/localization)
:::
