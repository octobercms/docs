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
