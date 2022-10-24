---
subtitle: Learn how to filter lists using scopes.
---
# Filter Scopes

::: aside
← Use the sidebar to see all the available filter scopes.
:::

Filter Scopes are scope definitions used by filters, often in conjunction with a list. Similar to list columns these are referenced by the following areas:

- [Backend List Controller](../extend/lists/list-controller.md)
- [Backend Relation Controller](../extend/forms/relation-controller.md)

All filter scopes are identified as their individual **type** property.

```yaml
scopes:
    myscope:
        type: date
        # ...
```

## Available Scopes

The following filter scopes are available:

<div class="content-list-p" markdown="1">

[Checkbox](./filter/scope-checkbox.md)
[Switch](./filter/scope-switch.md)
[Text](./filter/scope-text.md)
[Number](./filter/scope-number.md)
[Dropdown](./filter/scope-dropdown.md)
[Group](./filter/scope-group.md)
[Date](./filter/scope-date.md)

</div>

## Scope Properties

For each scope you can specify these properties (where applicable).

Property | Description
------------- | -------------
**label** | a name when displaying the filter scope to the user.
**type** | defines how this scope should be displayed,. Default: `group`.
**conditions** | enables or disables condition functions or specifies a raw where query statement to apply to each condition, see the scope type definition for details.
**modelScope** | specifies a [query scope method](../extend/database/model.md) defined in the **list model** to apply to the list query. The first argument will contain the query object (as per a regular scope method) and the second argument will contain the filtered value(s).
**options** | options to use if filtering by multiple items, this option can specify an array or a method name in the `modelClass` model.
**emptyOption** | an optional label for an intentional empty selection.
**default** | supply a default value for the filter, as either array, string or integer depending on the filter value.
**permissions** | the [permissions](../extend/backend/permissions.md) that the current backend user must have in order for the filter scope to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.
**dependsOn** | a string or an array of other scope names that this scope depends on. When the other scopes are modified, this scope will reset.
**nameFrom** | a model attribute name used for displaying the filter label. Default: `name`.
**valueFrom** | defines a model attribute to use for the source value. Default comes from the scope name.
