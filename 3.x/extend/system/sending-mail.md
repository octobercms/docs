---
subtitle: Learn how to send mail and create templates.
---
# Sending Mail

This article describes how to build mail content, including using layouts and partials and then the methods used to send them. Basic Twig tags and expressions are supported in mail content. Markdown syntax is also supported, see the section on [using HTML in Markdown](../services/parser.md) for more details.

## Message Content

Mail messages can be sent in October CMS using either mail views or mail templates. A mail view is supplied by the application or plugin in the file system in the **/views** directory. Whereas a mail template is managed using the backend panel via **Settings → Mail Templates**.

Optionally, mail views can be registered in the [plugin registration file](../extending.md) with the `registerMailTemplates` method. This automatically seeds a mail template allowing them to be customized using the backend panel.

### Defining Templates in the Backend Panel

You can create mail templates stored in the database using backend panel via **Settings → Mail Templates**. The **code** given to template is a unique identifier and cannot be changed once created.

For example, if you create a template with code `this.is.my.email` you can send it using this PHP code:

```php
Mail::send('this.is.my.email', $data, function($message) use ($user) {
    // ...
});
```

::: tip
If the mail template does not exist in the system, this code will attempt to find a mail view in the filesystem with the same code.
:::

### Defining Layouts in the Backend Panel

Mail layouts can be created by selecting **Settings → Mail Templates** and clicking the **Layouts** tab. These behave just like CMS layouts, they contain the scaffold for the mail message. Mail views and templates support the use of mail layouts.

By default, October CMS comes with two default mail layouts.

Layout | Code | Description
------------- | ------------- | -------------
Default | `default` | Used for public facing, frontend mail.
System | `system` | Used for internal, backend mail.

### Defining Views in the Filesystem

Mail views reside in the file system and the code used represents the path to the view file. For example sending mail with the code `author.plugin::mail.message` would use the content in following file.

::: dir
├── plugins
|   └── author  _← "author" Segment_
|       └── myplugin  _← "plugin" Segment_
|           └── `views`
|               └── mail  _← "mail" Segment_
|                   └── message.htm  _← "message" Segment_
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

<p><strong>Good news!</strong> User {{ user }} just added your product "{{ product }}" to a project.</p>

<p>This email was sent using formatting (HTML)</p>
```

The **plain text** section is optional and a view can contain only the **configuration** and **HTML markup** sections. Markup syntax is also supported as an alternative syntax.

```twig
layout = "default"
subject = "Your product has been added to October CMS project"
==
Hi {{ name }},

**Good news!** User {{ user }} just added your product "{{ product }}" to a project.
```

#### Configuration Section

The configuration section sets the mail view properties. The following configuration properties are supported.

Property | Description
------------- | -------------
**subject** | the mail message subject, required.
**layout** | the mail layout code or view, optional. Default value is `default`.

#### File-based Layouts

To reference a file-based layout, you may pass the view code to the **layout** property. For example, this mail view references a layout of `acme.blog::mail.custom-layout`.

```ini
layout = "acme.blog::mail.custom-layout"
subject = "Your product has been added to October CMS project"
==
...
```

Using the code above, it will attempt to load the layout content from the path **plugins/acme/blog/views/mail/custom-layout.htm** and these contents are an example.

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

### Registering Layouts, Templates & Partials

::: aside
The **code** value in the backend panel will be the same as the mail view path. For example, `author.plugin:mail.message`.
:::

Mail views can be registered as default templates created in the backend panel. Templates are registered by overriding the `registerMailTemplates` method of the [plugin registration file](../extending.md). The method should return an array of mail view names.

```php
public function registerMailTemplates()
{
    return [
        'rainlab.user::mail.activate',
        'rainlab.user::mail.restore'
    ];
}
```

Like templates, mail partials and layouts can be registered by overriding the `registerMailPartials` and `registerMailLayouts` methods of the [plugin registration file](../extending.md). The methods should return an array of mail view names. The array key will be used as `code` property for the partial or layout.

```php
public function registerMailPartials()
{
    return [
        'tracking' => 'acme.blog::partials.tracking',
        'promotion' => 'acme.blog::partials.promotion',
    ];
}

public function registerMailLayouts()
{
    return [
        'marketing' => 'acme.blog::layouts.marketing',
        'notification' => 'acme.blog::layouts.notification',
    ];
}
```

In the backend panel, when a generated template is saved for the first time, the customized content will be used when sending mail for the assigned code. In this context, the registered mail views can be considered default or fallback views.

### Global Variables

You may register variables that are globally available to all mail templates with the `View::share` method.

```php
View::share('site_name', 'October CMS');
```

This code could be called inside the register or boot method of a [plugin registration file](../plugin/registration.md). Using the above example, the variable `{{ site_name }}` will be available inside all mail templates.

## Sending Mail

To send a message, use the `send` method on the `Mail` facade which accepts three arguments. The first argument is a unique mail code used to locate either the mail view or mail template. The second argument is an array of data you wish to pass to the view. The third argument is a `Closure` callback which receives a message instance, allowing you to customize the recipients, subject, and other aspects of the mail message.

```php
// These variables are available inside the message as Twig
$vars = ['name' => 'Joe', 'user' => 'Mary'];

Mail::send('acme.blog::mail.message', $vars, function($message) {

    $message->to('admin@domain.tld', 'Admin Person');
    $message->subject('This is a reminder');

});
```

Since we are passing an array containing the `name` key in the example above, we could display the value within our e-mail view using the following Twig markup.

```twig
{{ name }}
```

::: warning
You should avoid passing a `message` variable in your message, this variable is always passed and allows the inline embedding of attachments.
:::

### Quick Sending

October CMS also includes an alternative method called `sendTo` that can simplify sending mail.

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

The first argument in `sendTo` is used for the recipients can take different value types.

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

- `$recipient` is defined as above.
- `$message` is the template name or message contents for raw sending.
- `$params` array of variables made available inside the template.
- `$callback` gets called with one parameter, the message builder as described for the `send` method (optional, defaults to null). If not a callable value, works as a substitute for the next options argument.
- `$options` custom sending options passed as an array (optional)

The following custom sending `$options` are supported

- **queue** specifies whether to queue the message or send it directly (optional, defaults to false).
- **bcc** specifies whether to add recipients as Bcc or regular To addresses (defaults to false).

### Building the Message

As previously mentioned, the third argument given to the `send` method is a `Closure` allowing you to specify various options on the e-mail message itself. Using this Closure you may specify other attributes of the message, such as carbon copies, blind carbon copies, etc:

```php
Mail::send('acme.blog::mail.welcome', $vars, function($message) {
    $message->from('us@example.com', 'October');
    $message->to('foo@example.com')->cc('bar@example.com');
});
```

Here is a list of the available methods on the `$message` message builder instance.

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

#### Mailing Plain Text

By default, the view given to the `send` method is assumed to contain a mail view, where you may specify a plain text view to send in addition to the HTML view.

```php
Mail::send('acme.blog::mail.message', $data, $callback);
```

Or, if you only need to send a plain text e-mail, you may specify this using the `text` key in the array:

```php
Mail::send(['text' => 'acme.blog::mail.text'], $data, $callback);
```

#### Mailing Parsed Raw Strings

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

#### Mailing Raw Strings

If you pass an array containing either `text` or `html` keys, this will be an explicit request to send mail. No layout or markdown parsing is used.

```php
Mail::raw([
    'text' => 'This is plain text',
    'html' => '<strong>This is HTML</strong>'
], function ($message) {
    //
});
```

### Sending Attachments

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

#### Embedding an Image in Mail Content

Embedding inline images into your e-mails is typically cumbersome; however, there is a convenient way to attach images to your e-mails and retrieving the appropriate CID. To embed an inline image, use the `embed` method on the `message` variable within your e-mail view. Remember, the `message` variable is available to all of your mail views:

```twig
<body>
    Here is an image:

    <img src="{{ message.embed(pathToFile) }}">
</body>
```

If you are planning to use queued emails make sure that the path of the file is absolute. To achieve that you can simply use the [app filter](../../markup/filter/app.md):

```twig
<body>
    Here is an image:
    {% set pathToFile = 'storage/app/media/path/to/file.jpg'|app %}
    <img src="{{ message.embed(pathToFile) }}">
</body>
```

#### Embedding Raw Data in Mail Content

If you already have a raw data string you wish to embed into an e-mail message, you may use the `embedData` method on the `message` variable:

```twig
<body>
    Here is an image from raw data:

    <img src="{{ message.embedData(data, name) }}">
</body>
```

## Queueing Mail

### Queueing a Mail Message

Since sending mail messages can drastically lengthen the response time of your application, many developers choose to queue messages for background sending. This is easy using the built-in [unified queue API](../services/queue.md). To queue a mail message, use the `queue` method on the `Mail` facade:

```php
Mail::queue('acme.blog::mail.welcome', $data, function ($message) {
    //
});
```

This method will automatically take care of pushing a job onto the queue to send the mail message in the background. Of course, you will need to [configure your queues](../services/queue.md) before using this feature.

### Delayed Message Queueing

If you wish to delay the delivery of a queued e-mail message, you may use the `later` method. To get started, simply pass the number of seconds by which you wish to delay the sending of the message as the first argument to the method.

```php
Mail::later(5, 'acme.blog::mail.welcome', $data, function ($message) {
    //
});
```

### Pushing to Specific Queues

If you wish to specify a specific queue on which to push the message, you may do so using the `queueOn` and `laterOn` methods:

```php
Mail::queueOn('queue-name', 'acme.blog::mail.welcome', $data, function ($message) {
    //
});

Mail::laterOn('queue-name', 5, 'acme.blog::mail.welcome', $data, function ($message) {
    //
});
```

#### See Also

::: also
* [Mail Configuration](../../setup/mail-config.md)
:::
