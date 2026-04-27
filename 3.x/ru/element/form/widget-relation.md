---
subtitle: Виджет формы
shortname: Relation
---
# Поле Relation

`relation` — рендерит выпадающий список или список чекбоксов в зависимости от типа отношения поля. Единичные отношения отображают выпадающий список, множественные отношения отображают список чекбоксов. Метка для отображения каждого отношения берётся из определения `nameFrom` или `select`.

```yaml
categories:
    label: Categories
    type: relation
```

Поддерживаются и обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**comment** | пояснительный комментарий под полем.
**nameFrom** | имя атрибута модели, используемого для отображения метки отношения. По умолчанию: `name`.
**excludeFrom** | атрибут родительской модели, используемый для исключения связанных ключей из списка, необязательно.
**select** | пользовательское SQL-выражение select для имени.
**emptyOption** | текст для отображения, когда нет доступных вариантов.
**conditions** | задаёт необработанное условие where для применения к запросу модели.
**modelScope** | применяет метод [области запроса модели](../../extend/database/model.md) к **связанной модели формы**, может быть именем метода модели или статическим методом PHP-класса (`Class::method`).
**defaultSort** | устанавливает столбец сортировки и направление по умолчанию, поддерживает строку для имени столбца или массив с ключами `column` и `direction`. Направление может быть `asc` для возрастающего (по умолчанию) или `desc` для убывающего порядка.
**useController** | автоматически определяет, настроено ли поле с [поведением Relation Controller](../../extend/forms/relation-controller.md), и использует его. По умолчанию: `true`
**controller** | задаёт массив для ручной настройки интеграции с [поведением Relation Controller](../../extend/forms/relation-controller.md).

Используйте свойство `nameFrom` для настройки метки, используемой для связанной записи.

```yaml
categories:
    label: Categories
    type: relation
    nameFrom: title
```

В качестве альтернативы вы можете заполнить метку с помощью пользовательского выражения `select`. Здесь работает любое допустимое SQL-выражение.

```yaml
user:
    label: User
    type: relation
    select: concat(first_name, ' ', last_name)
```

## Применение условий

Вы можете фильтровать доступные записи с помощью SQL- или PHP-условий, используя подходы ниже.

### SQL-условие запроса

Вы можете ограничить связанную модель с помощью необработанного SQL-запроса, используя свойство `conditions`.

```yaml
user:
    label: User
    type: relation
    conditions: is_featured = true
```

Значение также поддерживает простые параметры, извлекаемые из атрибутов родительской модели. Имена параметров начинаются с символа двоеточия (`:`).

```yaml
country:
    label: Country
    type: relation

state:
    label: State
    type: relation
    dependsOn: country
    conditions: custom_country_id = :country_id
```

### PHP-области запроса

Вы можете указать область модели для фильтрации результатов с помощью свойства `modelScope`.

```yaml
user:
    label: User
    type: relation
    modelScope: withTrashed
```

`modelScope` может использоваться для связывания двух связанных полей, например, связывания моделей `Country` и `State`, где доступные штаты фильтруются по выбранной стране. Свойство `dependsOn` включает [зависимости полей](../../extend/forms/field-dependencies.md) и обновляет варианты `state` при выборе `country`.

```yaml
country:
    label: Country
    type: relation

state:
    label: State
    type: relation
    dependsOn: country
    modelScope: filterStates
```

Значение `modelScope` **filterStates** соответствует методу `scopeFilterStates`, определённому в модели `State`. Аргумент `$model` (второй аргумент), передаваемый в [область запроса модели](../../extend/database/model.md), позволяет получить выбранную страну и отфильтровать доступные варианты.

```php
public function scopeFilterStates($query, $model)
{
    if ($countryId = $model->country_id) {
        $query->where('country_id', $countryId);
    }
}
```

## Интеграция с Relation Controller

Если контроллер реализует [поведение Relation Controller](../../extend/forms/relation-controller.md) и поле определено там, то оно будет отображаться с использованием этого определения. Установите свойство `useController` в false для отключения этой функциональности.

```yaml
countries:
    label: Categories
    type: relation
    useController: false
```

Свойство `controller` может использоваться для указания инлайн-конфигурации.

```yaml
products:
    label: Products
    tab: Products
    type: relation
    controller:
        label: Product
        list: $/october/test/models/product/columns.yaml
        form: $/october/test/models/product/fields.yaml
```
