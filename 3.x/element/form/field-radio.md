---
subtitle: Form Field
---
# Radio List

The `radio` field renders a list of radio options, where only one item can be selected at a time. Radio fields support the same methods for defining the options as the [dropdown field type](./field-dropdown.md).

```yaml
security_level:
    type: radio
    label: Access Level
    options:
        all: All
        registered: Registered only
        guests: Guests only
```

The following properties are supported.

Property | Description
------------- | -------------
**options** | available options for the dropdown, as an array or method name.
**default** | a default value to use for new records.
**cssClass** | used for setting the options as inline.

You may use the `default` property to set a default value, where the value is the key of the option.

```yaml
security_level:
    type: radio
    label: Access Level
    default: guests
```

In addition to a simple arrays, radio lists support a secondary description as part of their `options`.

```yaml
security_level:
    type: radio
    label: Access Level
    options:
        all: [All, Guests and customers will be able to access this page.]
        registered: [Registered only, Only logged in member will be able to access this page.]
        guests: [Guests only, Only guest users will be able to access this page.]
```

To visually display the options side-by-side instead of stacked, use the `cssClass` property to specify a value of **inline-options**.

```yaml
security_level:
    type: radio
    label: Access Level
    cssClass: inline-options
```

## Dynamic Options

Radio lists support the same methods for defining the options as the [dropdown field type](./field-dropdown.md).


In addition to these definitions, for radio lists, the method could return either the simple array: **key => value** or an array of arrays for providing the descriptions: **key => [label, description]**.

```php
public function listAccessLevels($fieldName, $value, $formData)
{
    return [
        'all' => ['All', 'Guests and customers will be able to access this page.'],
        // ...
    ];
}
```

#### See Also

::: also
* [Dropdown Form Field](./field-dropdown.md)
:::
