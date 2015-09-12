# Mail services

- [Sending mail](#sending-mail)
- [Mail views](#mail-views)
- [Mail templates](#mail-templates)
- [Mail layouts](#mail-layouts)
- [Registering mail templates](#mail-template-registration)

Mail messages can be sent in October using either mail views or mail templates. A mail view is supplied by the application or plugin in the file system in the **/views** directory. Whereas a mail template is managed using the back-end interface via *System > Mail templates*.

Optionally, mail views can be [registered in the Plugin registration file](#mail-template-registration) with the `registerMailTemplates()` method. This will automatically generate a mail template and allows them to be customized using the back-end interface.

<a name="sending-mail" class="anchor" href="#sending-mail"></a>
## Sending mail

October extends the [Laravel's Mail system](http://laravel.com/docs/mail) with added Twig support. The programming interface is indentical, the first argument in the `send()` method is a unique *mail code* used to locate either the [mail view](#mail-views) or [mail template](#mail-templates).

    // These variables are available inside the message as Twig
    $params = ['name' => 'Joe', 'user' => 'Mary'];

    Mail::send('acme.blog::mail.message', $params, function($message) {

        // Message recipient
        $message->to('admin@domain.tld', 'Admin Person');

    });

October also includes an alternative method called `sendTo()` that can simplify sending mail:

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
Object | a single recipient object, where the *email* property is used for the address and the *name* is optionally used for the name.
Array | multiple recipients where the array key is the address and the value is the name.
Collection | a collection of recipient objects, as above.

<a name="mail-views" class="anchor" href="#mail-views"></a>
## Mail views

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

### Configuration section

The configuration section sets the mail view parameters. The following configuration parameters are supported:

Parameter | Description
------------- | -------------
**subject** | the mail message subject, required.
**layout** | the [mail layout](#mail-layouts) code, optional. Default value is `default`.

<a name="mail-templates" class="anchor" href="#mail-templates"></a>
## Using mail templates

Mail templates reside in the database and can be created in the back-end area via *Settings > Mail > Mail templates*. The **code** specified in the template is a unique identifier and cannot be changed once created.

The process for sending these emails is the same. For example, if you create a template with code *this.is.my.email* you can send it using this PHP code:

    Mail::send('this.is.my.email', $data, function($message) use ($user)
    {
        [...]
    });

> **Note:** If the mail template does not exist in the system, this code will attempt to find a mail view with the same code.

### Automatically generated templates

Mail templates can also be generated automatically by [mail views that have been registered](#mail-template-registration). The **code** value will be the same as the mail view path (eg: author.plugin:mail.message). If the mail view has a **layout** parameter defined, this will be used to give the template a layout.

When a generated template is saved for the first time, the customized content will be used when sending mail for the assigned code. In this context, the mail view can be considered a *default view*.

<a name="mail-layouts" class="anchor" href="#mail-layouts"></a>
## Using mail layouts

Mail layouts can be created by selecting *Settings > Mail > Mail templates* and clicking the *Layouts* tab. These behave just like CMS layouts, they contain the scaffold for the mail message. Mail views and templates support the use of mail layouts.

By default, October comes with two primary mail layouts:

Layout | Code | Description
------------- | ------------- | -------------
Default | default | Used for public facing, front-end mail
System | system | Used for internal, back-end mail

<a name="mail-template-registration" class="anchor" href="#mail-template-registration"></a>
## Registering mail templates

Mail views can be registered as templates that are automatically generated in the back-end ready for customization. Mail templates can be customized via the *Settings > Mail templates* menu. The templates can be registered by overriding the `registerMailTemplates()` method of the [Plugin registration class](registration#registration-file).

    public function registerMailTemplates()
    {
        return [
            'rainlab.user::mail.activate' => 'Activation mail sent to new users.',
            'rainlab.user::mail.restore'  => 'Password reset instructions for front-end users.'
        ];
    }

The method should return an array where the key is the [mail view name](#mail-views) and the value gives a brief description about what the mail template is used for.
