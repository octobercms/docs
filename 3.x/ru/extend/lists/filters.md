---
subtitle: Узнайте, как фильтровать записи в списке.
---
# Фильтрация записей

October CMS предоставляет возможности для фильтрации записей базы данных. Для поведений, поддерживающих фильтры, вы можете определить свойство **filter** для включения этой функции. Области обычно хранятся в директории конфигурации модели как **scopes.yaml**.

## Настройка поведения

Поведения панели управления [Контроллер списков](./list-controller.md) и [Контроллер связей](../forms/relation-controller.md) могут быть отфильтрованы путём добавления свойства **filter** в конфигурацию. При определении доступные фильтры отображаются над списком.

```yaml
# config_list.yaml

# ...

# Displays the list filter
filter: $/october/test/models/user/scopes.yaml
```

## Определение областей фильтра

::: aside
Доступные свойства областей фильтра можно найти на странице [определений областей фильтра](../../element/filter-scopes.md).
:::

Аналогично фильтры управляются собственным файлом конфигурации, содержащим **области** фильтра. Каждая область — это аспект, по которому список может быть отфильтрован. Следующий пример показывает типичное содержимое файла определения фильтра.

```yaml
# scopes.yaml
scopes:

    category:
        label: Category
        modelClass: Acme\Blog\Models\Category
        conditions: category_id in (:value)
        nameFrom: name

    status:
        label: Status
        type: group
        conditions: status in (:value)
        options:
            pending: Pending
            active: Active
            closed: Closed

    published:
        label: Hide published
        type: checkbox
        default: 1
        conditions: is_published <> true

    approved:
        label: Approved
        type: switch
        default: 2
        conditions:
            - is_approved <> true
            - is_approved = true

    created_at:
        label: Date
        type: date
        conditions:
            after: created_at >= ':value'
            between: created_at >= ':after' AND created_at <= ':before'
```

### Зависимости фильтров

Области фильтра могут объявлять зависимости от других областей, определяя свойство `dependsOn`, которое обеспечивает серверное решение для обновления областей при изменении их зависимостей. Когда области, объявленные как зависимости, изменяются, определяющая область сбрасывается и обновляется динамически. Это предоставляет возможность изменять доступные параметры, предоставляемые области.

```yaml
country:
    label: Country
    type: group
    conditions: country_id in (:value)
    modelClass: October\Test\Models\Location
    options: getCountryOptions

city:
    label: City
    type: group
    conditions: city_id in (:value)
    modelClass: October\Test\Models\Location
    options: getCityOptions
    dependsOn: country
```

В приведённом выше примере область `city` обновится, когда область `country` изменится. Любая область, определяющая свойство `dependsOn`, получит все текущие объекты областей виджета фильтра, включая их текущие значения, в виде массива, индексированного по именам областей.

```php
public function getCountryOptions()
{
    return Country::lists('name', 'id');
}

public function getCityOptions($scopes = null)
{
    if (!empty($scopes['country']->value)) {
        return City::whereIn('country_id', $scopes['country']->value)->lists('name', 'id');
    }
    else {
        return City::lists('name', 'id');
    }
}
```

Вы можете фильтровать определения областей фильтра, переопределив метод `filterScopes` внутри используемой модели. Это позволяет вам управлять видимостью и другими свойствами областей на основе значений других областей. Метод принимает два аргумента: **$scopes** будет представлять объект областей, уже определённых конфигурацией областей, а **$context** представляет активный контекст фильтра.

```php
public function filterScopes($scopes, $context = null)
{
    if ($scopes->disable_roles->value) {
        $scopes->roles->hidden = true;
    }
}
```

Приведённая выше логика скроет область `roles`, если значение `disable_roles` отмечено. Логика будет применяться при первой загрузке фильтра, а также при обновлении зависимостью области. Например, вот соответствующие определения областей фильтра.

```yaml
disable_roles:
    type: checkbox
    label: Disable Roles

roles:
    type: text
    label: Role
    dependsOn: disable_roles
```
