---
previousPath: cms/tailor/blueprints.md#submission
subtitle: Blueprint Type
shortname: Submission
---
# Submission Blueprint

A submission blueprint is used to accept user generated content from the frontend of your website, such as blog comments, contact form submissions or product reviews. Submissions are captured on the frontend using the [submission component](../tailor-components/submission.md) and moderated in the admin panel.

The following defines a **Comment** submission with Name (`author_name`), Email Address (`author_email`) and Comment (`content`) fields, along with a reference to the blog post (`post`) being commented on.

```yaml
handle: Blog\Comment
type: submission
name: Comment

submission:
    titleTemplate: '{{ str_limit(content, 60) }}'

fields:
    author_name:
        label: Name
        type: text
        validation: required|min:2|max:100

    author_email:
        label: Email Address
        type: email
        validation: required|email

    content:
        label: Comment
        type: textarea
        validation: required|min:5|max:2000

    post:
        label: Post
        type: entries
        source: Blog\Post
        maxItems: 1
```

The following properties are supported by the submission blueprint.

Property | Description
-------- | -------------
**handle** | A meaningful and unique code to identify the entry.
**type** | set to `submission` for this blueprint type.
**name** | The label to display when working with this entry.
**fields** | form fields belonging to the group, see [backend form fields](../form-fields.md).
**submission** | submission configuration supplied for this type (see below).

The following values are supported by the `submission` property.

Property | Description
-------- | -------------
**titleTemplate** | a Twig template used to build the record title (see below).
**notifyGroup** | an admin user group code to notify by email when a submission is received (see below).
**notifyTemplate** | the mail template used for the notification. Default: `tailor:submission-notification`
**notifyReplyTo** | field name used as the reply-to address for the notification. Default: `email`
**spamSweepDays** | lookback window in days used when marking a record as spam, where other pending submissions from the same IP address are also rejected. Use `0` to disable the sweep. Default: `30`
**purgeRejectedDays** | number of days to keep rejected submissions before they are deleted forever. Use `0` to disable purging. Default: `30`

::: warning
Every field defined on a submission blueprint accepts user input from the frontend, so only define fields that visitors are allowed to populate.
:::

## Moderation Workflow

Submissions arrive with a **Pending** status and are hidden from the frontend until they are approved. The admin panel provides **Approve** and **Reject** buttons for moderating records, where rejected submissions are soft deleted and can be restored at any time.

The **Spam** button rejects the selected records and also rejects other pending submissions received from the same IP address within the `spamSweepDays` window. Submissions that have already been approved are never affected by the sweep.

Rejected submissions are deleted forever after the `purgeRejectedDays` retention period has passed. This clean up happens automatically when viewing the submissions list in the admin panel.

Every submission automatically captures the visitor IP address and user agent in the `submitted_ip` and `submitted_user_agent` attributes. These are available as a list column, a filter scope and as read-only fields when viewing the record.

## Multi-Step Fields

Fields on a submission blueprint can be assigned to a step using the `tags` property, which accepts a single tag or an array of tags. This groups fields so they can be captured across several steps by a [multi-step submission form](../tailor-components/submission.md#multi-step-forms).

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

Each step validates only the fields tagged for that step, so a required field on a later step never prevents an earlier step from being saved.

::: tip
When your site runs behind a proxy or CDN, configure the [trusted proxy settings](../../setup/configuration.md) so the correct visitor IP address is captured.
:::

## Record Titles

Submissions generate their record title automatically since there is no title field presented to the visitor. Use the `titleTemplate` property to build the title from the submitted field values, where every field is available as a Twig variable, along with a `record` variable for accessing related records.

```yaml
submission:
    titleTemplate: '{{ author_name }} on {{ record.post.title }}'
```

When no template is configured, the title falls back to the first available value from the `name`, `subject`, `author_name`, `full_name` or `email` fields, otherwise a random reference is generated, for example, **Submission #GNNWPWFK**.

## Email Notifications

Use the `notifyGroup` property to send an email notification to an [admin user group](../../backend/panel/users.md#groups) every time a submission is received. The value is the group code, found in the admin panel by navigating to **Settings → Team → Manage Groups**.

```yaml
submission:
    notifyGroup: contact-team
```

Notifications are sent with the generic `tailor:submission-notification` mail template, listing the submitted field values with a link to moderate the record in the admin panel. Use the `notifyTemplate` property to specify a custom [mail template](../../backend/services/mail.md), where every field is available as a Twig variable, along with the following variables.

Variable | Description
-------- | -------------
**fields** | the submitted field values as an array of `label` and `value` pairs.
**title** | the generated record title.
**blueprintName** | the name of the submission blueprint.
**recordUrl** | a link to the record in the admin panel.
**record** | the submission record for accessing related records.

```yaml
submission:
    notifyGroup: contact-team
    notifyTemplate: blog:new-comment
```

When the submission contains a valid email address, it is used as the reply-to address for the notification, letting moderators respond directly from their mail client. The address is taken from the `email` field by default and the `notifyReplyTo` property can specify a different field name.

```yaml
submission:
    notifyGroup: contact-team
    notifyReplyTo: author_email
```

Notification failures never lose a submission since the record is saved first, and any mail errors are captured in the event log without interrupting the visitor.
