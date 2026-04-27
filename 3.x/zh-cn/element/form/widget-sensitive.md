---
subtitle: 表单小部件
shortname: Sensitive
---
# Sensitive 字段

`sensitive` - 渲染一个可显示/隐藏的密码字段，可用于敏感信息，如 API 密钥或密钥、配置值等。敏感字段可以根据用户请求切换显示和隐藏。

包含先前输入值的敏感字段在加载时将用占位值替换该值，防止通过长度猜测或复制该值。显示该值时，将通过 AJAX 检索原始值并填充到字段中。

```yaml
api_secret:
    type: sensitive
    allowCopy: false
    hideOnTabChange: true
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**mode** | 小部件的显示模式，可选 `textarea` 或 `text`。默认值：`text`
**allowCopy** | 为敏感字段添加"复制"操作，允许用户在不显示密码的情况下复制它。默认值：`true`
**hiddenPlaceholder** | 设置用于模拟隐藏、未显示值的占位文本。您可以将其更改为长字符串或短字符串以模拟不同长度的值。默认值：`__hidden__`
**hideOnTabChange** | 如果为 true，当用户导航到其他选项卡或最小化浏览器时，敏感字段将自动隐藏。默认值：`true`
