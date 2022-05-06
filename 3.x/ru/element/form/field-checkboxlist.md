# Checkbox List

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

The following properties are supported.

Property | Description
------------- | -------------
**options** | available options for the dropdown, as an array or method name.
**default** | a default value to use for new records.
**quickselect** | show the quick selection buttons.
**cssClass** | used for setting the options as inline.

You may use the `default` property to set a default value, where the value is the key of the option.


```yaml
permissions:
    label: Permissions
    type: checkboxlist
    default: open_account
```

Options can be displayed inline with each other instead of in separate rows by specifying **inline-options** as the `cssClass` on the field config.

```yaml
permissions:
    type: checkboxlist
    cssClass: inline-options
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
