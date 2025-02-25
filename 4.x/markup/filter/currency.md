---
subtitle: Twig Filter
---
# |currency

The `|currency` filter is used to display a currency value.

```twig
{{ 100|currency }}
```

::: tip
This Twig filter is introduced after installing the [Currency plugin](https://octobercms.com/plugin/responsiv-currency) available on the October CMS marketplace. You may install it with the following command.

```bash
php artisan plugin:install Responsiv.Currency
```
:::

The filter takes an options argument, as an array that supports various values.

Option | Description
------ | -----------
**to** | To a given currency code
**from** | From a currency code
**format** | Display format. Options: long, short, null.
**site** | Set to `true` to use currency codes from the site definition. Default: `false`.

For example, to convert an amount from USD to AUD.

```php
{{ 1000|currency({ from: 'USD', to: 'AUD' }) }}
```

If you want to use the base and display currency from the site definition, set the **site** option to `true`.

```php
{{ 1000|currency({ site: true }) }}
```

To display a currency in `long` or `short` format.

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
