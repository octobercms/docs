# Sections

Sections are used to define areas of your website and are populated with content entries. The content structures and entries can be organised in different ways as we describe in more detail here. The blueprints are located in the **sections** directory.

::: dir
├── app
|   └── blueprints
|       └── `sections`
|           └── blog.yaml
:::

Each section organizes its content differently according to its type. The following types are supported.

Type | Purpose
------ | --------
`solo` | A single page with dedicated fields, eg: Contact Us Page
`tree` | A defined structure of pages, eg: Documentation Pages
`feed` | A stream of time stamped pages, eg: Blog Posts

### Solo Type

The `solo` type will force a single entry for each section definition. This is useful for one-off content, such as a Home page or Contact Us page. Solo sections can contain only one [entry type](#entry-types).

The following defines a **Homepage** section as a Single (`single`) entry type with a Welcome Message (`welcome_message`) text field.

```yaml
name: Homepage
handle: homepage
type: solo
entries:
    single:
        name: Single
        fields:
            welcome_message:
                label: Welcome Message
                type: text
```

### Tree Type

The `tree` type allows multiple structured entries, allowing for parent-child relationships to exist. This is useful for nested content, such as a Documentation section.

The following defines a **Documentation** tree section of Article (`article`) entries, each with an Article Content (`article_content`) markdown field.

```yaml
name: Documentation
handle: docs
type: tree
entries:
    article:
        name: Article
        fields:
            content:
                label: Article Content
                type: markdown
```

You may specify a maximum depth for the tree structure using the `maxDepth` option. In the next example there can only be a top level and a second level.

```yaml
# ...
type: tree
maxDepth: 2
# ...
```

### Feed Type

The `feed` type is used for time-based entries that are often listed in chronological order. This is useful for publishing recent activity, such as a Blog section.

The following defines a **Blog** feed section of Regular Post (`regular_post`) entries, each with a Post Content (`content`) rich editor field.

```yaml
name: Blog
handle: blog
type: feed
entries:
    regular_post:
        fields:
            content:
                label: Post Content
                type: richeditor
```

## Entries

Entries are content records that belong to a section. They can specify a date for the content to be published and a slug to allow the content to be displayed in a [page URL](../cms/pages#url-syntax).

### Entry Types

Each entry can have a different type as defined by the **entries** property in the blueprint file. For example, a blog section may have a regular post and a featured post, and these are two entry types.

```yaml
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
