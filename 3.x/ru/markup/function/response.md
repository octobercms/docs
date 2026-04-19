---
subtitle: Twig-функция
---
# response()

Функция `response()` переопределяет отображение страницы и возвращает ответ, обычно в виде JSON-данных.

```twig
{% do response({ foo: 'bar' }) %}
```

Приведённый выше вызов вернёт ответ с типом содержимого `application/json`.

```json
{
    "foo": "bar"
}
```

По умолчанию используется код состояния `200`. Вы можете указать любой код состояния, передав его как второй аргумент.

```twig
{% do response('Bad Request', 400) %}
```

Вы также можете передать пользовательские заголовки как третий аргумент.

```twig
{% do response('Bad Request', 400, {'X-Failure-Reason': 'Not wearing shoes'}) %}
```

<!--
## resource()

The `resource()` function converts a resource to a consistent response type and should be used when handling models or collections.

```twig
{% do response(resource(model)) %}
```

All data returned will be wrapped in the **data** attribute automatically or if placed there explicitly. Wrapping the response provides a consistent interface.

```json
{
    "data": {}
}
```

If a resource support pagination, the output will be specially crafted to include a **links** and **meta** attribute.

```json
{
    "data": {},
    "links": {
        "first": "...",
        "last": "...",
        "prev": "...",
        "next": "..."
    },
    "meta": {}
}
```

Resources are resolved using a resolver that developers can use to customize their output. It's possible to construct a response with multiple resource resolvers.

```twig
{% do response({
    user: resource(user),
    posts: resource(user.posts)
}) %}
```
-->

#### См. также

::: also
* [Создание API-ресурсов](../../cms/resources/building-apis.md)
:::
