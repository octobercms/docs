---
subtitle: Inspector 类型
shortname: String
---
# String Inspector 类型

`string` Inspector 类型允许输入单行文本，以简单的文本输入框表示。编辑器没有任何特定参数。编辑器的可选 `default` 参数应包含一个字符串。

```php
public function defineProperties()
{
    return [
        'firstName' => [
            'title' => 'First Name',
            'type' => 'string',
            'default' => 'John'
        ]
    ];
}
```

生成的输出是与所选选项对应的字符串值，例如：

```json
"firstName": "Sam"
```

以下[配置值](../inspector-types.md)常用。

属性 | 描述
------------- | -------------
**title** | 属性的标题。
**description** | 属性的简要描述，可选。
**default** | 指定默认字符串值，可选。
**showExternalParam** | 指定 Inspector 中属性的外部参数编辑器的可见性。默认值：`true`。
