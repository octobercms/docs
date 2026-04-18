---
subtitle: "Create a theme to hold your site's pages, layouts, and assets"
---
# Understanding Themes

In October CMS, a **theme** is the folder that holds everything your visitors see — pages, layouts, partials, content blocks, and assets like CSS and JavaScript. Your site always has one active theme, and switching themes changes the entire look and feel without affecting your content.

A theme's folder structure looks like this:

::: dir
- themes/
  - my-theme/
    - **pages/** — individual pages, each with its own URL
    - **layouts/** — shared page structures (header, footer, common elements)
    - **partials/** — reusable template fragments
    - **content/** — static content blocks that can be edited in the backend
    - **assets/** — CSS, JavaScript, images, and fonts
:::

You don't need to memorize this — you will learn each piece as we go. For now, let's create a theme.

## Navigate to the Theme Settings

1. In the backend, go to **Settings → Frontend Theme**.
2. You will see any themes that are currently installed. A fresh installation includes a demo theme.

## Create a New Blank Theme

1. Click the **Create a new blank theme** button.
2. Enter the following:
   - **Name** — `My Theme`
   - **Directory Name** — `mytheme`
3. Click **Create**.

Your new theme now appears in the list. It is an empty theme — no pages, no layouts, just an empty folder ready for you to build in.

## Activate Your Theme

1. Find **My Theme** in the theme list.
2. Click the **Activate** button next to it.
3. Confirm the activation.

Your site is now using your new blank theme. If you visit the frontend right now, you will see a blank page — that is expected. We haven't created any pages yet.

::: aside
The demo theme is still installed and you can switch back to it at any time. Switching themes does not delete anything.
:::

## Next Steps

Your theme is created and active. Let's give it some structure. Continue to [Creating a Layout](./creating-a-layout.md) to build the HTML skeleton that all your pages will share.
