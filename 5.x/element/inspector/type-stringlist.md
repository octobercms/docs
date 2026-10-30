---
subtitle: Inspector Type
shortname: String List
---
# String List Inspector Type

The `stringList` inspector type allows users to enter lists of strings. The editor displays a collapsible group with an inline table, where each row represents an element in the result array. New items can be added using the "Add item" link. The optional `default` parameter should contain an array of strings.

```php
public function defineProperties()
{
    return [
        'items' => [
            'title' => 'Items',
            'type' => 'stringList',
            'default' => ['String 1', 'String 2']
        ]
    ];
}
```

The generated output is an array of strings, for example:

```json
"items": ["String 1", "String 2", "String 3"]
```

The following [configuration values](../inspector-types.md) are commonly used.

Property | Description
------------- | -------------
**title** | title for the property.
**description** | a brief description of the property, optional.
**default** | specifies a default value as an array, optional.

::: warning
This type does not support the external parameter editor as specified by the `showExternalParam` property.
:::
