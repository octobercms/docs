---
subtitle: 过滤器范围
shortname: Group
---
# Group 范围

`group` - 使用多个项目的分组进行过滤，通常通过关联模型或预定义选项数组。

要按模型过滤，请指定 `modelClass` 和 `nameFrom` 属性以指定要使用的模型和属性。

```yaml
roles:
    label: Role
    type: group
    nameFrom: name
    modelClass: October\Test\Models\Role
```

以下属性可用于过滤器。

属性 | 描述
------------- | -------------
**options** | 过滤器的可用选项，以数组形式。
**optionsMethod** | 从模型上定义的方法或静态方法获取选项，例如 `Class::method`。
**optionsScope** | 将[模型范围方法](../filter-scopes.md)应用于选项查询。
**conditions** | 用于过滤器的自定义 SQL select 语句。
**nameFrom** | 模型类中使用的列名，用于显示名称。默认值：`name`。
**modelClass** | 用于可用过滤记录的模型类。
**modelScope** | 将[模型范围方法](../filter-scopes.md)应用于过滤器查询。
**matchMode** | 确定选择的应用方式，可选 `include`、`exclude` 或 `toggle`。默认值：`include`

要按数组过滤，请指定 `options` 属性。

```yaml
status:
    label: Role
    type: group
    options:
        developer: Developer
        publisher: Publisher
```

您可以将自定义 SQL 作为字符串传递给条件，其中 `:value` 包含过滤值。

```yaml
status:
    label: Role
    type: group
    conditions: role in (:value)
    # ...
```

您也可以将 `default` 值作为包含所选键的数组传递。

```yaml
status:
    # ...
    default:
        - developer
        - publisher
```

使用 `matchMode` 属性控制过滤器的应用方式，通过包含或排除所选项目。

```yaml
status:
    # ...
    matchMode: toggle
```

## PHP 接口

您可以使用以下示例在模型中定义自定义 `modelScope`。

```yaml
roles:
    label: Role
    type: group
    nameFrom: name
    modelClass: October\Test\Models\Role
    modelScope: groupFilter
```

**scopeGroupFilter** 方法定义，其中值在 `$scope->value` 中找到。

```php
public function scopeGroupFilter($query, $scope)
{
    return $query->whereHas('roles', function($q) use ($scope) {
        $q->whereIn('id', $scope->value);
    });
}
```

您可以通过将模型方法传递给 `optionsMethod` 属性来动态提供选项。

```yaml
roles:
    label: Role
    type: group
    nameFrom: name
    modelClass: October\Test\Models\Role
    optionsMethod: getRoleGroupOptions
```

**getRoleGroupOptions** 方法定义。

```php
public function getRoleGroupOptions()
{
    return $this->whereNull('parent_id')->pluck('name', 'id')->all();
}
```

`optionsScope` 属性允许您将范围应用于查找可用选项的默认查询。

```yaml
roles:
    label: Role
    type: group
    nameFrom: name
    modelClass: October\Test\Models\Role
    optionsScope: applyRoleOptionsFilter
```

```php
public function scopeApplyRoleOptionsFilter($query)
{
    return $query->where('id', '<>', 1);
}
```
