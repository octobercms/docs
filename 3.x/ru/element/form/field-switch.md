# Switch

The `switch` field renders a switch box. Similar to a [checkbox field](./field-checkbox.md) except displayed as a toggle switch.

```yaml
show_content:
    label: Display Content
    type: switch
```

The following properties are supported.

Property | Description
------------- | -------------
**default** | a default value to use for new records.
**comment** | text to display below the checkbox.

You may use the `default` property to enable the switch by default.

```yaml
show_content:
    label: Display Content
    type: switch
    default: true
```

Use the `comment` to display some accompanying text.

```yaml
show_content:
    label: Display Content
    type: switch
    comment: Flick this switch to display content
```

<!--
@deprecated
You may customize the switch text by passing an array to the `options` value with false and true labels.

```yaml
show_content:
    label: Display Content
    type: switch
    options:
        - Nope
        - Yeah
```
-->


#### See Also

::: also
* [Checkbox Form Field](./field-checkbox.md)
:::
