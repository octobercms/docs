---
subtitle: 列表列
shortname: Switch
---
# Switch 列

`switch` - 为布尔列显示开启或关闭状态。

```yaml
enabled:
    label: Enabled
    type: switch
```

您可以通过将数组传递给 `options` 值来自定义开关文本，包含 false 和 true 标签。

```yaml
enabled:
    label: Enabled
    type: switch
    options:
        - Nope
        - Yeah
```
