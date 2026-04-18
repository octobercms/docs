---
subtitle: "Create a layout and a page to see your first result"
---
# Your First Page

You have installed October CMS, explored the project structure, and taken a tour of the backend. Now it is time to build something you can see. In this section, you will create a layout and a page from scratch, then preview the result in your browser. By the end, you will understand the fundamental building blocks of every October CMS website.

## Why Layouts and Pages?

Before we dive in, it helps to understand how October CMS organizes a website:

- A **layout** defines the outer shell of your HTML — things like the `<head>` tag, navigation, header, and footer that stay the same across multiple pages.
- A **page** defines the unique content for a specific URL — the part that changes from page to page.

Every page uses a layout. This means you write your common HTML once in the layout, and each page only needs to contain what makes it unique. This keeps things clean and avoids repetition.

## Step 1: Create a Layout

First, you will create a layout that provides the basic HTML structure for your site.

1. Log into the backend at `http://localhost:8000/admin`.
2. Navigate to **CMS** in the top menu, then click **Layouts** in the side panel.
3. Click the **+ Add** button to create a new layout.
4. In the **File Name** field, enter `default`.
5. In the markup editor, replace any existing content with the following:

```twig
<!DOCTYPE html>
<html>
<head>
    <title>{{ this.page.title }}</title>
    {% styles %}
</head>
<body>
    <header>
        <h1>My Website</h1>
    </header>
    <main>
        {% page %}
    </main>
    <footer>
        <p>&copy; {{ 'now' | date('Y') }} My Website</p>
    </footer>
    {% scripts %}
</body>
</html>
```

6. Click **Save** (or press **Ctrl+S**).

Let's break down what this layout does:

- `{{ this.page.title }}` — outputs the title of whatever page is being displayed, so the browser tab always shows the right name.
- `{% styles %}` — a placeholder where October CMS injects any CSS files your page or components need.
- `{% page %}` — this is the most important tag. It marks where the page's unique content will be inserted.
- `{{ 'now' | date('Y') }}` — outputs the current year, so your copyright notice stays up to date automatically.
- `{% scripts %}` — a placeholder where JavaScript files are injected.

::: tip
Layouts are one of the most powerful concepts in October CMS. By defining your site's header, footer, and navigation in a layout, you ensure that every page on your site shares a consistent structure. When you need to update the navigation or footer, you only need to change it in one place.
:::

## Step 2: Create a Page

Now you will create a page that uses the layout you just built.

1. In the backend, go to **CMS** and click **Pages** in the side panel.
2. Click the **+ Add** button to create a new page.
3. Fill in the page settings:
   - **Title** — enter `Welcome`
   - **URL** — enter `/`
   - **Layout** — select `default` from the dropdown
4. In the markup editor, enter the following content:

```twig
<h2>Welcome to My Website</h2>
<p>This is your first page built with October CMS!</p>
<p>
    You created a layout to define the overall structure, then added
    this page to fill in the content. Everything you see here was
    built from scratch in just a few minutes.
</p>
```

5. Click **Save**.

That is all it takes. The page's markup will be inserted into the layout wherever the `{% page %}` tag appears, giving you a complete HTML page.

## Step 3: Preview Your Page

Open your browser and visit:

```
http://localhost:8000
```

You should see your page rendered with the layout — the "My Website" heading at the top, your welcome content in the middle, and the copyright notice in the footer. Congratulations, you have just built your first page with October CMS!

Try making a change: go back to the backend, edit the page markup, save it, and refresh your browser. You will see the update immediately. This fast feedback loop makes it easy to experiment and iterate.

::: aside
You can also create and edit these files directly in your `themes/` directory using a text editor or IDE. The layout you just created lives at `themes/your-theme/layouts/default.htm`, and the page is at `themes/your-theme/pages/welcome.htm`. The backend editor and the filesystem stay in sync, so use whichever approach you prefer.
:::

## Adding More Pages

To add another page to your site, simply repeat Step 2. For example, you could create an "About" page:

- **Title** — `About`
- **URL** — `/about`
- **Layout** — `default`

Then add your content in the markup editor. Every new page that uses the `default` layout will automatically get the same header and footer structure — you only write the unique content.

## What's Next?

You have covered the fundamentals: installing October CMS, understanding the project layout, navigating the backend, and creating your first layout and page. From here, there is a lot more to explore:

- **Content Management** — learn how to use Tailor blueprints to create structured content like blog posts, team directories, and more, all managed through the backend.
- **Themes & Pages** — dive deeper into the theming system with partials, content blocks, components, and asset management to build a polished, professional website.

For a deeper technical look at pages and layouts, check out the developer documentation for [CMS Pages](../../../4.x/cms/themes/pages.md) and [CMS Layouts](../../../4.x/cms/themes/layouts.md).
