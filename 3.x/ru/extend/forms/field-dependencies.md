---
subtitle: Узнайте, как поля могут зависеть от других полей.
---
# Зависимости полей

Подобно [условиям полей формы](../../element/form-fields.md), поля формы могут объявлять зависимости от других полей, определяя свойство `dependsOn`. Это обеспечивает более надёжное серверное решение для обновления полей при изменении их зависимостей.

Когда поля, объявленные как зависимости, изменяются, определяющее поле обновляется с помощью AJAX-фреймворка. Это предоставляет возможность взаимодействовать со свойствами поля с помощью методов `filterFields` или изменять доступные параметры, предоставляемые полю.

```yaml
country:
    label: Country
    type: dropdown

state:
    label: State
    type: dropdown
    dependsOn: country
```

В приведённом выше примере поле формы `state` обновится, когда значение поля `country` изменится. При этом текущие данные формы будут заполнены в модели, чтобы параметры выпадающего списка могли их использовать.

```php
public function getCountryOptions()
{
    return ['au' => 'Australia', 'ca' => 'Canada'];
}

public function getStateOptions()
{
    if ($this->country == 'au') {
        return ['act' => 'Capital Territory', 'qld' => 'Queensland', ...];
    }
    elseif ($this->country == 'ca') {
        return ['bc' => 'British Columbia', 'on' => 'Ontario', ...];
    }
}
```

## Фильтрация полей

Вы можете фильтровать определения полей формы, переопределив метод `filterFields` внутри используемой модели. Это позволяет вам управлять видимостью и другими свойствами полей на основе данных модели. Метод принимает два аргумента: **$fields** будет представлять объект полей, уже определённых [конфигурацией полей](../../element/form-fields.md), а **$context** представляет активный контекст формы.

```php
public function filterFields($fields, $context = null)
{
    if ($this->source_type === 'http') {
        $fields->source_url->hidden = false;
        $fields->git_branch->hidden = true;
    }
    elseif ($this->source_type === 'git') {
        $fields->source_url->hidden = false;
        $fields->git_branch->hidden = false;
    }
    else {
        $fields->source_url->hidden = true;
        $fields->git_branch->hidden = true;
    }
}
```

Значение `$context` будет содержать контекст формы (create, update и т.д.) при отображении и сохранении формы, однако при обновлении формы контекст всегда будет установлен в **refresh**. Это полезно для заполнения полей новыми значениями без принудительной установки сохранённого значения. Следующий пример сбросит значение имени родителя, если значение родителя изменится во время обновления, но не повлияет на сохраняемое значение.

```php
public function filterFields($fields, $context = null)
{
    if ($context === 'refresh' && $this->parent) {
        $fields->parent_name->value = $this->parent->name;
    }
}
```

Приведённая выше логика установит флаг `hidden` для определённых полей, проверяя значение атрибута модели `source_type`. Эта логика будет применяться при первой загрузке формы, а также при обновлении определённой зависимостью поля. Например, вот соответствующие определения полей формы.

```yaml
source_type:
    label: Source Type
    type: dropdown
    options:
        git: Git
        http: Http
        upload: Upload

source_url:
    label: Source URL
    type: text
    dependsOn: source_type

git_branch:
    label: Git Branch
    type: text
    dependsOn: source_type
```

## Обновление через AJAX

В некоторых случаях вы можете захотеть вручную запустить AJAX-обработчик при изменении значения поля. Вы можете использовать свойство `changeHandler` для указания AJAX-обработчика. Следующий пример вызовет AJAX-обработчик **onChangeContent** при изменении значения.

```yaml
content:
    label: Content
    type: textarea
    changeHandler: onChangeContent
```

AJAX-обработчик может быть добавлен в контроллер обычным способом. Следующий пример отображает сообщение с помощью фасада `Flash` при обновлении поля.

```php
public function onChangeContent()
{
    Flash::success('Great job!');
}
```

Если вы хотите обновить другие поля, используйте метод `formRefreshFields`, предоставляемый контроллером формы.

```php
public function onChangeContent()
{
    return $this->formRefreshFields('is_positive');
}
```

Вы также можете обновить несколько полей одновременно, передав массив.

```php
public function onChangeContent()
{
    return $this->formRefreshFields(['is_positive', 'internal_comments']);
}
```

#### Смотрите также

::: also
* [Условия полей формы](../../element/form-fields.md)
:::
