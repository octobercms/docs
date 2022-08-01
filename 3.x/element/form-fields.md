---
subtitle: Learn about the different form field types.
---
# Defining Form Fields

::: aside
← Use the sidebar to see all the available form fields.
:::

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

### Tailor Fields

There are some fields that are only available inside tailor blueprints. Like form fields, these values are used as the **type** property of a field definition.

```yaml
author:
    type: entries
    # ...
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
**action** | defines the action applied to this field when the condition is met. Supported values: show, hide, enable, disable, empty.
**field** | defines the other field name that will trigger the action.
**condition** | determines the condition the specified field should satisfy for the condition to be considered "true". Supported values: checked, unchecked, value[somevalue].

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
