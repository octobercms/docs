---
subtitle: Поле формы
shortname: Textarea
---
# Поле Textarea

Поле `textarea` рендерит многострочное текстовое поле.

```yaml
blog_contents:
    type: textarea
    label: Contents
```

Поддерживаются и обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**title** | заголовок поля формы.
**default** | определяет значение строки по умолчанию, необязательно.
**placeholder** | текст, отображаемый когда поле пустое.
**comment** | размещает описательный комментарий под полем.
**size** | размер поля по высоте. Поддерживаемые значения: `tiny`, `small`, `large`, `huge`, `giant`. По умолчанию: `large`.

Вы можете указать размер поля с помощью свойства `size`.

```yaml
blog_contents:
    type: textarea
    label: Contents
    size: large
```

Вы можете использовать свойство `default` для установки значения по умолчанию.

```yaml
quote_content:
    type: textarea
    label: Details
    default: I like turtles
```

Используйте свойство `placeholder` для назначения текста-заполнителя.

```yaml
point_summary:
    type: textarea
    label: Point
    placeholder: Type some key points are you trying to make
```
