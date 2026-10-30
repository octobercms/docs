---
previousPath: extend/database/traits.md#validation
subtitle: Validates attributes against rules before saving.
---
# Validation

October CMS models uses the built-in [Validator class](../../services/validation.md). The validation rules are defined in the model class as a property named `$rules` and the class must use the trait `October\Rain\Database\Traits\Validation`.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'name' => ['required', 'between:4,16'],
        'email' => ['required', 'email'],
        'password' => ['required', 'alpha_num', 'between:4,8', 'confirmed'],
        'password_confirmation' => ['required', 'alpha_num', 'between:4,8']
    ];
}
```

You may also use [array syntax](../../services/validation.md) for validation rules.

```php
public $rules = [
    'links.*.url' => ['required', 'url'],
    'links.*.anchor' => ['required']
];
```

Models validate themselves automatically when the `save` method is called.

```php
$user = new User;
$user->name = 'Actual Person';
$user->email = 'a.person@example.tld';
$user->password = 'passw0rd';

// Returns false if model is invalid
$success = $user->save();
```

::: tip
You can also validate a model at any time using the `validate` method.
:::

## Enhanced Validation Rules

The `unique` validation rule is automatically configured and does not require a table name to be specified.

```php
public $rules = [
    'name' => ['unique'],
];
```

The `required` validation rule supports **create** and **update** modifiers to only apply when a model is created or updated respectively. The following is only required when the model does not already exist.

```php
public $rules = [
    'password' => ['required:create'],
];
```

## Retrieving Validation Errors

When a model fails to validate, a `Illuminate\Support\MessageBag` object is attached to the model. The object which contains validation failure messages. Retrieve the validation errors message collection instance with `errors` method or `$validationErrors` property. Retrieve all validation errors with `errors()->all()`. Retrieve errors for a *specific* attribute using `validationErrors->get('attribute')`.

::: tip
The Model leverages the `MessagesBag` object which has a [simple and elegant method](../../services/validation.md) of formatting errors.
:::

## Overriding Validation

The `forceSave` method validates the model and saves regardless of whether or not there are validation errors.

```php
$user = new User;

// Creates a user without validation
$user->forceSave();
```

## Custom Error Messages

Just like the Validator class, you can set custom error messages using the [same syntax](../../services/validation.md).

```php
class User extends Model
{
    public $customMessages = [
        'required' => 'The :attribute field is required.',
        // ...
    ];
}
```

You can also add custom error messages to the array syntax for validation rules as well.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'links.*.url' => ['required', 'url'],
        'links.*.anchor' => ['required'],
    ];

    public $customMessages = [
        'links.*.url.required' => 'The url is required',
        'links.*.url.*' => 'The url needs to be a valid url'
        'links.*.anchor.required' => 'The anchor text is required',
    ];
}
```

In the above example you can write custom error messages to specific validation rules (here we used: `required`). Or you can use a `*` to select everything else (here we added a custom message to the `url` validation rule using the `*`).

## Custom Attribute Names

You may also set custom attribute names with the `$attributeNames` array.

```php
class User extends Model
{
    public $attributeNames = [
        'email' => 'Email Address',
        // ...
    ];
}
```

## Dynamic Validation Rules

You can apply rules dynamically by overriding the `beforeValidate` [model event](../models.md) method. Here we check if the `is_remote` attribute is `false` and then dynamically set the `latitude` and `longitude` attributes to be required fields.

```php
public function beforeValidate()
{
    if (!$this->is_remote) {
        $this->rules['latitude'] = 'required';
        $this->rules['longitude'] = 'required';
    }
}
```

## Custom Validation Rules

You can also create custom validation rules the [same way](../../services/validation.md) you would for the `Validator` service.
