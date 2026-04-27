---
subtitle: 用于处理多站点定义的工具
---
# 站点选择器（Site Picker）

`sitePicker` 组件提供了用于处理网站[多站点配置](../resources/multisite.md)的工具。最佳的放置位置是在您的页面或布局模板中。

## 基本用法

::: cmstemplate
```ini
[sitePicker]
```
```twig
{% set availableSites = sitePicker.sites %}
```
:::

以下是一个显示下拉菜单以在站点之间切换的示例。它与 `this.site` [Twig 属性](../../markup/property/this-site.md)配合使用。

```twig
<select class="form-control" onchange="window.location.assign(this.value)">
    {% for site in sitePicker.sites %}
        <option value="{{ site.url }}" {{ this.site.code == site.code ? 'selected' }}>
            {{ site.name }}
        </option>
    {% endfor %}
</select>
```

另一个示例是使用 meta 标签生成替代页面链接

```twig
{% for site in sitePicker.sites %}
    <link rel="alternate" hreflang="{{ site.locale }}" href="{{ site.url }}" />
{% endfor %}
```

## 加载不同页面的站点

默认情况下，`sites` 属性将返回为当前页面配置的站点，`url` 将解析为当前页面。`pageSites()` 函数可用于定位不同页面的站点，其中第一个参数为 CMS 页面名称。

在下面的示例中，每个站点的 `url` 将设置为在 **pages/blog/index.htm** 中找到的 CMS 页面。如果未找到该页面，则结果将为空数组。

::: cmstemplate
```ini
[sitePicker]
```
```twig
{% set otherSites = sitePicker.pageSites('blog/index') %}
```
:::

## 翻译 URL 参数

默认情况下，`sitePicker` 组件不感知 URL 中的模型参数，例如页面 slug 和标识符。`cms.sitePicker.overrideParams` [全局事件](../../extend/services/event.md)用于将 URL 参数覆盖为其翻译版本。放置此事件的好位置是在 [CMS 组件类](../../extend/cms-components.md)的 `init` 或 `onRun` 方法中。

例如，如果模型实现了 [`Multisite` trait](../../extend/database/traits.md)，则使用 `newOtherSiteQuery` 方法来定位目标站点的模型并修改 URL 参数。

```php
$myModel = MyModel::find(1);
$otherModels = $myModel->newOtherSiteQuery()->get();

Event::listen('cms.sitePicker.overrideParams', function($page, $params, $currentSite, $proposedSite) use ($otherModels) {
    $otherModel = $otherModels->where('site_id', $proposedSite->id)->first();
    if ($otherModel) {
        $params['id'] = $otherModel->id;
        $params['slug'] = $otherModel->slug;
        $params['fullslug'] = $otherModel->fullslug;
    }
    return $params;
});
```

#### 另请参阅

::: also
* [多站点](../resources/multisite.md)
:::
