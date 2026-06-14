---
subtitle: Compose and send your first email campaign to subscribers.
---
# Sending Campaigns

With subscribers on your list, you are ready to send them content. In this step, you will compose a campaign using the default template, preview it, and launch it to your subscriber list.

## Creating a Campaign

Navigate to **Mailing List > Campaigns** and click **New Campaign**. Enter a name for your campaign (e.g., "Welcome Newsletter") and select the "Default template" page that was generated earlier. Click **Create** to save it.

The campaign is created in **Draft** status. While in draft, you can edit the content as many times as you like.

## Editing Campaign Content

After creating the campaign, the template's syntax fields appear as an editable form. The default template includes several fields:

- **Introductory message**: the headline text. The default is "Hello there, {first_name}!" which will be personalized with each subscriber's first name.
- **Banner image**: upload an image to display at the top of the email.
- **Opening statement**: a short paragraph introducing the email.
- **Content sections**: a repeating field where you can add multiple sections, each with a heading and rich text content. Click "Add another content section" to add more.
- **Salutation**: a closing message.

Fill in these fields with your content. The right sidebar shows a content guide with available template tags and formatting tips.

## Personalization Tags

Campaign emails support personalization tags that are replaced with subscriber-specific values when the email is sent:

| Tag | Description |
|-----|-------------|
| `{first_name}` | Subscriber's first name |
| `{last_name}` | Subscriber's last name |
| `{email}` | Subscriber's email address |
| `{unsubscribe_url}` | Link for the subscriber to opt out |
| `{browser_url}` | Link to view the email in a web browser |

You can use these tags both in the syntax field content and directly in the template HTML. The `{first_name}` tag is already used in the default template's greeting.

## Previewing and Testing

Before launching, you can preview the campaign and send a test email. Click the **Send test message** button, enter your own email address, and click **Send**. You can optionally select a subscriber list and a specific subscriber to see how the personalization tags resolve for that person.

Check your inbox for the test email. Verify that the content looks correct, the personalization tags resolved properly, and the "View in browser" and "Unsubscribe" links work.

## Launching the Campaign

When you are satisfied with the content, click **Launch campaign**. You will be asked to select which subscribers should receive the email.

Under **Subscriber Lists**, select the "Newsletter" list. If you have RainLab.User installed, you will also see **Recipient Groups** like "All registered users" that you can select alongside your lists.

The launch dialog offers several options:

- **Delayed launch**: check this to schedule the campaign for a specific date and time. The campaign will stay in Pending status until the scheduled time.
- **Staggered launch**: divides subscribers into smaller groups and sends in batches. Useful for large lists to avoid email provider rate limits. You can stagger by time period or by a fixed number of messages per batch.
- **Repeating campaign**: automatically duplicates the campaign after it is sent and schedules the next send. This is covered in the [Dynamic Campaigns](./dynamic-campaigns.md) chapter.

For your first campaign, leave these options unchecked and click **Launch**. The campaign will process immediately.

## Campaign Statuses

A campaign moves through several statuses during its lifecycle:

- **Draft**: content is being edited. This is the only status where you can modify the campaign.
- **Pending**: the campaign is scheduled but has not reached its launch date yet.
- **Processing**: the subscriber list is being prepared. For large lists, this may take a few minutes.
- **Active**: emails are being sent. Some subscribers may have already received the message.
- **Sent**: all emails have been delivered. The campaign dashboard shows open rates and unsubscribe counts.
- **Cancelled**: the campaign was stopped before completion.
- **Archived**: the campaign has been archived and its subscriber tracking data deleted.

## Scheduling and Automation

The plugin processes campaigns automatically using the system scheduler. Pending campaigns are checked and active campaigns are sent in batches every 5 minutes.

If your scheduler is not running, you can manually process campaigns with:

```bash
php artisan campaign:run
```

Make sure your [cron table is configured](https://docs.octobercms.com/3.x/setup/scheduler.html) for automated campaign processing in production.

## Try It Out

1. Create a new campaign and fill in the content fields
2. Send a test message to your own email address
3. Launch the campaign to your "Newsletter" list
4. Check the campaign status as it progresses from Pending to Sent
5. Open the test email and verify the "View in browser" and "Unsubscribe" links work

## Next Steps

Continue to [Customizing the Template](./customizing-the-template.md) to replace the default template with your own branding and layout.
