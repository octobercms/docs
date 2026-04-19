---
subtitle: Twig-фильтр
---
# |md

Фильтр `|md` преобразует значение из формата Markdown в HTML.

```twig
{{ '**Text** is bold.'|md }}
```

Результат будет следующим:

```html
<strong>Text</strong> is bold.
```

Подробнее об использовании Markdown см. в [статье о парсере Markdown](../../extend/services/parser.md).

## |md_safe

Фильтр `|md_safe` парсит Markdown с включённым безопасным режимом, который полностью экранирует весь HTML, кроме базового HTML, сгенерированного синтаксисом Markdown. Короче говоря, это означает, что HTML-разметка экранируется, плюс обеспечивается защита от скриптовых возможностей синтаксиса Markdown. Могут использоваться только определённые «безопасные» HTTP-протоколы, например, `https://`, `ftps://`, `mailto:` и т.д.

Следующий JavaScript не будет выполнен:

```twig
{{ '<a href="javascript:alert(1)">click me</a>'|md_safe }}
```

## |md_clean

Фильтр `md_clean` парсит Markdown с большей поддержкой HTML, чем `|md_safe`, поскольку использует санитайзер для удаления любого потенциально опасного кода.

```twig
{{ '<script>alert(1)</script>'|md_clean }}
```

#### См. также

::: also
* [Статья о парсере Markdown](../../extend/services/parser.md)
:::
