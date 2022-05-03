# Checkbox List

`checkboxlist` - renders a list of checkboxes.

```yaml
permissions:
    label: Permissions
    type: checkboxlist
    options:
        open_account: Open account
        close_account: Close account
        modify_account: Modify account
```

Checkbox lists support the same methods for defining the options as the [dropdown field type](#field-dropdown) and also support secondary descriptions, found in the [radio field type](#field-radio).

```yaml
permissions:
    type: checkboxlist
    options: listPermissions
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
