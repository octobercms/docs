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
**wizard** | enables [multi-step forms](#multi-step-forms) where the submission is captured across several steps. Default: `false`

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

## Multi-Step Forms

Setting the `wizard` property to `true` enables multi-step submissions, where the form is broken into several steps that are saved progressively against the same record. Each step is persisted as the visitor advances, so a partially completed form is captured as a lead even when the later steps are abandoned.

```ini
[submission surveyForm]
handle = "Survey\Feedback"
wizard = 1
```

### Tagging Step Fields

Fields opt into a step using the `tags` property on the [blueprint field](../tailor/blueprints.md#multi-step-fields), which accepts a single tag or an array of tags. A tag defines a group of fields that are validated and saved together as one step. Tagging fields is what makes a blueprint usable as a wizard, since a blueprint without tagged fields has no steps to advance through.

```yaml
fields:
    rating:
        label: Rating
        type: dropdown
        validation: required
        tags: step1

    comments:
        label: Comments
        type: textarea
        validation: required|max:2000
        tags: step2
```

When a step is saved, only the validation rules for the fields belonging to that step are applied, so each step can define its own required fields without affecting the others. The full rule set for every field is enforced later when the form is completed.

### Navigating Steps

Steps are navigated using the `onFormStep` AJAX handler, which understands two posted values.

Value | Description
----- | -----------
**_form_tag** | the tag of the fields to validate and save before moving on (a **Next** action).
**_form_goto** | the step to display after handling the request.

To advance a step, post both values. The fields carrying the `_form_tag` are validated against the blueprint and saved to the record, then the step named by `_form_goto` is displayed. To go back, post only `_form_goto`. No validation or saving occurs, and the target step is displayed using the values already saved, so the visitor never loses earlier input.

The current step is available as the `formTag` variable, and the record being built is available as the `formModel` variable, letting you display the appropriate step and pre-fill fields with previously saved values.

```twig
<div class="survey-form">
    {% if formSubmitted %}
        Thank you for your feedback!

    {% elseif formTag == 'step1' %}
        <form data-request="surveyForm::onFormSubmit" data-request-update="{ _self: true }">
            <textarea name="comments" placeholder="Comments">{{ formModel.comments }}</textarea>

            <button type="button"
                data-request="surveyForm::onFormStep"
                data-request-data="{ _form_goto: 'start' }"
                data-request-update="{ _self: true }">
                Back
            </button>
            <button type="submit" data-attach-loading>
                Send Feedback
            </button>
        </form>

    {% else %}
        <form data-request="surveyForm::onFormStep" data-request-update="{ _self: true }">
            <input type="hidden" name="_form_tag" value="step1">
            <input type="hidden" name="_form_goto" value="step1">

            <select name="rating">
                <option value="good">Good</option>
                <option value="bad">Bad</option>
            </select>

            <button type="submit" data-attach-loading>
                Continue
            </button>
        </form>
    {% endif %}
</div>
```

Here the first screen saves the `step1` fields and advances by displaying the `step1` step, which collects the remaining input. The final step submits to the `onFormSubmit` handler as usual, which completes the record and enforces the full validation rule set across all fields. The **Back** button navigates to `start`, a step name that matches no fields, returning the form to its initial screen.

### Partial Submissions

While a wizard is in progress, the record is flagged as a partial submission and tracked in the visitor session. Partial records appear in the admin panel with a **Partial** status, distinguishing an abandoned form from a completed one awaiting moderation. Completing the form clears the partial flag, and the record moves to the normal **Pending** status.

Partial submissions are never purged automatically, since they represent captured leads. To remove them, reject the record in the admin panel, after which it follows the standard [rejected submission retention](../tailor/blueprints.md#submission).

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

The rate limit can be changed by overriding the `formGetThrottleRate` method on the component class, returning the maximum submissions per minute, or `0` to disable the limit. For [multi-step forms](#multi-step-forms), only the creation of a new record is rate limited, so navigating between the steps of an in-progress submission is never throttled.

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

The `cms.form.submit` event fires after the submission has been saved, useful for custom notification logic beyond the built-in [admin group notifications](../tailor/blueprints.md#email-notifications).

### Sending a Visitor Confirmation

Use the `cms.form.submit` event to send a confirmation email to the person submitting the form. The following sends a receipt using the submitted `email` field, checking the component alias so the listener only applies to the intended form.

```php
Event::listen('cms.form.submit', function ($component, $model) {
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

### Multi-Step Events

For [multi-step forms](#multi-step-forms), the `cms.form.beforeStep` and `cms.form.step` events fire as each step is saved, before and after respectively. Both receive the component, the record and the tag of the step being saved. Throwing an exception from a `cms.form.beforeStep` listener rejects the step, which is useful for verifying a CAPTCHA on the first step only.

```php
Event::listen('cms.form.beforeStep', function ($component, $model, $tag) {
    if ($tag === 'step1' && !CaptchaService::verify()) {
        throw new ValidationException(['captcha' => 'Please complete the captcha.']);
    }
});
```

#### See Also

::: also
* [Submission Blueprint](../tailor/blueprints.md#submission)
* [AJAX Update Partials](../ajax/update-partials.md)
* [Flash Messages](../features/flash-messages.md)
:::
