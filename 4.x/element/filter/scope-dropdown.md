---
subtitle: Filter Scope
shortname: Dropdown
---
# Dropdown Scope

`dropdown` - filter using a single selection of multiple items.

```yaml
status:
    type: dropdown
    options:
        pending: Pending
        active: Active
        closed: Closed
```

The following properties are available for the filter.

Property | Description
------------- | -------------
**options** | available options for the filter, as an array.
**optionsMethod** | take options from a method defined on the model or as a static method, eg `Class::method`.
**conditions** | a custom SQL select statement to use for the filter.
**emptyOption** | text to display when there is no available selections.
**modelScope** | applies a [model query scope](../../extend/database/model.md) method to the filter query, can be a model method name or a static PHP class method (`Class::method`). The first argument will contain the model query that the widget will be attaching its value to, i.e. the parent model.

You may pass custom SQL to the conditions as a string where `:value` contains the filtered value.

```yaml
status:
    type: dropdown
    conditions: status = :value
    # ...
```

The dropdown filter does not display a label, the `emptyOption` property can be used to set the default state.

```yaml
status:
    type: dropdown
    emptyOption: Select Status
    # ...
```

## PHP Interface

You may define a custom `modelScope` in the model using the following example.

```yaml
status:
    label: Status
    type: dropdown
    modelScope: applyStatusCode
    options:
        active: Active
        deleted: Deleted
```

The **scopeApplyStatusCode** method definition where the value is found in `$scope->value`.

```php
public function scopeApplyStatusCode($query, $scope)
{
    if ($scope->value === 'active') {
        return $query->withoutTrashed();
    }

    if ($scope->value === 'deleted') {
        return $query->onlyTrashed();
    }
}
```

You may dynamically supply options by passing a model method to the `optionsMethod` property.

```yaml
status:
    label: Status
    type: dropdown
    optionsMethod: getStatusOptions
```

The **getStatusOptions** method definition.

```php
public function getStatusOptions()
{
    return [
        'active' => 'Active',
        'deleted' => 'Deleted',
    ];
}
```
