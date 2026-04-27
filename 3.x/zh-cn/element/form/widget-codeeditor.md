---
subtitle: 表单小部件
shortname: Code Editor
---
# Code Editor 字段

`codeeditor` - 渲染一个用于格式化代码或标记的纯文本编辑器。请注意，选项可能会继承后端管理员定义的代码编辑器首选项。

```yaml
css_content:
    type: codeeditor
    size: huge
    language: html
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**language** | 代码语言，例如 php、css、javascript、html。默认值：`php`。
**showGutter** | 显示带有行号的边栏。默认值：`true`。
**wrapWords** | 将长行换到新行。默认值：`true`。
**fontSize** | 文本字体大小。默认值：12。
