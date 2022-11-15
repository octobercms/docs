---
subtitle: Form Field
---
# Checkbox

The `checkbox` field renders a single checkbox.

```yaml
show_content:
    type: checkbox
    label: Display content
```

The following properties are supported.

Property | Description
------------- | -------------
**default** | a default value to use for new records.
**comment** | text to display below the checkbox.

You may use the `default` property to check the checkbox by default.

```yaml
show_content:
    type: checkbox
    label: Display content
    default: true
```

Use the `comment` to display some accompanying text.

```yaml
is_active:
    type: checkbox
    label: Active
    comment: Check this box to make the record active.
```
