---
subtitle: Learn how to customize the import and export process.
---
# Import Export Model

## Import Model

For importing data you should create a dedicated model for this process which extends the `Backend\Models\ImportModel` class. Here is an example class definition:

```php
class SubscriberImport extends \Backend\Models\ImportModel
{
    /**
     * @var array rules to be applied to the data.
     */
    public $rules = [];

    public function importData($results, $sessionKey = null)
    {
        foreach ($results as $row => $data) {

            try {
                $subscriber = new Subscriber;
                $subscriber->fill($data);
                $subscriber->save();

                $this->logCreated();
            }
            catch (Exception $ex) {
                $this->logError($row, $ex->getMessage());
            }

        }
    }
}
```

The class must define a method called `importData` used for processing the imported data. The first parameter `$results` will contain an array containing the data to import. The second parameter `$sessionKey` will contain the session key used for the request.

Method | Description
------------- | -------------
`logUpdated()` | Called when a record is updated.
`logCreated()` | Called when a record is created.
`logError(rowIndex, message)` | Called when there is a problem with importing the record.
`logWarning(rowIndex, message)` | Used to provide a soft warning, like modifying a value.
`logSkipped(rowIndex, message)` | Used when the entire row of data was not imported (skipped).

## Export Model

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
