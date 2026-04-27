---
subtitle: Twig 过滤器
---
# |currency

`|currency` 过滤器用于显示货币值。

```twig
{{ 100|currency }}
```

::: tip
此 Twig 过滤器在安装 October CMS 市场上提供的 [Currency 插件](https://octobercms.com/plugin/responsiv-currency)后引入。您可以使用以下命令安装它。

```bash
php artisan plugin:install Responsiv.Currency
```
:::

该过滤器接受一个选项参数，作为支持多种值的数组。

Option | Description
------ | -----------
**to** | 目标货币代码
**from** | 源货币代码
**format** | 显示格式。选项：long、short、null。
**site** | 设置为 `true` 以使用站点定义中的货币代码。默认值：`false`。

例如，将金额从 USD 转换为 AUD。

```php
{{ 1000|currency({ from: 'USD', to: 'AUD' }) }}
```

如果您想使用站点定义中的基础货币和显示货币，请将 **site** 选项设置为 `true`。

```php
{{ 1000|currency({ site: true }) }}
```

以 `long` 或 `short` 格式显示货币。

```php
// $10.00
{{ 1000|currency({ format: '' }) }}

// $10.00 USD
{{ 1000|currency({ format: 'long' }) }}

// $10
{{ 1000|currency({ format: 'short' }) }}
```

## PHP 接口

您可以通过全局 `Currency` facade 与货币函数交互。

例如，将金额从 USD 转换为 AUD：

```php
Currency::format(1000, ['from' => 'USD', 'to' => 'AUD']);
```

以 long 或 short 格式显示货币

```php
// $10.00 USD
Currency::format(1000, ['format' => 'long']);

// $10
Currency::format(1000, ['format' => 'short']);
```


#### 参见

::: also
* [货币表单小部件](../../element/form/widget-currency.md)
* [货币列表列](../../element/lists/column-currency.md)
* [Currency 插件页面](https://octobercms.com/plugin/responsiv-currency)
:::
