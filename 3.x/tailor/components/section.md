---
subtitle: Define a content section that links to a specific entry.
---
# Section

The `section` component defines a website section with a supporting entry. This section will be used when previewing the entry from the backend panel.

## Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [entry blueprint](../blueprints/entry.md).
**entrySlug** | The value to use to look up the entry by its `slug` attribute.
**fullSlug** | Use the full slug when looking up the entry, structured entries only. Default: `false`
**entryDefault** | Make this the default page when previewing the entry. Default: `true`.

## Basic Usage

The following creates a section for the **Blog\Author** entry and locates it using the `:slug` routing parameter. The component is assigned a name **author** using the component alias and this is the variable name that becomes available to the page. The author name is displayed as a title by accessing the `{{ author.title }}` Twig variable.

```ini
url = "author/:slug"

[section author]
handle = "Blog\Author"
entrySlug = "{{ :slug }}"
==
<h1>Posts by {{ author.title }}</h1>
```

## Checking Record Existence

In most cases you will want to display a 404 page when a record cannot be found. This is possible by using an `{% if %}` statement combined with the `abort(404)` function.

```twig
{% if author is empty %}
    {% do abort(404) %}
{% endif %}
```

## Accessing the Entry Type

When using the [Content Groups](../blueprints/entry.md) feature of the entry blueprint, you may access the group code using the `entry_type` attribute. For example, a post may have a content group of **regular_post** and **markdown_post** where the content is handled differently.

```twig
{% if post.entry_type == 'markdown_post' %}
    <!-- Render content as Markdown -->
    {{ post.content|md }}
{% else %}
    <!-- Render content as HTML -->
    {{ post.content|raw }}
{% endif %}
```

## Using the Full Slug

If the entry type is a `structure`, then it will have a **fullslug** attribute available. To use the full slug in the page URL it should be defined as a wildcard route parameter. The `fullSlug` property of the component should be enabled.

```ini
url = "/wiki/:slug*"

[section wiki]
handle = "Wiki\Article"
entrySlug = "{{ :slug }}"
fullSlug = 1
```
