---
subtitle: Twig Filter
---
# |trans

The `|trans` and `|trans_choice` filters translate the value passed in using the applications localization configuration. The localization strings can be loaded by passing the default translation of your string.

```twig
{{ 'I love programming.'|trans }};
```

Replacing parameters in translation strings is possible by passing an array as the first argument. Every parameter is prefixed with a `:` character.

```twig
{{ ':name loves programming.'|trans({ name: 'Jeff' }) }}
```

## Pluralization

The `trans_choice` function is used to process pluralized values.

```twig
{{ 'There is one apple|There are many apples'|trans_choice(3) }}
```

The second argument can contain the parameters.

```twig
{{ '{1} :value minute ago|[2,*] :value minutes ago'|trans_choice(5, { value: 5 }) }}
```

## Shorter Syntax

The `_` and `__` filters are interchangable with the `trans` and `trans_choice` filters.

```twig
{{ 'I love programming.'|_ }}

{{ '{1} :value minute ago|[2,*] :value minutes ago'|__(1, { value: 1 }) }}
```

#### See Also

::: also
* [CMS Theme Localization](../../cms/themes/settings.md)
* [Laravel Localization](https://laravel.com/docs/10.x/localization)
:::
