# Sections

Sections are used to define areas of your website and are populated with content entries. The content structures and entries can be organised in different ways as we describe in more detail here. The blueprints are located in the **sections** directory.

::: dir
├── app
|   └── blueprints
|       └── `sections`
|           └── blog.yaml
:::

## Section Types

Each section organizes its content differently according to its type. The following types are supported.

Type | Purpose
------ | --------
`solo` | A single page with dedicated fields, eg: Contact Us Page
`tree` | A defined structure of pages, eg: Documentation Pages
`feed` | A stream of time stamped pages, eg: Blog Posts

### Solo Section

The `solo` type will force a single entry for each section definition. This is useful for one-off content, such as a Home page or Contact Us page. The following defines a **Homepage** section with a Welcome Message (`welcome_message`) text field.

```yaml
name: Homepage
handle: homepage
type: solo
fields:
    welcome_message:
        label: Welcome Message
        type: text
```

Solo sections do not support the use of [entry types](#entry-types).

### Tree Section

The `tree` type allows multiple structured entries, allowing for parent-child relationships to exist. This is useful for nested content, such as a Documentation section. The following defines a **Documentation** tree section with an Article Content (`article_content`) markdown field.

```yaml
name: Documentation
handle: docs
type: tree
fields:
    content:
        label: Article Content
        type: markdown
```

By default tree structures support unlimited nesting, however, you may specify a maximum depth for the tree using the `maxDepth` option. In the next example there can only be a top level and a second level.

```yaml
# ...
type: tree
maxDepth: 2
# ...
```

### Feed Section

The `feed` type is used for time-based entries that are often listed in chronological order. This is useful for publishing recent activity, such as a Blog section. The following defines a **Blog** feed section with a Post Content (`content`) rich editor field.

```yaml
name: Blog
handle: blog
type: feed
fields:
    content:
        label: Post Content
        type: richeditor
```

## Entries

Entries represent the content belonging to a section. They can specify a date for the content to be published and a slug to allow the content to be displayed in a [page URL](../cms/pages#url-syntax).

### Entry Types

All entries optionally support the ability to define multiple content types for a section. For example, a blog section may have a regular post and a featured post, and these are two entry types. This is defined by the **entries** property in the section blueprint file and different fields can be specified for each type.

```yaml
name: Blog
handle: blog
type: feed
entries:
    regular_post:
        name: Regular Post
        fields:
            # ...

    featured_post:
        name: Featured Post
        fields:
            # ...
```

It is recommended to use [field mixins](mixins.md) to group common field definitions.
