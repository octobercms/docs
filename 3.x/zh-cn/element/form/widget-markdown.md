---
subtitle: 表单小部件
shortname: Markdown Editor
---
# Markdown Editor 字段

`markdown` - 渲染一个用于 Markdown 格式文本的基本编辑器。

```yaml
md_content:
    type: markdown
    size: huge
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**sideBySide** | 默认启用并排显示模式。默认值：`false`。

#### 另请参阅

::: also
* [Markdown 解析器服务](../../extend/services/parser.md)
:::
