---
previousPath: element/lists/column-selectable.md
subtitle: List Column
shortname: Selectable
---
# Selectable Column

`selectable` - takes the column value and matches it to the value in the record's available options. Take the following array as an example, if the record value is set to `open` then the **Open** value is displayed in the column.

```php
['open' => 'Open', 'closed' => 'Closed']
```

The available options are defined based on [dropdown options](../options.md).

```yaml
status:
    label: Status
    type: selectable
```

The following properties are supported.

Property | Description
------------- | -------------
**options** | available options for the dropdown, as an array.
**optionsMethod** | take options from a method defined on the model or as a static method, eg `Class::method`.
**optionsPreset** | take options from a [preset list of defined options](../options.md).

The `options` value can specify options explicitly as an array.

```yaml
status:
    label: Status
    type: selectable
    options:
        pending: Pending
        active: Active
```

The `optionsPreset` can be used to extract the value from a [options preset definition](../options.md).

```yaml
icon:
    label: Icon
    type: selectable
    optionsPreset: icons@phosphor
```

#### See Also

::: also
* [Defining Options](../options.md)
* [Dropdown Form Field](../form-fields/dropdown.md)
:::
