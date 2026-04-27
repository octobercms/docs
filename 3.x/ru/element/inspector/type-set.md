---
subtitle: Тип Inspector
shortname: Set
---
# Тип Inspector Set

Тип inspector `set` используется для множественного выбора из предопределённых опций. Тип inspector `set` поддерживает те же методы определения опций, что и [тип inspector dropdown](./type-dropdown.md).

```php
public function defineProperties()
{
    return [
        'units' => [
            'title' => 'Select Muitple Units',
            'type' => 'set',
            'items' => [
                'metric' => 'Metric',
                'imperial' => 'Imperial'
            ]
        ]
    ];
}
```

Генерируемый вывод — массив значений, соответствующих выбранным опциям, например:

```json
"units": ["metric", "imperial"]
```

Обычно используются и поддерживаются следующие [значения конфигурации](../inspector-types.md).

Свойство | Описание
------------- | -------------
**title** | заголовок свойства.
**description** | краткое описание свойства, необязательно.
**items** | массив доступных элементов как ключи и значения, необязательно при определении метода `get*PropertyName*Options`.
**default** | массив выбранных по умолчанию элементов, содержащий только ключи.

Параметр `default`, если указан, должен быть массивом, перечисляющим ключи элементов, выбранных по умолчанию.

```php
public function defineProperties()
{
    return [
        'context' => [
            'title' => 'Context',
            'type' => 'set',
            'items' => [
                'create' => 'Create',
                'update' => 'Update',
                'preview' => 'Preview'
            ],
            'default' => ['create', 'update']
        ]
    ];
}
```

Для динамического указания `items` создайте метод `get*PropertyName*Options`, определённый в модели.

```php
public function getContextOptions()
{
    return ContextModel::pluck('name', 'code')->all();
}
```

#### См. также

::: also
* [Тип Inspector Dropdown](./type-dropdown.md)
:::
