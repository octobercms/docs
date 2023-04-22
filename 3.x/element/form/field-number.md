---
subtitle: Form Field
---
# Number

The `number` field renders a single line text box that takes numbers only.

```yaml
your_age:
    label: Your Age
    type: number
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.
**min** | the client-side minimum value, default `null`.
**max** | the client-side maximum value, default `null`.
**step** | the client-side step increment, default `any`.

You may use the `min` and `max` properties to constrain the input by minimum and maximum values. The following will only accept an input between 1 and 100.

```yaml
your_age:
    label: Your Age
    type: number
    min: 1
    max: 100
```

Use the `step` property to control the increments that the number can be increased or decreased by, this value defaults to **any**.

```yaml
your_age:
    label: Your Age
    type: number
    step: 10
```

## Server-side Validation

If you would like to validate this field server-side on save to ensure that it is numeric. When working with tailor fields, use the `validation` property.

```yaml
your_age:
    label: Your Age
    type: number
    validation: numeric
```

When working with models, use the `$rules` property on your model, like so.

```php
public $rules = [
    'your_age' => 'numeric',
];
```

For more information on model validation, please visit the [validation service article](../../extend/services/validation.md#rule-numeric).
