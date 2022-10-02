# Email

The `email` field renders a single line text box with the type of `email`, triggering an email-specialised keyboard in mobile browsers.

```yaml
user_email:
    label: Email Address
    type: email
```

## Server-side Validation

If you would like to validate this field on save to ensure that it is a properly-formatted email address. When working with tailor fields, use the `validation` property.

```yaml
user_email:
    label: Email Address
    type: email
    validation: email
```

When working with models, use the `$rules` property on your model, like so.

```php
public $rules = [
    'user_email' => 'email',
];
```

For more information on model validation, please visit the [validation service article](../../extend/services/validation.md#rule-email).
