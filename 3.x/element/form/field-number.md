# Number

`number` - renders a single line text box that takes numbers only.

```yaml
your_age:
    label: Your Age
    type: number
    step: 1  # defaults to 'any'
    min: 1   # defaults to not present
    max: 100 # defaults to not present
```

If you would like to validate this field server-side on save to ensure that it is numeric, please use the `$rules` property on your model, like so:

```php
/**
 * @var array Validation rules
 */
public $rules = [
    'your_age' => 'numeric',
];
```

For more information on model validation, please visit [the documentation page](https://octobercms.com/docs/services/validation#rule-numeric).
