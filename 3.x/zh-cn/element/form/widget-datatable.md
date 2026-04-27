---
subtitle: 表单小部件
shortname: Data Table
---
# Data Table 字段

`datatable` - 渲染一个可编辑的记录表格，以网格形式显示。单元格内容可以直接在网格中编辑，允许管理多行多列的信息。

```yaml
data:
    type: datatable
    adding: true
    deleting: true
    columns: []
    recordsPerPage: false
    searching: false
```

::: tip
要将此字段与模型一起使用，该字段应在 [jsonable 属性](../../extend/system/models.md)中定义，或使用任何可以处理数组存储的方式。
:::

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------ | -----------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**adding** | 允许向数据表添加记录。默认值：`true`。
**btnAddRowLabel** | 为"在上方添加行"按钮定义自定义标签。
**btnAddRowBelowLabel** | 为"在下方添加行"按钮定义自定义标签。
**btnDeleteRowLabel** | 为"删除行"按钮定义自定义标签。
**columns** | 表示数据表列配置的数组。请参阅下方的*列配置*部分。
**deleting** | 允许从数据表中删除记录。默认值：`true`。
**dynamicHeight** | 如果为 `true`，数据表的高度将根据添加的记录扩展或收缩，最大不超过 `height` 配置值定义的大小。默认值：`false`。
**fieldName** | 定义在数据表发送的 POST 数据中使用的自定义字段名称。留空以使用默认字段别名。
**height** | 数据表的高度，以像素为单位。如果设置为 `false`，数据表将拉伸以适应字段容器。
**keyFrom** | 用于标识每条记录的数据属性。通常应设置为 `id`。仅支持整数值。
**postbackHandlerName** | 指定数据表内容将随之发送的 AJAX 处理程序名称。当设置为 `null`（默认值）时，处理程序名称将从包含数据表的表单所使用的请求名称中自动检测。建议保持为 `null`。
**recordsPerPage** | 每页显示的记录数。如果设置为 `false`，将禁用分页。
**searching** | 允许通过搜索框搜索记录。默认值：`false`。
**toolbar** | 表示数据表工具栏配置的数组。

#### 列配置

数据表小部件允许通过 `columns` 配置变量以数组形式指定列。每列应使用字段名称作为键，并使用以下配置变量来设置字段。

示例：

```yaml
columns:
    id:
        type: string
        title: ID
        validation:
            integer:
                message: Please enter a number
    name:
        type: string
        title: Name
```

选项 | 描述
------ | -----------
**type** | 此列单元格的输入类型。必须是以下之一：`string`、`checkbox`、`dropdown` 或 `autocomplete`。
**options** | 仅用于 `dropdown` 和 `autocomplete` 列。数组键定义选项值，数组值定义选项标签。请参阅下方的 AJAX 处理程序部分。
**readOnly** | 此列是否为只读。默认值：`false`。
**title** | 定义列的标题。
**validation** | 指定列单元格内容验证的数组。请参阅下方的*列验证*部分。
**width** | 定义列的宽度，以像素为单位。

#### 列验证

列单元格可以根据以下类型的验证进行验证。验证应指定为数组，验证类型用作键，可选的消息通过该验证的 `message` 属性指定。

验证 | 描述
---------- | -----------
**float** | 验证数据是否为浮点数。可提供可选的布尔值 `allowNegative` 属性，允许负浮点数。
**integer** | 验证数据是否为整数。可提供可选的布尔值 `allowNegative` 属性，允许负整数。
**length** | 验证数据是否为特定长度。必须提供整数 `min` 和 `max` 属性，表示必须输入的最少和最多字符数。
**regex** | 根据正则表达式验证数据。必须提供字符串 `pattern` 属性，定义用于测试数据的正则表达式。
**required** | 验证在保存前必须输入数据。

#### AJAX 处理程序

对于 `dropdown` 或 `autocomplete` 类型的列，可用选项列表可以通过模型中定义的 AJAX 处理程序提供。

处理程序必须遵循命名约定 `getFieldNameDataTableOptions()`，其中 `FieldName` 匹配表单配置中定义的字段名称。

该方法应返回一个关联数组，其中数组键用作存储值，数组值用作数据表中的显示标签。

例如，对于名为 **country** 的字段，使用 `getCountryDataTableOptions`。

```php
public function getCountryDataTableOptions()
{
    return Country::pluck('name', 'code')->all();
}
```

这将自动填充 DataTable 中 `country` 字段的选项。
