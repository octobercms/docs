---
subtitle: Пункты меню для управления контентом в панели администрирования.
---
# Определение навигации

В панели администрирования записи отображаются в пункте меню «Контент», а глобальные записи — в пункте «Настройки» (по умолчанию). Вы можете управлять этим поведением с помощью свойства **navigation** в файле чертежа. Следующий код устанавливает иконку и определяет порядок отображения.

```yaml
navigation:
    icon: icon-pencil
    order: 200
```

Определения `navigation` и `primaryNavigation` поддерживают следующие свойства.

Свойство | Описание
------------- | -------------
**label** | указывает ключ строки локализации метки меню, обязательно.
**order** | числовой вес при определении порядка отображения.
**parent** | привязывает элемент навигации к родительскому элементу, используя handle чертежа.
**icon** | имя иконки из [коллекции иконок October CMS](../../element/available-icons.md), необязательно.
**iconSvg** | SVG-иконка для использования вместо стандартной иконки, SVG-иконка должна быть прямоугольной и может поддерживать цвета, необязательно.

Чтобы разместить элемент в области Настроек, установите **parent** в значение `settings`. Определение **category** может быть строкой или ссылкой на константу настроек, например, `CATEGORY_COLLECTIONS`.

```yaml
navigation:
    parent: settings
    category: Collections
```

Чтобы разместить элемент в области Контента, установите **parent** в значение `content`.

```yaml
navigation:
    parent: content
```

Чтобы разместить элемент как элемент основной навигации, необходимо определение **primaryNavigation**.

```yaml
primaryNavigation:
    label: Blog
    icon: icon-copy
    order: 500

navigation:
    label: Main Menu Item
```

Чтобы разместить элемент как элемент вторичной навигации, свойство **parent** должно указывать UUID или handle элемента основной навигации.

```yaml
navigation:
    parent: <handle|uuid>
```

Чтобы отключить вторичную навигацию, определите **primaryNavigation** для одного чертежа без того, чтобы он был родителем для других чертежей.

```yaml
primaryNavigation:
    label: Page
    icon: icon-magic
    order: 500
```

Вы также можете полностью отключить навигацию, установив свойство **navigation** в `false`.

```yaml
navigation: false
```

## Дополнительная навигация

Используйте свойство `extraNavigation` для регистрации дополнительных элементов навигации для включения в чертёж. Значение представляет собой массив, соответствующий определению `sideMenu`, описанному в [спецификации навигации панели управления](../../extend/backend/navigation.md). Следующий пример включает секцию и разделитель с помощью пользовательских типов отображения, свойство `order` используется для упорядочивания элементов.

```yaml
navigation:
    label: Authors
    parent: Blog\Post
    icon: icon-user
    order: 230

extraNavigation:
    _authors_section:
        itemType: section
        label: Authors
        order: 210

    _authors_ruler:
        itemType: ruler
        order: 220
```

Вы также можете регистрировать ссылки на [контроллеры плагинов](../../extend/system/controllers.md), указав свойство `url`. Это свойство должно быть установлено в URL контроллера. Следующий пример ссылается на контроллер **acme/blog/posts**.

```yaml
navigation:
    label: Authors
    # ...

extraNavigation:
    testimonials:
        label: Testimonials
        order: 210
        icon: icon-group
        url: acme/blog/posts
```

Для установки контекста навигации внутри контроллера используйте метод `setTailorContext` фасада `BackendMenu`. Вы также можете указать `uuid` чертежа с помощью метода `setTailorContextUuid`. Метод принимает `handle` или `uuid` чертежа (первый аргумент) и ключ, используемый элементом дополнительной навигации (второй аргумент).

```php
BackendMenu::setTailorContext('Blog\Post', 'testimonials');

BackendMenu::setTailorContextUuid('edcd102e-0525-4e4d-b07e-633ae6c18db6', 'testimonials');
```

#### См. также

::: also
* [Навигация панели управления](../../extend/backend/navigation.md)
:::
