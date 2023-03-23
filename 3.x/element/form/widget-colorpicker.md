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
**showInput** | displays a text input next to the color picker and disables available colors. Default: `false`

You may define preset colors by setting the `availableColors` property to an array value of hex colors. The `allowCustom` property can be used to disable the selection of a custom color, and this is optional.

```yaml
color:
    label: Background
    type: colorpicker
    availableColors: ['#000000', '#111111', '#222222']
    allowCustom: false
```

::: tip
If the `availableColors` field in not defined in the YAML file, the colorpicker uses a set of 20 default colors.
:::

Use the `showAlpha` property to include opacity in the color selection and this produces an 8-digit hex value.

```yaml
color:
    label: Background
    type: colorpicker
    showAlpha: true
```

Use the `showInput` property to display a text input next to the color. This mode will disable the available colors and make choosing and entering a custom hex color the primary focus.

```yaml
color:
    label: Primary Color
    type: colorpicker
    showInput: true
```

## Dynamic Available Colors

The available colors can be sourced from the model class by setting `availableColors` as a method name declared in the model class. This method should return an array of hex colors in the same format as in the example above. The first argument of this method is the field name, the second is the currect value of the field, and the third is the current data object for the entire form.

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
