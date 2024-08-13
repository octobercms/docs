---
subtitle: Twig Filter
---
# |currency

The `|currency` filter

```twig
{{ 100|currency }}
```

This method takes an options argument, as an array that supports various values.

- to: To a given currency code
- from: From a currency code
- format: Display format. Options: long, short, null.

For example, to convert an amount from USD to AUD:

```php
{{ 1000|currency({ from: 'USD', to: 'AUD' }) }}
```

To display a currency in long or short format

```php
// $10.00
{{ 1000|currency({ format: '' }) }}

// $10.00 USD
{{ 1000|currency({ format: 'long' }) }}

// $10
{{ 1000|currency({ format: 'short' }) }}
```

## PHP Interface

You may interact with the currency functions via the global `Currency` facade.

For example, to convert an amount from USD to AUD:

```php
Currency::format(1000, ['from' => 'USD', 'to' => 'AUD']);
```

To display a currency in long or short format

```php
// $10.00 USD
Currency::format(1000, ['format' => 'long']);

// $10
Currency::format(1000, ['format' => 'short']);
```


#### See Also

::: also
* [Currency Form Widget](../../element/form/widget-currency.md)
* [Currency List Column](../../element/lists/column-currency.md)
* [Currency Plugin Page](https://octobercms.com/plugin/responsiv-currency)
:::
