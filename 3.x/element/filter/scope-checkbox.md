---
subtitle: Filter Scope
---
# Checkbox

`checkbox` - used as a binary checkbox to apply a predefined condition or query to the list, either on or off. Use 0 for off and 1 for on for default value

```yaml
is_published:
    label: Hide Published
    type: checkbox
    conditions: is_published <> true
```

You may set `default` value to make the filter checked by default.

```yaml
is_published:
    label: Hide Published
    type: checkbox
    conditions: #...
    default: 1
```
