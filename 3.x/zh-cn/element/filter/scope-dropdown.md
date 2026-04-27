---
subtitle: 过滤器范围
shortname: Dropdown
---
# Dropdown 范围

`dropdown` - 使用多个项目中的单个选择进行过滤。

```yaml
status:
    type: dropdown
    options:
        pending: Pending
        active: Active
        closed: Closed
```

以下属性可用于过滤器。

属性 | 描述
------------- | -------------
**options** | 过滤器的可用选项，以数组形式。
**optionsMethod** | 从模型上定义的方法或静态方法获取选项，例如 `Class::method`。
**conditions** | 用于过滤器的自定义 SQL select 语句。
**emptyOption** | 没有可用选项时显示的文本。
**modelScope** | 将[模型查询范围](../../extend/database/model.md)方法应用于过滤器查询，可以是模型方法名或静态 PHP 类方法（`Class::method`）。第一个参数将包含小部件将其值附加到的模型查询，即父模型。

您可以将自定义 SQL 作为字符串传递给条件，其中 `:value` 包含过滤值。

```yaml
status:
    type: dropdown
    conditions: status = :value
    # ...
```

下拉过滤器不显示标签，`emptyOption` 属性可用于设置默认状态。

```yaml
status:
    type: dropdown
    emptyOption: Select Status
    # ...
```

## PHP 接口

您可以使用以下示例在模型中定义自定义 `modelScope`。

```yaml
status:
    label: Status
    type: dropdown
    modelScope: applyStatusCode
    options:
        active: Active
        deleted: Deleted
```

**scopeApplyStatusCode** 方法定义，其中值在 `$scope->value` 中找到。

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

您可以通过将模型方法传递给 `optionsMethod` 属性来动态提供选项。

```yaml
status:
    label: Status
    type: dropdown
    optionsMethod: getStatusOptions
```

**getStatusOptions** 方法定义。

```php
public function getStatusOptions()
{
    return [
        'active' => 'Active',
        'deleted' => 'Deleted',
    ];
}
```
