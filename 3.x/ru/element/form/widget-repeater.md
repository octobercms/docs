---
subtitle: Виджет формы
shortname: Repeater
---
# Поле Repeater

`repeater` — рендерит повторяющийся набор полей формы, используя связанную запись или [атрибут jsonable](../../extend/system/models.md).

```yaml
extra_information:
    type: repeater
    form:
        fields:
            added_at:
                label: Date Added
                type: datepicker
            details:
                label: Details
                type: textarea
```

Поддерживаются и обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**default** | значение по умолчанию (массив), необязательно.
**comment** | пояснительный комментарий под полем.
**form** | инлайн-определения полей или ссылка на файл определения полей формы.
**prompt** | текст для кнопки создания. По умолчанию: Add new item.
**displayMode** | управляет отображением интерфейса: **accordion** или **builder**. По умолчанию: `accordion`
**useTabs** | показывает вкладки, позволяя полям указывать свойство `tab`. По умолчанию: `false`
**itemsExpanded** | должны ли элементы репитера быть раскрыты по умолчанию в режиме accordion. По умолчанию: `true`.
**titleFrom** | имя поля внутри элементов, используемое как заголовок для свёрнутого элемента, необязательно.
**minItems** | минимальное количество обязательных элементов. Предварительно отображает эти элементы, когда группы не используются. Например, если установить `minItems: 1`, первая строка будет отображена и не скрыта.
**maxItems** | максимальное количество элементов в репитере.
**groups** | ссылается на группу полей формы, переводя репитер в групповой режим (см. ниже). Также может использоваться инлайн-определение.
**groupKeyFrom** | атрибут ключа группы, сохраняемый вместе с данными. По умолчанию: `_group`
**showReorder** | отображает интерфейс для сортировки элементов. По умолчанию: true
**showDuplicate** | отображает интерфейс для клонирования элементов. По умолчанию: true

Свойство `titleFrom` может использоваться для указания значения, отображаемого при сворачивании репитера.

```yaml
extra_information:
    type: repeater
    titleFrom: title_when_collapsed
    form:
        fields:
            # ...
            title_when_collapsed:
                label: This field is the title when collapsed
                type: text
```

Поле repeater поддерживает использование вкладок при установке свойства `useTabs` в `true`.

```yaml
extra_information:
    type: repeater
    useTabs: true
    form:
        added_at:
            label: Date added
            type: datepicker
            tab: Date
        details:
            label: Details
            type: textarea
            tab: Details
```

## Групповые репитеры

Поле repeater поддерживает групповой режим с использованием `groups`, который позволяет выбирать пользовательский набор полей для каждой итерации.

```yaml
content:
    type: repeater
    prompt: Add content block
    groups: $/acme/blog/config/fields_repeater.yaml
```

Это пример файла конфигурации группы, который будет расположен в **/plugins/acme/blog/config/fields_repeater.yaml**. Для лучшей организации `groups` может указывать один файл для каждого определения группы.

```yaml
groups:
    textarea: $/acme/blog/config/fields_textarea.yaml
    quote: $/acme/blog/config/fields_quote.yaml
```

В качестве альтернативы определения могут быть указаны инлайн вместе с репитером. Если ключ группы начинается с подчёркивания (`_`), он будет проигнорирован.

```yaml
groups:
    textarea:
        name: Textarea
        description: Basic text field
        icon: icon-file-text-o
        fields:
            text_area:
                label: Text Content
                type: textarea
                size: large

    quote:
        name: Quote
        description: Quote item
        icon: icon-quote-right
        fields:
            quote_position:
                span: auto
                label: Quote Position
                type: radio
                options:
                    left: Left
                    center: Center
                    right: Right
            quote_content:
                span: auto
                label: Details
                type: textarea
```

Каждая группа должна иметь уникальный ключ, и определение поддерживает следующие опции.

Опция | Описание
------------- | -------------
**name** | имя группы.
**description** | краткое описание группы.
**icon** | определяет иконку для группы, необязательно.
**titleFrom** | имя поля для заголовка элемента, необязательно.
**fields** | поля формы, принадлежащие группе.
**useTabs** | показывает вкладки только для группы, необязательно.

::: tip
Ключ группы сохраняется вместе с данными как атрибут `_group`. Это можно настроить с помощью опции `groupKeyFrom`.
:::

## Пример использования связанных записей

Виджет формы repeater автоматически определяет, является ли атрибут модели связанным полем, и использует его. Ниже приведён пример реализации, который вы можете использовать. Например, если ваша модель использует отношение `hasMany`, ссылающееся на модель **RepeaterItem**, репитер будет использовать эту связанную модель для каждого элемента.

```php
public $hasMany = [
    'extra_information' => [
        RepeaterItem::class,
        'key' => 'parent_id',
        'delete' => true
    ],
];
```

Простая [схема таблицы базы данных](../../extend/database/structure.md) для модели может быть определена, включая ссылку на `id` родительской модели и сериализованное JSON-значение `value` для динамических атрибутов (см. ниже).

```php
Schema::create('acme_blog_repeater_items', function($table) {
    $table->increments('id');
    $table->integer('parent_id')->unsigned()->nullable()->index();
    $table->mediumText('value')->nullable();
    $table->integer('sort_order')->nullable();
    $table->timestamps();
});
```

Модель наследует базовый класс `October\Rain\Database\ExpandoModel` для поддержки динамических атрибутов, установленных на модели и сохранённых в базе данных в формате JSON. Модель может [включать вложения](../../extend/database/attachments.md) и любые другие связанные поля.

```php
use October\Rain\Database\ExpandoModel;

class RepeaterItem extends ExpandoModel
{
    use \October\Rain\Database\Traits\Sortable;

    public $table = 'acme_blog_repeater_items';

    protected $expandoPassthru = ['parent_id', 'sort_order'];

    public $attachMany = [
        'photos' => \System\Models\File::class,
    ];
}
```

Наконец, элемент репитера может быть указан как поле формы с сопутствующими определениями полей формы, включая поля, использующие [отношения моделей](../../extend/database/relations.md).

```yaml
extra_information:
    type: repeater
    form:
        fields:
            title:
                label: title
            is_enabled:
                label: Enabled
                type: switch
            photos:
                label: Photos
                type: fileupload
                mode: image
```
