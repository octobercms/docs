---
previousPath: extend/importexport/importexport-model.md
subtitle: Write the model classes that process imported rows and supply the records to export.
---
# Import & Export Models

Import and export models hold the logic that runs when records are imported or exported. They extend the `Backend\Models\ImportModel` and `Backend\Models\ExportModel` classes respectively. They are designed to be used with the [Import & Export Controller](./import-export-controller.md), but you can also use them directly in PHP.

## Creating an Import Model

To import data, create a dedicated model that extends the `Backend\Models\ImportModel` class.

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

The class must define an `importData` method that processes the imported data. The first parameter, `$results`, is an array containing the data to import. The second parameter, `$sessionKey`, is the session key used for the request.

### Logging Import Results

Call the following methods from `importData` to record what happened to each row. The results are shown to the user when the import finishes.

Method | Description
------------- | -------------
`logUpdated()` | Call when a record is updated.
`logCreated()` | Call when a record is created.
`logError(rowIndex, message)` | Call when there is a problem importing the record.
`logWarning(rowIndex, message)` | Use to provide a soft warning, like modifying a value.
`logSkipped(rowIndex, message)` | Use when the entire row of data was not imported (skipped).

### Importing with PHP

To process an import manually from a local file on the disk, use the `importFile` method.

```php
$importModel = new MyImportClass;

$importModel->file_format = 'json';

$importModel->importFile('/path/to/import/file.json');
```

If the file comes from an upload, use the `Input` facade to get its local path.

```php
$importModel->importFile(
    Input::file('file')->getRealPath()
);
```

## Creating an Export Model

To export data, create a dedicated model that extends the `Backend\Models\ExportModel` class.

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

The class must define an `exportData` method that returns the export data. The first parameter, `$columns`, is an array of the column names to export. The second parameter, `$sessionKey`, is the session key used for the request.

### Exporting with PHP

To process an export manually and return a download response, use the `exportDownload` method.

```php
$exportColumns = ['id', 'title'];

$exportModel = new MyExportClass;

$exportModel->file_format = 'json';

return $exportModel->exportDownload('myexportfile.json', ['columns' => $exportColumns]);
```

## Adding Import and Export Options

Both the import and export pages support custom options, defined as form fields in the **form** option of the import or export configuration. The values are passed to the import or export model and are available during processing.

```yaml
# config_import_export.yaml
import:
    # ...
    form: $/acme/campaign/models/subscriberimport/fields.yaml

export:
    # ...
    form: $/acme/campaign/models/subscriberexport/fields.yaml
```

The form fields appear on the import or export page. Here is an example **fields.yaml** file.

```yaml
# fields.yaml
fields:

    auto_create_lists:
        label: Automatically create lists
        type: checkbox
        default: true
```

The value of the **auto_create_lists** field is available as `$this->auto_create_lists` inside the `importData` method of the import model. In an export model, the value is available inside the `exportData` method instead.

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

## Importing and Exporting File Attachments

Models with file attachment relations (`attachOne` and `attachMany`) can include file references in the import and export data. When exporting, file attachments are exported as relative file paths. When importing, these paths are resolved to local files and attached to the record.

### Exporting File Attachments

When the exported records have file attachments, the export produces a **ZIP archive** instead of a plain JSON or CSV file. The archive contains the data file (`data.json` or `data.csv`) and a `files/` directory with the attachment files.

::: dir
├── `export.zip`
|   ├── data.json
|   └── files
|       ├── hero.jpg
|       └── photo1.jpg
:::

In the data file, file attachment fields are stored as relative paths to the files inside the archive.

```json
[
    {
        "title": "My Post",
        "featured_image": "files/hero.jpg",
        "gallery": ["files/photo1.jpg", "files/photo2.jpg"]
    }
]
```

If the export includes no file attachments, a standard JSON or CSV file is produced instead.

### Importing File Attachments

When importing, file attachment fields can reference files from two sources.

- **ZIP Archive**: upload the exported ZIP file directly. File paths starting with `files/` are resolved from the archive contents.
- **Media Library**: reference files already in the media library by their media-relative path. For example, if a file exists at `storage/app/media/photos/hero.jpg`, use `photos/hero.jpg` as the path.

```json
[
    {
        "title": "My Post",
        "featured_image": "photos/hero.jpg",
        "gallery": ["photos/photo1.jpg", "photos/photo2.jpg"]
    }
]
```

For `attachOne` relations, the value should be a single path string. For `attachMany` relations, the value should be an array of path strings.

#### See Also

::: also
* [Import & Export Controller](./import-export-controller.md)
* [config_import_export.yaml](../../handbook/controller-config/import-export.md)
* [File Attachments](../data/attachments.md)
:::
