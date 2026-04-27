---
subtitle: 表单小部件
shortname: Date Picker
---
# Date Picker 字段

`datepicker` - 渲染一个用于选择日期和时间的文本字段。

```yaml
published_at:
    label: Published
    type: datepicker
    mode: date
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**mode** | 预期结果，可选 `date`、`datetime` 或 `time`。默认值：`datetime`。
**format** | 提供明确的日期显示格式。例如：`Y-m-d`
**minDate** | 可以选择的最小/最早日期。
**maxDate** | 可以选择的最大/最晚日期。
**yearRange** | 显示任一侧的年数，或上下限范围数组，例如 `[1900,2015]`。默认值：`10`。
**disableDays** | 不可选择的日期，可以是表示星期日（`0`）到星期六（`6`）的数字，或特定日期（`2024-10-01`）。
**firstDay** | 一周的第一天。默认值：`0`（星期日）。
**twelveHour** | 选择时间时显示 12 小时制。默认值：`false`
**hoursOnly** | 选择时间时仅允许选择小时。默认值：`false`
**showWeekNumber** | 在行首显示周数。默认值：`false`
**useTimezone** | 从后端指定的时区偏好转换日期和时间。

使用 `time` 模式显示时间选择器，并使用 `twelveHour` 属性切换 24 小时或 12 小时显示。

```yaml
birth_time:
    label: Time Born
    type: datepicker
    mode: time
    twelveHour: true
```

要简化时间选择，使用 `hoursOnly` 模式以仅显示小时选择，不包含分钟。

```yaml
birth_hour:
    label: Hour Born
    type: datepicker
    mode: time
    hoursOnly: true
```

`disableDays` 属性可用于禁用特定日期的选择。

```yaml
booking_date:
    label: Booking Date
    type: datepicker
    mode: date
    disableDays:
        - 0 # Sundays
        - 6 # Saturdays
        - "2023-08-10" # Specific date
```

`disableDays` 属性也可以设置为静态 PHP 函数，以动态设置禁用的日期。

```yaml
booking_date:
    type: datepicker
    disableDays: App\Classes\BookingManager::getDisabledBookingDates
```
