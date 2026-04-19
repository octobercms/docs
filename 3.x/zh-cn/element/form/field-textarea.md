---
subtitle: 表单字段
shortname: Textarea
---
# Textarea 字段

`textarea` 字段渲染一个多行文本框。

```yaml
blog_contents:
    type: textarea
    label: Contents
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**title** | 表单字段的标题。
**default** | 指定默认字符串值，可选。
**placeholder** | 字段为空时显示的文本。
**comment** | 在字段下方放置描述性注释。
**size** | 字段的高度大小。支持的值：`tiny`、`small`、`large`、`huge`、`giant`。默认值：`large`。

您可以使用 `size` 属性指定字段大小。

```yaml
blog_contents:
    type: textarea
    label: Contents
    size: large
```

您可以使用 `default` 属性设置默认值。

```yaml
quote_content:
    type: textarea
    label: Details
    default: I like turtles
```

使用 `placeholder` 属性分配一些占位符文本。

```yaml
point_summary:
    type: textarea
    label: Point
    placeholder: Type some key points are you trying to make
```
