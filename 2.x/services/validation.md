# Validation

## Basic Usage

The validator class is a simple, convenient facility for validating data and retrieving validation error messages via the `Validator` class. It is useful when processing form data submitted by the end user.

> **Note**: When working with models, October CMS ships with a useful [Validation Trait](../database/traits.md#oc-validation) that implements the `Validator` class and supports the same rule definitions.

#### Basic Validation Example

The first argument passed to the `make` method is the data under validation. The second argument is the validation rules that should be applied to the data.

```php
$validator = Validator::make(
    ['name' => 'Joe'],
    ['name' => 'required|min:5']
);
```

Multiple rules may be delimited using either a "pipe" character, or as separate elements of an array.

```php
$validator = Validator::make(
    ['name' => 'Joe'],
    ['name' => ['required', 'min:5']]
);
```

To validate multiple fields, simply add them to the array.

```php
$validator = Validator::make(
    [
        'name' => 'Joe',
        'password' => 'lamepassword',
        'email' => 'email@example.com'
    ],
    [
        'name' => 'required',
        'password' => 'required|min:8',
        'email' => 'required|email|unique:users'
    ]
);
```

#### Checking the Validation Results

Once a `Validator` instance has been created, the `fails` (or `passes`) method may be used to perform the validation.

```php
if ($validator->fails()) {
    // The given data did not pass validation
}
```

If validation has failed, you may retrieve the error messages from the validator.

```php
$messages = $validator->messages();
```

You may also access an array of the failed validation rules, without messages. To do so, use the `failed` method:

```php
$failed = $validator->failed();
```

#### Validating Files

The `Validator` class provides several rules for validating files, such as `size`, `mimes`, and others. When validating files, you may simply pass them into the validator with your other data.

<a id="oc-working-with-error-messages"></a>
## Working with Error Messages

After calling the `messages` method on a `Validator` instance, you will receive a `Illuminate\Support\MessageBag` instance, which has a variety of convenient methods for working with error messages.

#### Retrieving the first error message for a field

```php
echo $messages->first('email');
```

#### Retrieving all error messages for a field

```php
foreach ($messages->get('email') as $message) {
    //
}
```

#### Retrieving all error messages for all fields

```php
foreach ($messages->all() as $message) {
    //
}
```

#### Determining if messages exist for a field

```php
if ($messages->has('email')) {
    //
}
```

#### Retrieving an error message with a format

```php
echo $messages->first('email', '<p>:message</p>');
```

> **Note**: By default, messages are formatted using Bootstrap compatible syntax.

#### Retrieving all error messages with a format

```php
foreach ($messages->all('<li>:message</li>') as $message) {
    //
}
```

## Error Messages & Views

Once you have performed validation, you will need an easy way to get the error messages back to your views. This is conveniently handled by October CMS. Consider the following AJAX handler as an example:

```php
public function onRegister()
{
    $rules = [];

    $validator = Validator::make(Input::all(), $rules);

    if ($validator->fails()) {
        return Redirect::to('register')->withErrors($validator);
    }
}
```

Note that when validation fails, we pass the `Validator` instance to the Redirect using the `withErrors` method. This method will flash the error messages to the session so that they are available on the next request.

October CMS will always check for errors in the session data, and automatically bind them to the view if they are available. **So, it is important to note that an `errors` variable will always be available in all of your pages, on every request**, allowing you to conveniently assume the `errors` variable is always defined and can be safely used. The `errors` variable will be an instance of `MessageBag`.

So, after redirection, you may utilize the automatically bound `errors` variable in your view:

```twig
{{ errors.first('email') }}
```

### Named Error Bags

If you have multiple forms on a single page, you may wish to name the `MessageBag` of errors. This will allow you to retrieve the error messages for a specific form. Simply pass a name as the second argument to `withErrors`:

```php
return Redirect::to('register')->withErrors($validator, 'login');
```

You may then access the named `MessageBag` instance from the `$errors` variable:

```twig
{{ errors.login.first('email') }}
```

## Available Validation Rules

Below is a list of all available validation rules and their function:

<div class="content-list" markdown="1">

- [Accepted](#rule-accepted)
- [Active URL](#rule-active-url)
- [After (Date)](#rule-after)
- [Alpha](#rule-alpha)
- [Alpha Dash](#rule-alpha-dash)
- [Alpha Numeric](#rule-alpha-num)
- [Array](#rule-array)
- [Before (Date)](#rule-before)
- [Between](#rule-between)
- [Boolean](#rule-boolean)
- [Confirmed](#rule-confirmed)
- [Date](#rule-date)
- [Date Format](#rule-date-format)
- [Different](#rule-different)
- [Digits](#rule-digits)
- [Digits Between](#rule-digits-between)
- [E-Mail](#rule-email)
- [Exists (Database)](#rule-exists)
- [Image (File)](#rule-image)
- [In](#rule-in)
- [Integer](#rule-integer)
- [IP Address](#rule-ip)
- [Max](#rule-max)
- [MIME Types](#rule-mimes)
- [Min](#rule-min)
- [Not In](#rule-not-in)
- [Nullable](#rule-nullable)
- [Numeric](#rule-numeric)
- [Regular Expression](#rule-regex)
- [Required](#rule-required)
- [Required If](#rule-required-if)
- [Required Unless](#rule-required-unless)
- [Required With](#rule-required-with)
- [Required With All](#rule-required-with-all)
- [Required Without](#rule-required-without)
- [Required Without All](#rule-required-without-all)
- [Same](#rule-same)
- [Size](#rule-size)
- [String](#rule-string)
- [Timezone](#rule-timezone)
- [Unique (Database)](#rule-unique)
- [URL](#rule-url)

</div>

<a name="rule-accepted"></a>
#### accepted

The field under validation must be _yes_, _on_, or _1_. This is useful for validating "Terms of Service" acceptance.

<a name="rule-active-url"></a>
#### active_url

The field under validation must be a valid URL according to the `checkdnsrr` PHP function.

<a name="rule-after"></a>
#### after:_date_

The field under validation must be a value after a given date. The dates will be passed into the PHP `strtotime` function.

<a name="rule-alpha"></a>
#### alpha

The field under validation must be entirely alphabetic characters.

<a name="rule-alpha-dash"></a>
#### alpha_dash

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

<a name="rule-alpha-num"></a>
#### alpha_num

The field under validation must be entirely alpha-numeric characters.

<a name="rule-array"></a>
#### array

The field under validation must be of type array.

<a name="rule-before"></a>
#### before:_date_

The field under validation must be a value preceding the given date. The dates will be passed into the PHP `strtotime` function.

<a name="rule-between"></a>
#### between:_min_,_max_

The field under validation must have a size between the given _min_ and _max_. Strings, numerics, and files are evaluated in the same fashion as the `size` rule.

<a name="rule-boolean"></a>
#### boolean

The field under validation must be able to be cast as a boolean. Accepted input are `true`, `false`, `1`, `0`, `"1"` and `"0"`.

<a name="rule-confirmed"></a>
#### confirmed

The field under validation must have a matching field of `foo_confirmation`. For example, if the field under validation is `password`, a matching `password_confirmation` field must be present in the input.

<a name="rule-date"></a>
#### date

The field under validation must be a valid date according to the `strtotime` PHP function.

<a name="rule-date-format"></a>
#### date_format:_format_

The field under validation must match the _format_ defined according to the `date_parse_from_format` PHP function.

<a name="rule-different"></a>
#### different:_field_

The given _field_ must be different than the field under validation.

<a name="rule-digits"></a>
#### digits:_value_

The field under validation must be _numeric_ and must have an exact length of _value_.

<a name="rule-digits-between"></a>
#### digits_between:_min_,_max_

The field under validation must have a length between the given _min_ and _max_.

<a name="rule-email"></a>
#### email

The field under validation must be formatted as an e-mail address.

<a name="rule-exists"></a>
#### exists:_table_,_column_

The field under validation must exist on a given database table.

#### Basic usage of exists rule

```
'state' => 'exists:states'
```

#### Specifying a custom column name

```
'state' => 'exists:states,abbreviation'
```

You may also specify more conditions that will be added as "where" clauses to the query:

```
'email' => 'exists:staff,email,account_id,1'
```

Passing `NULL` as a "where" clause value will add a check for a `NULL` database value:

```
'email' => 'exists:staff,email,deleted_at,NULL'
```

<a name="rule-image"></a>
#### image

The file under validation must be an image (jpeg, png, bmp, or gif)

<a name="rule-in"></a>
#### in:_foo_,_bar_,...

The field under validation must be included in the given list of values.

<a name="rule-integer"></a>
#### integer

The field under validation must have an integer value.

<a name="rule-ip"></a>
#### ip

The field under validation must be formatted as an IP address.

<a name="rule-max"></a>
#### max:_value_

The field under validation must be less than or equal to a maximum _value_. Strings, numerics, and files are evaluated in the same fashion as the [`size`](#rule-size) rule.

<a name="rule-mimes"></a>
#### mimes:_foo_,_bar_,...

The file under validation must have a MIME type corresponding to one of the listed extensions.

#### Basic usage of MIME rule

```
'photo' => 'mimes:jpeg,bmp,png'
```

<a name="rule-min"></a>
#### min:_value_

The field under validation must have a minimum _value_. Strings, numerics, and files are evaluated in the same fashion as the [`size`](#rule-size) rule.

<a name="rule-not-in"></a>
#### not_in:_foo_,_bar_,...

The field under validation must not be included in the given list of values.

<a name="rule-nullable"></a>
#### nullable

The field under validation may be `null`. This is particularly useful when validating primitive such as strings and integers that can contain `null` values.

<a name="rule-numeric"></a>
#### numeric

The field under validation must have a numeric value.

<a name="rule-regex"></a>
#### regex:_pattern_

The field under validation must match the given regular expression.

**Note:** When using the `regex` pattern, it may be necessary to specify rules in an array instead of using pipe delimiters, especially if the regular expression contains a pipe character.

<a name="rule-required"></a>
#### required

The field under validation must be present in the input data.

<a name="rule-required-if"></a>
#### required_if:_field_,_value_,...

The field under validation must be present if the _field_ field is equal to any _value_.

<a name="rule-required-unless"></a>
#### required_unless:anotherfield,value,...

The field under validation must be present and not empty unless the anotherfield field is equal to any value.

<a name="rule-required-with"></a>
#### required_with:_foo_,_bar_,...

The field under validation must be present _only if_ any of the other specified fields are present.

<a name="rule-required-with-all"></a>
#### required_with_all:_foo_,_bar_,...

The field under validation must be present _only if_ all of the other specified fields are present.

<a name="rule-required-without"></a>
#### required_without:_foo_,_bar_,...

The field under validation must be present _only when_ any of the other specified fields are not present.

<a name="rule-required-without-all"></a>
#### required_without_all:_foo_,_bar_,...

The field under validation must be present _only when_ all of the other specified fields are not present.

<a name="rule-same"></a>
#### same:_field_

The specified _field_ value must match the field's value under validation.

<a name="rule-size"></a>
#### size:_value_

The field under validation must have a size matching the given _value_. For string data, _value_ corresponds to the number of characters. For numeric data, _value_ corresponds to a given integer value. For files, _size_ corresponds to the file size in kilobytes.

<a name="rule-string"></a>
#### string:_value_

The field under validation must be a string type.

<a name="rule-timezone"></a>
#### timezone

The field under validation must be a valid timezone identifier according to the `timezone_identifiers_list` PHP function.

<a name="rule-unique"></a>
#### unique:_table_,_column_,_except_,_idColumn_

The field under validation must be unique on a given database table. If the `column` option is not specified, the field name will be used.

#### Basic usage of unique rule

```
'email' => 'unique:users'
```

#### Specifying a custom column name

```
'email' => 'unique:users,email_address'
```

#### Forcing a unique rule to ignore a given ID

```
'email' => 'unique:users,email_address,10'
```

#### Adding additional where clauses

You may also specify more conditions that will be added as "where" clauses to the query:

```
'email' => 'unique:users,email_address,NULL,id,account_id,1'
```

In the rule above, only rows with an `account_id` of `1` would be included in the unique check.

<a name="rule-url"></a>
#### url

The field under validation must be formatted as an URL.

> **Note**: This function uses PHP's `filter_var` method.

<a name="conditionally-adding-rules"></a>
## Conditionally Adding Rules

In some situations, you may wish to run validation checks against a field **only** if that field is present in the input array. To quickly accomplish this, add the `sometimes` rule to your rule list:

```php
$v = Validator::make($data, [
    'email' => 'sometimes|required|email',
]);
```

In the example above, the `email` field will only be validated if it is present in the `$data` array.

#### Complex conditional validation

Sometimes you may wish to require a given field only if another field has a greater value than 100. Or you may need two fields to have a given value only when another field is present. Adding these validation rules doesn't have to be a pain. First, create a `Validator` instance with your _static rules_ that never change:

```php
$v = Validator::make($data, [
    'email' => 'required|email',
    'games' => 'required|numeric',
]);
```

Let's assume our web application is for game collectors. If a game collector registers with our application and they own more than 100 games, we want them to explain why they own so many games. For example, perhaps they run a game re-sell shop, or maybe they just enjoy collecting. To conditionally add this requirement, we can use the `sometimes` method on the `Validator` instance.

```php
$v->sometimes('reason', 'required|max:500', function($input) {
    return $input->games >= 100;
});
```

The first argument passed to the `sometimes` method is the name of the field we are conditionally validating. The second argument is the rules we want to add. If the `Closure` passed as the third argument returns `true`, the rules will be added. This method makes it a breeze to build complex conditional validations. You may even add conditional validations for several fields at once:

```php
$v->sometimes(['reason', 'cost'], 'required', function($input) {
    return $input->games >= 100;
});
```

> **Note**: The `$input` parameter passed to your `Closure` will be an instance of `Illuminate\Support\Fluent` and may be used as an object to access your input and files.

<a id="oc-validating-arrays"></a>
## Validating Arrays

Validating array based form input fields doesn't have to be a pain. You may use "dot notation" to validate attributes within an array. For example, if the incoming HTTP request contains a `photos[profile]` field, you may validate it like so:

```php
$validator = Validator::make(Input::all(), [
    'photos.profile' => 'required|image',
]);
```

You may also validate each element of an array. For example, to validate that each e-mail in a given array input field is unique, you may do the following:

```php
$validator = Validator::make(Input::all(), [
    'person.*.email' => 'email|unique:users',
    'person.*.first_name' => 'required_with:person.*.last_name',
]);
```

Likewise, you may use the `*` character when specifying your validation messages in your language files, making it a breeze to use a single validation message for array based fields:

```php
'custom' => [
    'person.*.email' => [
        'unique' => 'Each person must have a unique e-mail address',
    ]
],
```

You may also use "array notation" in your validation rules if you wish. These rules will be converted to "dot notation" automatically on validation.

```php
$validator = Validator::make(Input::all(), [
    'photos[profile]' => 'required|image',
    'person[][email]' => 'email|unique:users',
]);
```

<a id="oc-custom-error-messages"></a>
## Custom Error Messages

If needed, you may use custom error messages for validation instead of the defaults. There are several ways to specify custom messages.

#### Passing Custom Messages to the Validator

```php
$messages = [
    'required' => 'The :attribute field is required.',
];

$validator = Validator::make($input, $rules, $messages);
```

> *Note:* The `:attribute` place-holder will be replaced by the actual name of the field under validation. You may also utilize other place-holders in validation messages.

#### Other Validation Placeholders

```php
$messages = [
    'same' => 'The :attribute and :other must match.',
    'size' => 'The :attribute must be exactly :size.',
    'between' => 'The :attribute must be between :min - :max.',
    'in' => 'The :attribute must be one of the following types: :values',
];
```

#### Specifying a custom message for a given attribute

Sometimes you may wish to specify a custom error messages only for a specific field:

```php
$messages = [
    'email.required' => 'We need to know your e-mail address!',
];
```

<a name="localization"></a>
#### Specifying Custom Messages in Language Files

In some cases, you may wish to specify your custom messages in a language file instead of passing them directly to the `Validator`. To do so, add your messages to an array in the `lang/xx/validation.php` language file for your plugin.

```php
return  [
    'required' => 'We need to know your e-mail address!',
    'email.required' => 'We need to know your e-mail address!',
];
```

Then in your call to `Validator::make` use the `Lang:get` to use your custom files.

```php
Validator::make($formValues, $validations, Lang::get('acme.blog::validation'));
```

<a id="oc-custom-validation-rules"></a>
## Custom Validation Rules

There are a variety of helpful validation rules, however, you may wish to specify some of your own. First you should decide if your rule shuld be [registered globally](#oc-globally-registered-rules), or use [a local rule object](#oc-local-rule-objects).

<a id="oc-globally-registered-rules"></a>
### Globally Registered Rules

A globally registered rule can be shared throughout your application by registering it with a tag and rule class using the `Validator::extend` method. In an October CMS plugin, this can be added to the `boot()` callback method inside your `Plugin.php` registration file.

```php
public function boot()
{
    Validator::extend('uppercase', UppercaseRule::class);
}
```

In this instance, we have created a rule tagged **uppercase** and referenced our rule class where it becomes available to specify as a rule everywhere.

```php
$v = Validator::make($data, [
    'shoutout' => 'required|uppercase',
]);
```

#### Defining a Global Rule Class

A global rule class represents a single reusable validation rule for your models. At a minimum, the rule class must provide a `validate` method that determines if the validation rule passes. You may also specify an optional `message` method to return a custom error message.

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

#### Passing Arguments to Rules

Global rules can support passing arguments along with their definition. For example, a rule called **betwixt** may require two values. Parameters can be passed to a rule by separating with a colon (`:`) and each parameter is seperated by a comma (`,`).

```php
$v = Validator::make($data, [
    'name' => 'betwixt:1,6',
]);
```

The parameters are then passed to the validate method and become available. The error message can also be processed by defining a `replace` method.

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

<a id="oc-local-rule-objects"></a>
### Local Rule Objects

The [Laravel documentation on rule objects](https://laravel.com/docs/6.x/validation#using-rule-objects) describes in more detail how to define a rule class. Specifically, the rule must implement the `Illuminate\Contracts\Validation\Rule` contract which requires a `passes` method to be defined.

```php
class LowercaseRule implements \Illuminate\Contracts\Validation\Rule
{
    /**
     * passes checks if the rule is successful
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return strtolower($value) === $value;
    }

    /**
     * message gets the validation error message.
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be lowercase.';
    }
}
```

Once a rule is defined, it can be passed as an insatance to the `Validator` service.

```php
$v = Validator::make($data, [
    'name' => ['required', new LowercaseRule],
]);
```

You may also implement the rule object in models using the `beforeValidate` method override.

```php
public function beforeValidate()
{
    $this->rules['name'] = ['required', new LowercaseRule];
}
```
