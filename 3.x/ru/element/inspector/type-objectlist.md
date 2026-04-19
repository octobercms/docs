---
subtitle: Тип Inspector
shortname: Object List
---
# Тип Inspector Object List

Тип inspector `objectList` позволяет пользователям создавать несколько объектов с предопределённой структурой. Например, он может использоваться для создания списка людей, где каждый человек имеет имя и адрес.

Свойства объектов, создаваемых редактором, определяются параметром `itemProperties`. Параметр должен содержать массив свойств, аналогичный массиву конфигурации inspector. Другой обязательный параметр — `titleProperty`, который определяет свойство, используемое как заголовок в интерфейсе inspector.

Массив свойств, определённый в `itemProperties`, поддерживает все типы свойств.

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'objectList',
            'titleProperty' => 'fullName',
            'itemProperties' => [
                'fullName' => [
                    'title' => 'Full Name',
                    'type' => 'string'
                ],
                'address' => [
                    'title' => 'Address',
                    'type' => 'string'
                ]
            ]
        ]
    ];
}
```

По умолчанию генерируемый вывод — неассоциативный массив, например:

```json
"people": [
    {"fullName": "John Smith", "address": "Palo Alto"},
    {"fullName": "Bart Simpson", "address": "Springfield"}
]
```

Обычно используются и поддерживаются следующие [значения конфигурации](../inspector-types.md).

Свойство | Описание
------------- | -------------
**title** | заголовок свойства.
**description** | краткое описание свойства, необязательно.
**keyProperty** | использовать ключ этого свойства как заголовок, определённый в **itemProperties**.
**titleProperty** | использовать имя этого свойства как заголовок, определённый в **itemProperties**.
**itemProperties** | массив вложенных определений свойств.

::: warning
Тип inspector Object List не поддерживает значения по умолчанию.
:::

Если результирующее значение должно быть ассоциативным массивом (объектом), используйте опцию конфигурации `keyProperty`. Значение опции должно ссылаться на свойство, которое будет использоваться как ключ. Свойство-ключ может использовать только редакторы string или dropdown, его значение должно быть уникальным и не может быть пустым.

```php
public function defineProperties()
{
    return [
        'address' => [
            'title' => 'Address',
            'type' => 'objectList',
            'titleProperty' => 'fullName',
            'keyProperty' => 'login',
            'itemProperties' => [
                'fullName' => [
                    'title' => 'Full Name',
                    'type' => 'string'
                ],
                'login' => [
                    'title' => 'Login',
                    'type' => 'string'
                ],
                'address' => [
                    'title' => 'Address',
                    'type' => 'string'
                ]
            ]
        ]
    ];
}
```

Свойство `login` в примере выше будет использоваться как ключ в результирующем значении:

```json
"people": {
    "john": {"fullName": "John Smith", "address": "Palo Alto"},
    "bart": {"fullName": "Bart Simpson", "address": "Springfield"}
}
```
