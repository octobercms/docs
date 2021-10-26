# | md

The `| md` filter converts the value from Markdown to HTML format.

```twig
{{ '**Text** is bold.' | md }}
```

The above will output the following:

```twig
<strong>Text</strong> is bold.
```