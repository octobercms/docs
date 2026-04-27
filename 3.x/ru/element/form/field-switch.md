---
subtitle: Поле формы
shortname: Switch
---
# Поле Switch

Поле `switch` рендерит переключатель. Аналогично [полю checkbox](./field-checkbox.md), но отображается как тумблер.

```yaml
show_content:
    label: Display Content
    type: switch
```

Поддерживаются и обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**default** | значение по умолчанию для новых записей.
**comment** | текст, отображаемый под чекбоксом.

Вы можете использовать свойство `default` для включения переключателя по умолчанию.

```yaml
show_content:
    label: Display Content
    type: switch
    default: true
```

Используйте `comment` для отображения сопроводительного текста.

```yaml
show_content:
    label: Display Content
    type: switch
    comment: Flick this switch to display content
```

<!--
@deprecated
You may customize the switch text by passing an array to the `options` value with false and true labels.

```yaml
show_content:
    label: Display Content
    type: switch
    options:
        - Nope
        - Yeah
```
-->


#### См. также

::: also
* [Поле формы Checkbox](./field-checkbox.md)
:::
