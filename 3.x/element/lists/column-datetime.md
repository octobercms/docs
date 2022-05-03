# Date & Time

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

> **Note**: the `useTimezone` option also applies to other date and time related field types, including `date`, `time`, `timesince` and `timetense`.
