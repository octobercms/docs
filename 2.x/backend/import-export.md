# Importing & Exporting

**Import Export Behavior** is a controller modifier that provides features for importing and exporting data. The behavior provides two pages called Import and Export. The Import page allows a user to upload a CSV file and match the columns to the database. The Export page is the opposite and allows a user to download columns from the database as a CSV file. The behavior provides the controller actions `import()` and `export()`.

The behavior configuration is defined in two parts, each part depends on a special model class along with a list and form field definition file. To use the importing and exporting behavior you should add it to the `$implement` property of the controller class. Also, the `$importExportConfig` class property should be defined and its value should refer to the YAML file used for configuring the behavior options.

```php
namespace Acme\Shop\Controllers;

class Products extends Controller
{
    public $implement = [
        \Backend\Behaviors\ImportExportController::class
    ];

    public $importExportConfig = 'config_import_export.yaml';

    // [...]
}
```

## Configuring the Behavior

The configuration file referred in the `$importExportConfig` property is defined in YAML format. The file should be placed into the controller's [views directory](controllers-ajax.md). Below is an example of a configuration file:

```yaml
# ===================================
#  Import/Export Behavior Config
# ===================================

import:
    title: Import subscribers
    modelClass: Acme\Campaign\Models\SubscriberImport
    list: $/acme/campaign/models/subscriber/columns.yaml

export:
    title: Export subscribers
    modelClass: Acme\Campaign\Models\SubscriberExport
    list: $/acme/campaign/models/subscriber/columns.yaml
```

The configuration options listed below are optional. Define them if you want the behavior to support the [Import](#oc-import-page) or [Export](#oc-export-page), or both.

Option | Description
------------- | -------------
**defaultRedirect** | used as a fallback redirection page when no specific redirect page is defined.
**import** | a configuration array or reference to a config file for the Import page.
**export** | a configuration array or reference to a config file for the Export page.
**defaultFormatOptions** | a configuration array or reference to a config file for the default CSV format options.

<a id="oc-import-page"></a>
### Import Page

To support the Import page add the following configuration to the YAML file:

```yaml
import:
    title: Import subscribers
    modelClass: Acme\Campaign\Models\SubscriberImport
    list: $/acme/campaign/models/subscriberimport/columns.yaml
    redirect: acme/campaign/subscribers
```

The following configuration options are supported for the Import page:

Option | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../plugin/localization.md).
**list** | defines the list columns available for importing.
**form** | provides additional fields used as import options, optional.
**redirect** | redirection page when the import is complete, optional
**permissions** | user permissions needed to perform the operation, optional

<a id="oc-export-page"></a>
### Export Page

To support the Export page add the following configuration to the YAML file:

```yaml
export:
    title: Export subscribers
    modelClass: Acme\Campaign\Models\SubscriberExport
    list: $/acme/campaign/models/subscriberexport/columns.yaml
    redirect: acme/campaign/subscribers
```

The following configuration options are supported for the Export page:

Option | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../plugin/localization.md).
**fileName** | the file name to use for the exported file, default **export.csv**.
**list** | defines the list columns available for exporting.
**form** | provides additional fields used as export options, optional.
**redirect** | redirection page when the export is complete, optional.
**useList** | set to true or the value of a list definition to enable [integration with Lists](#oc-list-behavior-integration), default: false.

### Format Options

To override the default CSV format options add the following configuration to the YAML file:

```yaml
defaultFormatOptions:
    delimiter: ';'
    enclosure: '"'
    escape: '\'
    encoding: 'utf-8'
```

The following configuration options (all optional) are supported for the format options:

Option | Description
------------- | -------------
**delimiter** | Delimiter character.
**enclosure** | Enclosure character.
**escape** | Escape character.
**encoding** | File encoding (only used for the import).

## Import and Export Views

For each page feature [Import](#oc-import-page) and [Export](#oc-export-page) you should provide a [view file](controllers-ajax.md) with the corresponding name - **import.htm** and **export.htm**.

The import/export behavior adds two methods to the controller class: `importRender` and `exportRender`. These methods render the importing and exporting sections as per the YAML configuration file described above.

### Import View

The **import.htm** view represents the Import page that allows users to import data. A typical Import page contains breadcrumbs, the import section itself, and the submission buttons. The **data-request** attribute should refer to the `onImport` AJAX handler provided by the behavior. Below is a contents of the typical import.htm view file.

```php
<?= Form::open(['class' => 'layout']) ?>

    <div class="layout-row">
        <?= $this->importRender() ?>
    </div>

    <div class="form-buttons">
        <button
            type="submit"
            data-control="popup"
            data-handler="onImportLoadForm"
            data-keyboard="false"
            class="btn btn-primary">
            Import records
        </button>
    </div>

<?= Form::close() ?>
```

### Export View

The **export.htm** view represents the Export page that allows users to export a file from the database. A typical Export page contains breadcrumbs, the export section itself, and the submission buttons. The **data-request** attribute should refer to the `onExport` AJAX handler provided by the behavior. Below is a contents of the typical export.htm form.

```php
<?= Form::open(['class' => 'layout']) ?>

    <div class="layout-row">
        <?= $this->exportRender() ?>
    </div>

    <div class="form-buttons">
        <button
            type="submit"
            data-control="popup"
            data-handler="onExportLoadForm"
            data-keyboard="false"
            class="btn btn-primary">
            Export records
        </button>
    </div>

<?= Form::close() ?>
```

## Defining an Import Model

For importing data you should create a dedicated model for this process which extends the `Backend\Models\ImportModel` class. Here is an example class definition:

```php
class SubscriberImport extends \Backend\Models\ImportModel
{
    /**
     * @var array The rules to be applied to the data.
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
            catch (\Exception $ex) {
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

## Defining an Export Model

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

<a id="oc-list-behavior-integration"></a>
## Integration with List Behavior

There is an alternative approach to exporting data that uses the [list behavior](lists.md) to provide the export data. In order to use this feature you should have the `Backend\Behaviors\ListController` definition to the `$implement` field of the controller class. You do not need to use an export view and all the settings will be pulled from the list. Here is the only configuration needed:

```yaml
export:
    useList: true
```

Then simply add button to the [list toolbar](./lists.md):

```php
<a
    href="<?= Backend::url('acme/campaign/subscribers/export') ?>"
    class="btn btn-default oc-icon-download">
    Export Records
</a>
```

If you are using [multiple list definitions](lists.md#oc-multiple-list-definitions), then you can supply the list definition:

```yaml
export:
    useList: orders
    fileName: orders.csv
```

The `useList` option also supports extended configuration options.

```yaml
export:
    useList:
        definition: orders
        raw: true
```

The following configuration options are supported:

Option | Description
------------- | -------------
**definition** | the list definition to source records from, optional.
**raw** | output the raw attribute values from the record, default: false.
