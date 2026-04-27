---
subtitle: Inspector 类型
shortname: Checkbox
---
# Checkbox Inspector 类型

`checkbox` Inspector 类型在界面中以复选框表示。此属性没有任何特殊参数。`default` 参数（如果指定）应包含布尔值或字符串值 `true`、`false`、`1`、`0`。

```php
public function defineProperties()
{
    return [
        'enabled' => [
            'title' => 'Enabled',
            'type' => 'checkbox',
            'default' => true
        ]
    ];
}
```

生成的输出为 `0`（未选中）或 `1`（选中），例如：

```json
"enabled": 1
```

以下[配置值](../inspector-types.md)常用。

属性 | 描述
------------- | -------------
**title** | 属性的标题。
**description** | 属性的简要描述，可选。
**default** | 指定默认值为 `true` 或 `false`，可选。
