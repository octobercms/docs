---
subtitle: "How themes control the look and feel of your website"
---
# Understanding Themes

In October CMS, a **theme** is the collection of files that controls how your website looks and behaves. Everything your visitors see -- the layout, the colors, the typography, the way content is arranged on the page -- is determined by the active theme. Think of it as the complete visual identity of your site, packaged into a single folder.

Understanding how themes are organized will help you make changes with confidence, whether you are tweaking a few styles or building something entirely new.

## What is Inside a Theme?

Every theme follows the same directory structure. This consistency makes it easy to switch between themes or explore how an existing theme works. Here is what a typical theme folder looks like:

::: dir
- themes/
  - my-theme/
    - **pages/** — individual pages, each with its own URL
    - **layouts/** — shared page structures (the HTML skeleton with header, footer, and common elements)
    - **partials/** — reusable template fragments (navigation menus, sidebars, cards)
    - **content/** — static content blocks that can be edited in the backend
    - **assets/** — CSS, JavaScript, images, and fonts
:::

Each of these folders plays a specific role:

- **Pages** are the individual screens of your website. Each page file defines a URL and the content that appears at that address. For example, you might have an `about.htm` page that lives at `/about`.
- **Layouts** provide the shared HTML structure that wraps your pages. Instead of repeating the same header, footer, and navigation on every page, you define it once in a layout and reuse it.
- **Partials** are smaller reusable fragments. If you have a navigation menu that appears in multiple layouts, or a card design you use in several places, a partial lets you write it once and include it wherever you need it.
- **Content** blocks hold static text or HTML that can be edited through the backend without touching template files.
- **Assets** contain all of your static files -- stylesheets, scripts, images, and fonts.

## Switching Themes

You can change your site's active theme at any time without losing your content. To switch themes:

1. Log in to the backend and navigate to **Settings**.
2. Under the **Editor** section, click **Frontend Theme**.
3. Select the theme you want to activate from the list.
4. Click **Save**.

Your website will immediately start using the new theme. Because your content is stored separately from your theme files (in the database, via Tailor blueprints), switching themes changes the presentation without affecting the underlying content.

::: aside
Switching themes changes how your site looks to visitors right away. If you want to preview a theme before making it live, consider setting it up in a local development environment first.
:::

## Installing Themes from the Marketplace

October CMS has a marketplace where you can find free and premium themes. To install a theme:

1. Go to **Settings > Updates & Plugins** in the backend.
2. Search for the theme you would like to install.
3. Click **Install** and wait for the download to complete.

Once installed, the theme will appear in your **Frontend Theme** settings and you can activate it.

You can also install themes via the command line using Composer. Check the theme's marketplace page for the specific installation command.

## Child Themes

If you want to customize an existing theme -- changing colors, adjusting layouts, or adding new partials -- you can create a **child theme**. A child theme inherits all of the files from its parent theme but lets you override specific files with your own versions.

The benefit of using a child theme is that the parent theme can still be updated without overwriting your customizations. Any file you have not overridden will automatically use the parent theme's version, so you get the latest updates while keeping your changes intact.

::: tip
A fresh October CMS installation comes with a demo theme that showcases many of the platform's features. It is a great way to explore how pages, layouts, partials, and components work together. Take some time to look through its files before building your own theme.
:::

## Next Steps

Now that you understand what a theme is and how it is structured, the next step is to learn how pages work. Head over to [Pages and URLs](./pages-and-urls.md) to see how individual pages are created and how they map to the URLs your visitors see.

For the full technical reference on themes, including advanced configuration options, see [Themes](../../../4.x/cms/themes/themes.md) in the developer documentation.
