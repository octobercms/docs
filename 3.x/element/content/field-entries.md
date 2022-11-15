---
subtitle: Content Field
---
# Entries

`entries` - links to other entries by UUID or handle.

```yaml
author:
    label: Author
    type: entries
    source: <uuid|handle>
```

The following properties are supported.

Property | Description
------------- | -------------
**source** | the related blueprint UUID or handle name.
**maxItems** | limits the number of entries that can be selected.
**displayMode** | modifies how the field is displayed. Supported values: `relation`, `recordfinder`. Default: `relation`.

To limit the number of selectable items, use the `maxItems` property.

```yaml
author:
    type: entries
    maxItems: 1
```

To display a record finder instead of the typical control, use the `displayMode` property. This mode is only available when one item is selectable.

```yaml
author:
    type: entries
    displayMode: recordfinder
```
