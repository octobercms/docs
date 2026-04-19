---
subtitle: Twig 函数
---
# str()

以 `str_` 为前缀的函数执行处理字符串时有用的任务。该辅助函数直接映射到 `Str` PHP 类及其方法。例如：

```twig
{{ str_camel() }}
```

上述代码等同于以下 PHP 代码：

```php
<?= Str::camel() ?>
```

::: warning
*camelCase* 格式的方法名应转换为 *snake_case*。
:::

您也可以将字符串函数用作 Twig 过滤器。

```twig
{{ ''|str_camel }}
```

## str_limit()

限制字符串中的字符数。

```twig
{{ str_limit('The quick brown fox...', 100) }}
```

要在应用限制时添加后缀，请将其作为第三个参数传递。默认为 `...`。

```twig
{{ str_limit('The quick brown fox...', 100, '... Read more!') }}
```

## str_words()

限制字符串中的单词数。

```twig
{{ str_words('The quick brown fox...', 100) }}
```

要在应用限制时添加后缀，请将其作为第三个参数传递。默认为 `...`。

```twig
{{ str_words('The quick brown fox...', 100, '... Read more!') }}
```

## str_replace

将搜索字符串的所有出现替换为替换字符串。

```twig
// Outputs: Bob
{{ 'Alice'|str_replace('Alice', 'Bob') }}
```

## str_camel()

将值转换为 *camelCase*。

```twig
// Outputs: helloWorld
{{ str_camel('hello world') }}
```

## str_studly()

将值转换为 *StudlyCase*。

```twig
// Outputs: HelloWorld
{{ str_studly('hello world') }}
```

## str_snake()

将值转换为 *snake_case*。

```twig
// Outputs: hello_world
{{ str_snake('hello world') }}
```

第二个参数可以提供分隔符。

```twig
// Outputs: hello---world
{{ str_snake('hello world', '---') }}
```

## str_plural()

获取英语单词的复数形式。

```twig
// Outputs: chickens
{{ str_plural('chicken') }}
```

## str_upper()

将字符串转换为大写。

```twig
// Outputs: Hello I'm JACK
Hello I'm {{ 'Jack'|str_upper }}
```

## str_lower()

将字符串转换为小写。

```twig
// Outputs: Hello I'm jack
Hello I'm {{ 'JACK'|str_lower }}
```

## str_ucfirst()

将字符串的第一个字符转换为大写。

```twig
// Outputs: Hello I'm Jack
Hello I'm {{ 'jack'|str_ucfirst }}
```

## str_lcfirst()

将字符串的第一个字符转换为小写。

```twig
// Outputs: Hello I'm jack
Hello I'm {{ 'Jack'|str_lcfirst }}
```

## str_repeat()

重复一个字符串。

```twig
// Outputs: We are the best best best!
We are the {{ 'best '|str_repeat(3) }}!
```

## str_pad_both

从两侧用另一个字符串将字符串填充到指定长度。

```twig
// Outputs: ooxxxoo
{{ 'xxx'|str_pad_both(7, 'o') }}
```

## str_pad_left

从左侧用另一个字符串将字符串填充到指定长度。

```twig
// Outputs: ooxxx
{{ 'xxx'|str_pad_left(5, 'o') }}
```

## str_pad_right

从右侧用另一个字符串将字符串填充到指定长度。

```twig
// Outputs: xxxoo
{{ 'xxx'|str_pad_right(5, 'o') }}
```

## str_reverse

反转字符串。

```twig
// Outputs: !dlrow olleH
{{ 'Hello world!'|str_reverse }}
```
