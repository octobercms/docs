---
subtitle: Twig-функция
---
# pager()

Функция `pager()` используется для обработки [пагинированных записей](../../extend/database/pagination.md) (первый аргумент). Она возвращает объект, содержащий детали о записях, включая номера страниц и ссылки «назад» / «вперёд». При преобразовании в строку она рендерит HTML-разметку по умолчанию.

После получения результатов вы можете отобразить их и отрендерить ссылки на страницы с помощью Twig-функции `pager()`.

```twig
<div class="container">
    {% for user in users %}
        {{ user.name }}
    {% endfor %}
</div>

{{ pager(users) }}
```

Поддерживаются следующие настраиваемые опции (второй аргумент).

Опция | Описание
------------- | -------------
**template** | указать шаблон по умолчанию или [имя представления](../../extend/services/response-view.md). Пример: `app::my-custom-view`
**partial** | указать [имя фрагмента](../../cms/themes/partials.md) в теме (только CMS). Пример: `my-partial`
**withQuery** | включить существующие параметры запроса в сгенерированные ссылки. По умолчанию: `false`
**appends** | необязательный массив значений для включения в параметры запроса.
**fragment** | необязательная строка фрагмента для включения в URL.

## Изменение URL

Используйте `withQuery` для сохранения существующей строки запроса в URL.

```twig
{{ pager(records, { withQuery: true }) }}
```

Вы можете добавить параметры к строке запроса ссылок пагинации с помощью метода `appends`. Например, чтобы добавить `&sort=votes` к каждой ссылке пагинации, выполните следующий вызов `appends`.

```twig
{{ pager(records, { appends: { sort: 'votes' } }) }}
```

Если вы хотите добавить «хэш-фрагмент» к URL пагинации, используйте метод `fragment`. Например, чтобы добавить `#foo` в конец каждой ссылки пагинации, выполните следующий вызов метода `fragment`.

```twig
{{ pager(records, { fragment: 'foo' }) }}
```

## Доступ к переменным пагинатора

Сохранение функции `pager()` в переменную извлекает пагинированные ссылки и метаданные из пагинированного запроса. Это особенно полезно при [создании API-эндпоинтов](../../cms/resources/building-apis.md) (JSON), но также может использоваться для доступа к переменным в Twig.

Начнём с пагинированной коллекции.

```twig
{% set records = postModel.paginate(3) %}
```

Функция `pager()` вернёт извлечённый объект.

```twig
{% set paginator = pager(records) %}
```

Где каждая переменная доступна для обращения.

```twig
<a href="{{ paginator.links.first }}"></a>
```

Возвращаемый объект разделён на **links** и **meta** со следующими атрибутами.

Атрибут | Описание
------------- | -------------
**links.first** | URL первой страницы
**links.last** | URL последней страницы
**links.prev** | URL предыдущей страницы
**links.next** | URL следующей страницы
**meta.path** | URL текущей страницы
**meta.per_page** | Количество записей на странице
**meta.total** | Всего найдено записей
**meta.current_page** | Номер текущей страницы
**meta.last_page** | Номер последней страницы
**meta.from** | Начальный номер записи
**meta.to** | Конечный номер записи

Пример в формате JSON.

```json
{
    "links": {
        "first": "https://yoursite.tld/api/blog/posts?page=1",
        "last": "https://yoursite.tld/api/blog/posts?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "path": "https://yoursite.tld/api/blog/posts",
        "per_page": 3,
        "total": 2,
        "current_page": 1,
        "last_page": 1,
        "from": 1,
        "to": 2
    }
}
```

## Рендеринг пагинатора

При прямом рендеринге функции `pager()`, при обращении к ней как к строке, она отобразит системный шаблон по умолчанию для пагинированных ссылок.

```twig
{{ pager(records) }}
```

Сопутствующая функция `ajaxPager()` отрендерит шаблон пагинации с поддержкой AJAX (см. AJAX-шаблон ниже). В идеале её следует использовать внутри [AJAX-фрагмента](../tag/ajax-partial.md).

```twig
{{ ajaxPager(records) }}
```

### Шаблон по умолчанию

Шаблон `default` рендерит пагинацию по умолчанию. Он используется по умолчанию с методом `paginate()` запроса к базе данных.

```html
<ul class="pagination">
    <li class="page-item first">
        <span class="page-link">&larr;</span>
    </li>
    <li class="page-item">
        <a class="page-link" href="?page=1">1</a>
    </li>
    <li class="page-item last">
        <a class="page-link" href="?page=2">&rarr;</a>
    </li>
</ul>
```

Расположение файла: `~/modules/system/views/pagination/default.htm`

### Простой шаблон

Шаблон `simple` рендерит пагинацию только с кнопками «назад» и «вперёд». Он используется по умолчанию с методом `simplePaginate()` запроса к базе данных.

```html
<ul class="pagination">
    <li class="page-item first">
        <span class="page-link">&larr;</span>
    </li>
    <li class="page-item last">
        <a class="page-link" href="?page=2">&rarr;</a>
    </li>
</ul>
```

Расположение файла: `~/modules/system/views/pagination/simple.htm`

### AJAX-шаблон

Шаблон `ajax` рендерит пагинированные записи с поддержкой AJAX. Он используется по умолчанию с методом `paginate()` запроса к базе данных и функцией `ajaxPager()`.

```html
<ul class="pagination">
    <li class="page-item first">
        <span class="page-link">&larr;</span>
    </li>
    <li class="page-item">
        <a
            class="page-link"
            data-request="onAjax"
            data-request-data="{ page: 1 }"
            data-request-update="{ _self: true }">1</a>
    </li>
    <li class="page-item last">
        <a
            class="page-link"
            data-request="onAjax"
            data-request-data="{ page: 2 }"
            data-request-update="{ _self: true }">&rarr;</a>
    </li>
</ul>
```

Расположение файла: `~/modules/system/views/pagination/ajax.htm`

## Использование пользовательской разметки

::: tip
Посетите [статью о функции пагинации](../../cms/features/pagination.md) для инструкций по использованию пользовательской разметки пагинации.
:::

#### См. также

::: also
* [Создание API-ресурсов](../../cms/resources/building-apis.md)
* [Пагинация CMS](../../cms/features/pagination.md)
* [Пагинация моделей](../../extend/database/pagination.md)
:::
