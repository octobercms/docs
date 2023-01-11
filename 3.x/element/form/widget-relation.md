---
subtitle: Form Widget
---
# Relation

`relation` - renders either a dropdown or checkbox list according to the field relation type. Singular relationships display a dropdown, multiple relationships display a checkbox list. The label used for displaying each relation is sourced by the `nameFrom` or `select` definition.

```yaml
categories:
    label: Categories
    type: relation
```

The following properties are supported.

Property | Description
------------- | -------------
**nameFrom** | a model attribute name used for displaying the relation label. Default: name.
**select** | a custom SQL select statement to use for the name.
**emptyOption** | text to display when there is no available selections.
**conditions** | specifies a raw where query statement to apply to the model query.
**scope** | applies a [query scope method](../../extend/database/model.md) to the **related form model**, can be a model method name or a static PHP class method (`Class::method`).
**useController** | display the field using integration with [Relation Controller behavior](../../extend/forms/relation-controller.md). Default: `true`
**defaultSort** | sets a default sorting column and direction, supports a string for the column name or an array with keys `column` and `direction`.

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

## Filtering Available Records

You can provide a model scope to use to filter the results with the `scope` property.

```yaml
user:
    label: User
    type: relation
    scope: withTrashed
```

The `scope` can be used to connect two related fields, for example, connecting a `Country` and `State` model, where the available states are filtered by the selected country. The `dependsOn` property enables [field dependencies](../../extend/forms/field-dependencies.md) and updates the `state` options when a `country` is selected.

```yaml
country:
    label: Country
    type: relation

state:
    label: State
    type: relation
    scope: filterStates
    dependsOn: country
```

The `scope` value **filterStates** translates to the `scopeFilterStates` method defined in the `State` model. The `$model` (second argument) supplied to the [model query scope](../../extend/database/model.md) lets you capture the selected country and filter the available options.

```php
public function scopeFilterStates($query, $model)
{
    if ($countryId = $model->country_id) {
        $query->where('country_id', $countryId);
    }
}
```

## Relation Controller Integration

If the controller implements the [Relation Controller behavior](../../extend/forms/relation-controller.md) and the field is defined there, then it will be displayed using this definition. Set the `useController` property to false to disable this functionality.

```yaml
countries:
    label: Categories
    type: relation
    useController: false
```

