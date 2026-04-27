# 介绍

插件可以通过两种主要方式配置系统。首先决定哪种选项最适合您的需求是一个好主意。

- [基于文件的配置](./file-settings.md)，没有用户界面，存储在文件系统中。
- [基于模型的设置](./model-settings.md)，带有可选的用户界面，存储在数据库中。

使用带有后台页面的基于模型的设置可以提供更好的用户体验，但在初始开发时需要更多开销。基于文件的配置适用于很少修改且没有界面的配置，例如策略配置。

## 设置页面注册

使用基于模型的设置时，您可以选择将其注册到专门管理设置和配置的区域，通过点击主菜单中的 **Settings** 链接访问。

设置页面必须通过在[插件注册文件](../extending.md)中覆盖 `registerSettings` 方法来注册。该方法返回一个数组，每个设置项的键和值配置出现在设置区域中的设置模型或控制器。以下是注册设置模型的示例。

```php
public function registerSettings()
{
    return [
        'settings' => [
            'label' => 'User Settings',
            'description' => 'Manage user based settings.',
            'category' => 'CATEGORY_USERS',
            'icon' => 'icon-cog',
            'class' => \Acme\User\Models\UserSetting::class,
        ]
    ];
}
```

### 设置属性

注册设置时，每个键可使用以下属性。

属性 | 描述
------------- | -------------
**label** | 指定菜单标签本地化字符串键，必需。
**category** | 指定类别标签本地化字符串键，用于将设置页面分组，必需。
**keywords** | 指定用于搜索设置的关键词。
**order** | 确定显示顺序时的数值权重。
**icon** | [October CMS 图标集合](../../element/available-icons.md)中的图标名称，可选。
**iconSvg** | 用于替代标准图标的 SVG 图标，SVG 图标应为矩形且可支持颜色，可选。
**url** | 菜单项应引用的后台 URL，例如 `Backend::url('author/plugin/controller/action')`。
**class** | 设置项应引用的模型类，例如 `Acme\User\Models\UserSetting::class`。
**permissions** | 后台用户查看菜单项所需的权限数组（注意：直接访问 URL 仍需要单独的权限检查），可选。
**context** | 指定设置项的放置位置，可选 `system` 或 `mysettings`。默认值：`system`。
**size** | 与 `class` 定义一起使用时的设置表单大小。支持的值：`tiny`、`small`、`medium`、`large`、`huge`、`giant`、`adaptive`。默认值：`large`。

为了与其他插件互操作，`category` 属性可使用以下通用常量。

<div class="content-list" markdown="1">

- CATEGORY_CMS
- CATEGORY_MISC
- CATEGORY_MAIL
- CATEGORY_LOGS
- CATEGORY_SHOP
- CATEGORY_TEAM
- CATEGORY_USERS
- CATEGORY_SOCIAL
- CATEGORY_SYSTEM
- CATEGORY_EVENTS
- CATEGORY_BACKEND
- CATEGORY_CUSTOMERS
- CATEGORY_MYSETTINGS
- CATEGORY_NOTIFICATIONS
- CATEGORY_GLOBALS
- CATEGORY_COLLECTIONS

</div>

可选的 `keywords` 参数由设置搜索功能使用。如果未提供关键词，搜索仅使用设置项标签和描述。

## 链接到模型类

在设置属性中指定模型 `class` 进行链接时，您不需要构建自己的控制器，这对于大多数情况都很有用。以下示例创建了一个到设置模型的链接，在[模型设置文章](./model-settings.md)中有更多描述。

```php
public function registerSettings()
{
    return [
        'settings' => [
            'label' => 'User Settings',
            'description' => 'Manage user based settings.',
            'category' => 'Users',
            'icon' => 'icon-cog',
            'class' => \Acme\User\Models\UserSetting::class,
            'order' => 500,
            'keywords' => 'security location',
            'permissions' => ['acme.users.access_settings']
        ]
    ];
}
```

表单使用通用后台控制器，具有基本功能如保存和将值重置为默认值。活动导航会自动配置。定义的权限也由控制器强制执行。

## 链接到控制器类

在设置属性中指定页面 `url` 时，您可以选择构建自己的控制器并将其链接到设置区域。以下示例展示了如何创建到后台页面的链接。

```php
public function registerSettings()
{
    return [
        'location' => [
            'label' => 'Locations',
            'description' => 'Manage available user countries and states.',
            'category' => 'Users',
            'icon' => 'icon-globe',
            'url' => Backend::url('acme/user/locations'),
            'order' => 500,
            'keywords' => 'geography place placement'
        ]
    ];
}
```

### 设置页面类定义

设置页面控制器可以是任何[后台控制器](../system/controllers.md)，但为了简化，您可以继承 `Backend\Classes\SettingsController` 基类。此类会在控制器中自动注册设置导航上下文。您只需在 `$settingsItemCode` 属性中提供设置代码，用于确定活动菜单项。

```php
namespace Acme\Blog\Controllers;

class Posts extends \Backend\Classes\SettingsController
{
    public $settingsItemCode = 'location';

    public function index() {}
}
```

#### 另请参阅

::: also
* [后台控制器](../system/controllers.md)
:::
