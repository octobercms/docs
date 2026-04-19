---
subtitle: Inspector 类型
shortname: Set
---
# Set Inspector 类型

`set` Inspector 类型用于从预定义选项中进行多选。`set` Inspector 类型支持与 [dropdown Inspector 类型](./type-dropdown.md)相同的选项定义方法。

```php
public function defineProperties()
{
    return [
        'units' => [
            'title' => 'Select Muitple Units',
            'type' => 'set',
            'items' => [
                'metric' => 'Metric',
                'imperial' => 'Imperial'
            ]
        ]
    ];
}
```

生成的输出是与所选选项对应的数组值，例如：

```json
"units": ["metric", "imperial"]
```

以下[配置值](../inspector-types.md)常用且受支持。

属性 | 描述
------------- | -------------
**title** | 属性的标题。
**description** | 属性的简要描述，可选。
**items** | 以键值形式表示的可用项目数组，如果定义了 `get*PropertyName*Options` 方法则可选。
**default** | 默认选中的项目数组，仅包含键。

`default` 参数（如果指定）应为列出默认选中项目键的数组。

```php
public function defineProperties()
{
    return [
        'context' => [
            'title' => 'Context',
            'type' => 'set',
            'items' => [
                'create' => 'Create',
                'update' => 'Update',
                'preview' => 'Preview'
            ],
            'default' => ['create', 'update']
        ]
    ];
}
```

要动态指定 `items`，请在模型中创建一个名为 `get*PropertyName*Options` 的方法。

```php
public function getContextOptions()
{
    return ContextModel::pluck('name', 'code')->all();
}
```

#### 另请参阅

::: also
* [Dropdown Inspector 类型](./type-dropdown.md)
:::
