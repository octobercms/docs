# 站点管理器

### 介绍

October CMS 包含全局 `Site` 门面，为处理[多站点实现](../../cms/resources/multisite.md)提供工具。所有可选的多站点功能都通过配置文件 **config/multisite.php** 启用或禁用。

```php
'features' => [
    'cms_maintenance_setting' => false,
    // ...
]
```

`hasFeature` 用于检查特定的多站点功能是否已启用。

```php
$useMultisite = Site::hasFeature('cms_maintenance_setting');
```

## 检查站点配置状态

使用 `hasAnySite` 检查是否有任何已启用的站点可用。

```php
if (Site::hasAnySite()) {
    // ...
}
```

`hasMultiSite` 将在有多个站点定义可用时返回 true。

```php
if (Site::hasMultiSite()) {
    // ...
}
```

`hasSiteGroups` 将在多个站点定义使用分组定义时返回 true。

```php
if (Site::hasSiteGroups()) {
    // ...
}
```

## 获取站点

请求站点将返回一个 `System\Models\SiteDefinition` 实例，其可用属性从缓存驱动或数据库加载。

`getPrimarySite` 方法返回主站点定义，用作所有场景的后备。

```php
$site = Site::getPrimarySite();
```

前端主题有一个选定的站点，用于渲染 CMS 页面，`getActiveSite` 站点将返回此站点。

```php
$site = Site::getActiveSite();
```

同样，管理面板可以选择一个站点，可以使用 `getEditSite` 方法获取。

```php
$site = Site::getEditSite();
```

要通过其唯一 ID 查找站点，请使用 `getSiteFromId` 并传入标识符。

```php
$siteFour = Site::getSiteFromId(4);
```

要使用其区域设置代码查找站点，请使用 `getSiteForLocale` 并传入所需的区域设置。

```php
$frenchSite = Site::getSiteForLocale('fr');
```

## 访问多个站点

如果返回多个站点，将以 `October\Rain\Database\Collection` 对象的已填充实例形式返回。

使用 `listSites` 方法列出所有站点，包括已禁用的站点。

```php
$sites = Site::listSites();
```
使用 `listEnabled` 方法仅列出已启用的站点。

```php
$sites = Site::listEnabled();
```

使用 `listEditEnabled` 列出管理面板中启用的站点。

```php
$sites = Site::listEditEnabled();
```

## 站点上下文

站点上下文用于确定活动站点，这将自动限制对该站点的查询。在某些情况下，使用全局状态允许跨所有状态访问数据。

使用 `withContext` 将上下文更改为不同的站点，传入所需站点的 ID。

```php
Site::withContext(2, function() {
    // 站点 2 的模型现在可用。
});
```

使用 `withGlobalContext` 并传入一个闭包来激活全局上下文。

```php
Site::withGlobalContext(function() {
    // 所有模型在此处可用。
});
```

使用 `hasGlobalContext` 方法检查全局状态是否当前已激活。

```php
$global = Site::hasGlobalContext();
```

#### 参见

::: also
* [多站点](../../cms/resources/multisite.md)
* [多站点 Trait](../database/traits.md)
:::
