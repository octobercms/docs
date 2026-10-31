---
previousPath: extend/services/validation.md
subtitle: Check user input against validation rules and show the error messages for fields that fail.
---
# Validation

The `Validator` facade checks data against a set of rules and collects an error message for each field that fails. Use it to validate form data submitted by the user, for example in an AJAX handler.

```php
$validator = Validator::make(post(), [
    'name' => 'required|min:5',
    'email' => 'required|email'
]);

if ($validator->fails()) {
    throw new ValidationException($validator);
}
```

Every available rule, such as [required](./validation-rules.md#rule-required) and [email](./validation-rules.md#rule-email), is described in the [Validation Rules](./validation-rules.md) reference.

::: tip
When working with models, use the [Validation trait](../data/model-traits/validation.md). It uses the `Validator` class and supports the same rule definitions.
:::

## Validating Input

Pass the data to the `make` method as the first argument, and the rules to apply as the second argument. In the following example, the `post()` helper function captures the postback user input.

```php
$data = post();

$validator = Validator::make($data, [
    'name' => 'required|min:5'
]);
```

Separate multiple rules with a "pipe" character, or list them as separate elements of an array.

```php
$validator = Validator::make($data, [
    'name' => ['required', 'min:5']
]);
```

To validate multiple fields, add them to the array.

```php
$data = [
    'name' => 'Joe',
    'password' => 'lamepassword',
    'email' => 'email@example.tld'
];

$validator = Validator::make($data, [
    'name' => 'required',
    'password' => 'required|min:8',
    'email' => 'required|email|unique:users'
]);
```

### Checking the Result

Once you have a `Validator` instance, call the `fails` (or `passes`) method to run the validation.

```php
if ($validator->fails()) {
    // The given data did not pass validation
}
```

If validation failed, you can get the error messages from the validator.

```php
$messages = $validator->messages();
```

Use the `failed` method to get an array of the rules that failed, without messages.

```php
$failed = $validator->failed();
```

### Validating Files

Rules such as [size](./validation-rules.md#rule-size) and [mimes](./validation-rules.md#rule-mimes) validate files. Pass the files to the validator along with your other data.

```php
$data = files() + post();

$validator = Validator::make($data, [...]);
```

::: warning
Avoid passing unfiltered `input()` values here. They include GET values, which can be used to craft malicious links.
:::

## Throwing a Validation Exception

When you validate a submitted form, throwing a `ValidationException` is the usual response to a failure. The `validate` method is a shorter way to do this, since it throws the exception for you.

```php
$data = Validator::validate($data, $rules);
```

::: tip
The `validate` method returns the filtered user data, which holds only the attributes and values that were validated.
:::

The code above does the same as the following code, which also shows how to pass the validator instance to the [validation exception](./exceptions.md#validation-exception) as the first argument.

```php
$validation = Validator::make($data, $rules);

if ($validation->fails()) {
    throw new ValidationException($validation);
}
```

### Validating the Request

You can also validate all of the user input with the `Request` facade. You only need to supply the rules, as the first argument.

```php
$data = Request::validate($rules);
```

The `validate` method returns the user data filtered by the validation rules. A field that is not defined in the rules is not included in this data.

## Working with Error Messages

The `messages` method of a `Validator` instance returns an `Illuminate\Support\MessageBag` instance, which has several methods for working with error messages.

```php
// Get the first error message for a field
echo $messages->first('email');

// Get all error messages for a field
foreach ($messages->get('email') as $message) {
    //
}

// Get all error messages for all fields
foreach ($messages->all() as $message) {
    //
}

// Check if messages exist for a field
if ($messages->has('email')) {
    //
}
```

To wrap each message in markup, pass a format with the `:message` placeholder. By default, messages are formatted using Bootstrap compatible syntax.

```php
// Get the first error message with a format
echo $messages->first('email', '<p>:message</p>');

// Get all error messages with a format
foreach ($messages->all('<li>:message</li>') as $message) {
    //
}
```

### Showing Errors in Pages

October CMS passes error messages back to your pages for you. Consider the following AJAX handler.

```php
public function onRegister()
{
    $rules = [];

    $validator = Validator::make(input(), $rules);

    if ($validator->fails()) {
        return Redirect::to('register')->withErrors($validator);
    }
}
```

When validation fails, the handler passes the `Validator` instance to the redirect with the `withErrors` method. This method flashes the error messages to the session, so they are available on the next request.

October CMS checks the session for errors and binds them to the view automatically. **An `errors` variable is always available in all of your pages, on every request**, so you can safely assume it is defined. The `errors` variable is an instance of `MessageBag`.

After the redirect, use the `errors` variable in your page.

```twig
{{ errors.first('email') }}
```

### Naming Error Bags

If you have several forms on one page, you can name the `MessageBag` of errors to get the messages for a specific form. Pass the name as the second argument to `withErrors`.

```php
return Redirect::to('register')->withErrors($validator, 'login');
```

Then access the named `MessageBag` instance from the `errors` variable.

```twig
{{ errors.login.first('email') }}
```

## Adding Rules Conditionally

To validate a field **only** when it is present in the input array, add the `sometimes` rule to your rule list.

```php
$v = Validator::make($data, [
    'email' => 'sometimes|required|email',
]);
```

In the example above, the `email` field is only validated if it is present in the `$data` array.

### Validating Based on Other Fields

Sometimes a field is required only when another field has a value greater than 100, or two fields need a value only when another field is present. Start by creating a `Validator` instance with the _static rules_ that never change.

```php
$v = Validator::make($data, [
    'email' => 'required|email',
    'games' => 'required|numeric',
]);
```

Say your application is for game collectors. If a collector owns more than 100 games, you want them to explain why, for example because they run a resale shop or enjoy collecting. Use the `sometimes` method of the `Validator` instance to add this requirement conditionally.

```php
$v->sometimes('reason', 'required|max:500', function($input) {
    return $input->games >= 100;
});
```

The first argument of the `sometimes` method is the name of the field to validate conditionally. The second argument is the rules to add. The rules are added when the closure passed as the third argument returns `true`. You can also add conditional rules for several fields at once.

```php
$v->sometimes(['reason', 'cost'], 'required', function($input) {
    return $input->games >= 100;
});
```

::: tip
The `$input` parameter passed to your closure is an instance of `Illuminate\Support\Fluent`, and you can use it as an object to access your input and files.
:::

## Validating Arrays

Use "dot notation" to validate attributes within an array. For example, if the request contains a `photos[profile]` field, validate it like this.

```php
$validator = Validator::make(input(), [
    'photos.profile' => 'required|image',
]);
```

You can also validate each element of an array. For example, to check that each email in an array input field is unique:

```php
$validator = Validator::make(input(), [
    'person.*.email' => 'email|unique:users',
    'person.*.first_name' => 'required_with:person.*.last_name',
]);
```

You can also use the `*` character in your language files, so one validation message covers every element of an array field.

```php
'custom' => [
    'person.*.email' => [
        'unique' => 'Each person must have a unique e-mail address',
    ]
],
```

Rules also accept "array notation", which is converted to "dot notation" automatically during validation.

```php
$validator = Validator::make(input(), [
    'photos[profile]' => 'required|image',
    'person[][email]' => 'email|unique:users',
]);
```

## Customizing Error Messages

You can replace the default error messages with your own. One way is to pass custom messages to the validator instance as the third argument.

```php
$messages = [
    'required' => 'The :attribute field is required.',
];

$validator = Validator::make($input, $rules, $messages);
```

The `:attribute` placeholder is replaced by the name of the field under validation. Validation messages can use other placeholders too, such as the following.

```php
$messages = [
    'same' => 'The :attribute and :other must match.',
    'size' => 'The :attribute must be exactly :size.',
    'between' => 'The :attribute must be between :min - :max.',
    'in' => 'The :attribute must be one of the following types: :values',
];
```

To set a custom message for one field only, prefix the rule with the field name. The following sets a custom message for the `email` attribute when using the **required** rule.

```php
$messages = [
    'email.required' => 'We need to know your e-mail address!',
];
```

### Using Language Files for Messages

You can keep your custom messages in a language file instead of passing them to the `Validator` directly. Add them to an array in the **lang/xx/validation.php** language file of your plugin.

```php
return  [
    'required' => 'We need to know your e-mail address!',
    'email.required' => 'We need to know your e-mail address!',
];
```

Then load the file with `Lang::get` in your call to `Validator::make`.

```php
Validator::make($formValues, $validations, Lang::get('acme.blog::validation'));
```

### Overriding Validation Messages Globally

The default validator messages are in the **modules/system/lang/xx/validation.php** file. Open this file to see all the available messages.

The file holds an array of messages for each validation rule. It also has a `custom` key for custom error messages using the "attribute.rule" naming convention, and an `attributes` key for custom attribute names.

```php
return [
    'required' => 'The :attribute field is required!',
    // ...

    'custom' => [
        // ...
    ],

    'attributes' => [
        // ...
    ]
];
```

To change any of these values, create a new file in the app directory. For example, for the `en` locale, create the file **app/lang/system/en/validation.php**. Its values override the defaults, and it only needs the values you want to change.

```php
return [
    'required' => 'Sorry, we need that field (:attribute) you gave!',

    'attributes' => [
        'email' => 'email address'
    ],
];
```

## Creating Custom Rules

When the [built-in rules](./validation-rules.md) are not enough, you can write your own. Decide first whether the rule should be registered globally, or used as a local rule object.

### Registering a Global Rule

A global rule is shared across your application, registered with a tag and a rule class. Register it in the `register` method of the [plugin registration file](../plugins/extending.md) using the `registerValidationRule` helper method.

```php
public function register()
{
    $this->registerValidationRule('all_caps', UppercaseRule::class);
}
```

This creates a rule tagged **all_caps** that points to the rule class, and you can now use it anywhere you specify rules. Do not give the tag the same name as a built-in rule, such as `uppercase`, because built-in rules take precedence over registered ones.

```php
Validator::make($data, [
    'shoutout' => 'required|all_caps',
]);
```

### Defining a Global Rule Class

A global rule class is a single reusable validation rule. At a minimum, the class provides a `validate` method that returns whether the value passes. You can also add a `message` method that returns a custom error message.

```php
class UppercaseRule
{
    /**
     * validate determines if the validation rule passes.
     * @param string $attribute
     * @param mixed $value
     * @param array $params
     * @return bool
     */
    public function validate($attribute, $value, $params)
    {
        return strtoupper($value) === $value;
    }

    /**
     * message gets the validation error message.
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be uppercase.';
    }
}
```

### Passing Arguments to Rules

Global rules can accept arguments. For example, a rule called **betwixt** may need two values. Separate the rule name from its parameters with a colon (`:`), and separate each parameter with a comma (`,`).

```php
$v = Validator::make($data, [
    'name' => 'betwixt:1,6',
]);
```

The parameters are passed to the `validate` method. To use them in the error message, define a `replace` method.

```php
class BetwixtRule
{
    /**
     * validate between start and end parameters.
     */
    public function validate($attribute, $value, $params)
    {
        [$start, $end] = $params;

        return strlen($value) > $start && strlen($value) < $end;
    }

    /**
     * message gets the validation error message.
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be between :start and :end.';
    }

    /**
     * replace defines custom placeholder replacements.
     * @return string
     */
    public function replace($message, $attribute, $rule, $params)
    {
        [$start, $end] = $params;

        $message = str_replace(':start', $start, $message);

        $message = str_replace(':end', $end, $message);

        return $message;
    }
}
```

### Using Rule Objects

A local rule object implements the `Illuminate\Contracts\Validation\ValidationRule` contract, which requires a `validate` method. Unlike a global rule class, this method returns nothing. It calls the `$fail` closure with an error message when validation does not pass. The [Laravel documentation on rule objects](https://laravel.com/docs/12.x/validation#using-rule-objects) describes rule classes in more detail.

```php
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class LowercaseRule implements ValidationRule
{
    /**
     * validate fails the attribute when its value is not lowercase.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (strtolower($value) !== $value) {
            $fail('The :attribute must be lowercase.');
        }
    }
}
```

Pass an instance of the rule to the `Validator` service.

```php
$v = Validator::make($data, [
    'name' => ['required', new LowercaseRule],
]);
```

In models, you can add the rule object in the `beforeValidate` method override.

```php
public function beforeValidate()
{
    $this->rules['name'] = ['required', new LowercaseRule];
}
```

#### See Also

::: also
* [Validation Rules](./validation-rules.md)
* [Validation Trait](../data/model-traits/validation.md)
* [AJAX Validation](../../themes/ajax/validation.md)
* [Laravel Validation Documentation](https://laravel.com/docs/12.x/validation)
:::
