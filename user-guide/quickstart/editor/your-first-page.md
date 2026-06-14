---
subtitle: "Create two pages, assign them to your layout, and link them together"
---
# Your First Page

A **page** defines the content for a specific URL on your site. Each page uses a layout. The layout provides the shared structure (header, footer, navigation) and the page fills in the unique content.

Every page has a few key settings:

- **Title**: the name shown in the browser tab
- **URL**: the address where visitors find this page
- **Layout**: which layout wraps this page

Let's create two pages and link them together.

## Create the Home Page

1. Navigate to **Editor** in the top menu, then click **Pages** in the side panel.
2. Click the **+ Add** button.
3. Fill in the settings:
   - **Title**: `Home`
   - **URL**: `/`
   - **File Name**: `home`
   - **Layout**: select `default`
4. In the markup editor, enter:

```twig
<h1 class="text-3xl font-bold mb-4">Welcome to My Website</h1>
<p class="text-lg text-gray-600 mb-6">
    This is your first page built with October CMS. The layout provides
    the header and footer, and this page just fills in the content.
</p>
<p>
    Check out the <a href="/about" class="text-blue-600 underline">about page</a> too.
</p>
```

5. Click **Save**.

## Preview It

Click the **Preview** button in the editor toolbar (or visit your site's URL directly). You should see your page rendered inside the layout: the navigation at the top, your content in the middle, and the footer at the bottom.

## Create the About Page

1. Go back to **Editor → Pages** and click **+ Add** again.
2. Fill in the settings:
   - **Title**: `About`
   - **URL**: `/about`
   - **File Name**: `about`
   - **Layout**: select `default`
3. In the markup editor, enter:

```twig
<h1 class="text-3xl font-bold mb-4">About</h1>
<p class="text-lg text-gray-600 mb-6">
    This is another page using the same layout. The header, navigation,
    and footer are identical. Only the content area changed.
</p>
<p>
    Go back to the <a href="/" class="text-blue-600 underline">home page</a>.
</p>
```

4. Click **Save**.

## Update the Links to Use the |page Filter

Right now our links use hardcoded URLs like `/about`. That works, but if you ever rename a page's URL, say from `/about` to `/about-us`, every hardcoded link would break.

The `|page` filter solves this. It generates the URL for a page based on its **file name**, not its URL. So `{{ 'about'|page }}` always produces the correct URL, even if you change it later. Let's update our links.

### Update the Layout

1. Open **Editor → Layouts → default**.
2. Find the navigation links and update them:

```twig
<a href="{{ 'home'|page }}" class="text-gray-600 hover:text-gray-900">Home</a>
<a href="{{ 'about'|page }}" class="text-gray-600 hover:text-gray-900">About</a>
```

3. Click **Save**.

### Update the Home Page

1. Open **Editor → Pages → Home**.
2. Update the link to the about page:

```twig
Check out the <a href="{{ 'about'|page }}" class="text-blue-600 underline">about page</a> too.
```

3. Click **Save**.

### Update the About Page

1. Open **Editor → Pages → About**.
2. Update the link to the home page:

```twig
Go back to the <a href="{{ 'home'|page }}" class="text-blue-600 underline">home page</a>.
```

3. Click **Save**.

## Try the Navigation

Preview the site. Click the **Home** and **About** links in the navigation. They take you between your two pages. Both pages share the same layout, so the header and footer stay consistent.

::: aside
You can also create and edit page files directly in your text editor. Pages live at `themes/mytheme/pages/`. The file `home.htm` corresponds to the home page we just created. The backend editor and the filesystem stay in sync.
:::

## Next Steps

You have two pages with working navigation. Continue to [Content Files](./content-files.md) to learn how to create editable content blocks.
