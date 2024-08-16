---
subtitle: Learn how to define columns in a list structure.
---
# List Columns

List Columns are column definitions used by lists. These are referred to by the following areas.

- [Backend List Controller](../extend/lists/list-controller.md)
- [Backend Relation Controller](../extend/forms/relation-controller.md)

All list columns are identified as their individual **type** property.

```yaml
columns:
    mycolumn:
        type: number
        # ...
```

## Available Columns

The following list columns are available:

<div class="content-list-p" markdown="1">

[Text](./lists/column-text.md)
[Number](./lists/column-number.md)
[Image](./lists/column-image.md)
[Switch](./lists/column-switch.md)
[Summary](./lists/column-summary.md)
[Date & Time](./lists/column-datetime.md)
[Selectable](./lists/column-selectable.md)
[Linkage](./lists/column-linkage.md)
[Partial](./lists/column-partial.md)
[Color Picker](./lists/column-colorpicker.md)
[Currency](./lists/column-currency.md)

</div>

## Column Properties

For each column can specify these properties (where applicable):

Property | Description
------------- | -------------
**label** | a name when displaying the list column to the user.
**type** | defines how this column should be rendered.
**default** | specifies the default value for the column if value is empty.
**searchable** | include this column in the list search results. Default: `false`.
**invisible** | specifies if this column is hidden by default. Default: `false`.
**sortable** | specifies if this column can be sorted. Default: `true`.
**sortableDefault** | specifies if this column is sorted by default. This should only be used on a single sortable column. Supported values: `asc`, `desc`.
**clickable** | if set to false, disables the default click behavior when the column is clicked. Default: true.
**select** | defines a custom SQL select statement to use for the value. If a `relation` is specified, this refers to a column on the related database table.
**valueFrom** | defines a model attribute to use for the source value. If a `relation` is specified, this refers to the attribute of the relation and eager loads the relation.
**displayFrom** | defines a model attribute to use for the display value.
**relation** | defines a model relationship name as a source, used with `select` or `valueFrom`.
**relationCount** | display the number of related records as the column value. Must be used with the `relation` option. Default: `false`
**relationWith** | eager load the specified relation definition with the list query. Useful to improve performance of nested column selections.
**cssClass** | assigns a CSS class to the column container.
**headCssClass** | assigns a CSS class to the column header container.
**width** | sets the column width, can be specified in percents (10%) or pixels (50px). There could be a single column without width specified, it will be stretched to take the available space.
**align** | specifies the column alignment. Possible values are `left`, `right` and `center`.
**permissions** | the [permissions](../extend/backend/permissions.md) that the current backend user must have in order for the column to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.
**order** | a numerical weight when determining the display order, default value increments at 100 points per column.
**after** | place this column after another existing column name using the display order (+1).
**before** | place this column before another existing column name using the display order (-1).
**tooltip** | adds an icon with a tooltip after the column label. See below for more detailed settings.

### Custom Value Selection

It is possible to change the source and display values for each column. If you want to source the column value from another column, do so with the `valueFrom` option.

```yaml
other_name:
    label: Something Great
    valueFrom: name
```

If you want to keep the source column value but display a different value from the model attribute, use the `displayFrom` option.

```yaml
status_code:
    label: Status
    displayFrom: status_label
```

This is mostly applicable when a [model accessor](../extend/database/mutators.md) is used to modify the display value. This is useful where you want to display a certain value, but sort and search by a different value.

```php
public function getStatusLabelAttribute()
{
    return title_case($this->status_code);
}
```

### Nested Column Selection

In some cases it makes sense to retrieve a column value from a nested data structure, such as a [model relationship](../extend/database/relations.md) column or a [jsonable array](../extend/system/models.md). The following example would look for the value in PHP equivalent of `$record->content->title` or `$record->content['title']` respectively.

```yaml
content[title]:
    name: Title
    sortable: false
```

The only drawback of doing this is the column cannot use searchable or sortable options. To make the column searchable, and for performance reasons, we recommend duplicating its value on the local database table using [model events](../extend/database/model.md). Alternatively, you can use the `relation` property described further below.

### Direct SQL Selection

The `select` property allows you to create a column using a custom select statement. Any valid SQL SELECT statement works here.

```yaml
full_name:
    label: Full Name
    select: concat(first_name, ' ', last_name)
```

### Related Column Selection

The `relation` property allows you to display related columns as part of the database query, allowing for searching and sorting of that column. The `relation` is set to the name of the [model relationship](../database/relations.md). In the next example the **name** value will be translated to the name attribute found in the related model (eg: `$model->name`).

```yaml
group_name:
    label: Group
    relation: groups
    select: name
```

To display a column that shows the number of related records, use the `relationCount` property.

```yaml
users_count:
    label: Users
    type: number
    relation: users
    relationCount: true
```

::: warning
Be careful not to name relations the same as existing database columns. For example, using a name `group_id` could break the group relation due to a naming conflict.
:::

### Tooltip

The `tooltip` property enhances list columns by adding an informational icon in the column header. Hovering over this icon displays a tooltip, offering additional context or details about the column. This feature aids in providing users with guidance or clarification for understanding column content.

```yaml
count:
    label: Count
    type: number
    tooltip: Number of users in the group
```

In addition to providing a tooltip `title`, you can also specify the `icon` ([available icons](../element/available-icons.md)) and the `placement` (`right`, `bottom`, `left`, default value is `top`) of the tooltip.

```yaml
count:
    label: Count
    type: number
    tooltip:
        title: Number of users in the group
        placement: bottom
        icon: icon-users
```
