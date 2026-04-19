---
subtitle: 列表列
shortname: Date & Time
---
# Date & Time 列

`datetime` - 将列值显示为格式化的日期和时间。下面的示例将日期显示为 **Thu, Dec 25, 1975 2:15 PM**。

```yaml
created_at:
    label: Date
    type: datetime
```

您也可以指定自定义日期格式，例如 **Thursday 25th of December 1975 02:15:16 PM**。

```yaml
created_at:
    label: Date
    type: datetime
    format: l jS \of F Y h:i:s A
```

显示值会自动转换为后端时区偏好，您可以使用 `useTimezone` 选项禁用此功能。

```yaml
created_at:
    label: Date
    type: datetime
    useTimezone: false
```

::: tip
`useTimezone` 选项也适用于其他与日期和时间相关的字段类型，包括 `date`、`time`、`timesince` 和 `timetense`。
:::

## Date

`date` - 以日期格式 **M j, Y** 显示列值。

```yaml
created_at:
    label: Date
    type: date
```

默认情况下，此值不会应用后端时区偏好。如果日期包含时间，您可以使用 `useTimezone` 选项转换时区。

```yaml
created_at:
    label: Date
    type: date
    useTimezone: true
```

::: tip
`date` 和 `time` 列默认不应用后端时区转换，因为转换需要同时具有日期和时间。
:::

## Time

`time` - 以时间格式 **g:i A** 显示列值。

```yaml
created_at:
    label: Date
    type: time
```

## Time Since

`timesince` - 显示从值到当前时间的人类可读时间差。例如：**10 minutes ago**

```yaml
created_at:
    label: Date
    type: timesince
```

## Time Tense

`timetense` - 使用当前日期的语法时态显示 24 小时制时间和日期。例如：**Today at 12:49**、**Yesterday at 4:00** 或 **18 Sep 2015 at 14:33**。

```yaml
created_at:
    label: Date
    type: timetense
```
