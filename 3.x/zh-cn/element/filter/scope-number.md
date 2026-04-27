---
subtitle: 过滤器范围
shortname: Number
---
# Number 范围

`number` - 使用数字值进行过滤，支持 `exact`、`between`、`greater` 和 `lesser` 条件逻辑。

```yaml
age:
    label: Age
    type: number
    conditions:
        greater: true
```

以下属性可用于过滤器。

属性 | 描述
------------- | -------------
**default** | 为过滤器指定默认值。
**conditions** | 对于每个条件，设置为 `true` 或 `false` 使其可用，或作为字符串，可以是所选条件的自定义 SQL 语句。默认值：`true`。
**modelScope** | 将[模型查询范围](../../extend/database/model.md)方法应用于过滤器查询，可以是模型方法名或静态 PHP 类方法（`Class::method`）。第一个参数将包含小部件将其值附加到的模型，即父模型。

以下 `conditions` 可用于过滤。

条件 | 描述
------------- | -------------
**exact** | 精确匹配数字
**between** | 在两个提供的数字之间
**greater** | 大于提供的数字
**lesser** | 小于提供的数字

您可以设置 `default` 值来设置默认过滤值。

```yaml
age:
    label: Age
    type: number
    default: 14
```

您可以将自定义 SQL 作为字符串传递给条件，其中 `:value`、`:min` 和 `:max` 包含过滤值。

```yaml
age:
    label: Age
    type: number
    conditions:
        greater: age >= :value
        between: age >= :min and age <= :max
```

## PHP 接口

您可以使用以下示例在模型中定义自定义 `modelScope`。

```yaml
age:
    label: Age
    type: number
    modelScope: numberFilter
```

**scopeNumberFilter** 方法定义，其中值在 `$scope->value`、`$scope->min` 和 `$scope->max` 中找到。

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
