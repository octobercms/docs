---
previousPath: extend/services/validation.md#available-validation-rules
subtitle: Rules for validating data, used by the Validator class and the Validation trait.
---
# Validation Rules

Below are all available validation rules and their functions.

<a name="rule-accepted"></a>
### accepted

The field under validation must be _yes_, _on_, or _1_. This is useful for validating "Terms of Service" acceptance.

<a name="rule-active-url"></a>
### active_url

The field under validation must be a valid URL according to the `checkdnsrr` PHP function.

<a name="rule-after"></a>
### after:_date_

The field under validation must be a value after a given date. The dates will be passed into the PHP `strtotime` function.

<a name="rule-alpha"></a>
### alpha

The field under validation must be entirely alphabetic characters.

<a name="rule-alpha-dash"></a>
### alpha_dash

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

<a name="rule-alpha-num"></a>
### alpha_num

The field under validation must be entirely alpha-numeric characters.

<a name="rule-array"></a>
### array

The field under validation must be of type array.

<a name="rule-before"></a>
### before:_date_

The field under validation must be a value preceding the given date. The dates will be passed into the PHP `strtotime` function.

<a name="rule-between"></a>
### between:_min_,_max_

The field under validation must have a size between the given _min_ and _max_. Strings, numerics, and files are evaluated in the same fashion as the `size` rule.

<a name="rule-boolean"></a>
### boolean

The field under validation must be able to be cast as a boolean. Accepted input are `true`, `false`, `1`, `0`, `"1"` and `"0"`.

<a name="rule-confirmed"></a>
### confirmed

The field under validation must have a matching field of `foo_confirmation`. For example, if the field under validation is `password`, a matching `password_confirmation` field must be present in the input.

<a name="rule-date"></a>
### date

The field under validation must be a valid date according to the `strtotime` PHP function.

<a name="rule-date-format"></a>
### date_format:_format_

The field under validation must match the _format_ defined according to the `date_parse_from_format` PHP function.

<a name="rule-different"></a>
### different:_field_

The given _field_ must be different than the field under validation.

<a name="rule-digits"></a>
### digits:_value_

The field under validation must be _numeric_ and must have an exact length of _value_.

<a name="rule-digits-between"></a>
### digits_between:_min_,_max_

The field under validation must have a length between the given _min_ and _max_.

<a name="rule-email"></a>
### email

The field under validation must be formatted as an e-mail address.

<a name="rule-exists"></a>
### exists:_table_,_column_

The field under validation must exist on a given database table.

Basic usage of exists rule

```php
'state' => 'exists:states'
```

Specifying a custom column name

```php
'state' => 'exists:states,abbreviation'
```

You may also specify more conditions that will be added as "where" clauses to the query:

```php
'email' => 'exists:staff,email,account_id,1'
```

Passing `NULL` as a "where" clause value will add a check for a `NULL` database value:

```php
'email' => 'exists:staff,email,deleted_at,NULL'
```

<a name="rule-image"></a>
### image

The file under validation must be an image (jpeg, png, bmp, or gif)

<a name="rule-in"></a>
### in:_foo_,_bar_,...

The field under validation must be included in the given list of values.

<a name="rule-integer"></a>
### integer

The field under validation must have an integer value.

<a name="rule-ip"></a>
### ip

The field under validation must be formatted as an IP address.

<a name="rule-max"></a>
### max:_value_

The field under validation must be less than or equal to a maximum _value_. Strings, numerics, and files are evaluated in the same fashion as the [`size`](#rule-size) rule.

<a name="rule-mimes"></a>
### mimes:_foo_,_bar_,...

The file under validation must have a MIME type corresponding to one of the listed extensions.

### Basic usage of MIME rule

```php
'photo' => 'mimes:jpeg,bmp,png'
```

<a name="rule-min"></a>
### min:_value_

The field under validation must have a minimum _value_. Strings, numerics, and files are evaluated in the same fashion as the [`size`](#rule-size) rule.

<a name="rule-not-in"></a>
### not_in:_foo_,_bar_,...

The field under validation must not be included in the given list of values.

<a name="rule-nullable"></a>
### nullable

The field under validation may be `null`. This is particularly useful when validating primitive such as strings and integers that can contain `null` values.

<a name="rule-numeric"></a>
### numeric

The field under validation must have a numeric value.

<a name="rule-regex"></a>
### regex:_pattern_

The field under validation must match the given regular expression.

**Note:** When using the `regex` pattern, it may be necessary to specify rules in an array instead of using pipe delimiters, especially if the regular expression contains a pipe character.

<a name="rule-required"></a>
### required

The field under validation must be present in the input data.

<a name="rule-required-if"></a>
### required_if:_field_,_value_,...

The field under validation must be present if the _field_ field is equal to any _value_.

<a name="rule-required-unless"></a>
### required_unless:anotherfield,value,...

The field under validation must be present and not empty unless the anotherfield field is equal to any value.

<a name="rule-required-with"></a>
### required_with:_foo_,_bar_,...

The field under validation must be present _only if_ any of the other specified fields are present.

<a name="rule-required-with-all"></a>
### required_with_all:_foo_,_bar_,...

The field under validation must be present _only if_ all of the other specified fields are present.

<a name="rule-required-without"></a>
### required_without:_foo_,_bar_,...

The field under validation must be present _only when_ any of the other specified fields are not present.

<a name="rule-required-without-all"></a>
### required_without_all:_foo_,_bar_,...

The field under validation must be present _only when_ the all of the other specified fields are not present.

<a name="rule-same"></a>
### same:_field_

The specified _field_ value must match the field's value under validation.

<a name="rule-size"></a>
### size:_value_

The field under validation must have a size matching the given _value_. For string data, _value_ corresponds to the number of characters. For numeric data, _value_ corresponds to a given integer value. For files, _size_ corresponds to the file size in kilobytes.

<a name="rule-string"></a>
### string:_value_

The field under validation must be a string type.

<a name="rule-timezone"></a>
### timezone

The field under validation must be a valid timezone identifier according to the `timezone_identifiers_list` PHP function.

<a name="rule-unique"></a>
### unique:_table_,_column_,_except_,_idColumn_

The field under validation must be unique on a given database table. If the `column` option is not specified, the field name will be used.

Basic usage of unique rule.

```php
'email' => 'unique:users'
```

Specifying a custom column name.

```php
'email' => 'unique:users,email_address'
```

Forcing a unique rule to ignore a given ID.

```php
'email' => 'unique:users,email_address,10'
```

Adding additional where clauses.

You may also specify more conditions that will be added as "where" clauses to the query:

```php
'email' => 'unique:users,email_address,NULL,id,account_id,1'
```

In the rule above, only rows with an `account_id` of `1` would be included in the unique check.

<a name="rule-site-unique"></a>
### unique_site:_table_,_column_,_except_,_idColumn_

The field under validation must be unique within the same [site context](../../themes/sites/multisite.md). The definition is identical to the `unique` rule.

```php
'email' => 'unique_site:users'
```

<a name="rule-url"></a>
### url

The field under validation must be formatted as an URL.

::: tip
This function uses PHP's `filter_var` method.
:::
