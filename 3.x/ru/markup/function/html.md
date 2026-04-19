---
subtitle: Twig-функция
---
# html()

Функции с префиксом `html_` выполняют задачи, полезные при работе с HTML-разметкой. Вспомогательные функции напрямую соответствуют PHP-классу `Html` и его методам. Например:

```twig
{{ html_strip() }}
```

Приведённый выше код является PHP-эквивалентом следующего:

```php
<?= Html::strip() ?>
```

::: warning
Методы в *camelCase* должны быть преобразованы в *snake_case*.
:::

Вы также можете применять HTML-функции как Twig-фильтр.

```twig
{{ ''|html_strip }}
```

## html_strip()

Удаляет HTML из строки.

```twig
// Outputs: Hello world
{{ '<strong>Hello world</strong>'|html_strip }}
```

Вы можете передать первый аргумент как допустимые теги.

```twig
// Outputs: <p>Text</p>
{{ '<p><b>Text</b></p>'|html_strip('<p>') }}
```

## html_limit()

Ограничивает HTML определённой длиной с корректной обработкой тегов.

```twig
{{ '<p>Post content...</p>'|html_limit(100) }}
```

Чтобы добавить суффикс при применении ограничения, передайте его как второй аргумент. По умолчанию: `...`.

```twig
{{ '<p>Post content...</p>'|html_limit(100, '... Read more!') }}
```

## html_clean()

Очищает HTML для предотвращения большинства XSS-атак.

```twig
{{ '<script>window.location = "http://google.com"</script>'|html_clean }}
```

## html_email()

Обфусцирует адрес электронной почты для предотвращения его сбора спам-ботами.

```twig
{{ 'me@mysite.tld'|html_email }}
```

Например:

```twig
<a href="mailto: {{ 'me@mysite.tld'|html_email }}">Email me</a>

<!-- The above will output -->
<a href="mailto: &#109;&#97;&#105;&#108;&#x74;o&#x3a;&#97;&#64;b.&#x63;">Email me</a>
```

## html_mailto()

Выводит полную ссылку-якорь с обфусцированным адресом электронной почты.

```twig
{{ 'me@mysite.tld'|html_mailto }}
```
