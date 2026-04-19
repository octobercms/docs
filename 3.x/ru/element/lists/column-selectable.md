---
subtitle: Столбец списка
shortname: Selectable
---
# Столбец Selectable

`selectable` — берёт значение столбца и сопоставляет его со значением из доступных опций записи. Возьмём следующий массив в качестве примера: если значение записи установлено в `open`, то в столбце отображается значение **Open**.

```php
['open' => 'Open', 'closed' => 'Closed']
```

Доступные опции определяются на основе [опций dropdown](../define-options.md).

```yaml
status:
    label: Status
    type: selectable
```

Поддерживаются следующие свойства.

Свойство | Описание
------------- | -------------
**options** | доступные опции для выпадающего списка, как массив.
**optionsMethod** | получает опции из метода, определённого в модели или как статический метод, например `Class::method`.
**optionsPreset** | получает опции из [предустановленного списка определённых опций](../define-options.md).

Значение `options` может явно задавать опции как массив.

```yaml
status:
    label: Status
    type: selectable
    options:
        pending: Pending
        active: Active
```

`optionsPreset` может использоваться для извлечения значения из [предустановленного определения опций](../define-options.md).

```yaml
icon:
    label: Icon
    type: selectable
    optionsPreset: phosphorIcons
```

#### См. также

::: also
* [Определение опций](../define-options.md)
* [Поле формы Dropdown](../form/field-dropdown.md)
:::
