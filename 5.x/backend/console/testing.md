---
previousPath: extend/system/unit-testing.md
subtitle: Write automated tests for a plugin and run them with the plugin:test command.
---
# Unit Testing

Plugin tests check your business logic automatically. Each test class extends `PluginTestCase`, which sets up an October CMS database stored in memory, and you run the tests with the `plugin:test` command.

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

```bash
php artisan plugin:test acme.blog
```

## Creating a Test Class

The `create:test` command generates a test class. The first argument is the plugin code, and the second argument is the test class name, which must end in **Test**.

```bash
php artisan create:test Acme.Blog UserTest
```

Place all test classes in the plugin's **tests** directory. Class names use a `Test` suffix, and a namespace is optional. The test class extends the `PluginTestCase` base class, which sets up the October CMS database stored in memory as part of the `setUp` method.

### Configuring PHPUnit

Plugin tests need a file called **phpunit.xml** in the base directory of the plugin. The `create:test` command creates this file if it does not exist. Here is an example **/plugins/acme/blog/phpunit.xml** file for the `Acme.Blog` plugin.

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
        <env name="CACHE_STORE" value="array" />
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

## Running Tests

Run a plugin's tests with the `plugin:test` command, followed by the plugin code. This example runs the tests found in the **plugins/acme/demo** directory.

```bash
php artisan plugin:test acme.demo
```

The command detects whether to use [Pest](https://pestphp.com/) or PHPUnit from your installed dependencies. If Pest is installed, it is used by default.

::: tip
If you have `phpunit` installed globally, you can also run it from the plugin directory.
:::

### Passing Options

You can pass any PHPUnit or Pest option directly to the command. For example, to filter tests by name:

```bash
php artisan plugin:test acme.blog --filter=testCreatePost
```

To run tests in a specific group:

```bash
php artisan plugin:test acme.blog --group=api
```

To stop on the first failure:

```bash
php artisan plugin:test acme.blog --stop-on-failure
```

You can combine options as needed.

```bash
php artisan plugin:test acme.blog --filter=testCreate --stop-on-failure
```

### Running Tests in Parallel

Use the `--parallel` flag to run tests in parallel for faster execution. It uses Pest's built-in parallel runner with Pest, or [ParaTest](https://github.com/paratestphp/paratest) with PHPUnit.

```bash
php artisan plugin:test acme.blog --parallel
```

## Registering and Booting Plugins

In the test environment, the plugin and its dependencies are registered and booted automatically. Other plugins in the system are not loaded, so they cannot interfere with things like event registration. To turn off automatic loading of the current plugin, set the `autoRegister` property to `false`.

```php
/**
 * @var bool autoRegister feature disabled for this test.
 */
protected $autoRegister = false;
```

To register and boot a plugin manually, use the `loadPlugin` method. In some cases, you also need to [migrate the plugin manually](#migrating-plugins-manually).

```php
public function setUp(): void
{
    parent::setUp();

    // Runs register() and boot() methods
    $this->loadPlugin('Acme.Blog');
}
```

The following registration methods are available.

Method Name | Purpose
------------- | -------------
**loadAllPlugins()** | Loads all plugins found in the system.
**loadCurrentPlugin()** | Loads the current plugin and its dependencies.
**loadPlugin($code)** | Loads a single plugin using its code, eg: `Acme.Blog`.
**loadPlugins($codes)** | Loads multiple plugins as an array of codes.

## Working with the Database

By default, plugin tests migrate the database tables for the core modules, the current plugin and its dependencies. This is the same as running the following before each test.

```bash
php artisan october:migrate
php artisan plugin:refresh Acme.Blog
[php artisan plugin:refresh <dependency>, ...]
```

If a test does not use the database, turn this off by setting the `autoMigrate` property to `false` in the test class.

```php
class PostTest extends PluginTestCase
{
    /**
     * @var bool autoMigrate feature disabled for this test.
     */
    protected $autoMigrate = false;
}
```

### Migrating Plugins Manually

To migrate plugins yourself, call the `migratePlugin` method when setting up the test. The `migrateModules` method makes the system tables available.

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

The following migration methods are available.

Method Name | Purpose
------------- | -------------
**migrateDatabase()** | Migrate the entire database, the same as `october:migrate`.
**migrateModules()** | Migrate only the core modules.
**migrateCurrentPlugin()** | Migrate the current plugin and its dependencies.
**migratePlugin($code)** | Migrates a specific plugin using its code, eg: `Acme.Blog`.

### Speeding Up Tests with Transactions

The database is rebuilt for every test, so larger test suites can take a long time to run. Set the `useTransactions` property to `true` in the test class to migrate the database once for the entire test run instead. Each test then runs inside a database transaction that is rolled back when the test finishes, which keeps every test isolated from the others.

```php
class PostTest extends PluginTestCase
{
    /**
     * @var bool useTransactions isolates each test with a database transaction.
     */
    protected $useTransactions = true;
}
```

::: warning
Test code that commits the outer transaction or reconnects to the database leaks changes into the remaining tests. Leave this feature off for tests that manage transactions or connections themselves.
:::

### Changing the Database

By default, plugin tests use SQLite stored in memory. You can change this in the **phpunit.xml** file. The values are based on the **config/database.php** configuration file.

```xml
<env name="DB_CONNECTION" value="sqlite" />
<env name="DB_DATABASE" value=":memory:" />
```

#### See Also

::: also
* [Building Console Commands](./commands.md)
* [Available Console Commands](../../setup/console-commands.md)
* [Migrations & Seeding](../data/migrations.md)
:::
