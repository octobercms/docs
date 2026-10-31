---
subtitle: Show Tailor entries and globals on your pages using the section, collection and global components.
---
# Displaying Content

Tailor content reaches your pages through three CMS components. The `collection` component lists many entries, the `section` component shows one entry, and the `global` component makes a global record available. Add a component to a page, layout or partial, and its variable holds the content.

::: cmstemplate
```ini
url = "/blog"

[collection posts]
handle = "Blog\Post"
```
```twig
{% for post in posts %}
    <h2>
        {{ post.title }}
    </h2>
{% endfor %}
```
:::

Each component takes a `handle` property naming the blueprint, and the component alias, such as `posts` above, becomes the variable name on the page. The components only return entries that are published, unless an editor is previewing an entry from the admin panel.

## Listing Entries

The `collection` component lists the entries of a blueprint. Loop over the variable to display each record, and use the `is empty` test to show a message when there are none.

::: cmstemplate
```ini
url = "/blog"

[collection posts]
handle = "Blog\Post"
```
```twig
{% for post in posts %}
    <a href="{{ 'blog/post'|page({ slug: post.slug }) }}">
        {{ post.title }}
    </a>
{% endfor %}

{% if posts is empty %}
    <p>
        {{ __('No posts found.') }}
    </p>
{% endif %}
```
:::

The [`__()` function](../../handbook/twig-functions/trans.md) translates the message, and the `|trans` filter is available as an alternative syntax.

### Filtering and Sorting Entries

Calling a method on the component variable starts a new [database model query](../../backend/data/query-builder.md). End the query with `get()` to return the records.

```twig
{% set featuredPosts = posts.where('is_featured', true).orderBy('published_at', 'desc').get() %}
```

The [collection component](../../handbook/tailor-components/collection.md) also accepts `sortColumn` and `sortDirection` properties to set the default order.

### Paginating Entries

End the query with `paginate()` instead of `get()` to split the records into pages, then display the links with the [`pager()` function](../../handbook/twig-functions/pager.md).

```twig
{% set pagedPosts = posts.paginate(10) %}

{% for post in pagedPosts %}
    <h2>
        {{ post.title }}
    </h2>
{% endfor %}

{{ pager(pagedPosts) }}
```

See [Pagination](../ajax/pagination.md) for custom pagination markup.

## Showing a Single Entry

The `section` component finds one entry and makes it available to the page. By default, it looks up the entry using the `:slug` URL parameter.

::: cmstemplate
```ini
url = "/blog/:slug"

[section post]
handle = "Blog\Post"
```
```twig
{% if post is empty %}
    {% do abort(404) %}
{% endif %}

<h1>
    {{ post.title }}
</h1>

{{ post.content|raw }}
```
:::

The [`abort()` function](../../handbook/twig-functions/abort.md) shows the 404 page when no entry matches the URL. The section component also sets the page used when an editor previews the entry from the admin panel.

### Looking Up an Entry by ID

Set the `identifier` property to look up the entry using a different column, such as `id`. The URL parameter name changes to match.

```ini
url = "/blog/:id"

[section post]
handle = "Blog\Post"
identifier = "id"
```

The [section component](../../handbook/tailor-components/section.md) also supports hard coded lookup values and the full slug of structure entries.

### Showing a Single Blueprint

A blueprint with the [single type](../../handbook/blueprint-types/single.md) has only one entry, so the section component finds it without a URL parameter.

::: cmstemplate
```ini
url = "/"

[section homepage]
handle = "Homepage"
```
```twig
<h1>
    {{ homepage.welcome_message }}
</h1>
```
:::

## Showing Global Content

The `global` component makes a [global blueprint](../../handbook/blueprint-types/global.md) available, which suits content shared across every page, such as footer links. Add it to a layout so every page that uses the layout can access it.

::: cmstemplate
```ini
description = "Default layout"

[global footerConfig]
handle = "Site\Footer"
```
```twig
<footer>
    <a href="{{ footerConfig.facebook_link }}">
        Facebook
    </a>
</footer>
```
:::

## Displaying Related Entries

Fields that link to other entries, such as the [entries field](../../handbook/tailor-fields/entries.md), return the related records. Access a single related entry as an attribute, and loop over multiple related entries.

```twig
<p>
    {{ post.author.title }}
</p>

{% for category in post.categories %}
    <span>
        {{ category.title }}
    </span>
{% endfor %}
```

::: tip
Accessing an attribute on the component variable, such as `post.title`, returns a value from the record. Calling a method, such as `posts.where(...)`, starts a new database query. See [How the Component Variable Works](../../handbook/tailor-components/collection.md#how-the-component-variable-works) for details.
:::

#### See Also

::: also
* [Collection Component](../../handbook/tailor-components/collection.md)
* [Section Component](../../handbook/tailor-components/section.md)
* [Global Component](../../handbook/tailor-components/global.md)
* [Using Components](../components.md)
* [Pagination](../ajax/pagination.md)
:::
