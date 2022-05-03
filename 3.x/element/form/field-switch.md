# Switch

`switch` - renders a switchbox.

```yaml
show_content:
    label: Display content
    type: switch
    comment: Flick this switch to display content
```

You may customize the switch text by passing an array to the `options` value with false and true labels.

```yaml
show_content:
    label: Display content
    type: switch
    options:
        - Nope
        - Yeah
```
