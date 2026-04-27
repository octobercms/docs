---
subtitle: Twig 函数
---
# abort()

`abort()` 函数通过更改响应代码和内容来中止成功的请求路径。这在设置自定义 HTTP 状态码或在找不到记录时显示 404 页面时非常有用。

```twig
{% if record.notFound %}
    {% do abort(404) %}
{% endif %}
```

要设置响应代码并显示主题的 404 页面，请使用 `404` 代码。

```twig
{% do abort(404) %}
```

任何其他代码将显示错误页面，可选地将消息作为第二个参数。

```twig
{% do abort(403, 'Access Denied') %}
```

要在不更改响应内容的情况下设置头信息中的 HTTP 状态码，请将 `false` 作为第二个参数传递。

```twig
{% do abort(404, false) %}
```
