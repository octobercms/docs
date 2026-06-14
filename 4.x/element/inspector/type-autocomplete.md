---
subtitle: Inspector Type
shortname: Autocomplete
---
# Autocomplete Inspector Type

The `autocomplete` inspector type works like the `string` editor, except it includes auto completion features. Available options can be specified statically with the `options` parameter or loaded dynamically.

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

The generated output is a string value, for example:

```json
"condition": "start"
```

The following [configuration values](../inspector-types.md) are commonly used.

Property | Description
------------- | -------------
**title** | title for the property.
**description** | a brief description of the property, optional.
**default** | specifies a default string value, optional.
**options** | array of options for dropdown properties, optional if defining a `get*PropertyName*Options` method.

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
