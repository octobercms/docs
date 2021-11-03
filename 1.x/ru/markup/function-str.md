# str()

Функции с префиксом `str_` выполняют задачи, полезные при работе со строками. Они являются аналогами методов PHP класса `Str`. Например:

```twig
{{ str_camel() }}
```

является аналогом:

```php
<?= Str::camel() ?>
```

> **Примечание**: Названия методов должны быть преобразованы из *camelCase* в *snake_case*.

## str_limit()

Ограничивает количество символов в строке.

```twig
{{ str_limit('The quick brown fox...', 100) }}
```

Используйте третий аргумент для добавления суффикса к строке. По умолчанию используется `...`.

```twig
{{ str_limit('The quick brown fox...', 100, '... Read more!') }}
```

## str_words()

Ограничивает количество слов в строке.

```twig
{{ str_words('The quick brown fox...', 100) }}
```

Используйте третий аргумент для добавления суффикса к строке. По умолчанию используется `...`.

```twig
{{ str_words('The quick brown fox...', 100, '... Read more!') }}
```

## str_camel()

Конвертирует значение в *camelCase*.

```twig
// Outputs: helloWorld
{{ str_camel('hello world') }}
```

## str_studly()

Конвертирует значение в *StudlyCase*.

```twig
// Outputs: HelloWorld
{{ str_studly('hello world') }}
```

## str_snake()

Конвертирует значение в *snake_case*.

```twig
// Outputs: hello_world
{{ str_snake('hello world') }}
```

Второй аргумент определяет разделитель между словами.

```twig
// Outputs: hello---world
{{ str_snake('hello world', '---') }}
```

## str_plural()

Отображает английское слово во множественном числе.

```twig
// Outputs: chickens
{{ str_plural('chicken') }}
```
