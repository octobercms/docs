---
subtitle: 列表列
shortname: Selectable
---
# Selectable 列

`selectable` - 获取列值并将其与记录可用选项中的值匹配。以下面的数组为例，如果记录值设置为 `open`，则列中显示 **Open** 值。

```php
['open' => 'Open', 'closed' => 'Closed']
```

可用选项基于[下拉选项](../define-options.md)定义。

```yaml
status:
    label: Status
    type: selectable
```

支持以下属性。

属性 | 描述
------------- | -------------
**options** | 下拉列表的可用选项，以数组形式。
**optionsMethod** | 从模型上定义的方法或静态方法获取选项，例如 `Class::method`。
**optionsPreset** | 从[预定义选项列表](../define-options.md)获取选项。

`options` 值可以明确指定选项为数组。

```yaml
status:
    label: Status
    type: selectable
    options:
        pending: Pending
        active: Active
```

`optionsPreset` 可用于从[选项预设定义](../define-options.md)中提取值。

```yaml
icon:
    label: Icon
    type: selectable
    optionsPreset: phosphorIcons
```

#### 另请参阅

::: also
* [定义选项](../define-options.md)
* [Dropdown 表单字段](../form/field-dropdown.md)
:::
