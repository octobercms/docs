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

## str_replace

Replace all occurrences of the search string with the replacement string.

```twig
// Outputs: Bob
{{ 'Alice'|str_replace('Alice', 'Bob') }}
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

Gets the plural form of an English word.

```twig
// Outputs: chickens
{{ str_plural('chicken') }}
```

## str_upper()

Makes a string uppercase.

```twig
// Outputs: Hello I'm JACK
Hello I'm {{ 'Jack'|str_upper }}
```

## str_lower()

Makes a string lowercase.

```twig
// Outputs: Hello I'm jack
Hello I'm {{ 'JACK'|str_lower }}
```

## str_ucfirst()

Makes a string's first character uppercase.

```twig
// Outputs: Hello I'm Jack
Hello I'm {{ 'jack'|str_ucfirst }}
```

## str_lcfirst()

Makes a string's first character lowercase.

```twig
// Outputs: Hello I'm jack
Hello I'm {{ 'Jack'|str_lcfirst }}
```

## str_repeat()

Repeats a string.

```twig
// Outputs: We are the best best best!
We are the {{ 'best '|str_repeat(3) }}!
```

## str_pad_both

Pads a string to a certain length with another string from both sides.

```twig
// Outputs: ooxxxoo
{{ 'xxx'|str_pad_both(7, 'o') }}
```

## str_pad_left

Pads a string to a certain length with another string from left side.

```twig
// Outputs: ooxxx
{{ 'xxx'|str_pad_left(5, 'o') }}
```

## str_pad_right

Pads a string to a certain length with another string from right side.

```twig
// Outputs: xxxoo
{{ 'xxx'|str_pad_right(5, 'o') }}
```

## str_reverse

Reverses a string.

```twig
// Outputs: !dlrow olleH
{{ 'Hello world!'|str_reverse }}
```
