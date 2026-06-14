---
subtitle: Install the Responsiv Campaign plugin and create your first subscriber list.
---
# Installing the Plugin

The Responsiv Campaign plugin provides everything you need for email marketing: subscriber management, campaign composition with a visual editor, template syntax fields, scheduled and staggered sending, open tracking, and automatic unsubscribe handling.

## Installing the Plugin

Navigate to **Settings > Updates & Plugins > Install Packages** and search for "Responsiv.Campaign". Click **Install** to add it to your project.

Alternatively, install via the command line:

```bash
php artisan plugin:install Responsiv.Campaign
```

After installation, you will see a new **Mailing List** section in the backend navigation with links to **Campaigns**, **Lists**, and **Subscribers**.

## Creating a Subscriber List

Navigate to **Mailing List > Lists** and click **New List**. Create a list with the following details:

| Field | Value |
|-------|-------|
| Name | Newsletter |
| Code | `newsletter` |

Subscriber lists are opt-in groups that visitors join via signup forms on your site. You can create multiple lists for different purposes (e.g., a product updates list and a blog digest list). Each list tracks its own subscribers independently.

## Generating the Default Template

Navigate to **Mailing List > Campaigns** and click **New Campaign**. Since no campaign template pages exist yet, the plugin offers to generate one for you. Click **Generate Template** to create a default CMS page at `campaign/message.htm` with the `campaignTemplate` component already attached.

This page serves as the HTML scaffold for all your campaign emails. You will customize it later, but the default template gives you a working starting point with a header, banner image, content sections, and footer.

After the template is generated, close the campaign creation dialog. You will create your first campaign after setting up the signup form.

## How Campaign Templates Work

Campaign templates are CMS pages with the `campaignTemplate` component. Unlike regular pages, they do not use a site layout. Instead, they contain a complete HTML email document with inline styles and table-based formatting (required for email client compatibility).

Templates use a special syntax for editable fields:

- `{text name="greeting" label="Greeting"}Default value{/text}`: a single-line text input
- `{textarea name="intro" label="Introduction"}{/textarea}`: a multi-line text input
- `{richeditor name="body" label="Content"}{/richeditor}`: a WYSIWYG content editor
- `{fileupload name="banner" label="Banner image"}{/fileupload}`: a file upload field
- `{repeater name="sections" prompt="Add section"}...{/repeater}`: repeatable groups of fields

When you create a campaign and select a template, these syntax fields appear as an editable form in the backend. The content you enter is rendered into the template HTML and sent to subscribers.

## Next Steps

Continue to [Signup Form](./signup-form.md) to create a subscription form that visitors can use to join your mailing list.
