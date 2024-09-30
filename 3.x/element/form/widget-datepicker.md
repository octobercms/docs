---
subtitle: Form Widget
shortname: Date Picker
---
# Date Picker Field

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
**disableDays** | days that cannot be selected, can be a number to represent Sunday (`0`) to Saturday (`6`), or a specific date (`2024-10-01`).
**firstDay** | the first day of the week. Default: `0` (Sunday).
**twelveHour** | display a 12-hour clock for selecting time. Default: `false`
**showHoursOnly** | allows for selecting hours only while selecting time. Default: `false`
**showWeekNumber** | show week numbers at head of row. Default: `false`
**useTimezone** | convert the date and time from the backend specified timezone preference.

Use the `time` mode to display a time picker and toggle 24-hour or 12-hour display with the `twelveHour` property.

```yaml
birth_time:
    label: Time Born
    type: datepicker
    mode: time
    twelveHour: true
```

The `disableDays` property can be used to disable the selection of specific days.

```yaml
booking_date:
    label: Start Date
    type: datepicker
    mode: date
    disableDays:
        - 0 # Sundays
        - 6 # Saturdays
        - "2023-08-10" # Specific date
```
