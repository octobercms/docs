---
subtitle: Inspector Type
---
# Object

The `object` inspector type allows defining an object with specific properties editable by users. Object properties are specified with the `properties` attribute. The value of the attribute is an array, which has the same structure as the inspector properties array.

This example above creates an object with three properties. Two of them are displayed as text fields and the third as a dropdown.

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'object',
            'properties' => [
                'streetAddress' => [
                    'title' => 'Street Address',
                    'type' => 'string'
                ],
                'city' => [
                    'title' => 'City',
                    'type' => 'string'
                ],
                'country' => [
                    'title' => 'Country',
                    'type' => 'dropdown',
                    'options' => [
                        'us' => 'US',
                        'ca' => 'Canada'
                    ]
                ]
            ],
        ]
    ];
}
```

The generated output is an object, for example:

```json
"address": {
    "streetAddress": "321-210 Second ave",
    "city": "Springfield",
    "country": "us"
}
```

The following [configuration values](../inspector-types.md) are commonly used and supported.

Property | Description
------------- | -------------
**title** | title for the property.
**description** | a brief description of the property, optional.
**properties** | an array of nested property definitions.
**default** | an array of populated items by default containing keys and values.
**ignoreIfPropertyEmpty** | set to an array of values that should be excluded from the output if the value is empty.

::: warning
This type does not support the external parameter editor as specified by the `showExternalParam` property.
:::

The object properties can be of any type supported by inspector, including other objects. There's a way to exclude an object from Inspector values completely, if one of the object fields is empty. The field is identified with `ignoreIfPropertyEmpty` parameter. For example:

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'object',
            'ignoreIfPropertyEmpty' => 'title',
            'properties' => [
                'streetAddress' => [
                    'title' => 'Street Address',
                    'type' => 'string'
                ],
                'city' => [
                    'title' => 'City',
                    'type' => 'string'
                ]
            ],
        ]
    ];
}
```

In the example above, if the street address is not specified, the object ("address") will be completely removed from the inspector output. If there are any validation rules defined on other object properties and the required property is empty, those rules will be ignored.

A `default` value for the editor, if specified, should be an object with the same properties as defined in the `properties` configuration parameter.

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'object',
            'properties' => [/*...*/],
            'default' => [
                'streetAddress' => '321-210 Second ave',
                'city' => 'Springfield',
                'country' => 'us'
            ]
        ]
    ];
}
```
