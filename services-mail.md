# Mail

- [Introduction](#introduction)
- [Sending mail](#sending-mail)
    - [Attachments](#attachments)
    - [Inline attachments](#inline-attachments)
    - [Queueing mail](#queueing-mail)
- [Message content](#message-content)
    - [Mail views](#mail-views)
    - [Mail templates](#mail-templates)
    - [Mail layouts](#mail-layouts)
    - [Registering mail templates](#mail-template-registration)
    - [Global variables](#mail-global-variables)
- [Mail & local development](#mail-and-local-development)

<a name="introduction"></a>
## Introduction

October provides drivers for SMTP, Mailgun, Mandrill, Amazon SES, PHP's `mail` function, and `sendmail`, allowing you to quickly get started sending mail through a local or cloud based service of your choice. There are two ways to configure mail services, either using the back-end interface via *Settings > Mail settings* or by updating the default configuration values. In these examples we will update the configuration values.

### Driver prerequisites

Before using the Mailgun, Mandrill or SES drivers you will need to install [Drivers plugin](http://octobercms.com/plugin/october-drivers).

#### Mailgun driver

To use the Mailgun driver, set the `driver` option in your `config/mail.php` configuration file to `mailgun`. Next, verify that your `config/services.php` configuration file contains the following options:

    'mailgun' => [
        'domain' => 'your-mailgun-domain',
        'secret' => 'your-mailgun-key',
    ],

#### Mandrill driver

To use the Mandrill driver set the `driver` option in your `config/mail.php` configuration file to `mandrill`. Next, verify that your `config/services.php` configuration file contains the following options:

    'mandrill' => [
        'secret' => 'your-mandrill-key',
    ],

#### SES driver

To use the Amazon SES driver set the `driver` option in your `config/mail.php` configuration file to `ses`. Then, verify that your `config/services.php` configuration file contains the following options:

    'ses' => [
        'key' => 'your-ses-key',
        'secret' => 'your-ses-secret',
        'region' => 'ses-region',  // e.g. us-east-1
    ],

<a name="sending-mail"></a>
## Sending mail

To send a message, use the `send` method on the `Mail` facade which accepts three arguments. The first argument is a unique *mail code* used to locate either the [mail view](#mail-views) or [mail template](#mail-templates). The second argument is an array of data you wish to pass to the view. The third argument is a `Closure` callback which receives a message instance, allowing you to customize the recipients, subject, and other aspects of the mail message:

    // These variables are available inside the message as Twig
    $vars = ['name' => 'Joe', 'user' => 'Mary'];

    Mail::send('acme.blog::mail.message', $vars, function($message) {

        $message->to('admin@domain.tld', 'Admin Person');
        $message->subject('This is a reminder');

    });

Since we are passing an array containing the `name` key in the example above, we could display the value within our e-mail view using the following Twig markup:

    {{ name }}

> **Note:** You should avoid passing a `message` variable in your message, this variable is always passed and allows the [inline embedding of attachments](#attachments).

#### Quick sending

October also includes an alternative method called `sendTo` that can simplify sending mail:

    // Send to address using no name
    Mail::sendTo('admin@domain.tld', 'acme.blog::mail.message', $params);

    // Send using an object's properties
    Mail::sendTo($user, 'acme.blog::mail.message', $params);

    // Send to multiple addresses
    Mail::sendTo(['admin@domain.tld' => 'Admin Person'], 'acme.blog::mail.message', $params);

The first argument in `sendTo()` is used for the recipients can take different value types:

Type | Description
------------- | -------------
String | a single recipient address, with no name defined.
Array | multiple recipients where the array key is the address and the value is the name.
Object | a single recipient object, where the *email* property is used for the address and the *name* is optionally used for the name.
Collection | a collection of recipient objects, as above.

#### Building the message

As previously mentioned, the third argument given to the `send` method is a `Closure` allowing you to specify various options on the e-mail message itself. Using this Closure you may specify other attributes of the message, such as carbon copies, blind carbon copies, etc:

    Mail::send('acme.blog::mail.welcome', $vars, function($message) {

        $message->from('us@example.com', 'October');
        $message->to('foo@example.com')->cc('bar@example.com');

    });

Here is a list of the available methods on the `$message` message builder instance:

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

> **Note:** The message instance passed to a `Mail::send` Closure extends the [SwiftMailer](http://swiftmailer.org) message class, allowing you to call any method on that class to build your e-mail messages.

#### Mailing plain text

By default, the view given to the `send` method is assumed to contain HTML. However, by passing an array as the first argument to the `send` method, you may specify a plain text view to send in addition to the HTML view:

    Mail::send(['acme.blog::mail.html', 'acme.blog::mail.text'], $data, $callback);

Or, if you only need to send a plain text e-mail, you may specify this using the `text` key in the array:

    Mail::send(['text' => 'acme.blog::mail.text'], $data, $callback);

#### Mailing raw strings

You may use the `raw` method if you wish to e-mail a raw string directly:

    Mail::raw('Text to e-mail', function ($message) {
        //
    });

To pass raw HTML and text, set the `raw` array value to `true`:

    Mail::send([
        'text' => 'This is plain text',
        'html' => '<strong>This is HTML</strong>',
        'raw' => true
    ], $data, $callback);

<a name="attachments"></a>
### Attachments

To add attachments to an e-mail, use the `attach` method on the `$message` object passed to your Closure. The `attach` method accepts the full path to the file as its first argument:

    Mail::send('acme.blog::mail.welcome', $data, function ($message) {
        //

        $message->attach($pathToFile);
    });

When attaching files to a message, you may also specify the display name and / or MIME type by passing an `array` as the second argument to the `attach` method:

    $message->attach($pathToFile, ['as' => $display, 'mime' => $mime]);

<a name="inline-attachments"></a>
### Inline attachments

#### Embedding an image in mail content

Embedding inline images into your e-mails is typically cumbersome; however, there is a convenient way to attach images to your e-mails and retrieving the appropriate CID. To embed an inline image, use the `embed` method on the `message` variable within your e-mail view. Remember, the `message` variable is available to all of your mail views:

    <body>
        Here is an image:

        <img src="{{ message.embed(pathToFile) }}">
    </body>

#### Embedding raw data in mail content

If you already have a raw data string you wish to embed into an e-mail message, you may use the `embedData` method on the `message` variable:

    <body>
        Here is an image from raw data:

        <img src="{{ message.embedData(data, name) }}">
    </body>

<a name="queueing-mail"></a>
### Queueing mail

#### Queueing a mail message

Since sending mail messages can drastically lengthen the response time of your application, many developers choose to queue messages for background sending. This is easy using the built-in [unified queue API](../services/queues). To queue a mail message, use the `queue` method on the `Mail` facade:

    Mail::queue('acme.blog::mail.welcome', $data, function ($message) {
        //
    });

This method will automatically take care of pushing a job onto the queue to send the mail message in the background. Of course, you will need to [configure your queues](../services/queues) before using this feature.

#### Delayed message queueing

If you wish to delay the delivery of a queued e-mail message, you may use the `later` method. To get started, simply pass the number of seconds by which you wish to delay the sending of the message as the first argument to the method:

    Mail::later(5, 'acme.blog::mail.welcome', $data, function ($message) {
        //
    });

#### Pushing to specific queues

If you wish to specify a specific queue on which to push the message, you may do so using the `queueOn` and `laterOn` methods:

    Mail::queueOn('queue-name', 'acme.blog::mail.welcome', $data, function ($message) {
        //
    });

    Mail::laterOn('queue-name', 5, 'acme.blog::mail.welcome', $data, function ($message) {
        //
    });

<a name="message-content"></a>
## Message content

Mail messages can be sent in October using either mail views or mail templates. A mail view is supplied by the application or plugin in the file system in the **/views** directory. Whereas a mail template is managed using the back-end interface via *System > Mail templates*. All mail messages support using Twig for markup.

Optionally, mail views can be [registered in the Plugin registration file](#mail-template-registration) with the `registerMailTemplates()` method. This will automatically generate a mail template and allows them to be customized using the back-end interface.

<a name="mail-views"></a>
### Mail views

Mail views reside in the file system and the code used represents the path to the view file. For example sending mail with the code **author.plugin:mail.message** would use the content in following file:

    plugins/                 <=== Plugins directory
      author/                <=== "author" segment
        plugin/              <=== "plugin" segment
          views/             <=== View directory
            mail/            <=== "mail" segment
              message.htm    <=== "message" segment

The content inside a mail view file can include up to 3 sections: **configuration**, **plain text**, and **HTML markup**. Sections are separated with the `==` sequence. For example:

    subject = "Your product has been added to OctoberCMS project"
    ==

    Hi {{ name }},

    Good news! User {{ user }} just added your product "{{ product }}" to a project.

    This message was sent using no formatting (plain text)
    ==

    <p>Hi {{ name }},</p>

    <p>Good news! User {{ user }} just added your product <strong>{{ product }}</strong> to a project.</p>

    <p>This email was sent using formatting (HTML)</p>

> **Note:** Basic Twig tags and expressions are supported in mail views.

The **plain text** section is optional and a view can contain only the configuration and HTML markup sections.

    subject = "Your product has been added to OctoberCMS project"
    ==

    <p>Hi {{ name }},</p>

    <p>This email does not support plain text.</p>

    <p>Sorry about that!</p>

#### Configuration section

The configuration section sets the mail view parameters. The following configuration parameters are supported:

Parameter | Description
------------- | -------------
**subject** | the mail message subject, required.
**layout** | the [mail layout](#mail-layouts) code, optional. Default value is `default`.

<a name="mail-templates"></a>
### Using mail templates

Mail templates reside in the database and can be created in the back-end area via *Settings > Mail > Mail templates*. The **code** specified in the template is a unique identifier and cannot be changed once created.

The process for sending these emails is the same. For example, if you create a template with code *this.is.my.email* you can send it using this PHP code:

    Mail::send('this.is.my.email', $data, function($message) use ($user)
    {
        [...]
    });

> **Note:** If the mail template does not exist in the system, this code will attempt to find a mail view with the same code.

#### Automatically generated templates

Mail templates can also be generated automatically by [mail views that have been registered](#mail-template-registration). The **code** value will be the same as the mail view path (eg: author.plugin:mail.message). If the mail view has a **layout** parameter defined, this will be used to give the template a layout.

When a generated template is saved for the first time, the customized content will be used when sending mail for the assigned code. In this context, the mail view can be considered a *default view*.

<a name="mail-layouts"></a>
### Using mail layouts

Mail layouts can be created by selecting *Settings > Mail > Mail templates* and clicking the *Layouts* tab. These behave just like CMS layouts, they contain the scaffold for the mail message. Mail views and templates support the use of mail layouts.

By default, October comes with two primary mail layouts:

Layout | Code | Description
------------- | ------------- | -------------
Default | default | Used for public facing, front-end mail
System | system | Used for internal, back-end mail

<a name="mail-template-registration"></a>
### Registering mail templates

Mail views can be registered as templates that are automatically generated in the back-end ready for customization. Mail templates can be customized via the *Settings > Mail templates* menu. The templates can be registered by overriding the `registerMailTemplates()` method of the [Plugin registration class](../plugin/registration#registration-file).

    public function registerMailTemplates()
    {
        return [
            'rainlab.user::mail.activate' => 'Activation mail sent to new users.',
            'rainlab.user::mail.restore'  => 'Password reset instructions for front-end users.'
        ];
    }

The method should return an array where the key is the [mail view name](#mail-views) and the value gives a brief description about what the mail template is used for.

<a name="mail-global-variables"></a>
### Global variables

You may register variables that are globally available to all mail templates with the `View::share` method.

    View::share('site_name', 'OctoberCMS');

This code could be called inside the register or boot method of a [plugin registration file](../plugin/registration). Using the above example, the variable `{{ site_name }}` will be available inside all mail templates.

<a name="mail-and-local-development"></a>
## Mail & local development

When developing an application that sends e-mail, you probably don't want to actually send e-mails to live e-mail addresses. There are several ways to "disable" the actual sending of e-mail messages.

#### Log driver

One solution is to use the `log` mail driver during local development. This driver will write all e-mail messages to your log files for inspection. For more information on configuring your application per environment, check out the [configuration documentation](../setup/configuration).

#### Universal to

Another solution is to set a universal recipient of all e-mails sent by the framework. This way, all the emails generated by your application will be sent to a specific address, instead of the address actually specified when sending the message. This can be done via the `to` option in your `config/mail.php` configuration file:

    'to' => [
        'address' => 'dev@domain.com',
        'name' => 'Dev Example'
    ],

#### Pretend mail mode

You can dynamically disable sending mail using the `Mail::pretend` method. When the mailer is in pretend mode, messages will be written to your application's log files instead of being sent to the recipient.

    Mail::pretend();
