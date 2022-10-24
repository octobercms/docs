---
subtitle: List Column
---
# Summary

`summary` - generates a summary value, strips HTML and limits length to the closest word boundary.

```yaml
html_content:
    label: Content
    type: summary
```

The default summary length is 40 characters, you may adjust it with the `limitChars` option.

```yaml
html_content:
    label: Content
    type: summary
    limitChars: 100
```

To limit by word count instead, specify the `limitWords` option instead. You may also change the end suffix characters with the `endChars` option.

```yaml
html_content:
    label: Content
    type: summary
    limitWords: 10
    endChars: "..."
```
