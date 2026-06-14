---
subtitle: "Replace parts of the page after an AJAX request using push and pull partial updates"
---
# Updating the Page

Flash messages are great for quick feedback, but they fade away. Sometimes you want a permanent change on the page: replace the form with a thank-you message, update a counter, or swap out an entire section. The AJAX framework can do this by updating the DOM after a request completes.

There are two ways to update the page:

- **Push**: the handler decides what HTML to send back and where to put it.
- **Pull**: the markup tells the framework which partial to render and where to insert it.

Let's try both approaches on our contact form.

## Push: Update from the Handler

Right now, after sending a message, the visitor sees a flash notification but the form stays on the page. Let's replace the form with a confirmation message, pushed from the handler.

### Wrap the Form

1. Open **Editor → Pages → Team Profile**.
2. In the **Markup** tab, wrap the entire form (including the heading) in a `<div>` with an ID:

```twig
    <div id="contact-form">
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
    </div>
```

3. Click **Save**.

### Update the Handler

1. Switch to the **Code** tab.
2. Update the `onSendMessage` handler to return HTML that replaces the form:

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

    return [
        '#contact-form' => '<p class="text-green-600 font-medium">Thank you! Your message has been sent to ' . e($member->title) . '.</p>'
    ];
}
```

3. Click **Save**.

### How Push Updates Work

When a handler returns an array with a key that starts with `#` or `.`, the framework treats it as a DOM update. The key is a CSS selector, and the value is the HTML to insert.

In our case, `'#contact-form'` targets the `<div id="contact-form">` wrapper, and the value replaces its entire contents with the confirmation message. The form disappears and the thank-you text takes its place.

### Try It Out

1. Preview the site and go to a team member's profile.
2. Fill in the contact form and click **Send Message**.
3. The form should be replaced with "Thank you! Your message has been sent to Ada Lovelace."

This is a push update. The handler controlled what happened. The browser did not need to know anything about the update in advance.

## Pull: Update from a Partial

Returning raw HTML from a handler works, but it mixes presentation with logic. A cleaner approach is to use a **partial** for the success message and let the markup request it. This is a pull update.

### Create the Partial

1. Navigate to **Editor → Partials** and click **+ Add**.
2. Name it `contact-success`.
3. Enter:

```twig
<p class="text-green-600 font-medium">
    Thank you! Your message has been sent to {{ name }}.
</p>
```

4. Click **Save**.

### Update the Form

1. Open **Editor → Pages → Team Profile**.
2. In the **Markup** tab, add `data-request-update` to the form to tell the framework to pull the partial after a successful request:

```twig
        <form
            data-request="onSendMessage"
            data-request-validate
            data-request-update="{ 'contact-success': '#contact-form' }"
        >
```

Note that we also removed `data-request-flash` since we no longer need the flash message. The partial update replaces it.

3. Click **Save**.

### Simplify the Handler

1. Switch to the **Code** tab.
2. Update the handler to set a variable for the partial instead of returning HTML:

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

    $this['name'] = $member->title;
}
```

3. Click **Save**.

### How Pull Updates Work

The `data-request-update` attribute uses this format:

```
{ 'partial-name': '#target-selector' }
```

After the AJAX request succeeds, the framework asks the server to render the `contact-success` partial and replaces the contents of `#contact-form` with the result. The handler only needs to set the variables the partial uses, in this case `name`.

This is cleaner because the HTML lives in a partial (where it belongs) and the handler focuses on logic.

### Try It Out

1. Preview the site and submit the contact form again.
2. The behavior is the same (the form is replaced with the thank-you message) but now the message comes from a partial.

## Push vs Pull

Both approaches achieve the same result. Here is when to use each:

| Approach | Best For |
|---|---|
| **Push** (handler returns HTML) | Quick updates, simple messages, one-off responses |
| **Pull** (markup requests a partial) | Reusable templates, complex HTML, separation of concerns |

In practice, pull updates are more common because they keep your HTML in templates where it belongs. Push updates are handy for simple cases where creating a partial feels like overkill.

## Next Steps

You have built a complete interactive feature: a form with validation, email sending, and DOM updates. The Interactive Features section is complete.

Continue to [Preparing for Production](../deployment/preparing-for-production.md) to get your site ready for the real world.

For the full reference on partial updates, see [Updating Partials](../../../4.x/cms/ajax/update-partials.md) in the developer documentation.
