---
subtitle: Displays a form for accepting user submitted content.
---
# Submission

<VideoBlockLink src="https://www.youtube.com/watch?v=SzIYzEXF3Wk" title="User Content Submissions" description="This video demonstrates how to accept user submitted content, such as comments and contact forms, with the submission component." prompt="Watch the demonstration" />

The `submission` component displays a frontend form for a [submission blueprint](../tailor/blueprints.md#submission), used to capture user generated content such as blog comments and contact form submissions. The component handles rendering the form, validating the input and saving the record for moderation.

## Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [submission blueprint](../tailor/blueprints.md#submission).

## Basic Usage

The following adds a submission form for the **Blog\Comment** blueprint to the page. Rendering the component displays a complete form generated from the blueprint fields, including spam protection and file upload support.

::: cmstemplate
```ini
[submission commentForm]
handle = "Blog\Comment"
```
```twig
{% component 'commentForm' %}
```
:::

When the form is submitted successfully, the record is saved with a **Pending** status, ready for moderation in the admin panel. Validation rules defined on the blueprint fields are applied automatically and displayed against the form fields.

## Rendering Custom Markup

For complete control over the form markup, submit the fields directly to the `onFormSubmit` AJAX handler using field names matching the blueprint. The following renders a custom comment form that links each comment to the current blog post using a hidden field.

```twig
{% if formSubmitted %}
    <div class="alert alert-success">
        Thank you for your comment! It will appear here once it has been approved.
    </div>
{% else %}
    <form
        data-request="commentForm::onFormSubmit"
        data-request-update="{ _self: true }"
        data-request-flash>

        <input type="hidden" name="post" value="{{ post.id }}">

        <input type="text" name="author_name" placeholder="Name" required>
        <input type="email" name="author_email" placeholder="Email address" required>
        <textarea name="content" placeholder="Comment" required></textarea>

        <div style="display:none">
            <input type="text" name="_oc_hp" value="" autocomplete="off" tabindex="-1">
        </div>

        <button type="submit" data-attach-loading>
            Submit
        </button>
    </form>
{% endif %}
```

After a successful submission, the partial is updated with the `formSubmitted` variable set to **true** and the `formModel` variable containing the saved record.

::: tip
Wrap the form in an [AJAX partial](../ajax/update-partials.md) using the `{% ajaxPartial %}` tag so it can refresh itself when submitted.
:::

### Building Fields from the Schema

The `formGetFields` method returns the blueprint fields as an array, letting you build custom markup while keeping the field definitions in the blueprint. Each field includes the **name**, **label**, **htmlType**, **options**, **required**, **placeholder**, **comment** and **multiple** values.

```twig
{% for field in commentForm.formGetFields %}
    <label>
        {{ field.label }}
    </label>
    <input type="{{ field.htmlType }}" name="{{ field.name }}" {% if field.required %}required{% endif %}>
{% endfor %}
```

## File Uploads

Blueprints using the [file upload field](../../element/form/widget-fileupload.md) accept uploaded files with the submission. Include the `data-request-files` attribute on the form tag to enable file uploads, and the `formHasFileFields` method can check if any file fields are defined.

```twig
<form
    data-request="commentForm::onFormSubmit"
    {% if commentForm.formHasFileFields %}data-request-files{% endif %}>

    <input type="file" name="photo">
</form>
```

Uploaded files are validated against the maximum upload size and the allowed extensions from the field `fileTypes` configuration. Fields allowing multiple files use array naming, for example, `name="photos[]"`, and the file count is validated against the field `maxFiles` configuration.

## Spam Protection

The component includes several layers of spam protection for the public form endpoint.

- **Honeypot**: submissions containing a value for the hidden `_oc_hp` field are blocked. Include this field in custom markup as shown above.
- **Rate limiting**: submissions are limited to 6 per minute for each IP address.
- **Moderation**: records are hidden from the frontend until approved in the admin panel.

The rate limit can be changed by overriding the `formGetThrottleRate` method on the component class, returning the maximum submissions per minute, or `0` to disable the limit.

## Email Notifications

Submissions can notify an admin user group by email as they arrive, configured with the `notifyGroup` property on the [submission blueprint](../tailor/blueprints.md#email-notifications). The notification is sent after the record is saved and includes a link to moderate the record in the admin panel.

## Events

The `cms.form.beforeSubmit` event fires before the submission is saved, and throwing an exception from a listener rejects it. This is the extension point for connecting spam scoring services, CAPTCHA verification or blocklists.

```php
Event::listen('cms.form.beforeSubmit', function ($component, $model) {
    if (SpamService::isSpam($model)) {
        throw new ValidationException(['content' => 'Submission rejected.']);
    }
});
```

The `cms.form.submitSuccess` event fires after the submission has been saved, useful for custom notification logic beyond the built-in [admin group notifications](../tailor/blueprints.md#email-notifications).

### Sending a Visitor Confirmation

Use the `cms.form.submitSuccess` event to send a confirmation email to the person submitting the form. The following sends a receipt using the submitted `email` field, checking the component alias so the listener only applies to the intended form.

```php
Event::listen('cms.form.submitSuccess', function ($component, $model) {
    if ($component->alias !== 'contactForm') {
        return;
    }

    $email = $model->email;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return;
    }

    Mail::sendTo($email, 'contact:submission-received', [
        'title' => $model->title
    ]);
});
```

::: warning
Auto-responders send mail to an address supplied by the visitor, making them a target for abuse, including inbox flooding of third parties and damage to your mail sender reputation from bounced or fake addresses. Avoid echoing the submitted content back in the message, and consider pairing this with CAPTCHA verification using the `cms.form.beforeSubmit` event.
:::

#### See Also

::: also
* [Submission Blueprint](../tailor/blueprints.md#submission)
* [AJAX Update Partials](../ajax/update-partials.md)
* [Flash Messages](../features/flash-messages.md)
:::
