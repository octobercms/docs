---
subtitle: Form Field
shortname: Balloon Selector
---
# Balloon Selector Field

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

The following [field properties](../form-fields.md) are commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | a default value to use for new records.
**comment** | places a descriptive comment below the field.
**options** | available options for the dropdown, as an array.
**optionsMethod** | take options from a method defined on the model or as a static method, eg `Class::method`.

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
