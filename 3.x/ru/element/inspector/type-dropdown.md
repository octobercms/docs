---
subtitle: Тип Inspector
shortname: Dropdown
---
# Тип Inspector Dropdown

Тип inspector `dropdown` используется для выбора одного значения из набора предопределённых опций. Список опций для свойств dropdown и set может быть статическим или динамическим. Статические опции определяются элементом `options` определения свойства.

```php
public function defineProperties()
{
    return [
        'unit' => [
            'title' => 'Unit',
            'type' => 'dropdown',
            'default' => 'imperial',
            'placeholder' => 'Select units',
            'options' => ['metric' => 'Metric', 'imperial' => 'Imperial']
        ]
    ];
}
```

Генерируемый вывод — строковое значение, соответствующее выбранной опции, например:

```json
"unit": "metric"
```

Обычно используются следующие [значения конфигурации](../inspector-types.md).

Свойство | Описание
------------- | -------------
**title** | заголовок свойства.
**description** | краткое описание свойства, необязательно.
**default** | значение по умолчанию (строка), необязательно.
**options** | массив опций для выпадающих свойств, необязательно при определении метода `get*PropertyName*Options`.

## Динамические опции

Список опций может быть получен динамически с сервера при отображении Inspector. Если параметр `options` опущен в определении свойства dropdown или set, список опций считается динамическим. Класс компонента должен определить метод, возвращающий список опций. Метод должен иметь имя в формате: `get*PropertyName*Options`, где **Property** — имя свойства, например: `getCountryOptions`. Метод возвращает массив опций, где ключи массива — значения опций, а значения массива — метки опций. Пример определения динамического выпадающего списка.

```php
public function defineProperties()
{
    return [
        'country' => [
            'title' => 'Country',
            'type' => 'dropdown',
            'default' => 'us'
        ]
    ];
}

public function getCountryOptions()
{
    return ['us' => 'United states', 'ca' => 'Canada'];
}
```

Динамические выпадающие списки и списки set могут зависеть от других свойств. Например, список штатов может зависеть от выбранной страны. Зависимости объявляются параметром `depends` в определении свойства. Следующий пример определяет два динамических выпадающих свойства, и список штатов зависит от страны.

```php
public function defineProperties()
{
    return [
        'country' => [
            'title' => 'Country',
            'type' => 'dropdown',
            'default' => 'us'
        ],
        'state' => [
            'title' => 'State',
            'type' => 'dropdown',
            'default' => 'dc',
            'depends' => ['country'],
            'placeholder' => 'Select a state'
        ]
    ];
}
```

Для загрузки списка штатов нужно знать, какая страна выбрана в Inspector. Inspector отправляет POST-запрос со всеми значениями свойств в обработчик `getPropertyOptions`, поэтому можно сделать следующее.

```php
public function getStateOptions()
{
    // Load the country property value from POST
    $countryCode = post('country');

    $states = [
        'ca' => ['ab' => 'Alberta', 'bc' => 'British columbia'],
        'us' => ['al' => 'Alabama', 'ak' => 'Alaska']
    ];

    return $states[$countryCode];
}
```

## Свойства списка страниц

Иногда компонентам необходимо создавать ссылки на страницы сайта. Например, список записей блога содержит ссылки на страницу деталей записи. В этом случае компонент должен знать имя файла страницы деталей записи (затем он может использовать [Twig-фильтр page](../../markup/filter/page.md)). October включает хелпер для создания динамических выпадающих списков страниц. Следующий пример определяет свойство postPage, отображающее список страниц:

```php
public function defineProperties()
{
    return [
        'postPage' => [
            'title' => 'Post page',
            'type' => 'dropdown',
            'default' => 'blog/post'
        ]
    ];
}

public function getPostPageOptions()
{
    return Page::sortBy('baseFileName')->lists('baseFileName', 'baseFileName');
}
```
