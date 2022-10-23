# String List

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
