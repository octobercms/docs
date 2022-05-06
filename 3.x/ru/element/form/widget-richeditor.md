# Rich Editor / WYSIWYG

`richeditor` - renders a visual editor for rich formatted text, also known as a WYSIWYG editor.

```yaml
html_content:
    type: richeditor
    toolbarButtons: bold|italic
    size: huge
```

Option | Description
------------- | -------------
**toolbarButtons** | which buttons to show on the editor toolbar.

The available toolbar buttons are:

```
fullscreen, bold, italic, underline, strikeThrough, subscript, superscript, fontFamily, fontSize, |, color, emoticons, inlineStyle, paragraphStyle, |, paragraphFormat, align, formatOL, formatUL, outdent, indent, quote, insertHR, -, insertLink, insertImage, insertVideo, insertAudio, insertFile, insertTable, undo, redo, clearFormatting, selectAll, html
```

::: tip
The `|` character will insert a vertical separator line in the toolbar and `-` a horizontal one.
:::
