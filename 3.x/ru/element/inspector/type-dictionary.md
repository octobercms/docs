---
subtitle: Тип Inspector
shortname: Dictionary
---
# Тип Inspector Dictionary

Тип inspector `dictionary` позволяет создавать пары ключ-значение с помощью простого пользовательского интерфейса, состоящего из таблицы с двумя столбцами. Параметр `default`, если указан, должен содержать объект ключ-значение.

```php
public function defineProperties()
{
    return [
        'options' => [
            'title' => 'Options',
            'type' => 'dictionary',
            'default' => ['option1' => 'Option 1'],
        ]
    ];
}
```

Генерируемый вывод — объект, соответствующий выбранным опциям, например:

```json
"options": {"option1": "Option 1", "option2": "Option 2"}
```

Обычно используются следующие [значения конфигурации](../inspector-types.md).

Свойство | Описание
------------- | -------------
**title** | заголовок свойства.
**description** | краткое описание свойства, необязательно.
**default** | значение по умолчанию — массив ключей и значений, необязательно.

## Дополнительная валидация

Редактор `dictionary` поддерживает валидацию для всего набора (валидаторы `required` и `length`), а также для ключей и значений по отдельности. Подробнее см. [описания валидации](../inspector-types.md). `validationKey` и `validationValue` определяют валидацию для ключей и значений, например:

```php
public function defineProperties()
{
    return [
        'options' => [
            'title' => 'Options',
            'type' => 'dictionary',
            'validation' => [
                'required' => [
                    'message' => 'Please create options'
                ],
                'length' => [
                    'min' => [
                        'value' => 2,
                        'message' => 'Create at least two options.'
                    ]
                ]
            ],
            'validationKey' => [
                'regex' => [
                    'pattern' => '^[a-z]+$',
                    'message' => 'Keys can contain only lowercase Latin letters'
                ]
            ],
            'validationValue' => [
                'regex' => [
                    'pattern' => '^[a-zA-Z0-9]+$',
                    'message' => 'Values can contain only Latin letters and digits'
                ]
            ]
        ]
    ];
}
```
