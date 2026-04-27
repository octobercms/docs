---
subtitle: Определение свойства options, используемого в различных определениях.
---
# Определение опций

Часто вы можете встретить свойство **options**, **optionsMethod** или **optionsPreset** — эта статья описывает более подробно, как настраивать опции.

## Массивы опций

Свойство `options` должно указывать опции непосредственно как часть определения в виде пар ключ-значение, где значение и метка задаются независимо.

```yaml
options:
    draft: Draft
    published: Published
    archived: Archived
```

Ключами могут быть целые числа с их меткой.

```yaml
options:
    1: Simple
    2: Complex
```

В дополнение к простым массивам, некоторые поля, такие как [радио-списки](./form/field-radio.md), поддерживают указание описания как части значений `options`. В этом случае значение определяется как другой массив с синтаксисом `key: [label, description]`.

```yaml
options:
    all: [All, Guests and customers will be able to access this page.]
    registered: [Registered only, Only logged in member will be able to access this page.]
    guests: [Guests only, Only guest users will be able to access this page.]
```

Другие поля, такие как [выпадающие списки](./form/field-dropdown.md), поддерживают указание иконки, изображения или цвета как части значений `options`. Если второй элемент массива начинается с `#`, он считается цветом, если значение содержит `.` — изображением, в противном случае — классом иконки.

```yaml
options:
    red: [Color, '#ff0000']
    icon: [Icon, 'oc-icon-calendar']
    image: [Image, '/path/to/image.png']
```

## Предустановки опций

Свойство `optionsPreset` указывает код предустановки, который можно использовать для запроса доступных опций.

```yaml
optionsPreset: icons
```

Доступны следующие предустановки:

Предустановка | Описание
------ | -----------
**icons** | Список доступных имён иконок (например: `icon-calendar`)
**phosphorIcons** | Список доступных имён иконок (например: `ph ph-calendar`)
**locales** | Список доступных локалей (например: `en-au`)
**flags** | Список локалей с их иконками в виде флагов (например: `[en-au, flag-au]`)
**timezones** | Список доступных часовых поясов (например: `Australia/Sydney`)

## Методы опций

Свойство `optionsMethod` указывает вызываемый PHP-метод, который можно использовать для запроса доступных опций. Обычно имя метода ссылается на метод, локальный для связанной модели.

```yaml
optionsMethod: getMyOptionsFromModel
```

Имя метода также может быть статическим методом любого объекта.

```yaml
optionsMethod: MyAuthor\MyPlugin\Helpers\FormHelper::getMyStaticMethodOptions
```

### Детализированные определения опций

Внутри метода можно использовать детализированное определение для указания более расширенных опций, например, для установки индивидуальных атрибутов для каждой опции. Детализированное определение идентифицируется по его структуре ассоциативного массива.

```php
public function getDetailedFieldOptions()
{
    return [
        1 => [
            'label' => 'Option 1',
            'comment' => 'This is option one'
        ],
        2 => [
            'label' => 'Option 2',
            'comment' => 'This is option two',
            'disabled' => true
        ]
    ];
}
```

Где возможно, поддерживаются следующие свойства:

Свойство | Описание
------------- | -------------
**label** | имя при отображении опции пользователю.
**comment** | размещает описательный комментарий под меткой опции.
**readOnly** | определяет, является ли опция только для чтения.
**disabled** | определяет, отключена ли опция.
**hidden** | определяет опцию без её отображения.
**color** | определяет цвет индикатора состояния для опции в виде hex-цвета (dropdown)
**icon** | определяет имя иконки для этой опции (dropdown)
**image** | определяет URL изображения для этой опции (dropdown)
**optgroup** | установите в `true`, если дочерние элементы должны принадлежать структуре группы опций, по умолчанию: `false` (dropdown)
**children** | определяет дочерние опции как другой массив для вложенной структуры (checkbox list)

Используйте свойство `children`, если определение опции поддерживает вложенность. Обычно это отображает структуру для списков чекбоксов и реализует группу опций для выпадающих списков.

```php
public function getDetailedFieldOptions()
{
    return [
        1 => [
            'label' => 'Option 1',
            'comment' => 'This is option one',
            'children' => [
                2 => [
                    'label' => 'Option 2',
                    'comment' => 'This is option two',
                ],
                // ...
            ]
        ],
    ];
}
```

#### См. также

::: also
* [Поле Checkbox List](./form/field-checkboxlist.md)
* [Поле Dropdown](./form/field-dropdown.md)
* [Поле Radio](./form/field-radio.md)
:::
