---
subtitle: Programatically test and harden your business logic.
---
# Unit Testing

Individual plugin test cases can be run by running `phpunit` in the plugin's base directory (ex. `plugins/acme/demo`). If `phpunit` is not available globally, you may call it from the root vendor directory.

```bash
../../../vendor/bin/phpunit
```

## Creating Plugin Tests

The first step to testing plugins is to create a file called **phpunit.xml** in the base directory of the plugin. Here is an example of a file named **/plugins/acme/blog/phpunit.xml** for the `Acme.Blog` plugin.

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

## Creating a Test Class

All tests should be placed in the **tests** directory that is used store the test classes. Class names should use a `Test` suffic and a namespace for the class is optional. The test class should extend the `PluginTestCase` base class and this is a special class that will set up the October CMS database stored in memory, as part of the `setUp` method.

```php
use Acme\Blog\Models\Post;
use PluginTestCase;

/**
 * PostTest tests the posts
 */
class PostTest extends PluginTestCase
{
    public function testCreateFirstPost()
    {
        $post = Post::create(['title' => 'Hi!']);
        $this->assertEquals(1, $post->id);
    }
}
```

## Working with the Database

By default, plugin tests will automatically migrate the database tables for core modules, the plugin itself and any dependencies of the plugin. This is the equivalent of running the following before each test.

```bash
php artisan october:migrate
php artisan plugin:refresh Acme.Blog
[php artisan plugin:refresh <dependency>, ...]
```

You may disable this feature by setting the `autoMigrate` property to false in the test class. This is applicable when the test does not make use of the database.

```php
class PostTest extends PluginTestCase
{
    /**
     * @var bool autoMigrate feature disabled for this test.
     */
    protected $autoMigrate = false;
}
```

You can manually migrate plugins with the `migratePlugin` method when setting up the test. The `migrateModules` method can also be used to make the system tables available.

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

### Changing the Database

By default unit tests use SQLite stored in memory for the plugin testing environment. You can modify this setting in the `phpunit.xml` file. The values here are based on the `/config/database.php` configuration file.

```xml
<env name="DB_CONNECTION" value="sqlite" />
<env name="DB_DATABASE" value=":memory:" />
```

## Registering and Booting Plugins

In the test environment, plugins are not registered or booted automatically. This gives granular control over the testing environment and prevents other plugins from interfering. You can enable automatic loading of all plugins by setting the `autoRegister` property to true.

```php
/**
 * @var bool autoRegister performs plugin boot and registration.
 */
protected $autoRegister = true;
```

Alternatively, you can manually register and boot a plugin with the `loadPlugin` method.

```php
public function setUp(): void
{
    parent::setUp();

    // Runs register() and boot() methods
    $this->loadPlugin('Acme.Blog');
}
```
