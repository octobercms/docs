---
subtitle: 表单字段
shortname: Email
---
# Email 字段

`email` 字段渲染一个类型为 `email` 的单行文本框，在移动浏览器中触发电子邮件专用键盘。

```yaml
user_email:
    label: Email Address
    type: email
```

以下[字段属性](../form-fields.md)常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**placeholder** | 字段为空时显示的文本。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。

## 服务端验证

如果您希望在保存时验证此字段以确保其为正确格式的电子邮件地址。使用 Tailor 字段时，请使用 `validation` 属性。

```yaml
user_email:
    label: Email Address
    type: email
    validation: email
```

使用模型时，请在模型上使用 `$rules` 属性，如下所示。

```php
public $rules = [
    'user_email' => ['email'],
];
```

有关模型验证的更多信息，请访问[验证服务文章](../../extend/services/validation.md#rule-email)。
