---
subtitle: Filter Scope
shortname: Switch
---
# Switch Scope

`switch` - used as a switch to toggle between two predefined conditions or queries to the list, either indeterminate, on or off.

```yaml
is_approved:
    label: Approved
    type: switch
    conditions:
        - is_approved <> true
        - is_approved = true
```

The following properties are available for the filter.

Property | Description
------------- | -------------
**default** | set to `1` or `2` to make the filter checked by default. Default `0`.
**select** | an array with custom SQL select statement to use for the filter, included for when the conditions is indeterminate (first item) and is checked (second item).

You may set `default` value to set the default filter value. Use `0` for off, `1` for indeterminate and `2` for on for default value.

```yaml
is_approved:
    label: Approved
    type: switch
    default: 1
```
