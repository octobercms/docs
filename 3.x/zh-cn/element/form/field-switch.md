---
subtitle: 表单字段
shortname: Switch
---
# Switch 字段

`switch` 字段渲染一个开关框。类似于[复选框字段](./field-checkbox.md)，但以拨动开关的形式显示。

```yaml
show_content:
    label: Display Content
    type: switch
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 新记录使用的默认值。
**comment** | 在复选框下方显示的文本。

您可以使用 `default` 属性默认启用开关。

```yaml
show_content:
    label: Display Content
    type: switch
    default: true
```

使用 `comment` 显示一些附带文本。

```yaml
show_content:
    label: Display Content
    type: switch
    comment: Flick this switch to display content
```

<!--
@deprecated
You may customize the switch text by passing an array to the `options` value with false and true labels.

```yaml
show_content:
    label: Display Content
    type: switch
    options:
        - Nope
        - Yeah
```
-->


#### 另请参阅

::: also
* [Checkbox 表单字段](./field-checkbox.md)
:::
