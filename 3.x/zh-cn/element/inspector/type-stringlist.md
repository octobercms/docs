---
subtitle: Inspector 类型
shortname: String List
---
# String List Inspector 类型

`stringList` Inspector 类型允许用户输入字符串列表。编辑器在弹出窗口中打开并显示一个文本区域。每行文本表示结果数组中的一个元素。可选的 `default` 参数应包含一个字符串数组。

```php
public function defineProperties()
{
    return [
        'items' => [
            'title' => 'Items',
            'type' => 'stringList',
            'default' => ['String 1', 'String 2']
        ]
    ];
}
```

生成的输出是与所选选项对应的字符串值，例如：

```json
"items": ["String 1", "String 2", "String 3"]
```

以下[配置值](../inspector-types.md)常用。

属性 | 描述
------------- | -------------
**title** | 属性的标题。
**description** | 属性的简要描述，可选。
**default** | 指定默认值为数组，可选。
