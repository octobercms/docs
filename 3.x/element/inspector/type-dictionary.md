---
subtitle: Inspector Type
shortname: Dictionary
---
# Dictionary Inspector Type

The `dictionary` inspector type allows the creation of key-value pairs with a simple user interface consisting of a table with two columns. The `default` parameter, if specified, should contain a key-value object.

```php
public function defineProperties()
{
    return [
        'options' => [
            'title' => 'Options',
            'type' => 'dictionary',
            'default' => ['option1' => 'Option 1'],
        ]
    ];
}
```

The generated output is a string value corresponding to the selected option, for example:

```json
"options": {"option1": "Option 1", "option2": "Option 2"}
```

The following [configuration values](../inspector-types.md) are commonly used.

Property | Description
------------- | -------------
**title** | title for the property.
**description** | a brief description of the property, optional.
**default** | specifies a default an array of keys and values, optional.

## Extra Validation

The `dictionary` editor supports validation for the entire set (`required` and `length` validators) and for keys and values separately. See the [validation descriptions](../inspector-types.md) for further details. The `validationKey` and `validationValue` define validation for keys and values, for example:

```php
public function defineProperties()
{
    return [
        'options' => [
            'title' => 'Options',
            'type' => 'dictionary',
            'validation' => [
                'required' => [
                    'message' => 'Please create options'
                ],
                'length' => [
                    'min' => [
                        'value' => 2,
                        'message' => 'Create at least two options.'
                    ]
                ]
            ],
            'validationKey' => [
                'regex' => [
                    'pattern' => '^[a-z]+$',
                    'message' => 'Keys can contain only lowercase Latin letters'
                ]
            ],
            'validationValue' => [
                'regex' => [
                    'pattern' => '^[a-zA-Z0-9]+$',
                    'message' => 'Values can contain only Latin letters and digits'
                ]
            ]
        ]
    ];
}
```
