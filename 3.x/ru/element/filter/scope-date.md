---
subtitle: Область фильтрации
shortname: Date
---
# Область Date

`date` — фильтрация по значению даты с логикой условий `equals`, `between`, `before` и `after`.

```yaml
created_at:
    label: Created
    type: date
```

Для фильтра доступны следующие свойства.

Свойство | Описание
------------- | -------------
**minDate** | минимальная/самая ранняя дата, которую можно выбрать.
**maxDate** | максимальная/самая поздняя дата, которую можно выбрать.
**firstDay** | первый день недели. По умолчанию: `0` (воскресенье).
**showWeekNumber** | показывать номера недель в начале строки. По умолчанию: `false`
**useTimezone** | конвертировать дату и время из часового пояса, указанного в настройках панели управления. По умолчанию: `true`
**conditions** | для каждого условия установите в `true` или `false` для его доступности, или как строку — пользовательское SQL-выражение для выбранных условий. По умолчанию: `true`.

Для фильтрации доступны следующие `conditions`.

Условие | Описание
------------- | -------------
**equals** | в пределах выбранной даты от начала до конца дня
**notEquals** | не в пределах выбранной даты от начала до конца дня
**between** | между двумя выбранными датами
**before** | до выбранной даты
**after** | после выбранной даты

Фильтруемое значение автоматически конвертируется в часовой пояс панели управления. Вы можете отключить это с помощью опции `useTimezone`.

```yaml
created_at:
    label: Created
    type: date
    useTimezone: false
```

Чтобы разрешить поиск только по точной дате, передайте **equals** как `condition`. Чтобы найти результаты в диапазоне, передайте **between**, **before** или **after** в conditions.

```yaml
created_at:
    label: Created
    type: date
    conditions:
        equals: true
```

Вы можете передать значение `default`, убедившись, что оно заключено в кавычки для представления строки. Значение по умолчанию может быть установлено в **now** для указания текущей даты.

```yaml
created_at:
    label: Created
    type: date
    default: '2020-01-02'
```

Вы можете установить `minDate` и `maxDate` для определения минимального и максимального доступного диапазона дат.

```yaml
created_at:
    label: Date
    type: date
    minDate: '2001-01-23'
    maxDate: '2030-10-13'
```

Вы можете передать пользовательский SQL в conditions как строку с поддерживаемыми значениями.

```yaml
created_at:
    label: Created
    type: date
    conditions:
        before: created_at <= :value
        between: created_at >= :after AND created_at <= :before
```

Поддерживаются следующие параметры.

- `:value`: выбранная дата в формате `Y-m-d 00:00:00`
- `:valueDate`: выбранная дата в формате `Y-m-d`
- `:before`: дата «до» в формате `Y-m-d 00:00:00`
- `:beforeDate`: дата «до» в формате `Y-m-d`
- `:after`: дата «после» в формате `Y-m-d 00:00:00`
- `:afterDate`: дата «после» в формате `Y-m-d`

## PHP-интерфейс

Для доступа в PHP вы можете определить пользовательский `modelScope` в модели, используя следующий пример.

```yaml
created_at:
    label: Created
    type: date
    modelScope: dateFilter
```

Определение метода **scopeDateFilter** со значениями в `$scope->value`, `$scope->before` и `$scope->after`.

```php
function scopeDateFilter($query, $scope)
{
    if ($scope->condition === 'equals') {
        $query->where('created_at', $scope->value);
    }
    elseif ($scope->condition === 'notEquals') {
        $query->where('created_at', '<>', $scope->value);
    }
    elseif ($scope->condition === 'between') {
        $query
            ->where('created_at', '>=', $scope->after)
            ->where('created_at', '<=', $scope->before);
    }
    elseif ($scope->condition === 'after') {
        $query->where('created_at', '>=', $scope->value);
    }
    else {
        $query->where('created_at', '<=', $scope->value);
    }
}
```
