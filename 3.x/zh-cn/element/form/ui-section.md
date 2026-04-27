---
subtitle: 表单 UI
shortname: Section
---
# Section 字段

`section` UI 元素渲染一个标题和副标题。`label` 和 `comment` 值是可选的，分别包含标题和副标题的内容。

```yaml
_section1:
    type: section
    label: User details
    comment: This section contains details about the user.
```

支持以下[字段属性](../form-fields.md)。

属性 | 描述
------------- | -------------
**label** | 区块的标题文本。
**comment** | 区块的辅助文本。
**displayMode** | 确定区块的显示方式，可选 `simple` 或 `heading`。默认值：`heading`

要在区块中显示简单注释而不是标题，请设置 `displayMode` 属性。

```yaml
_section1:
    type: section
    label: These fields are used to calculate some other fields.
    displayMode: simple
```
