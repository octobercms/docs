# Sending email messages

October extends the [Laravel's Mail system](http://laravel.com/docs/mail) with Twig support. The programming interface is the same:

    Mail::send('october.server::emails.message', $data, function($message) use ($product)
    {
        $message->to($product->author->user->email, $product->author->user->full_name);
    });

The first argument in the `send()` method is a path to the mail view in the following format: **author.plugin:emails.view-name**. It corresponds to the following file:

    plugins
      author
        plugin
          views
            email
              view-name.htm

Mail views can contain up to 3 sections separated with the `==` sequence. The first, configuration section defines the view subject. The second section defines the message content in text format. The third section defines the message content in HTML format. Note that the text section is optional and a view can contain only the settings and HTML sections. All standard Twig tags are supported in mail views. Example: 

    subject = "You product has been added to October CMS project"
    ==

    Hi {{ name }},

    Good news! User {{ user }} just added your product "{{ product }}" to a project.

    Thanks for using October CMS!

    ---
    This is an automatic message. Please do not reply to it.
    ==

    <p>Hi {{ name }},</p>

    <p>Good news! User {{ user }} just added your product "{{ product }}" to a project.</p>

    <p>Thanks for using October CMS!</p>

    <hr />
    <p>This is an automatic message. Please do not reply to it.</p>