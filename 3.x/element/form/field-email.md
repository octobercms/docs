---
subtitle: Form Field
---
# Email

The `email` field renders a single line text box with the type of `email`, triggering an email-specialized keyboard in mobile browsers.

```yaml
user_email:
    label: Email Address
    type: email
```

The following [field properties](../form-fields.md) are commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**placeholder** | text to display in the field when it is empty.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.

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
