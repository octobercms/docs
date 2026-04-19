---
subtitle: UI формы
shortname: Partial
---
# Поле Partial

UI-элемент `partial` рендерит частичное представление. Значение `path` может ссылаться на файл частичного представления, иначе имя поля используется как имя представления.

```yaml
content:
    label: Content
    type: partial
    path: field_content
```

Поддерживаются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**path** | путь к [файлу частичного представления](../../extend/system/views.md) или [коду шаблона представления](../../extend/services/response-view.md), по умолчанию — имя поля с префиксом **field_**.

Когда `path` задан как неквалифицированное имя файла (имя файла без пути к директории и расширения), исходный путь определяется в директориях модели или контроллера. Следующий пример будет искать файл частичного представления по пути **../models/mymodel/_field_for_content.php** или **../controllers/mycontroller/_field_for_content.php**.

```yaml
content:
    type: partial
    path: field_for_content
```

Вы можете указать полный `path` для доступа к частичным представлениям вне директорий модели или контроллера. Это может быть полезно для совместного использования частичных представлений между определениями.

```yaml
content:
    type: partial
    path: $/acme/blog/partials/_field_content.php
```

## Доступ к переменным

Следующие переменные доступны внутри частичного представления при его рендеринге.

- `$value` — текущее значение поля, если найдено.
- `$model` — [модель](../../extend/system/models.md), используемая для поля.
- `$field` — сконфигурированный объект класса `Backend\Classes\FormField`.

Вот пример содержимого файла **_field_content.php**.

```php
<?php if ($model->is_active): ?>
    <p><?= $field->label ?> is active</p>
<?php endif ?>
```

## Использование шаблонов представлений

Вы можете передать код шаблона представления в `path` для доступа к шаблонам сервиса представлений внутри плагина. Следующий код будет найден по пути **plugins/acme/blog/views/formfields/content.php**.

```yaml
content:
    type: partial
    path: acme.blog::formfields.content
```

Вы также можете разместить частичное представление в директории приложения, например, **app/views/formfields/content.php**.

```yaml
content:
    type: partial
    path: app::formfields.content
```

:::tip
Путь должен содержать символы `::` для активации сервиса представлений.
:::

#### См. также

::: also
* [UI формы Hint](./ui-hint.md)
* [Рендеринг представлений контроллера](../../extend/system/views.md)
* [Сервис ответов и представлений](../../extend/services/response-view.md)
:::
