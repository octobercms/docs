---
subtitle: Learn how to define component properties.
---
# Inspector Types

Inspector Types are property types used by CMS components. These are referenced by the following areas:

- [CMS Component Classes](../extend/cms-components.md)

All inspector types are identified as their individual **type** property.

```php
public function defineProperties()
{
    return [
        'maxItems' => [
            'title' => 'Max Items',
            'type' => 'string'
        ]
    ];
}
```

## Available Types

The following inspector types are available:

<div class="content-list-p" markdown="1">

[String](./inspector/type-string.md)
[String List](./inspector/type-stringlist.md)
[Text](./inspector/type-text.md)
[Autocomplete](./inspector/type-autocomplete.md)
[Checkbox](./inspector/type-checkbox.md)
[Dropdown](./inspector/type-dropdown.md)
[Dictionary](./inspector/type-dictionary.md)
[Object](./inspector/type-object.md)
[Object List](./inspector/type-objectlist.md)
[Set](./inspector/type-set.md)

</div>

## Available Configuration

The property parameters are defined with an array with the following keys.

Key | Description
------------- | -------------
**title** | required, the property title, it is used by the component Inspector in the CMS backend.
**description** | required, the property description, it is used by the component Inspector in the CMS backend.
**default** | optional, the default property value to use when the component is added to a page or layout in the CMS backend.
**type** | specifies the property type, which defines how the property is displayed in the Inspector.
**validation** | optional, specifies validation rules for the property value (see below).
**placeholder** | optional placeholder for string and dropdown properties.
**options** | optional array of options for dropdown properties.
**items** | optional array of items for set-based properties.
**depends** | an array of property names a dropdown property depends on. See the [dropdown type](./inspector/type-dropdown.md) for more information.
**group** | an optional group name. Groups create sections in the Inspector simplifying the user experience. Use a same group name in multiple properties to combine them.
**showExternalParam** | specifies visibility of the external parameter editor for the property in the Inspector. Default: `true`.
**ignoreIfDefault** | set to `true` to exclude the output from the array if the selection matches default value. Default: `false`
**ignoreIfEmpty** | set to `true` to exclude the output from the array if the selection has an empty value. Default: `false`
**sortOrder** | specify a custom position as an integer for the property in the available list.

## Validation Rules

Inspector types support several validation rules that can be applied to properties. Validation rules can be applied to top-level properties as well as to internal property definitions of object and object list editors.

```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'required' => [
                    'message' => 'The Name field is required'
                ],
                'regex' => [
                    'message' => 'The Name field can contain only Latin letters.',
                    'pattern' => '^[a-zA-Z]+$'
                ]
            ]
        ]
    ];
}
```

The key value in the `validation` object refers to a validator (see below). Validators are configured with objects, which properties depend on a validator. One property - `message` is common for all validators.

### Required Validator

The `required` validator checks if a value is not empty. The validator can be used with any editor, including complex editors (sets, dictionaries, object lists, etc.). Example:

```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'required' => [
                    'message' => 'The Name field is required'
                ]
            ]
        ]
    ];
}
```

### Regex Validator

The `regex` validator validates string values with a regular expression. The validator can be used only with string-typed editors. Example:


```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'regex' => [
                    'message' => 'The Name field can contain only Latin letters',
                    'pattern' => '^[a-z]+$',
                    'modifiers' => 'i'
                ]
            ]
        ]
    ];
}
```

The regular expression is specified with the required `pattern` parameter. The `modifiers` parameter is optional and can be used for setting regular expression modifiers.

### Integer Validator

The `integer` validator checks if the value is integer and can optionally validate if the value is within a specific interval. The validator can be used only with string-typed editors. Example:


```php
public function defineProperties()
{
    return [
        'numOfColumns' => [
            'title' => 'Number of Columns',
            'type' => 'string',
            'validation' => [
                'integer' => [
                    'message' => 'The Number of Columns field should contain an integer value',
                    'allowNegative' => true,
                    'min' => [
                        'value' => -10,
                        'message' => 'The number of columns should not be less than -10.'
                    ],
                    'max' => [
                        'value' => 10,
                        'message' => 'The number of columns should not be greater than 10.'
                    ]
                ]
            ]
        ]
    ];
}
```

Supported parameters:

* `allowNegative` - optional, determines if negative values are allowed. By default negative values are not allowed.
* `min` - optional object, defines the minimum allowed value and error message. Object fields:
    * `value` - defines the minimum value.
    * `message` - optional, defines the error message.
* `max` - optional object, defines the maximum allowed value and error message. Object fields:
    * `value` - defines the maximum value.
    * `message` - optional, defines the error message.

### Float Validator

The `float` validator checks if the value is a floating point number. The parameters for this validator match the parameters of the **integer** validator described above. Example:

```php
public function defineProperties()
{
    return [
        'amount' => [
            'title' => 'Amount',
            'type' => 'string',
            'validation' => [
                'float' => [
                    'message' => 'The Amount field should contain a positive floating point value'
                ]
            ]
        ]
    ];
}
```

Valid floating point number formats:

* 10
* 10.302
* -10 (if `allowNegative` is `true`)
* -10.84 (if `allowNegative` is `true`)

### Length Validator

The `length` validator checks if a string, array or object is not shorter or longer than specified values. This validator can work with the string, text, set, string list, dictionary and object list editors. In multiple-value editors (set, string list, dictionary and object list) it validates the number of items created in the editor.

::: tip
The `length` validator doesn't validate empty values. For example, if it's applied to a set editor, and the set is empty, the validation will pass regardless of the `min` and `max` parameter values. Use the `required` validator together with the `length` validator to make sure that the value is not empty before the length validation is applied.
:::

```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'length' => [
                    'min' => [
                        'value' => 2,
                        'message' => 'The name should not be shorter than two letters.'
                    ],
                    'max' => [
                        'value' => 10,
                        'message' => 'The name should not be longer than 10 letters.'
                    ]
                ]
            ]
        ]
    ];
}
```

Supported parameters:

* `min` - optional object, defines the minimum allowed length and error message. Object fields:
    * `value` - defines the minimum value.
    * `message` - optional, defines the error message.
* `max` - optional object, defines the maximum allowed length and error message. Object fields:
    * `value` - defines the maximum value.
    * `message` - optional, defines the error message.
