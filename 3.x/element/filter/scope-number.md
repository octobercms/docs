# Number

`number` - filter using a numeric value using `exact`, `between`, `greater` and `lesser` condition logic.

```yaml
age:
    label: Age
    type: number
    default: 14
    conditions:
        greater: true
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

Alternatively, you may define a custom `modelScope` in the model using the following example.

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
