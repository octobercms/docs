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
|   |       └── _column_content.htm  _← Partial File_
|   └── MyContentField.php  _← Field Class_
:::

### Class Definition

The `create:contentfield` command generates a content field class. The first argument specifies the author and plugin name. The second argument specifies the content field class name.

```bash
php artisan create:contentfield Acme.Blog IconPicker
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
/**
 * registerContentFields
 */
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
    /**
     * @var string secondaryTitle for the field.
     */
    public $secondaryTitle;

    /**
     * defineConfig will process the field configuration.
     */
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

#### See Also

::: also
* [Tailor Content Fields](../cms/tailor/content-fields.md)
:::
