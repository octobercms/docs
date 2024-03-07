---
subtitle: Define a website section with a dedicated URL.
---
# Section

The `section` component defines a website section with a supporting entry. This section will be used when previewing the entry from the backend panel.

## Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [entry blueprint](../tailor/blueprints.md).
**identifier** | Use this identifier key to look up the entry, supported values are `slug`, `fullslug` or `id`. Default: `slug`
**value** | Use this identifier value to use to look up the entry, optional. Leave empty to use the identifier key as the URL parameter name. Can be set to a hard coded value, or a custom parameter, eg: `{{ :slug }}`
**isDefault** | Make this the default page when previewing the entry. Default: `true`.

## Basic Usage

The following creates a section for the **Blog\Author** entry and locates it using the default `:slug` [URL parameter](../themes/pages.md). The author name is displayed as a title by accessing the `{{ section.title }}` Twig variable.

::: cmstemplate
```ini
url = "author/:slug"

[section]
handle = "Blog\Author"
```
```twig
<h1>Posts by {{ section.title }}</h1>
```
:::

When multiple sections are used on the same page, the component alias can be used to assign a different the variable name available to the page. The following component alias **author** makes the title available using the `{{ author.title }}` Twig variable instead.

::: cmstemplate
```ini
[section author]
handle = "Blog\Author"
```
```twig
<h1>Posts by {{ author.title }}</h1>
```
:::

## Changing the Lookup Identifier

The default identifier is `slug` and this can be changed by changing the `identifier` property, for example, locating a record using the `id` column instead. Notice that the page URL also changes to use an `:id` parameter name.

```ini
url = "author/:id"

[section]
handle = "Blog\Author"
identifier = "id"
```

You may hard code the identifier lookup using the `value` property, for example, setting it to **7** will show the record with a static lookup.

```ini
url = "author/ceo"

[section]
handle = "Blog\Author"
identifier = "id"
value = 7
```

The `value` property also accepts external parameters, the following uses the **foobar** URL parameter to look up the record.

```ini
url = "author/:foobar"

[section]
handle = "Blog\Author"
identifier = "id"
value = "{{ :foobar }}"
```

::: warning
Previewing links and using the [Page Finder widget](../../element/form/widget-pagefinder.md) do not support identifiers with custom values.
:::

## Checking Record Existence

In most cases you will want to display a 404 page when a record cannot be found. This is possible by using an `{% if %}` statement combined with the `abort(404)` function.

```twig
{% if author is empty %}
    {% do abort(404) %}
{% endif %}
```

::: tip
The [`abort()` Twig function](../../markup/function/abort.md) is used to show a 404 page when the record is not found.
:::

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

If the entry type is a `structure`, then it will have a **fullslug** attribute available. To use the full slug in the page URL it should be defined as a [wildcard URL parameter](../themes/pages.md). The `identifier` property of the component should be set to **fullslug**.

```ini
url = "/wiki/:fullslug*"

[section article]
handle = "Wiki\Article"
identifier = "fullslug"
```

As an alternative approach, we recommend targeting the **id** and placing it at the end of the URL instead. This allows the record to be moved around freely without breaking links in your website. The following example shows how to achieve this with a redirect for any previously used URLs.

::: cmstemplate
```ini
url = "/wiki/:fullslug*/:id"

[section article]
handle = "Wiki\Article"
identifier = "id"
```
```twig
{% if article is empty %}
    {% do abort(404) %}
{% elseif article.fullslug != this.param.fullslug %}
    {% do redirect(this|page({ fullslug: article.fullslug }), 301) %}
{% endif %}

<!-- Contents here -->
```
:::

::: tip
The [`redirect()` Twig function](../../markup/function/redirect.md) is used for a permanent 301 redirect when the slug does not match. The [`|page` Twig filter](../../markup/filter/page.md) supplies the current page and rewrites the `fullslug` URL parameter to the correct match.
:::
