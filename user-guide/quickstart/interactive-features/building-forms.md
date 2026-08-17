---
subtitle: "Add a contact form to the team profile page with validation, email sending, and flash messages"
---
# Build a Form

Let's add a real feature to the site: a contact form on each team member's profile page. Visitors will be able to send a message to the team member. The form will validate input, send an email, and show a success message, all without a page reload.

## Add the Form Markup

1. Open **Editor → Pages → Team Profile** (the page with the URL `/team/:slug`).
2. In the **Markup** tab, add the following form below the existing profile content, just before the closing `</div>`:

```twig
    <hr class="my-8">

    <h2 class="text-xl font-semibold mb-4">Send {{ section.title }} a Message</h2>

    <form data-request="onSendMessage" data-request-flash data-request-validate>
        <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Your Email</label>
            <input
                type="email"
                name="email"
                class="w-full border rounded-lg px-3 py-2"
            >
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Message</label>
            <textarea
                name="message"
                rows="4"
                class="w-full border rounded-lg px-3 py-2"
            ></textarea>
        </div>
        <button
            type="submit"
            class="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
            data-attach-loading
        >
            Send Message
        </button>
    </form>
```

3. Click **Save**.

### What the Attributes Do

- **`data-request="onSendMessage"`**: calls our `onSendMessage` handler when the form is submitted.
- **`data-request-flash`**: displays flash messages (success or error) automatically after the request.
- **`data-request-validate`**: shows validation errors inline next to the fields that failed.
- **`data-attach-loading`**: disables the button and shows a loading indicator while the request is processing.

## Write the Handler

1. Switch to the **Code** tab in the Team Profile page editor.
2. Enter the following PHP code:

```php
function onSendMessage()
{
    $data = Request::validate([
        'email' => 'required|email',
        'message' => 'required',
    ]);

    $member = $this->section->getRecord();

    Mail::raw($data['message'], function($msg) use ($data, $member) {
        $msg->to($member->email, $member->title);
        $msg->replyTo($data['email']);
        $msg->subject('Message from your profile page');
    });

    Flash::success('Your message has been sent to ' . $member->title . '!');
}
```

3. Click **Save**.

### How This Works

1. **`Request::validate()`** checks that the email is present and valid, and the message is not empty. If validation fails, the framework automatically sends the errors back to the browser. The `data-request-validate` attribute displays them next to the form fields.

2. **`$this->section->getRecord()`** retrieves the current team member from the Section component. This gives us access to their name and email address.

3. **`Mail::raw()`** sends the visitor's message as a plain-text email. The `replyTo` is set to the visitor's email so the team member can reply directly.

4. **`Flash::success()`** sets a success message. Because the form has `data-request-flash`, the framework displays it automatically as a notification at the top of the page.

## Configure the Mail Logger

Before testing, let's make sure emails are captured safely. Instead of sending real emails, we will use the **log** mail driver, which writes emails to the event log.

1. Navigate to **Settings → Mail Configuration** in the backend.
2. Set the **Mail Method** to **Log File**.
3. Click **Save**.

Now all emails are written to the log instead of being sent. This is perfect for development.

## Try It Out

1. Preview your site and navigate to a team member's profile page (e.g., `/team/ada-lovelace`).
2. Scroll down to the contact form.
3. Try submitting the form with both fields empty. You should see validation error messages appear.
4. Fill in a valid email and a message, then click **Send Message**.
5. A green success notification should appear at the top of the page: "Your message has been sent to Ada Lovelace!"
6. Go to **Settings → Event Log** in the backend. You should see the email logged there with the message content.

::: tip
If you want to test with real emails later, change the send mode to **SMTP**, **Mailgun**, or another provider in Mail Configuration. The code stays the same. Only the mail driver changes.
:::

## Next Steps

The form works and shows a flash message on success. But flash messages disappear after a few seconds. What if you want a permanent confirmation that stays on the page? Continue to [Updating the Page](./flash-messages-and-loaders.md) to learn how to replace parts of the page with new content after a request.

For the complete AJAX form reference, see [AJAX Handlers](../../../4.x/cms/ajax/handlers.md) and [Validation](../../../4.x/cms/features/validation.md) in the developer documentation.
