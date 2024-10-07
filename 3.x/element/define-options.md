---
subtitle: Defining the options property used across many definitions.
---
# Defining Options

Commonly, you may encounter the **options**, **optionsMethod** or **optionsPreset** property, this article describes in more detail how to configure options.

## Option Arrays

The `options` property should specify the options directly as part of the definition as a key-value pair, where the value and label are independently specified.

```yaml
options:
    draft: Draft
    published: Published
    archived: Archived
```

The keys can be integers with their label.

```yaml
options:
    1: Simple
    2: Complex
```

In addition to a simple arrays, some fields such as [radio lists](./form/field-radio.md) support specifying a description as part of their `options` values. This is where the value is defined as another array with the syntax `key: [label, description]`.

```yaml
options:
    all: [All, Guests and customers will be able to access this page.]
    registered: [Registered only, Only logged in member will be able to access this page.]
    guests: [Guests only, Only guest users will be able to access this page.]
```

Other fields, such as [dropdown fields](./form/field-dropdown.md) support specifying an icon, image or color as part of their `options` values. If the second item in the array starts with a `#` then it is considered a color, and if the value contains a `.` then it is considered an image, otherwise it is considered an icon class.

```yaml
options:
    red: [Color, '#ff0000']
    icon: [Icon, 'oc-icon-calendar']
    image: [Image, '/path/to/image.png']
```

## Option Presets

The `optionsPreset` property specifies a preset code that can be used to request the available options.

```yaml
optionsPreset: icons
```

The following presets are available:

Preset | Description
------ | -----------
**icons** | Lists available icon names (eg: `icon-calendar`)
**phosphorIcons** | Lists available icon names (eg: `ph ph-calendar`)
**locales** | Lists available locales (eg: `en-au`)
**flags** | Lists locales with their icons as flags (eg: `[en-au, flag-au]`)
**timezones** | Lists available timezones (eg: `Australia/Sydney`)

## Option Methods

The `optionsMethod` property specifies a callable PHP method that can be used to request the available options. Typically the method name will refer to a method local to the associated model.

```yaml
optionsMethod: getMyOptionsFromModel
```

The method name can also be a static method on any object.

```yaml
optionsMethod: MyAuthor\MyPlugin\Helpers\FormHelper::getMyStaticMethodOptions
```

### Detailed Option Definitions

Inside the method, an detailed definition can be used to specify more advanced options, such as setting individual attributes for each option. A detailed definition is identified by its associated array structure.

```php
public function getDetailedFieldOptions()
{
    return [
        1 => [
            'label' => 'Option 1',
            'comment' => 'This is option one'
        ],
        2 => [
            'label' => 'Option 2',
            'comment' => 'This is option two',
            'disabled' => true
        ]
    ];
}
```

The following properties are supported where possible:

Property | Description
------------- | -------------
**label** | a name when displaying the option to the user.
**comment** | places a descriptive comment below the option label.
**readOnly** | specifies if the option is read-only or not.
**disabled** | specifies if the option is disabled or not.
**hidden** | defines the option without ever displaying it.
**color** | defines a status indicator color for the option as a hex color (dropdown)
**icon** | specifies an icon name for this option (dropdown)
**image** | specifies an image URL for this option (dropdown)
**children** | specifies child options as another array for a nested structure (checkbox list)

#### See Also

::: also
* [Checkbox List Field](./form/field-checkboxlist.md)
* [Dropdown Field](./form/field-dropdown.md)
* [Radio Field](./form/field-radio.md)
:::
