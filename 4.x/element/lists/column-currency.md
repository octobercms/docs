---
subtitle: List Column
shortname: Currency
---
# Currency Column

`currency` - displays the value as a formatted currency

```yaml
total_amount:
    label: Loan amount
    type: currency
```

::: tip
This column is introduced after installing the [Currency plugin](https://octobercms.com/plugin/responsiv-currency) available on the October CMS marketplace. You may install it with the following command.

```bash
php artisan plugin:install Responsiv.Currency
```
:::

The following properties are supported.

Property | Description
------------- | -------------
**format** | provides a display format. Supported values: `long`, `short`, `null`.
**fromCode** | specify the source currency code.
**toCode** | specify the display currency code.
**site** | display the currency using the multisite definition context. Default: `false`
**currencyFrom** | read the currency code from another model attribute. Supports dot notation for relations. Default: `null`

Use the `format` property to display the column value using a longer format.

```yaml
total_amount:
    label: Loan amount
    type: currency
    format: long
```

Set the `site` property to `true` if the model value is stored using the multisite definition. This will automatically set the `toCode` and `fromCode` values for the site definition.

```yaml
total_amount:
    label: Loan amount
    type: currency
    site: true
```

Use the `currencyFrom` property to lock the display currency to a value stored on the record itself. This is useful for financial records like orders and invoices where the currency is determined at creation time and should not change when the active site changes.

```yaml
total:
    label: Total
    type: currency
    currencyFrom: currency_code
```

The property supports dot notation for reading the currency code from a related model.

```yaml
price:
    label: Price
    type: currency
    currencyFrom: order.currency_code
```

::: also
* [Currency Twig Filter](../../markup/filter/currency.md)
* [Currency Form Widget](../../element/form/widget-currency.md)
* [Currency Plugin Page](https://octobercms.com/plugin/responsiv-currency)
:::
