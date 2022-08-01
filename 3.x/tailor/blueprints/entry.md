---
subtitle: The basic building block for content.
---
# Entry

An entry blueprint is the standard content structure used to define areas of your website. The content structures and entries can be organised in different ways as we describe in more detail here.

The `entry` type supports multiple entries and should be used when no other variant applies.

```yaml
handle: Team\Member
type: entry
name: Team Member

fields:
    name:
        label: First Name
        type: text
```

The following properties are supported by the entry blueprint.

Property | Description
-------- | -------------
**handle** | A meaningful and unique code to identify the entry.
**type** | The blueprint type which can be a variant of `entry`, `single`, `structure` or `stream`.
**name** | The label to display when working with this entry.
**fields** | form fields belonging to the group, see [backend form fields](../../element/form-fields.md).
**groups** | references a group of form fields placing the entry in group mode (see below).
**structure** | structure configuration supplied when using the `structure` type.
**drafts** | enables drafts for this entry. Default: `false`

## Entry Variants

While an entry type has no specific behavior, there is also several variants that can be used for organising content. The following types are variants of an entry.

- **entry** is a basic entry for common purposes.
- **single** is a single entry with dedicated fields, eg: Contact Us Page.
- **structure** is a defined structure of entries, eg: Documentation Pages.
- **stream** is a stream of time stamped entries, eg: Blog Posts.

### Single Entries

The `single` type will force a single entry for each section definition. This is useful for one-off content, such as a Home page or Contact Us page. The following defines a **Homepage** section with a Welcome Message (`welcome_message`) text field.

```yaml
handle: Homepage
type: single
name: Homepage Content

fields:
    welcome_message:
        label: Welcome Message
        type: text
```

### Structure Entries

The `structure` type allows multiple structured entries, allowing for parent-child relationships to exist. This is useful for nested content, such as a Documentation section. The following defines a **Documentation** tree section with an Article Content (`article_content`) markdown field.

```yaml
handle: Docs\Article
type: structure
name: Documentation Article

fields:
    content:
        label: Article Content
        type: markdown
```

By default structures support unlimited nesting, however, you may specify a maximum depth for the tree using `maxDepth` in the `structure` property. In the next example there can only be a top level and a second level.

```yaml
# ...
type: structure

structure:
    maxDepth: 2
# ...
```

The following values are supported by the `structure` property.

Property | Description
-------- | -------------
**maxDepth** | Maximum depth for the structure. Default: `0` for unlimited.

### Stream Entries

The `stream` type is used for time-based entries that are often listed in chronological order. This is useful for publishing recent activity, such as a Blog section. The following defines a **Blog** feed section with a Post Content (`content`) rich editor field.

```yaml
handle: Blog\Post
type: stream
name: Blog Post

fields:
    content:
        label: Post Content
        type: richeditor
```

## Content Groups

All entries optionally support the ability to define multiple content groups for a section. For example, a blog section may have a regular post and a featured post, and these are two entry groups. Entry groups are defined by the **groups** property in the section blueprint file and different **fields** can be specified for each type.

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

::: tip
It is recommended to use [mixin blueprints](mixin.md) to group common field definitions.
:::
