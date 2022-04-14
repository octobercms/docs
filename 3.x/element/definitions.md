# Definitions

October CMS uses elements to define structures such as Lists, Forms and Filters. Every definition can be found in the sidebar navigation.

<a id="oc-defining-form-fields"></a>
<a id="oc-available-field-types"></a>
## Form Fields

Form Fields, Form UI and Form Widgets are field definitions used by forms, such as a text input. These are commonly referred to by the following areas:

- Tailor Content Fields
- Backend Form Controller
- Backend Relation Controller

All form fields are identified as their individual **type** property.

```yaml
myfield:
    type: textarea
    # ...
```

Form Fields contain generic and simple fields. Form UI is for user interface elements that can be included in forms to help with the layout design. Form Widgets will often introduce more complex functionality, it is common for plugins to provide their own custom form widgets.

<a id="oc-available-column-types"></a>
## List Columns

List Columns are column definitions used by lists. These are referred to by the following areas.

- Backend List Controller
- Backend Relation Controller

All list columns are identified as their individual **type** property.

```yaml
mycolumn:
    type: number
    # ...
```

<a id="oc-available-scope-types"></a>
## Filter Scopes

Filter Scopes are scope definitions used by filters, often in conjunction with a list. Similar to list columns these are referenced by the following areas:

- Backend List Controller
- Backend Relation Controller

All filter scopes are identified as their individual **type** property.

```yaml
myscope:
    type: date
    # ...
```
