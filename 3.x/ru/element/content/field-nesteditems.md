---
subtitle: Контентное поле
shortname: Nested Items
---
# Поле Nested Items

`nesteditems` — создаёт вложенные записи, принадлежащие исключительно текущей записи.

```yaml
items:
    label: Menu Items
    type: nesteditems
    span: adaptive
    form:
        fields:
            title:
                label: Title
                type: text
```

<VideoBlockLink src="https://www.youtube.com/watch?v=vhs9U3_BHqg" title="Руководство по Nested Items" description="Это видео демонстрирует, как реализовать контентное поле Nested Items с пошаговыми инструкциями." prompt="Смотреть руководство" />

Поддерживаются следующие свойства.

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**default** | значение по умолчанию (массив), необязательно.
**comment** | пояснительный комментарий под полем.
**form** | инлайн-определения полей формы.
**maxDepth** | отображает интерфейс для изменения порядка записей, задавая максимальную глубину вложенности. Установите `0` для неограниченной глубины.
**customMessages** | настройка сообщений, используемых в пользовательском интерфейсе.

Как и любая другая форма, nested items поддерживают использование вкладок, размещая поля под свойствами `tabs` или `secondaryTabs` определения `form`.

```yaml
tabbed_content:
    type: nesteditems
    form:
        tabs:
            fields:
                # ...
```

Свойство `customMessages` используется для изменения различных сообщений, используемых в определении поля. Доступные сообщения общие с сообщениями [поведения Relation Controller](../../extend/forms/relation-controller.md).

```yaml
author:
    type: nesteditems
    customMessages:
        buttonCreate: New Author
        titleUpdateForm: Update Author
        titleCreateForm: Create Author
```

#### См. также

::: also
* [Контентное поле Entries](./field-entries.md)
* [Виджет формы Repeater](../form/widget-repeater.md)
:::
