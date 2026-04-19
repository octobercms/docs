---
subtitle: Поле формы
shortname: Dropdown
---
# Поле Dropdown

Поле `dropdown` рендерит выпадающий список с указанными опциями. Существует несколько способов предоставления опций выпадающего списка, большинство из них включает указание значения `options`.

```yaml
status_type:
    type: dropdown
    label: Blog Post Status
    options:
        draft: Draft
        published: Published
        archived: Archived
```

Поддерживаются и обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**title** | заголовок поля формы.
**placeholder** | текст, отображаемый когда поле пустое.
**default** | значение по умолчанию для новых записей.
**comment** | размещает описательный комментарий под полем.
**options** | доступные опции для выпадающего списка, как массив.
**optionsMethod** | получает опции из метода, определённого в модели или как статический метод, например `Class::method`.
**optionsPreset** | получает опции из [предустановленного списка определённых опций](../define-options.md).
**emptyOption** | текст, отображаемый при разрешении пустой опции.
**showSearch** | позволяет пользователю искать опции. По умолчанию: `true`.
**attributes** | ассоциативный массив атрибутов и значений для применения к полю select, полезно для указания пользовательской конфигурации Select2 (см. ниже).

Обычно `options` определяются как пары ключ-значение, где значение и метка указываются независимо.

```yaml
status_type:
    label: Blog Post Status
    type: dropdown
    options:
        draft: Draft
        published: Published
        archived: Archived
```

Вы можете использовать свойство `default` для установки значения по умолчанию, где значение — ключ опции.

```yaml
status_type:
    label: Blog Post Status
    type: dropdown
    default: published
```

Для обработки случаев, когда значение не установлено, вы можете указать значение `emptyOption` для включения пустой опции, которую можно выбрать повторно.

```yaml
status:
    label: Blog Post Status
    type: dropdown
    emptyOption: -- no status --
```

В качестве альтернативы вы можете использовать опцию `placeholder` для «одноразовой» пустой опции, которую нельзя выбрать повторно.

```yaml
status:
    label: Blog Post Status
    type: dropdown
    placeholder: -- select a status --
```

По умолчанию выпадающий список имеет функцию поиска, позволяющую быстро выбрать значение. Её можно отключить, установив опцию `showSearch` в false.

```yaml
status:
    label: Blog Post Status
    type: dropdown
    showSearch: false
```

## Динамические опции

Следующие подходы включают использование класса модели в вашем плагине или коде приложения. Если значение `options` опущено, фреймворк ожидает определения метода с именем `get*FieldName*Options` в модели.

В примере ниже ожидается, что класс модели имеет метод `getStatusTypeOptions`. Первый аргумент этого метода — текущее значение поля, второй — текущий объект данных для всей формы. Этот метод должен возвращать массив опций в формате **key => label**.

```yaml
status_type:
    label: Blog Post Status
    type: dropdown
```

Это пример метода класса модели, предоставляющего опции выпадающего списка. Обратите внимание, что имя метода соответствует имени столбца в формате _TitleCase_.

```php
public function getStatusTypeOptions($value, $formData)
{
    return ['all' => 'All', ...];
}
```

Вы также можете определить универсальный метод, который работает как запасной вариант, когда выделенный метод не определён — он будет использоваться для всех типов полей dropdown модели.

Первый аргумент этого метода — имя поля, второй — текущее значение поля, третий — текущий объект данных для всей формы. Он должен возвращать массив опций в формате **key => label**.

```php
public function getDropdownOptions($fieldName, $value, $formData)
{
    if ($fieldName == 'status') {
        return ['all' => 'All', ...];
    }
    else {
        return ['' => '-- none --'];
    }
}
```

Чтобы использовать пользовательское имя метода, укажите его явно в параметре `options` — оно будет точно соответствовать имени метода, определённому в модели.

В следующем примере метод `listStatuses` должен быть определён в классе модели. Этот метод получает все те же аргументы, что и метод `getDropdownOptions`, и должен возвращать массив опций в формате **key => label**.

```yaml
status:
    label: Blog Post Status
    type: dropdown
    options: listStatuses
```

Это пример пользовательского метода класса модели, предоставляющего опции выпадающего списка.

```php
public function listStatuses($fieldName, $value, $formData)
{
    return ['published' => 'Published', ...];
}
```

Чтобы добавить пользовательскую иконку для каждой опции, отображаемой в поле dropdown, вы можете указать опции как многомерный массив в формате **key => [label-text, label-icon]**.

```php
public function listStatuses($fieldName, $value, $formData)
{
    return [
        'published' => ['Published', 'icon-check-circle'],
        'unpublished' => ['Unpublished', 'icon-minus-circle'],
        'draft' => ['Draft', 'icon-clock-o']
    ];
}
```

Отображение пользовательского цвета также поддерживается путём указания опций как массива в формате **key => [label-text, label-color]**, где цвет — hex-значение, начинающееся с решётки (`#`).

```php
public function listStatuses($fieldName, $value, $formData)
{
    return [
        'published' => ['Published', '#666666'],
        'unpublished' => ['Unpublished', '#ff9999'],
        'draft' => ['Draft', '#ff0000']
    ];
}
```

Если вы хотите вызвать метод внешнего класса, это можно сделать, вызвав статический метод любого полностью квалифицированного объекта. Просто укажите синтаксис `ClassName::method` как строку в параметре `options`.

```yaml
status:
    label: Blog Post Status
    type: dropdown
    options: MyAuthor\MyPlugin\Helpers\FormHelper::staticMethodOptions
```

Этот пример показывает статический метод, определённый в любом вспомогательном классе. Первый аргумент — объект модели, второй — определение поля формы.

```php
public static function staticMethodOptions($model, $formField)
{
    return ['published' => 'Published', ...];
}
```

Для использования групп опций (`optgroup`) вы можете указать дочерние элементы с помощью [детализированного определения опций](../define-options.md). В примере ниже метка для группы опций берётся из значения, поэтому её не нужно повторять. Свойство `children` содержит опции для этой группы, поддерживается только один уровень опций.

```php
public function getDetailedFieldOptions()
{
    return [
        'Option Group' => [
            'optgroup' => true,
            'children' => [
                1 => 'Option 1',
                2 => 'Option 2',
                // ...
            ]
        ],
    ];
}
```

## Пользовательская конфигурация Select2

Поле dropdown использует [элемент управления Select2](https://select2.org/) для рендеринга поля. В некоторых случаях может потребоваться указать пользовательскую конфигурацию для этого поля. Это возможно с помощью свойства `attributes` вместе с [конфигурацией атрибутов данных](https://select2.org/configuration/data-attributes), предоставляемой Select2.

Например, вы можете настроить поведение автодополнения выпадающего списка.

```yaml
attributes:
    data-handler: onGetClientOptions
    data-minimum-input-length: 3
    data-process-Results: true
    data-ajax--delay: 300
```

При использовании с [полем Tag List](./widget-taglist.md) следующее определение оставит выпадающий список открытым после выбора элемента.

```yaml
categories:
    type: taglist
    attributes:
        data-close-on-select: false
```

#### См. также

::: also
* [Поле формы Tag List](./widget-taglist.md)
* [Элемент управления Select2](https://select2.org/)
:::
