---
previousPath: extend/system/sending-mail.md
subtitle: Send email from your plugin using mail views and templates that administrators can customize in the backend panel.
---
# Sending Mail

The `Mail` facade sends email using a mail view from your plugin or a mail template managed in the backend panel. Mail content supports Twig tags and expressions, as well as Markdown syntax.

For example, create a mail view in the file **plugins/acme/blog/views/mail/message.htm**.

::: cmstemplate
```ini
subject = "Your product has been added to a project"
```
```twig
Hi {{ name }},

**Good news!** User {{ user }} just added your product to a project.
```
:::

Then send it with the `Mail::sendTo` method, passing the recipient, the view code and the variables for the message.

```php
Mail::sendTo('admin@domain.tld', 'acme.blog::mail.message', [
    'name' => 'Joe',
    'user' => 'Mary'
]);
```

## Mail Views and Mail Templates

You can send a message using either a mail view or a mail template.

- A **mail view** is a file supplied by your application or plugin in its **views** directory.
- A **mail template** is stored in the database and managed in the backend panel under **Settings → Mail Templates**.

You can also register mail views in the [plugin registration file](../plugins/extending.md) with the `registerMailTemplates` method. This seeds a mail template for each view, so administrators can customize it in the backend panel. See [Registering Templates, Layouts and Partials](#registering-templates-layouts-and-partials) below.

## Creating a Mail View

The code of a mail view is the path to the view file. For example, sending mail with the code `author.plugin::mail.message` uses the content of the following file.

::: dir
├── plugins
|   └── author  _← "author" Segment_
|       └── myplugin  _← "plugin" Segment_
|           └── `views`
|               └── mail  _← "mail" Segment_
|                   └── message.htm  _← "message" Segment_
:::

A mail view can have up to three sections, separated by the `==` sequence: **configuration**, **plain text** and **HTML markup**.

::: cmstemplate
```ini
subject = "Your product has been added to October CMS project"
```
```twig
Hi {{ name }},

Good news! User {{ user }} just added your product "{{ product }}" to a project.

This message was sent using no formatting (plain text)
```
```twig
<p>Hi {{ name }},</p>

<p>
    <strong>Good news!</strong>
    User {{ user }} just added your product "{{ product }}" to a project.
</p>

<p>This email was sent using formatting (HTML)</p>
```
:::

The **plain text** section is optional, so a view can contain only the **configuration** and **HTML markup** sections. The markup section also accepts Markdown syntax. See [Using HTML in Markdown](./parser.md#using-html-in-markdown) for how the two combine.

::: cmstemplate
```ini
layout = "default"
subject = "Your product has been added to October CMS project"
```
```twig
Hi {{ name }},

**Good news!** User {{ user }} just added your product "{{ product }}" to a project.
```
:::

### Configuration Section

The configuration section sets the properties of the mail view. The following properties are supported.

Property | Description
------------- | -------------
**subject** | the mail message subject, required.
**layout** | the mail layout code or view, optional. Default value is `default`.

### Using Twig in Subject Lines

The subject line supports Twig variables and expressions, so you can build the subject from the same data passed to the message body.

```ini
subject = "Invoice #{{ invoice.number }} - {{ invoice.customer_name }}"
==
```

Common examples include the following.

- Order confirmations: `subject = "Order #{{ order.number }} confirmed"`
- Invoice notifications: `subject = "Invoice #{{ invoice.number }} is ready"`
- Password resets: `subject = "Password reset for {{ user.email }}"`
- Reservation confirmations: `subject = "Reservation #{{ reservation.id }} for {{ reservation.date }}"`

## Sending a Message

Use the `send` method of the `Mail` facade, which accepts three arguments.

1. A unique mail code, used to find the mail view or mail template.
2. An array of data to pass to the view.
3. A closure that receives a message instance, where you set the recipients, subject and other parts of the message.

```php
// These variables are available inside the message as Twig
$vars = ['name' => 'Joe', 'user' => 'Mary'];

Mail::send('acme.blog:message', $vars, function($message) {
    $message->to('admin@domain.tld', 'Admin Person');
    $message->subject('This is a reminder');
});
```

Since the data contains a `name` key, you can display its value in the mail view with the following Twig markup.

```twig
{{ name }}
```

::: warning
Avoid passing a `message` variable in your data. This variable is always passed to the view and is used for embedding inline attachments.
:::

### Sending to a Recipient

The `sendTo` method is a shorter way to send mail, with the recipients as the first argument.

```php
// Send to address using no name
Mail::sendTo('admin@domain.tld', 'acme.blog:message', $params);

// Send using an object's properties
Mail::sendTo($user, 'acme.blog:message', $params);

// Send to multiple addresses
Mail::sendTo(['admin@domain.tld' => 'Admin Person'], 'acme.blog:message', $params);

// Alternatively send a raw message without parameters
Mail::rawTo('admin@domain.tld', 'Hello friend');
```

The recipients argument accepts the following value types.

Type | Description
------------- | -------------
String | a single recipient address, with no name defined.
Array | multiple recipients where the array key is the address and the value is the name.
Object | a single recipient object, where the *email* property is used for the address and the *name* is optionally used for the name.
Collection | a collection of recipient objects, as above.

The complete signature of `sendTo` is as follows.

```php
Mail::sendTo($recipient, $message, $params, $callback, $options);
```

- `$recipient` is one of the types above.
- `$message` is the template name, or the message contents for raw sending.
- `$params` is an array of variables made available inside the template.
- `$callback` is called with one parameter, the message builder described for the `send` method. It is optional and defaults to `null`. If the value is not callable, it is used as the `$options` argument instead.
- `$options` is an array of custom sending options, optional.

The following sending options are supported.

Option | Description
------------- | -------------
**queue** | specifies whether to queue the message or send it directly, optional. Default: `false`.
**bcc** | specifies whether to add recipients as Bcc or regular To addresses. Default: `false`.

### Building the Message

The closure passed to the `send` method lets you set other parts of the message, such as carbon copies and blind carbon copies.

```php
Mail::send('acme.blog:welcome', $vars, function($message) {
    $message->from('us@example.tld', 'October');
    $message->to('foo@example.tld')->cc('bar@example.tld');
});
```

The `$message` builder instance has the following methods.

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
```

### Sending Plain Text

By default, the code given to the `send` method refers to a mail view, which can include a plain text section alongside the HTML section.

```php
Mail::send('acme.blog:message', $data, $callback);
```

To send only a plain text email, pass the view with the `text` key in an array.

```php
Mail::send(['text' => 'acme.blog:text'], $data, $callback);
```

### Sending a Raw String

Use the `raw` method to email a string directly. The content is parsed as Markdown.

```php
Mail::raw('Text to e-mail', function ($message) {
    //
});
```

The string is also parsed by Twig. To pass variables to it, use the `send` method instead and pass the content with the `raw` key.

```php
Mail::send(['raw' => 'Text to email'], $vars, function ($message) {
    //
});
```

To send the content exactly as written, pass an array with the `text` or `html` keys. No layout or Markdown parsing is applied.

```php
Mail::raw([
    'text' => 'This is plain text',
    'html' => '<strong>This is HTML</strong>'
], function ($message) {
    //
});
```

### Attaching Files

Use the `attach` method of the `$message` object passed to your closure, with the full path to the file as the first argument.

```php
Mail::send('acme.blog:welcome', $data, function ($message) {
    //

    $message->attach($pathToFile);
});
```

To set the display name or MIME type of the file, pass an array as the second argument.

```php
$message->attach($pathToFile, ['as' => $display, 'mime' => $mime]);
```

### Embedding Images

To embed an inline image, use the `embed` method of the `message` variable in your mail view. The `message` variable is available in every mail view, and the method returns the CID for the attached image.

```twig
<body>
    Here is an image:

    <img src="{{ message.embed(pathToFile) }}">
</body>
```

If you queue the message, make sure the file path is absolute. Use the [app filter](../../handbook/twig-filters/app.md) to build it.

```twig
<body>
    Here is an image:
    {% set pathToFile = 'storage/app/media/path/to/file.jpg'|app %}
    <img src="{{ message.embed(pathToFile) }}">
</body>
```

To embed raw data that you already have as a string, use the `embedData` method of the `message` variable.

```twig
<body>
    Here is an image from raw data:

    <img src="{{ message.embedData(data, name) }}">
</body>
```

## Queueing Mail

Sending mail can slow down the response time of your application, so you may want to send messages in the background with the [queue service](./queue.md). Use the `queue` method of the `Mail` facade to queue a message.

```php
Mail::queue('acme.blog:welcome', $data, function ($message) {
    //
});
```

This method pushes a job onto the queue that sends the message in the background. [Configure your queues](./queue.md) before using this feature.

### Delaying a Message

Use the `later` method to delay the delivery of a queued message. Pass the number of seconds to wait as the first argument.

```php
Mail::later(5, 'acme.blog:welcome', $data, function ($message) {
    //
});
```

### Pushing to a Specific Queue

Use the `queueOn` and `laterOn` methods to push the message onto a named queue.

```php
Mail::queueOn('queue-name', 'acme.blog:welcome', $data, function ($message) {
    //
});

Mail::laterOn('queue-name', 5, 'acme.blog:welcome', $data, function ($message) {
    //
});
```

## Registering Templates, Layouts and Partials

::: aside
The **code** value in the backend panel will be the same as the mail view path. For example, `author.plugin:mail.message`.
:::

You can register mail views as default templates in the backend panel by overriding the `registerMailTemplates` method of the [plugin registration file](../plugins/extending.md). Templates can use partials and layouts, similar to CMS themes, which you register with the `registerMailPartials` and `registerMailLayouts` methods.

```php
public function registerMailTemplates()
{
    return [
        // ...Templates defined here
    ];
}

public function registerMailLayouts()
{
    return [
        // ...Layouts defined here
    ];
}

public function registerMailPartials()
{
    return [
        // ...Partials defined here
    ];
}
```

When an administrator saves a generated template in the backend panel for the first time, the customized content is used when sending mail with that code. The registered mail views then act as default, or fallback, views.

### Registering a Template

The `registerMailTemplates` method returns an array where the key is the template code and the value is the name of a [view path](./response-view.md). Use the template code to refer to the template.

```php
public function registerMailTemplates()
{
    return [
        'rainlab.user:activate' => 'rainlab.user::mail.activate',
        'rainlab.user:restore' => 'rainlab.user::mail.restore',
    ];
}
```

Send a message using the template code.

```php
Mail::send('rainlab.user:activate', ...);
```

### Registering a Layout

Use the `registerMailLayouts` method to register layouts. Each layout needs a unique code and the view file for its default contents.

```php
public function registerMailLayouts()
{
    return [
        'marketing' => 'acme.blog::layouts.marketing',
        'notification' => 'acme.blog::layouts.notification',
    ];
}
```

Templates can now refer to the layout by its code.

::: cmstemplate
```ini
layout = "marketing"
```
```twig
Page contents...
```
:::

### Registering a Partial

Use the `registerMailPartials` method to register partials. Like layouts, each partial needs a unique code and the view file for its default contents.

```php
public function registerMailPartials()
{
    return [
        'tracking' => 'acme.blog::partials.tracking',
        'promotion' => 'acme.blog::partials.promotion',
    ];
}
```

Templates can now render the partial with the `{% partial %}` tag and its code.

```twig
{% partial 'tracking' %}
```

### Using a File-based Layout

To use a layout file directly, pass the view code to the **layout** property. For example, this mail view uses the `acme.blog::mail.custom-layout` layout.

```ini
layout = "acme.blog::mail.custom-layout"
subject = "Your product has been added to October CMS project"
==
...
```

The layout content is loaded from the file **plugins/acme/blog/views/mail/custom-layout.htm**, for example:

```twig
<html>
<body>
    <h1>HTML Contents</h1>
    <div>
        {{ content|raw }}
    </div>
</body>
</html>
```

::: warning
The contents of file-based layouts cannot be edited in the admin panel.
:::

### Managing Templates in the Backend Panel

You can create mail templates stored in the database under **Settings → Mail Templates**. The **code** you give a template is a unique identifier and cannot be changed once created.

For example, if you create a template with the code `my-template`, you can send it with this PHP code.

```php
Mail::send('my-template', $data, function($message) {
    // ...
});
```

::: tip
If the mail template does not exist in the system, this code looks for a mail view in the filesystem with the same code.
:::

To manage layouts, open **Settings → Mail Templates** and click the **Layouts** tab. Mail layouts work like CMS layouts and hold the scaffold for the mail message. Both mail views and mail templates can use them. October CMS includes two mail layouts by default.

Layout | Code | Description
------------- | ------------- | -------------
Default | `default` | Used for public facing, frontend mail.
System | `system` | Used for internal, backend mail.

## Sharing Variables With All Templates

Use the `View::share` method to make a variable available to every mail template.

```php
View::share('site_name', 'October CMS');
```

Call this code in the `register` or `boot` method of the [plugin registration file](../plugins/introduction.md#registration-file). In this example, the `{{ site_name }}` variable is then available inside all mail templates.

## Translating Mail Templates

When you use [site definitions](../../themes/sites/multisite.md) with different locales, mail templates are translated into the locale of the person receiving the message. Turn on this feature with the `multisite.features.backend_mail_template` configuration value in the **config/multisite.php** file. The default value is `false`.

Templates customized in the admin panel store translated values for the subject and content fields, which you edit with the translate popup on each field. Layouts and partials translate the same way, so shared markup stays consistent for each locale.

To translate a registered view template, place a copy of the file in a subdirectory named after the locale, next to the base view file. This matches the convention used by [content blocks](../../themes/content.md).

```
plugins/acme/blog/views/mail/
├── welcome.htm          ← acme.blog::mail.welcome (default)
├── fr/
│   └── welcome.htm      ← French
└── ru/
    └── welcome.htm      ← Russian
```

The locale of each message is resolved in the following order. A regional locale such as `fr-ca` also checks its base language `fr`.

1. The `_current_locale` value in the message data, when passed explicitly.
2. The active application locale, set by the active site.

To send a message in a specific locale, pass `_current_locale` with the message data. The entire message is then composed in that locale, including the subject, layout and partials.

```php
Mail::sendTo('user@domain.tld', 'acme.blog::mail.welcome', [
    'name' => 'Joe',
    '_current_locale' => 'fr',
]);
```

Queued messages capture the locale and site context when they are queued, so the queue worker selects the correct translated template when it sends the message. To pin a queued message to a specific locale, pass `_current_locale` in the message data.

#### See Also

::: also
* [Mail Configuration](../../setup/mail.md)
* [Queue](./queue.md)
* [Parser](./parser.md)
:::
