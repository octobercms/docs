---
subtitle: Form Widget
---
# Color Picker

`colorpicker` - renders controls to select a hexadecimal color value.

```yaml
color:
    label: Background
    type: colorpicker
```

Option | Description
------------- | -------------
**availableColors** | list of available colors as an array.
**allowEmpty** | allows empty input value. Default: `false`
**allowCustom** | allows selection of a custom color. Default: `true`
**showAlpha** | displays an opacity slider and sets an 8-digit hex code. Default: `false`

There are two ways to provide the available colors for the colorpicker. The first method defines the `availableColors` directly as a list of hex color codes in the YAML file:

```yaml
color:
    label: Background
    type: colorpicker
    availableColors: ['#000000', '#111111', '#222222']
```

The second method uses a specific method declared in the model class.  This method should return an array of hex colors in the same format as in the example above. The first argument of this method is the field name, the second is the currect value of the field, and the third is the current data object for the entire form.

```yaml
color:
    label: Background
    type: colorpicker
    availableColors: myColorList
```

Supplying the available colors in the model class:

```php
public function myColorList($fieldName, $value, $formData)
{
    return ['#000000', '#111111', '#222222']
}
```

If the `availableColors` field in not defined in the YAML file, the colorpicker uses a set of 20 default colors.
