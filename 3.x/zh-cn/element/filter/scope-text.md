---
subtitle: 过滤器范围
shortname: Text
---
# Text 范围

`text` - 使用纯文本输入进行过滤，支持 `exact` 或 `contains` 条件逻辑。

```yaml
username:
    label: Username
    type: text
```

以下属性可用于过滤器。

属性 | 描述
------------- | -------------
**conditions** | 对于每个条件，设置为 `true` 或 `false` 使其可用，或作为字符串，可以是所选条件的自定义 SQL 语句。默认值：`true`。
**modelScope** | 将[模型查询范围](../../extend/database/model.md)方法应用于过滤器查询，可以是模型方法名或静态 PHP 类方法（`Class::method`）。第一个参数将包含小部件将其值附加到的模型，即父模型。

以下 `conditions` 可用于过滤。

条件 | 描述
------------- | -------------
**equals** | 精确匹配文本
**contains** | 包含文本

要仅允许查找精确文本，请将 **equals** 作为 `condition` 传递。要查找包含文本任何部分的结果，请将 **contains** 传递给条件。

```yaml
username:
    label: Username
    type: text
    conditions:
        equals: true
```

您可以将自定义 SQL 作为字符串传递给条件，其中 `:value` 包含过滤值。

```yaml
username:
    label: Username
    type: text
    conditions:
        equals: username = :value
        contains: username like %:value%
```

## PHP 接口

您可以使用以下示例在模型中定义自定义 `modelScope`。

```yaml
username:
    label: Username
    type: text
    modelScope: textFilter
```

**scopeTextFilter** 方法定义，其中值在 `$scope->value` 中找到。

```php
function scopeTextFilter($query, $scope)
{
    if ($scope->condition === 'equals') {
        $query->where('username', $scope->value);
    }
    else {
        $query->where('username', 'LIKE', "%{$scope->value}%");
    }
}
```
