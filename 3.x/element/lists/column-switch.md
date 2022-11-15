---
subtitle: List Column
---
# Switch

`switch` - displays a on or off state for boolean columns.

```yaml
enabled:
    label: Enabled
    type: switch
```

You may customize the switch text by passing an array to the `options` value with false and true labels.

```yaml
enabled:
    label: Enabled
    type: switch
    options:
        - Nope
        - Yeah
```
