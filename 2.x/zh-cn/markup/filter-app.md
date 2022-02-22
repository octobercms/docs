# |app

`|app` 过滤器返回网站公共路径的地址.返回结果指向过滤器参数中指定位置的绝对URL,包括域名和协议.过滤器可以应用于任何路径.

```twig
<link rel="icon" href="{{ '/favicon.ico'|app }}" />
```

如果网站地址是 __https://octobercms.com__ 则上面的示例将输出以下内容:

```html
<link rel="icon" href="https://octobercms.com/favicon.ico" />
```

它也可以用于静态 URL:

```twig
<a href="{{ '/about-us'|app }}">
    关于我们
</a>
```

以上将输出:

```html
<a href="https://octobercms.com/about-us">
    关于我们
</a>
```

> **注意**: 推荐使用 `|page` 过滤器链接到其他页面.
