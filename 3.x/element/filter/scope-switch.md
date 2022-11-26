---
subtitle: Filter Scope
---
# Switch

`switch` - used as a switch to toggle between two predefined conditions or queries to the list, either indeterminate, on or off.

```yaml
is_approved:
    label: Approved
    type: switch
    conditions:
        - is_approved <> true
        - is_approved = true
```

You may set `default` value to set the default filter value. Use `0` for off, `1` for indeterminate and `2` for on for default value.

```yaml
is_approved:
    label: Approved
    type: switch
    conditions: #...
    default: 1
```
