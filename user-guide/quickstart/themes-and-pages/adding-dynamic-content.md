---
subtitle: "Connecting your Tailor content to your theme templates"
---
# Adding Dynamic Content

So far, you have learned how pages define URLs and how layouts give them a shared structure. But most websites need more than static HTML -- they need to display content that changes over time, like blog posts, product listings, or team member profiles. This is where your Tailor content meets your theme templates.

October CMS uses **components** to bridge the gap between your content (managed through Tailor) and your templates. Components are pre-built pieces of functionality that you drop into a page to fetch and display dynamic data.

## The Three Key Tailor Components

When working with Tailor content, you will use three main components:

- **Collection** — displays a list of Tailor entries. Use this when you want to show multiple items, like a blog listing or a portfolio grid.
- **Section** — displays a single Tailor entry. Use this for detail pages, like an individual blog post or a team member profile.
- **Global** — displays global content that is not tied to a specific entry, like site-wide settings, a company tagline, or social media links.

Each component connects to a specific Tailor blueprint by its **handle** (for example, `Blog\Post`). The component fetches the data, and you use Twig template code to control how it is displayed.

## Building a Blog Listing Page

Let us walk through a practical example: creating a page that lists all of your blog posts.

### Step 1: Create the Page

Create a new page in the CMS editor (or as a file in your theme's `pages/` directory) with the URL `/blog`:

::: cmstemplate
```ini
url = "/blog"
layout = "default"
title = "Blog"

[collection]
handle = "Blog\Post"
```
```twig
<h1>Our Blog</h1>

{% set posts = collection.entries %}
{% for post in posts %}
    <article>
        <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
        <p>{{ post.published_at | date("F j, Y") }}</p>
    </article>
{% endfor %}

{{ collection.links | raw }}
```
:::

Here is what is happening:

1. In the configuration section, the `[collection]` block adds the Collection component to the page and tells it to use the `Blog\Post` handle.
2. In the markup, `collection.entries` returns the list of blog posts.
3. The `{% for %}` loop iterates over each post and renders its title, link, and publication date.
4. `{{ collection.links | raw }}` outputs pagination links so visitors can navigate through multiple pages of posts.

### Step 2: Customize the Listing

You can customize how many posts appear per page and how they are sorted by adding properties to the component configuration:

```ini
[collection]
handle = "Blog\Post"
postsPerPage = 10
sortColumn = "published_at"
sortDirection = "desc"
```

This displays 10 posts per page, sorted by publication date with the newest posts first.

## Building a Blog Detail Page

Now let us create the page that displays a single blog post when a visitor clicks on one from the listing.

### Step 1: Create the Detail Page

Create a new page with a dynamic URL that includes a `:slug` parameter:

::: cmstemplate
```ini
url = "/blog/:slug"
layout = "default"
title = "Blog Post"

[section]
handle = "Blog\Post"
entrySlug = "{{ :slug }}"
```
```twig
<article>
    <h1>{{ section.title }}</h1>
    <time>{{ section.published_at | date("F j, Y") }}</time>
    {{ section.content | raw }}
</article>
```
:::

Here is what is happening:

1. The URL `/blog/:slug` uses a parameter so this page matches any URL like `/blog/my-first-post`.
2. The `[section]` block adds the Section component and tells it to look up the `Blog\Post` entry whose slug matches the URL parameter.
3. The `entrySlug = "{{ :slug }}"` line passes the URL parameter to the component so it knows which post to load.
4. In the markup, `section.title`, `section.published_at`, and `section.content` output the post's data.

::: tip
The `| raw` filter is needed when displaying rich text content (like blog post bodies) because Twig escapes HTML by default for security. Without `| raw`, your formatted text would appear as plain HTML tags instead of rendered content.
:::

## Displaying Global Content

Global content is data that is not tied to a specific entry -- things like your site name, tagline, social media links, or footer text. To display global content, use the **Global** component:

::: cmstemplate
```ini
[global siteInfo]
handle = "Site\Info"
```
```twig
<footer>
    <p>{{ siteInfo.site_name }} &mdash; {{ siteInfo.tagline }}</p>
</footer>
```
:::

Notice that the component is given an alias (`siteInfo`) by writing `[global siteInfo]`. This alias is the name you use in the markup to access the data. Aliases are useful when you have multiple components on the same page.

## Pagination

When you have a large number of entries, the Collection component automatically supports pagination. Adding `{{ collection.links | raw }}` to your markup renders page navigation links (Previous, Next, page numbers) so visitors can browse through all of your content.

You can control the number of items per page using the `postsPerPage` property in the component configuration, as shown in the blog listing example above.

## Next Steps

You have now seen how components connect your Tailor content to your theme templates. To learn more about components in general -- including how to configure them, customize their output, and use components provided by plugins -- continue to [Using Components](./using-components.md).

For the full technical reference on components, see [Components](../../../4.x/cms/themes/components.md) in the developer documentation.
