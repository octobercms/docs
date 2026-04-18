---
subtitle: "Build interactive forms that validate input and respond to submissions without reloading the page."
---

# Building Forms

Forms are one of the most common interactive elements on any website — contact forms, signup forms, feedback forms, order requests. October CMS makes building these forms straightforward by combining the AJAX framework with server-side validation. Your visitors get instant feedback when something is wrong, and a clear confirmation when their message is sent, all without a page reload.

This guide walks you through building a complete contact form from scratch.

## Step 1: Include the Extras Framework

Before building your form, make sure your layout includes the extras framework. The extras add automatic support for displaying validation errors next to form fields and showing flash messages after submission.

```twig
{% framework extras %}
```

If you have not done this yet, see [Introduction to AJAX](./ajax-introduction.md) for where to place this tag in your layout.

## Step 2: Create the Form Markup

Add the following HTML to your page. The key data attributes on the `<form>` tag tell the AJAX framework how to handle the submission.

```html
<form data-request="onFormSubmit" data-request-validate data-request-flash>
    <div>
        <label>Name</label>
        <input type="text" name="name" />
    </div>
    <div>
        <label>Email</label>
        <input type="email" name="email" />
    </div>
    <div>
        <label>Message</label>
        <textarea name="message"></textarea>
    </div>
    <button type="submit">Send Message</button>
</form>
```

Here is what each attribute does:

- **`data-request="onFormSubmit"`** tells the framework to call the `onFormSubmit` handler on the server when the form is submitted.
- **`data-request-validate`** enables automatic client-side display of validation errors. When the server rejects a field, the error message appears next to that field.
- **`data-request-flash`** enables automatic display of flash messages (like "Thank you for your message!") after a successful submission.

## Step 3: Write the Handler

In the PHP code section of your page, add the handler that processes the form. This function runs on the server when the form is submitted.

```php
function onFormSubmit()
{
    $rules = [
        'name' => 'required',
        'email' => 'required|email',
        'message' => 'required'
    ];

    $validation = Validator::make(input(), $rules);

    if ($validation->fails()) {
        throw new ValidationException($validation);
    }

    // Process the form (e.g., send an email)
    Mail::send('mail.contact', input(), function($message) {
        $message->to('admin@example.com');
    });

    Flash::success('Thank you for your message!');
}
```

Let's break this down:

1. **Define validation rules.** Each field gets one or more rules. The `email` field, for instance, must be present (`required`) and must look like a valid email address (`email`).
2. **Run the validator.** The `input()` helper grabs all the data the visitor submitted. `Validator::make()` checks it against the rules.
3. **Throw on failure.** If validation fails, throwing a `ValidationException` sends the error messages back to the browser. The extras framework displays them next to the relevant fields automatically.
4. **Process the data.** If everything passes, you can do whatever you need — send an email, save to the database, or both.
5. **Show a success message.** `Flash::success()` sets a flash message that the framework displays to the visitor.

::: warning
Always validate form input on the server side. Client-side validation (like the HTML `required` attribute) can be bypassed by anyone. Server-side validation with `Validator` ensures that no invalid or malicious data gets through, regardless of what happens in the browser.
:::

## How Validation Errors Are Displayed

When you include `data-request-validate` on your form and load the `{% framework extras %}`, validation errors are displayed automatically. If the visitor submits the form without filling in the "Name" field, for example, an error message like "The name field is required" appears near that field.

You do not need to write any extra HTML or JavaScript for this to work. The extras framework handles the error placement and styling for you.

::: tip
The extras framework provides sensible default styling for validation errors and flash messages. If your theme includes its own CSS, the error messages will blend in naturally. You can customize the appearance by styling the `.oc-flash-message` and field error classes in your theme's stylesheet.
:::

## How Flash Messages Are Displayed

When the handler calls `Flash::success(...)` and the form has the `data-request-flash` attribute, the message appears automatically at the top of the page (or wherever your layout's `{% flash %}` block is placed). This gives the visitor clear feedback that their form was submitted successfully.

For more details on flash messages and how to customize their appearance, see [Flash Messages & Loaders](./flash-messages-and-loaders.md).

## Going Further

This example covers a basic contact form, but the same pattern works for any kind of form — newsletter signups, surveys, booking requests, and more. You can add as many fields and validation rules as you need.

For the full list of available validation rules and advanced handler techniques, see the [AJAX Handlers](../../../4.x/cms/ajax/handlers.md) and [Validation](../../../4.x/cms/features/validation.md) pages in the developer documentation.
