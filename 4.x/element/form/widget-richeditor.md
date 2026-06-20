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

The options are proxied to the underlying Froala editor. The most commonly used options are listed below, grouped by area.

### Image Options

Option | Description
------ | -----------
**imageUpload** | Enables image uploads. Set to `false` to block users from inserting images via the upload button or by dropping image files into the editor. Default: `true`.
**imagePaste** | Allows pasting images from the clipboard. Set to `false` to strip pasted images. Default: `true`.
**imagePasteProcess** | When `true`, pasted images are re-uploaded through the configured upload handler instead of being kept as inline data. Default: `false`.
**imageMove** | Allows existing images inside the editor to be dragged to a new position. Set to `false` to lock images in place. Default: `true`.
**imageResize** | Allows images to be resized by dragging their corners. Set to `false` to disable resizing. Default: `true`.
**imageResizeWithPercent** | When `true`, image sizes are stored as percentages rather than fixed pixel widths. Default: `false`.
**imageRoundPercent** | When `true`, percentage-based image sizes are rounded to whole numbers. Default: `false`.
**imageDefaultWidth** | Sets the default width of an image when it is inserted. Setting it to `0` will not set any width. Default: `300`.
**imageDefaultAlign** | Sets the default image alignment when inserted. Possible values are `left`, `center` and `right`. Default: `center`.
**imageDefaultDisplay** | Sets the default display for an inserted image. Possible values are `inline` and `block`. Default: `block`.
**imageDefaultMargin** | Default margin in pixels applied to inserted images. Default: `5`.
**imageMinWidth** | Minimum width (in pixels) when resizing an image. Default: `16`.
**imageMaxSize** | Maximum allowed upload size in bytes. Default: `10485760` (10MB).
**imageAllowedTypes** | Array of allowed image file extensions for uploads. Default: `['jpeg', 'jpg', 'png', 'gif', 'webp']`.
**imageMultipleStyles** | When `false`, only one style class can be applied to an image at a time. Default: `true`.
**imageTextNear** | Allows text to wrap next to an inserted image. Default: `true`.
**imageOutputSize** | When `true`, image width and height attributes are written into the output HTML. Default: `false`.
**imageSplitHTML** | When `true`, the editor will split paragraphs to place block images. Default: `false`.
**imageAddNewLine** | When `true`, a new line is automatically added after an inserted image. Default: `false`.
**imageStyles** | Object mapping CSS class names to style labels available in the image edit popup. Default includes `fr-rounded`, `fr-bordered`, `fr-shadow`.

### File Upload Options

Option | Description
------ | -----------
**fileUpload** | Enables file uploads. Set to `false` to disable. Default: `true`.
**fileMaxSize** | Maximum allowed file upload size in bytes. Default: `10485760` (10MB).
**fileAllowedTypes** | Array of allowed MIME subtypes for uploads, or `['*']` for any. Default: `['*']`.

### Drag and Drop

Option | Description
------ | -----------
**dragInline** | When `true`, dragged content is dropped at the cursor position inline. When `false`, drag-and-drop inside the editor is disabled. Default: `true`.

### Where to find the full list

The `editorOptions` values are passed through to the underlying Froala v2 editor. Every available option, along with its default, is declared at the top of each plugin file under `vendor_drm/froala/js/plugins/` in the October CMS source — for example `image.js` for image options and `file.js` for file upload options.

### Example: block all image insertion

```yaml
html_content:
    type: richeditor
    editorOptions:
        imageUpload: false
        imagePaste: false
        imageMove: false
```
