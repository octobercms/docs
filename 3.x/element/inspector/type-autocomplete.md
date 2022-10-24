---
subtitle: Inspector Type
---
# Autocomplete

The `autocomplete` inspector type works like the `string` editor, except it includes auto competion features. Available options can be specified statically with the `options` parameter or loaded dynamically.

```php
public function defineProperties()
{
    return [
        'condition' => [
            'title' => 'Condition',
            'type' => 'autocomplete',
            'options' => ['start' => 'Start', 'end' => 'End']
        ]
    ];
}
```

The generated output is an array value corresponding to the selected options, for example:

```json
"condition": "start"
```

::: warning
This type does not support the external parameter editor as specified by the `showExternalParam` property.
:::

## Dynamic Options

The `autocomplete` inspector type support the same methods for defining the options as the [dropdown inspector type](./type-dropdown.md).

```php
public function defineProperties()
{
    return [
        'sortColumn' => [
            'title' => 'Sort by Column',
            'type' => 'autocomplete',
            // ...
        ],
    ];
}

public function getSortColumnOptions()
{
    return [
        'create' => 'Create',
        'update' => 'Update',
        'delete' => 'Delete',
    ];
}
```

#### See Also

::: also
* [Dropdown Inspector Type](./type-dropdown.md)
:::
