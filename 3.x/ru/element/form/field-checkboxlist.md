---
subtitle: Поле формы
shortname: Checkbox List
---
# Поле Checkbox List

Поле `checkboxlist` рендерит список чекбоксов. Списки чекбоксов поддерживают те же методы определения опций, что и [тип поля dropdown](./field-dropdown.md), а также поддерживают вторичные описания, представленные в [типе поля radio](./field-radio.md).

```yaml
permissions:
    label: Permissions
    type: checkboxlist
    options:
        open_account: Open account
        close_account: Close account
        modify_account: Modify account
```

Поддерживаются и обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**options** | доступные опции для списка, как массив.
**optionsMethod** | получает опции из метода, определённого в модели или как статический метод, например `Class::method`.
**default** | значение по умолчанию для новых записей.
**quickselect** | показывает кнопки быстрого выбора.
**cssClass** | используется для установки опций в строку.
**inlineOptions** | отображает опции рядом друг с другом вместо стопкой, когда менее 10 опций.
**placeholder** | сообщение, отображаемое когда записи не выбраны (контекст предпросмотра).
**cumulative** | при вложенных чекбоксах, установка родительского отмечает все дочерние. По умолчанию: `false`

Вы можете использовать свойство `default` для установки значения по умолчанию, где значение — ключ опции.

```yaml
permissions:
    label: Permissions
    type: checkboxlist
    default: open_account
```

Опции могут отображаться в строку друг с другом вместо отдельных строк, установив свойство `inlineOptions` в `true`. Это применяется только когда доступных опций менее 10.

```yaml
permissions:
    type: checkboxlist
    inlineOptions: true
```

Меню быстрого выбора с кнопками «Выбрать все» и «Снять все» станет видимым, когда в списке более 10 элементов. Для явного включения этих кнопок используйте опцию `quickselect`.

```yaml
permissions:
    type: checkboxlist
    quickselect: true
```

При использовании [детализированных опций](../define-options.md) чекбоксы могут отображаться во вложенной структуре. Установите свойство `cumulative` в `true`, если хотите отмечать все дочерние чекбоксы при выборе родительского.

```yaml
permissions:
    type: checkboxlist
    cumulative: true
```

#### См. также

::: also
* [Детализированные определения опций](../define-options.md)
* [Поле формы Dropdown](./field-dropdown.md)
* [Поле формы Radio](./field-radio.md)
:::
