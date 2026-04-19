---
subtitle: Тип Inspector
shortname: Autocomplete
---
# Тип Inspector Autocomplete

Тип inspector `autocomplete` работает как редактор `string`, но включает функции автодополнения. Доступные опции могут быть указаны статически с помощью параметра `options` или загружены динамически.

```php
public function defineProperties()
{
    return [
        'condition' => [
            'title' => 'Condition',
            'type' => 'autocomplete',
            'options' => ['start' => 'Start', 'end' => 'End']
        ]
    ];
}
```

Генерируемый вывод — значение, соответствующее выбранным опциям, например:

```json
"condition": "start"
```

Обычно используются следующие [значения конфигурации](../inspector-types.md).

Свойство | Описание
------------- | -------------
**title** | заголовок свойства.
**description** | краткое описание свойства, необязательно.
**default** | значение по умолчанию (строка), необязательно.
**options** | массив опций для выпадающих свойств, необязательно при определении метода `get*PropertyName*Options`.
**showExternalParam** | не поддерживается, должно быть установлено в `false`.

::: warning
Этот тип не поддерживает редактор внешних параметров, указанный свойством `showExternalParam`.
:::

## Динамические опции

Тип inspector `autocomplete` поддерживает те же методы определения опций, что и [тип inspector dropdown](./type-dropdown.md).

```php
public function defineProperties()
{
    return [
        'sortColumn' => [
            'title' => 'Sort by Column',
            'type' => 'autocomplete',
            // ...
        ],
    ];
}

public function getSortColumnOptions()
{
    return [
        'create' => 'Create',
        'update' => 'Update',
        'delete' => 'Delete',
    ];
}
```

#### См. также

::: also
* [Тип Inspector Dropdown](./type-dropdown.md)
:::
