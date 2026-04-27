---
subtitle: 表单小部件
shortname: Tag List
---
# Tag List 字段

`taglist` 表单小部件渲染一个用于输入标签列表的字段。

```yaml
tags:
    type: taglist
    separator: space
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**mode** | 控制值的返回方式，可选 `string`、`array` 或 `relation`。默认值：`string`
**separator** | 用指定字符分隔标签，可选 `comma` 或 `space`。默认值：`comma`
**customTags** | 允许用户手动输入自定义标签。默认值：`true`
**options** | 为预定义选项指定数组。
**optionsMethod** | 为预定义选项指定方法名称，在模型上定义或作为静态方法，例如 `Class::method`。设置为 `true` 以使用模型的 **get*Field*Options** 方法。
**nameFrom** | 如果使用关系模式，用于显示标签名称的模型属性名称。默认值：`name`
**useKey** | 使用键而不是值来保存和读取数据。默认值：`false`
**maxItems** | 可以包含或选择的最大标签数量。

标签列表支持与[下拉字段类型](./field-dropdown.md)相同的选项定义方法。

```yaml
tags:
    type: taglist
    options:
        - Red
        - Blue
        - Orange
```

您可以使用名为 **relation** 的 `mode`，其中字段名称是[多对多关系](../../extend/database/relations.md)。这将通过关系自动获取和分配标签。如果支持自定义标签，它们将在分配之前被创建。

```yaml
tags:
    type: taglist
    mode: relation
```

#### 另请参阅

::: also
* [Dropdown 表单字段](./field-dropdown.md)
:::
