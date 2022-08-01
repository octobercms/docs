---
subtitle: Learn how to filter lists using scopes.
---
# Defining Filter Scopes

::: aside
← Use the sidebar to see all the available filter scopes.
:::

Filter Scopes are scope definitions used by filters, often in conjunction with a list. Similar to list columns these are referenced by the following areas:

- [Backend List Controller](../extend/lists/list-controller.md)
- [Backend Relation Controller](../extend/forms/relation-controller.md)

All filter scopes are identified as their individual **type** property.

```yaml
myscope:
    type: date
    # ...
```
