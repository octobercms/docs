---
subtitle: Тип Inspector
shortname: Object
---
# Тип Inspector Object

Тип inspector `object` позволяет определять объект с конкретными свойствами, редактируемыми пользователями. Свойства объекта задаются атрибутом `properties`. Значение атрибута — массив, имеющий ту же структуру, что и массив свойств inspector.

Приведённый пример создаёт объект с тремя свойствами. Два из них отображаются как текстовые поля, а третье — как выпадающий список.

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'object',
            'properties' => [
                'streetAddress' => [
                    'title' => 'Street Address',
                    'type' => 'string'
                ],
                'city' => [
                    'title' => 'City',
                    'type' => 'string'
                ],
                'country' => [
                    'title' => 'Country',
                    'type' => 'dropdown',
                    'options' => [
                        'us' => 'US',
                        'ca' => 'Canada'
                    ]
                ]
            ],
        ]
    ];
}
```

Генерируемый вывод — объект, например:

```json
"address": {
    "streetAddress": "321-210 Second ave",
    "city": "Springfield",
    "country": "us"
}
```

Обычно используются и поддерживаются следующие [значения конфигурации](../inspector-types.md).

Свойство | Описание
------------- | -------------
**title** | заголовок свойства.
**description** | краткое описание свойства, необязательно.
**properties** | массив вложенных определений свойств.
**default** | массив заполненных элементов по умолчанию, содержащий ключи и значения.
**ignoreIfPropertyEmpty** | задаёт массив значений, которые должны быть исключены из вывода, если значение пусто.

::: warning
Этот тип не поддерживает редактор внешних параметров, указанный свойством `showExternalParam`.
:::

Свойства объекта могут быть любого типа, поддерживаемого inspector, включая другие объекты. Существует способ полностью исключить объект из значений Inspector, если одно из полей объекта пусто. Поле идентифицируется параметром `ignoreIfPropertyEmpty`. Например:

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'object',
            'ignoreIfPropertyEmpty' => 'title',
            'properties' => [
                'streetAddress' => [
                    'title' => 'Street Address',
                    'type' => 'string'
                ],
                'city' => [
                    'title' => 'City',
                    'type' => 'string'
                ]
            ],
        ]
    ];
}
```

В примере выше, если адрес улицы не указан, объект ("address") будет полностью удалён из вывода inspector. Если для других свойств объекта определены правила валидации и обязательное свойство пусто, эти правила будут проигнорированы.

Значение `default` для редактора, если указано, должно быть объектом с теми же свойствами, что и определённые в параметре конфигурации `properties`.

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'object',
            'properties' => [/*...*/],
            'default' => [
                'streetAddress' => '321-210 Second ave',
                'city' => 'Springfield',
                'country' => 'us'
            ]
        ]
    ];
}
```
