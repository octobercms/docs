---
previousPath: extend/forms/form-widgets.md
subtitle: Build your own field type for backend forms with a form widget.
---
# Custom Form Widgets

A form widget adds a new control type to backend forms, such as a color picker or a date picker. Build one when the built-in [form fields](../../handbook/form-fields.md) don't provide the input you need.

```bash
php artisan create:formwidget Acme.Blog ColorPicker
```

The `create:formwidget` command generates a form widget class, a view and basic asset files. The first argument is the author and plugin name, and the second is the form widget class name.

## Creating a Form Widget

Form widget classes live in the **formwidgets** directory of a plugin. The inner directory is named after the widget class in lowercase, and holds the widget's partials and assets.

::: dir
├── `formwidgets`
|   ├── colorpicker
|   |   ├── partials
|   |   |   └── _colorpicker.php  _← Partial File_
|   |   └── assets
|   |       ├── js
|   |       |   └── colorpicker.js  _← JavaScript File_
|   |       └── css
|   |           └── colorpicker.css  _← StyleSheet File_
|   └── ColorPicker.php  _← Widget Class_
:::

Form widget classes must extend the `Backend\Classes\FormWidgetBase` class. Every widget has a `render` method that returns its markup.

```php
namespace Backend\FormWidgets;

use Backend\Classes\FormWidgetBase;

class ColorPicker extends FormWidgetBase
{
    /**
     * @var string defaultAlias to identify this widget.
     */
    protected $defaultAlias = 'colorpicker';

    public function render() {}
}
```

To include the widget's CSS and JavaScript files, override the `loadAssets` method and call `addCss` and `addJs`, as the generated class does.

## Registering a Form Widget

Plugins should register their form widgets by overriding the `registerFormWidgets` method in the [plugin registration file](../plugins/extending.md). The method returns an array with the widget class as the key and the widget short code as the value.

```php
public function registerFormWidgets()
{
    return [
        \Backend\FormWidgets\ColorPicker::class => 'colorpicker',
        \Backend\FormWidgets\DatePicker::class => 'datepicker'
    ];
}
```

The short code is optional. Use it as the field `type` in the [form field definitions](../../handbook/form-fields.md), and make it unique to avoid conflicts with other form fields.

```yaml
color:
    label: Color
    type: colorpicker
```

## Adding Widget Properties

Form widgets may have properties that are set in the [form field configuration](../../handbook/form-fields.md). Define the configurable properties on the class, then call the `fillFromConfig` method in the `init` method to populate them.

```php
class DatePicker extends FormWidgetBase
{
    //
    // Configurable properties
    //

    /**
     * @var string mode for display: datetime, date, time.
     */
    public $mode = 'datetime';

    /**
     * @var string minDate is the minimum/earliest date that can be selected.
     * eg: 2000-01-01
     */
    public $minDate = null;

    /**
     * @var string maxDate is the maximum/latest date that can be selected.
     * eg: 2020-12-31
     */
    public $maxDate = null;

    //
    // Object properties
    //

    /**
     * {@inheritDoc}
     */
    protected $defaultAlias = 'datepicker';

    /**
     * {@inheritDoc}
     */
    public function init()
    {
        $this->fillFromConfig([
            'mode',
            'minDate',
            'maxDate',
        ]);
    }

    // ...
}
```

The property values can then be set in the [form field definition](../../handbook/form-fields.md) that uses the widget.

```yaml
born_at:
    label: Date of Birth
    type: datepicker
    mode: date
    minDate: 1984-04-12
    maxDate: 2014-04-23
```

## Loading Form Data

A form widget's main job is to load and save a value on your model. When the widget renders, it requests its stored value with the `getLoadValue` method. The `getId` and `getFieldName` methods return a unique identifier and a name for the HTML element used in the form. Pass these values to the widget partial at render time.

```php
public function render()
{
    $this->vars['id'] = $this->getId();
    $this->vars['name'] = $this->getFieldName();
    $this->vars['value'] = $this->getLoadValue();

    return $this->makePartial('myformwidget');
}
```

The widget can send the user's input back with an input element. In the **myformwidget** partial, render the element using the prepared variables.

```php
<input id="<?= $id ?>" name="<?= $name ?>" value="<?= e($value) ?>" />
```

## Saving Form Data

When the form saves, the widget's `getSaveValue` method is called to get the value to store. Override the method in your form widget class to change the value.

```php
public function getSaveValue($value)
{
    return $value;
}
```

Some widgets should not save anything, for example a widget that only displays information. Return the `FormField::NO_SAVE_DATA` constant from the `Backend\Classes\FormField` class to have the value ignored.

```php
public function getSaveValue($value)
{
    return \Backend\Classes\FormField::NO_SAVE_DATA;
}
```

#### See Also

::: also
* [Form Fields](../../handbook/form-fields.md)
* [Custom Field Types](../../handbook/form-fields.md#custom-field-types)
* [Widgets](../panel/widgets.md)
* [Custom Filter Widgets](../lists/filter-widgets.md)
:::
