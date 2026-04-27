---
subtitle: Область фильтрации
shortname: Text
---
# Область Text

`text` — фильтрация с помощью текстового поля ввода с логикой условий `exact` или `contains`.

```yaml
username:
    label: Username
    type: text
```

Для фильтра доступны следующие свойства.

Свойство | Описание
------------- | -------------
**conditions** | для каждого условия установите в `true` или `false` для его доступности, или как строку — пользовательское SQL-выражение для выбранных условий. По умолчанию: `true`.
**modelScope** | применяет метод [области запроса модели](../../extend/database/model.md) к запросу фильтра, может быть именем метода модели или статическим методом PHP-класса (`Class::method`). Первый аргумент будет содержать модель, к которой виджет прикрепляет своё значение, т.е. родительскую модель.

Для фильтрации доступны следующие `conditions`.

Условие | Описание
------------- | -------------
**equals** | точное совпадение текста
**contains** | содержит текст

Чтобы разрешить поиск только точного текста, передайте **equals** как `condition`. Чтобы найти результаты, содержащие любую часть текста, передайте **contains** в conditions.

```yaml
username:
    label: Username
    type: text
    conditions:
        equals: true
```

Вы можете передать пользовательский SQL в conditions как строку, где `:value` содержит фильтруемое значение.

```yaml
username:
    label: Username
    type: text
    conditions:
        equals: username = :value
        contains: username like %:value%
```

## PHP-интерфейс

Вы можете определить пользовательский `modelScope` в модели, используя следующий пример.

```yaml
username:
    label: Username
    type: text
    modelScope: textFilter
```

Определение метода **scopeTextFilter**, где значение находится в `$scope->value`.

```php
function scopeTextFilter($query, $scope)
{
    if ($scope->condition === 'equals') {
        $query->where('username', $scope->value);
    }
    else {
        $query->where('username', 'LIKE', "%{$scope->value}%");
    }
}
```
