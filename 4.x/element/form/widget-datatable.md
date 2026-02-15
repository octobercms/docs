---
subtitle: Form Widget
shortname: Data Table
---
# Data Table Field

`datatable` - renders an editable table of records, formatted as a grid. Cell content can be editable directly in the grid, allowing for the management of several rows and columns of information.

```yaml
data:
    type: datatable
    adding: true
    deleting: true
    columns: []
    searching: false
```

::: tip
In order to use this with a model, the field should be defined in the [jsonable property](../../extend/system/models.md) or anything that can handle storing as an array.
:::

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------ | -----------
**label** | a name when displaying the form field to the user.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.
**adding** | allow records to be added to the data table. Default: `true`.
**deleting** | allow records to be deleted from the data table. Default: `true`.
**toolbar** | show the toolbar above the data table. Default: `true`.
**searching** | allow records to be searched via a search box. Default: `false`.
**sorting** | allow rows to be manually reordered by dragging. Default: `false`.
**height** | the data table's height, in pixels. If set to `false`, the data table will stretch to fit the content. Default: `false`.
**columns** | an array representing the column configuration of the data table. See the *Column Configuration* section below.

#### Column Configuration

The data table widget allows for the specification of columns as an array via the `columns` configuration variable. Each column should use the field name as a key, and the following configuration variables to set up the field.

Example:

```yaml
columns:
    name:
        type: string
        title: Name
    price:
        type: numeric
        title: Price
        width: 100px
    country:
        type: dropdown
        title: Country
    state:
        type: dropdown
        title: State
        dependsOn: country
    is_active:
        type: checkbox
        title: Active
```

Option | Description
------ | -----------
**type** | the input type for this column's cells. See the *Column Types* section below.
**title** | defines the column's title.
**width** | defines the width of the column, in pixels. Example: `100px`.
**readOnly** | whether this column is read-only. Default: `false`.
**validation** | an array specifying the validation for the content of the column's cells. See the *Column Validation* section below.
**options** | for `dropdown` columns only - specifies the available options as an array. If omitted, options will be loaded via AJAX using the model's `getDataTableOptions` method.
**strict** | for `dropdown` columns only - when set to `false`, allows free-text entry in addition to the dropdown options. Default: `true`.
**dependsOn** | specifies the name of another column that this column depends on. When the parent column value changes, this column's value is cleared and its options are refreshed.
**dateFormat** | for `date` columns only - the date format. Default: `YYYY-MM-DD`.
**timeFormat** | for `time` columns only - the time format. Default: `HH:mm`.

#### Column Types

The following column types are available.

Type | Description
------ | -----------
**string** | a standard text input (default).
**checkbox** | a checkbox for boolean values.
**numeric** | a numeric input that only accepts numbers, including decimals.
**dropdown** | a dropdown select list. Options can be provided inline via the `options` property, or loaded dynamically via AJAX.
**autocomplete** | a text input with autocomplete suggestions. Always allows free-text entry.
**date** | a date picker input.
**time** | a time picker input.

#### Dropdown and Autocomplete Options

Dropdown and autocomplete column options can be provided in two ways.

**Inline options** are defined directly in the column configuration.

```yaml
columns:
    status:
        type: dropdown
        title: Status
        options:
            draft: Draft
            published: Published
            archived: Archived
```

**AJAX options** are loaded dynamically from the model when no inline `options` are specified. The widget will call one of the following methods on the model.

Method | Description
------ | -----------
**get*FieldName*DataTableOptions** | called first, where *FieldName* is the studly-cased field name (e.g., `getRatesDataTableOptions`). Receives `$column` and `$rowData` parameters.
**getDataTableOptions** | a generic fallback method. Receives `$fieldName`, `$column` and `$rowData` parameters.

```php
public function getRatesDataTableOptions($column, $rowData)
{
    if ($column === 'country') {
        return ['au' => 'Australia', 'us' => 'United States'];
    }

    if ($column === 'state') {
        // Use $rowData['country'] to return dependent options
        return State::getNamesByCountry($rowData['country']);
    }
}
```

#### Column Dependencies

A column can depend on another column using the `dependsOn` property. When the parent column value changes, the dependent column value is automatically cleared and its dropdown options are refreshed.

```yaml
columns:
    country:
        type: dropdown
        title: Country
    state:
        type: dropdown
        title: State
        dependsOn: country
```

#### Column Validation

Column cells can be validated against the below types of validation. Validation should be specified as an array within the column configuration.

```yaml
columns:
    id:
        type: string
        title: ID
        validation:
            integer:
                message: Please enter a number
            required:
                message: This field is required
```

Validation | Description
---------- | -----------
**required** | validates that data must be entered before saving.
**integer** | validates that the data is an integer.
**float** | validates that the data is a floating-point number.
**regex** | validates the data against a regular expression. A string `pattern` attribute must be provided.
