# Selectable

`selectable` - takes the column value and matches it to the value in the record's available options. Take the following array as an example, if the record value is set to `open` then the **Open** value is displayed in the column.

```php
['open' => 'Open', 'closed' => 'Closed']
```

The available options are defined on the model as [dropdown options](forms.md#field-dropdown).

```yaml
status:
    label: Status
    type: selectable
```

They can also be specified explicitly in the `options` value.

```yaml
status:
    label: Status
    type: selectable
    options:
        pending: Pending
        active: Active
```
