---
subtitle: Область фильтрации
shortname: Dropdown
---
# Область Dropdown

`dropdown` — фильтрация с помощью одиночного выбора из нескольких элементов.

```yaml
status:
    type: dropdown
    options:
        pending: Pending
        active: Active
        closed: Closed
```

Для фильтра доступны следующие свойства.

Свойство | Описание
------------- | -------------
**options** | доступные опции для фильтра, как массив.
**optionsMethod** | получает опции из метода, определённого в модели или как статический метод, например `Class::method`.
**conditions** | пользовательское SQL-выражение select для фильтра.
**emptyOption** | текст для отображения, когда нет доступных вариантов.
**modelScope** | применяет метод [области запроса модели](../../extend/database/model.md) к запросу фильтра, может быть именем метода модели или статическим методом PHP-класса (`Class::method`). Первый аргумент будет содержать запрос модели, к которому виджет прикрепляет своё значение, т.е. родительскую модель.

Вы можете передать пользовательский SQL в conditions как строку, где `:value` содержит фильтруемое значение.

```yaml
status:
    type: dropdown
    conditions: status = :value
    # ...
```

Фильтр dropdown не отображает метку, свойство `emptyOption` может использоваться для задания состояния по умолчанию.

```yaml
status:
    type: dropdown
    emptyOption: Select Status
    # ...
```

## PHP-интерфейс

Вы можете определить пользовательский `modelScope` в модели, используя следующий пример.

```yaml
status:
    label: Status
    type: dropdown
    modelScope: applyStatusCode
    options:
        active: Active
        deleted: Deleted
```

Определение метода **scopeApplyStatusCode**, где значение находится в `$scope->value`.

```php
public function scopeApplyStatusCode($query, $scope)
{
    if ($scope->value === 'active') {
        return $query->withoutTrashed();
    }

    if ($scope->value === 'deleted') {
        return $query->onlyTrashed();
    }
}
```

Вы можете динамически предоставлять опции, передав метод модели в свойство `optionsMethod`.

```yaml
status:
    label: Status
    type: dropdown
    optionsMethod: getStatusOptions
```

Определение метода **getStatusOptions**.

```php
public function getStatusOptions()
{
    return [
        'active' => 'Active',
        'deleted' => 'Deleted',
    ];
}
```
