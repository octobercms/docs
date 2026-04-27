---
subtitle: 以编程方式测试和强化你的业务逻辑。
---
# 单元测试

可以使用 `plugin:test` artisan 命令执行单个插件的测试用例，后跟插件代码。例如，以下命令将运行在 **plugins/acme/demo** 目录中找到的测试。

```bash
php artisan plugin:test acme.demo
```

::: tip
如果你全局安装了 `phpunit`，你也可以从插件目录中调用它。
:::

## 创建插件测试

测试插件的第一步是在插件的根目录中创建一个名为 **phpunit.xml** 的文件。以下是 `Acme.Blog` 插件的文件 **/plugins/acme/blog/phpunit.xml** 的示例。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit
    backupGlobals="false"
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
        <testsuite name="Plugin Test Suite">
            <directory>./tests</directory>
            <exclude>./tests/browser</exclude>
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

## 创建测试类

`create:test` 命令生成一个测试类。第一个参数指定作者和插件名称。第二个参数指定测试类名，必须以 **Test** 结尾。

```bash
php artisan create:test Acme.Blog UserTest
```

所有测试应放在用于存储测试类的 **tests** 目录中。类名应使用 `Test` 后缀，类的命名空间是可选的。测试类应继承 `PluginTestCase` 基类，这是一个特殊的类，将在 `setUp` 方法中设置存储在内存中的 October CMS 数据库。

```php
use Acme\Blog\Models\Post;

class PostTest extends PluginTestCase
{
    public function testCreateFirstPost()
    {
        $post = Post::create(['title' => 'Hi!']);
        $this->assertEquals(1, $post->id);
    }
}
```

## 注册和启动插件

在测试环境中，插件本身及其所有依赖项会自动注册和启动。这提供了对测试环境的更精细控制，并防止系统中的其他插件干扰事件注册等操作。你可以通过将 `autoRegister` 属性设置为 `false` 来禁用当前插件的自动加载。

```php
/**
 * @var bool autoRegister feature disabled for this test.
 */
protected $autoRegister = false;
```

你可以使用 `loadPlugin` 方法手动注册和启动插件。在某些情况下，你还需要手动迁移插件（见下文）。

```php
public function setUp(): void
{
    parent::setUp();

    // Runs register() and boot() methods
    $this->loadPlugin('Acme.Blog');
}
```

以下注册方法可用。

方法名 | 用途
------------- | -------------
**loadAllPlugins()** | 加载系统中找到的所有插件。
**loadCurrentPlugin()** | 加载当前插件及其依赖项。
**loadPlugin($code)** | 使用代码加载单个插件，例如：`Acme.Blog`。
**loadPlugins($codes)** | 以代码数组的形式加载多个插件。

## 使用数据库

默认情况下，插件测试将自动迁移核心模块、当前插件及其依赖项的数据库表。这相当于在每个测试之前运行以下命令。

```bash
php artisan october:migrate
php artisan plugin:refresh Acme.Blog
[php artisan plugin:refresh <dependency>, ...]
```

你可以通过在测试类中将 `autoMigrate` 属性设置为 false 来禁用此功能。这适用于测试不使用数据库的情况。

```php
class PostTest extends PluginTestCase
{
    /**
     * @var bool autoMigrate feature disabled for this test.
     */
    protected $autoMigrate = false;
}
```

你可以在设置测试时使用 `migratePlugin` 方法手动迁移插件。`migrateModules` 方法也可用于使系统表可用。

```php
public function setUp(): void
{
    parent::setUp();

    // Migrate core modules
    $this->migrateModules();

    // Migrate the blog plugin
    $this->migratePlugin('Acme.Blog');
}
```

以下迁移方法可用。

方法名 | 用途
------------- | -------------
**migrateDatabase()** | 迁移整个数据库，与 `october:migrate` 相同。
**migrateModules()** | 仅迁移核心模块。
**migrateCurrentPlugin()** | 迁移当前插件及其依赖项。
**migratePlugin($code)** | 使用代码迁移特定插件，例如：`Acme.Blog`。

### 更改数据库

默认情况下，单元测试使用存储在内存中的 SQLite 作为插件测试环境。你可以在 `phpunit.xml` 文件中修改此设置。此处的值基于 `/config/database.php` 配置文件。

```xml
<env name="DB_CONNECTION" value="sqlite" />
<env name="DB_DATABASE" value=":memory:" />
```
