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
**toolbar** | reference a named toolbar definition by its code. Example: `shop-content`
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

## Toolbar Definitions

Toolbar definitions are named button configurations that can be shared by many rich editor fields and managed visually in the **Settings → Editor Settings → Toolbar Buttons** area. Each definition has a unique code, a label and a description explaining where it is used. Definitions are edited with a visual builder by dragging buttons between the toolbar and the available buttons palette.

The following definitions are included by default.

Code | Description
------------- | -------------
**default** | used by rich editors without a specific toolbar.
**minimal** | a compact toolbar for simple content.
**full** | every available button.

Use the `toolbar` property to reference a definition from a rich editor field. The same code can be shared by any number of fields, and updating the definition updates every field that references it.

```yaml
description:
    type: richeditor
    toolbar: shop-content
```

A definition with no buttons inherits the default toolbar. This makes it possible to give an area of the admin panel its own toolbar code without prescribing any buttons, the fields simply follow the default toolbar until the definition is customized. The visual builder displays the inherited buttons for empty definitions, and modifying them makes the definition independent from the default toolbar. Definitions that have been changed from their registered configuration display as modified, along with a **Reset to Default** option to restore them.

Administrators may also create their own definitions with new codes using the **Create Toolbar** button, which can then be referenced from form fields and blueprints in the same way.

### Registering a Toolbar Definition

Plugins register toolbar definitions using the `registerRichEditorToolbars` method of the [plugin registration file](../../extend/system/plugins.md). Each definition supplies a label and a description, along with an optional button list.

```php
public function registerRichEditorToolbars()
{
    return [
        'shop-content' => [
            'label' => 'Shop Content',
            'description' => 'Used by shop product and category descriptions.',
        ],
    ];
}
```

The definition above contains no buttons, so it inherits the default toolbar until an administrator customizes it. Specify the `buttons` value as a comma separated list to register an opinionated button set, which also acts as the baseline for the **Reset to Default** feature.

```php
public function registerRichEditorToolbars()
{
    return [
        'shop-content' => [
            'label' => 'Shop Content',
            'description' => 'Used by shop product and category descriptions.',
            'buttons' => 'paragraphFormat, bold, italic, |, insertImage, insertPageLink, html',
        ],
    ];
}
```

Registered definitions appear in the settings area automatically, where administrators can review and customize them. [Custom buttons](#registering-a-custom-button) registered in JavaScript can be included in a definition by their registered name.

## Toolbar Precedence

The toolbar button list is resolved for each editor from the first available source.

1. The field `toolbarButtons` property, used exactly as written.
2. The field `toolbar` property, resolved to its toolbar definition.
3. The **default** toolbar definition, when it has been customized.
4. The built-in default button list.

Custom buttons registered with a `toolbar` placement (see below) are added to the default toolbar automatically, and the default definition in the settings area displays them in place. Modifying the default toolbar stores the visible buttons exactly, making the placed buttons real entries that can be moved or removed. Every other source is used verbatim, so include the custom button name in the toolbar definition to display it there.

## Registering a Custom Button

Custom toolbar buttons are registered in JavaScript using the `oc.richEditor.registerButton` function. The API is available on every backend page, even when no rich editor is present, and the definition is editor-agnostic, it is not coupled to the underlying editor engine.

```js
oc.richEditor.registerButton('insertCustomThing', {
    label: 'Insert Something',
    icon: 'icon-star',
    toolbar: 'end',
    undo: true,
    focus: true,
    onClick: function(editor) {
        editor.insertHtml('<strong>My Custom Thing!</strong>');
    }
});
```

Register the JavaScript globally on every backend page, so the button is available to every rich editor surface, including the form widget and the CMS editor.

```php
Event::listen('backend.page.beforeDisplay', function($controller) {
    $controller->addJs('/plugins/october/test/assets/js/custom-button.js');
});
```

::: warning
Call `registerButton` at the top level of your script, plain and module scripts both work. Do not wrap the call in `oc.pageReady()`. Registration must complete before the first editor on the page initializes, which is guaranteed for any script included in the page.
:::

The following properties are supported by the button definition.

Property | Description
------------- | -------------
**label** | the button tooltip and accessible label.
**icon** | an icon class name, for example `icon-star`, or custom markup as `{ html: '<svg>...</svg>' }`.
**toolbar** | where to place the button: `start`, `end`, `{ before: 'name' }` or `{ after: 'name' }`. Omit to register the command without placing it.
**separator** | inserts a separator line next to the button: `before`, `after` or `both`.
**undo** | records an undo step after the button action. Default: `true`.
**focus** | focuses the editor before the button action. Default: `true`.
**onClick** | function called when the button is clicked, receives the editor instance.

### The Editor Instance

The `onClick` function receives an editor object with the following methods, which remain stable across editor engine versions.

Method | Description
------------- | -------------
**insertHtml(html)** | inserts HTML at the cursor position.
**insertElement(element)** | inserts a DOM element or jQuery object.
**insertUiBlock(node)** | inserts a non-editable block element.
**getContent()** / **setContent(html)** | reads or replaces the document contents.
**saveSelection()** / **restoreSelection()** | preserves the selection around popups or dialogs.
**focus()** | focuses the editing surface.
**saveUndoStep()** | records an undo checkpoint.
**engine** | the active engine name, for advanced use.
**native** | the raw engine instance, engine-specific and subject to change.

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
