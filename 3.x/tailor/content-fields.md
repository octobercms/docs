---
subtitle: Get started by defining form fields for your content.
---
# Content Fields

Content Fields are the cornerstone of the Tailor module and define how a field should be configured and displayed. These definitions are often found under the **fields** property of a blueprint.

```yaml
fields:
    name:
        label: Full Name
        type: text
```

::: tip
A complete list of available fields can be found in the [Backend Elements section](../element/definitions.md).
:::

For each field you can specify these common properties, where applicable.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**type** | defines how this field should be rendered, see [form field definitions](../element/definitions.md). Default: text.
**span** | aligns the form field to one side. Options: auto, left, right, row, full, adaptive. Default: `full`.
**spanClass** | used with the span `row` option to display the form as a Bootstrap grid, for example, `spanClass: col-xs-4`.
**size** | specifies a field size for fields that use it, for example, the textarea field.
**placeholder** | if the field supports a placeholder value.
**comment** | places a descriptive comment below the field.
**commentAbove** | places a comment above the field.
**commentHtml** | allow HTML markup inside the comment. Options: `true`, `false`.
**default** | specify the default value for the field. For `dropdown`, `checkboxlist`, `radio` and `balloon-selector` widgets, you may specify an option key here to have it selected by default.
**tab** | assigns the field to a tab.
**validation** | defines validation rules for the form field, see [the validation article](../extend/services/validation.md) for rule definitions.
**trigger** | specify conditions for this field using [trigger events](../element/field-conditions.md).
**preset** | allows the field value to be initially set by the value of another field, converted using the [input preset converter](../element/field-conditions.md).

## List and Filter Properties

When it comes to displaying a field in a list or filter, each field has its own default settings. You may override these settings with these properties.

Property | Description
------------- | -------------
**column** | defines how to display the field in a list, see [list column definitions](../element/definitions.md).
**scope** | defines how to display the field in a filter, see [filter scope definitions](../element/definitions.md).

If the **column** or **scope** values are set to `false` then the field will not be displayed in either.

```yaml
myfield:
    type: textarea
    column: false
```

#### See Also

::: also
* [Backend Elements](../element/definitions.md)
* [Building Tailor Fields](../extend/tailor-fields.md)
:::
