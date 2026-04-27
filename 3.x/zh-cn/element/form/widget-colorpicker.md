---
subtitle: 表单小部件
shortname: Color Picker
---
# Color Picker 字段

`colorpicker` - 渲染用于选择十六进制颜色值的控件。

```yaml
color:
    label: Background
    type: colorpicker
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**availableColors** | 以数组形式列出的可用颜色列表。
**allowEmpty** | 允许空输入值。默认值：`false`
**allowCustom** | 允许选择自定义颜色。默认值：`true`
**showAlpha** | 显示不透明度滑块并设置 8 位十六进制颜色代码。默认值：`false`
**showInput** | 在颜色选择器旁边显示文本输入框并禁用可用颜色。默认值：`false`

您可以通过将 `availableColors` 属性设置为十六进制颜色数组来定义预设颜色。`allowCustom` 属性可用于禁止选择自定义颜色，这是可选的。

```yaml
color:
    label: Background
    type: colorpicker
    availableColors: ['#000000', '#111111', '#222222']
    allowCustom: false
```

::: tip
如果 YAML 文件中未定义 `availableColors` 字段，颜色选择器将使用一组 20 个默认颜色。
:::

使用 `showAlpha` 属性在颜色选择中包含不透明度，这将生成一个 8 位十六进制值。

```yaml
color:
    label: Background
    type: colorpicker
    showAlpha: true
```

使用 `showInput` 属性在颜色旁边显示文本输入框。此模式将禁用可用颜色，使选择和输入自定义十六进制颜色成为主要操作。

```yaml
color:
    label: Primary Color
    type: colorpicker
    showInput: true
```

## 动态可用颜色

可用颜色可以通过将 `availableColors` 设置为模型类中声明的方法名称来从模型类获取。此方法应返回与上述示例相同格式的十六进制颜色数组。此方法的第一个参数是字段名称，第二个参数是字段的当前值，第三个参数是整个表单的当前数据对象。

```yaml
color:
    label: Background
    type: colorpicker
    availableColors: myColorList
```

在模型类中提供可用颜色：

```php
public function myColorList($fieldName, $value, $formData)
{
    return ['#000000', '#111111', '#222222']
}
```
