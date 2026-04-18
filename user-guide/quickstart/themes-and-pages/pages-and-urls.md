---
subtitle: "How pages are created and mapped to URLs"
---
# Pages and URLs

Every page on your October CMS website corresponds to a file inside the `pages/` directory of your active theme. When a visitor navigates to a URL on your site, October CMS looks for a page file that matches that URL and renders it. Understanding this relationship between files and URLs is key to building and organizing your site.

## The Anatomy of a Page File

October CMS page files use a special two-section format. The top section contains configuration settings (written in an INI-like syntax), and the bottom section contains the actual markup (HTML and Twig). The two sections are separated by a line containing `==`.

Here is what a simple page file looks like:

::: cmstemplate
```ini
url = "/about"
layout = "default"
title = "About Us"
description = "Learn more about our company"
```
```twig
<h2>About Us</h2>
<p>We are a great company that builds amazing things.</p>
```
:::

The configuration section at the top tells October CMS:

- **url** — the address where this page can be found (in this case, `yoursite.com/about`)
- **layout** — which layout template to wrap this page in
- **title** — the page title, often used in the browser tab and navigation menus
- **description** — a brief description of the page, useful for search engines

Everything below the `==` separator is the page's markup -- the HTML and Twig template code that produces what visitors see.

## Creating Pages

You have two options for creating pages, and you can freely mix both approaches.

### Using the CMS Editor

The most common way to create pages is through the backend:

1. Log in to the backend and navigate to **CMS** in the main menu.
2. Click **Pages** in the sidebar.
3. Click the **+ Add** button to create a new page.
4. Fill in the page settings (URL, title, layout) and write your markup in the editor.
5. Click **Save** to publish the page.

The CMS editor gives you a visual interface for managing all of your page settings, and you can see your changes immediately.

### Creating Files Directly

Since pages are just files on disk, you can also create them by adding `.htm` files directly to your theme's `pages/` directory using any text editor. This approach is popular with developers who prefer working in a code editor, and it makes it easy to manage pages through version control.

::: tip
You can create pages using either the backend CMS editor or by adding files directly to your theme's `pages/` directory -- whichever approach fits your workflow. Both methods produce the same result, and changes made in one are immediately reflected in the other.
:::

## URL Parameters

Static URLs like `/about` or `/contact` work well for fixed pages, but many websites need dynamic URLs. For example, a blog needs a URL that changes based on which post you are reading.

October CMS handles this with **URL parameters**. A parameter is a variable part of the URL, written with a colon prefix:

```ini
url = "/blog/:slug"
```

In this example, `:slug` is a placeholder that matches any value. So this single page file handles all of these URLs:

- `/blog/my-first-post`
- `/blog/company-announcement`
- `/blog/tips-and-tricks`

The matched value is passed to the page as a variable, so your page template and components can use it to look up the right content. You will see this in action when you learn about [adding dynamic content](./adding-dynamic-content.md).

You can also make parameters optional by adding a question mark:

```ini
url = "/blog/:slug?"
```

This means the page will match both `/blog` and `/blog/some-post`.

## Page Settings

Beyond `url`, `layout`, `title`, and `description`, pages support a few other useful settings:

- **is_hidden** — when set to `1`, the page will not appear in automatically generated navigation menus, but it is still accessible by its URL
- **meta_title** and **meta_description** — let you set SEO-specific values that differ from the page title and description

These settings can be configured through the CMS editor's page inspector or by adding them directly to the configuration section of the page file.

## How October CMS Resolves URLs

When a visitor requests a URL, October CMS checks each page's `url` setting to find a match. It follows these rules:

1. Exact matches are checked first (e.g., `/about` matches before `/:slug`).
2. Pages with URL parameters are checked next, in order of specificity.
3. If no page matches, October CMS returns a 404 error page.

This means you can have both a page at `/blog` (a listing page) and another at `/blog/:slug` (a detail page), and October CMS will route visitors to the correct one based on the URL they request.

## Next Steps

Pages define what content appears at each URL, but they do not work alone. Head over to [Layouts and Partials](./layouts-and-partials.md) to learn how layouts provide the shared structure that wraps your pages, and how partials help you reuse common template fragments.

For the full technical reference on pages, see [Pages](../../../4.x/cms/themes/pages.md) in the developer documentation.
