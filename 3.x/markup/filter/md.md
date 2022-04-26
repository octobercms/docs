---
subtitle: Twig Filter
---
# |md

The `|md` filter converts the value from Markdown to HTML format.

```twig
{{ '**Text** is bold.'|md }}
```

The above will output the following:

```html
<strong>Text</strong> is bold.
```

See the [Markdown Parser article](../../extend/services/parser.md) for more details on using Markdown.
