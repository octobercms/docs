---
subtitle: Inspector Type
---
# Text

The `text` inspector type allows entering multi-line long text values in a popup window. The editor doesn't have any specific parameters. The optional `default` parameter for the editor should contain a string.

```php
public function defineProperties()
{
    return [
        'description' => [
            'title' => 'Description',
            'type' => 'text',
            'default' => 'This is a default description'
        ]
    ];
}
```

The generated output is a string value corresponding to the selected option, for example:

```json
"description": "This is a description"
```

The following [configuration values](../inspector-types.md) are commonly used.

Property | Description
------------- | -------------
**title** | title for the property.
**description** | a brief description of the property, optional.
**default** | specifies a default string value, optional.
