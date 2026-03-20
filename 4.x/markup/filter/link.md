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

::: warning
The `|link` filter only returns the URL string. If you need to access nested child items from dynamic page types (like "All Blog Posts" or "All Categories"), use the `link()` function with the `nesting` option instead.
:::

## Supplying URL Parameters

You may pass URL parameters to the `|link` filter to supply values for the target page's URL pattern. This is useful when the stored link reference doesn't contain the parameter values needed to build the URL.

```twig
{{ product.custom_page|link({ slug: product.slug, id: product.id }) }}
```

For example, if the selected CMS page has the URL pattern `/shop/product/:slug/:id`, the above will produce a URL like `/shop/product/my-product/42`.

## link()

The `link()` function is used to extract more detailed information about a link, including dynamically generated child items.

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

### Nested Items

You may request nested child items by passing the `nesting` option to `true` (second argument), which populates the `items` property on the result. This is essential when working with dynamic page types that generate multiple items, such as "All Blog Posts" or "All Categories".

```twig
{% set resolved = link('october://...', { nesting: true }) %}

{% for subitem in resolved.items %}
    <a href="{{ subitem.url }}">{{ subitem.title }}</a>
{% endfor %}
```

Each child item in the `items` array contains the same properties: `url`, `title`, `mtime`, `isActive`, and potentially nested `items` of its own for hierarchical structures.

#### Replacing Parent with Children

When building menus with dynamic page types, you may want to replace a menu item with its generated children. This can be achieved by checking a stored flag and iterating the resolved items.

```twig
{% for item in menu.items %}
    {% set resolved = link(item.reference, { nesting: item.nesting }) %}

    {% if item.replace and resolved.items %}
        {# Replace parent with its generated children #}
        {% for child in resolved.items %}
            <a href="{{ child.url }}">{{ child.title }}</a>
        {% endfor %}
    {% else %}
        <a href="{{ resolved.url }}">{{ item.title }}</a>
        {% if resolved.items %}
            <ul>
                {% for child in resolved.items %}
                    <li><a href="{{ child.url }}">{{ child.title }}</a></li>
                {% endfor %}
            </ul>
        {% endif %}
    {% endif %}
{% endfor %}
```

You may request other site URLs by passing the `sites` option to `true`, which populates the `sites` property on the result.

```twig
{% set resolved = link('october://...', { sites: true }) %}

{% for site in resolved.sites %}
    {{ site.url }}
{% endfor %}
```

### URL Parameters

You may supply URL parameters using the `params` option. This is useful when combining parameter resolution with other options like `nesting` or `sites`.

```twig
{% set resolved = link(product.custom_page, {
    params: { slug: product.slug, id: product.id }
}) %}
```

::: tip
When you only need the URL string and don't need options like `nesting` or `sites`, the `|link` filter provides a simpler syntax for passing URL parameters. See [Supplying URL Parameters](#supplying-url-parameters) above.
:::

## PHP Interface

You may resolve links in PHP using the `Cms\Classes\PageManager` class. The `url` method returns a string to the public URL.

```php
Cms\Classes\PageManager::url('october://cms-page@link/about');
```

You may pass URL parameters as the second argument to supply values for the target page's URL pattern.

```php
Cms\Classes\PageManager::url($model->custom_page, [
    'slug' => $model->slug,
    'id' => $model->id
]);
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
