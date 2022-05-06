# Date Picker

`datepicker` - renders a text field used for selecting date and times.

```yaml
published_at:
    label: Published
    type: datepicker
    mode: date
```

Option | Description
------------- | -------------
**mode** | the expected result, either date, datetime or time. Default: datetime.
**format** | provide an explicit date display format. Eg: Y-m-d
**minDate** | the minimum/earliest date that can be selected.
**maxDate** | the maximum/latest date that can be selected.
**firstDay** | the first day of the week. Default: 0 (Sunday).
**showWeekNumber** | show week numbers at head of row. Default: false
**useTimezone** | convert the date and time from the backend specified timezone preference. Default: true
