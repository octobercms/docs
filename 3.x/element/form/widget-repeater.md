# Repeater

`repeater` - renders a repeating set of form fields using a related record or [jsonable attribute](../../extend/system/models.md).

```yaml
extra_information:
    type: repeater
    titleFrom: title_when_collapsed
    form:
        fields:
            added_at:
                label: Date added
                type: datepicker
            details:
                label: Details
                type: textarea
            title_when_collapsed:
                label: This field is the title when collapsed
                type: text
```

Option | Description
------------- | -------------
**form** | inline field definitions or a reference to form field definition file.
**prompt** | text to display for the create button. Default: Add new item.
**displayMode** | controls how the interface is dispalyed, as either **accordion** or **builder**. Default: `accordion`
**itemsExpanded** | if repeater items should be expanded by default when using accordion mode. Default: `true`.
**titleFrom** | name of field within items to use as the title for the collapsed item, optional.
**minItems** | minimum items required. Pre-displays those items when not using groups. For example if you set `minItems: 1` the first row will be displayed and not hidden.
**maxItems** | maximum number of items to allow within the repeater.
**groups** | references a group of form fields placing the repeater in group mode (see below). An inline definition can also be used.
**groupKeyFrom** | the group key attribute stored along with the saved data. Default: `_group`
**showReorder** | displays an interface for sorting items. Default: true
**showDuplicate** | displays an interface for cloning items. Default: true

The repeater field supports a group mode which allows a custom set of fields to be chosen for each iteration.

```yaml
content:
    type: repeater
    prompt: Add content block
    groups: $/acme/blog/config/repeater_fields.yaml
```

This is an example of a group configuration file, which would be located in **/plugins/acme/blog/config/repeater_fields.yaml**. Alternatively these definitions could be specified inline with the repeater.

```yaml
textarea:
    name: Textarea
    description: Basic text field
    icon: icon-file-text-o
    fields:
        text_area:
            label: Text Content
            type: textarea
            size: large

quote:
    name: Quote
    description: Quote item
    icon: icon-quote-right
    fields:
        quote_position:
            span: auto
            label: Quote Position
            type: radio
            options:
                left: Left
                center: Center
                right: Right
        quote_content:
            span: auto
            label: Details
            type: textarea
```

Each group must specify a unique key and the definition supports the following options.

Option | Description
------------- | -------------
**name** | the name of the group.
**description** | a brief description of the group.
**icon** | defines an icon for the group, optional.
**titleFrom** | name of a field for the item title, optional.
**fields** | form fields belonging to the group.

::: tip
The group key is stored along with the saved data as the `_group` attribute. This can be customized with the `groupKeyFrom` option.
:::
