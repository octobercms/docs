# Content Fields

Content Fields are the cornerstone of the Tailor module and define how a field should be configured and displayed.

## Available Content Fields

This section defines the fields that are available to tailor blueprints.

<div class="content-list" markdown="1">

- [Mixin](#field-mixin)
- [Collections](#field-collections)
- [Entries](#field-entries)

</div>

<a name="field-mixin"></a>
### Mixin

`mixin` - includes another set of fields.

```yaml
_include1:
    type: mixin
    source: <uuid>
```

See the [Mixins article](../tailor/mixins.md) for more information on defining mixins.

<a name="field-collections"></a>
### Collections

`collections` - links to other collections by UUID or handle.

```yaml
categories:
    label: Categories
    type: collections
    source: <uuid|handle>
```

To limit the number of selectable items, use the `maxItems` property.

```yaml
categories:
    type: collections
    maxItems: 1
```

<a name="field-entries"></a>
### Entries

`entries` - links to other entries by UUID or handle.

```yaml
author:
    label: Author
    type: entries
    source: <uuid|handle>
```

You may reference multiple entry sections by passing `source` as an array.

```yaml
author:
    label: Author
    type: entries
    source:
        - <uuid|handle>
        - <uuid|handle>
```

To limit the number of selectable items, use the `maxItems` property.

```yaml
author:
    type: entries
    maxItems: 1
```
