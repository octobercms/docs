---
subtitle: 表单字段
shortname: Balloon Selector
---
# Balloon Selector 字段

`balloon-selector` 字段渲染一个列表，一次只能选择一个项目。Balloon 选择器支持与[下拉字段类型](./field-dropdown.md)相同的选项定义方法。

```yaml
gender:
    type: balloon-selector
    label: Gender
    options:
        female: Female
        male: Male
```

以下[字段属性](../form-fields.md)常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 新记录使用的默认值。
**comment** | 在字段下方放置描述性注释。
**options** | 下拉列表的可用选项，以数组形式。
**optionsMethod** | 从模型上定义的方法或静态方法获取选项，例如 `Class::method`。
**allowEmpty** | 允许通过点击活动项目来取消选择，默认值：`false`。

您可以使用 `default` 属性设置默认值，其中值是选项的键。

```yaml
gender:
    type: balloon-selector
    label: Gender
    default: female
```

将 `allowEmpty` 属性设置为 **true** 以允许用户通过取消选择活动项目来设置空值。

```yaml
gender:
    type: balloon-selector
    label: Gender
    allowEmpty: true
```

#### 另请参阅

::: also
* [Dropdown 表单字段](./field-dropdown.md)
:::
