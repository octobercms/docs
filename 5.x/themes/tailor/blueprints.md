---
subtitle: Define a content structure in a YAML blueprint file and apply it to the database with the tailor:migrate command.
---
# Blueprints

A blueprint is a YAML file that describes one content structure for Tailor: what kind of content it holds, which fields editors fill in, and where it appears in the admin panel. Tailor reads each blueprint to create the database tables, the admin panel screens and the records your pages display.

```yaml
uuid: edcd102e-0525-4e4d-b07e-633ae6c18db6
handle: Blog\Post
type: stream
name: Blog Post

fields:
    content:
        label: Post Content
        type: richeditor
```

Every blueprint contains three identifiers: a unique `uuid`, a readable `handle` and the blueprint `type`. The `name` is the label shown in the admin panel. The other properties depend on the type.

## Where Blueprint Files Live

::: aside
Blueprints are portable. They use internal identifiers, so you can place them in any directory with any file name.
:::

Blueprints are stored in a **blueprints** directory in one of three places. App and plugin blueprints are always available, while theme blueprints are only available when that theme is selected. Inside each **blueprints** directory, you can organize files in subdirectories of any depth and use any file name. The file name and folder help you organize blueprints, and Tailor does not use them as identifiers.

### App Blueprints

The **app/blueprints** directory is the default location for blueprints that belong to your website.

::: dir
├── app
|   └── `blueprints`  _← Blueprints Start Here_
|       ├── blog
|       │   └── blog.yaml
|       │   └── author.yaml
|       ├── about
|       │   └── about.yaml
|       ├── wiki
|       │   └── article.yaml
:::

### Theme Blueprints

A theme can ship its own blueprints in its **blueprints** directory. The admin panel navigation for these blueprints only appears when the theme is selected, which is often controlled by the [multisite settings](../sites/multisite.md).

::: dir
├── themes
|   └── demo
|       ├── `blueprints`  _← Blueprints Start Here_
|       │   └── settings.yaml
|       │   └── color-scheme.yaml
:::

### Plugin Blueprints

A plugin can ship blueprints in a **blueprints** directory inside the plugin, following the same rules as the app directory. This is useful when a plugin provides content structures alongside its own code.

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `blueprints`  _← Blueprints Start Here_
|           │   └── post.yaml
:::

## Referring to a Blueprint by Handle

The **handle** is a readable name for referring to a blueprint from pages, components and PHP code. Handles follow a naming convention similar to PHP namespaces, so you can organize them with the backslash `\` separator, such as `Blog\Post` and `Blog\Author`.

The following page uses the handle to display entries from the blueprint above.

```ini
[section blog]
handle = "Blog\Post"
```

## Understanding the UUID

The **uuid** is a unique identifier that blueprints use when they reference other blueprints, for example, when a field includes a mixin.

```yaml
_blog_content:
    source: edcd102e-0525-4e4d-b07e-633ae6c18db6
    type: mixin
```

You can leave out the `uuid` when you first create a blueprint. The `tailor:migrate` command generates one and writes it to the top of the file.

::: warning
Tailor names the database tables after the UUID, so keep it unchanged once the blueprint holds content. When you copy a blueprint file to start a new one, remove the `uuid` line so that a new one is generated. The migration command displays a warning when two blueprints share the same handle or UUID.
:::

## Choosing a Blueprint Type

The `type` property sets how Tailor organizes and manages the records. Each type has its own page in the Handbook listing the properties it supports.

Type | Use it for
------------- | -------------
[`entry`](../../handbook/blueprint-types/entry.md) | general content with many records, the standard choice when no other type applies.
[`single`](../../handbook/blueprint-types/single.md) | one-off content with exactly one record, such as a Home page or Contact Us page.
[`structure`](../../handbook/blueprint-types/structure.md) | nested records with parent and child relationships, such as documentation pages.
[`stream`](../../handbook/blueprint-types/stream.md) | time stamped records listed in date order, such as blog posts.
[`global`](../../handbook/blueprint-types/global.md) | a single record of site-wide content, such as social networking links.
[`mixin`](../../handbook/blueprint-types/mixin.md) | a group of fields reused across other blueprints to avoid repetition.
[`submission`](../../handbook/blueprint-types/submission.md) | content submitted by visitors on the frontend, such as comments and contact forms.

The `single`, `structure` and `stream` types are variants of `entry` and support the same properties, such as drafts and content groups.

## Defining Fields

The `fields` property lists the inputs that editors fill in for each record. Each key is the field name, and the value sets its `label`, its `type` and any other options.

```yaml
handle: Team\Member
type: entry
name: Team Member

fields:
    role:
        label: Role
        type: text

    biography:
        label: Biography
        type: textarea
```

You can use any of the [form field types](../../handbook/form-fields.md) along with the [content fields](../../handbook/tailor-fields.md) that only work in Tailor, such as `entries` for linking to other records. See [Defining Fields](./fields.md) for validation, list columns and filters.

### Offering Different Fields with Content Groups

An entry can offer several sets of fields using the `groups` property. For example, a blog can have a regular post and a featured post, each with its own fields. Editors choose the group in the entry form, and the selected group is stored in the `content_group` attribute.

```yaml
handle: Blog\Post
type: stream
name: Blog Post

groups:
    regular_post:
        name: Regular Post
        fields:
            # ...

    featured_post:
        name: Featured Post
        fields:
            # ...
```

See [Content Groups](../../handbook/blueprint-types/entry.md#content-groups) in the Handbook for details.

### Reusing Fields with a Mixin

When the same fields appear in several blueprints, define them once in a `mixin` blueprint and include them with a field of the `mixin` type.

```yaml
_location_fields:
    type: mixin
    source: Fields\Location
```

See the [Mixin Blueprint](../../handbook/blueprint-types/mixin.md) for a complete example.

## Configuring Other Blueprint Features

Beyond fields, a blueprint can set where it appears in the admin panel with the [navigation](./navigation.md) properties and enable translated content across sites with the `multisite` property, described in [Tailor Localization](../sites/tailor.md). The [Handbook page for each type](../../handbook/blueprint-types.md) lists every property, such as `drafts`, `softDeletes` and `customMessages`.

## Applying Blueprint Changes

Run the `tailor:migrate` command after you create or change a blueprint. This command is separate from the `october:migrate` command used for plugins. It generates any missing UUIDs and updates the database tables to match your blueprints.

```bash
php artisan tailor:migrate
```

::: tip
Blueprints are cached when debug mode is turned off. The migration command also clears the blueprint cache.
:::

When you edit a blueprint in the **Editor** section of the admin panel, the **Save & Migrate** button saves the file and migrates that blueprint in one step.

### Refreshing Content

The `tailor:refresh` command deletes all the content managed by Tailor and migrates the blueprints again.

```bash
php artisan tailor:refresh
```

To refresh a single blueprint, use the `--blueprint` option and specify its handle.

```bash
php artisan tailor:refresh --blueprint="Blog\Post"
```

### Pruning Content

As a general rule, Tailor never drops table columns or deletes content. If you remove a field, Tailor renames its column instead of dropping it. For example, an old field named `content` may appear as `x_content_fb418fac` in the database table. Tables for removed blueprints are also kept in case you restore them.

The `tailor:prune` command removes these unused columns and drops tables that no longer have a blueprint.

```bash
php artisan tailor:prune
```

Use the `--fields` option to only prune columns, or the `--tables` option to only prune tables.

```bash
php artisan tailor:prune --fields
php artisan tailor:prune --tables
```

To prune a single blueprint, use the `--blueprint` option and specify its handle.

```bash
php artisan tailor:prune --blueprint="Blog\Post"
```

#### See Also

::: also
* [Blueprint Types](../../handbook/blueprint-types.md)
* [Defining Fields](./fields.md)
* [Displaying Content](./displaying-content.md)
* [Tailor Navigation](./navigation.md)
* [Tailor Localization](../sites/tailor.md)
:::
