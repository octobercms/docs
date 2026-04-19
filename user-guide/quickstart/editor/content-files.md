---
subtitle: "Create editable content blocks using Markdown"
---
# Content Files

A **content file** holds static text or Markdown that can be edited in the backend without touching your page templates. Content files are great for text that changes often, such as an "about" blurb, a legal notice, or a welcome message. They are ideal for anything where you want to update the words without opening the page markup.

The key idea: your page template decides **where** content appears, and the content file provides **what** appears there.

## Create a Content Block

1. Navigate to **Editor** in the top menu, then click **Content** in the side panel.
2. Click the **+ Add** button.
3. A new file appears. Click the file name at the top and rename it to `my-content.md`. The `.md` extension tells October CMS to render this as Markdown.
4. In the editor, enter some Markdown content:

```markdown
## About This Site

This website was built with **October CMS** during the Quick Start tutorial.
It uses a Tailwind CSS layout and demonstrates how pages, content blocks,
and the media manager work together.

Here are a few things we have covered so far:

- Creating a theme
- Building a layout with Tailwind CSS
- Adding pages with navigation links
- Using content blocks like this one
```

5. Click **Save**.

## Include the Content on a Page

1. Go to **Editor → Pages** and open **Home**.
2. Add the content block to the page markup by inserting this line where you want it to appear:

```twig
{% content 'my-content.md' %}
```

For example, your full markup might look like:

```twig
<h1 class="text-3xl font-bold mb-4">Welcome to My Website</h1>
<p class="text-lg text-gray-600 mb-6">
    This is your first page built with October CMS. The layout provides
    the header and footer, and this page just fills in the content.
</p>

<div class="prose mt-8">
    {% content 'my-content.md' %}
</div>

<p class="mt-6">
    Check out the <a href="{{ 'about'|page }}" class="text-blue-600 underline">about page</a> too.
</p>
```

3. Click **Save** and preview the page.

You should see the Markdown content rendered as HTML on your page. The `prose` class from Tailwind gives it nice typography.

::: tip
The real power of content blocks is that you (or a client) can edit the text in the backend without touching the page template. Change the Markdown in the content file, save it, and the page updates immediately.
:::

::: aside
For the full reference on content files, see [Content](../../../4.x/cms/themes/content.md) in the developer documentation.
:::

## Next Steps

Continue to [Including Partials](./including-partials.md) to learn about reusable template fragments.
