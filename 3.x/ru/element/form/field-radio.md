---
subtitle: Поле формы
shortname: Radio List
---
# Поле Radio List

Поле `radio` рендерит список радио-кнопок, где одновременно можно выбрать только один элемент. Радио-поля поддерживают те же методы определения опций, что и [тип поля dropdown](./field-dropdown.md).

```yaml
security_level:
    type: radio
    label: Access Level
    options:
        all: All
        registered: Registered only
        guests: Guests only
```

Обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**default** | значение по умолчанию для новых записей.
**options** | доступные опции для радио-списка, как массив.
**optionsMethod** | получает опции из метода, определённого в модели или как статический метод, например `Class::method`.
**cssClass** | используется для установки опций в строку.
**inlineOptions** | отображает опции рядом друг с другом вместо стопкой.

Вы можете использовать свойство `default` для установки значения по умолчанию, где значение — ключ опции.

```yaml
security_level:
    type: radio
    label: Access Level
    default: guests
```

В дополнение к простым массивам, радио-списки поддерживают вторичное описание как часть своих `options`.

```yaml
security_level:
    type: radio
    label: Access Level
    options:
        all: [All, Guests and customers will be able to access this page.]
        registered: [Registered only, Only logged in member will be able to access this page.]
        guests: [Guests only, Only guest users will be able to access this page.]
```

Чтобы визуально отобразить опции рядом друг с другом вместо стопкой, установите свойство `inlineOptions` в `true`.

```yaml
security_level:
    type: radio
    label: Access Level
    inlineOptions: true
```

## Динамические опции

Радио-списки поддерживают те же методы определения опций, что и [тип поля dropdown](./field-dropdown.md).

В дополнение к этим определениям, для радио-списков метод может возвращать либо простой массив: **key => value**, либо массив массивов для предоставления описаний: **key => [label, description]**.

```php
public function listAccessLevels($fieldName, $value, $formData)
{
    return [
        'all' => ['All', 'Guests and customers will be able to access this page.'],
        // ...
    ];
}
```

#### См. также

::: also
* [Поле формы Dropdown](./field-dropdown.md)
:::
