---
subtitle: 过滤器范围
shortname: Date
---
# Date 范围

`date` - 使用日期值进行过滤，支持 `equals`、`between`、`before` 和 `after` 条件逻辑。

```yaml
created_at:
    label: Created
    type: date
```

以下属性可用于过滤器。

属性 | 描述
------------- | -------------
**minDate** | 可以选择的最小/最早日期。
**maxDate** | 可以选择的最大/最晚日期。
**firstDay** | 一周的第一天。默认值：`0`（星期日）。
**showWeekNumber** | 在行首显示周数。默认值：`false`
**useTimezone** | 从后端指定的时区偏好转换日期和时间。默认值：`true`
**conditions** | 对于每个条件，设置为 `true` 或 `false` 使其可用，或作为字符串，可以是所选条件的自定义 SQL 语句。默认值：`true`。

以下 `conditions` 可用于过滤。

条件 | 描述
------------- | -------------
**equals** | 在所选日期的开始到结束范围内
**notEquals** | 不在所选日期的开始到结束范围内
**between** | 在两个所选日期之间
**before** | 在所选日期之前
**after** | 在所选日期之后

过滤值会自动转换为后端时区偏好，您可以使用 `useTimezone` 选项禁用此功能。

```yaml
created_at:
    label: Created
    type: date
    useTimezone: false
```

要仅允许查找精确日期，请将 **equals** 作为 `condition` 传递。要查找包含文本任何部分的结果，请将 **between**、**before** 或 **after** 传递给条件。

```yaml
created_at:
    label: Created
    type: date
    conditions:
        equals: true
```

您可以传递 `default` 值，确保用引号括起来以表示字符串。默认值可以设置为 **now** 以指定当前日期。

```yaml
created_at:
    label: Created
    type: date
    default: '2020-01-02'
```

您可以设置 `minDate` 和 `maxDate` 来确定最小和最大可用日期范围。

```yaml
created_at:
    label: Date
    type: date
    minDate: '2001-01-23'
    maxDate: '2030-10-13'
```

您可以将自定义 SQL 作为字符串传递给条件，并支持相关值。

```yaml
created_at:
    label: Created
    type: date
    conditions:
        before: created_at <= :value
        between: created_at >= :after AND created_at <= :before
```

支持以下参数。

- `:value`：所选日期，格式为 `Y-m-d 00:00:00`
- `:valueDate`：所选日期，格式为 `Y-m-d`
- `:before`：之前的日期，格式为 `Y-m-d 00:00:00`
- `:beforeDate`：之前的日期，格式为 `Y-m-d`
- `:after`：之后的日期，格式为 `Y-m-d 00:00:00`
- `:afterDate`：之后的日期，格式为 `Y-m-d`

## PHP 接口

要在 PHP 中访问，您可以使用以下示例在模型中定义自定义 `modelScope`。

```yaml
created_at:
    label: Created
    type: date
    modelScope: dateFilter
```

**scopeDateFilter** 方法定义，其中值在 `$scope->value`、`$scope->before` 和 `$scope->after` 中找到。

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
