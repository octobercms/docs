# Hint

The `hint` UI element identical to the [partial element](./ui-partial.md) but renders inside a hint container that can be dismissed by the user.

```yaml
_hint1:
    type: hint
    path: content_field
```

The following properties are supported.

Property | Description
------------- | -------------
**label** | title text for the section.
**comment** | secondary text for the section.
**mode** | visual display mode, as either: `tip`, `info`, `warning`, `danger`, `success`. Default: `info`.
**path** | path to a [partial view file](../../extend/system/views.md).

A hint supports content inline to the field. The `label` and `comment` values are optional and contain the content for the heading and subheading. You may also use Markdown syntax for the values.

```yaml
_tip1:
    type: hint
    mode: tip
    label: Pro Tip
    comment: Always check to make sure this field is populated.
```

The `mode` property supports the values: tip, info, warning, danger, success

```yaml
_warning1:
    type: hint
    mode: warning
    label: Always wash your hands
    comment: This is good for stopping the spread of germs.
```
