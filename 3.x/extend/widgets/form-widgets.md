# Form Widgets

<a id="oc-form-widgets"></a>

With form widgets you can add new control types to the backend [forms](../backend/forms.md). They provide features that are common to supplying data for models. Form widgets must be registered in the [Plugin registration file](../plugin/registration.md#oc-registration-methods).

Form Widget classes reside inside the **formwidgets** directory of the plugin directory. The inner directory name matches the name of the widget class written in lowercase. Widgets can supply assets and partials. An example form widget directory structure looks like this:

::: dir
├── `formwidgets`
|   ├── colorpicker
|   |   ├── partials
|   |   |   └── _colorpicker.htm _<== Partial File_
|   |   └── assets
|   |       ├── js
|   |       |   └── colorpicker.js _<== JavaScript File_
|   |       └── css
|   |           └── colorpicker.css _<== StyleSheet File_
|   └── ColorPicker.php _<== Widget Class_
:::

### Class Definition

The form widget classes must extend the `Backend\Classes\FormWidgetBase` class. A registered widget can be used in the backend [form field definition](../backend/forms.md#oc-defining-form-fields) file. Example form widget class definition:

```php
namespace Backend\FormWidgets;

use Backend\Classes\FormWidgetBase;

class ColorPicker extends FormWidgetBase
{
    /**
     * @var string A unique alias to identify this widget.
     */
    protected $defaultAlias = 'colorpicker';

    public function render() {}
}
```

### Form Widget Properties

Form widgets may have properties that can be set using the [form field configuration](../backend/forms.md#oc-defining-form-fields). Simply define the configurable properties on the class and then call the `fillFromConfig` method to populate them inside the `init` method definition.

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

The property values then become available to set from the [form field definition](../backend/forms.md#oc-defining-form-fields) when using the widget.

```yaml
born_at:
    label: Date of Birth
    type: datepicker
    mode: date
    minDate: 1984-04-12
    maxDate: 2014-04-23
```

### Form Widget Registration

Plugins should register form widgets by overriding the `registerFormWidgets` method inside the [Plugin registration class](../plugin/registration.md#oc-registration-file). The method returns an array containing the widget class in the keys and widget short code as the value. Example:

```php
public function registerFormWidgets()
{
    return [
        \Backend\FormWidgets\ColorPicker::class => 'colorpicker',
        \Backend\FormWidgets\DatePicker::class => 'datepicker'
    ];
}
```

The short code is optional and can be used when referencing the widget in the [Form field definitions](forms.md#field-widget), it should be a unique value to avoid conflicts with other form fields.

### Loading Form Data

The main purpose of the form widget is to interact with your model, which means in most cases loading and saving the value via the database. When a form widget renders, it will request its stored value using the `getLoadValue` method. The `getId` and `getFieldName` methods will return a unique identifier and name for a HTML element used in the form. These values are often passed to the widget partial at render time.

```php
public function render()
{
    $this->vars['id'] = $this->getId();
    $this->vars['name'] = $this->getFieldName();
    $this->vars['value'] = $this->getLoadValue();

    return $this->makePartial('myformwidget');
}
```

At a basic level the form widget can send the user input value back using an input element. From the above example, inside the **myformwidget** partial the element can be rendered using the prepared variables.

```php
<input id="<?= $id ?>" name="<?= $name ?>" value="<?= e($value) ?>" />
```

### Saving Form Data

When the time comes to take the user input and store it in the database, the form widget will call the `getSaveValue` internally to request the value. To modify this behavior simply override the method in your form widget class.

```php
public function getSaveValue($value)
{
    return $value;
}
```

In some cases you intentionally don't want any value to be given, for example, a form widget that displays information without saving anything. Return the special constant called `FormField::NO_SAVE_DATA` derived from the `Backend\Classes\FormField` class to have the value ignored.

```php
public function getSaveValue($value)
{
    return \Backend\Classes\FormField::NO_SAVE_DATA;
}
```
