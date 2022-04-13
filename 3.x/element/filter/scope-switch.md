# Switch

`switch` - used as a switch to toggle between two predefined conditions or queries to the list, either indeterminate, on or off. Use 0 for off, 1 for indeterminate and 2 for on for default value.

```yaml
approved:
    label: Approved
    type: switch
    default: 1
    conditions:
        - is_approved <> true
        - is_approved = true
```
