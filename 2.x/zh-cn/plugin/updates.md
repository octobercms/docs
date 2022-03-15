# 版本更新

插件维护更改日志以记录代码中的任何更改或改进是一种很好的做法。 除了编写有关更改的注释外，此过程还具有按正确顺序执行 [迁移和种子文件](../database/structure.md) 的实用功能。

更改日志存储在插件的 **/updates** 目录中名为 `version.yaml` 的 YAML 文件中，该文件与迁移和种子文件共存。 这个例子显示了一个典型的插件更新目录结构:

```
plugins/
  author/
    myplugin/
      updates/                    <=== 更新目录
        version.yaml                <=== 插件版本文件
        create_tables.php           <=== 数据库脚本
        seed_the_database.php       <=== 迁移文件
        create_another_table.php    <=== 迁移文件
```

<a id="oc-update-process"></a>
## 更新过程

在更新过程中，系统会通知用户最近对插件的更改，它还可以提示他们[重要或重大更改](#oc-important-updates)。任何给定的迁移或种子文件在成功更新后只会被执行一次。发生以下任一情况时，October 会自动执行更新过程:

1. 当管理员登录后台时。
1. 当系统使用后台区域的更新功能进行更新时。
1. 当从应用程序目录调用[控制台命令](../console/commands.md#oc-database-migration)`php artisan october:migrate`命令时。

> **注意**:插件[初始化过程](../plugin/registration.md#oc-routing-and-initialization)在更新过程中被禁用，这应该是迁移和播种脚本中的一个考虑因素。

### 插件依赖

根据[插件注册文件中定义的依赖项](../plugin/registration.md#oc-dependency-definitions)，以特定顺序更新应用。在所有依赖项都首先更新之前，不会更新依赖的插件。

```php
<?php namespace Acme\Blog;

class Plugin extends \System\Classes\PluginBase
{
    public $require = ['Acme.User'];
}
```

在上面的示例中，**Acme.Blog** 插件在 **Acme.User** 插件完全更新之前不会更新。

## 插件版本文件

**version.yaml** 文件称为 *插件版本文件*，包含版本注释并以正确的顺序引用数据库脚本。 请阅读 [数据库结构](../database/structure.md) 文章以获取有关迁移文件的信息。 如果您要将插件提交到 [Marketplace](https://octobercms.com/help/site/marketplace)，则需要此文件。 这是插件版本文件的示例:

```yaml
v1.0.1: 第一版
v1.0.2: 第二版
v1.0.3:
    - 使用迁移和种子更新
    - create_tables.php
    - seed_the_database.php
v2.0.0: 重要更新
v2.0.1: 最新版本
```

> **注意**:`version.yaml` 文件应始终使用第一行描述更改的文本信息，其余行用于更新脚本。 对于更详细的更新，请考虑使用专用的更改日志文件。

正如你在上面看到的，应该有一个表示版本号的键，后面跟着更新消息，它是一个字符串或一个包含更新消息的数组。 对于涉及迁移或种子文件的更新，脚本文件名的行可以放置在任何位置。 没有关联更新文件的注释示例。

```yaml
v1.0.1: 不使用更新脚本的单个注释。
```

<a id="oc-important-updates"></a>
### 重要更新

有时插件需要引入一些功能，这些功能会破坏已经使用该插件的网站。 为了防止自动部署更改，您应该增加版本字符串的 **major** 段(`major.minor.patch`)。 下面是一个重要更新注释的示例。。

```yaml
v2.1.0: 这是 v1 的重要更新，其中包含重大更改。
```

当从版本`v1`标记新版本`v2`时，更改不会作为常规更新的一部分进行部署。 用户必须重新安装插件才能通过 Composer 接收最新版本。

<a id="oc-migration-files"></a>
### 迁移和种子文件

如前所述，更新还定义了何时应用 [迁移和种子文件](../database/structure.md)。 带有注释和更新的示例:

```yaml
v1.1.1:
    - 此更新将执行以下两个脚本。
    - some_upgrade_file.php
    - some_seeding_file.php
```

更新文件名应使用 *snake_case* 而包含的 PHP 类应使用 *CamelCase*。 对于名为 **some_upgrade_file.php** 的文件，相应的类将是 `SomeUpgradeFile`。

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
