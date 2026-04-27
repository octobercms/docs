---
subtitle: 专门用于表单字段的小部件。
---
# 表单小部件

通过表单小部件，您可以向后台表单添加新的控件类型。它们提供了为模型提供数据的常见功能。表单小部件必须在[插件注册文件](../extending.md)中注册。

表单小部件类位于插件的 **formwidgets** 目录中。内部目录名称与小写的小部件类名匹配。小部件可以提供资源文件和局部视图。表单小部件目录结构示例如下。

::: dir
├── `formwidgets`
|   ├── colorpicker
|   |   ├── partials
|   |   |   └── _colorpicker.php  _← 局部视图文件_
|   |   └── assets
|   |       ├── js
|   |       |   └── colorpicker.js  _← JavaScript 文件_
|   |       └── css
|   |           └── colorpicker.css  _← 样式表文件_
|   └── ColorPicker.php  _← 小部件类_
:::

### 类定义

`create:formwidget` 命令生成后台表单小部件、视图和基本资源文件。第一个参数指定作者和插件名称。第二个参数指定表单小部件类名。

```bash
php artisan create:formwidget Acme.Blog ColorPicker
```

表单小部件类必须继承 `Backend\Classes\FormWidgetBase` 类。注册后的小部件可以在后台[表单字段定义](../../element/form-fields.md)文件中使用。表单小部件类定义示例。

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

### 表单小部件属性

表单小部件可以具有使用[表单字段配置](../../element/form-fields.md)设置的属性。只需在类上定义可配置属性，然后在 `init` 方法定义中调用 `fillFromConfig` 方法来填充它们。

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

使用小部件时，属性值可以从[表单字段定义](../../element/form-fields.md)中设置。

```yaml
born_at:
    label: Date of Birth
    type: datepicker
    mode: date
    minDate: 1984-04-12
    maxDate: 2014-04-23
```

### 表单小部件注册

插件应通过在[插件注册文件](../extending.md)中覆盖 `registerFormWidgets` 方法来注册表单小部件。该方法返回一个数组，键为小部件类，值为小部件短代码。示例：

```php
public function registerFormWidgets()
{
    return [
        \Backend\FormWidgets\ColorPicker::class => 'colorpicker',
        \Backend\FormWidgets\DatePicker::class => 'datepicker'
    ];
}
```

短代码是可选的，可在[表单字段定义](./form-controller.md)中引用小部件时使用，它应该是唯一值以避免与其他表单字段冲突。

### 加载表单数据

表单小部件的主要目的是与模型交互，这意味着在大多数情况下通过数据库加载和保存值。当表单小部件渲染时，它将使用 `getLoadValue` 方法请求其存储的值。`getId` 和 `getFieldName` 方法将返回表单中使用的 HTML 元素的唯一标识符和名称。这些值通常在渲染时传递给小部件局部视图。

```php
public function render()
{
    $this->vars['id'] = $this->getId();
    $this->vars['name'] = $this->getFieldName();
    $this->vars['value'] = $this->getLoadValue();

    return $this->makePartial('myformwidget');
}
```

在基本级别上，表单小部件可以使用 input 元素将用户输入值发送回去。从上面的示例中，在 **myformwidget** 局部视图中，可以使用准备好的变量渲染元素。

```php
<input id="<?= $id ?>" name="<?= $name ?>" value="<?= e($value) ?>" />
```

### 保存表单数据

当需要获取用户输入并将其存储到数据库时，表单小部件将在内部调用 `getSaveValue` 来请求值。要修改此行为，只需在表单小部件类中覆盖该方法即可。

```php
public function getSaveValue($value)
{
    return $value;
}
```

在某些情况下，您故意不希望给出任何值，例如，仅显示信息而不保存任何内容的表单小部件。返回从 `Backend\Classes\FormField` 类派生的特殊常量 `FormField::NO_SAVE_DATA` 可使该值被忽略。

```php
public function getSaveValue($value)
{
    return \Backend\Classes\FormField::NO_SAVE_DATA;
}
```
