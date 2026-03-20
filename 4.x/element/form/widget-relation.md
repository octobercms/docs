---
subtitle: Form Widget
shortname: Relation
---
# Relation Field

`relation` - renders either a dropdown or checkbox list according to the field relation type. Singular relationships display a dropdown, multiple relationships display a checkbox list. The label used for displaying each relation is sourced by the `nameFrom` or `select` definition.

```yaml
categories:
    label: Categories
    type: relation
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**comment** | places a descriptive comment below the field.
**nameFrom** | a model attribute name used for displaying the relation label. Default: `name`.
**excludeFrom** | a parent model attribute used to exclude related keys in the list, optional.
**select** | a custom SQL select statement to use for the name.
**emptyOption** | text to display when there is no available selections.
**conditions** | specifies a raw where query statement to apply to the model query.
**modelScope** | applies a [model query scope](../../extend/database/model.md) method to the **related form model**, can be a model method name or a static PHP class method (`Class::method`).
**defaultSort** | sets a default sorting column and direction, supports a string for the column name or an array with keys `column` and `direction`. The direction can be `asc` for ascending (default) or `desc` for descending order.
**quickCreate** | adds a [quick create](#quick-create) option to the dropdown for creating new related records on the fly. Accepts a string path to a fields definition file, or an object with extended options.
**useController** | automatically detects if this field configured with [Relation Controller behavior](../../extend/forms/relation-controller.md) and use it. Default: `true`
**controller** | specifies an array to manually configure integration with the [Relation Controller behavior](../../extend/forms/relation-controller.md).

Use the `nameFrom` property to customize the label used for the related record.

```yaml
categories:
    label: Categories
    type: relation
    nameFrom: title
```

Alternatively, you may populate the label using a custom `select` statement. Any valid SQL statement works here.

```yaml
user:
    label: User
    type: relation
    select: concat(first_name, ' ', last_name)
```

## Applying Conditions

You can filter the available records using SQL or PHP conditions using the approaches below.

### SQL Query Condition

You may limit the related model using a raw SQL query using the `conditions` property.

```yaml
user:
    label: User
    type: relation
    conditions: is_featured = true
```

The value also supports simple parameters parsed from the parent model attributes. The parameter names begin with a colon (`:`) character.

```yaml
country:
    label: Country
    type: relation

state:
    label: State
    type: relation
    dependsOn: country
    conditions: custom_country_id = :country_id
```

### PHP Query Scopes

You can provide a model scope to use to filter the results with the `modelScope` property.

```yaml
user:
    label: User
    type: relation
    modelScope: withTrashed
```

The `modelScope` can be used to connect two related fields, for example, connecting a `Country` and `State` model, where the available states are filtered by the selected country. The `dependsOn` property enables [field dependencies](../../extend/forms/field-dependencies.md) and updates the `state` options when a `country` is selected.

```yaml
country:
    label: Country
    type: relation

state:
    label: State
    type: relation
    dependsOn: country
    modelScope: filterStates
```

The `modelScope` value **filterStates** translates to the `scopeFilterStates` method defined in the `State` model. The `$model` (second argument) supplied to the [model query scope](../../extend/database/model.md) lets you capture the selected country and filter the available options.

```php
public function scopeFilterStates($query, $model)
{
    if ($countryId = $model->country_id) {
        $query->where('country_id', $countryId);
    }
}
```

## Quick Create

The `quickCreate` property adds a special option to the dropdown that opens a popup form for creating a new related record on the fly. This is only available for singular relations (belongsTo, hasOne, morphOne) that render as a dropdown.

```yaml
manufacturer:
    label: Manufacturer
    type: relation
    nameFrom: title
    quickCreate: $/acme/shop/models/manufacturer/fields.yaml
```

When configured, the dropdown will include an additional option (e.g. "- Create New Manufacturer -") at the top. Selecting it opens a popup form using the specified fields definition. After the record is created, the dropdown refreshes with the new record selected.

The `quickCreate` property accepts a string path to a [form fields definition](../form-fields.md) file, or an object with the following options.

```yaml
manufacturer:
    label: Manufacturer
    type: relation
    nameFrom: title
    quickCreate:
        fields: $/acme/shop/models/manufacturer/fields.yaml
        optionText: Create New Manufacturer
        title: New Manufacturer
        context: quickcreate
        popupSize: large
```

Property | Description
------------- | -------------
**fields** | path to a [form fields definition](../form-fields.md) file used for the popup form. Required.
**optionText** | text shown in the dropdown option. Default: `- Create New :name -` where `:name` is replaced with the field label.
**title** | title shown in the popup modal header. Default: `New :name`.
**context** | form context passed to the popup form. Default: `quickcreate`.
**popupSize** | popup size, can be `giant`, `huge`, `large`, `small`, `tiny` or `adaptive`. Default: `adaptive`.

::: tip
The `quickCreate` feature is automatically disabled when the field is in preview mode, read-only mode, or when using the [Relation Controller](#relation-controller-integration).
:::

## Relation Controller Integration

If the controller implements the [Relation Controller behavior](../../extend/forms/relation-controller.md) and the field is defined there, then it will be displayed using this definition. Set the `useController` property to false to disable this functionality.

```yaml
countries:
    label: Categories
    type: relation
    useController: false
```

The `controller` property may be used to specify inline configuration.

```yaml
products:
    label: Products
    tab: Products
    type: relation
    controller:
        label: Product
        list: $/october/test/models/product/columns.yaml
        form: $/october/test/models/product/fields.yaml
```
