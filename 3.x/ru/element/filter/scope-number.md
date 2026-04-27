---
subtitle: Область фильтрации
shortname: Number
---
# Область Number

`number` — фильтрация по числовому значению с логикой условий `exact`, `between`, `greater` и `lesser`.

```yaml
age:
    label: Age
    type: number
    conditions:
        greater: true
```

Для фильтра доступны следующие свойства.

Свойство | Описание
------------- | -------------
**default** | задаёт значение по умолчанию для фильтра.
**conditions** | для каждого условия установите в `true` или `false` для его доступности, или как строку — пользовательское SQL-выражение для выбранных условий. По умолчанию: `true`.
**modelScope** | применяет метод [области запроса модели](../../extend/database/model.md) к запросу фильтра, может быть именем метода модели или статическим методом PHP-класса (`Class::method`). Первый аргумент будет содержать модель, к которой виджет прикрепляет своё значение, т.е. родительскую модель.

Для фильтрации доступны следующие `conditions`.

Условие | Описание
------------- | -------------
**exact** | точное совпадение числа
**between** | между двумя указанными числами
**greater** | больше указанного числа
**lesser** | меньше указанного числа

Вы можете установить значение `default` для задания значения фильтра по умолчанию.

```yaml
age:
    label: Age
    type: number
    default: 14
```

Вы можете передать пользовательский SQL в conditions как строку, где `:value`, `:min` и `:max` содержат фильтруемые значения.

```yaml
age:
    label: Age
    type: number
    conditions:
        greater: age >= :value
        between: age >= :min and age <= :max
```

## PHP-интерфейс

Вы можете определить пользовательский `modelScope` в модели, используя следующий пример.

```yaml
age:
    label: Age
    type: number
    modelScope: numberFilter
```

Определение метода **scopeNumberFilter** со значениями в `$scope->value`, `$scope->min` и `$scope->max`.

```php
function scopeNumberFilter($query, $scope)
{
    if ($scope->condition === 'equals') {
        $query->where('age', $scope->value);
    }
    elseif ($scope->condition === 'between') {
        $query
            ->where('age', '>=', $scope->min)
            ->where('age', '<=', $scope->max);
    }
    elseif ($scope->condition === 'greater') {
        $query->where('age', '>=', $scope->value);
    }
    else {
        $query->where('age', '<=', $scope->value);
    }
}
```
