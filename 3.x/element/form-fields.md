---
subtitle: Learn about the different form field types.
---
# Form Fields

::: aside
← Use the sidebar to see all the available form fields.
:::

Form Fields, Form UI and Form Widgets are field definitions used by forms, such as a text input. These are commonly referred to by the following areas:

- [CMS Theme Settings](../cms/themes/settings.md)
- [Tailor Content Fields](../cms/tailor/content-fields.md)
- [Backend Form Controller](../extend/forms/form-controller.md)
- [Backend Relation Controller](../extend/forms/relation-controller.md)

All form fields are identified as their individual **type** property.

```yaml
myfield:
    type: textarea
    # ...
```

Form Fields contain generic and simple fields. Form UI is for user interface elements that can be included in forms to help with the layout design. Form Widgets will often introduce more complex functionality, it is common for plugins to provide their own custom form widgets. Tailor Fields are fields that are only available inside tailor blueprints.

## Field Properties

For each field you can specify these common properties, where applicable.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**type** | defines how this field should be rendered. Default: `text`.
**span** | aligns the form field to one side. Options: `auto`, `left`, `right`, `row`, `full`. Default: `full`.
**spanClass** | used with the span `row` property to display the form as a Bootstrap grid, for example, `spanClass: col-4`.
**size** | specifies a field size for fields that use it, for example, the textarea field. Options: `tiny`, `small`, `large`, `huge`, `giant`.
**placeholder** | if the field supports a placeholder value.
**comment** | places a descriptive comment below the field.
**commentAbove** | places a comment above the field.
**commentHtml** | allow HTML markup inside the comment. Options: `true`, `false`.
**default** | specify the default value for the field. For `dropdown`, `checkboxlist`, `radio` and `balloon-selector` widgets, you may specify an option key here to have it selected by default.
**defaultFrom** | takes the default value from the value of another field.
**tab** | assigns the field to a tab.
**cssClass** | assigns a CSS class to the field container.
**readOnly** | prevents the field from being modified. Options: `true`, `false`.
**disabled** | prevents the field from being modified and excludes it from the saved data. Options: `true`, `false`.
**hidden** | hides the field from the view and excludes it from the saved data. Options: `true`, `false`.
**stretch** | specifies if this field stretches to fit the parent height.
**context** | specifies what context should be used when displaying the field. Context can also be passed by using an `@` symbol in the field name, for example, `name@update`.
**dependsOn** | an array of other field names this field [depends on](../extend/forms/field-dependencies.md), when the other fields are modified, this field will update.
**changeHandler** | the name of an AJAX handler to call when the field value is changed, optional.
**trigger** | specify conditions for this field using trigger events.
**preset** | allows the field value to be initially set by the value of another field, converted using the input preset converter.
**required** | places a red asterisk next to the field label to indicate it is required. Be sure to use the [validation trait on the model](../extend/database/traits.md) as this is not enforced by the form controller.
**attributes** | specify custom HTML attributes to add to the form field element.
**containerAttributes** | specify custom HTML attributes to add to the form field container.
**order** | a numerical weight when determining the display order, default value increments at 100 points per field.
**permissions** | the [permissions](../extend/backend/permissions.md) that the current backend user must have in order for the field to be used. Supports either a string for a single permission or an array of permissions of which only one is needed to grant access.

### Tab Properties

An example of specifying field definitions in tabs.

```yaml
tabs:
    fields:
        username:
            type: text
            label: Username
            tab: User

        groups:
            type: relation
            label: Groups
            tab: Groups
```

For each tab definition, namely `tabs` and `secondaryTabs`, you can specify these properties.

Property | Description
------------- | -------------
**stretch** | specifies if this tab stretches to fit the parent height.
**defaultTab** | the default tab to assign fields to. Default: Misc.
**activeTab** | selected tab when the form first loads, name or index. Default: `1`
**icons** | assign icons to tabs using tab names as the key.
**lazy** | array of tabs to be loaded dynamically when clicked. Useful for tabs that contain large amounts of content.
**linkable** | determines if the tabs can be linked using URL fragments. Default: `true`
**cssClass** | assigns a CSS class to the tab container.
**paneCssClass** | assigns a CSS class to an individual tab pane. Value is an array, key is tab index or label, value is the CSS class. It can also be specified as a string, in which case the value will be applied to all tabs.

An example applying properties to tabs.

```yaml
tabs:
    stretch: true
    defaultTab: User
    cssClass: text-blue

    lazy:
        - Groups

    paneCssClass:
        1: first-tab
        2: second-tab

    icons:
        User: icon-user
        Groups: icon-group

    fields:
        # [...]
```

### Custom Field Types

There are various native field types that can be used for the **type** setting. It is also possible to render a field directly by specifying the PHP class name of a [form field widget](../extend/forms/form-widgets.md).

```yaml
blog_content:
    type: Backend\FormWidgets\RichEditor
    size: huge
```

### Nested Field Selection

```yaml
avatar[name]:
    label: Avatar
    comment: will be saved in the Avatar table
```

The above example would fetch and save the value in PHP equivalent of `$record->avatar->name` or `$record->avatar['name']` respectively.

### Field Facades

Sometimes you may need to display a field while preventing it from being submitted. A field can be defined as a facade by adding an underscore (\_) before the name of the field. These fields are purged automatically and no longer saved to the model, such as with the following `_map` field.

```yaml
address:
    label: Title
    type: text

_map:
    label: Point your address on the map
    type: mapviewer
```

## Field Conditions

Sometimes you may want to manipulate the value or appearance of a form field under certain conditions, for example, you may want to hide an input if a checkbox is ticked or preset the value of another field.

### Trigger Events

Trigger Events are defined with the `trigger` form field property and is a simple browser based solution that uses JavaScript. It allows you to change elements attributes such as visibility or value, based on another elements' state. Here is a sample definition:

```yaml
is_delayed:
    label: Send later
    comment: Place a tick in this box if you want to send this message at a later time.
    type: checkbox

send_at:
    label: Send date
    type: datepicker
    cssClass: field-indent
    trigger:
        action: show
        field: is_delayed
        condition: checked
```

In the above example the `send_at` form field will only be shown if the `is_delayed` field is checked. In other words, the field will show (action) if the other form input (field) is checked (condition).

The `trigger` definition specifies these properties.

Property | Description
------------- | -------------
**action** | defines the action applied to this field when the condition is met. Supported values: `show`, `hide`, `enable`, `disable`, `empty`, `fill[somevalue]`.
**field** | defines the other field name that will trigger the action.
**condition** | determines the condition the specified field should satisfy for the condition to be considered `true`. Supported values: `checked`, `unchecked`, `value[somevalue]`.

#### Multiple Actions

You may combine multiple actions by separating them with a pipe `|` symbol. The following will both display and empty the input when the trigger condition is met.

```yaml
trigger:
    action: show|empty
    condition: checked
    field: name
```

#### Multiple Value Conditions

When using the `value[]` condition, you may look for multiple values by passing extra values after the first one, which takes the format `value[][]`.

```yaml
trigger:
    action: show
    condition: value[csv][csv_custom]
    field: file_format
```

#### Referencing Parent Fields

Normally the field name refers to a field in the same level form. For example, if this field is in a [repeater widget](./form/widget-repeater.md), only fields in that same repeater widget will be checked. However, if the field name is preceded by a caret symbol `^` like: `^parent_field`, it will refer to a repeater widget or form one level higher than the field itself.

In the example below, the `colors` field will be shown when the `type` field is set to **Complex**.

```yaml
fields:
    type:
        label: Type
        type: dropdown
        options:
            1: Simple
            2: Complex

    content:
        label: Content
        type: nestedform
        form:
            fields:
                colors:
                    label: Colors
                    type: colorpicker
                    trigger:
                        action: show
                        field: ^type
                        condition: value[2]
```

::: tip
Additionally, if more than one caret `^` is used, it will refer that many levels higher: `^^grand_parent_field`, `^^^grand_grand_parent_field`, etc.
:::

### Input Preset Converter

The input preset converter is defined with the `preset` form field property and allows you to convert text entered into an element to a URL, slug or file name value in another input element.

In this example we will automatically fill out the `url` field value when a user enters text in the `title` field. If the text **Hello world** is typed in for the Title, the URL will follow suit with the converted value of **/hello-world**. This behavior will only occur when the destination field (`url`) is empty and untouched.

```yaml
title:
    label: Title

url:
    label: URL
    preset:
        field: title
        type: url
```

Alternatively, the `preset` value can also be a string that refers to the **field** only, the `type` option will then default to **slug**.

```yaml
slug:
    label: Slug
    preset: title
```

The following options are available for the `preset` option:

Option | Description
------------- | -------------
**field** | defines the other field name to source the value from.
**type** | specifies the conversion type. See below for supported values.
**prefixInput** | optional, prefixes the converted value with the value found in the supplied input element using a CSS selector.

Following are the supported types:

Type | Description
------------- | -------------
**exact** | copies the exact value
**slug** | formats the copied value as a slug
**url** | same as slug but prefixed with a /
**camel** | formats the copied value with camelCase
**file** | formats the copied value as a file name with whitespace replaced with dashes
