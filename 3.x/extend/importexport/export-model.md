# Defining an Export Model

For exporting data you should create a dedicated model which extends the `Backend\Models\ExportModel` class. Here is an example:

```php
class SubscriberExport extends \Backend\Models\ExportModel
{
    public function exportData($columns, $sessionKey = null)
    {
        $subscribers = Subscriber::all();

        $subscribers->each(function($subscriber) use ($columns) {
            $subscriber->addVisible($columns);
        });

        return $subscribers->toArray();
    }
}
```

The class must define a method called `exportData` used for returning the export data. The first parameter `$columns` is an array of column names to export. The second parameter `$sessionKey` will contain the session key used for the request.

## Custom Options

Both import and export forms support custom options that can be introduced using form fields, defined in the **form** option in the import or export configuration respectively. These values are then passed to the Import / Export model and are available during processing.

```yaml
import:
    # ...
    form: $/acme/campaign/models/subscriberimport/fields.yaml

export:
    # ...
    form: $/acme/campaign/models/subscriberexport/fields.yaml
```

The form fields specified will appear on the import/export page. Here is an example `fields.yaml` file contents:

```yaml
# ===================================
#  Form Field Definitions
# ===================================

fields:

    auto_create_lists:
        label: Automatically create lists
        type: checkbox
        default: true
```

The value of the form field above called **auto_create_lists** can be accessed using `$this->auto_create_lists` inside the `importData` method of the import model. If this were the export model, the value would be available inside the `exportData` method instead.

```php
class SubscriberImport extends \Backend\Models\ImportModel
{
    public function importData($results, $sessionKey = null)
    {
        if ($this->auto_create_lists) {
            // Do something
        }

        // ...
    }
}
```
