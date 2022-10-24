---
subtitle: Inspector Type
---
# Checkbox

The `checkbox` inspector type is represented with a checkbox in the interface. This property doesn't have any special parameters. The `default` parameter, if specified, should contain a boolean value or string values `true`, `false`, `1`, `0`.

```php
public function defineProperties()
{
    return [
        'enabled' => [
            'title' => 'Enabled',
            'type' => 'checkbox',
            'default' => true
        ]
    ];
}
```

The generated output is `0` (unchecked) or `1` (checked), for example:

```json
"enabled": 1
```
