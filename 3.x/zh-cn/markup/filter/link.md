---
subtitle: Twig 过滤器
---
# |link

`|link` 过滤器使用[页面查找器表单小部件](../../element/form/widget-pagefinder.md)的 `october://` 输出模式返回生成的链接。结果是表单小部件指定的页面的公共 URL。

```twig
<a href="{{ 'october://cms-page@link/about'|link }}" />
```

::: tip
如果您想解析 HTML 中的多个链接并将其在输出中解析为 HTTP 链接，请参阅 [`|content` Twig 过滤器](../tag/content.md)。
:::

## link()

配套的 `link()` 函数用于提取链接的更多详细信息。

```twig
{% set resolved = link('october://cms-page@link/about') %}

{{ resolved.url }}
```

结果对象中可以包含以下属性。

Property | Data
------------- | -------------
**url** | 页面的公共 URL。
**mtime** | 页面链接的修改时间。
**title** | 链接的可读标题，可选。
**items** | 包含生成的子项目的数组，可选。
**isActive** | 如果链接当前处于活动状态，则设置为 true。

您可以通过将 `nesting` 选项设置为 `true`（第二个参数）来请求嵌套子项目，这将填充结果中的 `items` 属性。

```twig
{% set resolved = link('october://...', { nesting: true }) %}

{% for subitem in resolved.items %}
    {{ subitem.url }}
{% endfor %}
```

您可以通过将 `sites` 选项设置为 `true` 来请求其他站点 URL，这将填充结果中的 `sites` 属性。

```twig
{% set resolved = link('october://...', { sites: true }) %}

{% for site in resolved.sites %}
    {{ site.url }}
{% endfor %}
```

## PHP 接口

您可以在 PHP 中使用 `Cms\Classes\PageManager` 类来解析链接。`url` 方法返回公共 URL 的字符串。

```php
Cms\Classes\PageManager::url('october://cms-page@link/about');
```

`resolve` 方法返回一个详细的 `Cms\Models\PageLookupItem` 对象。

```php
$page = Cms\Classes\PageManager::resolve('october://cms-page@link/about');

echo $page->url;
```

#### 参见

::: also
* [页面查找器表单小部件](../../element/form/widget-pagefinder.md)
:::
