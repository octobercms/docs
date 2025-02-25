---
subtitle: Inspector Type
shortname: Object List
---
# Object List Inspector Type

The `objectList` inspector type allows users to create multiple objects with a pre-defined structure. For example, it could be used for creating a list of person, where each person has a name and address.

The properties of objects that can be created with the editor are defined with `itemProperties` parameter. The parameter should contain an array of properties, similar to an inspector configuration array. Another required parameter is `titleProperty`, which identifies a property that should be used as a title in inspector UI.

The array of properties defined with `itemProperties` supports all property types.

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'objectList',
            'titleProperty' => 'fullName',
            'itemProperties' => [
                'fullName' => [
                    'title' => 'Full Name',
                    'type' => 'string'
                ],
                'address' => [
                    'title' => 'Address',
                    'type' => 'string'
                ]
            ]
        ]
    ];
}
```

By default the generated output is a non-associative array, for example:

```json
"people": [
    {"fullName": "John Smith", "address": "Palo Alto"},
    {"fullName": "Bart Simpson", "address": "Springfield"}
]
```

The following [configuration values](../inspector-types.md) are commonly used and supported.

Property | Description
------------- | -------------
**title** | title for the property.
**description** | a brief description of the property, optional.
**keyProperty** | use this property key as the title, found in the **itemProperties** definitions.
**titleProperty** | use this property name as the title, found in the **itemProperties** definitions.
**itemProperties** | an array of nested property definitions.

::: warning
The Object List inspector type doesn't support default values.
:::

If the result value should be an associative array (object), use the `keyProperty` configuration option. The option value should refer to a property that should be used as a key. The key property can use only the string or drop-down editors, its value should be unique and cannot be empty.

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'objectList',
            'titleProperty' => 'fullName',
            'keyProperty' => 'login',
            'itemProperties' => [
                'fullName' => [
                    'title' => 'Full Name',
                    'type' => 'string'
                ],
                'login' => [
                    'title' => 'Login',
                    'type' => 'string'
                ],
                'address' => [
                    'title' => 'Address',
                    'type' => 'string'
                ]
            ]
        ]
    ];
}
```

The `login` property in the example above will be used as a key in the result value:

```json
"people": {
    "john": {"fullName": "John Smith", "address": "Palo Alto"},
    "bart": {"fullName": "Bart Simpson", "address": "Springfield"}
}
```
