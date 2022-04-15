# Building Tailor Fields

You can roll your own content fields by defining a field definition file and then registering it in your plugin registration file.

### Field Definition File

Content Field definition classes reside inside the **contentfields** directory of the plugin. The inner directory name matches the name of the widget class written in lowercase. Content Fields can supply assets and partials. An example directory structure looks like this.

::: dir
├── `contentfields`
|   ├── mycontentfield
|   |   ├── assets
|   |   └── partials
|   |       └── _column_content.htm _<== Partial File_
|   └── MyContentField.php _<== Field Class_
:::

The class defines how the field should interact with the rest of the system. For example, **plugins/acme/blog/contentfields/MyContentField.php** with the following contents.

```php
namespace Acme\Blog\ContentFields;

use Tailor\Classes\ContentFieldBase;
use October\Rain\Element\Form\FieldDefinition;
use October\Rain\Element\Lists\ColumnDefinition;

class MyContentField extends ContentFieldBase
{
    /**
     * defineConfig will process the field configuration.
     */
    public function defineConfig(array $config): void
    {
        // ...
    }

    /**
     * extendModelObject will extend the record model.
     */
    public function extendModelObject($model): void
    {
        // ...
    }

    /**
     * defineBackendListColumn will define how a field is displayed in a list.
     */
    public function defineBackendListColumn(ColumnDefinition $column): ColumnDefinition
    {
        return $column;
    }

    /**
     * defineBackendFormField will define how a field is displayed in a form.
     */
    public function defineBackendFormField(FieldDefinition $field): FieldDefinition
    {
        return $field;
    }
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

### Processing Config

Assuming we want to include a field config item called `secondaryTitle`, it is first defined as a property on the class and then filled using the `defineConfig` override.

```php
class MyContentField extends ContentFieldBase
{
    /**
     * @var string secondaryTitle
     */
    public $secondaryTitle;

    /**
     * defineConfig
     */
    public function defineConfig(array $config): void
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
