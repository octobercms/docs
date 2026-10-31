---
previousPath: extend/importexport/importexport-controller.md
subtitle: Add pages that import records from a file and export them for download.
---
# Import & Export Controller

The `Backend\Behaviors\ImportExportController` behavior adds an Import page and an Export page to a backend controller. On the Import page, users upload a CSV or JSON file and match its columns to the database. On the Export page, they download records from the database as a file.

```php
namespace Acme\Campaign\Controllers;

class Subscribers extends Controller
{
    public $implement = [
        \Backend\Behaviors\ImportExportController::class
    ];

    public $importExportConfig = 'config_import_export.yaml';

    // [...]
}
```

The behavior provides the `import()` and `export()` controller actions. You supply a [configuration file](#configuring-the-import-export-controller), an [import or export model](./import-export-models.md) for each page with a list column definition file, and a [view file](#creating-the-import-and-export-views) for each page.

## Configuring the Import & Export Controller

Place the file named in `$importExportConfig` in the [controller's views directory](../panel/views.md). Define an `import` section, an `export` section, or both.

```yaml
# config_import_export.yaml
import:
    title: Import Subscribers
    modelClass: Acme\Campaign\Models\SubscriberImport
    list: $/acme/campaign/models/subscriber/columns.yaml

export:
    title: Export Subscribers
    modelClass: Acme\Campaign\Models\SubscriberExport
    list: $/acme/campaign/models/subscriber/columns.yaml
```

The `modelClass` property is the [import or export model](./import-export-models.md) that processes the data, and the `list` property defines the columns available for importing or exporting.

See [config_import_export.yaml](../../handbook/controller-config/import-export.md) for every option, including redirects, permissions, the export file name and the default format options.

## Creating the Import and Export Views

Each page needs a [view file](../panel/views.md) with a matching name: **import.php** and **export.php**. The behavior adds two methods to the controller that render these pages from the configuration file: `importRender` and `exportRender`.

### Import View

The **import.php** view is the Import page. It contains the import section and the button that starts the import. The button opens the progress popup with the `onImportLoadForm` AJAX handler, which then runs the `onImport` handler, both provided by the behavior.

```php
<?= Form::open(['class' => 'd-flex flex-column h-100']) ?>

    <div class="flex-grow-1">
        <?= $this->importRender() ?>
    </div>

    <div class="form-buttons">
        <div data-control="loader-container">
            <button
                type="button"
                data-control="popup"
                data-handler="onImportLoadForm"
                data-keyboard="false"
                class="btn btn-primary">
                <i class="ph ph-upload-simple"></i>
                Import records
            </button>
        </div>
    </div>

<?= Form::close() ?>
```

### Export View

The **export.php** view is the Export page. It contains the export section and the button that starts the export. The button opens the progress popup with the `onExportLoadForm` AJAX handler, which then runs the `onExport` handler, both provided by the behavior.

```php
<?= Form::open(['class' => 'd-flex flex-column h-100']) ?>

    <div class="flex-grow-1">
        <?= $this->exportRender() ?>
    </div>

    <div class="form-buttons">
        <div data-control="loader-container">
            <button
                type="button"
                data-control="popup"
                data-handler="onExportLoadForm"
                data-keyboard="false"
                class="btn btn-primary">
                <i class="ph ph-download-simple"></i>
                Export records
            </button>
        </div>
    </div>

<?= Form::close() ?>
```

## Exporting from a List

Instead of an export model and view, you can export the records shown by the [list controller](../lists/list-controller.md). The controller must also implement the `Backend\Behaviors\ListController` behavior. You don't need an export view, and all the settings are taken from the list. This is the only configuration needed.

```yaml
export:
    useList: true
```

Then add an export button to the [list toolbar](../../handbook/controller-config/list.md#adding-a-toolbar).

```php
<a
    href="<?= Backend::url('acme/campaign/subscribers/export') ?>"
    class="btn btn-default">
    <i class="ph ph-download-simple"></i>
    Export Records
</a>
```

An import button works the same way.

```php
<a
    href="<?= Backend::url('acme/campaign/subscribers/import') ?>"
    class="btn btn-default">
    <i class="ph ph-upload-simple"></i>
    Import Records
</a>
```

### Choosing a List Definition

If the controller uses [multiple list definitions](../lists/list-controller.md#multiple-list-definitions), set `useList` to the definition name.

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

The following configuration properties are supported.

Property | Description
------------- | -------------
**definition** | the list definition to source records from, optional.
**raw** | output the raw attribute values from the record, default: false.

#### See Also

::: also
* [Import & Export Models](./import-export-models.md)
* [config_import_export.yaml](../../handbook/controller-config/import-export.md)
* [List Controller](../lists/list-controller.md)
:::
