---
subtitle: Filter Scope
---
# Date

`date` - filer using a date value using `equals`, `between`, `before` and `after` condition logic.

```yaml
created_at:
    label: Created
    type: date
```

The following properties are available for the filter.

Property | Description
------------- | -------------
**minDate** | the minimum/earliest date that can be selected.
**maxDate** | the maximum/latest date that can be selected.
**firstDay** | the first day of the week. Default: `0` (Sunday).
**showWeekNumber** | show week numbers at head of row. Default: `false`
**useTimezone** | convert the date and time from the backend specified timezone preference. Default: `true`
**conditions** | for each condition, set to `true` or `false` to make it available, or as a string, can be custom SQL statement for selected conditions. Default: `true`.

The following `conditions` are available for filtering.

Condition | Description
------------- | -------------
**equals** | is within the selected date from start to end of day
**notEquals** | is not within the selected date from start to end of day
**between** | is between the two selected dates
**before** | is before the selected date
**after** | is after the selected date


The filtered value is automatically converted to the backend timezone preference, you may disable this using the `useTimezone` option.

```yaml
created_at:
    label: Created
    type: date
    useTimezone: false
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

## PHP Interface

For access in PHP, you may define a custom `modelScope` in the model using the following example.

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
    elseif ($scope->condition === 'notEquals') {
        $query->where('created_at', '<>', $scope->value);
    }
    elseif ($scope->condition === 'between') {
        $query
            ->where('created_at', '>=', $scope->after)
            ->where('created_at', '<=', $scope->before);
    }
    elseif ($scope->condition === 'after') {
        $query->where('created_at', '>=', $scope->value);
    }
    else {
        $query->where('created_at', '<=', $scope->value);
    }
}
```
