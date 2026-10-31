---
previousPath: setup/mail-config.md
subtitle: Configure the mail service October CMS uses to send email, and stop real emails going out during development.
---
# Mail Configuration

October CMS sends mail through SMTP, Mailgun, Postmark, Amazon SES or `sendmail`, so you can use a local or cloud-based service of your choice. Set the mailer in the `.env` file, or in the backend panel under **Settings → Mail Configuration**.

```ini
MAIL_MAILER=smtp
MAIL_HOST=smtp.example.tld
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_FROM_ADDRESS=noreply@example.tld
MAIL_FROM_NAME="${APP_NAME}"
```

The `.env.example` file that a new installation starts from sets `MAIL_MAILER=log`, which writes messages to the log file instead of sending them. Change it when you are ready to send real mail.

::: tip
The mail settings in the backend panel override the file-based configuration once you click **Save** on that form. Until then, the settings come from the configuration files. Clicking **Reset to Default** reloads the form with the values from the configuration files. To remove the backend option entirely, set `force_mail_setting` to `true` in the `config/backend.php` file.
:::

## Using an API Driver

The SMTP driver works with most mail providers. API-based drivers are often simpler and faster. To use one, install its Composer package, set the `default` option in the `config/mail.php` file (or the `MAIL_MAILER` variable) to the driver name, and add your credentials to the `config/services.php` file.

### Mailgun Driver

To use the Mailgun driver, install Symfony's Mailgun Mailer transport with Composer.

```bash
composer require symfony/mailgun-mailer symfony/http-client
```

Set the `default` option in your `config/mail.php` file to `mailgun`. Then check that your `config/services.php` file contains these options:

```php
'mailgun' => [
    'domain' => 'your-mailgun-domain',
    'secret' => 'your-mailgun-key',
    'endpoint' => 'api.mailgun.net', // api.eu.mailgun.net for EU
],
```

### Postmark Driver

To use the Postmark driver, install Symfony's Postmark Mailer transport with Composer.

```bash
composer require symfony/postmark-mailer symfony/http-client
```

Set the `default` option in your `config/mail.php` file to `postmark`. Then check that your `config/services.php` file contains these options:

```php
'postmark' => [
    'token' => env('POSTMARK_TOKEN'),
],
```

### Amazon SES Driver

To use the Amazon SES driver, install the Amazon AWS SDK for PHP with Composer.

```bash
composer require aws/aws-sdk-php
```

Set the `default` option in your `config/mail.php` file to `ses`. Then check that your `config/services.php` file contains these options:

```php
'ses' => [
    'key' => 'your-ses-key',
    'secret' => 'your-ses-secret',
    'region' => 'ses-region',  // e.g. us-east-1
],
```

SparkPost is available through the [SparkPost plugin](https://github.com/rainlab/sparkpost-plugin).

## Testing Mail During Development

During development you probably don't want to send emails to real addresses. There are several ways to stop messages from being delivered.

### Writing Mail to the Log

Use the `log` mail driver during local development. It writes every email message to your log files for inspection. To use different settings for each environment, see [Configuration](./configuration.md#using-a-different-file-per-environment).

```ini
MAIL_MAILER=log
```

### Sending All Mail to One Address

You can set a universal recipient for every email the application sends. Messages then go to that address instead of the address specified when sending. Set this with the `to` option in your `config/mail.php` file:

```php
'to' => [
    'address' => 'dev@example.tld',
    'name' => 'Dev Example'
],
```

The `to` option reads its values from the `MAIL_TO_ADDRESS` and `MAIL_TO_NAME` environment variables.

### Pretending to Send Mail

You can turn off mail sending at runtime with the `Mail::pretend` method. In pretend mode, messages are written to your application's log files instead of being sent.

```php
Mail::pretend();
```

#### See Also

::: also
* [Sending Mail](../backend/services/mail.md)
* [SparkPost Plugin](https://github.com/rainlab/sparkpost-plugin)
:::
