# Hint

`hint` - identical to a `partial` field but renders inside a hint container that can be hidden by the user.

```yaml
_hint1:
    type: hint
    path: content_field
```

A hint supports content inline to the field. The `label` and `comment` values are optional and contain the content for the heading and subheading. You may also use Markdown syntax for the values.

```yaml
_tip1:
    type: hint
    mode: tip
    label: Pro Tip
    comment: Always check to make sure this field is populated.
```

The `mode` option supports the values: tip, info, warning, danger, success

```yaml
_warning1:
    type: hint
    mode: warning
    label: Always wash your hands
    comment: This is good for stopping the spread of germs.
```
