---
subtitle: 列表列
shortname: Linkage
---
# Linkage 列

`linkage` 列显示指向指定页面的超链接。

```yaml
website:
    label: Website
    type: linkage
```

支持以下属性。

属性 | 描述
------------- | -------------
**linkText** | 为链接显示的文本，可选。
**linkUrl** | 提供 URL 而不是从记录值获取
**attributes** | 传递给锚元素的 HTML 属性数组。

使用 `attributes` 属性添加自定义 HTML 属性。

```yaml
website:
    label: Website
    type: linkage
    attributes:
        target: _blank
```

::: tip
`linkage` 列类型将自动解析[页面查找器链接值](../form/widget-pagefinder.md)。
:::

使用 `linkUrl` 和 `linkText` 显式提供 URL，可以是后端 URI 或完全限定的 URL。记录中的属性将自动解析。

```yaml
open_link:
    label: View
    type: linkage
    linkText: View Dashboard
    linkUrl: backend/index/:code/:id
```

## 自定义链接文本

默认情况下，值将是链接位置的 URL。例如，您可以通过从模型返回数组值来更改链接文本。

```php
['https://octobercms.com', 'October CMS']
```

在模型中，您可以使用属性修改器来提供这些值。以下在模型上创建一个新的 `website_link` 属性。

```php
public function getWebsiteLinkAttribute()
{
    return [$this->url, $this->name];
}
```

您可以使用 `displayFrom` 属性保持对数据库值的排序和搜索完整性。以下将使用 `website` 属性进行搜索和排序，并使用 `website_link` 属性显示链接。

```yaml
website:
    label: Website
    type: linkage
    displayFrom: website_link
```
