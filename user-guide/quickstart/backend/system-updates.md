---
subtitle: "Keep your site secure and up to date with the latest improvements."
---
# System Updates

Keeping October CMS, its plugins, and themes up to date is essential. Updates bring new features, performance improvements, and -- most importantly -- security patches that protect your site from known vulnerabilities. Making updates a regular habit is one of the easiest ways to keep your website safe.

## How October CMS Handles Updates

October CMS uses a managed update system. When the October CMS team or a plugin author releases a new version, it is published to the October CMS marketplace. Your backend can check for these releases and apply them with just a few clicks.

Updates can include:

- **Core updates** -- improvements and fixes to October CMS itself.
- **Plugin updates** -- new features, bug fixes, or compatibility changes for installed plugins.
- **Theme updates** -- template fixes or design improvements for installed themes.
- **Database migrations** -- structural changes to the database that accompany code updates.

When an update includes database migrations, they are applied automatically as part of the update process. Your existing data is preserved.

## Checking for Updates

To see if updates are available:

1. Go to **Settings > Updates & Plugins** (or **Settings > Updates**).
2. Click the **Check for Updates** button.
3. The system will contact the October CMS gateway and display a list of any available updates, along with version numbers and changelogs.

::: aside
The dashboard's System Status widget also shows a notification when updates are available, so you can spot them without navigating to the Updates page.
:::

## Updating the Core and Plugins

Once you see available updates, applying them is straightforward.

::: warning
Always create a full backup of your site before applying updates. This includes both your files and your database. While updates are designed to be safe, unexpected issues can occasionally occur -- especially with third-party plugins. Having a backup means you can always roll back if something goes wrong.
:::

1. Go to **Settings > Updates & Plugins**.
2. Review the list of available updates. Read the changelog entries so you understand what each update changes.
3. Click **Update** to apply all available updates at once, or select individual items if you prefer to update them one at a time.
4. Wait for the process to complete. The page will show progress as files are downloaded, extracted, and database migrations are run.
5. Once finished, verify that your site is working correctly by checking key pages and features.

::: tip
After updating, clear your browser cache and test your site in a private browsing window. This ensures you are seeing the latest version of your pages and not a cached copy.
:::

## Installing New Plugins

Plugins extend the functionality of your site. You can browse and install them directly from the backend.

1. Go to **Settings > Updates & Plugins**.
2. Click the **Install Plugins** button.
3. Browse or search for the plugin you want. Each listing includes a description, author, rating, and version information.
4. Click the plugin to view its details, then click **Install** to add it to your site.
5. The plugin will be downloaded, its files placed in the `plugins` directory, and any required database tables will be created automatically.

After installation, the plugin may add new menu items, settings pages, or components that you can use in your themes. Check the plugin's documentation for setup instructions.

## Installing New Themes

Themes control the visual design of your website. Installing a new theme works similarly to plugins.

1. Go to **Settings > Updates & Plugins**.
2. Click the **Install Themes** button.
3. Browse available themes in the marketplace, preview their designs, and click **Install** on the one you want.
4. Once installed, activate the theme by going to **Settings > Frontend Theme** and clicking **Activate** next to it.

::: aside
Installing a theme does not automatically make it active. You must activate it separately, which gives you time to review it before your visitors see it.
:::

## Command-Line Alternative

If you have access to the command line on your server, you can run updates without using the backend interface. This is useful for automated deployments, scripted maintenance, or situations where the backend is temporarily inaccessible.

To update the core and all plugins, run:

```bash
php artisan october:update
```

This command contacts the October CMS gateway, downloads any available updates, and runs database migrations -- the same process that happens when you click Update in the backend.

To install a specific plugin from the command line:

```bash
php artisan plugin:install AuthorName.PluginName
```

To install a specific theme:

```bash
php artisan theme:install AuthorName.ThemeName
```

For more command-line options, see [Installing Packages](../../../4.x/resources/installing-packages.md) and [Updating October](../../../4.x/resources/updating-october.md) in the developer documentation.

## Troubleshooting Updates

If an update does not complete successfully, try these steps:

1. **Check the logs.** Go to **Settings > Event Log** (or use the [Log Viewer](./settings-overview.md)) to see if an error message was recorded.
2. **Try again.** Temporary network issues can interrupt downloads. Clicking **Check for Updates** and applying the update again often resolves the problem.
3. **Use the command line.** Running `php artisan october:update` from the terminal can provide more detailed error output.
4. **Restore your backup.** If an update causes problems you cannot resolve, restore your backup and wait for a fix or reach out to the plugin author for support.

::: warning
Never leave your site in a partially updated state. If an update fails midway, either complete it manually or restore from backup. A half-applied update can cause unpredictable behavior and security gaps.
:::
