---
subtitle: Filter Scope
---
# Text

`text` - filter using a plain text input with either `exact` or `contains` condition logic.

```yaml
username:
    label: Username
    type: text
```

The following properties are available for the filter.

Property | Description
------------- | -------------
**conditions** | for each condition, set to `true` or `false` to make it available, or as a string, can be custom SQL statement for selected conditions. Default: `true`.
**modelScope** | applies a [query scope method](../../extend/database/model.md) to the filter query, can be a model method name or a static PHP class method (`Class::method`). The first argument will contain the model that the widget will be attaching its value to, i.e. the parent model.

The following `conditions` are available for filtering.

Condition | Description
------------- | -------------
**exact** | is matching the exact text
**contains** | contains the text

To only allow finding the exact text pass **exact** as a `condition`. To find results that contain any part of the text pass **contains** to the conditions instead.

```yaml
username:
    label: Username
    type: text
    conditions:
        exact: true
```

You may pass custom SQL to the conditions as a string where `:value` contains the filtered value.

```yaml
username:
    label: Username
    type: text
    conditions:
        exact: username = :value
        contains: username like '%:value%'
```

## PHP Interface

You may define a custom `modelScope` in the model using the following example.

```yaml
username:
    label: Username
    type: text
    modelScope: textFilter
```

The **scopeTextFilter** method definition where the value is found in `$scope->value`.

```php
function scopeTextFilter($query, $scope)
{
    if ($scope->condition === 'exact') {
        $query->where('username', $scope->value);
    }
    else {
        $query->where('username', 'LIKE', "%{$scope->value}%");
    }
}
```
