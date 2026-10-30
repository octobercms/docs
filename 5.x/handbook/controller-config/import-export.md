---
previousPath: extend/importexport/importexport-controller.md#configuring-the-behavior
subtitle: Controller Configuration
---
# config_import_export.yaml

The configuration file referred in the `$importExportConfig` property is defined in YAML format. The file should be placed into the controller's [views directory](../../backend/panel/views.md). Below is an example of a configuration file.

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

The configuration properties listed below are optional. Define them if you want the behavior to support the import page or export page, or both.

Property | Description
------------- | -------------
**defaultRedirect** | used as a fallback redirection page when no specific redirect page is defined.
**import** | a configuration array or reference to a config file for the Import page.
**export** | a configuration array or reference to a config file for the Export page.
**defaultFormatOptions** | a configuration array or reference to a config file for the default CSV format options.

## Import Page

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
**title** | a page title, can refer to a [localization string](../../backend/localization/backend.md).
**list** | defines the list columns available for importing.
**form** | provides additional fields used as import options, optional.
**redirect** | redirection page when the import is complete, optional
**permissions** | user permissions needed to perform the operation, optional

## Export Page

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
**title** | a page title, can refer to a [localization string](../../backend/localization/backend.md).
**fileName** | the file name to use for the exported file without extension. Default `export`
**list** | defines the list columns available for exporting.
**form** | provides additional fields used as export options, optional.
**redirect** | redirection page when the export is complete, optional.
**useList** | set to true or the value of a list definition to enable integration with lists. Default: `false`.

## Format Options

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
