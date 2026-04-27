---
subtitle: Узнайте, как создать простой API с помощью CMS-страниц.
---
# Создание API-эндпоинтов

::: aside
Обратитесь к [статье о маршрутизации](../../extend/system/routing.md), если вы предпочитаете определять API-маршруты с помощью PHP.
:::

При работе с клиентскими фреймворками, такими как Vue.js или React, необходимо использовать серверные API. Их можно определить с помощью темы, где каждая страница представляет собой API-эндпоинт.

Страница представляет собой трансформационный слой между CMS-компонентами и JSON-ответами, возвращаемыми вашему приложению. Большинство объектов, таких как модели и коллекции, поддерживают JSON-сериализацию и могут возвращаться непосредственно в качестве ответа.

## Отправка ответа

В простейшей форме API-ресурс можно составить, возвращая Twig-переменную с помощью [Twig-функции](../../markup/function/response.md) `response()`. Эта функция переопределяет содержимое страницы и возвращает пользовательский ответ браузеру.

::: cmstemplate
```ini
url = "/api/foobar"
```
```twig
{% do response({ foo: 'bar' }) %}
```
:::

Приведённый выше вызов вернёт ответ с типом содержимого `application/json`.

```json
{ "foo": "bar" }
```

В большинстве случаев вы будете преобразовывать переменные компонентов в ответ.

```twig
{% do response({
    id: post.id,
    title: post.title,
    email: post.author.email,
    created_at: post.created_at,
    updated_at: post.updated_at
}) %}
```

### Коллекции

[Twig-функция](../../markup/function/collect.md) `collect()` создаёт коллекцию для ответа. Метод `push` используется для добавления элементов в коллекцию и может настраивать каждый результат.

```twig
{% set result = collect() %}

{% for post in posts %}
    {% do result.push({
        id: post.id,
        title: post.title,
        email: post.author.email,
        created_at: post.created_at,
        updated_at: post.updated_at
    }) %}
{% endfor %}

{% do response(result) %}
```

## Условия

Все условия Twig можно использовать в разметке для влияния на ответ, и последний вызов response будет отправлен браузеру.

### Проверка HTTP-метода

Используйте [Twig-свойство](../../markup/property/this-request.md) `this.request.method` для проверки метода запроса.

```twig
{% if this.request.method == 'GET' %}
    <!-- Do GET Logic -->
{% else %}
    <!-- Method Unsupported -->
{% endif %}
```

### Прерывание запроса

[Twig-функция](../../markup/function/abort.md) `abort()` может использоваться для прерывания запроса с ответом 404.

```twig
{% if post %}
    {% do response(post) %}
{% else %}
    {% do abort(404) %}
{% endif %}
```

## Работа со страницами и макетами

Поскольку API определяется в секции разметки страницы или макета, все компоненты и события жизненного цикла доступны.

### Использование макетов как Middleware

Middleware позволяет применять общую логику к нескольким эндпоинтам, например, проверку аутентификации или ограничение запросов. [CMS-макет с режимом приоритета](../themes/layouts.md) может использоваться для применения логики к нескольким страницам, причём логика макета выполняется перед логикой страницы.

Не забудьте включить [Twig-тег `{% page %}`](../../markup/tag/page.md), чтобы логика страницы была включена. Например, макет с именем **api.htm** может содержать любую условную логику.

::: cmstemplate
```ini
description = "API Authentication"
is_priority = 1
```
```twig
{% if someCondition %}
    {% page %}
{% else %}
    {% do response({ message: 'Condition not met' }, 400) %}
{% endif %}
```
:::

Каждая страница, использующая этот макет, будет подчиняться условиям макета.

::: cmstemplate
```ini
layout = "api"
```
```twig
{% do response({ success: true }) %}
```
:::

::: warning
Всегда используйте [режим приоритета в макете](../themes/layouts.md), чтобы содержимое макета выполнялось первым.
:::

### Вызов AJAX-обработчиков

В некоторых случаях вам может потребоваться вызвать AJAX-обработчик компонента или страницы. Это возможно с помощью [Twig-функции `ajaxHandler()`](../../markup/function/ajax-handler.md).

::: cmstemplate
```ini
url = "/api/signin

[account]
```
```twig
{% set result = ajaxHandler('onSignin') %}

{% if result.error %}
    {% do response({ message: 'Login Failed' }, 401) %}
{% else %}
    {% do response({ success: true }) %}
{% endif %}
```
:::

Вы также можете вызвать обработчик и передать его непосредственно в качестве ответа. Ответ включает переменные, установленные на странице, и значения массива, возвращённые функцией.

```twig
{% do response(ajaxHandler('onSubmitPost')) %}
```

Перенаправления также обрабатываются автоматически. Подробнее см. [статью о Twig-функции](../../markup/function/ajax-handler.md).

## Работа с ресурсами

При работе с моделями и коллекциями рекомендуется возвращать данные, обёрнутые в атрибут **data**. Оборачивание ответа обеспечивает согласованный интерфейс.

### Модели и коллекции

Возврат ресурса модели.

::: cmstemplate
```ini
url = "/api/blog/post/:slug"

[section post]
handle = "Blog\Post"
identifier = "slug"
```
```twig
{% if post %}
    {% do response({
        data: post
    }) %}
{% else %}
    {% do abort(404) %}
{% endif %}
```
:::

Возврат ресурса коллекции.

::: cmstemplate
```ini
url = "/api/blog/posts"

[collection posts]
handle = "Blog\Post"
```
```twig
{% do response({
    data: posts
}) %}
```
:::

### Пагинация

При ответе с пагинированной коллекцией рекомендуется использовать [Twig-функцию](../../markup/function/pager.md) `pager()` для формирования ответа с использованием атрибутов **links** и **meta**.

```twig
{% set posts = blog.paginate(3) %}

{% set pager = pager(posts) %}

{% do response({
    data: posts,
    links: pager.links,
    meta: pager.meta
}) %}
```

Приведённый выше код выведет следующий JSON-формат.

```json
{
    "data": {},
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

## Примеры использования

Вот несколько практических примеров использования.

### Возврат пользователей с миниатюрами аватаров

Следующий пример устанавливает переменную `users` равной всем пользователям из [плагина User](https://octobercms.com/plugin/rainlab-user). Связь `avatar` жадно загружается, а затем атрибут `avatar_thumb` устанавливается как URL миниатюры для каждого пользователя, если аватар найден.

::: cmstemplate
```ini
## pages/api/users.htm
url = "/api/users"
```
```php
function onStart()
{
    $this['users'] = \RainLab\User\Models\User::all();
}
```
```twig
{# Load up the avatar relation #}
{% do users.load('avatar') %}

{# Set the 'avatar_thumb' attribute on each user #}
{% for user in users %}
    {% do user.setAttribute(
        'avatar_thumb',
        user.avatar.getThumbUrl(100, 100, {mode: 'crop'})|default(null)
    ) %}
{% endfor %}

{# Respond with the user #}
{% do response({
    data: users
}) %}
```
:::

#### См. также

::: also
* [Twig-функция response](../../markup/function/response.md)
* [Twig-функция ajaxHandler](../../markup/function/ajax-handler.md)
:::
