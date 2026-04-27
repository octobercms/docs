---
subtitle: Расширение Tailor пользовательскими контентными полями.
---
# Создание полей Tailor

Вы можете создавать собственные контентные поля, определив файл определения поля и зарегистрировав его в файле регистрации плагина.

Классы определений контентных полей находятся внутри директории **contentfields** плагина. Имя внутренней директории совпадает с именем класса виджета в нижнем регистре. Контентные поля могут предоставлять ресурсы и частичные представления. Пример структуры директории выглядит так.

::: dir
├── `contentfields`
|   ├── mycontentfield
|   |   ├── assets
|   |   └── partials
|   |       └── _column_content.php  _← Файл частичного представления_
|   └── MyContentField.php  _← Класс поля_
:::

### Определение класса

Команда `create:contentfield` генерирует класс контентного поля. Первый аргумент указывает имя автора и плагина. Второй аргумент указывает имя класса контентного поля.

```bash
php artisan create:contentfield Acme.Blog MyContentField
```

Класс контентного поля должен наследовать класс `Backend\Classes\FormWidgetBase`.
Зарегистрированное контентное поле может использоваться в [полях форм Tailor](../element/form-fields.md) и чертежах. Класс определяет, как поле должно взаимодействовать с остальной системой. Например, **plugins/acme/blog/contentfields/MyContentField.php** со следующим содержимым.

```php
namespace Acme\Blog\ContentFields;

use Tailor\Classes\ContentFieldBase;
use October\Contracts\Element\FormElement;
use October\Contracts\Element\ListElement;
use October\Contracts\Element\FilterElement;

class MyContentField extends ContentFieldBase
{
    public function defineConfig(array $config) {}

    public function defineFormField(FormElement $form, $context = null) {}

    public function defineListColumn(ListElement $list, $context = null) {}

    public function defineFilterScope(FilterElement $filter, $context = null) {}

    public function extendModelObject($model) {}

    public function extendDatabaseTable($table) {}
}
```

### Регистрация контентного поля

Плагины должны регистрировать контентные поля, переопределяя метод `registerContentFields` в [файле регистрации плагина](./extending.md). Метод возвращает массив, содержащий класс виджета в ключах и короткий код виджета в значении. Пример:

```php
public function registerContentFields()
{
    return [
        \Acme\Blog\ContentFields\MyContentField::class => 'mycontentfield'
    ];
}
```

Короткий код используется при ссылке на поле в [шаблонах чертежей](introduction.md) и должен быть уникальным значением для предотвращения конфликтов с другими полями форм.

## Обработка конфигурации

Предположим, мы хотим включить элемент конфигурации поля под названием `secondaryTitle`. Сначала он определяется как свойство класса, а затем заполняется с помощью переопределения `defineConfig`.

```php
class MyContentField extends ContentFieldBase
{
    public $secondaryTitle;

    public function defineConfig(array $config)
    {
        if (isset($config['secondaryTitle'])) {
            $this->secondaryTitle = $config['secondaryTitle'];
        }
    }
}
```

Это становится доступным:

```yaml
my_field:
    type: mycontentfield
    secondaryTitle: Custom value goes here
```

## Определение элемента панели управления

Контентное поле может определять, как оно отображается в панели управления в виде поля формы, столбца списка и области фильтрации. Результирующий объект в каждом случае является объектом конфигурации с поддержкой цепочки методов или массива через метод `useConfig`. Подробнее см. в [статье об определении контентных полей](../cms/tailor/content-fields.md).

### Поле формы

Метод `defineFormField` определяет, как контентное поле должно отображаться в форме. Каждое поле инициируется методом `addFormField`, который принимает имя поля и метку для отображения пользователю.

```php
public function defineFormField(FormElement $form, $context = null)
{
    $form->addFormField($this->fieldName, $this->label)->useConfig($this->config);
}
```

### Столбец списка

Метод `defineListColumn` определяет, как контентное поле должно отображаться в списке. Каждый столбец инициируется методом `defineListColumn`, который принимает имя поля и метку для отображения пользователю.

```php
public function defineListColumn(ListElement $list, $context = null)
{
    $list->defineColumn($this->fieldName, $this->label)->displayAs('switch');
}
```

### Область фильтрации

Метод `defineFilterScope` определяет, как контентное поле должно отображаться в фильтре. Каждая область инициируется методом `defineScope`, который принимает имя поля и метку для отображения пользователю.

```php
public function defineFilterScope(FilterElement $filter, $context = null)
{
    $filter->defineScope($this->fieldName, $this->label)->displayAs('switch');
}
```

## Расширение модели

Метод `extendModelObject` позволяет контентному полю расширять модель записи, например класс модели `Tailor\Models\EntryRecord`. Примером может быть преобразование поля в jsonable с помощью метода `addJsonable`.

```php
public function extendModelObject($model)
{
    $model->addJsonable($this->fieldName);
}
```

Другой подход — указать связь `belongsTo`.

```php
public function extendModelObject($model)
{
    $model->belongsTo[$this->fieldName] = MyOtherModel::class;
}
```

## Расширение таблицы базы данных

Метод `extendDatabaseTable` используется для указания столбцов базы данных, необходимых для этого поля. Он использует упрощённую версию [стандартной структуры миграции](../extend/database/structure.md).

```php
public function extendDatabaseTable($table)
{
    $table->mediumText($this->fieldName)->nullable();
}
```

## Полный пример использования

Ниже приведён полный пример создания контентного поля для плагина October Test. Он добавляет тип `mycontentfield`, доступный для всех чертежей, как показано в примере ниже.

```yaml
fields:
    mycontentfield:
        label: Custom Content Field
        type: mycontentfield
        firstColor: red
        secondColor: blue
```

Поле регистрируется в файле **plugins/october/test/Plugin.php** с помощью метода `registerContentFields`.

```php
public function registerContentFields()
{
    return [
        \October\Test\ContentFields\MyContentField::class => 'mycontentfield'
    ];
}
```

Класс поля создаётся в файле **plugins/october/test/contentfields/MyContentField.php** как PHP-класс. Он регистрируется как [тип поля partial](../element/form/ui-partial.md) и не включает столбец списка или область фильтрации для простоты. Вызов метода `addJsonable` гарантирует, что имя поля является [jsonable-свойством](../extend/system/models.md) и может храниться как массив. Столбец базы данных хранится как [тип схемы базы данных](../extend/database/structure.md) `mediumText` с модификатором `nullable`, допускающим пустые значения.

```php
namespace October\Test\ContentFields;

use Tailor\Classes\ContentFieldBase;
use October\Contracts\Element\FormElement;

class MyContentField extends ContentFieldBase
{
    public function defineFormField(FormElement $form, $context = null)
    {
        $form->addFormField($this->fieldName, $this->label)
            ->useConfig($this->config)
            ->displayAs('partial')
            ->path('$/october/test/contentfields/mycontentfield/partials/_field.php');
    }

    public function extendModelObject($model)
    {
        $model->addJsonable($this->fieldName);
    }

    public function extendDatabaseTable($table)
    {
        $table->mediumText($this->fieldName)->nullable();
    }
}
```

Файл **plugins/october/test/contentfields/mycontentfield/partials/_field.php** содержит содержимое частичного представления для рендеринга поля формы. Значения извлекаются и сохраняются как массив `[first_value => 'foo', second_value => 'bar']`.

```php
<div class="row">
    <div class="col">
        <input
            type="text"
            name="<?= $field->getName() ?>[first_value]"
            value="<?= e($field->value['first_value'] ?? '') ?>"
            class="form-control"
            style="color:<?= $field->firstColor ?: 'red' ?>"
        />
    </div>
    <div class="col">
        <input
            type="text"
            name="<?= $field->getName() ?>[second_value]"
            value="<?= e($field->value['second_value'] ?? '') ?>"
            class="form-control"
            style="color:<?= $field->secondColor ?: 'blue' ?>"
        />
    </div>
</div>
```

## Виджеты форм и контентные поля

Часто возникает вопрос о различиях между виджетом формы и контентным полем, и что лучше в каких ситуациях. [Виджеты форм](./forms/form-widgets.md) — это поля форм, используемые исключительно виджетом `Backend\Widgets\Form`, наряду с нативными [типами полей форм](../element/form-fields.md) (text, number, dropdown, partial и т.д.)

Контентные поля являются надмножеством полей форм, используемых исключительно Tailor, и идут дальше, включая также определение того, как это поле:

- отображается как [столбец списка](../element/list-columns.md)
- отображается как [область фильтрации](../element/filter-scopes.md)
- должно существовать в [таблице базы данных](./database/structure.md)
- должно применять [правила валидации](./services/validation.md)
- должно [расширять модель](./system/models.md) (jsonable/связь)

Если виджет формы определён без контентного поля, он всё равно может использоваться в Tailor по умолчанию и будет разрешён в тип контентного поля `Tailor\ContentFields\FallbackField`, который является базовым и регистрируется в базе данных как тип столбца TEXT.

Для надёжных решений лучше всего определять и виджет формы, и контентное поле. Это позволяет использовать поле [в плагинах](../extend/extending.md) и для контента в [чертежах Tailor](../cms/tailor/blueprints.md). По следующим ссылкам представлен пример поля валюты, которое можно использовать везде.

- [Виджет формы Currency](https://github.com/responsiv/currency-plugin/blob/master/formwidgets/Currency.php)
- [Контентное поле Currency](https://github.com/responsiv/currency-plugin/blob/master/contentfields/Currency.php)

Вы можете заметить, что внутри контентного поля определение YAML задано в PHP. Синтаксис YAML в PHP довольно прост: имя PHP-метода — это имя свойства YAML, а значение передаётся как первый аргумент, по умолчанию — `true`. Единственное основное отличие — свойство `type` определяется методом `displayAs`.

Любое имя метода может быть вызвано и является частью цепочки на PHP-объекте. См. следующую таблицу для примеров преобразования YAML в PHP.

YAML | PHP
---- | ----
`autoFocus: true` | `->autoFocus()`
`label: my field` | `->label('my field')`
`type: partial`   | `->displayAs('partial')`

::: tip
Вы также можете передать всю желаемую YAML-конфигурацию как массив с помощью `->useConfig([...])`.
:::

#### См. также

::: also
* [Контентные поля Tailor](../cms/tailor/content-fields.md)
:::
