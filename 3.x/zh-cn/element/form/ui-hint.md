---
subtitle: 表单 UI
shortname: Hint
---
# Hint 字段

`hint` UI 元素与 [partial 元素](./ui-partial.md)相同，但渲染在一个可被用户关闭的提示容器中。

```yaml
_hint1:
    type: hint
    path: content_field
```

支持以下[字段属性](../form-fields.md)。

属性 | 描述
------------- | -------------
**label** | 区块的标题文本。
**comment** | 区块的辅助文本。
**mode** | 视觉显示模式，可选：`tip`、`info`、`warning`、`danger`、`success`。默认值：`info`。
**path** | [部件视图文件](../../extend/system/views.md)的路径。

hint 支持字段内联内容。`label` 和 `comment` 值是可选的，分别包含标题和副标题的内容。您也可以在值中使用 Markdown 语法。

```yaml
_tip1:
    type: hint
    mode: tip
    label: Pro Tip
    comment: Always check to make sure this field is populated.
```

`mode` 属性支持以下值：tip、info、warning、danger、success

```yaml
_warning1:
    type: hint
    mode: warning
    label: Always wash your hands
    comment: This is good for stopping the spread of germs.
```
