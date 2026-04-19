---
subtitle: Узнайте, как определять свойства компонентов.
---
# Типы Inspector

Типы Inspector — это типы свойств, используемые CMS-компонентами. На них ссылаются следующие области:

- [Классы CMS-компонентов](../extend/cms-components.md)

Все типы inspector идентифицируются по их индивидуальному свойству **type**.

```php
public function defineProperties()
{
    return [
        'maxItems' => [
            'title' => 'Max Items',
            'type' => 'string'
        ]
    ];
}
```

## Доступные типы

Доступны следующие типы inspector:

<div class="content-list-p" markdown="1">

[String](./inspector/type-string.md)
[String List](./inspector/type-stringlist.md)
[Text](./inspector/type-text.md)
[Autocomplete](./inspector/type-autocomplete.md)
[Checkbox](./inspector/type-checkbox.md)
[Dropdown](./inspector/type-dropdown.md)
[Dictionary](./inspector/type-dictionary.md)
[Object](./inspector/type-object.md)
[Object List](./inspector/type-objectlist.md)
[Set](./inspector/type-set.md)

</div>

## Доступная конфигурация

Параметры свойств определяются массивом со следующими ключами.

Ключ | Описание
------------- | -------------
**title** | обязательно, заголовок свойства, используется Inspector компонентов в панели управления CMS.
**description** | обязательно, описание свойства, используется Inspector компонентов в панели управления CMS.
**default** | необязательно, значение свойства по умолчанию при добавлении компонента на страницу или макет в панели управления CMS.
**type** | определяет тип свойства, который задаёт способ отображения свойства в Inspector.
**validation** | необязательно, определяет правила валидации для значения свойства (см. ниже).
**placeholder** | необязательный заполнитель для строковых и выпадающих свойств.
**options** | необязательный массив опций для выпадающих свойств.
**optionsMethod** | указывает имя метода в классе компонента для получения опций.
**depends** | массив имён свойств, от которых зависит выпадающее свойство. Подробнее см. [тип dropdown](./inspector/type-dropdown.md).
**group** | необязательное имя группы. Группы создают секции в Inspector, упрощая пользовательский опыт. Используйте одинаковое имя группы в нескольких свойствах для их объединения.
**showExternalParam** | определяет видимость редактора внешних параметров для свойства в Inspector. По умолчанию: `true`.
**ignoreIfDefault** | установите в `true` для исключения вывода из массива, если выбор совпадает со значением по умолчанию. По умолчанию: `false`
**ignoreIfEmpty** | установите в `true` для исключения вывода из массива, если выбор имеет пустое значение. По умолчанию: `false`
**sortOrder** | задаёт пользовательскую позицию свойства в списке как целое число.

## Правила валидации

Типы inspector поддерживают несколько правил валидации, которые могут применяться к свойствам. Правила валидации могут применяться как к свойствам верхнего уровня, так и к внутренним определениям свойств редакторов object и object list.

```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'required' => [
                    'message' => 'The Name field is required'
                ],
                'regex' => [
                    'message' => 'The Name field can contain only Latin letters.',
                    'pattern' => '^[a-zA-Z]+$'
                ]
            ]
        ]
    ];
}
```

Ключевое значение в объекте `validation` ссылается на валидатор (см. ниже). Валидаторы настраиваются с помощью объектов, свойства которых зависят от валидатора. Одно свойство — `message` — является общим для всех валидаторов.

### Валидатор Required

Валидатор `required` проверяет, что значение не пустое. Валидатор может использоваться с любым редактором, включая сложные редакторы (sets, dictionaries, object lists и т.д.). Пример:

```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'required' => [
                    'message' => 'The Name field is required'
                ]
            ]
        ]
    ];
}
```

### Валидатор Regex

Валидатор `regex` проверяет строковые значения с помощью регулярного выражения. Валидатор может использоваться только с редакторами строкового типа. Пример:


```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'regex' => [
                    'message' => 'The Name field can contain only Latin letters',
                    'pattern' => '^[a-z]+$',
                    'modifiers' => 'i'
                ]
            ]
        ]
    ];
}
```

Регулярное выражение задаётся обязательным параметром `pattern`. Параметр `modifiers` необязателен и может использоваться для установки модификаторов регулярного выражения.

### Валидатор Integer

Валидатор `integer` проверяет, что значение является целым числом, и может опционально проверять, находится ли значение в определённом интервале. Валидатор может использоваться только с редакторами строкового типа. Пример:


```php
public function defineProperties()
{
    return [
        'numOfColumns' => [
            'title' => 'Number of Columns',
            'type' => 'string',
            'validation' => [
                'integer' => [
                    'message' => 'The Number of Columns field should contain an integer value',
                    'allowNegative' => true,
                    'min' => [
                        'value' => -10,
                        'message' => 'The number of columns should not be less than -10.'
                    ],
                    'max' => [
                        'value' => 10,
                        'message' => 'The number of columns should not be greater than 10.'
                    ]
                ]
            ]
        ]
    ];
}
```

Поддерживаемые параметры:

* `allowNegative` — необязательно, определяет, разрешены ли отрицательные значения. По умолчанию отрицательные значения не разрешены.
* `min` — необязательный объект, определяет минимально допустимое значение и сообщение об ошибке. Поля объекта:
    * `value` — определяет минимальное значение.
    * `message` — необязательно, определяет сообщение об ошибке.
* `max` — необязательный объект, определяет максимально допустимое значение и сообщение об ошибке. Поля объекта:
    * `value` — определяет максимальное значение.
    * `message` — необязательно, определяет сообщение об ошибке.

### Валидатор Float

Валидатор `float` проверяет, что значение является числом с плавающей точкой. Параметры этого валидатора совпадают с параметрами валидатора **integer**, описанного выше. Пример:

```php
public function defineProperties()
{
    return [
        'amount' => [
            'title' => 'Amount',
            'type' => 'string',
            'validation' => [
                'float' => [
                    'message' => 'The Amount field should contain a positive floating point value'
                ]
            ]
        ]
    ];
}
```

Допустимые форматы чисел с плавающей точкой:

* 10
* 10.302
* -10 (если `allowNegative` равен `true`)
* -10.84 (если `allowNegative` равен `true`)

### Валидатор Length

Валидатор `length` проверяет, что строка, массив или объект не короче и не длиннее указанных значений. Этот валидатор может работать с редакторами string, text, set, string list, dictionary и object list. В редакторах с множественными значениями (set, string list, dictionary и object list) он проверяет количество элементов, созданных в редакторе.

::: tip
Валидатор `length` не проверяет пустые значения. Например, если он применён к редактору set и set пуст, валидация пройдёт успешно независимо от значений параметров `min` и `max`. Используйте валидатор `required` вместе с валидатором `length`, чтобы убедиться, что значение не пустое перед применением валидации длины.
:::

```php
public function defineProperties()
{
    return [
        'name' => [
            'title' => 'Name',
            'type' => 'string',
            'validation' => [
                'length' => [
                    'min' => [
                        'value' => 2,
                        'message' => 'The name should not be shorter than two letters.'
                    ],
                    'max' => [
                        'value' => 10,
                        'message' => 'The name should not be longer than 10 letters.'
                    ]
                ]
            ]
        ]
    ];
}
```

Поддерживаемые параметры:

* `min` — необязательный объект, определяет минимально допустимую длину и сообщение об ошибке. Поля объекта:
    * `value` — определяет минимальное значение.
    * `message` — необязательно, определяет сообщение об ошибке.
* `max` — необязательный объект, определяет максимально допустимую длину и сообщение об ошибке. Поля объекта:
    * `value` — определяет максимальное значение.
    * `message` — необязательно, определяет сообщение об ошибке.
