---
subtitle: Accept content from visitors with a submission blueprint and form, then approve, reject or mark it as spam in the admin panel.
---
# Submissions & Moderation

A submission blueprint captures content that visitors send from your website, such as blog comments, contact forms or product reviews. The `submission` component renders, validates and saves the form, and each new record waits in the admin panel until a moderator approves it.

```yaml
handle: Contact\Message
type: submission
name: Contact Message

fields:
    name:
        label: Name
        type: text
        validation: required

    email:
        label: Email Address
        type: email
        validation: required|email

    message:
        label: Message
        type: textarea
        validation: required|max:2000
```

Run `php artisan tailor:migrate` after creating the blueprint, then add the form to a page.

::: cmstemplate
```ini
url = "/contact"

[submission contactForm]
handle = "Contact\Message"
```
```twig
{% component 'contactForm' %}
```
:::

## Defining a Submission Blueprint

A submission blueprint uses the `submission` type and lists the fields a visitor fills in. Validation rules on the fields are applied when the form is submitted, and errors are displayed against the form fields.

::: warning
Every field defined on a submission blueprint accepts user input from the frontend, so only define fields that visitors are allowed to populate.
:::

Visitors never see a title field, so Tailor generates the record title. Use the `titleTemplate` property to build it from the submitted values with Twig.

```yaml
submission:
    titleTemplate: '{{ name }}: {{ str_limit(message, 60) }}'
```

When no template is set, the title comes from the first available `name`, `subject`, `author_name`, `full_name` or `email` field. See the [Submission Blueprint](../../handbook/blueprint-types/submission.md) for every property.

## Adding the Form to a Page

The `{% component %}` tag renders a complete form generated from the blueprint fields, including spam protection and file upload support. When the visitor submits the form, the record is saved with a **Pending** status.

### Writing Your Own Form Markup

For complete control over the markup, write the form yourself and submit it to the `onFormSubmit` AJAX handler of the component. Use field names that match the blueprint, and include the hidden `_oc_hp` honeypot field to block spam bots.

```twig
{% if formSubmitted %}
    <p>
        {{ __('Thank you, your message has been sent.') }}
    </p>
{% else %}
    <form
        data-request="contactForm::onFormSubmit"
        data-request-update="{ _self: true }"
        data-request-flash>

        <input type="text" name="name" placeholder="{{ __('Name') }}" required>
        <input type="email" name="email" placeholder="{{ __('Email address') }}" required>
        <textarea name="message" placeholder="{{ __('Message') }}" required></textarea>

        <div style="display:none">
            <input type="text" name="_oc_hp" value="" autocomplete="off" tabindex="-1">
        </div>

        <button type="submit" data-attach-loading>
            {{ __('Send') }}
        </button>
    </form>
{% endif %}
```

After a successful submission, the `formSubmitted` variable is set to **true** and the `formModel` variable contains the saved record. Place this markup in a partial and render it with the `{% ajaxPartial %}` tag so that `_self` refreshes the form in place. See [AJAX Update Partials](../ajax/update-partials.md) to learn more.

The [submission component](../../handbook/tailor-components/submission.md) page also covers building fields from the blueprint schema and accepting file uploads.

## Moderating Submissions

Submissions appear in the admin panel like other entries, with a status for each record.

Status | Meaning
------------- | -------------
**Pending** | a new submission waiting for moderation, hidden from the frontend.
**Approved** | a moderator approved the submission, so it is visible on the frontend.
**Rejected** | a moderator rejected the submission, which is soft deleted and can be restored.
**Partial** | a [multi-step form](#building-multi-step-forms) that the visitor has not finished.

Use the **Approve** and **Reject** buttons to moderate records. The **Spam** button rejects the selected records and also rejects other pending submissions from the same IP address received within the `spamSweepDays` window, which defaults to 30 days. Approved submissions are never affected by this sweep.

Rejected submissions are deleted forever after the `purgeRejectedDays` retention period, which also defaults to 30 days. Every submission also records the visitor IP address and user agent, which you can view, list and filter in the admin panel.

To place the submissions under another menu item, such as listing comments under blog posts, set the [navigation](./navigation.md) property of the blueprint.

```yaml
navigation:
    label: Comments
    parent: Blog\Post
```

## Showing Approved Submissions

The `collection` component only returns approved submissions, so you can display them like any other entries. The following lists the approved comments for a blog post, where the comment blueprint links each comment to a post with a `post` [entries field](../../handbook/tailor-fields/entries.md).

::: cmstemplate
```ini
url = "/blog/:slug"

[section post]
handle = "Blog\Post"

[collection comments]
handle = "Blog\Comment"
```
```twig
{% set postComments = comments.where('post_id', post.id).get() %}

{% for comment in postComments %}
    <p>
        {{ comment.author_name }}: {{ comment.content }}
    </p>
{% endfor %}
```
:::

## Getting Notified by Email

Set the `notifyGroup` property to email an [admin user group](../../backend/panel/users.md#groups) every time a submission arrives. The notification lists the submitted values and links to the record in the admin panel.

```yaml
submission:
    notifyGroup: contact-team
```

See [Email Notifications](../../handbook/blueprint-types/submission.md#email-notifications) to use a custom mail template and reply-to address.

## Protecting Forms from Spam

The submission component includes several layers of spam protection.

- **Honeypot**: submissions with a value in the hidden `_oc_hp` field are blocked.
- **Rate limiting**: each IP address can submit 6 times per minute.
- **Moderation**: records stay hidden from the frontend until approved.

To add a CAPTCHA or a spam scoring service, listen to the `cms.form.beforeSubmit` event and throw an exception to reject the submission. See [Events](../../handbook/tailor-components/submission.md#events) for examples.

::: tip
When your site runs behind a proxy or CDN, configure the [trusted proxy settings](../../setup/configuration.md) so the correct visitor IP address is captured.
:::

## Building Multi-Step Forms

A long form can be split into steps that are saved as the visitor advances, so a partially completed form is still captured. Set the `wizard` property on the component and assign each field to a step with the `tags` property in the blueprint.

```ini
[submission surveyForm]
handle = "Survey\Feedback"
wizard = 1
```

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

Each step validates only its own fields. See [Multi-Step Forms](../../handbook/tailor-components/submission.md#multi-step-forms) for the step handlers and a complete template.

#### See Also

::: also
* [Submission Blueprint](../../handbook/blueprint-types/submission.md)
* [Submission Component](../../handbook/tailor-components/submission.md)
* [AJAX Update Partials](../ajax/update-partials.md)
* [Flash Messages](../ajax/flash-messages.md)
:::
