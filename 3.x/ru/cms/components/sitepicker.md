---
subtitle: Инструменты для работы с несколькими определениями сайтов.
---
# Site Picker

Компонент `sitePicker` предоставляет инструменты для работы с [конфигурацией мультисайта](../resources/multisite.md) вашего сайта. Лучшее место для его размещения — шаблон страницы или макета.

## Базовое использование

::: cmstemplate
```ini
[sitePicker]
```
```twig
{% set availableSites = sitePicker.sites %}
```
:::

Следующий пример демонстрирует отображение выпадающего списка для переключения между сайтами. Он используется совместно со [свойством Twig](../../markup/property/this-site.md) `this.site`.

```twig
<select class="form-control" onchange="window.location.assign(this.value)">
    {% for site in sitePicker.sites %}
        <option value="{{ site.url }}" {{ this.site.code == site.code ? 'selected' }}>
            {{ site.name }}
        </option>
    {% endfor %}
</select>
```

Другой пример — генерация альтернативных ссылок на страницу с помощью мета-тегов.

```twig
{% for site in sitePicker.sites %}
    <link rel="alternate" hreflang="{{ site.locale }}" href="{{ site.url }}" />
{% endfor %}
```

## Загрузка сайтов для другой страницы

По умолчанию свойство `sites` возвращает сайты, настроенные для текущей страницы, а `url` указывает на текущую страницу. Функция `pageSites()` может использоваться для поиска сайтов для другой страницы, где первый аргумент — имя CMS-страницы.

В примере ниже каждый сайт будет иметь `url`, указывающий на CMS-страницу в **pages/blog/index.htm**. Если страница не найдена, результатом будет пустой массив.

::: cmstemplate
```ini
[sitePicker]
```
```twig
{% set otherSites = sitePicker.pageSites('blog/index') %}
```
:::

## Перевод URL-параметров

По умолчанию компонент `sitePicker` не знает о параметрах модели в URL, таких как slug и идентификаторы страниц. [Глобальное событие](../../extend/services/event.md) `cms.sitePicker.overrideParams` используется для переопределения URL-параметров на их переведённые версии. Хорошее место для размещения этого события — метод `init` или `onRun` [класса CMS-компонента](../../extend/cms-components.md).

Например, если модель реализует [трейт `Multisite`](../../extend/database/traits.md), метод `newOtherSiteQuery` используется для поиска модели для предлагаемого сайта и модификации URL-параметров.

```php
$myModel = MyModel::find(1);
$otherModels = $myModel->newOtherSiteQuery()->get();

Event::listen('cms.sitePicker.overrideParams', function($page, $params, $currentSite, $proposedSite) use ($otherModels) {
    $otherModel = $otherModels->where('site_id', $proposedSite->id)->first();
    if ($otherModel) {
        $params['id'] = $otherModel->id;
        $params['slug'] = $otherModel->slug;
        $params['fullslug'] = $otherModel->fullslug;
    }
    return $params;
});
```

#### См. также

::: also
* [Мультисайт](../resources/multisite.md)
:::
