# Email

`email` - renders a single line text box with the type of `email`, triggering an email-specialised keyboard in mobile browsers.

```yaml
user_email:
    label: Email Address
    type: email
```

If you would like to validate this field on save to ensure that it is a properly-formatted email address, please use the `$rules` property on your model, like so:

```php
/**
 * @var array Validation rules
 */
public $rules = [
    'user_email' => 'email',
];
```

For more information on model validation, please visit [the documentation page](https://octobercms.com/docs/services/validation#rule-email).
