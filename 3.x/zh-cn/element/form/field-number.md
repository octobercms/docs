---
subtitle: 表单字段
shortname: Number
---
# Number 字段

`number` 字段渲染一个仅接受数字的单行文本框。

```yaml
your_age:
    label: Your Age
    type: number
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**min** | 客户端最小值，默认 `null`。
**max** | 客户端最大值，默认 `null`。
**step** | 客户端步进增量，默认 `any`。

您可以使用 `min` 和 `max` 属性通过最小值和最大值来约束输入。以下配置仅接受 1 到 100 之间的输入。

```yaml
your_age:
    label: Your Age
    type: number
    min: 1
    max: 100
```

使用 `step` 属性控制数字可以增加或减少的增量，该值默认为 **any**。

```yaml
your_age:
    label: Your Age
    type: number
    step: 10
```

## 服务端验证

如果您希望在保存时对此字段进行服务端验证以确保其为数字。使用 Tailor 字段时，请使用 `validation` 属性。

```yaml
your_age:
    label: Your Age
    type: number
    validation: numeric
```

使用模型时，请在模型上使用 `$rules` 属性，如下所示。

```php
public $rules = [
    'your_age' => ['numeric'],
];
```

有关模型验证的更多信息，请访问[验证服务文章](../../extend/services/validation.md#rule-numeric)。
