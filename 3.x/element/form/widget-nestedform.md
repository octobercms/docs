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
                label: Date Added
                type: datepicker
            details:
                label: Details
                type: textarea
            title:
                label: This the title
                type: text
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**comment** | places a descriptive comment below the field.
**form** | inline field definitions or a reference to form field definition file.
**showPanel** | places the form inside a panel container. Default: `true`
**defaultCreate** | if a related record is not found, attempt to create one. Default: `false`

Pass a string to the `form` property to reference an external yaml file.

```yaml
profile:
    label: Profile
    type: nestedform
    form: $/october/demo/models/profile/fields.yaml
```

Like any other form, the nested form widget supports the use of tabs by placing the fields under the `tabs` or `secondaryTabs` properties of the `form` definition.

```yaml
tabbed_content:
    type: nestedform
    form:
        tabs:
            fields:
                # ...
```

#### See Also

::: also
* [Repeater Form Widget](./widget-repeater.md)
:::
