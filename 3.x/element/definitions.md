---
subtitle: Element definitions used in forms, lists and filters.
---
# Definitions

::: aside
← Use the sidebar to see all the available options.
:::

October CMS uses elements to define structures such as Lists, Forms and Filters. Every definition can be found in the sidebar navigation.

## Form Fields

Form Fields, Form UI and Form Widgets are field definitions used by forms, such as a text input. These are commonly referred to by the following areas:

- [CMS Theme Settings](../cms/themes/settings.md)
- [Tailor Content Fields](../tailor/content-fields.md)
- [Backend Form Controller](../extend/forms/form-controller.md)
- [Backend Relation Controller](../extend/forms/relation-controller.md)

All form fields are identified as their individual **type** property.

```yaml
myfield:
    type: textarea
    # ...
```

Form Fields contain generic and simple fields. Form UI is for user interface elements that can be included in forms to help with the layout design. Form Widgets will often introduce more complex functionality, it is common for plugins to provide their own custom form widgets.

## List Columns

List Columns are column definitions used by lists. These are referred to by the following areas.

- [Backend List Controller](../extend/lists/list-controller.md)
- [Backend Relation Controller](../extend/forms/relation-controller.md)

All list columns are identified as their individual **type** property.

```yaml
mycolumn:
    type: number
    # ...
```

## Filter Scopes

Filter Scopes are scope definitions used by filters, often in conjunction with a list. Similar to list columns these are referenced by the following areas:

- [Backend List Controller](../extend/lists/list-controller.md)
- [Backend Relation Controller](../extend/forms/relation-controller.md)

All filter scopes are identified as their individual **type** property.

```yaml
myscope:
    type: date
    # ...
```
