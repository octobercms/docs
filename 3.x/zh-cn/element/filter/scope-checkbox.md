---
subtitle: 过滤器范围
shortname: Checkbox
---
# Checkbox 范围

`checkbox` - 用作二元复选框，将预定义条件或查询应用于列表，可选开启或关闭。使用 0 表示关闭，1 表示开启作为默认值。

```yaml
is_published:
    label: Hide Published
    type: checkbox
    conditions: is_published <> true
```

以下属性可用于过滤器。

属性 | 描述
------------- | -------------
**default** | 设置为 true 使过滤器默认选中。默认值：`false`。
**conditions** | 用于过滤器的自定义 SQL select 语句。

您可以设置 `default` 值使过滤器默认选中。

```yaml
is_published:
    label: Hide Published
    type: checkbox
    default: 1
```
