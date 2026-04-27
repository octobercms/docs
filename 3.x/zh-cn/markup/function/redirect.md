---
subtitle: Twig 函数
---
# redirect()

`redirect()` 函数将响应重定向到一个 URL 或主题页面。

要执行重定向，请将第一个参数作为目标传递，可以是 CMS 页面名称或 URL 地址。

```twig
{% if record.notFound %}
    {% do redirect('404') %}
{% endif %}
```

页面参数可作为第二个参数传递。

```twig
{% do redirect('docs', { slug: 'home' }) %}
```

要重定向到一个 URL，请传递完整的地址而不是页面名称。

```twig
{% do redirect('https://octobercms.com') %}
```

要包含重定向状态码，如 `302`（临时）或 `301`（永久），请使用第二个或第三个参数。默认状态码为 `302`。

```twig
{% do redirect('https://octobercms.com', 301) %}
```
