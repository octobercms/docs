---
subtitle: Form Field
shortname: Checkbox List
---
# Checkbox List Field

The `checkboxlist` field renders a list of checkboxes. Checkbox lists support the same methods for defining the options as the [dropdown field type](./field-dropdown.md) and also support secondary descriptions, found in the [radio field type](./field-radio.md).

```yaml
permissions:
    label: Permissions
    type: checkboxlist
    options:
        open_account: Open account
        close_account: Close account
        modify_account: Modify account
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**options** | available options for the list, as an array.
**optionsMethod** | take options from a method defined on the model or as a static method, eg `Class::method`.
**default** | a default value to use for new records.
**quickselect** | show the quick selection buttons.
**cssClass** | used for setting the options as inline.
**inlineOptions** | display the options side-by-side instead of stacked, when less than 10 options.
**placeholder** | a message to display when there are no records selected (preview context).

You may use the `default` property to set a default value, where the value is the key of the option.

```yaml
permissions:
    label: Permissions
    type: checkboxlist
    default: open_account
```

Options can be displayed inline with each other instead of in separate rows by setting the `inlineOptions` property to a `true` value. This only applies when there are less than 10 available options.

```yaml
permissions:
    type: checkboxlist
    inlineOptions: true
```

A quick select menu with "Select All" and "Select None" buttons will become visible when the list has greater than 10 items. To explicitly enable these buttons, use the `quickselect` option.

```yaml
permissions:
    type: checkboxlist
    quickselect: true
```

#### See Also

::: also
* [Dropdown Form Field](./field-dropdown.md)
* [Radio Form Field](./field-radio.md)
:::
