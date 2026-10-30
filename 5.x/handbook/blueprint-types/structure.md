---
previousPath: cms/tailor/blueprints.md#structure-entries
subtitle: Blueprint Type
shortname: Structure
---
# Structure Blueprint

The `structure` type allows multiple structured entries, allowing for parent-child relationships to exist. This is useful for nested content, such as a Documentation section. Entries of the type `structure` are sortable. Their sort order can be adjusted by dragging them in the list view. The following defines a **Documentation** tree section with an Article Content (`article_content`) markdown field.

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
**treeExpanded** | if tree nodes should be expanded by default. Default: `true`
**showReorder** | displays an interface for reordering records. Default: `true`
**showSorting** | allows sorting records, disables the structure when sorted. Default: `true`

The [entry blueprint properties](./entry.md) are also supported, including [content groups](./entry.md#content-groups) and [custom messages](./entry.md#custom-messages).
