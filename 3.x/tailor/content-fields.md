# Content Fields

Content Fields are the cornerstone of the Tailor module and define how a field should be configured and displayed. These definitions are often found under the **fields** property of a blueprint.

```yaml
fields:
    name:
        label: Full Name
        type: text
```

## Available Content Fields

This section defines the fields that are available to tailor blueprints. These are the values that can be used for the **type** property of a field definition. All of the [Form Field Elements](../element/definitions.md) can be used as a tailor definition.

### Tailor Specific Fields

There are specific field types that can only be used inside blueprints.

### Mixin

`mixin` - includes another set of fields.

```yaml
_include1:
    type: mixin
    source: <uuid|handle>
```

See the [Mixins article](blueprints/mixin.md) for more information on defining mixins.

### Entries

`entries` - links to other entries by UUID or handle.

```yaml
author:
    label: Author
    type: entries
    source: <uuid|handle>
```

To limit the number of selectable items, use the `maxItems` property.

```yaml
author:
    type: entries
    maxItems: 1
```
