---
subtitle: Inspector Type
---
# Set

The `set` inspector type is used to make multiple selections from the predefined options. The `set` inspector type support the same methods for defining the options as the [dropdown inspector type](./type-dropdown.md).

```php
public function defineProperties()
{
    return [
        'units' => [
            'title' => 'Select Muitple Units',
            'type' => 'set',
            'items' => [
                'metric' => 'Metric',
                'imperial' => 'Imperial'
            ]
        ]
    ];
}
```

The generated output is an array value corresponding to the selected options, for example:

```json
"units": ["metric", "imperial"]
```

The following properties are supported.

Property | Description
------------- | -------------
**title** | title for the inspector type.
**description** | a brief description of the inspector type, optional.
**items** | an array of available items as keys and values, optional if defining a `get*PropertyName*Options` method.
**default** | an array of selected items by default containing keys only.
**ignoreIfDefault** | set to `true` to exclude the output from the array if the selection matches default value. Default: false

The `default` parameter, if specified, should be an array listing item keys selected by default.

```php
public function defineProperties()
{
    return [
        'context' => [
            'title' => 'Context',
            'type' => 'set',
            'items' => [
                'create' => 'Create',
                'update' => 'Update',
                'preview' => 'Preview'
            ],
            'default' => ['create', 'update']
        ]
    ];
}
```

The specify the `items` dynamically, use create a method called `get*PropertyName*Options` defined in the model.

```php
public function getContextOptions()
{
    return ContextModel::pluck('name', 'code')->all();
}
```

#### See Also

::: also
* [Dropdown Inspector Type](./type-dropdown.md)
:::
