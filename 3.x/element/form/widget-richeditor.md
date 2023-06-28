---
subtitle: Form Widget
---
# Rich Editor / WYSIWYG

`richeditor` - renders a visual editor for rich formatted text, also known as a WYSIWYG editor.

```yaml
html_content:
    type: richeditor
    label: Contents
```

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.
**toolbarButtons** | buttons to show on the editor toolbar. Example: `bold|italic`
**size** | specifies a field size for fields that use it, for example, the textarea field. Options: `tiny`, `small`, `large`, `huge`, `giant`.
**showMargins** | set to `true` to include resizable document margins. Default: `false`.

You may specify how large the field size should be with the `size` property.

```yaml
html_content:
    type: richeditor
    label: Contents
    size: huge
```

Use the `toolbarButtons` property to specify custom buttons.

```yaml
html_content:
    type: richeditor
    label: Contents
    toolbarButtons: bold|italic|underline
```

The double-pipe `||` character can be used to include a separator with the buttons.

```yaml
toolbarButtons: bold|italic|underline||insertPageLink||undo|redo||clearFormatting
```

The available toolbar buttons are:

<div class="content-list" markdown="1">

- fullscreen
- bold
- italic
- underline
- strikeThrough
- subscript
- superscript
- fontFamily
- fontSize
- color
- emoticons
- inlineStyle
- paragraphStyle
- paragraphFormat
- align
- formatOL
- formatUL
- outdent
- indent
- quote
- insertHR
- insertLink
- insertPageLink
- insertImage
- insertVideo
- insertAudio
- insertFile
- insertTable
- undo
- redo
- clearFormatting
- selectAll
- html

</div>

::: tip
The `|` character will insert a vertical separator line in the toolbar.
:::
