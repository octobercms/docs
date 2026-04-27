---
subtitle: 用于在管理面板中管理内容的菜单项。
---
# 定义导航

在后端区域，条目将列在"内容"菜单项下，全局则列在"设置"菜单项下（默认情况下）。您可以使用蓝图文件中的 **navigation** 属性来控制此行为。以下代码将设置图标并指定显示顺序。

```yaml
navigation:
    icon: icon-pencil
    order: 200
```

`navigation` 和 `primaryNavigation` 定义支持以下属性。

属性 | 描述
------------- | -------------
**label** | 指定菜单标签本地化字符串键，必填。
**order** | 确定显示顺序时的数值权重。
**parent** | 使用蓝图 handle 将导航项链接到父项。
**icon** | 来自 [October CMS 图标集合](../../element/available-icons.md)的图标名称，可选。
**iconSvg** | 用于替代标准图标的 SVG 图标，SVG 图标应为矩形且可支持颜色，可选。

要将项目放置在"设置"区域，请将 **parent** 设置为 `settings`。**category** 定义可以是字符串或设置常量引用，例如 `CATEGORY_COLLECTIONS`。

```yaml
navigation:
    parent: settings
    category: Collections
```

要将项目放置在"内容"区域，请将 **parent** 设置为 `content`。

```yaml
navigation:
    parent: content
```

要将项目放置为主导航项，需要 **primaryNavigation** 定义。

```yaml
primaryNavigation:
    label: Blog
    icon: icon-copy
    order: 500

navigation:
    label: Main Menu Item
```

要将项目放置为二级导航项，**parent** 属性应指定主导航项的 UUID 或 handle。

```yaml
navigation:
    parent: <handle|uuid>
```

要禁用二级导航，请为单个蓝图定义 **primaryNavigation**，而不使其成为任何其他蓝图的父级。

```yaml
primaryNavigation:
    label: Page
    icon: icon-magic
    order: 500
```

您也可以通过将 **navigation** 属性设置为 `false` 来完全禁用导航。

```yaml
navigation: false
```

## 额外导航

使用 `extraNavigation` 属性来注册要包含在蓝图中的自定义导航项。该值是一个数组，匹配[后端导航规范](../../extend/backend/navigation.md)中的 `sideMenu` 定义。以下示例使用自定义显示类型包含两个部分和分隔线，`order` 属性用于按正确顺序排列项目。

```yaml
navigation:
    label: Authors
    parent: Blog\Post
    icon: icon-user
    order: 230

extraNavigation:
    _authors_section:
        itemType: section
        label: Authors
        order: 210

    _authors_ruler:
        itemType: ruler
        order: 220
```

您还可以通过指定 `url` 属性来注册指向[插件引入的控制器](../../extend/system/controllers.md)的链接。此属性应设置为控制器 URL，以下链接到 **acme/blog/posts** 控制器。

```yaml
navigation:
    label: Authors
    # ...

extraNavigation:
    testimonials:
        label: Testimonials
        order: 210
        icon: icon-group
        url: acme/blog/posts
```

要在控制器内设置导航上下文，请在 `BackendMenu` 门面上使用 `setTailorContext` 方法。您也可以使用 `setTailorContextUuid` 方法指定蓝图 `uuid`。该方法接受蓝图的 `handle` 或 `uuid`（第一个参数）以及额外导航项使用的键（第二个参数）。

```php
BackendMenu::setTailorContext('Blog\Post', 'testimonials');

BackendMenu::setTailorContextUuid('edcd102e-0525-4e4d-b07e-633ae6c18db6', 'testimonials');
```

#### 另请参阅

::: also
* [后端导航](../../extend/backend/navigation.md)
:::
