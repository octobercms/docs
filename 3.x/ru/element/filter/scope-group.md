---
subtitle: Область фильтрации
shortname: Group
---
# Область Group

`group` — фильтрация с помощью группы из нескольких элементов, обычно по связанной модели или массиву предопределённых опций.

Для фильтрации по модели укажите свойства `modelClass` и `nameFrom`, чтобы определить, какую модель и атрибут использовать.

```yaml
roles:
    label: Role
    type: group
    nameFrom: name
    modelClass: October\Test\Models\Role
```

Для фильтра доступны следующие свойства.

Свойство | Описание
------------- | -------------
**options** | доступные опции для фильтра, как массив.
**optionsMethod** | получает опции из метода, определённого в модели или как статический метод, например `Class::method`.
**optionsScope** | применяет [метод области модели](../filter-scopes.md) к запросу опций.
**conditions** | пользовательское SQL-выражение select для фильтра.
**nameFrom** | имя столбца в классе модели, используемое для отображения имени. По умолчанию: `name`.
**modelClass** | класс модели для использования в качестве доступных записей фильтра.
**modelScope** | применяет [метод области модели](../filter-scopes.md) к запросу фильтра.
**matchMode** | определяет, как применяется выбор: `include`, `exclude` или `toggle`. По умолчанию: `include`

Для фильтрации по массиву укажите свойство `options`.

```yaml
status:
    label: Role
    type: group
    options:
        developer: Developer
        publisher: Publisher
```

Вы можете передать пользовательский SQL в conditions как строку, где `:value` содержит фильтруемое значение.

```yaml
status:
    label: Role
    type: group
    conditions: role in (:value)
    # ...
```

Вы также можете передать значение `default` как массив с выбранными ключами.

```yaml
status:
    # ...
    default:
        - developer
        - publisher
```

Используйте свойство `matchMode` для управления применением фильтра: включением или исключением выбранных элементов.

```yaml
status:
    # ...
    matchMode: toggle
```

## PHP-интерфейс

Вы можете определить пользовательский `modelScope` в модели, используя следующий пример.

```yaml
roles:
    label: Role
    type: group
    nameFrom: name
    modelClass: October\Test\Models\Role
    modelScope: groupFilter
```

Определение метода **scopeGroupFilter**, где значение находится в `$scope->value`.

```php
public function scopeGroupFilter($query, $scope)
{
    return $query->whereHas('roles', function($q) use ($scope) {
        $q->whereIn('id', $scope->value);
    });
}
```

Вы можете динамически предоставлять опции, передав метод модели в свойство `optionsMethod`.

```yaml
roles:
    label: Role
    type: group
    nameFrom: name
    modelClass: October\Test\Models\Role
    optionsMethod: getRoleGroupOptions
```

Определение метода **getRoleGroupOptions**.

```php
public function getRoleGroupOptions()
{
    return $this->whereNull('parent_id')->pluck('name', 'id')->all();
}
```

Свойство `optionsScope` позволяет применить область к запросу по умолчанию, который определяет доступные опции.

```yaml
roles:
    label: Role
    type: group
    nameFrom: name
    modelClass: October\Test\Models\Role
    optionsScope: applyRoleOptionsFilter
```

```php
public function scopeApplyRoleOptionsFilter($query)
{
    return $query->where('id', '<>', 1);
}
```
