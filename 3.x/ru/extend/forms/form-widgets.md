---
subtitle: Виджет, специально созданный для использования в качестве поля формы.
---
# Виджеты форм

С помощью виджетов форм вы можете добавлять новые типы элементов управления в формы панели управления. Они предоставляют функции, общие для предоставления данных для моделей. Виджеты форм должны быть зарегистрированы в [файле регистрации плагина](../extending.md).

Классы виджетов форм находятся внутри директории **formwidgets** плагина. Имя внутренней директории совпадает с именем класса виджета в нижнем регистре. Виджеты могут предоставлять ресурсы и частичные представления. Пример структуры директории виджета формы выглядит так.

::: dir
├── `formwidgets`
|   ├── colorpicker
|   |   ├── partials
|   |   |   └── _colorpicker.php  _← Файл частичного представления_
|   |   └── assets
|   |       ├── js
|   |       |   └── colorpicker.js  _← JavaScript-файл_
|   |       └── css
|   |           └── colorpicker.css  _← Файл стилей_
|   └── ColorPicker.php  _← Класс виджета_
:::

### Определение класса

Команда `create:formwidget` генерирует виджет формы панели управления, представление и базовые файлы ресурсов. Первый аргумент указывает имя автора и плагина. Второй аргумент указывает имя класса виджета формы.

```bash
php artisan create:formwidget Acme.Blog ColorPicker
```

Классы виджетов форм должны наследовать класс `Backend\Classes\FormWidgetBase`. Зарегистрированный виджет может использоваться в файле [определения полей формы](../../element/form-fields.md) панели управления. Пример определения класса виджета формы.

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

### Свойства виджета формы

Виджеты форм могут иметь свойства, которые можно задать с помощью [конфигурации полей формы](../../element/form-fields.md). Просто определите настраиваемые свойства в классе, а затем вызовите метод `fillFromConfig` для их заполнения внутри определения метода `init`.

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

Значения свойств затем становятся доступными для установки из [определения полей формы](../../element/form-fields.md) при использовании виджета.

```yaml
born_at:
    label: Date of Birth
    type: datepicker
    mode: date
    minDate: 1984-04-12
    maxDate: 2014-04-23
```

### Регистрация виджета формы

Плагины должны регистрировать виджеты форм, переопределяя метод `registerFormWidgets` в [файле регистрации плагина](../extending.md). Метод возвращает массив, содержащий класс виджета в ключах и короткий код виджета в значении. Пример:

```php
public function registerFormWidgets()
{
    return [
        \Backend\FormWidgets\ColorPicker::class => 'colorpicker',
        \Backend\FormWidgets\DatePicker::class => 'datepicker'
    ];
}
```

Короткий код является необязательным и может использоваться при ссылке на виджет в [определениях полей формы](./form-controller.md). Он должен быть уникальным значением для предотвращения конфликтов с другими полями формы.

### Загрузка данных формы

Основная цель виджета формы — взаимодействие с вашей моделью, что означает в большинстве случаев загрузку и сохранение значения через базу данных. При рендеринге виджет формы запрашивает своё сохранённое значение с помощью метода `getLoadValue`. Методы `getId` и `getFieldName` вернут уникальный идентификатор и имя для HTML-элемента, используемого в форме. Эти значения часто передаются в частичное представление виджета при рендеринге.

```php
public function render()
{
    $this->vars['id'] = $this->getId();
    $this->vars['name'] = $this->getFieldName();
    $this->vars['value'] = $this->getLoadValue();

    return $this->makePartial('myformwidget');
}
```

На базовом уровне виджет формы может отправить введённое пользователем значение обратно с помощью элемента input. Из приведённого выше примера, внутри частичного представления **myformwidget** элемент может быть отрендерен с использованием подготовленных переменных.

```php
<input id="<?= $id ?>" name="<?= $name ?>" value="<?= e($value) ?>" />
```

### Сохранение данных формы

Когда приходит время принять пользовательский ввод и сохранить его в базе данных, виджет формы внутренне вызывает `getSaveValue` для запроса значения. Для изменения этого поведения просто переопределите метод в вашем классе виджета формы.

```php
public function getSaveValue($value)
{
    return $value;
}
```

В некоторых случаях вы намеренно не хотите, чтобы какое-либо значение сохранялось, например, виджет формы, отображающий информацию без сохранения. Верните специальную константу `FormField::NO_SAVE_DATA` из класса `Backend\Classes\FormField`, чтобы значение было проигнорировано.

```php
public function getSaveValue($value)
{
    return \Backend\Classes\FormField::NO_SAVE_DATA;
}
```
