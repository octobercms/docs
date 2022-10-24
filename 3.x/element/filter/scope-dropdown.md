---
subtitle: Filter Scope
---
# Dropdown

`dropdown` - filter using a single selection of multiple items.

```yaml
status:
    label: Status
    type: dropdown
    options:
        pending: Pending
        active: Active
        closed: Closed
```

You may pass custom SQL to the conditions as a string where `:value` contains the filtered value.

```yaml
status:
    label: Status
    type: dropdown
    conditions: status = :value
    # ...
```

You may dynamically supply `options` by passing a model method.

```yaml
roles:
    label: Status
    type: dropdown
    emptyOption: All
    options: getStatusOptions
```
