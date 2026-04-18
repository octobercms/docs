---
subtitle: "Shared structures and reusable template fragments"
---
# Layouts and Partials

When you build a website, most pages share the same basic structure -- the same header, the same navigation, the same footer. Without a way to define that structure once, you would end up copying and pasting the same HTML into every page. October CMS solves this with **layouts** and **partials**, two features that keep your templates organized and maintainable.

## Layouts

A layout is the shared HTML skeleton that wraps your pages. It defines the overall structure of the document -- the `<html>` tag, the `<head>` section, the navigation, and the footer -- while leaving a space in the middle where each page's unique content gets inserted.

### Why Layouts Matter

Imagine you have 20 pages on your site, and every one of them needs the same header and footer. Without layouts, changing your navigation would mean editing all 20 files. With a layout, you make the change once and every page that uses that layout is updated automatically.

### What a Layout Looks Like

Here is a typical layout file:

::: cmstemplate
```ini
description = "Default website layout"
```
```twig
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ this.page.title }}</title>
    {% styles %}
</head>
<body>
    <nav>
        {% partial "navigation" %}
    </nav>

    <main>
        {% page %}
    </main>

    <footer>
        <p>&copy; {{ "now" | date("Y") }} My Website</p>
    </footer>
    {% scripts %}
    {% framework extras %}
</body>
</html>
```
:::

There are several important Twig tags in this example:

- **`{% page %}`** — this is where the page content gets inserted. When a visitor loads a page that uses this layout, the page's markup replaces this tag.
- **`{% styles %}`** — a placeholder where CSS files injected by components and pages are output. Place this inside `<head>`.
- **`{% scripts %}`** — a placeholder where JavaScript files injected by components and pages are output. Place this before the closing `</body>` tag.
- **`{% framework extras %}`** — includes the October CMS AJAX framework and extra features. You only need this if your site uses AJAX-powered components or forms.
- **`{{ this.page.title }}`** — outputs the current page's title, as defined in the page's configuration section.

### Assigning a Layout to a Page

Every page can specify which layout it uses by setting the `layout` property in its configuration section:

```ini
url = "/about"
layout = "default"
title = "About Us"
```

The value `"default"` refers to a layout file named `default.htm` in your theme's `layouts/` directory. You can create multiple layouts for different sections of your site -- for example, a `blog` layout with a sidebar and a `landing` layout with a full-width design.

## Partials

While layouts handle the overall page structure, **partials** handle the smaller reusable pieces. A partial is a template fragment that you can include in any layout, page, or even other partials.

### When to Use Partials

Partials are ideal for any content that appears in more than one place:

- Navigation menus
- Sidebar widgets
- Card or list item templates
- Social media icons
- Call-to-action banners

::: tip
If you find yourself copying the same block of HTML into multiple pages or layouts, that is a good sign it should be a partial. Extract it into a partial file once, then include it wherever you need it.
:::

### Including a Partial

To include a partial in your template, use the `{% partial %}` tag:

```twig
{% partial "navigation" %}
```

This renders the file `partials/navigation.htm` from your theme. The partial file contains just the HTML fragment -- no need for a full page structure.

### Passing Variables to Partials

You can pass data to a partial to make it flexible. For example, a hero section partial that accepts a custom title:

```twig
{% partial "hero" title="Welcome to Our Site" subtitle="We build great things" %}
```

Inside the `hero.htm` partial, you can use those variables:

```twig
<section class="hero">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
</section>
```

This makes partials highly reusable -- the same partial can render different content depending on where it is included.

## Placeholders

Placeholders give you a way to inject content from a page into specific locations in a layout. This is useful when a page needs to add something to a region of the layout that is not the main content area -- for example, adding extra CSS or a sidebar block.

In your layout, define a placeholder:

```twig
<aside>
    {% placeholder sidebar %}
        <p>Default sidebar content</p>
    {% endplaceholder %}
</aside>
```

In your page, fill that placeholder using `{% put %}`:

```twig
{% put sidebar %}
    <div class="widget">
        <h3>Related Links</h3>
        <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </div>
{% endput %}
```

If a page does not use `{% put %}` for a particular placeholder, the default content inside the `{% placeholder %}` block is rendered instead. This gives you flexibility without requiring every page to define content for every region.

## Putting It All Together

Here is how layouts, partials, and placeholders work together in practice:

1. A **layout** defines the overall HTML document structure with a `{% page %}` tag for the main content area, and optionally `{% placeholder %}` tags for additional content regions.
2. **Partials** are included in the layout (or in pages) using `{% partial %}` to render reusable fragments like navigation and footers.
3. **Pages** provide the main content that fills the `{% page %}` tag, and can optionally use `{% put %}` to inject content into placeholders.

This layered approach keeps your templates clean, reduces duplication, and makes it easy to update shared elements across your entire site.

## Next Steps

Now that you understand how layouts and partials organize your templates, you are ready to make your pages dynamic. Head over to [Adding Dynamic Content](./adding-dynamic-content.md) to learn how to display Tailor content on your pages using components.

For the full technical reference, see [Layouts](../../../4.x/cms/themes/layouts.md) and [Partials](../../../4.x/cms/themes/partials.md) in the developer documentation.
