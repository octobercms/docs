---
subtitle: 列表列
shortname: Currency
---
# Currency 列

`currency` - 将值显示为格式化的货币

```yaml
total_amount:
    label: Loan amount
    type: currency
```

::: tip
此列需要在 October CMS 市场上安装 [Currency 插件](https://octobercms.com/plugin/responsiv-currency)后才能使用。您可以使用以下命令安装它。

```bash
php artisan plugin:install Responsiv.Currency
```
:::

支持以下属性。

属性 | 描述
------------- | -------------
**format** | 提供显示格式。支持的值：`long`、`short`、`null`。
**fromCode** | 指定源货币代码。
**toCode** | 指定显示货币代码。
**site** | 使用多站点定义上下文显示货币。默认值：`false`

使用 `format` 属性以较长格式显示列值。

```yaml
total_amount:
    label: Loan amount
    type: currency
    format: long
```

如果模型值使用多站点定义存储，请将 `site` 属性设置为 `true`。这将自动为站点定义设置 `toCode` 和 `fromCode` 值。

```yaml
total_amount:
    label: Loan amount
    type: currency
    site: true
```

::: also
* [Currency Twig 过滤器](../../markup/filter/currency.md)
* [Currency 表单小部件](../../element/form/widget-currency.md)
* [Currency 插件页面](https://octobercms.com/plugin/responsiv-currency)
:::
