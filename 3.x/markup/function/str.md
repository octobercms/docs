---
subtitle: Twig Function
---
# str()

Functions prefixed with `str_` perform tasks that are useful when dealing with strings. The helper maps directly to the `Str` PHP class and its methods. For example:

```twig
{{ str_camel() }}
```

The above is the PHP equivalent of the following:

```php
<?= Str::camel() ?>
```

::: warning
Methods in *camelCase* should be converted to *snake_case*.
:::

You may also apply the string functions as a Twig filter.

```twig
{{ ''|str_camel }}
```

## str_limit()

Limit the number of characters in a string.

```twig
{{ str_limit('The quick brown fox...', 100) }}
```

To add a suffix when limit is applied, pass it as the third argument. Defaults to `...`.

```twig
{{ str_limit('The quick brown fox...', 100, '... Read more!') }}
```

## str_words()

Limit the number of words in a string.

```twig
{{ str_words('The quick brown fox...', 100) }}
```

To add a suffix when limit is applied, pass it as the third argument. Defaults to `...`.

```twig
{{ str_words('The quick brown fox...', 100, '... Read more!') }}
```

## str_camel()

Convert a value to *camelCase*.

```twig
// Outputs: helloWorld
{{ str_camel('hello world') }}
```

## str_studly()

Convert a value to *StudlyCase*.

```twig
// Outputs: HelloWorld
{{ str_studly('hello world') }}
```

## str_snake()

Convert a value to *snake_case*.

```twig
// Outputs: hello_world
{{ str_snake('hello world') }}
```

The second argument can supply a delimiter.

```twig
// Outputs: hello---world
{{ str_snake('hello world', '---') }}
```

## str_plural()

Get the plural form of an English word.

```twig
// Outputs: chickens
{{ str_plural('chicken') }}
```
