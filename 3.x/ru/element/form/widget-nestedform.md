---
subtitle: Виджет формы
shortname: Nested Form
---
# Поле Nested Form

`nestedform` — рендерит вложенную форму, используя связанную запись или [атрибут jsonable](../../extend/system/models.md). Поля могут быть определены инлайн или с использованием внешнего yaml-файла.

```yaml
content:
    type: nestedform
    showPanel: false
    form:
        fields:
            added_at:
                label: Date Added
                type: datepicker
            details:
                label: Details
                type: textarea
            title:
                label: This the title
                type: text
```

Поддерживаются и обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**comment** | пояснительный комментарий под полем.
**form** | инлайн-определения полей или ссылка на файл определения полей формы.
**showPanel** | размещает форму внутри контейнера панели. По умолчанию: `true`
**defaultCreate** | если связанная запись не найдена, попытаться создать её. По умолчанию: `false`

Передайте строку в свойство `form` для ссылки на внешний yaml-файл.

```yaml
profile:
    label: Profile
    type: nestedform
    form: $/october/demo/models/profile/fields.yaml
```

Как и любая другая форма, виджет вложенной формы поддерживает использование вкладок, размещая поля под свойствами `tabs` или `secondaryTabs` определения `form`.

```yaml
tabbed_content:
    type: nestedform
    form:
        tabs:
            fields:
                # ...
```

#### См. также

::: also
* [Виджет формы Repeater](./widget-repeater.md)
:::
