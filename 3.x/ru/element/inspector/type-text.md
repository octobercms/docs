---
subtitle: Тип Inspector
shortname: Text
---
# Тип Inspector Text

Тип inspector `text` позволяет вводить многострочные длинные текстовые значения во всплывающем окне. Редактор не имеет специфических параметров. Необязательный параметр `default` для редактора должен содержать строку.

```php
public function defineProperties()
{
    return [
        'description' => [
            'title' => 'Description',
            'type' => 'text',
            'default' => 'This is a default description'
        ]
    ];
}
```

Генерируемый вывод — строковое значение, соответствующее выбранной опции, например:

```json
"description": "This is a description"
```

Обычно используются следующие [значения конфигурации](../inspector-types.md).

Свойство | Описание
------------- | -------------
**title** | заголовок свойства.
**description** | краткое описание свойства, необязательно.
**default** | значение по умолчанию (строка), необязательно.
