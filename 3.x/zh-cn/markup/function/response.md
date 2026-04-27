---
subtitle: Twig 函数
---
# response()

`response()` 函数覆盖页面的显示并返回一个响应，通常以 JSON 负载的形式。

```twig
{% do response({ foo: 'bar' }) %}
```

上述调用将返回一个内容类型为 `application/json` 的响应。

```json
{
    "foo": "bar"
}
```

默认使用 `200` 状态码。您可以通过将状态码作为第二个参数传递来指定任意状态码。

```twig
{% do response('Bad Request', 400) %}
```

您还可以将自定义头信息作为第三个参数传递。

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

#### 参见

::: also
* [构建 API 资源](../../cms/resources/building-apis.md)
:::
