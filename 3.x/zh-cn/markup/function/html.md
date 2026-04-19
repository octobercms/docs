---
subtitle: Twig 函数
---
# html()

以 `html_` 为前缀的函数执行处理 HTML 标记时有用的任务。该辅助函数直接映射到 `Html` PHP 类及其方法。例如：

```twig
{{ html_strip() }}
```

上述代码等同于以下 PHP 代码：

```php
<?= Html::strip() ?>
```

::: warning
*camelCase* 格式的方法名应转换为 *snake_case*。
:::

您也可以将 HTML 函数用作 Twig 过滤器。

```twig
{{ ''|html_strip }}
```

## html_strip()

从字符串中移除 HTML。

```twig
// Outputs: Hello world
{{ '<strong>Hello world</strong>'|html_strip }}
```

您可以将第一个参数作为允许保留的标签。

```twig
// Outputs: <p>Text</p>
{{ '<p><b>Text</b></p>'|html_strip('<p>') }}
```

## html_limit()

以正确的标签处理方式限制 HTML 的特定长度。

```twig
{{ '<p>Post content...</p>'|html_limit(100) }}
```

要在应用限制时添加后缀，请将其作为第二个参数传递。默认为 `...`。

```twig
{{ '<p>Post content...</p>'|html_limit(100, '... Read more!') }}
```

## html_clean()

清理 HTML 以防止大多数 XSS 攻击。

```twig
{{ '<script>window.location = "http://google.com"</script>'|html_clean }}
```

## html_email()

混淆电子邮件地址以防止垃圾邮件机器人嗅探。

```twig
{{ 'me@mysite.tld'|html_email }}
```

例如：

```twig
<a href="mailto: {{ 'me@mysite.tld'|html_email }}">Email me</a>

<!-- The above will output -->
<a href="mailto: &#109;&#97;&#105;&#108;&#x74;o&#x3a;&#97;&#64;b.&#x63;">Email me</a>
```

## html_mailto()

输出包含混淆电子邮件的完整锚链接。

```twig
{{ 'me@mysite.tld'|html_mailto }}
```
