---
subtitle: Виджет формы
shortname: Page Finder
---
# Поле Page Finder

`pagefinder` — рендерит поле для выбора ссылки на страницу. При раскрытии поля отображается выбор для поиска страницы. Результат выбора — строка, содержащая тип и ссылку.

```yaml
featured_page:
    label: Featured Page
    type: pagefinder
```

Выбранное значение сохраняется в следующем формате.

```
october://<TYPE>@link/<REFERENCE>?<PARAM>=<VALUE>
```

Поддерживаются и обычно используются следующие [свойства поля](../form-fields.md).

Свойство | Описание
------------- | -------------
**label** | имя при отображении поля формы пользователю.
**default** | значение по умолчанию (строка), необязательно.
**comment** | пояснительный комментарий под полем.
**singleMode** | разрешает выбор только элементов, которые разрешаются в один URL. По умолчанию: `false`

::: tip
Разрешайте значение `pagefinder` в списках, используя [тип столбца linkage](../lists/column-linkage.md).
:::

## Создание ссылок на страницы

Используйте [Twig-фильтр `|link`](../../markup/filter/link.md) для преобразования значения page finder в URL.

```twig
{{ featured_page|link }}
```

Используйте [Twig-фильтр `|content`](../../markup/tag/content.md) для обработки HTML-разметки и замены всех ссылок в содержимом.

```twig
{{ blog_html|content }}
```

## Создание новых типов страниц

Плагины могут расширять page finder новыми типами страниц, используя различные события. Наиболее распространённое место для подписки на события — метод `boot` файла регистрации плагина.

```php
public function boot()
{
    Event::listen('cms.pageLookup.listTypes', function() {
        // ...
    });

    Event::listen('cms.pageLookup.getTypeInfo', function($type) {
        // ...
    });

    Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
        // ...
    });
}
```

### Регистрация новых типов страниц

Обработчик события `cms.pageLookup.listTypes` возвращает список типов страниц, поддерживаемых плагином. Обработчик должен возвращать ассоциативный массив с кодами типов в индексах и названиями типов в значениях. Настоятельно рекомендуется использовать имя плагина в кодах типов, чтобы избежать конфликтов с другими провайдерами типов страниц. Например:

```php
Event::listen('cms.pageLookup.listTypes', function() {
    return [
        'blog-post' => 'Blog Post'
    ];
});
```

Для типов страниц, поддерживающих вложенные подэлементы, например, ссылку на все записи блога, значение названия типа должно быть массивом, где последний элемент установлен в `true`. Это исключит его из сценариев, где можно выбрать только одну ссылку. Следующий пример отмечает тип **blog-posts** с поддержкой вложенности.

```php
Event::listen('cms.pageLookup.listTypes', function() {
    return [
        'blog-posts' => ['All Blog Posts', true]
    ];
});
```

### Получение информации о типе страницы

Обработчик события `cms.pageLookup.getTypeInfo` возвращает подробную информацию о поддерживаемых типах страниц. Обработчик получает один параметр — код типа страницы (один из кодов, зарегистрированных обработчиком `cms.pageLookup.listTypes`). Код обработчика должен проверять, принадлежит ли запрашиваемый код типа элемента плагину. Обработчик должен возвращать ассоциативный массив в следующем формате.

```php
Event::listen('cms.pageLookup.getTypeInfo', function($type) {
    if ($type == 'blog-post') {
        return [
            'references' => [
                11 => 'News',
                12 => 'Tutorials',
                13 => 'Philosophy',
            ],
            'cmsPages' => Page::withComponent('blogPosts')->all()
        ];
    }
});
```

#### Ссылки

Элемент `references` — это список объектов, на которые может ссылаться страница. Например, тип страницы **Blog Category** возвращает список категорий блога. Некоторые объекты поддерживают вложенность, например, полные списки страниц. Другие объекты не поддерживают вложенность, например, категории блога. Формат значения `references` зависит от того, имеют ли ссылки подэлементы или нет. Формат для ссылок без подэлементов следующий.

```php
'references' => [
    'item-key' => 'Item title'
]
```

Формат для ссылок с подэлементами следующий.

```php
'references' => [
    'item-key' => [
        'title' => 'Item title',
        'items' => [...]
    ]
]
```

Следующий итератор может использоваться для генерации ссылок, когда модель имеет дочерние элементы.

```php
$iterator = function($records) use (&$iterator) {
    $result = [];
    foreach ($records as $record) {
        if (!$record->children) {
            $result[$record->id] = $record->title;
        }
        else {
            $result[$record->id] = [
                'title' => $record->title,
                'items' => $iterator($record->children)
            ];
        }
    }
    return $result;
};

return ['references' => $iterator($records)];
```

#### CMS-страницы

`cmsPages` — это список CMS-страниц, которые могут отображать объекты, поддерживаемые данным типом страницы. Например, для типа элемента **Blog Category** список страниц содержит страницы, использующие компонент `blogPosts`. Этот компонент может отображать содержимое категории блога. Элемент `cmsPages` должен быть массивом объектов `Cms\Classes\Page`.

Следующий метод `withComponent` найдёт все страницы, использующие компонент `blogPosts`, для активной темы.

```php
'cmsPages' => Page::withComponent('blogPosts')->all();
```

Используйте `whereComponent` для поиска всех страниц, использующих компонент `section`, где свойство `handle` установлено в **Your\Handle**.

```php
'cmsPages' => Page::whereComponent('section', 'handle', 'Your\Handle')->all();
```

Используйте `inTheme` для поиска страниц в другой теме, передав код темы.

```php
'cmsPages' => Page::inTheme('demo')->withComponent('blogPosts')->all();
```

### Разрешение ссылок страниц

Когда page finder генерирует ссылки, каждый элемент должен быть **разрешён** плагином, предоставляющим тип элемента. Процесс разрешения включает генерацию реального URL элемента, определение того, является ли элемент активным, и генерацию подэлементов (при необходимости).

Обработчик события `cms.pageLookup.resolveItem` разрешает информацию о странице и возвращает фактический URL элемента, заголовок, индикатор активности элемента и подэлементы, если есть. Обработчик события принимает четыре аргумента:

- `$type` — название типа элемента. Плагины должны обрабатывать только типы элементов, которые они предоставляют, и игнорировать другие типы.
- `$item` — объект элемента (`Cms\Models\PageLookupItem`). Объект элемента представляет конфигурацию элемента, предоставленную пользователем. Объект имеет следующие свойства: `title`, `type`, `reference`, `cmsPage`.
- `$url` — указывает текущий абсолютный URL в нижнем регистре. Всегда используйте хелпер `Url::to()` для генерации ссылок элементов и сравнения их с текущим URL.
- `$theme` — текущий объект темы (`Cms\Classes\Theme`).

Обработчик события должен проверить совпадение `type` и вернуть массив.

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    if ($type === 'blog-post') {
        return [...];
    }

    if ($item->type == 'all-blog-posts') {
        return [...];
    }
});
```

Элементы `url` и `isActive` обязательны для элементов, указывающих на конкретную страницу.

```php
return [
    'title' => 'Some Category',
    'url' => 'https://example.tld/blog/category/some-category',
    'isActive' => true
];
```

### Разрешение вложенных ссылок страниц

Также возможно, чтобы разрешённая ссылка страницы возвращала несколько элементов. Например, тип элемента **All Pages** не будет иметь конкретной страницы для указания, поскольку он может содержать несколько ссылок.

В этих случаях разрешитель запросит подэлементы, когда аргумент `$item` имеет свойство `nesting`, установленное в true.

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    // Resolve item
    $result = [...];

    // Subitems requested
    if ($item->nesting) {
        $result['items'] = [...];
    }

    return $result;
});
```

Элементы должны быть перечислены в элементе `items`. Элемент `items` должен предоставляться только для элементов, отмеченных как вложенные.

```php
return [
    'url' => 'https://example.tld/blog/category/another-category',
    'isActive' => true,
    'items' => [
        [
            'title' => 'Another category',
            'url' => 'https://example.tld/blog/category/another-category',
            'isActive' => true
        ],
        [
            'title' => 'News',
            'url' => 'https://example.tld/blog/category/news',
            'isActive' => false
        ]
    ]
];
```

### Разрешение ссылок других сайтов

Разрешённая ссылка страницы может возвращать другие сайты, содержащие эту ссылку. В этом случае аргумент `$item` может содержать свойство `sites`, установленное в true. Здесь полезны фасады `Site` и `Cms`, см. пример ниже.

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    // Resolve item
    $result = [...];

    $page = \Cms\Classes\Page::loadCached($theme, $item->reference);

    // Sites requested
    if ($item->sites) {
        $sites = [];
        if (Site::hasMultiSite()) {
            foreach (Site::listEnabled() as $site) {
                $url = Cms::siteUrl($page, $site, [
                    'id' => $record->id,
                    'slug' => $record->slug,
                    'fullslug' => $record->fullslug
                ]);

                $sites[] = [
                    'url' => $url,
                    'id' => $site->id,
                    'code' => $site->code,
                    'locale' => $site->hard_locale,
                ];
            }
        }
        $result['sites'] = $sites;
    }

    return $result;
});
```

Результирующий элемент должен содержать массив `sites` с объектом определения сайта, каждый с установленным `url`.

### Пример использования

Ниже приведён базовый пример разрешения URL страницы путём поиска модели и URL страницы с использованием класса `Cms\Classes\Controller` и метода `pageUrl`. Он также рекурсивно обрабатывает дочерние элементы с помощью отношения `children` модели, когда это запрошено через `$item->nesting`.

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    if ($type !== 'my-model') {
        return;
    }

    $model = MyModel::find($item->reference);
    if (!$model) {
        return;
    }

    $controller = new Controller($theme);

    $pageUrl = $controller->pageUrl($item->cmsPage, [
        'id' => $model->id,
        'slug' => $model->slug
    ]);

    $result = [
        'url' => $pageUrl,
        'isActive' => $pageUrl == $url,
        'title' => $model->title,
        'mtime' => $model->updated_at,
    ];

    if (!$item->nesting) {
        return $result;
    }

    $iterator = function($children) use (&$iterator, &$item, &$theme, $url, $controller, $model) {
        $branch = [];

        foreach ($children as $child) {
            $childUrl = $controller->pageUrl($item->cmsPage, [
                'id' => $model->id,
                'slug' => $model->slug
            ]);

            $childItem = [
                'url' => $childUrl,
                'isActive' => $childUrl == $url,
                'title' => $child->title,
                'mtime' => $child->updated_at,
            ];

            if ($child->children) {
                $childItem['items'] = $iterator($child->children);
            }

            $branch[] = $childItem;
        }

        return $branch;
    };

    $result['items'] = $iterator($model->children);

    return $result;
});
```

::: tip
Поскольку процесс разрешения выполняется каждый раз при рендеринге фронтенд-страницы, рекомендуется кэшировать всю информацию, необходимую для разрешения элементов, если это возможно.
:::
