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

The following properties are supported.

Property | Description
------------- | -------------
**format** | provides a display format. Supported values: `long`, `short`, `null`.
**fromCode** | specify the source currency code.
**toCode** | specify the display currency code.
**site** | display the currency using the multisite definition context. Default: `false`

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

::: also
* [Currency Twig Filter](../../markup/filter/currency.md)
* [Currency Form Widget](../../element/form/widget-currency.md)
* [Currency Plugin Page](https://octobercms.com/plugin/responsiv-currency)
:::
