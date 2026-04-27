---
subtitle: 表单字段
shortname: Checkbox
---
# Checkbox 字段

`checkbox` 字段渲染一个单独的复选框。

```yaml
show_content:
    type: checkbox
    label: Display content
```

以下[字段属性](../form-fields.md)常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 新记录使用的默认值。
**comment** | 在复选框下方显示的文本。

您可以使用 `default` 属性默认选中复选框。

```yaml
show_content:
    type: checkbox
    label: Display content
    default: true
```

使用 `comment` 显示一些附带文本。

```yaml
is_active:
    type: checkbox
    label: Active
    comment: Check this box to make the record active.
```
