# Sending mail messages

- [Mail views](#mail-views)
- [Mail templates](#mail-templates)

Mails can be sent in October using either mail views or mail templates. A mail view is supplied by the application or plugin in the file system in the **/views** directory. Whereas a mail template is managed using the back-end interface via *System > Mail templates*.

Optionally, mail views can be registered in the [Plugin registration file](registration#mail-templates) with the `registerMailTemplates()` method. This will automatically generate a mail template and allows them to be customized using the back-end interface.

<a name="mail-views" class="anchor" href="#mail-views"></a>
## Mail views

October extends the [Laravel's Mail system](http://laravel.com/docs/mail) with Twig support. The programming interface is the same:

    Mail::send('acme.blog::mail.message', $data, function($message) use ($user)
    {
        $message->to($user->email, $user->full_name);
    });

The first argument in the `send()` method is a path to the mail view in the following format: **author.plugin:mail.message**. It corresponds to the following file:

    plugins/
      author/
        plugin/
          views/
            mail/
              message.htm

Mail views can contain up to 3 sections separated with the `==` sequence. The first, configuration section defines the view subject. The second section defines the message content in text format. The third section defines the message content in HTML format. Note that the text section is optional and a view can contain only the settings and HTML sections. The standard Twig tags are supported in mail views. An example view file:

    subject = "You product has been added to OctoberCMS project"
    ==

    Hi {{ name }},

    Good news! User {{ user }} just added your product "{{ product }}" to a project.

    Thanks for using October CMS!
    ==

    <p>Hi {{ name }},</p>

    <p>Good news! User {{ user }} just added your product "{{ product }}" to a project.</p>

    <p>Thanks for using October CMS!</p>

<a name="mail-templates" class="anchor" href="#mail-templates"></a>
## Using mail templates

Mail templates can be created in the back-end area or generated automatically by registered mail views. The **code** specified in the template is a unique identifier and the process for sending these emails is the same.

For example, if you create a template with code *this.is.my.email* you can send it using this PHP code:

    Mail::send('this.is.my.email', $data, function($message) use ($user)
    {
        [...]
    });

> **Note:** If the mail template does not exist in the system, this code will attempt to find the mail view instead.
