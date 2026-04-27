---
subtitle: Inspector 类型
shortname: Text
---
# Text Inspector 类型

`text` Inspector 类型允许在弹出窗口中输入多行长文本值。编辑器没有任何特定参数。编辑器的可选 `default` 参数应包含一个字符串。

```php
public function defineProperties()
{
    return [
        'description' => [
            'title' => 'Description',
            'type' => 'text',
            'default' => 'This is a default description'
        ]
    ];
}
```

生成的输出是与所选选项对应的字符串值，例如：

```json
"description": "This is a description"
```

以下[配置值](../inspector-types.md)常用。

属性 | 描述
------------- | -------------
**title** | 属性的标题。
**description** | 属性的简要描述，可选。
**default** | 指定默认字符串值，可选。
