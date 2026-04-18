---
subtitle: "Build the HTML skeleton that all your pages will share"
---
# Creating a Layout

A **layout** is the shared HTML structure that wraps every page on your site. It defines the `<head>` tag, header, footer, navigation — everything that stays the same from page to page. Instead of repeating this HTML in every page file, you write it once in a layout.

The most important tag in a layout is `{% page %}` — this marks the spot where each page's unique content gets inserted.

## Create the Default Layout

1. Navigate to **Editor** in the top menu, then click **Layouts** in the side panel.
2. Click the **+ Add** button.
3. In the **File Name** field, enter `default`.
4. Replace any existing content in the markup editor with the following:

```twig
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ this.page.title }} | My Website</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@4" rel="stylesheet">
    {% styles %}
</head>
<body class="bg-gray-50 text-gray-800">

    <header class="bg-white shadow-sm">
        <nav class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" class="text-xl font-bold text-gray-900">My Website</a>
            <div class="space-x-4">
                <a href="/" class="text-gray-600 hover:text-gray-900">Home</a>
                <a href="/about" class="text-gray-600 hover:text-gray-900">About</a>
            </div>
        </nav>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-10">
        {% page %}
    </main>

    <footer class="bg-white border-t mt-16">
        <div class="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
            &copy; {{ 'now'|date('Y') }} My Website
        </div>
    </footer>

    {% scripts %}
    {% framework extras %}
</body>
</html>
```

5. Click **Save** (or press **Ctrl+S**).

## What This Layout Does

Let's walk through the key parts:

- **Tailwind CSS** — loaded from a CDN, giving us utility classes for styling without writing any custom CSS. This is the approach we will use throughout the rest of the tutorials.
- **`{{ this.page.title }}`** — outputs the current page's title in the browser tab.
- **`{% page %}`** — the placeholder where each page's content gets inserted.
- **`{% styles %}`** and **`{% scripts %}`** — placeholders where October CMS injects any CSS or JavaScript added by components.
- **`{% framework extras %}`** — includes the October CMS AJAX framework, which we will use later for interactive features like forms.

::: tip
The navigation links use hardcoded URLs for now (`/` and `/about`). After we create the pages, we will update them to use the `|page` filter so they stay in sync automatically.
:::

## Next Steps

Your layout is ready. Let's create some pages that use it. Continue to [Your First Page](./your-first-page.md) to build your first two pages and see them in the browser.
