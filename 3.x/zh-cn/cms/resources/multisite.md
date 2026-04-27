---
subtitle: 了解如何使用多站点翻译内容
---
# 多站点

<VideoBlockLink src="https://www.youtube.com/watch?v=_kX7P3SEHg8" title="Multisite Demo" description="This video demonstrates how to create multilingual sites with October CMS Multisite." prompt="Watch the demonstration" />

多站点功能允许您从单个 October CMS 安装中管理多个网站，并根据域名分配内容。例如，一个拥有不同国家/地区子站点的电子商务商店。您还可以使用它来管理本地化网站的翻译。

## 管理站点

您可以通过访问管理面板的 **设置 → 管理站点** 页面来创建站点。每个安装都包含一个主站点，作为每个请求的默认站点。

以下配置定义了每个站点：

- **启用** - 决定是否可以在前端和管理面板上访问该站点。
- **名称** - 指定站点名称。
- **唯一代码** - 指定用于通过 API 查找的唯一站点代码。
- **主题** - 当此站点处于活动状态时使用的 CMS 主题。
- **语言区域** - 用于此站点的应用程序语言区域。
- **时区** - 用于此站点的时区。
- **自定义应用程序 URL** - 当此站点处于活动状态时使用的 URL，用于邮件模板或链接策略强制使用 URL 等场景。
- **使用 CMS 路由前缀** - 定义在每个页面路由之前包含的前缀。在使用共享主机名时，它可以标识此站点。
- **定义匹配的主机名** - 使用特定的主机名匹配站点。出于安全原因，您应该为生产站点启用此选项。支持通配符值，例如：`*.mydomain.tld`。
- **为此站点显示颜色** - 启用后，在管理面板顶部显示横幅。用于标识活动站点或区分不同环境，例如，红色表示开发环境，绿色表示预发布环境，无颜色表示生产环境。

当您创建多个站点时，可以在管理面板中使用站点选择下拉菜单来选择每个站点。

## 站点选择器组件

`sitePicker` 组件允许您管理到其他站点的链接。最佳的包含位置是在您的页面或布局模板中。

::: cmstemplate
```ini
[sitePicker]
```
```twig
{% set availableSites = sitePicker.sites %}
```
:::

查看[站点选择器组件](../components/sitepicker.md)文章，了解如何显示站点 URL 和生成替代页面链接。

## 浏览器语言检测

当满足以下条件时，October CMS 会配置为根据浏览器的首选语言自动检测匹配的站点。

- 组中的所有站点都设置了前缀
- 没有其他站点匹配基础 URL

例如，如果主站点是 **English**，路由前缀为 `/en`，另一个站点 **French** 的前缀为 `/fr`，则可以观察到以下行为。

基础 URL | 行为
-------- | --------
https://yoursite.tld/en | 显示 **English** 站点
https://yoursite.tld/fr | 显示 **French** 站点
https://yoursite.tld | 根据语言偏好进行重定向

当用户访问基础 URL 时，系统会自动检测其首选语言并重定向到匹配的站点。匹配的站点基于其语言区域值，如果未找到匹配项，则使用主站点。

::: tip
您可以使用 **config/cms.php** 文件中的 `redirect_policy` 值来修改此行为。
:::

## 站点组

在初始状态下，多站点有助于使用单一语言创建多个网站，或使用多种语言创建单个网站。站点分组允许您进一步扩展此概念，创建具有多种语言的多个站点。通过导航到 **设置 → 管理站点 → 管理站点组** 创建站点组，创建组后，每个站点都会出现一个组选择字段。

实际上，每个站点组代表一个网站，属于该组的站点定义代表该站点的替代语言版本。以下示例显示了关于猫和狗的网站的分组站点配置，每个网站有两种语言。

站点组 | 站点名称
---------- | -----------
Dogs       | English
Dogs       | French
Cats       | English
Cats       | French

分组站点仅在其特定组内复制字段。例如，如果 [Tailor 蓝图](../tailor/introduction.md)使用 `multisite: sync` 选项，记录将仅在同一组中的站点之间同步。

## 角色限制

站点定义可以根据管理员角色限制其可见性，这允许您使用专用的管理员角色来管理特定站点。要启用多站点角色限制功能：

1. 导航到 **管理站点** 并选择一个站点定义
2. 勾选 **定义管理员角色** 复选框。
3. 选择允许查看该站点的角色。
4. 点击 **保存**。

启用后，该站点将仅在后端面板中对字段中指定的管理员可见。例如，要创建仅供开发人员访问的站点，请在字段中选择 **Developer** 角色。

## 多站点功能

有一些核心功能默认未启用多站点，例如邮件配置。您可以使用 **config/multisite.php** 文件中 `features` 部分选择性地启用多站点功能。以下功能键可用于多个站点定义。

功能 | 描述
------- | --------------------------
`cms_maintenance_setting` | 维护模式设置对每个站点是独立的
`backend_mail_setting` | 邮件设置对每个站点是独立的
`system_asset_combiner` | 资源合并器缓存键对每个站点是唯一的

### 禁用多站点

您可以通过将 `enabled` 配置设置为 `false` 值来完全禁用多站点功能。

```php
'enabled' => false
```

## PHP 接口

[站点服务](../../extend/services/site.md)包含全局 `Site` 门面，提供用于多站点操作的工具。例如，以下代码在 ID 为 **2** 的站点上下文中查找模型。

```php
$model = Site::withContext(2, function() {
    return Model::find(1);
});
```

阅读[站点服务文章](../../extend/services/site.md)了解更多信息。

#### 另请参阅

::: also
* [Multisite Features](https://octobercms.com/features/multisite)
* [Theme Localization](../themes/localization.md)
* [Site Picker Component](../components/sitepicker.md)
* [Multisite Trait](../../extend/database/traits.md)
* [Site Service](../../extend/services/site.md)
:::
