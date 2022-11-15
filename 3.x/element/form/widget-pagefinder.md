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

The resulting schema value looks like this:

```
october://cms-page?reference=about
```

### Creating New Page Types

Plugins can extend the page finder with new page types.

- `cms.pageFinder.listTypes` event handler should return a list of pages types supported by the plugin.
- `cms.pageFinder.getTypeInfo` event handler returns detailed information about a page type.
- `cms.pageFinder.resolveItem` event handler "resolves" page information and returns the actual item URL, title, an indicator whether the item is currently active, and subitems, if any.

The next example shows an event handler registration code for the Blog plugin. The Blog plugin registers two item types. As you can see, the Blog plugin uses the Category class to handle the events. That's a recommended approach.

```php
public function boot()
{
    Event::listen('cms.pageFinder.listTypes', function() {
        return [
            'blog-post' => 'Blog Post',
            'blog-category' => 'Blog Category',
        ];
    });

    Event::listen('cms.pageFinder.getTypeInfo', function($type) {
        if ($type == 'blog-post') {
            return Post::getMenuTypeInfo($type);
        }
    });

    Event::listen('cms.pageFinder.resolveItem', function($type, $item, $url, $theme) {
        if ($type == 'blog-post') {
            return Post::resolveMenuItem($item, $url, $theme);
        }
    });
}
```
