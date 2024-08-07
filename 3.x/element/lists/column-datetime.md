---
subtitle: List Column
shortname: Date & Time
---
# Date & Time Column

`datetime` - displays the column value as a formatted date and time. The next example displays dates as **Thu, Dec 25, 1975 2:15 PM**.

```yaml
created_at:
    label: Date
    type: datetime
```

You may also specify a custom date format, for example **Thursday 25th of December 1975 02:15:16 PM**.

```yaml
created_at:
    label: Date
    type: datetime
    format: l jS \of F Y h:i:s A
```

The display value is automatically converted to the backend timezone preference, you may disable this using the `useTimezone` option.

```yaml
created_at:
    label: Date
    type: datetime
    useTimezone: false
```

::: tip
The `useTimezone` option also applies to other date and time related field types, including `date`, `time`, `timesince` and `timetense`.
:::

## Date

`date` - displays the column value as date format **M j, Y**.

```yaml
created_at:
    label: Date
    type: date
```

The backend timezone preference is not applied to this value by default. If the date includes a time, you may convert the timezone with the `useTimezone` option.

```yaml
created_at:
    label: Date
    type: date
    useTimezone: true
```

::: tip
The `date` and `time` columns do not apply backend timezone conversions by default since a date and time are both required for the conversion.
:::

## Time

`time` - displays the column value as time format **g:i A**.

```yaml
created_at:
    label: Date
    type: time
```

## Time Since

`timesince` - displays a human readable time difference from the value to the current time. Eg: **10 minutes ago**

```yaml
created_at:
    label: Date
    type: timesince
```

## Time Tense

`timetense` - displays 24-hour time and the day using the grammatical tense of the current date. Eg: **Today at 12:49**, **Yesterday at 4:00** or **18 Sep 2015 at 14:33**.

```yaml
created_at:
    label: Date
    type: timetense
```
