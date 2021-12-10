# Mail

## Introduction

October CMS provides drivers for SMTP, Mailgun, SparkPost, Amazon SES, PHP's `mail` function, and `sendmail`, allowing you to quickly get started sending mail through a local or cloud based service of your choice. There are two ways to configure mail services, either using the back-end interface via *Settings > Mail settings* or by updating the default configuration values. In these examples we will update the configuration values.

### Driver prerequisites

Before using the Mailgun, SparkPost or SES drivers you will need to install [Drivers plugin](http://octobercms.com/plugin/october-drivers).

#### Mailgun driver

To use the Mailgun driver, set the `driver` option in your `config/mail.php` configuration file to `mailgun`. Next, verify that your `config/services.php` configuration file contains the following options:

```php
'mailgun' => [
    'domain' => 'your-mailgun-domain',
    'secret' => 'your-mailgun-key',
    'endpoint' => 'api.mailgun.net', // api.eu.mailgun.net for EU
],
```

#### SparkPost driver

To use the SparkPost driver set the `driver` option in your `config/mail.php` configuration file to `sparkpost`. Next, verify that your `config/services.php` configuration file contains the following options:

```php
'sparkpost' => [
    'secret' => 'your-sparkpost-key',
],
```

#### SES driver

To use the Amazon SES driver set the `driver` option in your `config/mail.php` configuration file to `ses`. Then, verify that your `config/services.php` configuration file contains the following options:

```php
'ses' => [
    'key' => 'your-ses-key',
    'secret' => 'your-ses-secret',
    'region' => 'ses-region',  // e.g. us-east-1
],
```

## Sending Mail

To send a message, use the `send` method on the `Mail` facade which accepts three arguments. The first argument is a unique *mail code* used to locate either the [mail view](#mail-views) or [mail template](#mail-templates). The second argument is an array of data you wish to pass to the view. The third argument is a `Closure` callback which receives a message instance, allowing you to customize the recipients, subject, and other aspects of the mail message:

```php
// These variables are available inside the message as Twig
$vars = ['name' => 'Joe', 'user' => 'Mary'];

Mail::send('acme.blog::mail.message', $vars, function($message) {

    $message->to('admin@domain.tld', 'Admin Person');
    $message->subject('This is a reminder');

});
```

Since we are passing an array containing the `name` key in the example above, we could display the value within our e-mail view using the following Twig markup:

```twig
{{ name }}
```

> **Note**: You should avoid passing a `message` variable in your message, this variable is always passed and allows the [inline embedding of attachments](#attachments).

#### Quick sending

October also includes an alternative method called `sendTo` that can simplify sending mail:

```php
// Send to address using no name
Mail::sendTo('admin@domain.tld', 'acme.blog::mail.message', $params);

// Send using an object's properties
Mail::sendTo($user, 'acme.blog::mail.message', $params);

// Send to multiple addresses
Mail::sendTo(['admin@domain.tld' => 'Admin Person'], 'acme.blog::mail.message', $params);

// Alternatively send a raw message without parameters
Mail::rawTo('admin@domain.tld', 'Hello friend');
```

The first argument in `sendTo` is used for the recipients can take different value types:

Type | Description
------------- | -------------
String | a single recipient address, with no name defined.
Array | multiple recipients where the array key is the address and the value is the name.
Object | a single recipient object, where the *email* property is used for the address and the *name* is optionally used for the name.
Collection | a collection of recipient objects, as above.

The complete signature of `sendTo` is as follows:

```php
Mail::sendTo($recipient, $message, $params, $callback, $options);
```

- `$recipient` is defined as above.
- `$message` is the template name or message contents for raw sending.
- `$params` array of variables made available inside the template.
- `$callback` gets called with one parameter, the message builder as described for the `send` method (optional, defaults to null). If not a callable value, works as a substitute for the next options argument.
- `$options` custom sending options passed as an array (optional)

The following custom sending `$options` are supported

- **queue** specifies whether to queue the message or send it directly (optional, defaults to false).
- **bcc** specifies whether to add recipients as Bcc or regular To addresses (defaults to false).

#### Building the message

As previously mentioned, the third argument given to the `send` method is a `Closure` allowing you to specify various options on the e-mail message itself. Using this Closure you may specify other attributes of the message, such as carbon copies, blind carbon copies, etc:

```php
Mail::send('acme.blog::mail.welcome', $vars, function($message) {
    $message->from('us@example.com', 'October');
    $message->to('foo@example.com')->cc('bar@example.com');
});
```

Here is a list of the available methods on the `$message` message builder instance:

```php
$message->from($address, $name = null);
$message->sender($address, $name = null);
$message->to($address, $name = null);
$message->cc($address, $name = null);
$message->bcc($address, $name = null);
$message->replyTo($address, $name = null);
$message->subject($subject);
$message->priority($level);
$message->attach($pathToFile, array $options = []);

// Attach a file from a raw $data string...
$message->attachData($data, $name, array $options = []);

// Get the underlying SwiftMailer message instance...
$message->getSwiftMessage();
```

> **Note**: The message instance passed to a `Mail::send` Closure extends the [SwiftMailer](http://swiftmailer.org) message class, allowing you to call any method on that class to build your e-mail messages.

#### Mailing plain text

By default, the view given to the `send` method is assumed to contain a [mail view](#mail-views), where you may specify a plain text view to send in addition to the HTML view.

```php
Mail::send('acme.blog::mail.message', $data, $callback);
```

Or, if you only need to send a plain text e-mail, you may specify this using the `text` key in the array:

```php
Mail::send(['text' => 'acme.blog::mail.text'], $data, $callback);
```

#### Mailing parsed raw strings

You may use the `raw` method if you wish to e-mail a raw string directly. This content will be parsed by Markdown.

```php
Mail::raw('Text to e-mail', function ($message) {
    //
});
```

Additionally this string will be parsed by Twig, if you wish to pass variables to this environment, use the `send` method instead, passing the content as the `raw` key.

```php
Mail::send(['raw' => 'Text to email'], $vars, function ($message) {
    //
});
```

#### Mailing raw strings

If you pass an array containing either `text` or `html` keys, this will be an explicit request to send mail. No layout or markdown parsing is used.

```php
Mail::raw([
    'text' => 'This is plain text',
    'html' => '<strong>This is HTML</strong>'
], function ($message) {
    //
});
```

### Attachments

To add attachments to an e-mail, use the `attach` method on the `$message` object passed to your Closure. The `attach` method accepts the full path to the file as its first argument:

```php
Mail::send('acme.blog::mail.welcome', $data, function ($message) {
    //

    $message->attach($pathToFile);
});
```

When attaching files to a message, you may also specify the display name and / or MIME type by passing an `array` as the second argument to the `attach` method:

```php
$message->attach($pathToFile, ['as' => $display, 'mime' => $mime]);
```

### Inline Attachments

#### Embedding an image in mail content

Embedding inline images into your e-mails is typically cumbersome; however, there is a convenient way to attach images to your e-mails and retrieving the appropriate CID. To embed an inline image, use the `embed` method on the `message` variable within your e-mail view. Remember, the `message` variable is available to all of your mail views:

```twig
<body>
    Here is an image:

    <img src="{{ message.embed(pathToFile) }}">
</body>
```

If you are planning to use queued emails make sure that the path of the file is absolute. To achieve that you can simply use the [app filter](../markup/filter-app.md):

```twig
<body>
    Here is an image:
    {% set pathToFile = 'storage/app/media/path/to/file.jpg'|app %}
    <img src="{{ message.embed(pathToFile) }}">
</body>
```

#### Embedding raw data in mail content

If you already have a raw data string you wish to embed into an e-mail message, you may use the `embedData` method on the `message` variable:

```twig
<body>
    Here is an image from raw data:

    <img src="{{ message.embedData(data, name) }}">
</body>
```

### Queueing Mail

#### Queueing a mail message

Since sending mail messages can drastically lengthen the response time of your application, many developers choose to queue messages for background sending. This is easy using the built-in [unified queue API](../services/queues.md). To queue a mail message, use the `queue` method on the `Mail` facade:

```php
Mail::queue('acme.blog::mail.welcome', $data, function ($message) {
    //
});
```

This method will automatically take care of pushing a job onto the queue to send the mail message in the background. Of course, you will need to [configure your queues](../services/queues.md) before using this feature.

#### Delayed message queueing

If you wish to delay the delivery of a queued e-mail message, you may use the `later` method. To get started, simply pass the number of seconds by which you wish to delay the sending of the message as the first argument to the method:

```php
Mail::later(5, 'acme.blog::mail.welcome', $data, function ($message) {
    //
});
```

#### Pushing to specific queues

If you wish to specify a specific queue on which to push the message, you may do so using the `queueOn` and `laterOn` methods:

```php
Mail::queueOn('queue-name', 'acme.blog::mail.welcome', $data, function ($message) {
    //
});

Mail::laterOn('queue-name', 5, 'acme.blog::mail.welcome', $data, function ($message) {
    //
});
```

## Message Content

Mail messages can be sent in October using either mail views or mail templates. A mail view is supplied by the application or plugin in the file system in the **/views** directory. Whereas a mail template is managed using the back-end interface via *System > Mail templates*. All mail messages support using Twig for markup.

Optionally, mail views can be [registered in the Plugin registration file](#registering-mail-layouts-templates-partials) with the `registerMailTemplates` method. This will automatically generate a mail template and allows them to be customized using the back-end interface.

### Mail Views

Mail views reside in the file system and the code used represents the path to the view file. For example sending mail with the code **author.plugin::mail.message** would use the content in following file:

::: dir
├── plugins
|   └── author       _<== "author" Segment_
|       └── myplugin _<== "plugin" Segment_
|           └── `views`
|               └── mail            _<== "mail" Segment_
|                   └── message.htm _<== "message" Segment_
:::

The content inside a mail view file can include up to 3 sections: **configuration**, **plain text**, and **HTML markup**. Sections are separated with the `==` sequence. For example:

```twig
subject = "Your product has been added to October CMS project"
==

Hi {{ name }},

Good news! User {{ user }} just added your product "{{ product }}" to a project.

This message was sent using no formatting (plain text)
==

<p>Hi {{ name }},</p>

<p>Good news! User {{ user }} just added your product <strong>{{ product }}</strong> to a project.</p>

<p>This email was sent using formatting (HTML)</p>
```

> **Note**: Basic Twig tags and expressions are supported in mail views. Markdown syntax is also supported, see the section on [using HTML in Markdown](../services/parser.md#using-html-in-markdown) for more details.

The **plain text** section is optional and a view can contain only the configuration and HTML markup sections.

```twig
subject = "Your product has been added to October CMS project"
==

<p>Hi {{ name }},</p>

<p>This email does not support plain text.</p>

<p>Sorry about that!</p>
```

#### Configuration section

The configuration section sets the mail view parameters. The following configuration parameters are supported:

Parameter | Description
------------- | -------------
**subject** | the mail message subject, required.
**layout** | the [mail layout](#mail-layouts) code, optional. Default value is `default`.

### Using Mail Templates

Mail templates reside in the database and can be created in the back-end area via *Settings > Mail > Mail templates*. The **code** specified in the template is a unique identifier and cannot be changed once created.

The process for sending these emails is the same. For example, if you create a template with code *this.is.my.email* you can send it using this PHP code:

```php
Mail::send('this.is.my.email', $data, function($message) use ($user)
{
    [...]
});
```

> **Note**: If the mail template does not exist in the system, this code will attempt to find a mail view with the same code.

#### Automatically generated templates

Mail templates can also be generated automatically by [mail views that have been registered](#registering-mail-layouts-templates-partials). The **code** value will be the same as the mail view path (eg: author.plugin:mail.message). If the mail view has a **layout** parameter defined, this will be used to give the template a layout.

When a generated template is saved for the first time, the customized content will be used when sending mail for the assigned code. In this context, the mail view can be considered a *default view*.

### Using Mail Layouts

Mail layouts can be created by selecting *Settings > Mail > Mail templates* and clicking the *Layouts* tab. These behave just like CMS layouts, they contain the scaffold for the mail message. Mail views and templates support the use of mail layouts.

By default, October comes with two primary mail layouts:

Layout | Code | Description
------------- | ------------- | -------------
Default | default | Used for public facing, front-end mail
System | system | Used for internal, back-end mail

### Registering mail layouts, templates & partials

Mail views can be registered as templates that are automatically generated in the back-end ready for customization. Mail templates can be customized via the *Settings > Mail templates* menu. The templates can be registered by overriding the `registerMailTemplates` method of the [Plugin registration class](../plugin/registration.md#registration-file).

```php
public function registerMailTemplates()
{
    return [
        'rainlab.user::mail.activate',
        'rainlab.user::mail.restore'
    ];
}
```

The method should return an array of [mail view names](#mail-views).

Like templates, mail partials and layouts can be registered by overriding the `registerMailPartials` and `registerMailLayouts` methods of the [Plugin registration class](../plugin/registration.md#registration-file).

```php
public function registerMailPartials()
{
    return [
        'tracking'  => 'acme.blog::partials.tracking',
        'promotion' => 'acme.blog::partials.promotion',
    ];
}

public function registerMailLayouts()
{
    return [
        'marketing'    => 'acme.blog::layouts.marketing',
        'notification' => 'acme.blog::layouts.notification',
    ];
}
```

The methods should return an array of [mail view names](#mail-views). The array key will be used as `code` property for the partial or layout.

### Global Variables

You may register variables that are globally available to all mail templates with the `View::share` method.

```php
View::share('site_name', 'October CMS');
```

This code could be called inside the register or boot method of a [plugin registration file](../plugin/registration.md). Using the above example, the variable `{{ site_name }}` will be available inside all mail templates.

## Mail & local development

When developing an application that sends e-mail, you probably don't want to actually send e-mails to live e-mail addresses. There are several ways to "disable" the actual sending of e-mail messages.

#### Log driver

One solution is to use the `log` mail driver during local development. This driver will write all e-mail messages to your log files for inspection. For more information on configuring your application per environment, check out the [configuration documentation](../setup/configuration.md).

#### Universal to

Another solution is to set a universal recipient of all e-mails sent by the framework. This way, all the emails generated by your application will be sent to a specific address, instead of the address actually specified when sending the message. This can be done via the `to` option in your `config/mail.php` configuration file:

```php
'to' => [
    'address' => 'dev@example.com',
    'name' => 'Dev Example'
],
```

#### Pretend mail mode

You can dynamically disable sending mail using the `Mail::pretend` method. When the mailer is in pretend mode, messages will be written to your application's log files instead of being sent to the recipient.

```php
Mail::pretend();
```
