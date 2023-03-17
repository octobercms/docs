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

The following properties are available for the filter.

Property | Description
------------- | -------------
**default** | set to true to make the filter checked by default. Default `false`.
**select** | a custom SQL select statement to use for the filter.

You may set `default` value to make the filter checked by default.

```yaml
is_published:
    label: Hide Published
    type: checkbox
    default: 1
```
