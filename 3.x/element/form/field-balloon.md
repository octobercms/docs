---
subtitle: Form Field
---
# Balloon Selector

The `balloon-selector` field renders a list, where only one item can be selected at a time.
Balloon selectors support the same methods for defining the options as the [dropdown field type](./field-dropdown.md).

```yaml
gender:
    type: balloon-selector
    label: Gender
    options:
        female: Female
        male: Male
```

The following properties are supported.

Property | Description
------------- | -------------
**options** | available options for the dropdown, as an array or method name.
**default** | a default value to use for new records.

You may use the `default` property to set a default value, where the value is the key of the option.

```yaml
gender:
    type: balloon-selector
    label: Gender
    default: female
```

#### See Also

::: also
* [Dropdown Form Field](./field-dropdown.md)
:::
