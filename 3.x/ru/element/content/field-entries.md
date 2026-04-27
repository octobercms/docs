---
subtitle: Контентное поле
shortname: Entries
---
# Поле Entries

`entries` — связывает с другими записями по UUID или handle.

```yaml
author:
    label: Author
    type: entries
    source: <uuid|handle>
```

Поддерживаются следующие свойства.

Свойство | Описание
------------- | -------------
**source** | UUID или handle связанного блюпринта.
**maxItems** | ограничивает количество записей, которые можно выбрать.
**displayMode** | изменяет способ отображения поля. Поддерживаемые значения: `relation`, `recordfinder`, `taglist`, `controller`. По умолчанию: `relation`.
**conditions** | задаёт необработанное условие where для применения к запросу модели.
**modelScope** | применяет метод [области запроса модели](../../extend/database/model.md) к **связанной модели формы**, может быть именем метода модели или статическим методом PHP-класса (`Class::method`).
**inverse** | при определении как обратное отношение — имя связанного поля в исходном блюпринте.

Для ограничения количества выбираемых элементов используйте свойство `maxItems`.

```yaml
author:
    type: entries
    maxItems: 1
```

Для отображения record finder вместо стандартного элемента управления используйте свойство `displayMode`. Этот режим доступен только когда выбирается один элемент.

```yaml
author:
    type: entries
    displayMode: recordfinder
```

Когда доступно несколько элементов, `displayMode` поддерживает выбор элементов с помощью списка тегов.

```yaml
author:
    type: entries
    displayMode: taglist
```

## Применение условий

Вы можете ограничить связанный запрос с помощью SQL или PHP, используя подходы ниже. В примерах связанная запись имеет поле `is_featured`, которое рендерится как чекбокс. Мы можем ограничить связанные записи только теми, у которых этот чекбокс отмечен.

### SQL-условие запроса

Вы можете ограничить связанную модель с помощью необработанного SQL-запроса, используя свойство `conditions`.

```yaml
categories:
    label: Categories
    type: entries
    source: Blog\Category
    conditions: is_featured = true
```

### PHP-области запроса

Вы можете ограничить связанный запрос с помощью PHP-метода, используя свойство `scope`.

```yaml
basic_entries:
    label: Basic Entry
    type: entries
    source: Basic\Entry
    scope: App\Classes\ScopeHelper::applyScope
```

Это будет ссылаться на класс `App\Classes\ScopeHelper`, который может быть файлом, расположенным в **app/classes/ScopeHelper.php**, например.

```php
namespace App\Classes;

class ScopeHelper
{
    public static function applyScope($query)
    {
        return $query->where('is_featured', true);
    }
}
```

## Определение обратного отношения

В некоторых случаях вы можете захотеть получить доступ к отношению в обратном направлении, например, найти все записи, принадлежащие определённой категории. Свойство `inverse` может использоваться для связывания отношения в противоположном направлении, где значение свойства устанавливается в имя поля в исходном блюпринте.

Например, если блюпринт **Blog\Post** уже имеет определённое отношение `categories`.

```yaml
categories:
    type: entries
    source: Blog\Category
```

Блюпринт **Blog\Category** может включать поле `posts` как `inverse` поля `categories`, найденного в исходном блюпринте (выше). Поле может быть исключено из форм, установив значение `hidden` в `true`, и это необязательно.

```yaml
posts:
    type: entries
    source: Blog\Post
    inverse: categories
    hidden: true
```

## Отображение в столбце списка

По умолчанию поле entries отображается как гиперссылка на связанную запись.

### Отображение как счётчик

Для отображения столбца списка со счётчиком связанных записей вы можете использовать следующую [конфигурацию столбца](../list-columns.md). Свойство `relation` должно быть установлено в имя поля, с `relationCount` установленным в `true` и типом столбца `number`.

```yaml
categories:
    label: Categories
    type: entries
    # ...
    column:
        relation: categories
        relationCount: true
        type: number
```

## Расширенное управление записями

Для создания, обновления и удаления элементов внутри формы установите `displayMode` в controller для отображения расширенного режима управления, работающего на основе [поведения Relation Controller](../../extend/forms/relation-controller.md).

```yaml
author:
    type: entries
    displayMode: controller
```

Если блюпринт имеет `navigation` установленный в `false`, то кнопки по умолчанию будут показывать **Create** и **Delete**. Если навигация определена, то кнопки показывают **Add** и **Remove**. Вы можете настроить кнопки с помощью свойства `toolbarButtons`.

```yaml
author:
    type: entries
    toolbarButtons: create|add|remove|delete
```

Различные сообщения, используемые в relation controller, берутся из свойства `customMessages` исходного блюпринта, и вы также можете изменить их с помощью `customMessages` в определении поля.

```yaml
author:
    type: entries
    customMessages:
        buttonCreate: New Author
        titleUpdateForm: Update Author
        titleCreateForm: Create Author
```

#### См. также

::: also
* [Контентное поле Nested Items](./field-nesteditems.md)
:::
