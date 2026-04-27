---
subtitle: Twig-фильтр
---
# |link

Фильтр `|link` возвращает ссылку, сгенерированную с использованием выходной схемы `october://` [виджета формы поиска страниц](../../element/form/widget-pagefinder.md). Результатом является публичный URL страницы, указанной виджетом формы.

```twig
<a href="{{ 'october://cms-page@link/about'|link }}" />
```

::: tip
Если вы хотите парсить HTML на наличие нескольких ссылок и разрешить их как HTTP-ссылки в выводе, см. [`|content` Twig-фильтр](../tag/content.md).
:::

## link()

Дополнительная функция `link()` используется для извлечения более подробной информации о ссылке.

```twig
{% set resolved = link('october://cms-page@link/about') %}

{{ resolved.url }}
```

В результирующем объекте можно ожидать следующие свойства.

Свойство | Данные
------------- | -------------
**url** | публичный URL страницы.
**mtime** | время модификации ссылки на страницу.
**title** | человекочитаемый заголовок для ссылки, необязательно.
**items** | массив, содержащий сгенерированные дочерние элементы, необязательно.
**isActive** | установлено в true, если ссылка в данный момент активна.

Вы можете запросить вложенные дочерние элементы, передав опцию `nesting` со значением `true` (второй аргумент), что заполнит свойство `items` в результате.

```twig
{% set resolved = link('october://...', { nesting: true }) %}

{% for subitem in resolved.items %}
    {{ subitem.url }}
{% endfor %}
```

Вы можете запросить URL других сайтов, передав опцию `sites` со значением `true`, что заполнит свойство `sites` в результате.

```twig
{% set resolved = link('october://...', { sites: true }) %}

{% for site in resolved.sites %}
    {{ site.url }}
{% endfor %}
```

## PHP-интерфейс

Вы можете разрешать ссылки в PHP с помощью класса `Cms\Classes\PageManager`. Метод `url` возвращает строку с публичным URL.

```php
Cms\Classes\PageManager::url('october://cms-page@link/about');
```

Метод `resolve` возвращает детализированный объект `Cms\Models\PageLookupItem`.

```php
$page = Cms\Classes\PageManager::resolve('october://cms-page@link/about');

echo $page->url;
```

#### См. также

::: also
* [Виджет формы поиска страниц](../../element/form/widget-pagefinder.md)
:::
