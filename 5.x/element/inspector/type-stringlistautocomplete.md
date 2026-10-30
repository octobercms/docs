---
subtitle: Inspector Type
shortname: String List Autocomplete
---
# String List Autocomplete Inspector Type

The `stringListAutocomplete` inspector type works like the [string list](./type-stringlist.md) editor, except each row includes auto completion suggestions. The editor opens in a popup window with a list of text inputs. Available options can be specified statically with the `items` parameter or loaded dynamically.

```php
public function defineProperties()
{
    return [
        'items' => [
            'title' => 'Items',
            'type' => 'stringListAutocomplete',
            'items' => ['Option 1', 'Option 2', 'Option 3']
        ]
    ];
}
```

The generated output is an array of strings, for example:

```json
"items": ["Option 1", "Option 3"]
```

The following [configuration values](../inspector-types.md) are commonly used.

Property | Description
------------- | -------------
**title** | title for the property.
**description** | a brief description of the property, optional.
**default** | specifies a default value as an array, optional.
**placeholder** | placeholder text shown when the value is empty, optional.
**items** | an array of autocomplete suggestions, optional if defining a `get*PropertyName*Options` method.

::: warning
This type does not support the external parameter editor as specified by the `showExternalParam` property.
:::

## Dynamic Options

The `stringListAutocomplete` inspector type supports the same methods for defining the options as the [dropdown inspector type](./type-dropdown.md).

```php
public function defineProperties()
{
    return [
        'items' => [
            'title' => 'Items',
            'type' => 'stringListAutocomplete',
        ],
    ];
}

public function getItemsOptions()
{
    return ['Option 1', 'Option 2', 'Option 3'];
}
```

#### See Also

::: also
* [String List Inspector Type](./type-stringlist.md)
* [Dropdown Inspector Type](./type-dropdown.md)
:::
