---
subtitle: 表单字段
shortname: Checkbox List
---
# Checkbox List 字段

`checkboxlist` 字段渲染一个复选框列表。复选框列表支持与[下拉字段类型](./field-dropdown.md)相同的选项定义方法，也支持[单选字段类型](./field-radio.md)中的辅助描述。

```yaml
permissions:
    label: Permissions
    type: checkboxlist
    options:
        open_account: Open account
        close_account: Close account
        modify_account: Modify account
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**options** | 列表的可用选项，以数组形式。
**optionsMethod** | 从模型上定义的方法或静态方法获取选项，例如 `Class::method`。
**default** | 新记录使用的默认值。
**quickselect** | 显示快速选择按钮。
**cssClass** | 用于将选项设置为内联。
**inlineOptions** | 当选项少于 10 个时，将选项并排显示而不是堆叠显示。
**placeholder** | 没有选中记录时显示的消息（预览上下文）。
**cumulative** | 当复选框嵌套时，选中父项将选中所有子项。默认值：`false`

您可以使用 `default` 属性设置默认值，其中值是选项的键。

```yaml
permissions:
    label: Permissions
    type: checkboxlist
    default: open_account
```

通过将 `inlineOptions` 属性设置为 `true` 值，可以将选项内联显示而不是在单独的行中显示。这仅在可用选项少于 10 个时适用。

```yaml
permissions:
    type: checkboxlist
    inlineOptions: true
```

当列表超过 10 个项目时，将出现带有"全选"和"全不选"按钮的快速选择菜单。要显式启用这些按钮，请使用 `quickselect` 选项。

```yaml
permissions:
    type: checkboxlist
    quickselect: true
```

使用[详细选项](../define-options.md)时，复选框可以以嵌套结构显示，如果您希望在选中父复选框时选中所有子复选框，请将 `cumulative` 属性设置为 `true`。

```yaml
permissions:
    type: checkboxlist
    cumulative: true
```

#### 另请参阅

::: also
* [详细选项定义](../define-options.md)
* [Dropdown 表单字段](./field-dropdown.md)
* [Radio 表单字段](./field-radio.md)
:::
