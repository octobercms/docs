---
subtitle: 表单小部件
shortname: Currency
---
# Currency 字段

`currency` 表单小部件渲染一个用于输入数字货币值的字段。此字段使用主要货币定义或在[站点定义](../../cms/resources/multisite.md)区域中选择的 **Base Currency** 设置。

::: tip
此字段需要在 October CMS 市场上安装 [Currency 插件](https://octobercms.com/plugin/responsiv-currency)后才能使用。您可以使用以下命令安装它。

```bash
php artisan plugin:install Responsiv.Currency
```
:::

要显示货币输入，请按如下方式定义表单字段：

```yaml
total_amount:
    label: Total amount
    type: currency
```

属性 | 描述
------------- | -------------
**format** | 预览表单字段时的可选格式，可选：`long`、`short` 或 `null`。默认值：`null`。

使用 `format` 属性更改在预览上下文中显示表单字段时的格式。

```yaml
total_amount:
    label: Total amount
    type: currency
    format: short
```

#### 另请参阅

::: also
* [Currency Twig 过滤器](../../markup/filter/currency.md)
* [Currency 列表列](../../element/lists/column-currency.md)
* [Currency 插件页面](https://octobercms.com/plugin/responsiv-currency)
:::
