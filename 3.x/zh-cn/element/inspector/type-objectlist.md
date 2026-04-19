---
subtitle: Inspector 类型
shortname: Object List
---
# Object List Inspector 类型

`objectList` Inspector 类型允许用户创建具有预定义结构的多个对象。例如，它可以用于创建人员列表，其中每个人都有姓名和地址。

可以使用编辑器创建的对象属性通过 `itemProperties` 参数定义。该参数应包含一个属性数组，类似于 Inspector 配置数组。另一个必需参数是 `titleProperty`，它标识应在 Inspector UI 中用作标题的属性。

`itemProperties` 定义的属性数组支持所有属性类型。

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'objectList',
            'titleProperty' => 'fullName',
            'itemProperties' => [
                'fullName' => [
                    'title' => 'Full Name',
                    'type' => 'string'
                ],
                'address' => [
                    'title' => 'Address',
                    'type' => 'string'
                ]
            ]
        ]
    ];
}
```

默认情况下，生成的输出是一个非关联数组，例如：

```json
"people": [
    {"fullName": "John Smith", "address": "Palo Alto"},
    {"fullName": "Bart Simpson", "address": "Springfield"}
]
```

以下[配置值](../inspector-types.md)常用且受支持。

属性 | 描述
------------- | -------------
**title** | 属性的标题。
**description** | 属性的简要描述，可选。
**keyProperty** | 使用此属性键作为标题，在 **itemProperties** 定义中找到。
**titleProperty** | 使用此属性名称作为标题，在 **itemProperties** 定义中找到。
**itemProperties** | 嵌套属性定义的数组。

::: warning
Object List Inspector 类型不支持默认值。
:::

如果结果值应该是关联数组（对象），请使用 `keyProperty` 配置选项。选项值应引用应用作键的属性。键属性只能使用字符串或下拉编辑器，其值应唯一且不能为空。

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'objectList',
            'titleProperty' => 'fullName',
            'keyProperty' => 'login',
            'itemProperties' => [
                'fullName' => [
                    'title' => 'Full Name',
                    'type' => 'string'
                ],
                'login' => [
                    'title' => 'Login',
                    'type' => 'string'
                ],
                'address' => [
                    'title' => 'Address',
                    'type' => 'string'
                ]
            ]
        ]
    ];
}
```

上面示例中的 `login` 属性将用作结果值中的键：

```json
"people": {
    "john": {"fullName": "John Smith", "address": "Palo Alto"},
    "bart": {"fullName": "Bart Simpson", "address": "Springfield"}
}
```
