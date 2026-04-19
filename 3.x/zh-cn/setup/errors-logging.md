---
subtitle: 查找有关您网站的错误和其他日志消息。
---
# 错误与日志

当您首次开始使用 October CMS 时，错误和异常处理已经为您配置好了。有两种方式可以访问事件日志：

1. 可以通过打开文件 `storage/logs/system.log` 在文件系统中查看事件日志。
1. 也可以通过后台面板导航到 **设置 → 事件日志** 来查看。

当显示错误页面时以及对于某些[异常类型](../extend/system/exceptions.md)，日志条目会自动创建。

## 配置

#### 错误详情

您的应用程序通过浏览器显示的错误详细程度由 `config/app.php` 配置文件中的 `debug` 配置选项控制。默认情况下，详细错误报告处于*开启*状态，这有助于查看详细的错误信息，对于调试和排查问题非常有用。当此功能关闭时，如果页面出现问题，将显示一条通用错误消息。

对于本地开发，您应该将 `debug` 值设置为 `true`。在生产环境中，此值应始终为 `false`。

```php
/*
|--------------------------------------------------------------------------
| Application Debug Mode
|--------------------------------------------------------------------------
|
| When your application is in debug mode, detailed error messages with
| stack traces will be shown on every error that occurs within your
| application. If disabled, a simple generic error page is shown.
|
*/

'debug' => false,
```

#### 日志文件模式

October CMS 支持多种驱动，包括 `single`、`daily`、`syslog` 和 `errorlog` 日志模式。例如，如果您希望使用每日日志文件而不是单个文件，只需在 `config/logging.php` 配置文件中设置 `default` 值即可：

```php
'default' => env('LOG_CHANNEL', 'daily'),
```

#### 另请参阅

::: also
* [Laravel Logging Documentation](https://laravel.com/docs/10.x/logging)
:::
