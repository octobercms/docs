---
subtitle: Form Widget
---
# Nested Form

`nestedform` - renders a nested form using a related record or [jsonable attribute](../../extend/system/models.md). Fields can be defined inline or using an external yaml file.

```yaml
content:
    type: nestedform
    showPanel: false
    form:
        fields:
            added_at:
                label: Date added
                type: datepicker
            details:
                label: Details
                type: textarea
            title:
                label: This the title
                type: text
```

Pass a string to the `form` property to reference an external yaml file.

```yaml
profile:
    label: Profile
    type: nestedform
    form: $/october/demo/models/profile/fields.yaml
```

Option | Description
------------- | -------------
**form** | inline field definitions or a reference to form field definition file.
**showPanel** | places the form inside a panel container. Default: `true`
**defaultCreate** | if a related record is not found, attempt to create one. Default: `false`
