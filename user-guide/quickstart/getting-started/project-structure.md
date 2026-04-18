---
subtitle: "Understand the key files and folders in your October CMS project"
---
# Project Structure

When you open your October CMS project folder for the first time, you will see quite a few directories and files. That can feel overwhelming, but the good news is that you only need to know about a handful of them for day-to-day work. This page explains the ones that matter most.

## Directory Overview

Here is a simplified view of your project's folder structure, highlighting the directories you will interact with most often:

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

Let's walk through each one.

## app/blueprints/

This is where you define the structure of your content using **Tailor blueprints**. Blueprints are simple YAML files that describe things like blog posts, team members, product listings, or any other type of content your website needs.

For example, a blog blueprint might define fields for a title, a featured image, a category, and the post body. Once you create a blueprint file here, October CMS automatically generates the backend forms and database tables for you — no coding required.

You will spend time in this directory whenever you want to add a new type of content or adjust the fields on an existing one.

## themes/

The `themes/` directory holds your website's visual layer — the HTML templates, CSS stylesheets, JavaScript files, and images that control how your site looks and feels. Each theme lives in its own subdirectory (for example, `themes/demo/`).

Inside a theme, you will find:

- **Pages** — the individual pages of your site (home, about, contact, etc.)
- **Layouts** — reusable wrappers that define the common structure around your pages (header, footer, navigation)
- **Partials** — smaller reusable snippets, like a sidebar or a menu
- **Assets** — CSS, JavaScript, images, and other static files

This is where most of the creative work happens when you are designing and building your site.

## plugins/

Plugins extend October CMS with additional features. Want a contact form, an SEO toolkit, or an e-commerce system? There is likely a plugin for it. Plugins you install from the marketplace or build yourself live in this directory.

Each plugin has its own subdirectory organized by author name (for example, `plugins/acme/blog/`). You generally do not need to edit plugin files directly — they are managed through the backend or Composer.

## config/

The `config/` directory contains configuration files that control how different parts of the application behave — things like caching, mail delivery, session handling, and more. These files use PHP arrays to define settings.

For most projects, you will not need to touch these files often. The most common settings (like database credentials and debug mode) are controlled through the `.env` file instead, which is easier to work with.

## storage/

The `storage/` directory is managed by the system. It holds uploaded media files, generated caches, session data, and log files. October CMS handles this directory automatically, so you rarely need to look inside it.

If something goes wrong and you need to check the error logs, you will find them in `storage/logs/`. Otherwise, you can leave this directory alone.

## The .env File

The `.env` file in your project root is where you configure environment-specific settings. This is the first place to look when you need to change:

- **Database connection** — the database type, host, name, username, and password
- **Debug mode** — toggle detailed error messages on or off
- **Application URL** — the base URL of your site
- **Mail settings** — how the system sends email

This file uses a simple `KEY=VALUE` format:

```
APP_DEBUG=true
DB_CONNECTION=sqlite
```

::: warning
The `.env` file can contain sensitive information like database passwords. Never share it publicly or commit it to version control.
:::

::: tip
Most of your day-to-day work will happen in just two places: `themes/` for your site's appearance and `app/blueprints/` for your content structure. Once you are comfortable with those, you will feel right at home.
:::

## Next Steps

Now that you know where things live, it is time to explore the backend — the admin panel where you manage your content and settings. Head over to [Exploring the Backend](./backend-tour.md).

For a complete breakdown of every directory, including advanced directories like `modules/` and `vendor/`, see the [Directory Structure](../../../4.x/setup/directory-structure.md) page in the developer documentation.
