---
subtitle: Twig Function
---
# trans()

The `trans()` or `__()` function is the preferred way to translate strings in your theme, using the applications localization configuration. The localization strings can be loaded by passing the default translation of your string.

```twig
{{ __('I love programming.') }}
```

The `trans()` function is interchangable with the `__()` function.

```twig
{{ trans('I love programming.') }}
```

Replacing parameters in translation strings is possible by passing an array as the second argument. Every parameter is prefixed with a `:` character.

```twig
{{ __(':name loves programming.', { name: 'Jeff' }) }}
```

## Pluralization

The `trans_choice()` function is used to process pluralized values, where the second argument determines the count.

```twig
{{ trans_choice('There is one apple|There are many apples', 3) }}
```

The third argument can contain the parameters.

```twig
{{ trans_choice('{1} :value minute ago|[2,*] :value minutes ago', 5, { value: 5 }) }}
```

## Filter Syntax

The `|trans`, `|_` and `|__` filters are also available as an alternative to the function syntax, where `|trans` and `|_` translate a string and `|__` processes pluralized values.

```twig
{{ 'I love programming.'|trans }}

{{ 'I love programming.'|_ }}

{{ '{1} :value minute ago|[2,*] :value minutes ago'|__(1, { value: 1 }) }}
```

#### See Also

::: also
* [CMS Theme Localization](../../cms/multisite/localization.md)
* [Laravel Localization](https://laravel.com/docs/12.x/localization)
:::
