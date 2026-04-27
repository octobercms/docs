---
subtitle: UI формы
shortname: Hint
---
# Поле Hint

UI-элемент `hint` идентичен [элементу partial](./ui-partial.md), но рендерится внутри контейнера подсказки, который может быть скрыт пользователем.

```yaml
_hint1:
    type: hint
    path: content_field
```

Поддерживаются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | текст заголовка секции.
**comment** | вторичный текст секции.
**mode** | визуальный режим отображения: `tip`, `info`, `warning`, `danger`, `success`. По умолчанию: `info`.
**path** | путь к [файлу частичного представления](../../extend/system/views.md).

Подсказка поддерживает встроенный контент в поле. Значения `label` и `comment` необязательны и содержат контент для заголовка и подзаголовка. Вы также можете использовать синтаксис Markdown для значений.

```yaml
_tip1:
    type: hint
    mode: tip
    label: Pro Tip
    comment: Always check to make sure this field is populated.
```

Свойство `mode` поддерживает значения: tip, info, warning, danger, success

```yaml
_warning1:
    type: hint
    mode: warning
    label: Always wash your hands
    comment: This is good for stopping the spread of germs.
```
