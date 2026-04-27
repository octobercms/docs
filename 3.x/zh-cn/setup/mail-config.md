---
subtitle: 了解如何设置邮件发送服务。
---
# 邮件配置

October CMS 提供了 SMTP、Mailgun、SparkPost、Amazon SES 和 `sendmail` 的驱动程序，让您可以通过本地或云端服务快速开始发送邮件。

配置邮件服务有两种方式，一种是通过管理面板的**设置 → 邮件设置**，另一种是更新默认配置值。在以下示例中，我们将更新基于文件的配置值。

::: tip
管理面板中的邮件设置界面将覆盖基于文件的配置所提供的设置。点击**恢复默认**按钮将把邮件设置更新为最新值。如果您未在此表单上点击**保存**，则设置将继续从配置文件中读取。
:::

## 驱动程序先决条件

在大多数情况下，您可以使用 SMTP 驱动程序，它受到大多数邮件提供商的支持。不过，使用基于 API 的驱动程序通常是更简单、更快速的方式。

### Mailgun 驱动程序

要使用 Mailgun 驱动程序，请通过 Composer 安装 Symfony 的 Mailgun Mailer 传输组件。

```bash
composer require symfony/mailgun-mailer symfony/http-client
```

接下来，将 `config/mail.php` 配置文件中的 `driver` 选项设置为 `mailgun`。然后，确认您的 `config/services.php` 配置文件包含以下选项：

```php
'mailgun' => [
    'domain' => 'your-mailgun-domain',
    'secret' => 'your-mailgun-key',
    'endpoint' => 'api.mailgun.net', // api.eu.mailgun.net for EU
],
```

### Postmark 驱动程序

要使用 Postmark 驱动程序，请通过 Composer 安装 Symfony 的 Postmark Mailer 传输组件。

```bash
composer require symfony/postmark-mailer symfony/http-client
```

接下来，将应用程序 `config/mail.php` 配置文件中的 `default` 选项设置为 postmark。配置好应用程序的默认邮件发送器后，确认您的 `config/services.php` 配置文件包含以下内容：

```php
'postmark' => [
    'token' => env('POSTMARK_TOKEN'),
],
```

### SES 驱动程序

要使用 Amazon SES 驱动程序，您必须先安装 Amazon AWS SDK for PHP。您可以通过 Composer 包管理器安装此库。

```bash
composer require aws/aws-sdk-php
```

接下来，将 `config/mail.php` 配置文件中的 `driver` 选项设置为 `ses`。然后，确认您的 `config/services.php` 配置文件包含以下选项：

```php
'ses' => [
    'key' => 'your-ses-key',
    'secret' => 'your-ses-secret',
    'region' => 'ses-region',  // e.g. us-east-1
],
```

## 邮件与本地开发

在开发需要发送电子邮件的应用程序时，您可能不希望实际将邮件发送到真实的电子邮件地址。有几种方法可以"禁用"电子邮件的实际发送。

### Log 驱动程序

一种方案是在本地开发时使用 `log` 邮件驱动程序。该驱动程序会将所有电子邮件消息写入日志文件以供检查。有关按环境配置应用程序的更多信息，请查看[配置文档](../setup/configuration.md)。

### 通用收件人

另一种方案是为框架发送的所有电子邮件设置一个通用收件人。这样，应用程序生成的所有邮件都将发送到指定的地址，而不是发送消息时实际指定的地址。这可以通过 `config/mail.php` 配置文件中的 `to` 选项来实现：

```php
'to' => [
    'address' => 'dev@example.tld',
    'name' => 'Dev Example'
],
```

### 模拟邮件模式

您可以使用 `Mail::pretend` 方法动态禁用邮件发送。当邮件发送器处于模拟模式时，消息将被写入应用程序的日志文件，而不是发送给收件人。

```php
Mail::pretend();
```

#### 另请参阅

::: also
* [发送邮件](../extend/system/sending-mail.md)
* [SparkPost Plugin](https://github.com/rainlab/sparkpost-plugin)
:::
