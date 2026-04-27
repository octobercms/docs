---
subtitle: Поле формы
shortname: Balloon Selector
---
# Поле Balloon Selector

Поле `balloon-selector` рендерит список, где одновременно можно выбрать только один элемент.
Balloon-селекторы поддерживают те же методы определения опций, что и [тип поля dropdown](./field-dropdown.md).

```yaml
gender:
    type: balloon-selector
    label: Gender
    options:
        female: Female
        male: Male
```

Обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**default** | значение по умолчанию для новых записей.
**comment** | размещает описательный комментарий под полем.
**options** | доступные опции для выпадающего списка, как массив.
**optionsMethod** | получает опции из метода, определённого в модели или как статический метод, например `Class::method`.
**allowEmpty** | позволяет сбросить выбор, нажав на активный элемент, по умолчанию: `false`.

Вы можете использовать свойство `default` для установки значения по умолчанию, где значение — ключ опции.

```yaml
gender:
    type: balloon-selector
    label: Gender
    default: female
```

Установите свойство `allowEmpty` в **true**, чтобы позволить пользователю установить пустое значение, сняв выбор с активного элемента.

```yaml
gender:
    type: balloon-selector
    label: Gender
    allowEmpty: true
```

#### См. также

::: also
* [Поле формы Dropdown](./field-dropdown.md)
:::
