# Sending email messages

- [Email views](#email-views)
- [Email templates](#email-templates)

Emails can be sent in October using either email views or email templates. An email view is supplied by the application or plugin in the file system in the **/views** directory. Whereas an email template is managed using the back-end interface via *System > Email templates*.

Optionally, email views can be registered in the [Plugin registration file](registration#email-templates) with the `registerEmailTemplates()` method. This will automatically generate an email template and allows them to be customized using the back-end interface.

<a name="email-views" class="anchor" href="#email-views"></a>
## Email views

October extends the [Laravel's Mail system](http://laravel.com/docs/mail) with Twig support. The programming interface is the same:

    Mail::send('october.server::emails.message', $data, function($message) use ($user)
    {
        $message->to($user->email, $user->full_name);
    });

The first argument in the `send()` method is a path to the mail view in the following format: **author.plugin:emails.view-name**. It corresponds to the following file:

    plugins
      author
        plugin
          views
            email
              view-name.htm

Mail views can contain up to 3 sections separated with the `==` sequence. The first, configuration section defines the view subject. The second section defines the message content in text format. The third section defines the message content in HTML format. Note that the text section is optional and a view can contain only the settings and HTML sections. The standard Twig tags are supported in mail views. An example view file:

    subject = "You product has been added to October CMS project"
    ==

    Hi {{ name }},

    Good news! User {{ user }} just added your product "{{ product }}" to a project.

    Thanks for using October CMS!
    ==

    <p>Hi {{ name }},</p>

    <p>Good news! User {{ user }} just added your product "{{ product }}" to a project.</p>

    <p>Thanks for using October CMS!</p>

<a name="email-templates" class="anchor" href="#email-templates"></a>
## Using email templates

Email templates can be created in the back-end area or generated automatically by registered email views. The **code** specified in the template is a unique identifier and the process for sending these emails is the same.

For example, if you create a template with code *this.is.my.email* you can send it using this PHP code:

    Mail::send('this.is.my.email', $data, function($message) use ($user)
    {
        [...]
    });

> **Note:** If the email template does not exist in the system, this code will attempt to find the email view instead.
