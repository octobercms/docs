# Entry

An entry blueprint is the standard content structure used to define areas of your website. The content structures and entries can be organised in different ways as we describe in more detail here.

## Entry Variants

While an entry type has no specific behavior, there is also several variants that can be used for organising content. The following types are variants of an entry.

Type | Purpose
------ | --------
`single` | A single entry with dedicated fields, eg: Contact Us Page
`structure` | A defined structure of pages, eg: Documentation Pages
`stream` | A stream of time stamped pages, eg: Blog Posts

### Single Entries

The `single` type will force a single entry for each section definition. This is useful for one-off content, such as a Home page or Contact Us page. The following defines a **Homepage** section with a Welcome Message (`welcome_message`) text field.

```yaml
name: Homepage Content
handle: Homepage
type: single

fields:
    welcome_message:
        label: Welcome Message
        type: text
```

### Structure Entries

The `structure` type allows multiple structured entries, allowing for parent-child relationships to exist. This is useful for nested content, such as a Documentation section. The following defines a **Documentation** tree section with an Article Content (`article_content`) markdown field.

```yaml
name: Documentation Article
handle: Docs\Article
type: structure

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

### Stream Entries

The `stream` type is used for time-based entries that are often listed in chronological order. This is useful for publishing recent activity, such as a Blog section. The following defines a **Blog** feed section with a Post Content (`content`) rich editor field.

```yaml
name: Blog Post
handle: Blog\Post
type: stream

fields:
    content:
        label: Post Content
        type: richeditor
```

## Content Groups

All entries optionally support the ability to define multiple content groups for a section. For example, a blog section may have a regular post and a featured post, and these are two entry groups. Entry groups are defined by the **groups** property in the section blueprint file and different fields can be specified for each type.

```yaml
name: Blog Post
handle: Blog\Post
type: feed

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

It is recommended to use [mixin blueprints](mixin.md) to group common field definitions.
