---
subtitle: "Understand the key files and folders in your October CMS project"
---
# Project Structure

Your October CMS project contains many directories, but you only need to know about a few of them for day-to-day work.

::: dir
```
mysite/
├── app/
│   └── blueprints/    # Content definitions (Tailor blueprints)
├── themes/            # Website templates and assets
├── plugins/           # Add-on functionality
├── config/            # Configuration files
├── storage/           # Uploads, cache, logs (system-managed)
└── .env               # Environment settings
```
:::

- **app/blueprints/** — define your content types (blog posts, portfolios, etc.) using simple YAML files. October CMS generates the backend forms and database tables automatically.
- **themes/** — your site's HTML templates, CSS, JavaScript, and images. Each theme has its own directory containing pages, layouts, partials, and assets.
- **plugins/** — extend your site with additional features. Managed through the backend or Composer.
- **config/** — application configuration. Most settings are controlled through `.env` instead.
- **storage/** — system-managed directory for uploads, caches, and logs. Check `storage/logs/` if you need to debug an error.
- **.env** — environment settings like database credentials, debug mode, and mail configuration. Uses a simple `KEY=VALUE` format.

::: warning
The `.env` file can contain sensitive information like database passwords. Never share it publicly or commit it to version control.
:::

## Next Steps

Now that you know where things live, head over to [Exploring the Backend](./backend-tour.md) to take a tour of the admin panel.

For a complete breakdown of every directory, see the [Directory Structure](../../../4.x/setup/directory-structure.md) page in the developer documentation.
