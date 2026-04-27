---
subtitle: Тип Inspector
shortname: Checkbox
---
# Тип Inspector Checkbox

Тип inspector `checkbox` представлен чекбоксом в интерфейсе. Это свойство не имеет специальных параметров. Параметр `default`, если указан, должен содержать булевое значение или строковые значения `true`, `false`, `1`, `0`.

```php
public function defineProperties()
{
    return [
        'enabled' => [
            'title' => 'Enabled',
            'type' => 'checkbox',
            'default' => true
        ]
    ];
}
```

Генерируемый вывод — `0` (не отмечен) или `1` (отмечен), например:

```json
"enabled": 1
```

Обычно используются следующие [значения конфигурации](../inspector-types.md).

Свойство | Описание
------------- | -------------
**title** | заголовок свойства.
**description** | краткое описание свойства, необязательно.
**default** | значение по умолчанию: `true` или `false`, необязательно.
