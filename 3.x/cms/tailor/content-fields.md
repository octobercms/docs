---
subtitle: Get started by defining form fields for your content.
---
# Content Fields

::: aside
You may build custom content fields by [extending tailor](../../extend/tailor-fields.md).
:::

Content Fields are the cornerstone of the Tailor module and define how a field should be configured and displayed. These definitions are often found under the **fields** property of a blueprint.

```yaml
fields:
    name:
        label: Full Name
        type: text
```

::: tip
A complete list of available fields can be found in the [Backend Elements section](../../element/form-fields.md).
:::

For each field you can specify these common properties, where applicable.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**shortLabel** | a shorter label to use in lists and filters.
**type** | defines how this field should be rendered, see [form field definitions](../../element/form-fields.md). Default: text.
**span** | aligns the form field to one side. Options: auto, left, right, row, full, adaptive. Default: `full`.
**spanClass** | used with the span `row` option to display the form as a Bootstrap grid, for example, `spanClass: col-4`.
**size** | specifies a field size for fields that use it, for example, the textarea field.
**placeholder** | if the field supports a placeholder value.
**comment** | places a descriptive comment below the field.
**commentAbove** | places a comment above the field.
**commentHtml** | allow HTML markup inside the comment. Default: `false`.
**default** | specify the default value for the field. For `dropdown`, `checkboxlist`, `radio` and `balloon-selector` widgets, you may specify an option key here to have it selected by default.
**tab** | assigns the field to a tab.
**validation** | defines validation rules for the form field, see [the validation article](../../extend/services/validation.md) for rule definitions.
**trigger** | specify conditions for this field using [trigger events](../../element/form-fields.md).
**preset** | allows the field value to be initially set by the value of another field, converted using the [input preset converter](../../element/form-fields.md).
**translatable** | disables translation for this field when using the `multisite` in the blueprint definition.

## List and Filter Properties

When it comes to displaying a field in a list or filter, each field has its own default settings. You may override these settings on a per field basis and this is suitable for minor adjustments. For more complex use cases, we recommend defining columns and scopes separately from the fields (see below).

Property | Description
------------- | -------------
**column** | defines how to display the field in a list, see [list column definitions](../../element/list-columns.md).
**scope** | defines how to display the field in a filter, see [filter scope definitions](../../element/filter-scopes.md).

### Field Configuration

An example can be specifying a different label for each using the `column` or `scope` properties of the field.

```yaml
myfield:
    label: Form Label
    column:
        label: List Label
    scope:
        label: Filter Label
```

If the are set to `false` then the field will disable and prevent it from being displayed.

```yaml
myfield:
    label: Form Label
    column: false
    scope: false
```

The `column` type can be set to `invisible` to make it hidden from the list by default.

```yaml
myfield:
    label: Form Label
    column: invisible
```

### External Configuration

You may define the scopes and columns separately from the form fields by using the `columns` and `scopes` property in the blueprint. When using external configuration, the default view will be replaced by only the defined fields.

```yaml
scopes:
    myfield:
        label: Filter Label
        # [...]

columns:
    myfield:
        label: List Label
        # [...]

fields:
    myfield:
        label: Form Label
        # [...]
```

List columns have short-hand values that can be used. Passing a string will replace the label, passing `true` will include the default column, passing `false` will remove the column and passing `invisible` will make the column invisible.

```yaml
columns:
    myfield: List Label   # New Label
    myfield: true         # Shown
    myfield: false        # Hidden
    myfield: invisible    # Invisible
```

Filter scopes have a similar short-hand values to the list columns that can be used.

```yaml
scopes:
    myfield: Filter Label # New Label
    myfield: true         # Shown
    myfield: false        # Hidden
```

## Form Field Validation

You may specify validation rules for form fields using the `validation` field property, see [the validation article](../../extend/services/validation.md) for rule definitions.

```yaml
fields:
    myfield:
        label: Featured Text
        validation: "required|min:15"
```

Validation rules can also be defined externally in the blueprint file using the `validation` blueprint property. This allows you to set custom attribute names and validation messages.

```yaml
validation:
    rules:
        myfield: "required|min:15"
    attributeNames:
        myfield: My Field
    customMessages:
        myfield.min: "My field has to be at least 15 characters long"

fields:
    myfield:
        label: Form Label
        # [...]
```

## Modifying Core Fields

Each blueprint record has several core fields as [defined by attributes on the model](./models.md). You can modify these fields under certain conditions.

An Entry is enabled by default; however, you can modify this by specifying a new default value for the `is_enabled` field.

```yaml
fields:
    is_enabled:
        default: false
```

The `title` field placeholder is generated based on the blueprint name; however, you can customize this to something more useful depending on the use case. For example, _First and Last Name_, _Event Title_ or _Location Name_.

```yaml
fields:
    title:
        placeholder: Event Title
```

In some cases the `title` field may not be required, such as using a [single blueprint](./blueprints.md),you may set the `hidden` property to `true`. Hiding the title will disable the in-built validation for this field.

```yaml
fields:
    title:
        hidden: true
```

#### See Also

::: also
* [Defining Form Fields](../../element/form-fields.md)
* [Building Tailor Fields](../../extend/tailor-fields.md)
:::
