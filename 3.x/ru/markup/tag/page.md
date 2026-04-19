---
subtitle: Twig-тег
---
# {% page %}

Тег `{% page %}` рендерит содержимое [страницы](../../cms/themes/pages.md) в шаблон макета. См. [макеты](../../cms/themes/layouts.md) для базового примера.

Тег `{% page %}` парсит необработанную разметку из шаблона страницы. Шаблон страницы может внедрять контент как в плейсхолдер(ы), так и определять необработанную разметку.

::: cmstemplate
```ini
description="example layout"
```
```twig
<html>
    <head>
        {% placeholder head %}
    </head>
    <body>
        {% page %}
        ...
```
:::

Размещение контента в плейсхолдере `head`.

::: cmstemplate
```ini
description="example page"
```
```twig
{% put head %}
    <meta name="foo" content="bar">
{% endput %}

<p>My content.</p>
```
:::

Страница, отрендеренная с шаблоном, даст следующий результат:

```html
<html>
    <head>
        <meta name="foo" content="bar">
    </head>
    <body>
        <p>My content.</p>
        ...
```
