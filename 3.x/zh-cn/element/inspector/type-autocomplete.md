---
subtitle: Inspector 类型
shortname: Autocomplete
---
# Autocomplete Inspector 类型

`autocomplete` Inspector 类型的工作方式类似于 `string` 编辑器，但包含自动完成功能。可用选项可以通过 `options` 参数静态指定或动态加载。

```php
public function defineProperties()
{
    return [
        'condition' => [
            'title' => 'Condition',
            'type' => 'autocomplete',
            'options' => ['start' => 'Start', 'end' => 'End']
        ]
    ];
}
```

生成的输出是与所选选项对应的数组值，例如：

```json
"condition": "start"
```

以下[配置值](../inspector-types.md)常用。

属性 | 描述
------------- | -------------
**title** | 属性的标题。
**description** | 属性的简要描述，可选。
**default** | 指定默认字符串值，可选。
**options** | 下拉属性的选项数组，如果定义了 `get*PropertyName*Options` 方法则可选。
**showExternalParam** | 不支持，应设置为 `false`。

::: warning
此类型不支持由 `showExternalParam` 属性指定的外部参数编辑器。
:::

## 动态选项

`autocomplete` Inspector 类型支持与[下拉 Inspector 类型](./type-dropdown.md)相同的选项定义方法。

```php
public function defineProperties()
{
    return [
        'sortColumn' => [
            'title' => 'Sort by Column',
            'type' => 'autocomplete',
            // ...
        ],
    ];
}

public function getSortColumnOptions()
{
    return [
        'create' => 'Create',
        'update' => 'Update',
        'delete' => 'Delete',
    ];
}
```

#### 另请参阅

::: also
* [Dropdown Inspector 类型](./type-dropdown.md)
:::
