---
subtitle: Twig Filter
---
# |link

The `|link` filter returns a link generated using the `october://` output schema of a [page finder form widget](../../element/form/widget-pagefinder.md). The result is a public URL to the page specified by the form widget.

```twig
<a href="{{ 'october://cms-page@link/about'|link }}" />
```

## link()

The complimentary `link()` function is used to extract more detailed information about a link.

```twig
{% set resolved = link('october://cms-page@link/about') %}

{{ resolved.url }}
```

The following properties can be expected in the resulting object.

Property | Data
------------- | -------------
**url** | the public URL to the page.
**mtime** | the modification time of the page link.
**title** | a human readible title for the link, optional.
**items** | an array containing generated child items, optional.
**isActive** | set to true if the link is currently active.

## PHP Interface

You may resolve links in PHP using the `Cms\Classes\PageLookup` class. The `url` method returns a string to the public URL.

```php
Cms\Classes\PageLookup::url('october://cms-page@link/about');
```

The `resolve` method returns a detailed `Cms\Models\PageLookupItem` object.

```php
$page = Cms\Classes\PageLookup::resolve('october://cms-page@link/about');

echo $page->url;
```
