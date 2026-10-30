---
subtitle: Form Widget
shortname: Page Finder
---
# Page Finder Field

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

The following [field properties](../form-fields.md) are supported and commonly used.

Property | Description
------------- | -------------
**label** | a name when displaying the form field to the user.
**default** | specifies a default string value, optional.
**comment** | places a descriptive comment below the field.
**singleMode** | only allows items to be selected that resolve to a single URL. Default: `false`
**allowCustomUrl** | controls whether the free-form URL option appears in the type dropdown. Default: `true`
**allowedTypes** | an array of type codes to show in the type dropdown, acting as a whitelist. Default: `null`
**excludedTypes** | an array of type codes to hide from the type dropdown, acting as a blacklist. Default: `null`

::: tip
Resolve the `pagefinder` value in lists using the [linkage column type](../lists/column-linkage.md).
:::

## Linking to Pages

Use the [`|link` Twig filter](../../markup/filter/link.md) to convert the page finder value to a URL.

```twig
{{ featured_page|link }}
```

Use the [`|content` Twig filter](../../markup/tag/content.md) to process HTML markup and replace all links within the content.

```twig
{{ blog_html|content }}
```

## Filtering Page Types

By default the page finder shows all registered page types, including the URL type and any types registered by plugins and Tailor blueprints. Page types that have no available CMS pages are automatically hidden.

Use the `allowedTypes` property to restrict the type dropdown to specific types only. For example, to only allow CMS page selection.

```yaml
custom_page:
    label: Custom Page
    type: pagefinder
    allowedTypes:
        - cms-page
```

Use `excludedTypes` to hide specific types from the dropdown.

```yaml
custom_page:
    label: Custom Page
    type: pagefinder
    excludedTypes:
        - url
```

Set `allowCustomUrl` to `false` to remove the free-form URL option independently of the type filters.

```yaml
custom_page:
    label: Custom Page
    type: pagefinder
    allowCustomUrl: false
```

## Creating New Page Types

Plugins can extend the page finder with new page types by listening to three events. The following is a complete example that registers a **blog-post** page type, provides a list of selectable references and compatible CMS pages, and resolves the link URL at runtime.

```php
public function boot()
{
    // Register the page type
    Event::listen('cms.pageLookup.listTypes', function() {
        return [
            'blog-post' => 'Blog Post',
        ];
    });

    // Provide references and CMS pages for the type
    Event::listen('cms.pageLookup.getTypeInfo', function($type) {
        if ($type === 'blog-post') {
            return [
                'references' => BlogPost::lists('title', 'id'),
                'cmsPages' => Page::withComponent('blogPost')->all(),
            ];
        }
    });

    // Resolve item to a URL
    Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
        if ($type !== 'blog-post') {
            return;
        }

        $post = BlogPost::find($item->reference);
        if (!$post) {
            return;
        }

        $pageUrl = Cms::pageUrl($item->cmsPage, ['slug' => $post->slug]);

        return [
            'url' => $pageUrl,
            'isActive' => $pageUrl == $url,
            'title' => $post->title,
            'mtime' => $post->updated_at,
        ];
    });
}
```

::: tip
It's recommended to use the plugin name in the type codes (e.g. `blog-post` instead of `post`) to avoid conflicts with other providers.
:::

The following sections explain each event in detail.

### Registering Page Types

The `cms.pageLookup.listTypes` event returns an associative array of type codes and their labels.

```php
Event::listen('cms.pageLookup.listTypes', function() {
    return [
        'blog-post' => 'Blog Post',
    ];
});
```

For types that support nested subitems (e.g. linking to all blog posts at once), set `nesting` to `true`. These types are excluded when the page finder is set to `singleMode`.

```php
Event::listen('cms.pageLookup.listTypes', function() {
    return [
        'blog-post' => 'Blog Post',
        'blog-posts' => ['label' => 'All Blog Posts', 'nesting' => true],
    ];
});
```

::: tip
A legacy format `['All Blog Posts', true]` (numeric keys with a boolean last element) is also supported for backward compatibility.
:::

### Providing Type Information

The `cms.pageLookup.getTypeInfo` event returns the selectable references and compatible CMS pages for a given type. The handler should check the `$type` argument and only return data for types it owns.

```php
Event::listen('cms.pageLookup.getTypeInfo', function($type) {
    if ($type === 'blog-post') {
        return [
            'references' => BlogPost::lists('title', 'id'),
            'cmsPages' => Page::withComponent('blogPost')->all(),
        ];
    }
});
```

The `references` element is a list of selectable records, keyed by ID. The `cmsPages` element should be an array of `Cms\Classes\Page` objects that can display this type.

#### Finding CMS Pages

Use `withComponent` to find all pages that use a specific component.

```php
'cmsPages' => Page::withComponent('blogPost')->all()
```

Use `whereComponent` to match a component with a specific property value.

```php
'cmsPages' => Page::whereComponent('section', 'handle', 'Your\Handle')->all()
```

#### Nested References

For models with a tree structure, references can include subitems.

```php
'references' => [
    'item-key' => [
        'title' => 'Item title',
        'items' => [
            'child-key' => 'Child title',
        ]
    ]
]
```

### Resolving Page Links

The `cms.pageLookup.resolveItem` event resolves the stored reference to an actual URL. It fires each time a link is rendered on the frontend. The handler takes four arguments:

- `$type` - the item type name. Only handle types your plugin provides, return nothing for others.
- `$item` - the item object (`Cms\Models\PageLookupItem`) with properties: `type`, `reference`, `cmsPage`.
- `$url` - the current page URL (lowercase). Compare with generated URLs to set `isActive`.
- `$theme` - the current theme object (`Cms\Classes\Theme`).

The handler should return an array with the following keys.

Key | Description
--- | ---
**url** | The resolved public URL (required).
**isActive** | Whether the link matches the current page (required).
**title** | Display title override, optional.
**mtime** | Last modification time, optional.
**items** | Child items array, only when `$item->nesting` is true.
**sites** | Multi-site URL alternatives, only when `$item->sites` is true.

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    if ($type !== 'blog-post') {
        return;
    }

    $post = BlogPost::find($item->reference);
    if (!$post) {
        return;
    }

    $pageUrl = Cms::pageUrl($item->cmsPage, ['slug' => $post->slug]);

    return [
        'url' => $pageUrl,
        'isActive' => $pageUrl == $url,
        'title' => $post->title,
        'mtime' => $post->updated_at,
    ];
});
```

::: tip
The resolving process runs on every frontend page render, so cache the information required for resolving items if possible.
:::

#### Nested Items

For types registered with `nesting` support, the resolver should return child items when `$item->nesting` is true. Each child item uses the same keys (`url`, `isActive`, `title`, `mtime`) and may contain its own `items` for hierarchical structures.

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    if ($type !== 'all-blog-posts') {
        return;
    }

    $controller = new Controller($theme);
    $items = [];

    foreach (BlogPost::all() as $post) {
        $pageUrl = $controller->pageUrl($item->cmsPage, ['slug' => $post->slug]);

        $items[] = [
            'url' => $pageUrl,
            'isActive' => $pageUrl == $url,
            'title' => $post->title,
            'mtime' => $post->updated_at,
        ];
    }

    return [
        'items' => $items,
    ];
});
```

#### Multi-site Links

When `$item->sites` is true, the resolver can return alternative URLs for other sites using the `Cms` and `Site` facades.

```php
// Inside the resolveItem handler
if ($item->sites && Site::hasMultiSite()) {
    $page = Page::loadCached($theme, $item->cmsPage);
    $sites = [];

    foreach (Site::listEnabled() as $site) {
        $sites[] = [
            'url' => Cms::siteUrl($page, $site, ['slug' => $post->slug]),
            'id' => $site->id,
            'code' => $site->code,
            'locale' => $site->hard_locale,
        ];
    }

    $result['sites'] = $sites;
}

