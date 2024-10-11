---
subtitle: Form Widget
shortname: Tag List
---
# Tag List Field

The `taglist` form widget renders a field for inputting a list of tags.

```yaml
tags:
    type: taglist
    separator: space
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.
**mode** | controls how the value is returned, either `string`, `array` or `relation`. Default: `string`
**nameFrom** | if relation mode is used, a model attribute name for displaying the tag name. Default: `name`
**separator** | separate tags with the specified character, either `comma` or `space`. Default: `comma`
**options** | specifies an array for predefined options.
**optionsMethod** | specifies a method name for predefined options, defined on the model or as a static method, eg `Class::method`. Set to `true` to use model **get*Field*Options** method.
**useKey** | use the key instead of value for saving and reading data. Default: `true`
**customTags** | allows custom tags to be entered manually by the user. Default: `false`

A tag list support the same methods for defining the options as the [dropdown field type](./field-dropdown.md).

```yaml
tags:
    type: taglist
    options:
        - Red
        - Blue
        - Orange
```

You may use the `mode` called **relation** where the field name is a [many-to-many relationship](../../extend/database/relations.md). This will automatically source and assign tags via the relationship. If custom tags are supported, they will be created before assignment.

```yaml
tags:
    type: taglist
    mode: relation
```

#### See Also

::: also
* [Dropdown Form Field](./field-dropdown.md)
:::
