---
subtitle: Form Widget
---
# Repeater

`repeater` - renders a repeating set of form fields using a related record or [jsonable attribute](../../extend/system/models.md).

```yaml
extra_information:
    type: repeater
    form:
        fields:
            added_at:
                label: Date Added
                type: datepicker
            details:
                label: Details
                type: textarea
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | specifies a default array value, optional.
**comment** | places a descriptive comment below the field.
**form** | inline field definitions or a reference to form field definition file.
**prompt** | text to display for the create button. Default: Add new item.
**displayMode** | controls how the interface is displayed, as either **accordion** or **builder**. Default: `accordion`
**useTabs** | shows tabs when enabled, allowing fields to specify a `tab` property. Default `false`
**itemsExpanded** | if repeater items should be expanded by default when using accordion mode. Default: `true`.
**titleFrom** | name of field within items to use as the title for the collapsed item, optional.
**minItems** | minimum items required. Pre-displays those items when not using groups. For example if you set `minItems: 1` the first row will be displayed and not hidden.
**maxItems** | maximum number of items to allow within the repeater.
**groups** | references a group of form fields placing the repeater in group mode (see below). An inline definition can also be used.
**groupKeyFrom** | the group key attribute stored along with the saved data. Default: `_group`
**showReorder** | displays an interface for sorting items. Default: true
**showDuplicate** | displays an interface for cloning items. Default: true

The `titleFrom` property can be used to specify the value used when the repeater is collapsed.

```yaml
extra_information:
    type: repeater
    titleFrom: title_when_collapsed
    form:
        fields:
            # ...
            title_when_collapsed:
                label: This field is the title when collapsed
                type: text
```

The repeater fields supports the use of tabs by setting the `useTabs` property to `true`.

```yaml
extra_information:
    type: repeater
    useTabs: true
    form:
        added_at:
            label: Date added
            type: datepicker
            tab: Date
        details:
            label: Details
            type: textarea
            tab: Details
```

## Grouped Repeaters

The repeater field supports a group mode using `groups` that allows a custom set of fields to be chosen for each iteration.

```yaml
content:
    type: repeater
    prompt: Add content block
    groups: $/acme/blog/config/fields_repeater.yaml
```

This is an example of a group configuration file, which would be located in **/plugins/acme/blog/config/fields_repeater.yaml**. For better organization, the `groups` can specify one file per group definition.

```yaml
groups:
    textarea: $/acme/blog/config/fields_textarea.yaml
    quote: $/acme/blog/config/fields_quote.yaml
```

Alternatively, the definitions could be specified inline with the repeater. If the group key starts with an underscore (`_`) then it will be ignored.

```yaml
groups:
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
**useTabs** | shows tabs for the group only, optional.

::: tip
The group key is stored along with the saved data as the `_group` attribute. This can be customized with the `groupKeyFrom` option.
:::

## Example of Using Related Records

The repeater form widget will automatically detect if the model attribute is a related field and use it. The following provides an example implementation that you may use. For example, if your model uses a `hasMany` relation that refers to a **RepeaterItem** model the repeater will use this related model for each item.

```php
public $hasMany = [
    'extra_information' => [
        RepeaterItem::class,
        'key' => 'parent_id',
        'delete' => true
    ],
];
```

A simple [database table schema](../../extend/database/structure.md) for the model can be defined that includes a reference to the parent model `id` and a serialized JSON `value` for dynamic attributes (see below).

```php
Schema::create('acme_blog_repeater_items', function($table) {
    $table->increments('id');
    $table->integer('parent_id')->unsigned()->nullable()->index();
    $table->mediumText('value')->nullable();
    $table->integer('sort_order')->nullable();
    $table->timestamps();
});
```

The model extends the `October\Rain\Database\ExpandoModel` base class to allow dynamic attributes set on the model and saved in the database, in JSON format. The model can [include attachments](../../extend/database/attachments.md) and any other related fields.

```php
use October\Rain\Database\ExpandoModel;

class RepeaterItem extends ExpandoModel
{
    use \October\Rain\Database\Traits\Sortable;

    public $table = 'acme_blog_repeater_items';

    protected $expandoPassthru = ['parent_id', 'sort_order'];

    public $attachMany = [
        'photos' => \System\Models\File::class,
    ];
}
```

Finally, the repeater item can be specified as a form field with accompanying form field definitions, including fields that use [model relationships](../../extend/database/relations.md).

```yaml
extra_information:
    type: repeater
    form:
        fields:
            title:
                label: title
            is_enabled:
                label: Enabled
                type: switch
            photos:
                label: Photos
                type: fileupload
                mode: image
```
