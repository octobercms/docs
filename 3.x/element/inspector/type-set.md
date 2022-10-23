# Set

The `set` inspector type is used to make multiple selections from the predefined options. The set inspector type support the same methods for defining the options as the [dropdown inspector type](./type-dropdown.md).

```php
public function defineProperties()
{
    return [
        'units' => [
            'title' => 'Select Muitple Units',
            'type' => 'set',
            'options' => ['metric' => 'Metric', 'imperial' => 'Imperial']
        ]
    ];
}
```

The generated output is an array value corresponding to the selected options, for example:

```json
"units": ["metric", "imperial"]
```

The `default` parameter, if specified, should be an array listing item keys selected by default.

```php
public function defineProperties()
{
    return [
        'context' => [
            'title' => 'Context',
            'type' => 'set',
            'options' => [
                'create' => 'Create',
                'update' => 'Update',
                'preview' => 'Preview'
            ],
            'default' => ['create', 'update']
        ]
    ];
}
```

#### See Also

::: also
* [Dropdown Inspector Type](./type-dropdown.md)
:::
