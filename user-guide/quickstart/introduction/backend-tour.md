---
subtitle: "A guided tour of the October CMS admin panel"
---
# Exploring the Backend

The backend is your control center for managing everything about your website — from editing pages and uploading images to configuring settings and managing user accounts. This page gives you a quick tour so you know where to find things.

## Logging In

To access the backend, open your browser and navigate to your site's URL followed by `/admin`. If you are running the local development server, that means:

```
http://localhost:8000/admin
```

Enter the administrator username and password you created during installation. After logging in, you will land on the Dashboard.

## Main Navigation Areas

The backend's main navigation runs along the top of the screen. Here is what each section is for.

### Dashboard

The Dashboard is the first thing you see after logging in. It gives you a quick overview of your site through **widgets** — small panels that display useful information like recent activity, site statistics, or status indicators.

::: tip
You can customize the Dashboard to show the information that matters most to you. Click the **Manage widgets** button to add, remove, or rearrange widgets. This makes the Dashboard your own personalized command center.
:::

### CMS

The CMS section is where you work with your website's theme files directly. This includes:

- **Pages** — the individual pages that make up your website. Each page has a URL, a title, and content markup.
- **Layouts** — reusable templates that wrap around your pages, providing shared elements like headers, footers, and navigation menus.
- **Partials** — smaller reusable snippets of HTML that can be included in pages and layouts, such as a sidebar widget or a call-to-action banner.
- **Content** — simple text or HTML blocks that can be edited independently and included in your templates.

This is where you build and edit the visual structure of your site. You can use the built-in code editor or work with the files in your `themes/` directory — both approaches stay in sync.

### Media

The Media section is your file manager. Use it to upload, organize, and manage images, documents, videos, and other files. You can create folders to keep things organized, and any file you upload here is available to use across your website.

When you are editing a page or content entry and need to insert an image, the media manager is where those files come from.

### Settings

The Settings section lets you configure how your site works. Here you will find options for:

- **Branding** — customize the backend's appearance with your own logo and colors
- **Administrators** — manage who has access to the backend and what they can do
- **Mail configuration** — set up how your site sends email
- **System updates** — check for and apply updates to October CMS, plugins, and themes

The settings area is organized into groups, so you can quickly find what you need. Some plugins also add their own settings pages here.

### Tailor Entries

When you define content blueprints in your `app/blueprints/` directory, their navigation items appear automatically in the backend's top menu. For example, if you create a blog blueprint, you might see a "Blog" section appear where you can create, edit, and manage your posts.

This is one of the most powerful features of October CMS — you define what kind of content you need, and the system builds the backend interface for you. There is no need to create custom admin pages or write form code.

## The User Menu

In the top-right corner of the backend, you will see your account name or avatar. Clicking on it opens a dropdown menu where you can:

- **My Account** — update your profile information, change your password, or set your preferred language
- **Sign Out** — log out of the backend when you are done

## Plugin Navigation

As you install plugins, some of them will add their own items to the main navigation. For example, a blog plugin might add a "Blog" menu item, or an analytics plugin might add a "Reports" section. These items integrate seamlessly into the existing navigation, so everything feels like part of one unified system.

You do not need to worry about this right away — just know that the navigation can grow as you add more functionality to your site.

## Keyboard Shortcuts

The backend includes a few keyboard shortcuts to speed up your workflow:

- **Ctrl+S** (or **Cmd+S** on macOS) — save the current page, form, or template you are editing
- **Ctrl+Shift+S** — save and close the current editor tab

These small shortcuts can make a big difference once you are editing pages and content regularly.

## Next Steps

Now that you know your way around the backend, it is time to build something. Head over to [Your First Page](./your-first-page.md) to create a layout and a page from scratch — you will have something visible on the frontend in just a few minutes.
