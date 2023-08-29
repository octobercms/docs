---
subtitle: Inspector Type
---
# String

The `string` inspector type allows entering a single line of a text and represented with a simple input text field. The editor doesn't have any specific parameters. The optional `default` parameter for the editor should contain a string.

```php
public function defineProperties()
{
    return [
        'firstName' => [
            'title' => 'First Name',
            'type' => 'string',
            'default' => 'John'
        ]
    ];
}
```

The generated output is a string value corresponding to the selected option, for example:

```json
"firstName": "Sam"
```

The following [configuration values](../inspector-types.md) are commonly used.

Property | Description
------------- | -------------
**title** | title for the property.
**description** | a brief description of the property, optional.
**default** | specifies a default string value, optional.
**showExternalParam** | specifies visibility of the external parameter editor for the property in the Inspector. Default: `true`.
