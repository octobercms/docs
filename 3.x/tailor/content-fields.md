# Content Fields

Content Fields are the cornerstone of the Tailor module and define how a field should be configured and displayed. These definitions are often found under the **fields** property of a blueprint.

```yaml
fields:
    name:
        label: Full Name
        type: text
```

For each field you can specify these common properties, where applicable.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**type** | defines how this field should be rendered, see [form field definitions](../element/definitions.md). Default: text.
**span** | aligns the form field to one side. Options: auto, left, right, row, full. Default: full.
**spanClass** | used with the span `row` option to display the form as a Bootstrap grid, for example, `spanClass: col-xs-4`.
**size** | specifies a field size for fields that use it, for example, the textarea field.
**placeholder** | if the field supports a placeholder value.
**comment** | places a descriptive comment below the field.
**commentAbove** | places a comment above the field.
**commentHtml** | allow HTML markup inside the comment. Options: true, false.
**default** | specify the default value for the field. For `dropdown`, `checkboxlist`, `radio` and `balloon-selector` widgets, you may specify an option key here to have it selected by default.
**tab** | assigns the field to a tab.
**validation** | defines validation rules for the form field.

## List and Filter Properties

When it comes to displaying a field in a list or filter, each field has its own default settings. You may override these settings with these properties.

Property | Description
------------- | -------------
**column** | defines how to display the field in a list, see [list column definitions](../element/definitions.md).
**scope** | defines how to display the field in a filter, see [filter scope definitions](../element/definitions.md).

If the **column** or **scope** values are set to `false` then the field will not be displayed in either.

## Tailor Specific Fields

This section outlines the field types that are only available inside tailor blueprints. Like form fields, these values are used as the **type** property of a field definition.

### Mixin

`mixin` - includes another set of fields.

```yaml
_include1:
    type: mixin
    source: <uuid|handle>
```

See the [Mixins article](blueprints/mixin.md) for more information on defining mixins.

### Entries

`entries` - links to other entries by UUID or handle.

```yaml
author:
    label: Author
    type: entries
    source: <uuid|handle>
```

To limit the number of selectable items, use the `maxItems` property.

```yaml
author:
    type: entries
    maxItems: 1
```
