---
subtitle: Form Widget
shortname: Rich Editor / WYSIWYG
---
# Rich Editor / WYSIWYG Field

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
**useLineBreaks** | uses line breaks instead of paragraph wrappers for each new line. Default `false`.
**editorOptions** | custom editor options used by the editor control as an array (advanced).

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
- insertSnippet
- undo
- redo
- clearFormatting
- selectAll
- html

</div>

::: tip
The `|` character will insert a vertical separator line in the toolbar.
:::

## Registering a Custom Button

The following JavaScript code can be used to register a custom button as a command.

```js
oc.richEditorRegisterButton('insertCustomThing', {
    title: 'Insert Something',
    icon: '<i class="icon-star"></i>',
    undo: true,
    focus: true,
    refreshOnCallback: true,
    callback: function () {
        this.html.insert('<strong>My Custom Thing!</strong>');
    }
});
```

Then add the button to the default collection.

```js
oc.richEditorButtons.splice(0, 0, 'insertCustomThing');
```

When registering the JavaScript, it should come after the assets registered by the Rich Editor. You may extend the `RichEditor` class constructor to achieve this.

```php
\Backend\FormWidgets\RichEditor::extend(function($controller) {
    $controller->addJs('/plugins/october/test/assets/js/custom-button.js');
});
```

### Trigger a Modal from a Custom Button

Use the `oc.popup` JavaScript function to open a modal window.

```js
oc.popup({
    handler: 'onLoadPopup'
});
```

Use the `backend.ajax.beforeRunHandler` to register a global AJAX handler. The `makePartial` method can be called to render a partial with the modal contents inside.

```php
Event::listen('backend.ajax.beforeRunHandler', function ($controller, $handler) {
    if ($handler === 'onLoadPopup') {
        return $controller->makePartial('~/path/to/my/partials/_popup_form.php');
    }
});
```

## Advanced Editor Options

Use the `editorOptions` property to customize the editor options. This is an advanced property, since all options defined here are proxied directly to the editor control.

```yaml
html_content:
    type: richeditor
    editorOptions:
        imageDefaultWidth: 0
```

Some example options are listed below.

Option | Description
------ | -----------
**imageDefaultWidth** | Sets the default width of the image when it is inserted in the rich text editor. Setting it to `0` will not set any width. Default: `300`.
**imageDefaultAlign** | Sets the default image alignment when it is inserted in the rich text editor. Possible values are `left`, `center` and `right`. Default: `center`.
**imageDefaultDisplay** | Sets the default display for an image when is is inserted in the rich text. Possible options are: `inline` and `block`. Default: `block`
**imageResize** | Disables image resize when set to `false`. Default: `true`
**imagePaste** | Allows pasting images from clipboard. Default: `true`
