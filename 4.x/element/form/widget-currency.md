---
subtitle: Form Widget
shortname: Currency
---
# Currency Field

The `currency` form widget renders a field for entering a numeric currency value. This field uses the primary currency definition or the **Base Currency** setting selected [Site Definition](../../cms/multisite/multisite.md) area.

::: tip
This field is introduced after installing the [Currency plugin](https://octobercms.com/plugin/responsiv-currency) available on the October CMS marketplace. You may install it with the following command.

```bash
php artisan plugin:install Responsiv.Currency
```
:::

To display a currency input, define a form field like this:

```yaml
total_amount:
    label: Total amount
    type: currency
```

Property | Description
------------- | -------------
**format** | an optional format when previewing the form field, either: `long`, `short` or `null`. Default: `null`.
**currencyFrom** | read the currency code from another model attribute. Supports dot notation for relations. Default: `null`

Use the `format` property to change the format when displaying the form field in a preview context.

```yaml
total_amount:
    label: Total amount
    type: currency
    format: short
```

## Locked Currency

Use the `currencyFrom` property to lock the field to a specific currency stored on the model. This is useful for financial records like orders and invoices where the currency is determined at creation time and should not change when the active site changes.

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

When `currencyFrom` is set, the field input and preview will use the specified currency regardless of the active site currency.

## Currencyable Models

When the currency field is used on a model that implements the `Currencyable` trait, the widget automatically adjusts its behavior based on the active site currency.

On the **primary currency site**, the field behaves as a normal editable input. On a **non-primary currency site**, the field displays the auto-converted value in a read-only state, with the following options:

- **Override**: enables the input for manual entry of a fixed value in the site currency.
- **Clear**: removes the override and reverts to automatic exchange-rate conversion.

This prevents accidental data corruption where a base-currency value could be saved with a non-base currency symbol. Overrides are stored separately from the base value, so clearing an override has no effect on the primary currency data.

To learn more about implementing the `Currencyable` trait on a model, see the [Currency plugin documentation](https://octobercms.com/plugin/responsiv-currency).

#### See Also

::: also
* [Currency Twig Filter](../../markup/filter/currency.md)
* [Currency List Column](../../element/lists/column-currency.md)
* [Currency Plugin Page](https://octobercms.com/plugin/responsiv-currency)
:::
