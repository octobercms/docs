---
subtitle: Inspector 类型
shortname: Object
---
# Object Inspector 类型

`object` Inspector 类型允许定义具有用户可编辑的特定属性的对象。对象属性通过 `properties` 属性指定。该属性的值是一个数组，其结构与 Inspector 属性数组相同。

上面的示例创建了一个具有三个属性的对象。其中两个显示为文本字段，第三个显示为下拉列表。

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'object',
            'properties' => [
                'streetAddress' => [
                    'title' => 'Street Address',
                    'type' => 'string'
                ],
                'city' => [
                    'title' => 'City',
                    'type' => 'string'
                ],
                'country' => [
                    'title' => 'Country',
                    'type' => 'dropdown',
                    'options' => [
                        'us' => 'US',
                        'ca' => 'Canada'
                    ]
                ]
            ],
        ]
    ];
}
```

生成的输出是一个对象，例如：

```json
"address": {
    "streetAddress": "321-210 Second ave",
    "city": "Springfield",
    "country": "us"
}
```

以下[配置值](../inspector-types.md)常用且受支持。

属性 | 描述
------------- | -------------
**title** | 属性的标题。
**description** | 属性的简要描述，可选。
**properties** | 嵌套属性定义的数组。
**default** | 默认填充的项目数组，包含键和值。
**ignoreIfPropertyEmpty** | 设置为一个值数组，如果值为空，则应从输出中排除。

::: warning
此类型不支持由 `showExternalParam` 属性指定的外部参数编辑器。
:::

对象属性可以是 Inspector 支持的任何类型，包括其他对象。如果对象的某个字段为空，有一种方法可以从 Inspector 值中完全排除该对象。该字段通过 `ignoreIfPropertyEmpty` 参数标识。例如：

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'object',
            'ignoreIfPropertyEmpty' => 'title',
            'properties' => [
                'streetAddress' => [
                    'title' => 'Street Address',
                    'type' => 'string'
                ],
                'city' => [
                    'title' => 'City',
                    'type' => 'string'
                ]
            ],
        ]
    ];
}
```

在上面的示例中，如果未指定街道地址，则对象（"address"）将从 Inspector 输出中完全删除。如果在其他对象属性上定义了任何验证规则且必需属性为空，则这些规则将被忽略。

编辑器的 `default` 值（如果指定）应为与 `properties` 配置参数中定义的属性相同的对象。

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'object',
            'properties' => [/*...*/],
            'default' => [
                'streetAddress' => '321-210 Second ave',
                'city' => 'Springfield',
                'country' => 'us'
            ]
        ]
    ];
}
```
