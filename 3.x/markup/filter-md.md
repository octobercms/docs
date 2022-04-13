# |md

The `|md` filter converts the value from Markdown to HTML format.

```twig
{{ '**Text** is bold.'|md }}
```

The above will output the following:

```html
<strong>Text</strong> is bold.
```

See the [Markdown Parser article](../services/parser.md#oc-markdown-parser) for more details on using Markdown.
