---
subtitle: UI формы
shortname: Section
---
# Поле Section

UI-элемент `section` рендерит заголовок и подзаголовок секции. Значения `label` и `comment` необязательны и содержат контент для заголовка и подзаголовка.

```yaml
_section1:
    type: section
    label: User details
    comment: This section contains details about the user.
```

Поддерживаются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | текст заголовка секции.
**comment** | вторичный текст секции.
**displayMode** | определяет, как отображать секцию — `simple` или `heading`. По умолчанию: `heading`

Для отображения простого комментария вместо заголовка в секции установите свойство `displayMode`.

```yaml
_section1:
    type: section
    label: These fields are used to calculate some other fields.
    displayMode: simple
```
