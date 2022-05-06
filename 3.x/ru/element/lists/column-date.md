# Date

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
