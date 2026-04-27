---
subtitle: Поле формы
shortname: Text
---
# Поле Text

Поле `text` рендерит однострочное текстовое поле ввода. Это тип по умолчанию, используемый если тип не указан.

```yaml
blog_title:
    type: text
    label: Blog Title
```

Обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**placeholder** | текст, отображаемый в поле, когда оно пустое.
**default** | определяет значение строки по умолчанию, необязательно.
**comment** | размещает описательный комментарий под полем.

Вы можете использовать свойство `default` для установки значения по умолчанию.

```yaml
quote_content:
    type: text
    label: Details
    default: I like turtles
```

Используйте свойство `placeholder` для назначения текста-заполнителя.

```yaml
point_summary:
    type: text
    label: Point
    placeholder: Type some key points are you trying to make
```
