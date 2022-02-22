# 单元测试

## 测试插件

单个插件测试用例可以通过在插件的基本目录中运行`../../../vendor/bin/phpunit`来运行（例如`plugins/acme/demo`）。

### 创建插件测试

可以通过在基本目录中创建一个名为 `phpunit.xml` 的文件来测试插件，该文件具有以下内容，例如，在文件 **/plugins/acme/blog/phpunit.xml** 中:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit backupGlobals="false"
    backupStaticAttributes="false"
    bootstrap="../../../modules/system/tests/bootstrap.php"
    colors="true"
    convertErrorsToExceptions="true"
    convertNoticesToExceptions="true"
    convertWarningsToExceptions="true"
    processIsolation="false"
    stopOnFailure="false"
>
    <testsuites>
        <testsuite name="Plugin Unit Test Suite">
            <directory>./tests</directory>
        </testsuite>
    </testsuites>
    <php>
        <env name="APP_ENV" value="testing" />
        <env name="CACHE_DRIVER" value="array" />
        <env name="SESSION_DRIVER" value="array" />
        <env name="ACTIVE_THEME" value="test" />
        <env name="CONVERT_LINE_ENDINGS" value="true" />
        <env name="CMS_ROUTE_CACHE" value="true" />
        <env name="CMS_TWIG_CACHE" value="false" />
        <env name="ENABLE_CSRF" value="false" />
        <env name="DB_CONNECTION" value="sqlite" />
        <env name="DB_DATABASE" value=":memory:" />
    </php>
</phpunit>
```

然后可以创建一个 **tests/** 目录来包含测试类。 文件结构应该模仿带有`Test`后缀的类的基本目录。 还建议为该类使用命名空间。

```php
<?php namespace Acme\Blog\Tests\Models;

use Acme\Blog\Models\Post;
use PluginTestCase;

class PostTest extends PluginTestCase
{
    public function testCreateFirstPost()
    {
        $post = Post::create(['title' => 'Hi!']);
        $this->assertEquals(1, $post->id);
    }
}
```

测试类应该扩展基类`PluginTestCase`，这是一个特殊的类，它将设置存储在内存中的October CMS数据库，作为`setUp`方法的一部分。它还将刷新正在测试的插件，以及插件注册文件中定义的任何依赖项。 这相当于在每次测试之前运行以下命令:

    php artisan october:migrate
    php artisan plugin:refresh Acme.Blog
    [php artisan plugin:refresh <dependency>, ...]

> **注意**：如果你的插件使用[配置文件](../plugin/settings.md#oc-file-based-configuration)，那么你需要运行`System\Classes\PluginManager::instance()-> registerAll(true);` 在测试的 `setUp` 方法中。 下面是一个基本测试用例类的示例，如果您需要测试您的插件与其他插件一起工作而不是孤立地工作，则应使用该类。

```php
use System\Classes\PluginManager;

class BaseTestCase extends PluginTestCase
{
    public function setUp(): void
    {
        parent::setUp();

        // 获取插件管理器
        $pluginManager = PluginManager::instance();

        // 注册插件以使文件配置等功能可用
        $pluginManager->registerAll(true);

        // 启动所有插件以测试此插件的依赖项
        $pluginManager->bootAll(true);
    }

    public function tearDown(): void
    {
        parent::tearDown();

        // 获取插件管理器
        $pluginManager = PluginManager::instance();

        // 确保插件再次注册以进行下一次测试
        $pluginManager->unregisterAll();
    }
}
```

#### 更改插件测试的数据库引擎

默认情况下，October CMS 使用存储在内存中的 SQLite 用于插件测试环境。 您可以通过创建 `/config/testing/database.php` 来覆盖 `/config/database.php` 文件。 在这种情况下，将采用后一个文件中的变量。

## 系统测试

要对核心October文件执行单元测试，您应该使用 Composer 下载开发副本或克隆 Git 存储库。 这将确保您拥有运行单元测试所需的 `tests/` 目录。

### 单元测试

可以通过在October CMS 安装的根目录中运行 `vendor/bin/phpunit` 来执行单元测试。

<!--
### 功能测试

可以通过在October CMS 安装中安装 [RainLab Dusk](https://octobercms.com/plugin/rainlab-dusk) 来执行功能测试。 RainLab Dusk 插件由 Laravel Dusk 提供支持，这是 Laravel 框架的综合测试套件，旨在通过虚拟浏览器测试与完全运行的October CMS 实例的交互。

有关安装和设置October CMS 安装以运行功能测试的信息，请查看插件的 [README](https://github.com/rainlab/dusk-plugin/blob/master/README.md)。
-->
