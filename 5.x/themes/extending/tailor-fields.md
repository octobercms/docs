---
previousPath: extend/tailor-fields.md
subtitle: Build your own content field type for Tailor blueprints, defining its form field, list column, filter and database column.
---
# Custom Tailor Fields

A content field is a field type you can use in any Tailor blueprint. Build one when the [built-in field types](../../handbook/form-fields.md) do not fit your content, defining the class in a plugin and registering it in the plugin registration file.

```bash
php artisan create:contentfield Acme.Blog MyContentField
```

Once registered, the field is used in a blueprint by its short code.

```yaml
fields:
    my_field:
        label: My Field
        type: mycontentfield
```

## Creating a Content Field

The `create:contentfield` command generates a content field class. The first argument is the author and plugin name, and the second argument is the content field class name.

Content field classes live in the **contentfields** directory of the plugin. A content field can supply assets and partials in a directory named after the class in lowercase.

::: dir
├── `contentfields`
|   ├── mycontentfield
|   |   ├── assets
|   |   └── partials
|   |       └── _column_content.php  _← Partial File_
|   └── MyContentField.php  _← Field Class_
:::

The class must extend the `Tailor\Classes\ContentFieldBase` class and defines how the field interacts with the rest of the system. For example, the **plugins/acme/blog/contentfields/MyContentField.php** file contains the following.

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

## Registering the Content Field

Register content fields by overriding the `registerContentFields` method in the [plugin registration file](../../backend/plugins/introduction.md#registration-file). The method returns an array with the class name as the key and the field short code as the value.

```php
public function registerContentFields()
{
    return [
        \Acme\Blog\ContentFields\MyContentField::class => 'mycontentfield'
    ];
}
```

The short code is the `type` value used in [blueprints](../tailor/blueprints.md). Choose a unique value to avoid conflicts with other form fields.

## Reading Custom Field Options

To accept your own option in the blueprint, such as `secondaryTitle`, define it as a property on the class and fill it in the `defineConfig` method.

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

The option is then available in the blueprint.

```yaml
my_field:
    type: mycontentfield
    secondaryTitle: Custom value goes here
```

## Defining the Form Field, List Column and Filter

A content field defines how it appears in the admin panel as a form field, a list column and a filter scope. Each method receives a fluent configuration object that supports a method chain, or an array of configuration through the `useConfig` method. See [Defining Fields](../tailor/fields.md) for how fields are configured in blueprints.

### Form Field

The `defineFormField` method defines how the field appears in a form. Start each field with the `addFormField` method, passing the field name and the label to display.

```php
public function defineFormField(FormElement $form, $context = null)
{
    $form->addFormField($this->fieldName, $this->label)->useConfig($this->config);
}
```

### List Column

The `defineListColumn` method defines how the field appears in a list. Start each column with the `defineColumn` method, passing the field name and the label to display.

```php
public function defineListColumn(ListElement $list, $context = null)
{
    $list->defineColumn($this->fieldName, $this->label)->displayAs('switch');
}
```

### Filter Scope

The `defineFilterScope` method defines how the field appears in a filter. Start each scope with the `defineScope` method, passing the field name and the label to display.

```php
public function defineFilterScope(FilterElement $filter, $context = null)
{
    $filter->defineScope($this->fieldName, $this->label)->displayAs('switch');
}
```

### Converting YAML Options to PHP

These methods define in PHP what you would normally write in YAML. Each YAML property becomes a method of the same name, and the value is passed as the first argument, defaulting to `true`. The one exception is the `type` property, which is set with the `displayAs` method. You can chain any method name on the object.

YAML | PHP
---- | ----
`autoFocus: true` | `->autoFocus()`
`label: my field` | `->label('my field')`
`type: partial`   | `->displayAs('partial')`

::: tip
You can also pass all the YAML configuration as an array with `->useConfig([...])`.
:::

## Extending the Model

The `extendModelObject` method extends the record model, such as the `Tailor\Models\EntryRecord` class. For example, the `addJsonable` method makes the field [jsonable](../../backend/data/models.md) so it can store an array.

```php
public function extendModelObject($model)
{
    $model->addJsonable($this->fieldName);
}
```

You can also define a relationship, such as `belongsTo`.

```php
public function extendModelObject($model)
{
    $model->belongsTo[$this->fieldName] = MyOtherModel::class;
}
```

## Adding a Database Column

The `extendDatabaseTable` method defines the database columns the field needs. It uses a simplified version of the [standard migration structure](../../backend/data/migrations.md).

```php
public function extendDatabaseTable($table)
{
    $table->mediumText($this->fieldName)->nullable();
}
```

Run `php artisan tailor:migrate` after adding the field to a blueprint so the column is created.

## Complete Example

The following example creates a content field for the October Test plugin. It adds a `mycontentfield` type that is available to all blueprints.

```yaml
fields:
    mycontentfield:
        label: Custom Content Field
        type: mycontentfield
        firstColor: red
        secondColor: blue
```

The **plugins/october/test/Plugin.php** file registers the field using the `registerContentFields` method.

```php
public function registerContentFields()
{
    return [
        \October\Test\ContentFields\MyContentField::class => 'mycontentfield'
    ];
}
```

The **plugins/october/test/contentfields/MyContentField.php** file defines the field class. It renders the field as a [partial field type](../../handbook/form-fields/partial.md) and leaves out the list column and filter scope for simplicity. The `addJsonable` method call makes the field a [jsonable attribute](../../backend/data/models.md) so it can be stored as an array. The database column uses the `mediumText` [schema type](../../backend/data/migrations.md) with the `nullable` modifier, allowing empty values.

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
            ->path('$/october/test/contentfields/mycontentfield/partials/_field_mycontentfield.php');
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

The **plugins/october/test/contentfields/mycontentfield/partials/_field_mycontentfield.php** file renders the form field. The values are saved as an array, for example `[first_value => 'foo', second_value => 'bar']`.

```php
<div class="row">
    <div class="col">
        <input
            type="text"
            name="<?= $field->getName() ?>[first_value]"
            value="<?= e($field->value['first_value'] ?? '') ?>"
            class="form-control"
            style="color: <?= e($field->firstColor ?: 'red') ?>"
        />
    </div>
    <div class="col">
        <input
            type="text"
            name="<?= $field->getName() ?>[second_value]"
            value="<?= e($field->value['second_value'] ?? '') ?>"
            class="form-control"
            style="color: <?= e($field->secondColor ?: 'blue') ?>"
        />
    </div>
</div>
```

## Choosing Between a Form Widget and a Content Field

[Form widgets](../../backend/forms/form-widgets.md) are form fields used only by the `Backend\Widgets\Form` widget, alongside the native [form field types](../../handbook/form-fields.md) such as text, number, dropdown and partial.

Content fields are a superset of form fields used only by Tailor. They also define how the field:

- renders as a [list column](../../handbook/list-columns.md)
- renders as a [filter scope](../../handbook/filter-scopes.md)
- is stored in [the database table](../../backend/data/migrations.md)
- applies [validation rules](../../backend/services/validation.md)
- [extends the model](../../backend/data/models.md), such as making it jsonable or adding a relationship

A form widget without a content field still works in Tailor. It resolves to the `Tailor\ContentFields\FallbackField` content field type, which is basic and stores its value in a TEXT database column.

For the most complete solution, define both a form widget and a content field. The field can then be [used in plugins](../../backend/plugins/extending.md) and in [Tailor blueprints](../../handbook/blueprint-types.md). The following currency field is an example that works everywhere.

- [Currency Form Widget](https://github.com/responsiv/currency-plugin/blob/master/formwidgets/Currency.php)
- [Currency Content Field](https://github.com/responsiv/currency-plugin/blob/master/contentfields/Currency.php)

#### See Also

::: also
* [Defining Fields](../tailor/fields.md)
* [Content Fields](../../handbook/tailor-fields.md)
* [Form Widgets](../../backend/forms/form-widgets.md)
:::
