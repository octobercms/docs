---
subtitle: 表单小部件
shortname: Relation
---
# Relation 字段

`relation` - 根据字段关系类型渲染下拉列表或复选框列表。单数关系显示下拉列表，多数关系显示复选框列表。用于显示每个关系的标签来源于 `nameFrom` 或 `select` 定义。

```yaml
categories:
    label: Categories
    type: relation
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**comment** | 在字段下方放置描述性注释。
**nameFrom** | 用于显示关系标签的模型属性名称。默认值：`name`。
**excludeFrom** | 用于在列表中排除相关键的父模型属性，可选。
**select** | 用于名称的自定义 SQL select 语句。
**emptyOption** | 没有可用选项时显示的文本。
**conditions** | 指定应用于模型查询的原始 where 查询语句。
**modelScope** | 将[模型查询范围](../../extend/database/model.md)方法应用于**关联表单模型**，可以是模型方法名或静态 PHP 类方法（`Class::method`）。
**defaultSort** | 设置默认排序列和方向，支持字符串作为列名或包含 `column` 和 `direction` 键的数组。方向可以是 `asc`（升序，默认）或 `desc`（降序）。
**useController** | 自动检测此字段是否配置了[关联控制器行为](../../extend/forms/relation-controller.md)并使用它。默认值：`true`
**controller** | 指定一个数组以手动配置与[关联控制器行为](../../extend/forms/relation-controller.md)的集成。

使用 `nameFrom` 属性自定义关联记录使用的标签。

```yaml
categories:
    label: Categories
    type: relation
    nameFrom: title
```

或者，您可以使用自定义 `select` 语句填充标签。任何有效的 SQL 语句都可以在此使用。

```yaml
user:
    label: User
    type: relation
    select: concat(first_name, ' ', last_name)
```

## 应用条件

您可以使用以下方法通过 SQL 或 PHP 条件过滤可用记录。

### SQL 查询条件

您可以使用 `conditions` 属性通过原始 SQL 查询限制关联模型。

```yaml
user:
    label: User
    type: relation
    conditions: is_featured = true
```

该值还支持从父模型属性解析的简单参数。参数名称以冒号（`:`）字符开头。

```yaml
country:
    label: Country
    type: relation

state:
    label: State
    type: relation
    dependsOn: country
    conditions: custom_country_id = :country_id
```

### PHP 查询范围

您可以使用 `modelScope` 属性提供用于过滤结果的模型范围。

```yaml
user:
    label: User
    type: relation
    modelScope: withTrashed
```

`modelScope` 可用于连接两个关联字段，例如连接 `Country` 和 `State` 模型，其中可用的州按所选国家进行过滤。`dependsOn` 属性启用[字段依赖](../../extend/forms/field-dependencies.md)，并在选择 `country` 时更新 `state` 选项。

```yaml
country:
    label: Country
    type: relation

state:
    label: State
    type: relation
    dependsOn: country
    modelScope: filterStates
```

`modelScope` 值 **filterStates** 对应于 `State` 模型中定义的 `scopeFilterStates` 方法。提供给[模型查询范围](../../extend/database/model.md)的 `$model`（第二个参数）允许您捕获所选国家并过滤可用选项。

```php
public function scopeFilterStates($query, $model)
{
    if ($countryId = $model->country_id) {
        $query->where('country_id', $countryId);
    }
}
```

## 关联控制器集成

如果控制器实现了[关联控制器行为](../../extend/forms/relation-controller.md)并且字段在那里定义，则将使用该定义来显示。将 `useController` 属性设置为 false 以禁用此功能。

```yaml
countries:
    label: Categories
    type: relation
    useController: false
```

`controller` 属性可用于指定内联配置。

```yaml
products:
    label: Products
    tab: Products
    type: relation
    controller:
        label: Product
        list: $/october/test/models/product/columns.yaml
        form: $/october/test/models/product/fields.yaml
```
