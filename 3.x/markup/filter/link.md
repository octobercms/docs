---
subtitle: Twig Filter
---
# |link

The `|link` filter returns a link generated using the `october://` output schema of a [page finder form widget](../../element/form/widget-pagefinder.md). The result is a public URL to the page specified by the form widget.

```twig
<a href="{{ 'october://cms-page@link/about'|link }}" />
```

::: tip
If you are looking to parse HTML for multiple links and resolve them as HTTP links in the output, see the [`|content` Twig filter](../tag/content.md).
:::

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
**title** | a human readable title for the link, optional.
**items** | an array containing generated child items, optional.
**isActive** | set to true if the link is currently active.

You may request nested child items by passing the `nesting` option to `true` (second argument), which populates the `items` property on the result.

```twig
{% set resolved = link('october://...', { nesting: true }) %}

{% for subitem in resolved.items %}
    {{ subitem.url }}
{% endfor %}
```

You may request other site URLs by passing the `sites` option to `true`, which populates the `sites` property on the result.

```twig
{% set resolved = link('october://...', { sites: true }) %}

{% for site in resolved.sites %}
    {{ site.url }}
{% endfor %}
```

## PHP Interface

You may resolve links in PHP using the `Cms\Classes\PageManager` class. The `url` method returns a string to the public URL.

```php
Cms\Classes\PageManager::url('october://cms-page@link/about');
```

The `resolve` method returns a detailed `Cms\Models\PageLookupItem` object.

```php
$page = Cms\Classes\PageManager::resolve('october://cms-page@link/about');

echo $page->url;
```

#### See Also

::: also
* [Page Finder Form Widget](../../element/form/widget-pagefinder.md)
:::
