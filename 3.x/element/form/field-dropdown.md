---
subtitle: Form Field
---
# Dropdown

The `dropdown` field renders a dropdown with specified options. There are a number of ways to provide the dropdown options, most of them involve specify the `options` value.

```yaml
status_type:
    type: dropdown
    label: Blog Post Status
    options:
        draft: Draft
        published: Published
        archived: Archived
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**title** | title for the form field.
**placeholder** | text to display when the field is empty.
**default** | a default value to use for new records.
**comment** | places a descriptive comment below the field.
**options** | available options for the dropdown, as an array.
**optionsMethod** | take options from a method defined on the model or as a static method, eg `Class::method`.
**emptyOption** | text to display when allowing an empty option.
**showSearch** | allow the user to search options. Default: `true`.

Generally `options` are defined with key-value pair, where the value and label are independently specified.

```yaml
status_type:
    label: Blog Post Status
    type: dropdown
    options:
        draft: Draft
        published: Published
        archived: Archived
```

You may use the `default` property to set a default value, where the value is the key of the option.

```yaml
status_type:
    label: Blog Post Status
    type: dropdown
    default: published
```

To handle cases when there is no value set, you may specify an `emptyOption` value to include an empty option that can be reselected.

```yaml
status:
    label: Blog Post Status
    type: dropdown
    emptyOption: -- no status --
```

Alternatively you may use the `placeholder` option to use a "one-way" empty option that cannot be reselected.

```yaml
status:
    label: Blog Post Status
    type: dropdown
    placeholder: -- select a status --
```

By default the dropdown has a searching feature, allowing quick selection of a value. This can be disabled by setting the `showSearch` option to false.

```yaml
status:
    label: Blog Post Status
    type: dropdown
    showSearch: false
```

## Dynamic Options

The next approaches involve using the model class in your plugin or application codebase. If the `options` value is omitted, the framework expects a method with the name `get*FieldName*Options` to be defined in the model.

Using the example below, the model class is expected to have the `getStatusTypeOptions` method. The first argument of this method is the current value of this field and the second is the current data object for the entire form. This method should return an array of options in the format **key => label**.

```yaml
status_type:
    label: Blog Post Status
    type: dropdown
```

This is an example of the model class method that supplies the dropdown options. Notice that the method name matches the column name in _TitleCase_ format.

```php
public function getStatusTypeOptions($value, $formData)
{
    return ['all' => 'All', ...];
}
```

You may also define a catch-all method that works as a fallback in cases where the dedicated method name is not defined, which will be used for all dropdown field types for the model.

The first argument of this method is the field name, the second is the current value of the field, and the third is the current data object for the entire form. It should return an array of options in the format **key => label**.

```php
public function getDropdownOptions($fieldName, $value, $formData)
{
    if ($fieldName == 'status') {
        return ['all' => 'All', ...];
    }
    else {
        return ['' => '-- none --'];
    }
}
```

To use a custom method name, specify it explicitly in the `options` parameter and this will match exactly to the method name defined in the model.

In the next example the `listStatuses` method should be defined in the model class. This method receives all the same arguments as the `getDropdownOptions` method, and should return an array of options in the format **key => label**.

```yaml
status:
    label: Blog Post Status
    type: dropdown
    options: listStatuses
```

This is an example of the model class custom method that supplies the dropdown options.

```php
public function listStatuses($fieldName, $value, $formData)
{
    return ['published' => 'Published', ...];
}
```

To add a custom icon for every option rendered in the dropdown field, you may specify the options as a multidimensional array with the following format **key => [label-text, label-icon]**.

```php
public function listStatuses($fieldName, $value, $formData)
{
    return [
        'published' => ['Published', 'icon-check-circle'],
        'unpublished' => ['Unpublished', 'icon-minus-circle'],
        'draft' => ['Draft', 'icon-clock-o']
    ];
}
```

Displaying a custom color is also supported by specifying the options as an array with the format **key => [label-text, label-color]** where the color is a hex value beginning with a hash (`#`).

```php
public function listStatuses($fieldName, $value, $formData)
{
    return [
        'published' => ['Published', '#666666'],
        'unpublished' => ['Unpublished', '#ff9999'],
        'draft' => ['Draft', '#ff0000']
    ];
}
```

If you want to call a method on an external class, you may do it by calling a static method on any fully qualified object. Simply specify the `ClassName::method` syntax as a string in the `options` parameter.

```yaml
status:
    label: Blog Post Status
    type: dropdown
    options: MyAuthor\MyPlugin\Helpers\FormHelper::staticMethodOptions
```

This examples shows the static method defined on any helper class. The first argument is the Model object and the second argument is the form field definition.

```php
public static function staticMethodOptions($model, $formField)
{
    return ['published' => 'Published', ...];
}
```
