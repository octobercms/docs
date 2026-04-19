---
subtitle: Inspector 类型
shortname: Dictionary
---
# Dictionary Inspector 类型

`dictionary` Inspector 类型允许通过由两列组成的表格的简单用户界面创建键值对。`default` 参数（如果指定）应包含一个键值对象。

```php
public function defineProperties()
{
    return [
        'options' => [
            'title' => 'Options',
            'type' => 'dictionary',
            'default' => ['option1' => 'Option 1'],
        ]
    ];
}
```

生成的输出是与所选选项对应的字符串值，例如：

```json
"options": {"option1": "Option 1", "option2": "Option 2"}
```

以下[配置值](../inspector-types.md)常用。

属性 | 描述
------------- | -------------
**title** | 属性的标题。
**description** | 属性的简要描述，可选。
**default** | 指定默认的键值数组，可选。

## 额外验证

`dictionary` 编辑器支持对整个集合（`required` 和 `length` 验证器）以及键和值分别进行验证。有关更多详细信息，请参阅[验证描述](../inspector-types.md)。`validationKey` 和 `validationValue` 定义键和值的验证，例如：

```php
public function defineProperties()
{
    return [
        'options' => [
            'title' => 'Options',
            'type' => 'dictionary',
            'validation' => [
                'required' => [
                    'message' => 'Please create options'
                ],
                'length' => [
                    'min' => [
                        'value' => 2,
                        'message' => 'Create at least two options.'
                    ]
                ]
            ],
            'validationKey' => [
                'regex' => [
                    'pattern' => '^[a-z]+$',
                    'message' => 'Keys can contain only lowercase Latin letters'
                ]
            ],
            'validationValue' => [
                'regex' => [
                    'pattern' => '^[a-zA-Z0-9]+$',
                    'message' => 'Values can contain only Latin letters and digits'
                ]
            ]
        ]
    ];
}
```
