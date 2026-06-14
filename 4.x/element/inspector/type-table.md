---
subtitle: Inspector Type
shortname: Table
---
# Table Inspector Type

The `table` inspector type provides an inline table editor for creating arrays of structured data. Each row in the table represents an object, and the columns define the properties of each object. The table supports `string` and `dropdown` column types, along with per-column validation.

```php
public function defineProperties()
{
    return [
        'contacts' => [
            'title' => 'Contacts',
            'type' => 'table',
            'columns' => [
                'name' => [
                    'title' => 'Name',
                    'type' => 'string',
                    'validation' => [
                        'required' => [
                            'message' => 'Please provide a name'
                        ]
                    ]
                ],
                'role' => [
                    'title' => 'Role',
                    'type' => 'dropdown',
                    'placeholder' => 'Select',
                    'options' => [
                        'admin' => 'Administrator',
                        'editor' => 'Editor',
                        'viewer' => 'Viewer'
                    ]
                ]
            ]
        ]
    ];
}
```

The generated output is an array of objects, where each object contains the column values for a row, for example:

```json
"contacts": [
    {"name": "John Smith", "role": "admin"},
    {"name": "Jane Doe", "role": "editor"}
]
```

The following [configuration values](../inspector-types.md) are commonly used.

Property | Description
------------- | -------------
**title** | title for the property, optional. When omitted, the table spans the full width without a label.
**description** | a brief description of the property, optional.
**columns** | required, an array of column definitions (see below).
**adding** | enables the "Add Item" button to add new rows. Default: `true`.
**deleting** | enables the delete button on each row. Default: `true`.
**btnAddRowLabel** | customize the label for the add row button. Default: `Add Item`.

::: warning
This type does not support the external parameter editor as specified by the `showExternalParam` property.
:::

## Column Definitions

Each column is defined as an associative array entry inside the `columns` property. The key becomes the property name in the output object. Each column supports the following properties.

Property | Description
------------- | -------------
**title** | required, the column header title.
**type** | the column editor type: `string` or `dropdown`. Default: `string`.
**options** | array of options for `dropdown` columns, using the format `['key' => 'Label']`.
**placeholder** | placeholder text for `dropdown` columns.
**validation** | validation rules applied to the column values (see below).

## Column Validation

Validation rules can be applied to individual columns using the `validation` property. The supported validators are the same as for [top-level inspector properties](../inspector-types.md), including `required` and `regex`.

```php
'columns' => [
    'code' => [
        'title' => 'Code',
        'type' => 'string',
        'validation' => [
            'required' => [
                'message' => 'Please provide the code'
            ],
            'regex' => [
                'pattern' => '^[a-z][a-z0-9\_]*$',
                'modifiers' => 'i',
                'message' => 'Code must start with a letter and contain only letters, digits and underscores'
            ]
        ]
    ]
]
```

## Dropdown Columns

Table columns can use the `dropdown` type to provide a fixed set of options within a cell.

```php
public function defineProperties()
{
    return [
        'snippetProperties' => [
            'title' => 'Properties',
            'type' => 'table',
            'columns' => [
                'title' => [
                    'type' => 'string',
                    'title' => 'Property Title',
                    'validation' => [
                        'required' => [
                            'message' => 'Please provide the property title'
                        ]
                    ]
                ],
                'property' => [
                    'type' => 'string',
                    'title' => 'Code'
                ],
                'type' => [
                    'title' => 'Type',
                    'type' => 'dropdown',
                    'placeholder' => 'Select',
                    'options' => [
                        'string' => 'String',
                        'checkbox' => 'Checkbox',
                        'dropdown' => 'Dropdown'
                    ]
                ],
                'default' => [
                    'type' => 'string',
                    'title' => 'Default'
                ]
            ]
        ]
    ];
}
```