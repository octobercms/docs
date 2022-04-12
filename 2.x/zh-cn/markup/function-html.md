# html()

以 `html_` 为前缀的函数执行处理 HTML 标记时很有用。 助手程序直接映射到`Html` PHP 类及其方法。 例如： 

```twig
{{ html_strip() }}
```

上面和下面的 PHP 相同：

```php
<?= Html::strip() ?>
```

> **注意**: *驼峰命名* 中的方法应转换为*蛇形命名*

您还可以将 HTML 函数用作 Twig 过滤器。

```twig
{{ ''|html_strip }}
```

## html_strip()

从字符串中删除 HTML

```twig
{{ html_strip('<strong>Hello world</strong>') }}
```

## html_limit()

通过适当的标记处理限制具有特定长度的 HTML。

```twig
{{ html_limit('<p>帖子内容...</p>', 100) }}
```

要在应用限制时添加后缀，请将其作为第三个参数传递。 默认为`...`。 

```twig
{{ html_limit('<p>帖子内容...</p>', 100, '... 阅读更多!') }}
```

## html_clean()

清理 HTML 以防止大多数 XSS 攻击。

```twig
{{ html_clean('<script>window.location = "http://google.com"</script>') }}
```

## html_email()

混淆电子邮件地址以防止垃圾邮件机器人攻击它。

```twig
{{ html_email('a@b.c') }}
```

例如:

```twig
<a href="mailto: {{ html_email('a@b.c')|raw }}">给我发邮件</a>

<!-- 以上将输出 -->
<a href="mailto: &#109;&#97;&#105;&#108;&#x74;o&#x3a;&#97;&#64;b.&#x63;">给我发邮件</a>
```
