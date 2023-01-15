---
subtitle: Form Widget
---
# Page Finder

`pagefinder` - renders a field for selecting a page link. Expanding the field displays the picker to locate a page. The resulting selection is a string that contains the type and reference.

```yaml
featured_page:
    label: Featured Page
    type: pagefinder
```

The selected value is stored using the following format.

```
october://<TYPE>@link/<REFERENCE>?<PARAM>=<VALUE>
```

## Linking to Pages

Use the [`|link` Twig filter](../../markup/filter/link.md) to convert the page finder value to a URL.

```twig
{{ featured_page|link }}
```

Use the [`|content` Twig filter](../../markup/tag/content.md) to process HTML markup and replace all links within the content.

```twig
{{ blog_html|content }}
```

## Creating New Page Types

Plugins can extend the page finder with new page types using the various events. The most common place to subscribe to an event is the `boot` method of the plugin registration file.

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

### Registering New Page Types

The `cms.pageLookup.listTypes` event handler returns a list of pages types supported by the plugin The handler should return an associative array with the type codes in indexes and type names in values. It's highly recommended to use the plugin name in the type codes, to avoid conflicts with other page type providers. For example:

```php
Event::listen('cms.pageLookup.listTypes', function() {
    return [
        'blog-post' => 'Blog Post'
    ];
});
```

### Returning Information About a Page Type

The `cms.pageLookup.getTypeInfo` event handler returns detailed information about the supported page types. The handler gets a single parameter - the page type code (one of the codes you registered with the `cms.pageLookup.listTypes` handler). The handler code must check whether the requested item type code belongs to the plugin. The handler should return an associative array in the following format.

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

#### References

The `references` element is a list objects the page could refer to. For example, the **Blog Category** page type returns a list of the blog categories. Some object supports nesting, for example static pages. Other objects don't support nesting, for example the blog categories. The format of the `references` value depends on whether the references have subitems or not. The format for references without subitems is the following.

```php
'references' => [
    'item-key' => 'Item title'
]
```

The format for references with subitems is the following.

```php
'references' => [
    'item-key' => [
        'title' => 'Item title',
        'items' => [...]
    ]
]
```

The following iterator could be used to generate references where a model has children.

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

#### CMS Pages

The `cmsPages` is a list of CMS pages that can display objects supported by the page type. For example, for the **Blog Category** item type the page list contains pages that host the `blogPosts` component. That component can display a blog category contents. The `cmsPages` element should be an array of the `Cms\Classes\Page` objects.

The following `withComponent` method will find all pages that use the `blogPosts` component, for the active theme.

```php
'cmsPages' => Page::withComponent('blogPosts')->all();
```

Use `whereComponent` to find all pages using the `section` component where the property `entrySlug` is set to true.

```php
'cmsPages' => Page::whereComponent('section', 'entrySlug', true)->all();
```

Use `inTheme` to find pages in another theme by passing the theme code.

```php
'cmsPages' => Page::inTheme('demo')->withComponent('blogPosts')->all();
```

### Resolving Page Links

When the page finder generates links, every item should **resolved** by the plugin that supplies the item type. The process of resolving involves generating the real item URL, determining whether the item is active, and generating the subitems (if required).

The `cms.pageLookup.resolveItem` event handler resolves page information and returns the actual item URL, title, an indicator whether the item is currently active, and subitems, if any. The event handler takes four arguments:

- `$type` - the item type name. Plugins must only handle item types they provide and ignore other types.
- `$item` - the item object (`Cms\Models\PageLookupItem`). The item object represents the item configuration provided by the user. The object has the following properties: `title`, `type`, `reference`, `cmsPage`, `nesting`.
- `$url` - specifies the current absolute URL, in lower case. Always use the `Url::to()` helper to generate item links and compare them with the current URL.
- `$theme` - the current theme object (`Cms\Classes\Theme`).

The event handler should check for a matched `type` and return an array.

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    if ($type === 'blog-post') {
        return [...];
    }
});
```

The `url` and `isActive` elements are required for items that point to a specific page.

```php
return [
    'title' => 'Some Category',
    'url' => 'https://example.tld/blog/category/some-category',
    'isActive' => true,
];
```

It is also possible for a resolved page link to return multiple items. For example, an **All Pages** item type wouldn't have a specific page to point to since it can have multiple links. In these cases, the items should be listed in the `items` element, along with setting `nesting` to `true`.

```php
return [
    'url' => 'https://example.tld/blog/category/another-category',
    'isActive' => true,
    'nesting' => true,
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

#### Usage Example

The following is a basic example of resolving a page URL by looking up a model and page URL using the `Cms\Classes\Controller` class and `pageUrl` method.

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    if ($type !== 'my-model') {
        return;
    }

    $model = MyModel::find($item->reference);
    $controller = new Controller($theme);

    $url = $controller->pageUrl($item->cmsPage, [
        'id' => $model->id,
        'slug' => $model->slug
    ]);

    return [
        'title' => $model->title,
        'url' => $url
    ];
})
```

::: tip
As the resolving process occurs every time the frontend page is rendered, it is a good idea to cache all the information required for resolving items, if possible.
:::
