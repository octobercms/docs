---
subtitle: Поле формы
shortname: Checkbox
---
# Поле Checkbox

Поле `checkbox` рендерит одиночный чекбокс.

```yaml
show_content:
    type: checkbox
    label: Display content
```

Обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**default** | значение по умолчанию для новых записей.
**comment** | текст, отображаемый под чекбоксом.

Вы можете использовать свойство `default` для установки чекбокса отмеченным по умолчанию.

```yaml
show_content:
    type: checkbox
    label: Display content
    default: true
```

Используйте `comment` для отображения сопроводительного текста.

```yaml
is_active:
    type: checkbox
    label: Active
    comment: Check this box to make the record active.
```
