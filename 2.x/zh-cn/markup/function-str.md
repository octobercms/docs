# str()

以 `str_` 为前缀的函数执行处理字符串时很有用。 助手程序直接映射到 `Str` PHP 类及其方法。 例如：

```twig
{{ str_camel() }}
```

下面写法相等于上面：

```php
<?= Str::camel() ?>
```

> **注意**: *驼峰命名* 中的方法应转换为*蛇形命名*

## str_limit()

限制一个字符串中的字符数。

```twig
{{ str_limit('敏捷的棕色狐狸...', 100) }}
```

要在应用限制时添加后缀，请将其作为第三个参数传递。 默认为`...`。

```twig
{{ str_limit('敏捷的棕色狐狸...', 100, '... 阅读更多!') }}
```

## str_words()

限制字符串中的单词数。

```twig
{{ str_words('敏捷的棕色狐狸...', 100) }}
```

要在应用限制时添加后缀，请将其作为第三个参数传递。 默认为`...`。

```twig
{{ str_words('敏捷的棕色狐狸...', 100, '... 阅读更多!') }}
```

## str_camel()

将值转换为 *驼峰命名*

```twig
// 输出: helloWorld
{{ str_camel('hello world') }}
```

## str_studly()

将值转换为 *PascalCase(单词开头字母大写格式)*。

```twig
// 输出: HelloWorld
{{ str_studly('hello world') }}
```

## str_snake()

将值转换为 *蛇形命名*。

```twig
// 输出: hello_world
{{ str_snake('hello world') }}
```

第二个参数可以提供分隔符。

```twig
// 输出: hello---world
{{ str_snake('hello world', '---') }}
```

## str_plural()

获取英语单词的复数形式。 

```twig
// 输出: chickens
{{ str_plural('chicken') }}
```
