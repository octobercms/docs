---
subtitle: Filter Scope
---
# Dropdown

`dropdown` - filter using a single selection of multiple items.

```yaml
status:
    type: dropdown
    options:
        pending: Pending
        active: Active
        closed: Closed
```

The following properties are available for the filter.

Property | Description
------------- | -------------
**options** | available options for the filter, as an array.
**optionsMethod** | take options from a method defined on the model or as a static method, eg `Class::method`.
**conditions** | a custom SQL select statement to use for the filter.
**emptyOption** | text to display when there is no available selections.

You may pass custom SQL to the conditions as a string where `:value` contains the filtered value.

```yaml
status:
    type: dropdown
    conditions: status = ':value'
    # ...
```

You may dynamically supply `options` by passing a model method.

```yaml
roles:
    type: dropdown
    emptyOption: All
    options: getStatusOptions
```

The dropdown filter does not display a label, the `emptyOption` property can be used to set the default state.

```yaml
status:
    type: dropdown
    emptyOption: Select Status
    # ...
```
