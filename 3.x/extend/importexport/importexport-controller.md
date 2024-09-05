---
subtitle: Adds importing and exporting features to a page.
---
# Import Export Controller

The `Backend\Behaviors\ImportExportController` class is a controller behavior that provides features for importing and exporting data. The behavior provides two pages called Import and Export. The Import page allows a user to upload a CSV file and match the columns to the database. The Export page is the opposite and allows a user to download columns from the database as a CSV file. The behavior provides the controller actions `import()` and `export()`.

The importing and exporting behavior configuration is defined in two parts, each part depends on a special model class along with a list and form field definition file. To use the behavior you should add it to the `$implement` property of the controller class. Also, the `$importExportConfig` class property should be defined and its value should refer to the YAML file used for configuring the behavior properties.

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

The configuration file referred in the `$importExportConfig` property is defined in YAML format. The file should be placed into the controller's [views directory](../system/views.md). Below is an example of a configuration file.

```yaml
# config_import_export.yaml
import:
    title: Import subscribers
    modelClass: Acme\Campaign\Models\SubscriberImport
    list: $/acme/campaign/models/subscriber/columns.yaml

export:
    title: Export subscribers
    modelClass: Acme\Campaign\Models\SubscriberExport
    list: $/acme/campaign/models/subscriber/columns.yaml
```

The configuration properties listed below are optional. Define them if you want the behavior to support the import page or export page, or both.

Property | Description
------------- | -------------
**defaultRedirect** | used as a fallback redirection page when no specific redirect page is defined.
**import** | a configuration array or reference to a config file for the Import page.
**export** | a configuration array or reference to a config file for the Export page.
**defaultFormatOptions** | a configuration array or reference to a config file for the default CSV format options.

### Import Page

To support the Import page add the following configuration to the YAML file.

```yaml
import:
    title: Import Subscribers
    modelClass: Acme\Campaign\Models\SubscriberImport
    list: $/acme/campaign/models/subscriberimport/columns.yaml
    redirect: acme/campaign/subscribers
```

The following configuration properties are supported for the Import page.

Property | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../system/localization.md).
**list** | defines the list columns available for importing.
**form** | provides additional fields used as import options, optional.
**redirect** | redirection page when the import is complete, optional
**permissions** | user permissions needed to perform the operation, optional

### Export Page

To support the Export page add the following configuration to the YAML file.

```yaml
export:
    title: Export Subscribers
    modelClass: Acme\Campaign\Models\SubscriberExport
    list: $/acme/campaign/models/subscriberexport/columns.yaml
    redirect: acme/campaign/subscribers
```

The following configuration properties are supported for the Export page:

Property | Description
------------- | -------------
**title** | a page title, can refer to a [localization string](../system/localization.md).
**fileName** | the file name to use for the exported file without extension. Default `export`
**list** | defines the list columns available for exporting.
**form** | provides additional fields used as export options, optional.
**redirect** | redirection page when the export is complete, optional.
**useList** | set to true or the value of a list definition to enable integration with lists. Default: `false`.

### Format Options

To override the default format options add the following configuration to the YAML file:

```yaml
defaultFormatOptions:
    fileFormat: json
```

The following configuration properties (all optional) are supported for the format options, including their applicable format type.

Property | Description | Format
-------- | ----------- | ------
**fileFormat** | File format as either `json`, `csv` or `csv_custom`, default: `json`. |
**customJson** | Use a custom format for the `json` format type. | JSON
**firstRowTitles** | First row contains headers, import only. | CSV
**delimiter** | Delimiter character. | CSV (Custom)
**enclosure** | Enclosure character. | CSV (Custom)
**escape** | Escape character. | CSV (Custom)
**encoding** | File encoding, import only. | CSV (Custom)

## Import and Export Views

For each page feature import and export you should provide a [view file](../system/views.md) with the corresponding name - **import.htm** and **export.htm**.

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

## Integration with List Behavior

There is an alternative approach to exporting data that uses the [list behavior](../lists/list-controller.md) to provide the export data. In order to use this feature you should have the `Backend\Behaviors\ListController` definition to the `$implement` field of the controller class. You do not need to use an export view and all the settings will be pulled from the list. Here is the only configuration needed:

```yaml
export:
    useList: true
```

Then simply add an export button to the [list toolbar](../lists/list-controller.md):

```php
<a
    href="<?= Backend::url('acme/campaign/subscribers/export') ?>"
    class="btn btn-default oc-icon-download">
    Export Records
</a>
```

Similarly, to add an import button, the code would look like this:

```php
<a
    href="<?= Backend::url('acme/campaign/subscribers/import') ?>"
    class="btn btn-default oc-icon-upload">
    Import Records
</a>
```


If you are using [multiple list definitions](../lists/list-controller.md), then you can supply the list definition.

```yaml
export:
    useList: orders
    fileName: orders.csv
```

The `useList` option also supports extended configuration properties.

```yaml
export:
    useList:
        definition: orders
        raw: true
```

The following configuration properties are supported:

Property | Description
------------- | -------------
**definition** | the list definition to source records from, optional.
**raw** | output the raw attribute values from the record, default: false.
