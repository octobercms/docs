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

## String List

The `stringList` inspector type allows users to enter lists of strings. The editor opens in a popup window and displays a text area. Each line of text represents an element in the result array. The optional `default` parameter should contain an array of strings.

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

The generated output is a string value corresponding to the selected option, for example:

```json
"items": ["String 1", "String 2", "String 3"]
```
