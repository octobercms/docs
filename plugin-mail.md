# Sending mail messages

- [Mail views](#mail-views)
- [Mail templates](#mail-templates)
- [Mail layouts](#mail-layouts)

Mails can be sent in October using either mail views or mail templates. A mail view is supplied by the application or plugin in the file system in the **/views** directory. Whereas a mail template is managed using the back-end interface via *System > Mail templates*.

Optionally, mail views can be registered in the [Plugin registration file](registration#mail-templates) with the `registerMailTemplates()` method. This will automatically generate a mail template and allows them to be customized using the back-end interface.

<a name="mail-views" class="anchor" href="#mail-views"></a>
## Mail views

October extends the [Laravel's Mail system](http://laravel.com/docs/mail) with Twig support. The programming interface is the same:

    Mail::send('acme.blog::mail.message', $data, function($message) use ($user)
    {
        $message->to($user->email, $user->full_name);
    });

The first argument in the `send()` method is a path to the mail view in the following format: **author.plugin:mail.message**. Which in this case corresponds to the following file:

    plugins/
      author/
        plugin/
          views/
            mail/
              message.htm

Mail views can include up to 3 sections: **configuration**, **plain text**, and **HTML markup**. Sections are separated with the `==`` sequence. For example:

    subject = "You product has been added to OctoberCMS project"
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

    subject = "You product has been added to OctoberCMS project"
    ==

    <p>Hi {{ name }},</p>

    <p>This email does not support plain text.</p>

    <p>Sorry about that!</p>

### Configuration section

The configuration section sets the mail view parameters. The following configuration parameters are supported:

Parameter  | Description
------------- | -------------
**subject** | the mail message subject, required.
**layout** | the [mail layout](#mail-layouts) code, optional. Default value is `default`.

<a name="mail-templates" class="anchor" href="#mail-templates"></a>
## Using mail templates

Mail templates can be created in the back-end area via *Settings > Mail > Mail templates*. The **code** specified in the template is a unique identifier and cannot be changed once created.

The process for sending these emails is the same. For example, if you create a template with code *this.is.my.email* you can send it using this PHP code:

    Mail::send('this.is.my.email', $data, function($message) use ($user)
    {
        [...]
    });

> **Note:** If the mail template does not exist in the system, this code will attempt to find a mail view with the same code.

### Automatically generated templates

Mail templates can also be generated automatically by [mail views that have been registered](registration#mail-templates). The **code** value will be the same as the mail view path (eg: author.plugin:mail.message). If the mail view has a **layout** parameter defined, this will be used to give the template a layout.

When a generated template is saved for the first time, the customized content will be used when sending mail for the assigned code. In this context, the mail view can be considered a *default view*.

<a name="mail-layouts" class="anchor" href="#mail-layouts"></a>
## Using mail layouts

Mail layouts can be created by selecting *Settings > Mail > Mail templates* and clicking the *Layouts* tab. These behave just like CMS layouts, they contain the scaffold for the mail message. Mail views and templates support the use of mail layouts.
