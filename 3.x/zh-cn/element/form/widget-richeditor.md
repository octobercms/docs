---
subtitle: 表单小部件
shortname: Rich Editor / WYSIWYG
---
# Rich Editor / WYSIWYG 字段

`richeditor` - 渲染一个用于富文本格式的可视化编辑器，也称为所见即所得（WYSIWYG）编辑器。

```yaml
html_content:
    type: richeditor
    label: Contents
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**toolbarButtons** | 在编辑器工具栏上显示的按钮。示例：`bold|italic`
**size** | 为使用它的字段指定字段大小，例如 textarea 字段。选项：`tiny`、`small`、`large`、`huge`、`giant`。
**showMargins** | 设置为 `true` 以包含可调整大小的文档边距。默认值：`false`。
**useLineBreaks** | 每行使用换行符而不是段落包装。默认值：`false`。
**editorOptions** | 编辑器控件使用的自定义编辑器选项，以数组形式（高级）。

您可以使用 `size` 属性指定字段大小。

```yaml
html_content:
    type: richeditor
    label: Contents
    size: huge
```

使用 `toolbarButtons` 属性指定自定义按钮。

```yaml
html_content:
    type: richeditor
    label: Contents
    toolbarButtons: bold|italic|underline
```

双管道字符 `||` 可用于在按钮之间插入分隔符。

```yaml
toolbarButtons: bold|italic|underline||insertPageLink||undo|redo||clearFormatting
```

可用的工具栏按钮有：

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
`|` 字符将在工具栏中插入垂直分隔线。
:::

## 注册自定义按钮

以下 JavaScript 代码可用于将自定义按钮注册为命令。

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

然后将按钮添加到默认集合中。

```js
oc.richEditorButtons.splice(0, 0, 'insertCustomThing');
```

注册 JavaScript 时，它应在 Rich Editor 注册的资源之后加载。您可以扩展 `RichEditor` 类构造函数来实现这一点。

```php
\Backend\FormWidgets\RichEditor::extend(function($controller) {
    $controller->addJs('/plugins/october/test/assets/js/custom-button.js');
});
```

### 从自定义按钮触发模态框

使用 `oc.popup` JavaScript 函数打开模态窗口。

```js
oc.popup({
    handler: 'onLoadPopup'
});
```

使用 `backend.ajax.beforeRunHandler` 注册全局 AJAX 处理程序。可以调用 `makePartial` 方法渲染包含模态内容的部件。

```php
Event::listen('backend.ajax.beforeRunHandler', function ($controller, $handler) {
    if ($handler === 'onLoadPopup') {
        return $controller->makePartial('~/path/to/my/partials/_popup_form.php');
    }
});
```

## 高级编辑器选项

使用 `editorOptions` 属性自定义编辑器选项。这是一个高级属性，因为此处定义的所有选项都直接代理到编辑器控件。

```yaml
html_content:
    type: richeditor
    editorOptions:
        imageDefaultWidth: 0
```

以下列出了一些示例选项。

选项 | 描述
------ | -----------
**imageDefaultWidth** | 设置图片插入富文本编辑器时的默认宽度。设置为 `0` 将不设置任何宽度。默认值：`300`。
**imageDefaultAlign** | 设置图片插入富文本编辑器时的默认对齐方式。可选值为 `left`、`center` 和 `right`。默认值：`center`。
**imageDefaultDisplay** | 设置图片插入富文本时的默认显示方式。可选选项：`inline` 和 `block`。默认值：`block`
**imageResize** | 设置为 `false` 时禁用图片调整大小。默认值：`true`
**imagePaste** | 允许从剪贴板粘贴图片。默认值：`true`
