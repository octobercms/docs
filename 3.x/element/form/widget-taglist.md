# Tag list

`taglist` - renders a field for inputting a list of tags.

```yaml
tags:
    type: taglist
    separator: space
```

A tag list support the same methods for defining the options as the [dropdown field type](#field-dropdown).

```yaml
tags:
    type: taglist
    options:
        - Red
        - Blue
        - Orange
```

You may use the `mode` called **relation** where the field name is a [many-to-many relationship](../database/relations#oc-many-to-many). This will automatically source and assign tags via the relationship. If custom tags are supported, they will be created before assignment.

```yaml
tags:
    type: taglist
    mode: relation
```

Option | Description
------------- | -------------
**mode** | controls how the value is returned, either string, array or relation. Default: string
**separator** | separate tags with the specified character, either comma or space. Default: comma
**customTags** | allows custom tags to be entered manually by the user. Default: true
**options** | specifies a method or array for predefined options. Set to true to use model `get*Field*Options` method. Optional.
**nameFrom** | if relation mode is used, a model attribute name for displaying the tag name. Default: name
**useKey** | use the key instead of value for saving and reading data. Default: false
