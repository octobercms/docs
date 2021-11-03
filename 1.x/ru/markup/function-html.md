# html()

Функции с префиксом `html_` выполняют задачи, полезные при работе с html-разметкой. Они являются аналогами методов PHP класса `Html`. Например:

    {{ html_strip() }}

является аналогом:

    <?= Html::strip() ?>

> **Примечание**: Названия методов должны быть преобразованы из *camelCase* в *snake_case*.

## html_strip()

Удаляет HTML из строки.

    {{ html_strip('<strong>Hello world</strong>') }}

## html_limit()

Ограничивает HTML код определенной длиной с правильной обработкой тегов.

    {{ html_limit('<p>Post content...</p>', 100) }}

Используйте третий аргумент для добавления суффикса к строке. По умолчанию используется `...`.

    {{ html_limit('<p>Post content...</p>', 100, '... Read more!') }}

## html_clean()

Очищает HTML, для предотвращения большинства XSS атак.

    {{ html_clean('<script>window.location = "http://google.com"</script>') }}

## html_email()

Обфускация e-mail адреса для защиты от спама.

    {{ html_email('a@b.c') }}

Пример:

    <a href="mailto: {{ html_email('a@b.c')|raw }}">Email me</a>

    <!-- The above will output -->
    <a href="mailto: &#109;&#97;&#105;&#108;&#x74;o&#x3a;&#97;&#64;b.&#x63;">Email me</a>
