# Date

`date` - filer using a date value using `equals`, `between`, `before` and `after` condition logic.

```yaml
created_at:
    label: Created
    type: date
```

To only allow finding the exact date pass **equals** as a `condition`. To find results that contain any part of the text pass **between**, **before** or **after** to the conditions instead.

```yaml
created_at:
    label: Created
    type: date
    conditions:
        equals: true
```

You may pass a `default` value, ensuring it is wrapped in quotes to represent a string.

```yaml
created_at:
    label: Created
    type: date
    default: '2020-01-02'
```

You may set the `minDate` and `maxDate` to determine the minimum and maximum available date range.

```yaml
created_at:
    label: Date
    type: date
    minDate: '2001-01-23'
    maxDate: '2030-10-13'
```

You may pass custom SQL to the conditions as a string with supporting values.

```yaml
created_at:
    label: Created
    type: date
    conditions:
        before: created_at <= ':value'
        between: created_at >= ':after' AND created_at <= ':before'
```

The following parameters are supported.

- `:value`: selected date formatted as `Y-m-d 00:00:00`
- `:valueDate`: selected date formatted as `Y-m-d`
- `:before`: before date formatted as `Y-m-d 00:00:00`
- `:beforeDate`: before date formatted as `Y-m-d`
- `:after`: afterwards date formatted as `Y-m-d 00:00:00`
- `:afterDate`: afterwards date formatted as `Y-m-d`

Alternatively, you may define a custom `modelScope` in the model using the following example.

```yaml
created_at:
    label: Created
    type: date
    modelScope: dateFilter
```

The **scopeDateFilter** method definition with values found in `$scope->value`, `$scope->before` and `$scope->after`.

```php
function scopeDateFilter($query, $scope)
{
    if ($scope->condition === 'equals') {
        $query->where('created_at', $scope->value);
    }
    elseif ($scope->condition === 'between') {
        $query
            ->where('created_at', '>=', $scope->after)
            ->where('created_at', '<=', $scope->before);
    }
    elseif ($scope->condition === 'after') {
        $query->where('created_at', '>=', $scope->after);
    }
    else {
        $query->where('created_at', '<=', $scope->before);
    }
}
```
