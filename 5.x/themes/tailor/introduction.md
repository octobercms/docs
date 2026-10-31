---
previousPath: cms/tailor/introduction.md
subtitle: Define your website content in blueprint files, manage it in the admin panel and display it on pages without building a plugin.
---
# Tailor Overview

Tailor lets you define the content of your website, such as a company blog or a team page, in YAML files called blueprints. From each blueprint, Tailor builds the admin panel screens for managing records and provides CMS components for displaying them on your pages.

<VideoBlockLink src="https://www.youtube.com/watch?v=_WMH4mlMdjk" title="Tailor Tutorial" description="This video describes how to quickly create a complete blog solution with Tailor." prompt="Watch the tutorial" />

Building content with Tailor takes three steps: define a blueprint, migrate it, and display the records on a page.

## Defining a Blueprint

Create a file named **app/blueprints/blog/post.yaml** with the following contents.

```yaml
handle: Blog\Post
type: stream
name: Blog Post

fields:
    content:
        label: Content
        type: richeditor
```

The `handle` is the name you use to refer to this content from pages and code. The `type` sets how the records are organized, and `stream` suits time stamped content such as blog posts. The `fields` list the inputs that editors fill in for each record, in addition to a title and slug that every entry has.

See [Blueprints](./blueprints.md) to learn where blueprint files can live and which types are available.

## Migrating Blueprints

Run the `tailor:migrate` command to create the database tables for your blueprint.

```bash
php artisan tailor:migrate
```

Run this command again every time you add or change a blueprint. Tailor stores content in database tables that it creates and manages for each blueprint, so there are no migration files to write.

After migrating, a **Blog Post** item appears under the **Content** menu in the admin panel, where editors create and publish entries.

::: tip
The [Blueprints article](./blueprints.md#applying-blueprint-changes) explains how to reset content with `tailor:refresh` and clean up old columns with `tailor:prune`.
:::

## Displaying Entries on a Page

Use the `collection` component to list entries and the `section` component to show one entry. The following page lists every blog post at the **/blog** URL.

::: cmstemplate
```ini
url = "/blog"

[collection posts]
handle = "Blog\Post"
```
```twig
{% for post in posts %}
    <h2>
        <a href="{{ 'blog/post'|page({ slug: post.slug }) }}">
            {{ post.title }}
        </a>
    </h2>
{% endfor %}
```
:::

A second page, saved as **blog/post.htm**, shows a single post by looking up the `:slug` URL parameter.

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

See [Displaying Content](./displaying-content.md) for sorting, filtering, pagination and global content.

## When to Use a Plugin Instead

Tailor is designed for content structures, so you can skip the traditional plugin development workflow and go straight to defining content. When your content needs custom PHP behavior, you can still combine the two: point a blueprint at your own model class, connect Tailor records to plugin models, or build your own field types. See [Tailor Models](./models.md) and [Custom Tailor Fields](../extending/tailor-fields.md) to learn more.

#### See Also

::: also
* [Blueprints](./blueprints.md)
* [Defining Fields](./fields.md)
* [Displaying Content](./displaying-content.md)
* [Tailor Navigation](./navigation.md)
* [Submissions & Moderation](./submissions.md)
* [Tailor Localization](../sites/tailor.md)
:::
