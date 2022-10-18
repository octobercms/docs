# Data Table

`datatable` - renders an editable table of records, formatted as a grid. Cell content can be editable directly in the grid, allowing for the management of several rows and columns of information.

```yaml
data:
    type: datatable
    adding: true
    deleting: true
    columns: []
    recordsPerPage: false
    searching: false
```

::: tip
In order to use this with a model, the field should be defined in the [jsonable property](../../extend/system/models.md) or anything that can handle storing as an array.
:::

The following lists the configuration values of the data table widget itself.

Option | Description
------ | -----------
**adding** | allow records to be added to the data table. Default: `true`.
**btnAddRowLabel** | defines a custom label for the "Add Row Above" button.
**btnAddRowBelowLabel** | defines a custom label for the "Add Row Below" button.
**btnDeleteRowLabel** | defines a custom label for the "Delete Row" button.
**columns** | an array representing the column configuration of the data table. See the *Column configuration* section below.
**deleting** | allow records to be deleted from the data table. Default: `false`.
**dynamicHeight** | if `true`, the data table's height will extend or shrink depending on the records added, up to the maximum size defined by the `height` configuration value. Default: `false`.
**fieldName** | defines a custom field name to use in the POST data sent from the data table. Leave blank to use the default field alias.
**height** | the data table's height, in pixels. If set to `false`, the data table will stretch to fit the field container.
**keyFrom** | the data attribute to use for keying each record. This should usually be set to `id`. Only supports integer values.
**postbackHandlerName** | specifies the AJAX handler name in which the data table content will be sent with. When set to `null` (default), the handler name will be auto-detected from the request name used by the form which contains the data table. It is recommended to keep this as `null`.
**recordsPerPage** | the number of records to show per page. If set to `false`, the pagination will be disabled.
**searching** | allow records to be searched via a search box. Default: `false`.
**toolbar** | an array representing the toolbar configuration of the data table.

#### Column Configuration

The data table widget allows for the specification of columns as an array via the `columns` configuration variable. Each column should use the field name as a key, and the following configuration variables to set up the field.

Example:

```yaml
columns:
    id:
        type: string
        title: ID
        validation:
            integer:
                message: Please enter a number
    name:
        type: string
        title: Name
```

Option | Description
------ | -----------
**type** | the input type for this column's cells. Must be one of the following: `string`, `checkbox`, `dropdown` or `autocomplete`.
**options** | for `dropdown` and `autocomplete` columns only - this specifies the AJAX handler that will return the available options, as an array. The array key is used as the value of the option, and the array value is used as the option label.
**readOnly** | whether this column is read-only. Default: `false`.
**title** | defines the column's title.
**validation** | an array specifying the validation for the content of the column's cells. See the *Column validation* section below.
**width** | defines the width of the column, in pixels.

#### Column Validation

Column cells can be validated against the below types of validation. Validation should be specified as an array, with the type of validation used as a key, and an optional message specified as the `message` attrbute for that validation.

Validation | Description
---------- | -----------
**float** | Validates the data as a float. An optional boolean `allowNegative` attribute can be provided, allowing for negative float numbers.
**integer** | Validates the data as an integer. An optional boolean `allowNegative` attribute can be provided, allowing for negative integers.
**length** | Validates the data to be of a certain length. An integer `min` and `max` attribute must be provided, representing the minimum and maximum number of characters that must be entered.
**regex** | Validates the data against a regular expression. A string `pattern` attribute must be provided, defining the regular expression to test the data against.
**required** | Validates that the data must be entered before saving.
