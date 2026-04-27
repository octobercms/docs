---
subtitle: Twig 过滤器
---
# |app

`|app` 过滤器返回相对于网站公共路径的地址。结果是一个绝对 URL，包括域名和协议，指向过滤器参数中指定的位置。该过滤器可以应用于任何路径。

```twig
<link rel="icon" href="{{ '/favicon.ico'|app }}" />
```

如果网站地址是 __https://octobercms.com__，上面的示例将输出以下内容：

```html
<link rel="icon" href="https://octobercms.com/favicon.ico" />
```

它也可以用于静态 URL：

```twig
<a href="{{ '/about-us'|app }}">
    About Us
</a>
```

上面的代码将输出：

```html
<a href="https://octobercms.com/about-us">
    About us
</a>
```

> **注意**：建议使用 `|page` 过滤器来链接到其他页面。
