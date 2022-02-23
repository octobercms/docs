# 设置和配置

有两种配置插件的方法 - 使用后端设置表单和配置文件。将数据库设置与后端页面一起使用可提供更好的用户体验，但它们会为初始开发带来更多开销。基于文件的配置适用于很少修改的配置。

<a id="oc-database-settings"></a>
## 数据库设置

您可以通过在模型类中实现`SettingsModel`行为来创建用于在数据库中存储设置的模型。此模型可直接用于创建后端设置表单。您不需要创建数据库表和控制器。

设置模型类应该扩展模型类并实现 `\System\Behaviors\SettingsModel` 行为。设置模型像其他任何模型一样，应该在插件目录的 **models** 子目录中定义。下一个示例中的模型应该在`plugins/acme/demo/models/Settings.php` 脚本中定义。
```php
<?php namespace Acme\Demo\Models;

use Model;

class Settings extends Model
{
    public $implement = [\System\Behaviors\SettingsModel::class];

    // 独一无二的标识符
    public $settingsCode = 'acme_demo_settings';

    // 参考字段配置
    public $settingsFields = 'fields.yaml';
}
```

设置模型需要 `$settingsCode` 属性。 它定义了用于将设置保存到数据库的唯一设置键。

如果要基于模型构建后端设置表单，则需要 `$settingsFields` 属性。 该属性指定包含表单字段定义的 YAML 文件的名称。 [后端表单](../backend/forms.md) 文章中描述了表单字段。 YAML 文件应放在名称与模型类名称匹配的小写目录中。 对于上一个示例中的模型，目录结构如下所示：

```
plugins/
    acme/
    demo/
        models/
        settings/        <=== 文件目录
            fields.yaml  <=== 表单文件
        Settings.php     <=== 脚本
```

设置模型[可以注册](#oc-backend-settings-pages) 出现在**后端设置页面**，但这不是必需的 - 您可以像任何其他模型一样设置和读取设置值。

### 写入设置模型

设置模型具有静态`set` 方法，允许保存单个或多个值。 您还可以使用标准模型功能来设置模型属性和保存模型。

```php
use Acme\Demo\Models\Settings;

// 设置单个值
Settings::set('api_key', 'ABCD');

// 设置一组值
Settings::set(['api_key' => 'ABCD']);

// 设置对象值
$settings = Settings::instance();
$settings->api_key = 'ABCD';
$settings->save();
```

### 从设置模型中读取

设置模型具有静态`get` 方法，使您能够加载单个属性。 此外，当您使用 `instance` 方法实例化模型时，它会从数据库加载属性，您可以直接访问它们。

```php
// 输出：ABCD
echo Settings::instance()->api_key;

// 获取单个值
echo Settings::get('api_key');

// 获取一个值，如果不存在则返回一个默认值
echo Settings::get('is_activated', true);
```

<a id="oc-backend-settings-pages"></a>
## 后端设置页面

后端包含用于系统和和插件配置的专用区域，可以通过单击主菜单中的<strong>设置</strong>链接进行访问

<a id="oc-settings-link-registration"></a>
### 设置链接注册

可以通过覆盖[插件注册类](registration.md#oc-registration-file)中的`registerSettings`方法来扩展后端设置导航链接。 创建配置链接时，您有两个选项 - 创建指向特定后端页面的链接，或创建指向设置模型的链接。 下一个示例显示如何创建指向后端页面的链接。

```php
public function registerSettings()
{
    return [
        'location' => [
            'label' => '地理位置',
            'description' => '管理可用的用户国家和州。',
            'category' => 'Users',
            'icon' => 'icon-globe',
            'url' => Backend::url('acme/user/locations'),
            'order' => 500,
            'keywords' => '地理 地点 位置'
        ]
    ];
}
```

> **注意**：后端设置页面应该[配置设置的上下文](#oc-setting-the-page-navigation-context)，以便在系统页面侧边栏中标记相应的设置菜单项是否处于活动状态。 自动检测设置模型的设置上下文。

以下示例创建指向设置模型的链接。 设置模型是上面[数据库设置](#oc-database-settings) 部分中描述的设置API 的一部分。

```php
public function registerSettings()
{
    return [
        'settings' => [
            'label' => '用户设置',
            'description' => '管理基于用户的设置。',
            'category' => 'Users',
            'icon' => 'icon-cog',
            'class' => \Acme\User\Models\Settings::class,
            'order' => 500,
            'keywords' => '账号 头像 会员信息',
            'permissions' => ['acme.users.access_settings']
        ]
    ];
}
```

设置搜索功能使用可选的`keywords` 参数。 如果未提供关键字，则搜索仅使用设置项标签和描述。

<a id="oc-setting-the-page-navigation-context"></a>
### 设置页面导航上下文

就像[在控制器中设置导航上下文](../backend/controllers-ajax.md#oc-setting-the-navigation-context) 一样，后端设置页面应该配置设置的导航上下文。 为了将系统页面侧栏中的当前设置链接标记为活动，这是必需的。 使用`System\Classes\SettingsManager`类来设置设置上下文。 通常它可以在控制器构造函数中完成：

```php
public function __construct()
{
    parent::__construct();

    [...]

    BackendMenu::setContext('October.System', 'system', 'settings');
    SettingsManager::setContext('You.Plugin', 'settings');
}
```

`setContext` 方法的第一个参数是以下格式的设置项所有者：**author.plugin**。 第二个参数是设置名称，与您在[注册后端设置页面](#oc-settings-link-registration)时提供的相同。

<a id="oc-file-based-configuration"></a>
## 基于文件的配置

插件可以在插件目录的**config** 子目录下有一个配置文件**config.php**。 配置文件是定义并返回 **array** 的 PHP 脚本。 示例配置文件 **plugins/acme/demo/config/config.php**。

```php
<?php

return [
    'maxItems' => 10,
    'display' => 5
];
```

使用 `Config` 类来访问配置文件中定义的配置值。 `Config::get($name, $default = null)` 方法接受以下格式的插件和参数名称：**Acme.Demo::maxItems**。 第二个可选参数定义了如果配置参数不存在则返回的默认值。

```php
$maxItems = Config::get('acme.demo::maxItems', 50);
```

您还可以为配置文件使用不同的文件名，这会影响键名。 例如，名为 **custom.php** 的配置文件将使用 `custom` 作为键名的前缀，使用以下格式：**Acme.Demo::custom.maxItems**。 示例配置文件 **plugins/acme/demo/config/custom.php**。

```php
$maxItems = Config::get('acme.demo::custom.maxItems', 50);
```

### 覆盖配置值

一个插件配置文件可以被应用程序覆盖，通过创建一个本地配置文件来匹配，例如覆盖**plugins/acme/demo/config/config.php**，创建一个名为**config/acme/todo/config.php**的文件。 在覆盖的配置文件中，您可以只设置要覆盖的值。

```php
<?php

return [
    'maxItems' => 20
];
```

如果您想在不同的环境中使用单独的配置(例如：**dev**、**production**)，请考虑使用 `env()` 助手从环境变量中提取值。 `env($name, $default = null)` 函数接受环境变量名称和一个默认值（如果变量不存在）。

```php
<?php

return [
    'maxItems' => env('ACME_TODO_MAX_ITEMS', 25)
];
```

当环境变量`ACME_TODO_MAX_ITEMS`设置为任何其他值时，这将更改`maxItems`值。
