---
previousPath: cms/tailor/content-fields.md
subtitle: Define the fields editors fill in for each record, including their validation, list columns and filters.
---
# Defining Fields

Fields define the inputs that editors fill in for each Tailor record. You list them under the **fields** property of a blueprint, and Tailor uses each one to build the form, the list columns and the filters in the admin panel.

```yaml
fields:
    name:
        label: Full Name
        type: text
```

::: aside
You can build your own field types by [creating custom Tailor fields](../extending/tailor-fields.md).
:::

## Choosing a Field Type

The **type** property sets how the field is displayed and stored. It defaults to `text` when you leave it out. You can use any of the [form field types](../../handbook/form-fields.md), such as `textarea`, `dropdown` or `fileupload`, along with the [content fields](../../handbook/tailor-fields.md) that only work in Tailor, such as `entries` for linking to other records.

```yaml
fields:
    biography:
        label: Biography
        type: richeditor

    author:
        label: Author
        type: entries
        source: Blog\Author
        maxItems: 1
```

## Setting Common Field Properties

The following properties are the ones you use most often. Every field also supports the full list of [form field properties](../../handbook/form-fields.md#field-properties), such as `span`, `placeholder`, `trigger` and `preset`.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**shortLabel** | a shorter label to use in lists and filters.
**type** | defines how this field should be rendered. Default: `text`.
**comment** | places a descriptive comment below the field.
**default** | specify the default value for the field.
**tab** | assigns the field to a tab.
**validation** | defines validation rules for the form field (see below).
**translatable** | disables translation for this field when using `multisite` in the blueprint definition. For repeater fields, set to `sync` to keep the repeater structure synced across sites while allowing sub-fields to be translated independently, see [Translatable Repeaters](../../handbook/form-fields/repeater.md#translatable-repeaters-in-tailor).
**column** | defines how to display the field in a list (see below).
**scope** | defines how to display the field in a filter (see below).

## Validating Fields

Use the `validation` property to set validation rules for a field. See [the validation article](../../backend/services/validation.md) for the available rules.

```yaml
fields:
    myfield:
        label: Featured Text
        validation: "required|min:15"
```

The `unique` validation rule is configured automatically, so you do not need to specify a table name.

```yaml
unique_field:
    label: Unique Field
    validation: unique
```

The `required` rule supports the **create** and **update** modifiers, which apply the rule only when a record is created or updated. The following field is only required when the record does not exist yet.

```yaml
password:
    label: Password
    validation: "required:create"
```

### Customizing Validation Messages

You can also define validation rules in a separate `validation` property of the blueprint. This lets you set custom attribute names and validation messages.

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

## Customizing List Columns and Filters

Each field has default settings for how it appears as a list column and as a filter. For small adjustments, set the `column` and `scope` properties on the field itself. For larger changes, define the columns and scopes separately in the blueprint.

### Adjusting a Single Field

The `column` and `scope` properties accept the [list column](../../handbook/list-columns.md) and [filter scope](../../handbook/filter-scopes.md) definitions. The following sets a different label in each place.

```yaml
myfield:
    label: Form Label
    column:
        label: List Label
    scope:
        label: Filter Label
```

Set them to `false` to remove the field from the list and the filter.

```yaml
myfield:
    label: Form Label
    column: false
    scope: false
```

Set the `column` to `invisible` to hide the column from the list by default, while still letting users show it.

```yaml
myfield:
    label: Form Label
    column: invisible
```

### Defining Columns and Scopes Separately

You can define the columns and scopes apart from the form fields using the `columns` and `scopes` properties of the blueprint. When you use this external configuration, the default view is replaced by only the defined fields.

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

::: tip
A **columns** or **scopes** definition is only valid when a matching **fields** definition exists. To keep a field out of the form, set `hidden: true` on the field, then set `hidden: false` in the column or scope to display it there.
:::

List columns accept short-hand values. A string replaces the label, `true` includes the default column, `false` removes the column and `invisible` hides the column by default.

```yaml
columns:
    myfield: List Label   # New Label
    myfield: true         # Shown
    myfield: false        # Hidden
    myfield: invisible    # Invisible
    myfield: [...]        # Config Array
```

Filter scopes accept similar short-hand values.

```yaml
scopes:
    myfield: Filter Label # New Label
    myfield: true         # Shown
    myfield: false        # Hidden
    myfield: [...]        # Config Array
```

## Modifying Core Fields

Every entry has several core fields that are [defined by attributes on the model](./models.md), such as `title` and `is_enabled`. You can change some of their settings by naming them in your **fields** definition.

An entry is enabled by default. To change this, set a new default value for the `is_enabled` field.

```yaml
fields:
    is_enabled:
        default: false
```

The `title` field placeholder is based on the blueprint name. You can replace it with something more useful for your content, such as _First and Last Name_, _Event Title_ or _Location Name_.

```yaml
fields:
    title:
        placeholder: Event Title
```

When the `title` field is not needed, such as in a [single blueprint](../../handbook/blueprint-types/single.md), set the `hidden` property to `true`. Hiding the title also disables its built-in validation.

```yaml
fields:
    title:
        hidden: true
```

See [Disabling Required Fields](../../handbook/blueprint-types/entry.md#disabling-required-fields) to change the validation of the `title` and `slug` fields.

#### See Also

::: also
* [Form Fields](../../handbook/form-fields.md)
* [Content Fields](../../handbook/tailor-fields.md)
* [Custom Tailor Fields](../extending/tailor-fields.md)
* [Tailor Localization](../sites/tailor.md)
:::
