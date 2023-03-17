---
subtitle: Filter Scope
---
# Number

`number` - filter using a numeric value using `exact`, `between`, `greater` and `lesser` condition logic.

```yaml
age:
    label: Age
    type: number
    conditions:
        greater: true
```

The following properties are available for the filter.

Property | Description
------------- | -------------
**default** | specifies a default value for the filter.
**conditions** | for each condition, set to `true` or `false` to make it available, or as a string, can be custom SQL statement for selected conditions. Default: `true`.
**modelScope** | applies a [query scope method](../../extend/database/model.md) to the filter query, can be a model method name or a static PHP class method (`Class::method`). The first argument will contain the model that the widget will be attaching its value to, i.e. the parent model.

The following `conditions` are available for filtering.

Condition | Description
------------- | -------------
**exact** | is matching the exact number
**between** | is between two supplied numbers
**greater** | is greater than the supplied number
**lesser** | is less than the supplied number

You may set `default` value to set the default filter value.

```yaml
age:
    label: Age
    type: number
    default: 14
```

You may pass custom SQL to the conditions as a string where `:value`, `:min` and `:max` contain the filtered values.

```yaml
age:
    label: Age
    type: number
    conditions:
        greater: age >= :value
        between: age >= ':min' and age <= ':max'
```

## PHP Interface

You may define a custom `modelScope` in the model using the following example.

```yaml
age:
    label: Age
    type: text
    modelScope: numberFilter
```

The **scopeNumberFilter** method definition with values found in `$scope->value`, `$scope->min` and `$scope->max`.

```php
function scopeNumberFilter($query, $scope)
{
    if ($scope->condition === 'equals') {
        $query->where('age', $scope->value);
    }
    elseif ($scope->condition === 'between') {
        $query
            ->where('age', '>=', $scope->min)
            ->where('age', '<=', $scope->max);
    }
    elseif ($scope->condition === 'greater') {
        $query->where('age', '>=', $scope->value);
    }
    else {
        $query->where('age', '<=', $scope->value);
    }
}
```
