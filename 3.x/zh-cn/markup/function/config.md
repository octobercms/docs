---
subtitle: Twig 函数
---
# config()

您可以使用 `config()` 辅助函数访问配置值。它返回配置存储中的当前值。

以下示例将输出当前存储在 `app.locale` 中的值。

```twig
{{ config('app.locale') }}
```

上述代码等同于以下 PHP 代码：

```php
<?= Config::get('app.locale') ?>
```

## env()

名为 `env()` 的伴随函数可用于访问环境变量。

以下示例将输出当前存储在 `APP_ENV` 环境变量中的值。第二个参数是默认值，当 ENV 键不存在时使用。

```twig
{{ env('APP_ENV', 'production') }}
```

上述代码等同于以下 PHP 代码：

```php
<?= env('APP_ENV', 'production') ?>
```

::: warning
当[安全模式启用](../../setup/configuration.md)时，`config()` 和 `env()` 函数不可用。
:::
