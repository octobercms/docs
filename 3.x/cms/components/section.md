---
subtitle: Define a website section with a dedicated URL.
---
# Section

The `section` component defines a website section with a supporting entry. This section will be used when previewing the entry from the backend panel.

## Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [entry blueprint](./blueprints.md).
**entrySlug** | The value to use to look up the entry by its `slug` attribute. Usually set to a URL parameters. Example: `{{ :slug }}`
**entryColumn** | Use this column when looking up the entry. Supported values are `slug`, `fullslug` and `id`. Default: `slug`
**entryDefault** | Make this the default page when previewing the entry. Default: `true`.

## Basic Usage

The following creates a section for the **Blog\Author** entry and locates it using the `:slug` routing parameter. The author name is displayed as a title by accessing the `{{ section.title }}` Twig variable.

```ini
url = "author/:slug"

[section]
handle = "Blog\Author"
entrySlug = "{{ :slug }}"
==
<h1>Posts by {{ section.title }}</h1>
```

When multiple sections are used on the same page, the component alias can be used to assign a different the variable name available to the page. The following component alias **author** makes the title available using the `{{ author.title }}` Twig variable instead.

```ini
[section author]
handle = "Blog\Author"
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

When using the [Content Groups](./blueprints.md) feature of the entry blueprint, you may access the group code using the `content_group` attribute. For example, a post may have a content group of **regular_post** and **markdown_post** where the content is handled differently.

```twig
{% if post.content_group == 'markdown_post' %}
    <!-- Render content as Markdown -->
    {{ post.content|md }}
{% else %}
    <!-- Render content as HTML -->
    {{ post.content|raw }}
{% endif %}
```

## Using the Full Slug

If the entry type is a `structure`, then it will have a **fullslug** attribute available. To use the full slug in the page URL it should be defined as a [wildcard URL parameter](..//themes/pages.md). The `fullSlug` property of the component should be enabled.

```ini
url = "/wiki/:slug*"

[section wiki]
handle = "Wiki\Article"
entrySlug = "{{ :slug }}"
fullSlug = 1
```
