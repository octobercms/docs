# Content Fields

Content Fields are the cornerstone of the Tailor module and define how a field should be configured and displayed.

## Definition Custom Content Fields

You can roll your own content fields by defining a field definition file and then registering it in your plugin registration file.

### Field Definition File

The first step is to create a field definition file inside your plugin, for example, **plugins/acme/blog/contentfields/MyContentField.php** with the following contents.

```php
namespace Acme\Blog\ContentFields;

use Tailor\Classes\Field;
use October\Rain\Element\Form\FieldDefinition;
use October\Rain\Element\Lists\ColumnDefinition;

class MyContentField extends Field
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
