---
subtitle: Extending Tailor with custom content fields.
---
# Building Tailor Fields

You can roll your own content fields by defining a field definition file and then registering it in your plugin registration file.

Content Field definition classes reside inside the **contentfields** directory of the plugin. The inner directory name matches the name of the widget class written in lowercase. Content Fields can supply assets and partials. An example directory structure looks like this.

::: dir
├── `contentfields`
|   ├── mycontentfield
|   |   ├── assets
|   |   └── partials
|   |       └── _column_content.php  _← Partial File_
|   └── MyContentField.php  _← Field Class_
:::

### Class Definition

The `create:contentfield` command generates a content field class. The first argument specifies the author and plugin name. The second argument specifies the content field class name.

```bash
php artisan create:contentfield Acme.Blog MyContentField
```

The content field class must extend the `Backend\Classes\FormWidgetBase` class.
A registered content field can be used in [Tailor form fields](../element/form-fields.md) and blueprints.  The class defines how the field should interact with the rest of the system. For example, **plugins/acme/blog/contentfields/MyContentField.php** with the following contents.

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

### Content Field Registration

Plugins should register content fields by overriding the `registerContentFields` method inside the [plugin registration file](./extending.md). The method returns an array containing the widget class in the keys and widget short code as the value. Example:

```php
public function registerContentFields()
{
    return [
        \Acme\Blog\ContentFields\MyContentField::class => 'mycontentfield'
    ];
}
```

The short code is used when referencing the field in the [blueprint templates](introduction.md), it should be a unique value to avoid conflicts with other form fields.

## Processing Config

Assuming we want to include a field config item called `secondaryTitle`, it is first defined as a property on the class and then filled using the `defineConfig` override.

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

This then becomes available:

```yaml
my_field:
    type: mycontentfield
    secondaryTitle: Custom value goes here
```

## Defining the Backend Element

The content field can define how it appears in the backend panel as a form field, list column and filter scope. The resulting object in each case is fluent configuration object that supports a method chain or an array via the `useConfig` method. See the [defining content fields article](../cms/tailor/content-fields.md) for more information.

### Form Field

The `defineFormField` method defines how a content field should appear in a form. Each field is initiated by the `addFormField` method that takes the field name and label to display to the user.

```php
public function defineFormField(FormElement $form, $context = null)
{
    $form->addFormField($this->fieldName, $this->label)->useConfig($this->config);
}
```

### List Column

The `defineListColumn` method defines how a content field should appear in a list. Each column is initiated by the `defineListColumn` method that takes the field name and label to display to the user.

```php
public function defineListColumn(ListElement $list, $context = null)
{
    $list->defineColumn($this->fieldName, $this->label)->displayAs('switch');
}
```

### Filter Scope

The `defineFilterScope` method defines how a content field should appear in a filter. Each scope is initiated by the `defineScope` method that takes the field name and label to display to the user.

```php
public function defineFilterScope(FilterElement $filter, $context = null)
{
    $filter->defineScope($this->fieldName, $this->label)->displayAs('switch');
}
```

## Extending the Model

The `extendModelObject` method allows the content field to extend the record model, such as a `Tailor\Models\EntryRecord` model class. An example might be making the field jsonable using the `addJsonable` method.

```php
public function extendModelObject($model)
{
    $model->addJsonable($this->fieldName);
}
```

Another approach could be to specify a `belongsTo` relationship.

```php
public function extendModelObject($model)
{
    $model->belongsTo[$this->fieldName] = MyOtherModel::class;
}
```

## Extending the Database Table

The `extendDatabaseTable` is used to specify what database columns are needed for this field. It uses a simplified version of the [standard migration structure](../extend/database/structure.md).

```php
public function extendDatabaseTable($table)
{
    $table->mediumText($this->fieldName)->nullable();
}
```

## Complete Usage Example

Below is a complete example of creating a content field for the October Test plugin. It adds a `mycontentfield` type that is available to all blueprints, as shown in the example below.

```yaml
fields:
    mycontentfield:
        label: Custom Content Field
        type: mycontentfield
        firstColor: red
        secondColor: blue
```

The field is registered in the file **plugins/october/test/Plugin.php** using the `registerContentFields` method.

```php
public function registerContentFields()
{
    return [
        \October\Test\ContentFields\MyContentField::class => 'mycontentfield'
    ];
}
```

The field class is created in the file **plugins/october/test/contentfields/MyContentField.php** as a PHP class. It registers itself as a [partial field type](../element/form/ui-partial.md) does not include a list column or a filter scope for simplicity. The `addJsonable` method call ensures that the field name is a [jsonable property](../extend/system/models.md) so it can be stored as an array. The database column is stored as a `mediumText` [database schema type](../extend/database/structure.md) and with a `nullable` modifier, allowing empty values.

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

The file **plugins/october/test/contentfields/mycontentfield/partials/_field.php** contains the partial contents to render the form field. The values are retrieved and saved as an array `[first_value => 'foo', second_value => 'bar']`.

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

## Form Widgets vs. Content Fields

A common question comes up about the differences between a form widget and a content field, and which is better in which situations? [Form Widgets](./forms/form-widgets.md) are form fields used by the `Backend\Widgets\Form` widget exclusively, along with native [form field types](../element/form-fields.md) (text, number, dropdown, partial, etc.)

Content fields are a superset of form fields used exclusively by Tailor and go further, by also including how that field:

- renders as a [list column](../element/list-columns.md)
- renders as a [filter scope](../element/filter-scopes.md)
- should exist in [the database table](./database/structure.md)
- should apply [validation rules](./services/validation.md)
- should [extend the model](./system/models.md) (jsonable/relationship)

If a form widget has been defined without a content field, it can still be used in Tailor by default and will resolve to the `Tailor\ContentFields\FallbackField` content field type, which is basic and will register in the database as a TEXT column type.

For robust solutions, defining both a form widget and a content field is best. This allows the field to be [used in plugins](../extend/extending.md) and for content in [tailor blueprints](../cms/tailor/blueprints.md). The following links to an example of a currency field that can be used everywhere.

- [Currency Form Widget](https://github.com/responsiv/currency-plugin/blob/master/formwidgets/Currency.php)
- [Currency Content Field](https://github.com/responsiv/currency-plugin/blob/master/contentfields/Currency.php)

You may notice inside a content field that the YAML definition is defined within PHP. The YAML syntax to PHP syntax is rather simple, where the PHP method name is the YAML property name and the value is passed as the first argument--defaulting to `true`. The only main difference is the `type` property is defined by the `displayAs` method.

Any method name can be called and is chained on the PHP object. See the following table for some YAML to PHP conversion examples.

YAML | PHP
---- | ----
`autoFocus: true` | `->autoFocus()`
`label: my field` | `->label('my field')`
`type: partial`   | `->displayAs('partial')`

::: tip
You may also pass all the desired YAML configuration as an array with `->useConfig([...])`.
:::

#### See Also

::: also
* [Tailor Content Fields](../cms/tailor/content-fields.md)
:::
