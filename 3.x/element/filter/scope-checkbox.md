---
subtitle: Filter Scope
---
# Checkbox

`checkbox` - used as a binary checkbox to apply a predefined condition or query to the list, either on or off. Use 0 for off and 1 for on for default value

```yaml
published:
    label: Hide published
    type: checkbox
    default: 1
    conditions: is_published <> true
```
