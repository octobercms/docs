---
subtitle: Form Widget
---
# Date Picker

`datepicker` - renders a text field used for selecting date and times.

```yaml
published_at:
    label: Published
    type: datepicker
    mode: date
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.
**mode** | the expected result, either `date`, `datetime` or `time`. Default: `datetime`.
**format** | provide an explicit date display format. Eg: `Y-m-d`
**minDate** | the minimum/earliest date that can be selected.
**maxDate** | the maximum/latest date that can be selected.
**yearRange** | number of years to show either side, or an array of upper/lower range, example `[1900,2015]`. Default: `10`.
**firstDay** | the first day of the week. Default: `0` (Sunday).
**twelveHour** | display a 12-hour clock for selecting time. Default: `false`
**showWeekNumber** | show week numbers at head of row. Default: `false`
**useTimezone** | convert the date and time from the backend specified timezone preference.

Use the `time` mode to display a time picker and toggle 24-hour or 12-hour display with the `twelveHour` property.

```yaml
birthtime:
    label: Time Born
    type: datepicker
    mode: time
    twelveHour: true
```
