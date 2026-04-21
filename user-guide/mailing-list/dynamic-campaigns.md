---
subtitle: Build a campaign template that automatically includes your latest blog posts.
---
# Dynamic Campaigns

So far, every campaign you have sent uses static content: the same email for every subscriber. In this final step, you will create a dynamic template that pulls your latest blog posts into the email, and set it up as a repeating weekly digest.

## What Are Dynamic Templates

By default, campaign templates render once and the same HTML is sent to every subscriber. Dynamic templates are different: they are rendered once per subscriber at send time, meaning the template can include live data from your site using CMS components and Twig logic.

Enable dynamic rendering by setting `isDynamic = "1"` on the `campaignTemplate` component.

> **Note**: dynamic templates increase database storage because a copy of each rendered email is saved per subscriber. For large lists, this is an important consideration.

## Creating the Blog Digest Template

This template uses the `collection` component from the [Creating a Blog](../blog/introduction.md) tutorial to pull in the latest published posts.

Create a new page at `pages/campaign/blog-digest.htm`:

::: cmstemplate
```ini
title = "Blog Digest"
url = "/campaign/blog-digest/:code"
description = "Weekly digest with the latest blog posts"

[campaignTemplate]
isDynamic = "1"
verifyPage = "subscribe/confirmed"
unsubscribePage = "subscribe/goodbye"

[collection]
handle = "Blog\Post"
```
```twig
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>
        Blog Digest
    </title>
</head>

<body style="margin: 0; padding: 0; background-color: #f3f4f6;">

    <table cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
    <td align="center" style="padding: 24px 0;">

        <!-- Email container -->
        <table cellspacing="0" cellpadding="0" border="0" width="600" style="width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden;">

            <!-- Header -->
            <tr>
                <td style="background-color: #1e3a5f; padding: 24px 32px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: bold;">
                        Weekly Blog Digest
                    </h1>
                </td>
            </tr>

            <!-- Intro -->
            <tr>
                <td style="padding: 32px 32px 16px;">
                    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.6; color: #333333;">
                        <p style="margin: 0;">
                            {text name="greeting" label="Greeting"}Hi {first_name}, here are our latest posts this week.{/text}
                        </p>
                    </div>
                </td>
            </tr>

            <!-- Blog posts -->
            {% set posts = collection.take(5).get() %}
            {% for post in posts %}
                <tr>
                    <td style="padding: 16px 32px; {{ not loop.last ? 'border-bottom: 1px solid #e5e7eb;' }}">
                        <div style="font-family: Arial, Helvetica, sans-serif;">
                            <h2 style="margin: 0 0 4px; font-size: 18px; color: #1e3a5f;">
                                <a href="{{ 'blog-post'|page({slug: post.slug}) }}" style="color: #1e3a5f; text-decoration: none;">
                                    {{ post.title }}
                                </a>
                            </h2>
                            <p style="margin: 0 0 8px; font-size: 12px; color: #9ca3af;">
                                {{ post.published_at_date|date('F j, Y') }}
                            </p>
                            {% if post.excerpt %}
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #4b5563;">
                                    {{ post.excerpt }}
                                </p>
                            {% endif %}
                        </div>
                    </td>
                </tr>
            {% endfor %}

            <!-- Footer -->
            <tr>
                <td style="background-color: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb;">
                    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #6b7280; text-align: center; line-height: 1.5;">
                        <p style="margin: 0 0 8px;">
                            You received this email because you subscribed to our newsletter.
                        </p>
                        <p style="margin: 0;">
                            <a href="{browser_url}" style="color: #2563eb; text-decoration: none;">
                                View in browser
                            </a>
                            &nbsp;&bull;&nbsp;
                            <a href="{unsubscribe_url}" style="color: #2563eb; text-decoration: none;">
                                Unsubscribe
                            </a>
                        </p>
                    </div>
                </td>
            </tr>

        </table>

    </td>
    </tr>
    </table>

    {tracking_pixel}

</body>
</html>
```
:::

This template queries the five most recent blog posts and renders each one with a title, date, and excerpt. Because it is a dynamic template, the blog posts are fetched at send time, so subscribers always receive the latest content.

## How Dynamic Rendering Works

When the campaign processes, the plugin renders the CMS page for each subscriber individually. The `collection` component runs its query during each render, pulling the latest blog posts from the database. The rendered HTML is stored in the campaign's subscriber pivot table so that:

- Each subscriber's email is a snapshot of the content at the time it was sent
- The "View in browser" link shows the exact email that was delivered
- You can verify what each subscriber received in the backend

The `{text}` syntax field for the greeting is still editable in the campaign form. Static syntax fields and dynamic CMS components work together in the same template.

## Adding Subscribers on Registration

If you have RainLab.User installed (from the [Forum](../forum/installing-the-user-plugin.md) or [Helpdesk](../helpdesk/installing-the-plugin.md) tutorials), registered users are automatically available as campaign recipients. The Campaign plugin registers an "All registered users" recipient group.

When launching a campaign, you can select this group under **Recipient Groups** alongside your subscriber lists. This means:

- **Signup form subscribers**: anonymous visitors who opted in via the newsletter form
- **Registered users**: anyone with an account on your site

You can target both groups with a single campaign, or use them separately for different campaigns.

## Setting Up a Repeating Campaign

A repeating campaign automatically duplicates itself after sending and schedules the next send. This is ideal for a weekly blog digest.

1. Navigate to **Mailing List > Campaigns** and create a new campaign
2. Enter a name like "Weekly Blog Digest" and select the **Blog Digest** template
3. Fill in the greeting text. Since the blog posts are pulled dynamically, you only need to write the intro once.
4. Click **Launch campaign** and select the "Newsletter" list
5. Check the **Repeating campaign** option and select **Weekly** as the frequency
6. Optionally check **Delayed launch** and pick a date and time for the first send (e.g., next Monday morning)
7. Click **Launch**

After the campaign sends, the plugin automatically creates a duplicate campaign with a launch date one week in the future. This continues indefinitely until you manually cancel the latest pending campaign.

Each new iteration re-renders the dynamic template, so the blog posts will be different each week as you publish new content.

## Summary

You now have a complete mailing list system built with October CMS:

1. **Plugin Setup**: installed Responsiv.Campaign and created a subscriber list
2. **Signup Form**: a reusable partial with email confirmation that visitors use to join the mailing list
3. **Campaign Sending**: composed and launched an email campaign from the backend
4. **Custom Template**: replaced the default template with your own branding and layout
5. **Dynamic Campaigns**: a blog digest template that pulls live content, with automatic weekly sends

## Managing Subscribers

The backend provides full subscriber management under **Mailing List > Subscribers**. You can:

- View all subscribers with their confirmation status and subscription date
- Filter subscribers by date range or confirmation status
- Import subscribers from a CSV file (useful for migrating from another platform)
- Export your subscriber list to CSV
- Manually confirm or unsubscribe individual subscribers

Under **Mailing List > Lists**, you can also add recipients from groups like "All registered users" to a subscriber list.

## Going Further

- **Multiple templates**: create different template designs for announcements, product updates, and digests
- **Staggered sending**: for large subscriber lists, use the staggered launch option to send in batches and avoid email provider rate limits
- **Meta data**: enable the `metaData` property on the signup component to capture extra subscriber information like interests or preferences. Add `<input name="meta[interest]" />` fields to your form.
- **Custom tags**: register your own personalization tags from a plugin using the `registerMailCampaignTags()` method in your Plugin.php file
- **Campaign statistics**: after a campaign is sent, the preview page shows open rates, unsubscribe counts, and per-subscriber delivery status
