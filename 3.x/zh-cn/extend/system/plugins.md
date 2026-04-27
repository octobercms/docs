---
subtitle: 通过扩展 CMS 来添加新功能的基础。
---
# 插件

::: aside
插件通过唯一的代码来标识，例如，名为 `Acme.Blog` 的插件位于 **plugins/acme/blog** 目录中。
:::

本文介绍插件及其注册功能。注册过程允许插件声明其功能，如 CMS 组件或后端导航和页面。以下是插件可以实现的一些功能示例。

1. 创建数据库表结构和种子数据。
1. 定义 [CMS 组件](../cms-components.md)。
1. 定义[用户权限](../backend/permissions.md)。
1. 添加[设置页面](../settings/settings.md)、[导航项](../backend/navigation.md)、[列表](../lists/list-controller.md)和[表单](../forms/form-controller.md)。
1. 修改[核心或其他插件的功能](../extending.md)。
1. 提供类、[后端控制器](../system/controllers.md)、视图、资源文件和其他文件。

### 目录结构

插件位于应用程序目录的 **plugins** 目录中。以下是一个插件目录结构的示例。

::: dir
├── `plugins`
|   └── acme  _← 作者名称_
|       └── blog  _← 插件名称_
|           ├── classes
|           ├── components
|           ├── controllers
|           ├── models
|           ├── updates
|           └── Plugin.php  _← 注册文件_
:::

并非所有插件目录都是必需的。唯一必需的文件是下面描述的 **Plugin.php**。如果你的插件只提供单个组件，你的插件目录可以更加简单，如下所示。

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── `components`
|           └── Plugin.php
:::

### 插件命名空间

插件命名空间是必不可少的，特别是如果你打算在 [October CMS 市场](https://octobercms.com/plugins)上发布插件。当你在市场上注册为作者时，系统会要求你提供一个作者代码，该代码应该用作你所有插件的根命名空间。你只能在注册时指定一次作者代码。市场提供的默认作者代码由作者的名和姓组成：JohnSmith。代码在注册后不能更改。你的所有插件命名空间都应该定义在根命名空间下，例如 `JohnSmith\Blog`。

## 注册文件

`create:plugin` 命令会为插件生成一个文件夹和基本文件。第一个参数指定作者和插件名称。

```bash
php artisan create:plugin Acme.Blog
```

**Plugin.php** 文件，即插件注册文件，是一个声明插件核心功能和信息的初始化脚本。注册文件可以提供以下内容：

1. 关于插件的信息，包括名称和作者。
1. 用于扩展 CMS 的注册方法。

注册脚本应使用插件命名空间。注册脚本应定义一个名为 `Plugin` 的类，该类继承 `System\Classes\PluginBase` 类。插件注册类唯一必需的方法是 `pluginDetails`。以下是一个插件注册文件的示例。

```php
namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    public function pluginDetails()
    {
        return [
            'name' => 'Blog Plugin',
            'description' => 'Provides some really cool blog features.',
            'author' => 'ACME Corporation',
            'icon' => 'icon-leaf'
        ];
    }

    public function registerComponents()
    {
        return [
            \Acme\Blog\Components\Post::class => 'blogPost'
        ];
    }
}
```

### 基本插件信息

`pluginDetails` 是插件注册类的必需方法。它应该返回一个包含以下键的数组：

键 | 描述
------------- | -------------
**name** | 插件名称，必填。
**description** | 插件描述，必填。
**author** | 插件作者名称，必填。
**icon** | 插件图标的名称。完整的可用图标列表可在[可用图标文档](../../element/available-icons.md)中找到。此字体提供的任何图标名称都是有效的，例如 **icon-glass**、**icon-music**，可选。
**iconSvg** | 用于替代标准图标的 SVG 图标。SVG 图标应为矩形，并且可以支持颜色，可选。
**homepage** | 作者网站地址的链接，可选。
**hint** | 用于在管理面板中[路由控制器 URL](./controllers.md) 的较短代码，可选。

## 启动和初始化

插件注册文件可以包含两个方法 `boot` 和 `register`。通过这些方法，你可以执行任何操作，例如注册路由或附加事件处理程序。

`register` 方法在插件注册时立即调用。`boot` 方法在请求被路由之前调用。因此，如果你的操作依赖于其他插件，你应该使用 boot 方法。例如，在 `boot` 方法中你可以扩展模型。

```php
public function boot()
{
    User::extend(function($model) {
        $model->hasOne['author'] = \Acme\Blog\Models\Author::class;
    });
}
```

::: tip
`boot` 方法是可选的，不定义它有助于提高性能。此外，只有 `boot` 方法支持通过应用容器进行依赖注入。
:::

插件还可以提供一个名为 **init.php** 的文件，其中包含自定义初始化逻辑。以下是一些示例内容。

```php
App::before({
    // Logic when the request starts, after routes are registered
});

App::after({
    // Logic the request has finished, after the response is sent
});
```

## 依赖定义

插件可以通过在插件注册文件中定义 `$require` 属性来依赖其他插件，该属性应包含被视为依赖项的插件名称数组。依赖于 **Acme.User** 插件的插件可以通过以下方式声明此依赖：

```php
namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    /**
     * @var array require these plugins
     */
    public $require = ['Acme.User'];

    // ...
}
```

依赖定义将影响插件的运行方式以及更新过程如何应用迁移。安装过程会尝试自动安装所有依赖项，但是如果系统中检测到一个插件缺少任何依赖项，它将被禁用以防止系统错误。

依赖定义可以很复杂，但应注意防止循环引用。依赖关系图应始终是有向的，循环依赖被视为设计错误。

## 版本历史

插件维护变更日志来记录代码中的任何更改或改进是一种良好的实践。除了编写关于更改的注释外，此过程还具有按正确顺序执行[迁移和种子文件](../database/structure.md)的有用功能。

变更日志存储在插件 **updates** 目录中的一个名为 `version.yaml` 的 YAML 文件中，该文件与迁移和种子文件共存。此示例展示了一个典型的插件更新目录结构：

::: dir
├── plugins
|   └── author
|       └── myplugin
|           ├── `updates`
|           |   ├── `version.yaml`  _← 版本文件_
|           |   ├── create_tables.php  _← 数据库脚本_
|           |   ├── seed_the_database.php
|           |   └── create_another_table.php
|           └── Plugin.php
:::

### 插件依赖

更新按照特定顺序应用，基于插件注册文件中定义的依赖关系。有依赖的插件在其所有依赖项都更新完毕之前不会被更新。

```php
namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    public $require = ['Acme.User'];
}
```

在上面的示例中，**Acme.Blog** 插件在 **Acme.User** 插件完全更新之前不会被更新。

## 插件版本文件

**version.yaml** 文件，即插件版本文件，包含版本注释并按正确顺序引用数据库脚本。请阅读[数据库结构](../database/structure.md)文章以了解迁移文件的信息。如果你打算将插件提交到[市场](https://octobercms.com/help/site/marketplace)，则需要此文件。以下是一个插件版本文件的示例。

```yaml
v1.0.1: First version
v1.0.2: Second version
v1.0.3:
    - Update with a migration and seed
    - create_tables.php
    - seed_the_database.php
v2.0.0: Important update
v2.0.1: Latest version
```

::: tip
`version.yaml` 文件应始终在第一行使用描述更改的文本更新，其余行用于更新脚本。对于更详细的更新，请考虑使用专用的变更日志文件。
:::

如上所示，应该有一个代表版本号的键，后面跟着更新消息，更新消息可以是字符串或包含更新消息的数组。对于引用迁移或种子文件的更新，脚本文件名行可以放在任何位置。以下是一个没有关联更新文件的注释示例。

```yaml
v1.0.1: A single comment that uses no update scripts.
```

### 重要更新

有时插件需要引入会破坏已在使用该插件的网站的功能。为了防止更改被自动部署，你应该增加版本字符串的**主要**段（`major.minor.patch`）。以下是一个重要更新注释的示例。

```yaml
v2.1.0: This is an important update from v1 that contains breaking changes.
```

当从 `v1` 版本标记新版本 `v2` 时，更改不会作为常规更新的一部分被部署。用户必须通过 Composer 重新安装插件才能获取最新版本。

### 迁移和种子文件

如前所述，更新还定义了何时应用[迁移和种子文件](../database/structure.md)。包含注释和更新的更新行：

```yaml
v1.1.1:
    - This update will execute the two scripts below.
    - some_upgrade_file.php
    - some_seeding_file.php
```

更新文件名应使用 *snake_case*，而包含的 PHP 类应使用 *CamelCase*。对于名为 **some_upgrade_file.php** 的文件，对应的类将是 `SomeUpgradeFile`。

```php
<?php namespace Acme\Blog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

/**
 * some_upgrade_file.php
 */
class SomeUpgradeFile extends Migration
{
    ///
}
```

#### 另请参阅

::: also
* [数据库迁移和种子](../database/structure.md)
:::
