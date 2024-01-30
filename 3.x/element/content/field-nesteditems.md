---
subtitle: Content Field
---
# Nested Items

`nesteditems` - creates nested records belonging exclusively to the current record.

```yaml
items:
    label: Menu Items
    type: nesteditems
    span: adaptive
    form:
        fields:
            title:
                label: Title
                type: text
```

The following properties are supported.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | specifies a default array value, optional.
**comment** | places a descriptive comment below the field.
**form** | inline form field definitions.
**customMessages** | customize the messages used in the user interface.

Like any other form, nested items support the use of tabs by placing the fields under the `tabs` or `secondaryTabs` properties of the `form` definition.

```yaml
tabbed_content:
    type: nesteditems
    form:
        tabs:
            fields:
                # ...
```

The `customMessages` property is used to modify the various messages used on the field definition. The available messages are shared with the [Relation Controller behavior](../../extend/forms/relation-controller.md) messages.

```yaml
author:
    type: nesteditems
    customMessages:
        buttonCreate: New Author
        titleUpdateForm: Update Author
        titleCreateForm: Create Author
```

#### See Also

::: also
* [Entries Content Field](./field-entries.md)
* [Repeater Form Field](../form/widget-repeater.md)
:::
