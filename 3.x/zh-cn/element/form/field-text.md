---
subtitle: 表单字段
shortname: Text
---
# Text 字段

`text` 字段渲染一个单行文本框。如果未指定类型，这是默认使用的类型。

```yaml
blog_title:
    type: text
    label: Blog Title
```

以下[字段属性](../form-fields.md)常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**placeholder** | 字段为空时显示的文本。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。

您可以使用 `default` 属性设置默认值。

```yaml
quote_content:
    type: text
    label: Details
    default: I like turtles
```

使用 `placeholder` 属性分配一些占位符文本。

```yaml
point_summary:
    type: text
    label: Point
    placeholder: Type some key points are you trying to make
```
