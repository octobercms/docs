---
subtitle: 了解如何使用范围过滤列表。
---
# 过滤器范围

过滤器范围是过滤器使用的范围定义，通常与列表结合使用。与列表列类似，它们在以下区域中使用：

- [后端列表控制器](../extend/lists/list-controller.md)
- [后端关联控制器](../extend/forms/relation-controller.md)

所有过滤器范围都通过各自的 **type** 属性来标识。

```yaml
scopes:
    myscope:
        type: date
        # ...
```

## 可用范围

以下过滤器范围可用：

<div class="content-list-p" markdown="1">

[Checkbox](./filter/scope-checkbox.md)
[Switch](./filter/scope-switch.md)
[Text](./filter/scope-text.md)
[Number](./filter/scope-number.md)
[Dropdown](./filter/scope-dropdown.md)
[Group](./filter/scope-group.md)
[Date](./filter/scope-date.md)

</div>

## 范围属性

对于每个范围，您可以指定以下属性（如适用）。

属性 | 描述
------------- | -------------
**label** | 向用户显示过滤器范围时使用的名称。
**type** | 定义此范围的显示方式。默认值：`group`。
**conditions** | 启用或禁用条件函数，或指定要应用于每个条件的原始 where 查询语句，详情请参阅范围类型定义。
**modelClass** | 用作数据源和本地方法调用引用的模型类。
**modelScope** | 指定在**列表模型**上定义的[模型查询范围](../extend/database/model.md)方法，应用于列表查询。第一个参数将包含查询对象（与常规范围方法相同），第二个参数将包含范围定义，包括其填充的值。
**options** | 按多个项目过滤时使用的选项，以数组形式提供。
**optionsMethod** | 从模型上定义的方法名或作为静态方法调用请求选项，例如 `Class::method`。
**emptyOption** | 用于有意空选择的可选标签。
**default** | 为过滤器提供默认值，可以是数组、字符串或整数，具体取决于过滤器值。
**permissions** | 当前后端用户必须拥有的[权限](../extend/backend/permissions.md)才能使用过滤器范围。支持单个权限的字符串或权限数组（只需其中一个即可授予访问权限）。
**dependsOn** | 此范围依赖的其他范围名称的字符串或数组。当其他范围被修改时，此范围将重置。
**nameFrom** | 用于显示过滤器标签的模型属性名称。默认值：`name`。
**valueFrom** | 定义用于源值的模型属性。默认值来自范围名称。
**order** | 确定显示顺序时的数值权重，默认值每个范围递增 100 点。
**after** | 使用显示顺序（+1）将此范围放置在另一个现有范围名称之后。
**before** | 使用显示顺序（-1）将此范围放置在另一个现有范围名称之前。

### 应用模型范围

大多数过滤器将使用合理的默认值应用其范围约束。`modelScope` 属性可用于使用[模型范围方法定义](../extend/database/model.md)将自定义约束应用于过滤器查询。

```yaml
myfilter:
    label: My Filter
    type: group
    modelScope: applyMyFilter
```

在上面的示例中，我们期望在主模型上有一个名为 **myfilter** 的关联，并且在关联模型上定义了一个名为 **scopeApplyMyFilter** 的方法。第二个参数将包含范围定义，包括其填充的值。

```php
public function scopeApplyMyFilter($query, $scope)
{
    return $query->whereIn('my_filter_attribute', (array) $scope->value);
}
```

`modelScope` 属性也可以定义为静态 PHP 类方法（`Class::method`）。

```yaml
myfilter:
    label: My Filter
    type: group
    modelScope: "App\MyCustomClass::applyMyFilter"
```

在此示例中，该方法应在指定的类名上声明为静态方法。

```php
namespace App;

class MyCustomClass
{
    public static function applyMyFilter($query, $scope)
    {
        return $query->whereIn('my_filter_attribute', (array) $scope->value);
    }
}
```

### 范围依赖

`dependsOn` 属性允许您将多个过滤器链接在一起。当依赖项被修改时，过滤器范围将重置以允许新的条件。以下是两个范围定义的示例。

```yaml
country:
    label: Country
    type: group

state:
    label: State
    type: group
    dependsOn: country
    optionsMethod: getCityOptionsForFilter
```

state 范围依赖于 country 范围的值，选项在 PHP 中使用 **getCityOptionsForFilter** 方法进行过滤。此方法的第一个参数将包含整组范围定义，包括它们的当前值。

```php
public function getCityOptionsForFilter($scopes = null)
{
    if ($scopes->country && ($countryIds = $scopes->country->value)) {
        return self::whereIn('country_id', $countryIds)->lists('name', 'id');
    }

    return self::lists('name', 'id');
}
```
