---
subtitle: 过滤器范围
shortname: Switch
---
# Switch 范围

`switch` - 用作开关在列表的两个预定义条件或查询之间切换，可选不确定、开启或关闭。

```yaml
is_approved:
    label: Approved
    type: switch
    conditions:
        - is_approved <> true
        - is_approved = true
```

以下属性可用于过滤器。

属性 | 描述
------------- | -------------
**default** | 设置为 `1` 或 `2` 使过滤器默认选中。默认值：`0`。
**select** | 一个包含自定义 SQL select 语句的数组，用于过滤器，包含条件不确定时（第一项）和选中时（第二项）的语句。

您可以设置 `default` 值来设置默认过滤值。使用 `0` 表示关闭，`1` 表示不确定，`2` 表示开启作为默认值。

```yaml
is_approved:
    label: Approved
    type: switch
    default: 1
```
