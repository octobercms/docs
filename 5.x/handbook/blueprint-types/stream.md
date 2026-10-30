---
previousPath: cms/tailor/blueprints.md#stream-entries
subtitle: Blueprint Type
shortname: Stream
---
# Stream Blueprint

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

The `defaultSort` property is used to set the default sorting column when the blueprint record is displayed as a list. This will be set to the published date by default.

```yaml
handle: Blog\Post
type: stream
name: Blog Post

defaultSort:
    column: title
    direction: asc
```

The [entry blueprint properties](./entry.md) are also supported, including [content groups](./entry.md#content-groups) and [custom messages](./entry.md#custom-messages).
