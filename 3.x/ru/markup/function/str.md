---
subtitle: Twig-функция
---
# str()

Функции с префиксом `str_` выполняют задачи, полезные при работе со строками. Вспомогательные функции напрямую соответствуют PHP-классу `Str` и его методам. Например:

```twig
{{ str_camel() }}
```

Приведённый выше код является PHP-эквивалентом следующего:

```php
<?= Str::camel() ?>
```

::: warning
Методы в *camelCase* должны быть преобразованы в *snake_case*.
:::

Вы также можете применять строковые функции как Twig-фильтр.

```twig
{{ ''|str_camel }}
```

## str_limit()

Ограничивает количество символов в строке.

```twig
{{ str_limit('The quick brown fox...', 100) }}
```

Чтобы добавить суффикс при применении ограничения, передайте его как третий аргумент. По умолчанию: `...`.

```twig
{{ str_limit('The quick brown fox...', 100, '... Read more!') }}
```

## str_words()

Ограничивает количество слов в строке.

```twig
{{ str_words('The quick brown fox...', 100) }}
```

Чтобы добавить суффикс при применении ограничения, передайте его как третий аргумент. По умолчанию: `...`.

```twig
{{ str_words('The quick brown fox...', 100, '... Read more!') }}
```

## str_replace

Заменяет все вхождения искомой строки строкой замены.

```twig
// Outputs: Bob
{{ 'Alice'|str_replace('Alice', 'Bob') }}
```

## str_camel()

Преобразует значение в *camelCase*.

```twig
// Outputs: helloWorld
{{ str_camel('hello world') }}
```

## str_studly()

Преобразует значение в *StudlyCase*.

```twig
// Outputs: HelloWorld
{{ str_studly('hello world') }}
```

## str_snake()

Преобразует значение в *snake_case*.

```twig
// Outputs: hello_world
{{ str_snake('hello world') }}
```

Второй аргумент может указать разделитель.

```twig
// Outputs: hello---world
{{ str_snake('hello world', '---') }}
```

## str_plural()

Получает форму множественного числа английского слова.

```twig
// Outputs: chickens
{{ str_plural('chicken') }}
```

## str_upper()

Преобразует строку в верхний регистр.

```twig
// Outputs: Hello I'm JACK
Hello I'm {{ 'Jack'|str_upper }}
```

## str_lower()

Преобразует строку в нижний регистр.

```twig
// Outputs: Hello I'm jack
Hello I'm {{ 'JACK'|str_lower }}
```

## str_ucfirst()

Преобразует первый символ строки в верхний регистр.

```twig
// Outputs: Hello I'm Jack
Hello I'm {{ 'jack'|str_ucfirst }}
```

## str_lcfirst()

Преобразует первый символ строки в нижний регистр.

```twig
// Outputs: Hello I'm jack
Hello I'm {{ 'Jack'|str_lcfirst }}
```

## str_repeat()

Повторяет строку.

```twig
// Outputs: We are the best best best!
We are the {{ 'best '|str_repeat(3) }}!
```

## str_pad_both

Дополняет строку до определённой длины другой строкой с обеих сторон.

```twig
// Outputs: ooxxxoo
{{ 'xxx'|str_pad_both(7, 'o') }}
```

## str_pad_left

Дополняет строку до определённой длины другой строкой слева.

```twig
// Outputs: ooxxx
{{ 'xxx'|str_pad_left(5, 'o') }}
```

## str_pad_right

Дополняет строку до определённой длины другой строкой справа.

```twig
// Outputs: xxxoo
{{ 'xxx'|str_pad_right(5, 'o') }}
```

## str_reverse

Переворачивает строку.

```twig
// Outputs: !dlrow olleH
{{ 'Hello world!'|str_reverse }}
```
