---
subtitle: "A guided tour of the backend Settings area and what each section does."
---
# Settings Overview

The Settings area is where you configure how your October CMS website behaves behind the scenes. From choosing your active theme to setting up email delivery, everything that controls the overall operation of your site lives here. Understanding what each section does will help you keep your site running smoothly.

To open the Settings area, click **Settings** in the main backend navigation menu. You will see a list of categories and setting pages in the left-hand sidebar.

## Key Settings Sections

### Frontend Theme

Your website's appearance is controlled by a **theme**. The Frontend Theme setting lets you choose which installed theme is currently active -- this is the theme your visitors will see when they browse your site.

1. Go to **Settings > Frontend Theme**.
2. You will see a list of all installed themes, each with a preview and description.
3. Click **Activate** on the theme you want to use.

The change takes effect immediately. Your previous theme is not deleted; it simply becomes inactive, and you can switch back at any time.

::: aside
If you do not see the theme you want, you may need to install it first. See [System Updates](./system-updates.md) for instructions on installing themes from the marketplace.
:::

### Mail Configuration

Before your site can send emails -- such as password reset links, contact form submissions, or notification messages -- you need to configure a mail delivery method.

1. Go to **Settings > Mail Configuration**.
2. Choose a **Send Method**. Common options include:
   - **SMTP** -- connect to an external mail server. You will need the server address, port, username, and password from your email provider.
   - **Sendmail** -- use the server's built-in sendmail program (common on Linux hosting).
   - **PHP Mail** -- use PHP's default `mail()` function. This is the simplest option but may have deliverability issues.
   - **Log** -- does not send real emails. Instead, messages are written to the log file, which is useful for testing.
3. Fill in the required fields for your chosen method.
4. Use the **Send Test Message** button to verify that everything is working correctly.
5. Click **Save**.

::: tip
If your emails are not arriving, check your spam folder first. Many mail providers require additional DNS records (SPF, DKIM) to trust messages from your domain. Your hosting provider can help you set these up.
:::

### Branding

The Branding settings let you personalize the backend itself so it feels like your own. This is especially useful if you are building a site for a client and want the admin panel to carry their branding instead of the default October CMS look.

Available options include:

- **Application Name** -- changes the name displayed in the browser tab and backend header.
- **Application Tagline** -- a short subtitle shown on the login page.
- **Logo** -- upload a custom logo to replace the default October CMS logo.
- **Favicon** -- set a custom icon for browser tabs.
- **Primary Color** -- adjust the accent color used throughout the backend interface.

To access these settings, go to **Settings > Customize Backend** (or **Settings > Branding**, depending on your installation).

### Log Viewer

When something goes wrong on your site, the log files are the first place to look for clues. The Log Viewer gives you a convenient way to browse system logs directly from the backend, without needing to open files on the server.

1. Go to **Settings > Log Viewer** (or **Settings > Event Log**).
2. You will see a list of logged events with timestamps, severity levels, and messages.
3. Click any entry to view the full details, including stack traces for errors.

::: tip
Check the logs regularly, even when things seem fine. Small warnings can sometimes indicate problems that will become bigger over time, and catching them early saves trouble later.
:::

### Administrator Management

This is where you manage the people who have access to your backend -- creating new accounts, assigning roles, and controlling permissions. For a detailed walkthrough, see the [Managing Administrators](./managing-admins.md) page.

## Plugin Settings

One of October CMS's strengths is its plugin ecosystem. Many plugins add their own settings pages to the Settings area. After installing a plugin, look for new entries in the Settings sidebar -- they are usually grouped under a category that matches the plugin's purpose.

For example:

- A **blog plugin** might add settings for the default post layout or comments configuration.
- An **SEO plugin** might provide fields for default meta tags and sitemap preferences.
- A **user authentication plugin** might add options for registration rules and password policies.

Each plugin's documentation will explain what its settings do and how to configure them.

## Configuration Files

Some advanced settings are managed through configuration files on the server rather than through the backend interface. These files live in the `config` directory of your October CMS installation and cover topics like database connections, caching, session handling, and more.

If you need to adjust something that is not available through the Settings area, or if you are following developer documentation that refers to configuration files, see [Configuration](../../../4.x/setup/configuration.md) for details.

::: warning
Editing configuration files incorrectly can prevent your site from loading. Always make a backup before modifying files in the `config` directory, and test your changes immediately after saving.
:::
