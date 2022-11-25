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

The resulting schema values may look like this.

```
october://blog-post@link/2?cms_page=blog/post
```

## Linking to Pages

Use the `|link` [Twig filter](../../markup/filter/link.md) to convert the page finder value to a URL.

```twig
{{ featured_page|link }}
```

::: tip
View the [Link filter article](../../markup/filter/link.md) to learn more.
:::

## Creating New Page Types

Plugins can extend the page finder with new page types using the following events.

- `cms.pageLookup.listTypes` event handler should return a list of pages types supported by the plugin.
- `cms.pageLookup.getTypeInfo` event handler returns detailed information about a page type.
- `cms.pageLookup.resolveItem` event handler "resolves" page information and returns the actual item URL, title, an indicator whether the item is currently active, and subitems, if any.

The next example shows an event handler registration code in the `boot` method of a plugin. This example shows how a blog post plugin may contribute links by definiting its types and offloading logic to the `Post` model.

```php
public function boot()
{
    Event::listen('cms.pageLookup.listTypes', function() {
        return [
            'blog-post' => 'Blog Post'
        ];
    });

    Event::listen('cms.pageLookup.getTypeInfo', function($type) {
        if ($type == 'blog-post') {
            return Post::getMenuTypeInfo($type);
        }
    });

    Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
        if ($type == 'blog-post') {
            return Post::resolveMenuItem($item, $url, $theme);
        }
    });
}
```

### Registering New Page Types

New page types are registered with the `cms.pageLookup.listTypes` event handlers. The handler should return an associative array with the type codes in indexes and type names in values. It's highly recommended to use the plugin name in the type codes, to avoid conflicts with other page type providers. For example:

```php
return [
    'my-plugin-item-type' => 'My Plugin Menu Item Type'
];
```

### Returning Information About a Page Type

Plugins should provide detailed information about the supported page types with the `cms.pageLookup.getTypeInfo` event handlers. The handler gets a single parameter - the page type code (one of the codes you registered with the `cms.pageLookup.listTypes` handler). The handler code must check whether the requested item type code belongs to the plugin. The handler should return an associative array in the following format.

```php
return [
    'references' => [
        11 => 'News',
        12 => 'Tutorials',
        13 => 'Philosophy',
    ],
    'cmsPages' => [...]
]
```

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

The `cmsPages` is a list of CMS pages that can display objects supported by the page type. For example, for the **Blog Category** item type the page list contains pages that host the `blogPosts` component. That component can display a blog category contents. The `cmsPages` element should be an array of the `Cms\Classes\Page` objects.

The following `withComponent` method will find all pages that use the `blogPosts` component, for the active theme.

```php
'cmsPages' => Page::withComponent('blogPosts')->get();
```

Use `whereComponent` to find all pages using the `section` component where the property `entrySlug` is set to true.

```php
'cmsPages' => Page::whereComponent('section', 'entrySlug', true)->get();
```

Use `inTheme` to find pages in another theme by passing the theme code.

```php
'cmsPages' => Page::inTheme('demo')->withComponent('blogPosts')->get();
```

##### Resolving Page Links

When the page finder generates links, every item should **resolved** by the plugin that supplies the item type. The process of resolving involves generating the real item URL, determining whether the item is active, and generating the subitems (if required). Plugins should register the `cms.pageLookup.resolveItem` event handler in order to resolve items. The event handler takes four arguments:

- `$type` - the item type name. Plugins must only handle item types they provide and ignore other types.
- `$item` - the item object (`Cms\Models\PageLookupItem`). The item object represents the item configuration provided by the user. The object has the following properties: `title`, `type`, `reference`, `cmsPage`.
- `$url` - specifies the current absolute URL, in lower case. Always use the `Url::to()` helper to generate item links and compare them with the current URL.
- `$theme` - the current theme object (`Cms\Classes\Theme`).

The event handler should return an array.

```php
return [
    'title' => 'Some Category',
    'url' => 'https://example.tld/blog/category/some-category',
    'isActive' => true,
]
```

The `items` array key determines if the item contains subitems.

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

The `url` and `isActive` elements are required for items that point to a specific page, but it's not always the case. For example, an **All Pages** item type wouldn't have a specific page to point to since it generates multiple items. In this case, the items should be listed in the `items` element.

::: tip
As the resolving process occurs every time when the front-end page is rendered, it's a good idea to cache all the information required for resolving items, if that's possible.
:::
