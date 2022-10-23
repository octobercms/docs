---
subtitle: Learn how to define component properties.
---
# Inspector Types

::: aside
← Use the sidebar to see all the available inspector types.
:::

Inspector Types are property types used by CMS components. These are referenced by the following areas:

- [CMS Component Classes](../extend/cms-components.md)

All component types are identified as their individual **type** property.

```php
public function defineProperties()
{
    return [
        'maxItems' => [
            'title' => 'Max items',
            'type' => 'string'
        ]
    ];
}
```

## Available Properties

The property parameters are defined with an array with the following keys:

Key | Description
------------- | -------------
**title** | required, the property title, it is used by the component Inspector in the CMS back-end.
**description** | required, the property description, it is used by the component Inspector in the CMS back-end.
**default** | optional, the default property value to use when the component is added to a page or layout in the CMS back-end.
**type** | specifies the property type, which defines how the property is displayed in the Inspector.
**validationPattern** | optional Regular Expression to use when a user enters the property value in the Inspector. The validation can be used only with **string** properties.
**validationMessage** | optional error message to display if the validation fails.
**required** | optional, forces field to be filled. Uses validationMessage when left empty.
**placeholder** | optional placeholder for string and dropdown properties.
**options** | optional array of options for dropdown properties.
**depends** | an array of property names a dropdown property depends on. See the dropdown properties below.
**group** | an optional group name. Groups create sections in the Inspector simplifying the user experience. Use a same group name in multiple properties to combine them.
**showExternalParam** | specifies visibility of the external parameter editor for the property in the Inspector. Default value: **true**.
