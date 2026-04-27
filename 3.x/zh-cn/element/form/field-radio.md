---
subtitle: 表单字段
shortname: Radio List
---
# Radio List 字段

`radio` 字段渲染一个单选选项列表，一次只能选择一个项目。Radio 字段支持与[下拉字段类型](./field-dropdown.md)相同的选项定义方法。

```yaml
security_level:
    type: radio
    label: Access Level
    options:
        all: All
        registered: Registered only
        guests: Guests only
```

以下[字段属性](../form-fields.md)常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 新记录使用的默认值。
**options** | 单选列表的可用选项，以数组形式。
**optionsMethod** | 从模型上定义的方法或静态方法获取选项，例如 `Class::method`。
**cssClass** | 用于将选项设置为内联。
**inlineOptions** | 将选项并排显示而不是堆叠显示。

您可以使用 `default` 属性设置默认值，其中值是选项的键。

```yaml
security_level:
    type: radio
    label: Access Level
    default: guests
```

除了简单数组外，单选列表还支持将辅助描述作为其 `options` 的一部分。

```yaml
security_level:
    type: radio
    label: Access Level
    options:
        all: [All, Guests and customers will be able to access this page.]
        registered: [Registered only, Only logged in member will be able to access this page.]
        guests: [Guests only, Only guest users will be able to access this page.]
```

要将选项并排显示而不是堆叠显示，请将 `inlineOptions` 属性设置为 `true` 值。

```yaml
security_level:
    type: radio
    label: Access Level
    inlineOptions: true
```

## 动态选项

单选列表支持与[下拉字段类型](./field-dropdown.md)相同的选项定义方法。

此外，对于单选列表，方法可以返回简单数组：**key => value** 或提供描述的数组：**key => [label, description]**。

```php
public function listAccessLevels($fieldName, $value, $formData)
{
    return [
        'all' => ['All', 'Guests and customers will be able to access this page.'],
        // ...
    ];
}
```

#### 另请参阅

::: also
* [Dropdown 表单字段](./field-dropdown.md)
:::
