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
