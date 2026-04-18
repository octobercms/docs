---
subtitle: "Reusable building blocks that add functionality to your pages"
---
# Using Components

Components are the building blocks that bring your October CMS pages to life. They are self-contained pieces of functionality that you can add to any page -- fetching content from the database, rendering forms, handling user input, and more. You have already seen components in action with the Section, Collection, and Global components for Tailor content. This page takes a broader look at how components work and how you can make the most of them.

## How Components Work

Every component follows the same basic pattern:

1. You **add** the component to a page (either through the CMS editor or in the page file).
2. You **configure** the component by setting its properties.
3. You **use** the component in your page markup to display its output.

Components are provided by the core system and by plugins. When you install a plugin, it may register new components that you can use on your pages.

## Adding a Component to a Page

### Using the CMS Editor

The easiest way to add a component is through the backend CMS editor:

1. Open a page in **CMS > Pages**.
2. Click the **Components** panel in the sidebar.
3. Find the component you want and click it (or drag it) to add it to the page.
4. An inspector panel will appear where you can configure the component's properties.

The CMS editor will automatically add the component to your page's configuration section and, in some cases, insert default markup into the page body.

### Using Code

You can also add components by writing them directly into the page file's configuration section. Each component is added as a block using square brackets:

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
    {{ section.content | raw }}
</article>
```
:::

The `[section]` block adds the Section component, and the lines below it set its properties. The component is then available in the markup section using its name (or alias) as a variable.

## Component Aliases

When you add a component, its name becomes the variable you use in your markup. But what if you need two instances of the same component on one page? You can give each one a unique **alias**:

```ini
[collection recentPosts]
handle = "Blog\Post"
postsPerPage = 5

[collection featuredPosts]
handle = "Blog\Featured"
postsPerPage = 3
```

Now you can reference each collection separately in your markup:

```twig
<h2>Recent Posts</h2>
{% for post in recentPosts.entries %}
    <p>{{ post.title }}</p>
{% endfor %}

<h2>Featured Posts</h2>
{% for post in featuredPosts.entries %}
    <p>{{ post.title }}</p>
{% endfor %}
```

The alias appears after the component name, separated by a space: `[collection recentPosts]` means "add a Collection component and call it `recentPosts`."

## Configuring Component Properties

Each component has its own set of properties that control its behavior. You can set these properties in two ways:

- **In the CMS editor** — click on the component to open its inspector, which shows all available properties with descriptions and default values.
- **In code** — add property lines below the component's `[block]` in the configuration section.

::: tip
The CMS editor's component inspector is the best way to discover what properties a component supports. It shows each property's name, description, and default value, so you do not need to memorize them.
:::

Common property patterns you will see:

```ini
[section]
handle = "Blog\Post"
entrySlug = "{{ :slug }}"
```

The `{{ :slug }}` syntax is a special expression that passes a URL parameter to the component. The colon prefix (`:slug`) refers to the URL parameter defined in the page's `url` setting.

## Built-in Components

October CMS includes several components out of the box. Here are the ones you will use most often:

### Section

Displays a single Tailor entry. Use it on detail pages where you want to show one specific item, such as a blog post, a team member profile, or a product page.

```ini
[section]
handle = "Blog\Post"
entrySlug = "{{ :slug }}"
```

### Collection

Displays a list of Tailor entries. Use it on listing pages where you want to show multiple items, such as a blog index, a portfolio grid, or a staff directory.

```ini
[collection]
handle = "Blog\Post"
postsPerPage = 10
```

### Global

Displays global Tailor content that is not tied to a specific entry. Use it for site-wide data like your company name, social media links, or a site-wide announcement banner.

```ini
[global siteInfo]
handle = "Site\Info"
```

### Resources

Includes CSS and JavaScript assets on the page. Use it when you need to add external stylesheets or scripts to a specific page rather than globally in the layout.

```ini
[resources]
```

## Plugin Components

Plugins can register their own components, extending the functionality available to your pages. For example:

- A **contact form** plugin might provide a component that renders a form and handles submissions.
- A **media gallery** plugin might provide a component for displaying image galleries.
- An **authentication** plugin might provide components for login forms, registration, and password reset.

After installing a plugin, its components will appear in the CMS editor's component list. You add and configure them the same way as built-in components.

## Overriding Component Markup

Some components provide their own default markup -- a pre-built template that renders their output. If the default look does not match your design, you can override it without modifying the component's source code.

To override a component's default partial:

1. Find the partial file name in the component's documentation or source.
2. Create a matching file in your theme's `partials/` directory, inside a folder named after the component alias.

For example, if the `section` component renders a partial called `default.htm`, you can override it by creating:

::: dir
- partials/
  - section/
    - default.htm
:::

Your custom partial will be used instead of the component's built-in version. This gives you full control over the component's HTML output while still benefiting from the component's data-fetching logic.

::: warning
When you override a component's partial, you are responsible for including all of the markup the component expects. Check the original partial to make sure you are not leaving out any important elements or variables.
:::

## Next Steps

You now have a solid understanding of how themes, pages, layouts, partials, and components work together in October CMS. With these building blocks, you can create any kind of website -- from simple brochure sites to content-rich applications.

For the full technical reference on components, see [Components](../../../4.x/cms/themes/components.md) and [CMS Components](../../../4.x/cms/components/section.md) in the developer documentation.
