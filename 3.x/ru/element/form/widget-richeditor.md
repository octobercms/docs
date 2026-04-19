---
subtitle: Виджет формы
shortname: Rich Editor / WYSIWYG
---
# Поле Rich Editor / WYSIWYG

`richeditor` — рендерит визуальный редактор для форматированного текста, также известный как WYSIWYG-редактор.

```yaml
html_content:
    type: richeditor
    label: Contents
```

Поддерживаются и обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**default** | значение по умолчанию (строка), необязательно.
**comment** | пояснительный комментарий под полем.
**toolbarButtons** | кнопки для отображения на панели инструментов редактора. Пример: `bold|italic`
**size** | задаёт размер поля для полей, которые его используют, например, textarea. Варианты: `tiny`, `small`, `large`, `huge`, `giant`.
**showMargins** | установите в `true` для включения изменяемых полей документа. По умолчанию: `false`.
**useLineBreaks** | использует переносы строк вместо обёрток абзацев для каждой новой строки. По умолчанию: `false`.
**editorOptions** | пользовательские опции редактора, используемые элементом управления редактора в виде массива (расширенные).

Вы можете указать размер поля с помощью свойства `size`.

```yaml
html_content:
    type: richeditor
    label: Contents
    size: huge
```

Используйте свойство `toolbarButtons` для указания пользовательских кнопок.

```yaml
html_content:
    type: richeditor
    label: Contents
    toolbarButtons: bold|italic|underline
```

Символ двойной вертикальной черты `||` может использоваться для добавления разделителя между кнопками.

```yaml
toolbarButtons: bold|italic|underline||insertPageLink||undo|redo||clearFormatting
```

Доступные кнопки панели инструментов:

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
Символ `|` вставит вертикальную разделительную линию на панели инструментов.
:::

## Регистрация пользовательской кнопки

Следующий JavaScript-код может использоваться для регистрации пользовательской кнопки как команды.

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

Затем добавьте кнопку в коллекцию по умолчанию.

```js
oc.richEditorButtons.splice(0, 0, 'insertCustomThing');
```

При регистрации JavaScript он должен подключаться после ассетов, зарегистрированных Rich Editor. Для этого можно расширить конструктор класса `RichEditor`.

```php
\Backend\FormWidgets\RichEditor::extend(function($controller) {
    $controller->addJs('/plugins/october/test/assets/js/custom-button.js');
});
```

### Вызов модального окна из пользовательской кнопки

Используйте JavaScript-функцию `oc.popup` для открытия модального окна.

```js
oc.popup({
    handler: 'onLoadPopup'
});
```

Используйте `backend.ajax.beforeRunHandler` для регистрации глобального AJAX-обработчика. Метод `makePartial` может быть вызван для рендеринга частичного представления с содержимым модального окна.

```php
Event::listen('backend.ajax.beforeRunHandler', function ($controller, $handler) {
    if ($handler === 'onLoadPopup') {
        return $controller->makePartial('~/path/to/my/partials/_popup_form.php');
    }
});
```

## Расширенные опции редактора

Используйте свойство `editorOptions` для настройки опций редактора. Это расширенное свойство, поскольку все определённые здесь опции проксируются напрямую в элемент управления редактора.

```yaml
html_content:
    type: richeditor
    editorOptions:
        imageDefaultWidth: 0
```

Ниже перечислены некоторые примеры опций.

Опция | Описание
------ | -----------
**imageDefaultWidth** | Устанавливает ширину изображения по умолчанию при вставке в редактор. Установка в `0` не задаёт ширину. По умолчанию: `300`.
**imageDefaultAlign** | Устанавливает выравнивание изображения по умолчанию при вставке в редактор. Возможные значения: `left`, `center` и `right`. По умолчанию: `center`.
**imageDefaultDisplay** | Устанавливает отображение изображения по умолчанию при вставке в редактор. Возможные варианты: `inline` и `block`. По умолчанию: `block`
**imageResize** | Отключает изменение размера изображения при значении `false`. По умолчанию: `true`
**imagePaste** | Разрешает вставку изображений из буфера обмена. По умолчанию: `true`
