---
subtitle: 了解如何在后台面板中添加新的菜单项。
---
# 导航

插件可以通过在[插件注册文件](../extending.md)中覆盖 `registerNavigation` 方法来扩展后台导航菜单。本节展示如何向后台导航区域添加菜单项。以下是注册一个顶级导航菜单项和两个子菜单项的示例。

```php
public function registerNavigation()
{
    return [
        'blog' => [
            'label' => 'Blog',
            'url' => Backend::url('acme/blog/posts'),
            'icon' => 'icon-pencil',
            'permissions' => ['acme.blog.*'],
            'order' => 500,

            'sideMenu' => [
                'posts' => [
                    'label' => 'Posts',
                    'icon' => 'icon-copy',
                    'url' => Backend::url('acme/blog/posts'),
                    'permissions' => ['acme.blog.access_posts'],
                ],
                'categories' => [
                    'label' => 'Categories',
                    'icon' => 'icon-copy',
                    'url' => Backend::url('acme/blog/categories'),
                    'permissions' => ['acme.blog.access_categories'],
                ]
            ]
        ]
    ];
}
```

注册后台导航时，您可以为 `label` 值使用[本地化字符串](../system/localization.md)。后台导航也可以通过 `permissions` 值进行控制，并对应已定义的[后台用户权限](./permissions.md)。后台导航在整体导航菜单项中的显示顺序由 `order` 值控制。较高的数字意味着该项目将在菜单项顺序中更靠后显示，而较低的数字意味着它将更靠前显示。

要使子菜单项可见，您可以使用 `BackendMenu::setContext` 方法在[后台控制器](../system/controllers.md)中设置导航上下文。这将使父菜单项变为活动状态，并在侧边菜单中显示子项。

属性 | 描述
------------- | -------------
**label** | 指定菜单标签本地化字符串键，必需。
**order** | 确定显示顺序时的数值权重。
**icon** | [October CMS 图标集合](../../element/available-icons.md)中的图标名称，可选。
**iconSvg** | 用于替代标准图标的 SVG 图标，SVG 图标应为矩形且可支持颜色，可选。
**url** | 菜单项应指向的 URL（例如 `Backend::url('author/plugin/controller/action')`），必需。
**counter** | 在菜单图标旁输出的数值。该值应为数字或返回数字的可调用对象，可选。
**counterLabel** | 描述 counter 中数值引用的字符串值，可选。
**attributes** | 应用于菜单项的属性和值的关联数组，可选。
**permissions** | 后台用户查看菜单项所需的权限数组（注意：直接访问 URL 仍需要单独的权限检查），可选。
**sideMenu** | 与父菜单项共享相同配置的子菜单项数组，可选。
**itemType** | 指定项目的显示类型，仅限子菜单项。支持的值：`primary`、`link`、`ruler`、`section`。默认值：`link`。

以下是系统生成的值，在注册导航项时不提供。

键 | 描述
------------- | -------------
**code** | 作为该菜单选项唯一标识符的字符串值。
**owner** | 以 "Author.Plugin" 格式指定菜单项所属插件或模块的字符串值。

## 导航计数器

导航项支持指定计数器以表示有需要注意的项目。这些属性对父菜单项和子菜单项都可用。使用 **counter** 和 **counterLabel** 显示数字计数器。

```php
'blog' => [
    // ...
    'counter' => [\Author\Plugin\Classes\MyMenuCounterService::class, 'getCounterMethod'],
    'counterLabel' => 'Label describing a dynamic menu counter',
],
```

## 项目显示类型

子菜单项支持使用 `itemType` 属性设置不同的显示类型，包括用户界面元素。将类型设置为 `section` 可显示导航分区。在键名前添加下划线（`_`）是表明它是 UI 元素的好方法。

```php
'_section1' => [
    'itemType' => 'section',
    'label' => 'Advanced',
],
```

将分区与其上方的导航分隔线结合使用可能很有用。将类型设置为 `ruler` 可显示分隔线。

```php
'_ruler1' => [
    'itemType' => 'ruler',
],
```

要显示行动号召，将类型设置为 `primary` 可将链接显示为主按钮。

```php
'people_create' => [
    'label' => 'New Person',
    'icon' => 'icon-plus',
    'url' => Backend::url('acme/blog/people/create'),
    'itemType' => 'primary',
],
```

## 扩展后台菜单

`backend.menu.extendItems` [事件监听器](../extending.md)可用于在系统和插件注册导航项后修改现有的导航项。事件返回一个导航 `$manager` 实例，支持以下方法。

方法 | 描述
------------- | -------------
**addMainMenuItems($owner, $definitions)** | 添加或更新主菜单定义
**getMainMenuItem($owner, $code)** | 获取现有主菜单定义
**removeMainMenuItem($owner, $code)** | 删除现有主菜单定义
**addSideMenuItems($owner, $code, $definitions)** | 添加或更新侧边菜单定义
**getSideMenuItem($owner, $code, $sideCode)** | 获取现有侧边菜单定义
**removeSideMenuItem($owner, $code, $sideCode)** | 删除现有侧边菜单定义

获取菜单项时，对象支持方法链以更新其属性。以下示例将编辑器的标签替换为 **Code Editor**。

```php
Event::listen('backend.menu.extendItems', function($manager) {
    $manager->getMainMenuItem('October.Editor', 'editor')->label('Code Editor');
});
```

下一个示例将 Acme Blog 插件的标签更改为 **News** 并添加 **9** 计数器。

```php
Event::listen('backend.menu.extendItems', function($manager) {
    $manager->getMainMenuItem('Acme.Blog', 'blog')
        ->getSideMenuItem('posts')
        ->label('News')
        ->counter(9);
});
```

同样，我们可以使用相同的事件移除菜单项。以下示例将分别移除所有项、移除单个项和移除多个项。

```php
Event::listen('backend.menu.extendItems', function($manager) {
    $manager->removeMainMenuItem('Acme.Blog', 'blog');

    $manager->removeSideMenuItem('Acme.Blog', 'blog', 'posts');

    $manager->removeSideMenuItems('Acme.Blog', 'blog', [
        'posts',
        'categories'
    ]);
});
```
