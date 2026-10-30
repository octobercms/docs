---
subtitle: Learn how to filter lists using scopes.
---
# Filter Scopes

Filter Scopes are scope definitions used by filters, often in conjunction with a list. Similar to list columns these are referenced by the following areas:

- [Backend List Controller](../extend/lists/list-controller.md)
- [Backend Relation Controller](../extend/forms/relation-controller.md)

All filter scopes are identified as their individual **type** property.

```yaml
scopes:
    myscope:
        type: date
        # ...
```

## Available Scopes

The following filter scopes are available:

<div class="content-list-p" markdown="1">

[Checkbox](./filter/scope-checkbox.md)
[Switch](./filter/scope-switch.md)
[Text](./filter/scope-text.md)
[Number](./filter/scope-number.md)
[Dropdown](./filter/scope-dropdown.md)
[Group](./filter/scope-group.md)
[Date](./filter/scope-date.md)

</div>

## Scope Properties

For each scope you can specify these properties (where applicable).

Property | Description
------------- | -------------
**label** | a name when displaying the filter scope to the user.
**type** | defines how this scope should be displayed. Default: `group`.
**conditions** | enables or disables condition functions or specifies a raw where query statement to apply to each condition, see the scope type definition for details.
**modelClass** | class of the model to use as a data source and reference for local method calls.
**modelScope** | specifies a [model query scope](../extend/database/model.md) method defined in the **list model** to apply to the list query. The first argument will contain the query object (as per a regular scope method) and the second argument will contain the scope definition, including its populated value(s).
**options** | options to use if filtering by multiple items, supplied as an array.
**optionsMethod** | request options from a method name defined on the model or as a static method call, eg `Class::method`.
**emptyOption** | an optional label for an intentional empty selection.
**default** | supply a default value for the filter, as either array, string or integer depending on the filter value.
**permissions** | the [permissions](../extend/backend/permissions.md) that the current backend user must have in order for the filter scope to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.
**dependsOn** | a string or an array of other scope names that this scope depends on. When the other scopes are modified, this scope will reset.
**nameFrom** | a model attribute name used for displaying the filter label. Default: `name`.
**valueFrom** | defines a model attribute to use for the source value. Default comes from the scope name.
**order** | a numerical weight when determining the display order, default value increments at 100 points per scope.
**after** | place this scope after another existing scope name using the display order (+1).
**before** | place this scope before another existing scope name using the display order (-1).

### Applying Model Scopes

Most filters will apply their scoped constraints using sensible defaults. The `modelScope` property can be used to apply custom constraints to the filter query using a [model scope method definition](../extend/database/model.md).

```yaml
myfilter:
    label: My Filter
    type: group
    modelScope: applyMyFilter
```

In the above example, we expect a relation on the primary model called **myfilter** and a method defined named **scopeApplyMyFilter** on the related model. The second argument contains the second argument will contain the scope definition, including its populated value(s).

```php
public function scopeApplyMyFilter($query, $scope)
{
    return $query->whereIn('my_filter_attribute', (array) $scope->value);
}
```

The `modelScope` property can also be defined as a static PHP class method (`Class::method`).

```yaml
myfilter:
    label: My Filter
    type: group
    modelScope: "App\MyCustomClass::applyMyFilter"
```

In this example, the method should be declared statically on the specified class name.

```php
namespace App;

class MyCustomClass
{
    public static function applyMyFilter($query, $scope)
    {
        return $query->whereIn('my_filter_attribute', (array) $scope->value);
    }
}
```

### Scope Dependencies

The `dependsOn` property allows you to link multiple filters together. When a dependency is modified, the filter scope will reset to allow for new conditions. Take the following example of two scope definitions.

```yaml
country:
    label: Country
    type: group

state:
    label: State
    type: group
    dependsOn: country
    optionsMethod: getCityOptionsForFilter
```

The state scope depends on the value of the country scope, and the options are filtered in PHP using the **getCityOptionsForFilter** method. The first argument of this method will contain the entire set of scope definitions, including their current values.

```php
public function getCityOptionsForFilter($scopes = null)
{
    if ($scopes->country && ($countryIds = $scopes->country->value)) {
        return self::whereIn('country_id', $countryIds)->lists('name', 'id');
    }

    return self::lists('name', 'id');
}
```
