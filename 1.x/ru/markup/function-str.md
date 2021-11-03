# str()

Функции с префиксом `str_` выполняют задачи, полезные при работе со строками. Они являются аналогами методов PHP класса `Str`. Например:

    {{ str_camel() }}

является аналогом:

    <?= Str::camel() ?>

> **Примечание**: Названия методов должны быть преобразованы из *camelCase* в *snake_case*.

## str_limit()

Ограничивает количество символов в строке.

    {{ str_limit('The quick brown fox...', 100) }}

Используйте третий аргумент для добавления суффикса к строке. По умолчанию используется `...`.

    {{ str_limit('The quick brown fox...', 100, '... Read more!') }}

## str_words()

Ограничивает количество слов в строке.

    {{ str_words('The quick brown fox...', 100) }}

Используйте третий аргумент для добавления суффикса к строке. По умолчанию используется `...`.

    {{ str_words('The quick brown fox...', 100, '... Read more!') }}

## str_camel()

Конвертирует значение в *camelCase*.

    // Outputs: helloWorld
    {{ str_camel('hello world') }}

## str_studly()

Конвертирует значение в *StudlyCase*.

    // Outputs: HelloWorld
    {{ str_studly('hello world') }}

## str_snake()

Конвертирует значение в *snake_case*.

    // Outputs: hello_world
    {{ str_snake('hello world') }}

Второй аргумент определяет разделитель между словами.

    // Outputs: hello---world
    {{ str_snake('hello world', '---') }}

## str_plural()

Отображает английское слово во множественном числе.

    // Outputs: chickens
    {{ str_plural('chicken') }}
