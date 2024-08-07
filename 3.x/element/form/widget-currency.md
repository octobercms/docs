---
subtitle: Form Widget
shortname: Currency
---
# Currency Field

The `currency` form widget renders a field for entering a numeric currency value. This field uses the primary currency definition or the **Admin Panel Currency** setting selected [Site Definition](../../cms/resources/multisite.md) area.

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

Use the `format` property to change the format when displaying the form field in a preview context.

```yaml
total_amount:
    label: Total amount
    type: currency
    format: short
```

#### See Also

::: also
* [Currency Plugin Page](https://octobercms.com/plugin/responsiv-currency)
:::
